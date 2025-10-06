#!/bin/bash
# OpenSansad Frontend Deployment Script for opensansad.co.in
# This script handles the production deployment of the Next.js frontend

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="opensansad_frontend"
APP_USER="tusharanand"
APP_DIR="/home/tusharanand/open_sansad"
DOMAIN="www.opensansad.co.in"
DOMAIN_ALT="opensansad.co.in"
PORT=3000

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_sudo() {
    if [ "$EUID" -ne 0 ]; then
        log_error "This script must be run with sudo"
        exit 1
    fi
}

log_step() {
    echo -e "\n${BLUE}==>${NC} $1\n"
}

check_prerequisites() {
    log_step "Checking prerequisites..."
    
    # Check if required packages are available
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        log_info "Node.js installed: $NODE_VERSION"
    else
        log_warn "Node.js not found, will install"
    fi
    
    log_info "Prerequisites check passed"
}

install_nodejs() {
    log_step "Installing Node.js..."
    
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -ge 18 ]; then
            log_info "Node.js version is sufficient: $(node --version)"
            return
        fi
    fi
    
    log_info "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    
    log_info "Node.js installed: $(node --version)"
    log_info "npm installed: $(npm --version)"
}

verify_npm() {
    log_step "Verifying npm installation..."
    
    if command -v npm >/dev/null 2>&1; then
        log_info "npm installed: $(npm --version)"
    else
        log_error "npm not found!"
        exit 1
    fi
}

install_system_packages() {
    log_step "Installing system packages..."
    
    if ! command -v nginx >/dev/null 2>&1; then
        log_info "Installing Nginx..."
        apt-get update
        apt-get install -y nginx
    else
        log_info "Nginx already installed"
    fi
    
    if ! command -v certbot >/dev/null 2>&1; then
        log_info "Installing Certbot..."
        apt-get install -y certbot python3-certbot-nginx
    else
        log_info "Certbot already installed"
    fi
}

setup_environment() {
    log_step "Setting up environment variables..."
    
    ENV_FILE="$APP_DIR/.env.production.local"
    
    if [ ! -f "$ENV_FILE" ]; then
        log_info "Creating production environment file..."
        cat > "$ENV_FILE" <<'EOF'
# OpenSansad Frontend Production Environment
# Auto-generated on deployment

NEXT_PUBLIC_API_URL=https://api.opensansad.co.in/api
NEXT_PUBLIC_API_WS_URL=wss://api.opensansad.co.in/ws

# Node environment
NODE_ENV=production
EOF
        chown $APP_USER:$APP_USER "$ENV_FILE"
        log_info "Created $ENV_FILE"
    else
        log_info "Environment file already exists"
    fi
}

install_dependencies() {
    log_step "Installing Node.js dependencies..."
    cd "$APP_DIR"
    
    # Clean install to avoid conflicts
    log_info "Running npm ci (clean install)..."
    sudo -u $APP_USER npm ci
    log_info "Dependencies installed"
}

build_application() {
    log_step "Building Next.js application..."
    cd "$APP_DIR"
    
    # Remove old build
    if [ -d ".next" ]; then
        log_info "Removing old build..."
        sudo -u $APP_USER rm -rf .next
    fi
    
    log_info "Building production bundle (this may take a few minutes)..."
    sudo -u $APP_USER npm run build
    log_info "Build completed successfully"
}

create_systemd_service() {
    log_step "Creating systemd service..."
    
    SERVICE_FILE="/etc/systemd/system/opensansad-frontend.service"
    
    cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=OpenSansad Frontend Next.js Application
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_DIR
Environment="NODE_ENV=production"
Environment="PORT=$PORT"
EnvironmentFile=$APP_DIR/.env.production.local
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=opensansad-frontend

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF

    log_info "Systemd service file created"
    systemctl daemon-reload
    
    if ! systemctl is-enabled opensansad-frontend >/dev/null 2>&1; then
        systemctl enable opensansad-frontend
        log_info "Enabled opensansad-frontend service"
    fi
}

setup_nginx() {
    log_step "Setting up Nginx..."
    
    NGINX_CONF="/etc/nginx/sites-available/opensansad-frontend"
    
    # Check if SSL certificates exist
    if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        log_info "SSL certificates don't exist yet - creating HTTP-only config first"
        
        cat > "$NGINX_CONF" <<'NGINX_CONF'
# OpenSansad Frontend - HTTP Configuration
# SSL will be added after certbot verification

upstream nextjs_frontend {
    server 127.0.0.1:3000 fail_timeout=30s max_fails=3;
    keepalive 32;
}

# Handle both www and non-www for certbot verification
server {
    listen 80;
    listen [::]:80;
    server_name www.opensansad.co.in opensansad.co.in;
    
    # Allow certbot to verify both domains
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files $uri =404;
    }
    
    # Logging
    access_log /var/log/nginx/opensansad_frontend_access.log combined;
    error_log /var/log/nginx/opensansad_frontend_error.log warn;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Max upload size
    client_max_body_size 10M;
    
    # Next.js static files
    location /_next/static/ {
        proxy_pass http://nextjs_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Next.js public files
    location /images/ {
        proxy_pass http://nextjs_frontend;
        expires 1h;
        add_header Cache-Control "public";
    }
    
    location /favicon.ico {
        proxy_pass http://nextjs_frontend;
        expires 1h;
        add_header Cache-Control "public";
        access_log off;
    }
    
    # All other requests
    location / {
        proxy_pass http://nextjs_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120;
        proxy_connect_timeout 120;
        proxy_send_timeout 120;
    }
}
NGINX_CONF
    else
        log_info "SSL certificates exist - using full SSL config"
        
        cat > "$NGINX_CONF" <<'NGINX_CONF'
# OpenSansad Frontend - HTTPS Configuration

upstream nextjs_frontend {
    server 127.0.0.1:3000 fail_timeout=30s max_fails=3;
    keepalive 32;
}

# Redirect HTTP to HTTPS (non-www)
server {
    listen 80;
    listen [::]:80;
    server_name opensansad.co.in;
    return 301 https://www.opensansad.co.in$request_uri;
}

# Redirect HTTP to HTTPS (www)
server {
    listen 80;
    listen [::]:80;
    server_name www.opensansad.co.in;
    return 301 https://$host$request_uri;
}

# Redirect HTTPS non-www to www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name opensansad.co.in;
    
    ssl_certificate /etc/letsencrypt/live/www.opensansad.co.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.opensansad.co.in/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    return 301 https://www.opensansad.co.in$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.opensansad.co.in;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/www.opensansad.co.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.opensansad.co.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Logging
    access_log /var/log/nginx/opensansad_frontend_access.log combined;
    error_log /var/log/nginx/opensansad_frontend_error.log warn;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Max upload size
    client_max_body_size 10M;
    
    # Next.js static files
    location /_next/static/ {
        proxy_pass http://nextjs_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Cache static assets
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Next.js public files
    location /images/ {
        proxy_pass http://nextjs_frontend;
        expires 1h;
        add_header Cache-Control "public";
    }
    
    location /favicon.ico {
        proxy_pass http://nextjs_frontend;
        expires 1h;
        add_header Cache-Control "public";
        access_log off;
    }
    
    # All other requests
    location / {
        proxy_pass http://nextjs_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120;
        proxy_connect_timeout 120;
        proxy_send_timeout 120;
    }
}
NGINX_CONF
    fi
    
    # Enable site
    if [ ! -L /etc/nginx/sites-enabled/opensansad-frontend ]; then
        ln -s /etc/nginx/sites-available/opensansad-frontend /etc/nginx/sites-enabled/
        log_info "Nginx site enabled"
    else
        log_info "Nginx site already enabled"
    fi
    
    # Test configuration
    if nginx -t 2>&1 | grep -q "successful"; then
        log_info "Nginx configuration is valid"
    else
        log_error "Nginx configuration test failed!"
        nginx -t
        exit 1
    fi
    
    # Reload nginx
    systemctl reload nginx || systemctl start nginx
    log_info "Nginx reloaded"
}

restart_service() {
    log_step "Starting frontend service..."
    
    systemctl restart opensansad-frontend
    log_info "Started Next.js service"
    
    # Reload Nginx
    systemctl reload nginx
    log_info "Reloaded Nginx"
}

setup_ssl() {
    log_step "Setting up SSL certificate..."
    
    # Check if certificate already exists
    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        log_info "SSL certificate already exists for $DOMAIN"
        
        # Update to full SSL config
        log_info "Updating to full SSL configuration..."
        setup_nginx
        return
    fi
    
    # Check if DNS is resolving
    log_info "Checking DNS resolution for $DOMAIN..."
    SERVER_IP=$(curl -s ifconfig.me)
    DNS_IP=$(dig +short $DOMAIN @8.8.8.8 | head -1)
    
    if [ -z "$DNS_IP" ]; then
        log_warn "DNS is not resolving yet for $DOMAIN"
        log_warn "Please wait for DNS propagation and run this script again"
        log_info "You can check DNS with: dig $DOMAIN"
        log_info "Frontend is accessible via HTTP at: http://$DOMAIN"
        return
    fi
    
    log_info "Server IP: $SERVER_IP"
    log_info "DNS resolving to: $DNS_IP"
    
    if [ "$DNS_IP" != "$SERVER_IP" ]; then
        log_warn "DNS is pointing to $DNS_IP but this server is $SERVER_IP"
        log_warn "Update your DNS A record to point to: $SERVER_IP"
        log_warn "Frontend is accessible via HTTP at: http://$DOMAIN"
        return
    fi
    
    # Create webroot directory for certbot
    mkdir -p /var/www/html/.well-known/acme-challenge
    
    log_info "Obtaining SSL certificate from Let's Encrypt..."
    if certbot certonly --webroot -w /var/www/html -d $DOMAIN -d $DOMAIN_ALT --non-interactive --agree-tos --email tusharanand1594@gmail.com; then
        log_info "SSL certificate installed successfully"
        
        # Now update to full SSL config
        log_info "Updating to full SSL configuration..."
        setup_nginx
    else
        log_warn "SSL certificate installation failed"
        log_warn "Frontend is still accessible via HTTP at: http://$DOMAIN"
        log_info "Make sure DNS points to this server: $SERVER_IP"
        log_info "Then run: sudo certbot certonly --webroot -w /var/www/html -d $DOMAIN -d $DOMAIN_ALT"
    fi
}

check_health() {
    log_step "Checking application health..."
    sleep 5  # Wait for service to start
    
    # Check if application is responding
    if curl -s -f http://localhost:$PORT/ > /dev/null; then
        log_info "✓ Application is healthy!"
        log_info "✓ Local health check: http://localhost:$PORT/"
    else
        log_error "Application health check failed!"
        log_error "Check logs: sudo journalctl -u opensansad-frontend -n 50"
        exit 1
    fi
}

print_summary() {
    log_step "🎉 Frontend Deployment Complete!"
    
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}Service Status:${NC}"
    echo -e "  ✓ Next.js Frontend - Running on port $PORT"
    echo -e "  ✓ Nginx            - Reverse proxy configured"
    echo ""
    echo -e "${GREEN}Access Points:${NC}"
    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        echo -e "  🌐 Website: ${BLUE}https://$DOMAIN${NC}"
        echo -e "  🌐 Alt URL: ${BLUE}https://$DOMAIN_ALT${NC} (redirects to www)"
    else
        echo -e "  🌐 Website: ${BLUE}http://$DOMAIN${NC} (HTTP only - SSL pending)"
        echo -e "  🌐 Alt URL: ${BLUE}http://$DOMAIN_ALT${NC} (redirects to www)"
    fi
    echo ""
    echo -e "${GREEN}Backend Integration:${NC}"
    echo -e "  🔌 API Endpoint: ${BLUE}https://api.opensansad.co.in${NC}"
    echo ""
    echo -e "${GREEN}Useful Commands:${NC}"
    echo -e "  Check status:    ${YELLOW}sudo systemctl status opensansad-frontend${NC}"
    echo -e "  View logs:       ${YELLOW}sudo journalctl -u opensansad-frontend -f${NC}"
    echo -e "  Restart app:     ${YELLOW}sudo systemctl restart opensansad-frontend${NC}"
    echo -e "  Rebuild app:     ${YELLOW}cd $APP_DIR && sudo -u $APP_USER npm run build${NC}"
    echo ""
    echo -e "${GREEN}Quick Redeploy:${NC}"
    echo -e "  ${YELLOW}cd $APP_DIR${NC}"
    echo -e "  ${YELLOW}git pull origin main${NC}"
    echo -e "  ${YELLOW}sudo ./deploy-frontend.sh${NC}"
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
}

# Main deployment flow
main() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║  OpenSansad Frontend Deployment                       ║"
    echo "║  www.opensansad.co.in                                 ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    check_sudo
    check_prerequisites
    install_nodejs
    verify_npm
    install_system_packages
    setup_environment
    install_dependencies
    build_application
    create_systemd_service
    setup_nginx
    restart_service
    check_health
    setup_ssl
    print_summary
}

# Run main function
main "$@"
