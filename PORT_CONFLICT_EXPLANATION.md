# Port Conflict Explanation

## The Problem

Even though your apps are on **different domains** (sgore.dev vs app.sgore.dev), there's a potential port conflict because:

1. **Docker port bindings happen at the OS level** (before domain routing)
2. **Domain routing happens at the application level** (after the request reaches the container)

### Current Situation:

- **FitnessTracker** (app.sgore.dev): Binds to `80:80` and `443:443` in docker-compose.yml
- **Portfolio** (sgore.dev): Would also try to bind to `80:80` and `443:443`

When Docker tries to bind a container port to a host port:
- The OS checks if that port is already in use
- If port 80 is already bound by FitnessTracker, Portfolio can't bind to it
- **Result**: Only one app can run at a time, or the second one fails to start

### Why Domain Routing Doesn't Help Here

Domain routing (sgore.dev vs app.sgore.dev) happens **inside** the nginx container, but:
- The request must first reach the container
- Docker port binding determines which container receives the request
- If both containers bind to port 80, only one can receive requests on that port

## Solutions

### Option 1: Host-Level Nginx (Recommended) ⭐

Set up a single nginx on the **host** (not in Docker) that:
- Listens on ports 80 and 443
- Routes based on domain name:
  - `sgore.dev` → portfolio containers (internal port)
  - `app.sgore.dev` → FitnessTracker containers (internal port)

**Benefits:**
- Both apps can run simultaneously
- Clean separation of concerns
- Single point for SSL/TLS termination
- Easy to add more apps later

**Changes needed:**
- Install nginx on the host (if not already)
- Configure host nginx to route to both apps
- Update both docker-compose files to use internal ports only (no host binding)

### Option 2: Different Host Ports (Current Portfolio Setup)

Keep FitnessTracker on 80/443, put Portfolio on 8080/8443:
- FitnessTracker: `80:80`, `443:443` (unchanged)
- Portfolio: `8080:80`, `8443:443` (current setup)

**Then use host-level nginx to route:**
- `sgore.dev` → `localhost:8080` (HTTP) or `localhost:8443` (HTTPS)
- `app.sgore.dev` → `localhost:80` (HTTP) or `localhost:443` (HTTPS)

**Benefits:**
- Minimal changes to FitnessTracker (it's already working)
- Portfolio works around the existing setup

### Option 3: Revise FitnessTracker (More Work)

Update FitnessTracker to also use internal ports and set up host-level nginx for both.

**Benefits:**
- Cleaner architecture
- Both apps treated equally

**Drawbacks:**
- Requires changes to working FitnessTracker setup
- More risk of breaking existing deployment

## Recommendation

**Go with Option 1 (Host-Level Nginx)** because:
1. It's the most scalable solution
2. Both apps are treated equally
3. Easier to manage SSL certificates
4. Standard production pattern

The host-level nginx would look something like:

```nginx
# Route sgore.dev to portfolio
server {
    listen 80;
    server_name sgore.dev www.sgore.dev;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name sgore.dev www.sgore.dev;
    ssl_certificate /etc/letsencrypt/live/sgore.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sgore.dev/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8080;  # Portfolio container
        # ... proxy headers ...
    }
}

# Route app.sgore.dev to FitnessTracker
server {
    listen 80;
    server_name app.sgore.dev;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name app.sgore.dev;
    ssl_certificate /etc/letsencrypt/live/app.sgore.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.sgore.dev/privkey.pem;
    
    location / {
        proxy_pass http://localhost:8081;  # FitnessTracker container (internal port)
        # ... proxy headers ...
    }
}
```

Then update both docker-compose files to use internal ports only (no `-p` flag, or use non-standard ports).

