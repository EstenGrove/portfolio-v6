# Host-Level Nginx Setup Guide

This guide sets up a host-level nginx that routes both `sgore.dev` (Portfolio) and `app.sgore.dev` (FitnessTracker) to their respective Docker containers.

## Architecture

```
Internet
   ↓
Host Nginx (ports 80, 443)
   ├─→ sgore.dev → Portfolio containers (internal ports 8080/8443)
   └─→ app.sgore.dev → FitnessTracker containers (internal ports 8081/8444)
```

## Step 1: Update FitnessTracker docker-compose.yml

Change FitnessTracker to use internal ports instead of binding to 80/443:

**File: `~/Documents/Projects/Apps/fitness-tracker-v2/docker-compose.yml`**

```yaml
version: "3.9"

services:
  client:
    build: ./client
    env_file:
      - .env.production
    ports:
      - "8081:80"   # Changed from 80:80
      - "8444:443"  # Changed from 443:443
    depends_on:
      - server
    volumes:
      - /etc/letsencrypt/live/app.sgore.dev/fullchain.pem:/etc/ssl/certs/app.sgore.dev.crt:ro
      - /etc/letsencrypt/live/app.sgore.dev/privkey.pem:/etc/ssl/private/app.sgore.dev.key:ro
    restart: always

  server:
    build: ./server
    env_file:
      - .env.production
    depends_on:
      - db
    restart: always

  db:
    build: ./db
    restart: always
    env_file:
      - .env.production
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Step 2: Update Portfolio docker-compose.yml

Portfolio is already configured for 8080/8443, which is perfect. No changes needed.

## Step 3: Install/Create Host Nginx Configuration

On your server, create the host nginx configuration:

**File: `/etc/nginx/sites-available/sgore-domains`**

```nginx
# Portfolio App - sgore.dev
server {
    listen 80;
    server_name sgore.dev www.sgore.dev;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name sgore.dev www.sgore.dev;

    ssl_certificate /etc/letsencrypt/live/sgore.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sgore.dev/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Portfolio nginx container
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# FitnessTracker App - app.sgore.dev
server {
    listen 80;
    server_name app.sgore.dev;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name app.sgore.dev;

    ssl_certificate /etc/letsencrypt/live/app.sgore.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.sgore.dev/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to FitnessTracker client container
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Step 4: Enable the Configuration

On your server, run:

```bash
# Create symlink to enable the site
sudo ln -s /etc/nginx/sites-available/sgore-domains /etc/nginx/sites-enabled/

# Remove default nginx site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 5: Update FitnessTracker nginx.conf (Optional)

Since host nginx is now handling SSL termination, you can simplify the FitnessTracker's internal nginx.conf, but it's not required - it will still work as-is.

## Step 6: Deploy Both Apps

1. **Deploy FitnessTracker** (after updating docker-compose.yml):
   ```bash
   cd ~/Documents/Projects/Apps/fitness-tracker-v2
   ./deploy.sh
   ```

2. **Deploy Portfolio**:
   ```bash
   cd ~/Documents/Projects/MySites/Portfolio/v6
   ./deploy.sh
   ```

## Verification

After deployment, verify both apps:

```bash
# Check containers are running
docker ps | grep -E "portfolio|client"

# Check port bindings
netstat -tulpn | grep -E "8080|8081|8443|8444"

# Test both domains
curl -I https://sgore.dev
curl -I https://app.sgore.dev
```

## Troubleshooting

### Port already in use
If you get "port already in use" errors:
```bash
# Check what's using the ports
sudo lsof -i :80
sudo lsof -i :443

# Stop any conflicting services
sudo systemctl stop nginx  # If old nginx is running
```

### SSL Certificate Issues
Make sure certificates are in the right place:
```bash
sudo ls -la /etc/letsencrypt/live/sgore.dev/
sudo ls -la /etc/letsencrypt/live/app.sgore.dev/
```

### Container Not Reachable
Check if containers are listening on the expected ports:
```bash
docker ps
docker port <container_name>
```

## Benefits of This Setup

✅ **No port conflicts** - Each app uses different internal ports  
✅ **Both apps run simultaneously** - Host nginx routes based on domain  
✅ **Centralized SSL management** - Host nginx handles SSL termination  
✅ **Easy to scale** - Add more apps by adding more server blocks  
✅ **Standard production pattern** - Industry best practice

