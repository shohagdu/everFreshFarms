#!/bin/bash

#cd /var/www/personal/everFreshFarms
 # bash build-deploy.sh

set -e

PROJECT_DIR="/var/www/personal/everFreshFarms"
DEPLOY_DIR="$PROJECT_DIR/deployCpanelServer"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "========================================="
echo "  Ever Fresh Farm — Build & Deploy Sync"
echo "========================================="

# ─── Step 1: Build React frontend ────────────────────────────────────────────
echo ""
echo "[1/4] Building React frontend..."
cd "$FRONTEND_DIR"
npm run build
echo "      ✓ Frontend built"

# ─── Step 2: Sync public_html ─────────────────────────────────────────────────
echo ""
echo "[2/4] Syncing public_html..."
rsync -a --delete \
  --exclude='storage/' \
  "$BACKEND_DIR/public/" \
  "$DEPLOY_DIR/public_html/"

# Always use the cPanel-ready index.php (not the local one)
cat > "$DEPLOY_DIR/public_html/index.php" << 'EOF'
<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Laravel app lives at /home/USERNAME/everfresh_laravel/ (outside public_html)
$laravelPath = __DIR__ . '/../../everfresh_laravel';

if (file_exists($maintenance = $laravelPath . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

require $laravelPath . '/vendor/autoload.php';

/** @var Application $app */
$app = require_once $laravelPath . '/bootstrap/app.php';

$app->handleRequest(Request::capture());
EOF

echo "      ✓ public_html synced"

# ─── Step 3: Sync everfresh_laravel ──────────────────────────────────────────
echo ""
echo "[3/4] Syncing everfresh_laravel..."
rsync -a --delete \
  --exclude='public/' \
  --exclude='.git/' \
  --exclude='.idea/' \
  --exclude='node_modules/' \
  --exclude='.env' \
  --exclude='.env.production' \
  --exclude='everfreshfarms_db' \
  --exclude='storage/logs/*.log' \
  --exclude='storage/framework/cache/*' \
  --exclude='storage/framework/sessions/*' \
  --exclude='storage/framework/views/*' \
  --exclude='bootstrap/cache/*.php' \
  "$BACKEND_DIR/" \
  "$DEPLOY_DIR/everfresh_laravel/"

# Ensure storage directory structure exists
mkdir -p "$DEPLOY_DIR/everfresh_laravel/storage/framework/"{sessions,views,cache/data}
mkdir -p "$DEPLOY_DIR/everfresh_laravel/storage/"{logs,app/public,app/livewire-tmp}
mkdir -p "$DEPLOY_DIR/everfresh_laravel/bootstrap/cache"

echo "      ✓ everfresh_laravel synced"

# ─── Step 4: Keep .env (don't overwrite production credentials) ───────────────
echo ""
echo "[4/4] Checking .env..."
if [ ! -f "$DEPLOY_DIR/everfresh_laravel/.env" ]; then
  cp "$PROJECT_DIR/backend/.env.production" "$DEPLOY_DIR/everfresh_laravel/.env"
  echo "      ✓ .env created from .env.production (fill in DB credentials)"
else
  echo "      ✓ .env already exists (not overwritten)"
fi

# ─── Done ─────────────────────────────────────────────────────────────────────
echo ""
echo "========================================="
echo "  Done! deployCpanelServer is up to date"
echo "========================================="
echo ""
echo "Upload to cPanel:"
echo "  deployCpanelServer/public_html/      → /home/USERNAME/public_html/"
echo "  deployCpanelServer/everfresh_laravel/ → /home/USERNAME/everfresh_laravel/"
echo ""
echo "Then run on server:"
echo "  php artisan config:cache"
echo "  php artisan route:cache"
echo "  php artisan view:clear"
echo "  php artisan optimize"
echo ""