# Hydra Drop — Deployment Guide

This document provides step-by-step instructions for deploying the Hydra Drop application across local development, staging, and production environments. The application consists of a React (Vite) frontend and an Express.js backend connected to MongoDB.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Environment Variables Reference](#environment-variables-reference)
5. [Database Setup and Seeding](#database-setup-and-seeding)
6. [Production Build](#production-build)
7. [Deployment Options](#deployment-options)
8. [Reverse Proxy with Nginx](#reverse-proxy-with-nginx)
9. [SSL and Domain Configuration](#ssl-and-domain-configuration)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Monitoring and Logging](#monitoring-and-logging)
12. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The Hydra Drop platform follows a decoupled architecture where the frontend and backend are independently deployable services communicating over REST APIs.

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite + TypeScript + TailwindCSS | Consumer storefront and admin portal SPA |
| Backend | Express.js 4.x (Node.js 18+) | REST API server with JWT authentication |
| Database | MongoDB 7.x (Mongoose 8.x ODM) | Persistent data store for all business entities |
| File Storage | Local `/uploads` directory (or S3 in production) | Logo and design asset uploads |

The frontend communicates with the backend exclusively through the `/api/*` endpoints. In production, both can be served from the same domain using a reverse proxy, or deployed to separate subdomains.

---

## Prerequisites

Before proceeding, ensure the following software is installed on your deployment machine.

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| Node.js | 18.x LTS | Runtime for both frontend build and backend server |
| npm | 9.x | Package management |
| MongoDB | 7.0 | Primary database |
| Git | 2.x | Source control |
| Nginx (production) | 1.24+ | Reverse proxy and static file serving |
| PM2 (production) | 5.x | Node.js process manager |

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Animesh-jsx/Hydro-Drop.git
cd Hydro-Drop
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create the frontend environment file at the project root:

```bash
# .env (project root)
VITE_API_URL=http://localhost:5000/api
```

Create the backend environment file inside the `server/` directory:

```bash
# server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hydradrop
JWT_SECRET=your_secure_random_secret_here
JWT_EXPIRES_IN=7d
UPLOAD_DIR=./uploads
```

> **Important:** Generate a strong `JWT_SECRET` for production using `openssl rand -base64 64` or a similar method. Never use the default development secret in production.

### Step 5: Start MongoDB

```bash
# On Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl enable mongod

# On macOS with Homebrew
brew services start mongodb-community

# Verify connection
mongosh --eval "db.runCommand({ ping: 1 })"
```

### Step 6: Seed the Database

```bash
cd server
node seed.js
```

This populates the database with sample data including an admin user, products with INR pricing, sample orders, customers, and customization requests. The default admin credentials are:

| Field | Value |
|-------|-------|
| Email | admin@hydradrop.in |
| Password | admin123 |

> **Warning:** Change the admin password immediately after the first login in any non-development environment.

### Step 7: Start the Backend Server

```bash
cd server
node index.js
```

The API server starts on `http://localhost:5000`. Verify it is running:

```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok","message":"Hydra Drop API is running","location":"Kolkata, West Bengal, India"}
```

### Step 8: Start the Frontend Dev Server

Open a new terminal window:

```bash
# From project root
npm run dev
```

The frontend starts on `http://localhost:5173`. The admin portal is accessible at `http://localhost:5173/admin/login`.

---

## Environment Variables Reference

### Frontend (`.env` at project root)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Yes | `http://localhost:5000/api` | Backend API base URL (no trailing slash) |

### Backend (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Port the Express server listens on |
| `MONGODB_URI` | Yes | `mongodb://localhost:27017/hydradrop` | MongoDB connection string |
| `JWT_SECRET` | Yes | — | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | No | `7d` | Token expiration duration |
| `UPLOAD_DIR` | No | `./uploads` | Directory for file uploads |
| `NODE_ENV` | No | `development` | Set to `production` for production builds |

---

## Database Setup and Seeding

### MongoDB Installation (Ubuntu 22.04/24.04)

```bash
# Import MongoDB GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable
sudo systemctl start mongod
sudo systemctl enable mongod
```

### MongoDB Atlas (Cloud Option)

For production deployments, MongoDB Atlas is recommended. Create a free or paid cluster at [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas), then update the `MONGODB_URI` in `server/.env`:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hydradrop?retryWrites=true&w=majority
```

Ensure you whitelist your server's IP address in the Atlas Network Access settings.

### Database Indexes

The seed script creates the necessary collections. For production performance, add these indexes manually or via a migration script:

```javascript
// Run in mongosh
use hydradrop;

db.products.createIndex({ category: 1, isActive: 1 });
db.products.createIndex({ name: "text", description: "text" });
db.orders.createIndex({ customer: 1, createdAt: -1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ orderNumber: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.customizationrequests.createIndex({ status: 1, createdAt: -1 });
```

### Backup Strategy

```bash
# Daily backup script (add to cron)
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
mkdir -p $BACKUP_DIR
mongodump --uri="mongodb://localhost:27017/hydradrop" --out="$BACKUP_DIR/$TIMESTAMP"
# Retain last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +
```

Add to crontab for daily execution at 2:00 AM IST:

```bash
0 2 * * * /path/to/backup.sh >> /var/log/mongodb-backup.log 2>&1
```

---

## Production Build

### Frontend Build

```bash
# From project root
npm run build
```

This generates optimized static files in the `dist/` directory. The output includes:
- Minified JavaScript bundles with code splitting
- Optimized CSS with Tailwind purging
- Hashed filenames for cache busting

### Backend Preparation

The backend does not require a build step since it runs directly on Node.js. However, ensure `NODE_ENV=production` is set for optimal performance:

```bash
cd server
NODE_ENV=production node index.js
```

---

## Deployment Options

### Option A: Single VPS (Recommended for Launch)

This is the simplest approach for an initial business launch. A single VPS (e.g., DigitalOcean Droplet, AWS EC2, or Hostinger VPS) hosts both the frontend static files and the backend API.

**Recommended Specs for Launch:**

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 1 vCPU | 2 vCPU |
| RAM | 1 GB | 2 GB |
| Storage | 25 GB SSD | 50 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS |

**Deployment Steps:**

```bash
# 1. SSH into your server
ssh user@your-server-ip

# 2. Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PM2 globally
sudo npm install -g pm2

# 4. Install MongoDB (see Database Setup section above)

# 5. Clone the repository
git clone https://github.com/Animesh-jsx/Hydro-Drop.git /var/www/hydradrop
cd /var/www/hydradrop

# 6. Install dependencies and build frontend
npm install
npm run build

# 7. Setup backend
cd server
npm install --production
cp .env.example .env  # Edit with production values
cd ..

# 8. Start backend with PM2
pm2 start server/index.js --name "hydradrop-api" --env production
pm2 save
pm2 startup  # Follow the output instructions

# 9. Install and configure Nginx (see next section)
```

### Option B: Separate Frontend (Vercel/Netlify) + Backend (Railway/Render)

This approach separates concerns and leverages managed platforms for zero-ops deployment.

**Frontend on Vercel:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
vercel --prod
```

Set the environment variable in the Vercel dashboard:
- `VITE_API_URL` = `https://api.hydradrop.in/api`

**Backend on Railway:**

1. Create a new project at [railway.app](https://railway.app)
2. Connect the GitHub repository
3. Set the root directory to `server/`
4. Add environment variables in the Railway dashboard
5. Add a MongoDB plugin or use MongoDB Atlas

### Option C: Docker Compose (Recommended for Scaling)

Create a `docker-compose.yml` at the project root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: hydradrop-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: hydradrop

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: hydradrop-api
    restart: unless-stopped
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - NODE_ENV=production
      - PORT=5000
      - MONGODB_URI=mongodb://mongodb:27017/hydradrop
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=7d
    volumes:
      - uploads:/app/uploads

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: hydradrop-web
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - certbot_data:/etc/letsencrypt

volumes:
  mongo_data:
  uploads:
  certbot_data:
```

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN mkdir -p uploads/logos
EXPOSE 5000
CMD ["node", "index.js"]
```

Create `Dockerfile.frontend` at the project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Production stage
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

Deploy with:

```bash
JWT_SECRET=$(openssl rand -base64 64) docker-compose up -d
```

---

## Reverse Proxy with Nginx

### Installation

```bash
sudo apt-get install -y nginx
sudo systemctl enable nginx
```

### Configuration

Create `/etc/nginx/sites-available/hydradrop`:

```nginx
server {
    listen 80;
    server_name hydradrop.in www.hydradrop.in;

    # Frontend static files
    root /var/www/hydradrop/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 256;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
        proxy_send_timeout 90s;
    }

    # Upload files proxy
    location /uploads/ {
        proxy_pass http://127.0.0.1:5000/uploads/;
        proxy_set_header Host $host;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Static asset caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/hydradrop /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## SSL and Domain Configuration

### Domain DNS Setup

Configure your domain registrar with the following DNS records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `your-server-ip` | 3600 |
| A | www | `your-server-ip` | 3600 |
| CNAME | api | `hydradrop.in` | 3600 |

### Let's Encrypt SSL (Free)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d hydradrop.in -d www.hydradrop.in

# Auto-renewal is configured automatically
# Verify with:
sudo certbot renew --dry-run
```

After SSL is configured, update the frontend environment variable:

```bash
VITE_API_URL=https://hydradrop.in/api
```

Rebuild the frontend:

```bash
npm run build
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hydra Drop

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/hydradrop
            git pull origin main
            npm ci
            npm run build
            cd server
            npm ci --production
            pm2 restart hydradrop-api
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `SERVER_HOST` | Your VPS IP address or hostname |
| `SERVER_USER` | SSH username (e.g., `ubuntu` or `deploy`) |
| `SSH_PRIVATE_KEY` | Private SSH key for authentication |

---

## Monitoring and Logging

### PM2 Monitoring

```bash
# View running processes
pm2 status

# View real-time logs
pm2 logs hydradrop-api

# Monitor CPU/Memory
pm2 monit

# Setup log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Application Health Check

Create a simple health monitoring script at `/opt/scripts/healthcheck.sh`:

```bash
#!/bin/bash
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health)
if [ "$RESPONSE" != "200" ]; then
  echo "[$(date)] API health check failed with status $RESPONSE" >> /var/log/hydradrop-health.log
  pm2 restart hydradrop-api
  echo "[$(date)] API restarted" >> /var/log/hydradrop-health.log
fi
```

Add to crontab (every 5 minutes):

```bash
*/5 * * * * /opt/scripts/healthcheck.sh
```

### MongoDB Monitoring

```bash
# Check MongoDB status
mongosh --eval "db.serverStatus().connections"

# Monitor slow queries (add to mongod.conf)
# operationProfiling:
#   mode: slowOp
#   slowOpThresholdMs: 100
```

---

## Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` on API calls | Backend not running or wrong port | Verify `pm2 status` shows the process as online; check `PORT` in `.env` |
| `MongoNetworkError` | MongoDB not running or wrong URI | Run `sudo systemctl status mongod`; verify `MONGODB_URI` |
| Frontend shows blank page | Build not deployed or Nginx misconfigured | Check `dist/` exists; verify Nginx `root` path; check browser console |
| CORS errors in browser | Frontend URL not in CORS whitelist | Update CORS config in `server/index.js` to include your domain |
| 502 Bad Gateway | Backend crashed or not started | Check `pm2 logs hydradrop-api`; restart with `pm2 restart hydradrop-api` |
| JWT token expired | Token lifetime exceeded | User must log in again; adjust `JWT_EXPIRES_IN` if needed |
| File uploads failing | Missing uploads directory or permissions | Run `mkdir -p server/uploads/logos && chmod 755 server/uploads` |
| Slow page loads | No gzip or caching configured | Verify Nginx gzip and cache headers are active |

### Useful Diagnostic Commands

```bash
# Check if ports are in use
sudo lsof -i :5000
sudo lsof -i :80
sudo lsof -i :27017

# Test MongoDB connection
mongosh --eval "db.adminCommand('ping')"

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check PM2 error logs
pm2 logs hydradrop-api --err --lines 50

# Test API directly
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hydradrop.in","password":"admin123"}'

# Check disk space
df -h

# Check memory usage
free -m
```

### Production Security Checklist

Before going live, ensure the following items are addressed:

| Item | Status | Action Required |
|------|--------|-----------------|
| Change default admin password | Required | Login and update via Settings page |
| Generate strong JWT_SECRET | Required | Use `openssl rand -base64 64` |
| Enable HTTPS | Required | Configure Let's Encrypt SSL |
| Set `NODE_ENV=production` | Required | Add to `server/.env` |
| Configure MongoDB authentication | Recommended | Enable auth in `mongod.conf` |
| Set up firewall (UFW) | Recommended | Allow only ports 22, 80, 443 |
| Enable rate limiting | Recommended | Already included in Express middleware |
| Configure backup schedule | Required | Set up daily mongodump cron job |
| Remove seed data | Required | Drop and recreate with real data |
| Update CORS origins | Required | Restrict to your domain only |

### Firewall Setup (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## Quick Reference

### Start Everything (Development)

```bash
# Terminal 1: MongoDB (if not running as service)
mongod --dbpath /data/db

# Terminal 2: Backend
cd Hydro-Drop/server && node index.js

# Terminal 3: Frontend
cd Hydro-Drop && npm run dev
```

### Start Everything (Production)

```bash
# Ensure MongoDB is running
sudo systemctl start mongod

# Start backend with PM2
cd /var/www/hydradrop/server
pm2 start index.js --name hydradrop-api --env production

# Frontend is served by Nginx from dist/
sudo systemctl start nginx
```

### Admin Access

| Environment | URL | Credentials |
|-------------|-----|-------------|
| Development | http://localhost:5173/admin/login | admin@hydradrop.in / admin123 |
| Production | https://hydradrop.in/admin/login | (change after first login) |

---

*Last updated: 27 June 2026*
*Hydra Drop — Premium Pure Water, Kolkata, West Bengal, India*
