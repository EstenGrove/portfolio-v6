# Deployment Notes - Portfolio App (sgore.dev)

## ⚠️ Important: Port Conflict Resolution

The Portfolio app and FitnessTracker app both need to run on the same server. To avoid port conflicts:

### Current Setup:
- **FitnessTracker** (app.sgore.dev): Binds to ports `80:80` and `443:443`
- **Portfolio** (sgore.dev): Binds to ports `8080:80` and `8443:443`

### Solution Options:

#### Option 1: Host-Level Nginx (Recommended)
Use a host-level nginx that routes based on domain name:
- `sgore.dev` → portfolio containers (port 8080/8443)
- `app.sgore.dev` → FitnessTracker containers (port 80/443)

See `nginx/host-nginx-example.conf` for a sample configuration.

#### Option 2: Direct Port Binding (Current)
The portfolio app uses ports 8080 and 8443 to avoid conflicts. You'll need to:
1. Configure your DNS/firewall to route sgore.dev to port 8080/8443
2. Or use a reverse proxy (nginx, traefik, etc.) on the host

### Container Isolation:
✅ **Container names are unique:**
- Portfolio: `portfolio_nginx`, `portfolio_frontend`, `portfolio_backend`, `portfolio_db`
- FitnessTracker: `client`, `server`, `db` (no explicit names, uses service names)

✅ **Docker networks are isolated:**
- Portfolio uses network: `portfolio_v6_web` (auto-generated from directory name)
- FitnessTracker uses default bridge network
- They won't interfere with each other

✅ **Database volumes are separate:**
- Portfolio: `portfolio_v6_postgres_data`
- FitnessTracker: `fitness-tracker-v2_postgres_data`
- No conflicts

### Deployment Paths:
- Portfolio: `/var/www/sgore.dev/html`
- FitnessTracker: `/var/www/app.sgore.dev/html`
- ✅ Different paths, no conflicts

### SSL Certificates:
- Portfolio: `/etc/letsencrypt/live/sgore.dev/`
- FitnessTracker: `/etc/letsencrypt/live/app.sgore.dev/`
- ✅ Different domains, different certificates

## Deployment Commands

```bash
# Deploy portfolio app
./deploy.sh

# Deploy with database restore
./deploy.sh --restore-db

# Clean build (removes old containers/images)
./deploy.sh --clean
```

## Verification

After deployment, verify both apps are running:

```bash
# Check portfolio containers
docker ps | grep portfolio

# Check FitnessTracker containers  
docker ps | grep -E "client|server|db" | grep -v portfolio

# Check port bindings
netstat -tulpn | grep -E "80|443|8080|8443"
```

## Troubleshooting

If you see port binding errors:
1. Check if FitnessTracker is running: `docker ps | grep client`
2. Verify ports are not in use: `netstat -tulpn | grep -E "80|443|8080|8443"`
3. Ensure host-level nginx is configured correctly if using Option 1

