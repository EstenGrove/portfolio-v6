#!/bin/bash

set -e  # Exit on error

# COLORS
RED="\033[1;31m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
YELLOW="\033[1;33m"
NC="\033[0m"

# === CONFIG ===
REMOTE_HOST='198.199.97.95'
REMOTE_USER='root'
TARGET_PATH='/var/www/sgore.dev/html'
LOCAL_PATH=$(pwd)
DB_BACKUP_PATH="./backup2.dump"  # Optional
DOMAIN="sgore.dev"

# Parse flags
RESTORE_DB=false
CLEAN_BUILD=false
SKIP_SYNC=false
for arg in "$@"; do
  case "$arg" in
    --restore-db)
      RESTORE_DB=true
      ;;
    --clean)
      CLEAN_BUILD=true
      ;;
    --skip-sync)
      SKIP_SYNC=true
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo "Options:"
      echo "  --restore-db    Restore database from backup"
      echo "  --clean         Clean Docker images and containers before build"
      echo "  --skip-sync     Skip file synchronization (useful for quick rebuilds)"
      exit 0
      ;;
  esac
done

# === SYNC CODE ===
if [ "$SKIP_SYNC" = false ]; then
  printf "${GREEN}📦 Syncing project to remote host at ${REMOTE_HOST}${NC}\n"
  rsync -av --progress \
    --exclude node_modules \
    --exclude dist \
    --exclude .env \
    --exclude .git \
    --exclude .DS_Store \
    --exclude '*.log' \
    --exclude backup*.dump \
    "${LOCAL_PATH}/" "${REMOTE_USER}@${REMOTE_HOST}:${TARGET_PATH}/"
  
  if [ $? -ne 0 ]; then
    printf "${RED}❌ Failed to sync files${NC}\n"
    exit 1
  fi
  printf "${GREEN}✅ Files synced successfully${NC}\n"
else
  printf "${YELLOW}⏭️  Skipping file sync${NC}\n"
fi

# === OPTIONAL: Upload DB backup file ===
if [ "$RESTORE_DB" = true ]; then
  if [ ! -f "$DB_BACKUP_PATH" ]; then
    printf "${RED}❌ Database backup file not found: ${DB_BACKUP_PATH}${NC}\n"
    exit 1
  fi
  printf "${BLUE}📤 Uploading DB backup file: ${DB_BACKUP_PATH}${NC}\n"
  scp "$DB_BACKUP_PATH" "${REMOTE_USER}@${REMOTE_HOST}:${TARGET_PATH}/backup.dump"
  if [ $? -ne 0 ]; then
    printf "${RED}❌ Failed to upload backup file${NC}\n"
    exit 1
  fi
fi

# === REMOTE COMMANDS ===
printf "🚀 ${GREEN}Deploying portfolio project to ${DOMAIN}...${NC}\n"
ssh "${REMOTE_USER}@${REMOTE_HOST}" << EOF
  set -e
  cd ${TARGET_PATH}

  # Check if Docker is available
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
  fi

  if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
  fi

  # Clean build if requested
  if [ "$CLEAN_BUILD" = true ]; then
    echo -e "${YELLOW}🧹 Cleaning old containers and images...${NC}"
    docker compose down -v 2>/dev/null || true
    docker system prune -f --volumes || true
  fi

  # Stop existing containers
  echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
  docker compose down || true

  # Build and start containers
  echo -e "${BLUE}🧱 Building and starting Docker containers...${NC}"
  docker compose up --build -d

  if [ \$? -ne 0 ]; then
    echo -e "${RED}❌ Docker compose failed${NC}"
    exit 1
  fi

  # Wait for services to be ready
  echo -e "${BLUE}⏳ Waiting for services to start...${NC}"
  sleep 5

  # Check container status
  echo -e "${BLUE}📊 Container status:${NC}"
  docker compose ps

  # Restore database if requested
  if [ "$RESTORE_DB" = true ]; then
    echo -e "${BLUE}💾 Restoring PostgreSQL database from backup.dump...${NC}"
    DB_CONTAINER=\$(docker compose ps -q db)
    if [ -z "\$DB_CONTAINER" ]; then
      echo -e "${RED}❌ Database container not found${NC}"
      exit 1
    fi
    
    docker cp backup.dump \$DB_CONTAINER:/backup.dump
    docker exec -i \$DB_CONTAINER pg_restore -U x-main-user -d Portfolio-v6 --clean --if-exists /backup.dump || {
      echo -e "${YELLOW}⚠️  Database restore had warnings, but continuing...${NC}"
    }
    echo -e "${GREEN}✅ Database restore completed${NC}"
  fi

  # Show logs for troubleshooting
  echo -e "${BLUE}📋 Recent logs:${NC}"
  docker compose logs --tail=20

  echo -e "${GREEN}✅ Deployment successful for ${DOMAIN}!${NC}"
  echo -e "${GREEN}🌐 Your site should be available at https://${DOMAIN}${NC}"
EOF

if [ $? -eq 0 ]; then
  printf "${GREEN}✅ Deployment completed successfully!${NC}\n"
else
  printf "${RED}❌ Deployment failed${NC}\n"
  exit 1
fi
