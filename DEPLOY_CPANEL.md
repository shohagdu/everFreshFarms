
# cPanel Shared Hosting Deployment Guide
## Ever Fresh Farm — React (Vite) + Laravel

---

## Overview

The site will live at: `https://yourdomain.com/everfresh_farm`

**Server folder structure on cPanel:**
```
/home/cpanelusername/
├── everfresh_laravel/          ← Laravel app (private, NOT inside public_html)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   └── ...
└── public_html/
    └── everfresh_farm/         ← Web-accessible folder (Laravel public + React build)
        ├── index.php           (modified)
        ├── .htaccess
        ├── storage → symlink
        └── assets/             (React build output)
```

---

## STEP 1 — Build the React Frontend

On your **local machine**:

### 1a. Update `frontend/vite.config.js`
Change the base URL to match the subfolder:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/everfresh_farm/',   // ← ADD THIS LINE
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### 1b. Update `frontend/src/services/api.js`
Change the baseURL to an absolute path:

```js
const api = axios.create({
  baseURL: '/everfresh_farm/api',   // ← update this
  headers: { 'Accept': 'application/json' },
});
```

### 1c. Run the build

```bash
cd frontend
npm install
npm run build
```

This creates `frontend/dist/` folder with all static files.

---

## STEP 2 — Prepare Laravel for Production

On your **local machine**:

### 2a. Install dependencies (production only)

```bash
cd backend
composer install --optimize-autoloader --no-dev
```

### 2b. Copy React build into Laravel public folder

Copy everything from `frontend/dist/` into `backend/public/`:

```bash
cp -r frontend/dist/* backend/public/
```

Your `backend/public/` should now contain:
```
backend/public/
├── index.php          (Laravel's — keep this)
├── .htaccess          (Laravel's — keep this)
├── index.html         (React's — from dist)
├── assets/            (React JS/CSS files)
├── logo.png
├── logo.jpeg
└── farm.jpeg
```

### 2c. Update Laravel `public/index.php` paths

Since Laravel files will be in `everfresh_laravel/` (outside public_html), update path references.

Open `backend/public/index.php` and change:

```php
// FROM:
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

// TO:
require __DIR__.'/../../everfresh_laravel/vendor/autoload.php';
$app = require_once __DIR__.'/../../everfresh_laravel/bootstrap/app.php';
```

---

## STEP 3 — Create `.env` for Production

Create a new `.env` file for production (copy from backend/.env and edit):

```env
APP_NAME="Ever Fresh Farm"
APP_ENV=production
APP_KEY=         ← generate below
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=cpanelusername_everfresh
DB_USERNAME=cpanelusername_dbuser
DB_PASSWORD=your_db_password

FILESYSTEM_DISK=public
```

Generate APP_KEY locally:
```bash
cd backend
php artisan key:generate --show
```
Copy the output (base64:...) and paste into APP_KEY= above.

---

## STEP 4 — Upload Files to cPanel

### 4a. Upload Laravel app (private folder)

Upload the entire `backend/` folder contents to:
```
/home/cpanelusername/everfresh_laravel/
```

**Do NOT upload** these folders (they are local only):
- `node_modules/`
- `.git/`

**Files to upload:**
- `app/`
- `bootstrap/`
- `config/`
- `database/`
- `resources/`
- `routes/`
- `storage/`
- `vendor/`
- `artisan`
- `composer.json`
- `.env`  ← use the production one from Step 3

### 4b. Upload public files

Upload contents of `backend/public/` to:
```
/home/cpanelusername/public_html/everfresh_farm/
```

Upload these files:
- `index.php`  ← the modified one from Step 2c
- `.htaccess`
- `index.html`
- `assets/`
- `logo.png`, `logo.jpeg`, `farm.jpeg`

---

## STEP 5 — Set Up Database in cPanel

1. Go to cPanel → **MySQL Databases**
2. Create database: `everfresh` → full name becomes `cpanelusername_everfresh`
3. Create user: `dbuser` → full name becomes `cpanelusername_dbuser`
4. Add user to database with **All Privileges**
5. Update `.env` on server with these exact names

---

## STEP 6 — Run Laravel Setup via cPanel Terminal

Go to cPanel → **Terminal** (or SSH if available):

```bash
cd /home/cpanelusername/everfresh_laravel

# Run database migrations
php artisan migrate --force

# Create storage symlink (important!)
php artisan storage:link

# The symlink will be created at:
# public_html/everfresh_farm/storage → everfresh_laravel/storage/app/public
# BUT since public is in a different location, do it manually (see Step 7)

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize
```

---

## STEP 7 — Create Storage Symlink Manually

The `php artisan storage:link` command creates the symlink inside Laravel's `public/` folder, but our web-accessible folder is `public_html/everfresh_farm/`. So create the symlink manually:

In cPanel Terminal:
```bash
ln -s /home/cpanelusername/everfresh_laravel/storage/app/public \
      /home/cpanelusername/public_html/everfresh_farm/storage
```

Verify it works:
```bash
ls -la /home/cpanelusername/public_html/everfresh_farm/storage
```

---

## STEP 8 — Set Folder Permissions

In cPanel Terminal:
```bash
cd /home/cpanelusername/everfresh_laravel

# Storage and cache must be writable
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Make sure web server can write
chown -R cpanelusername:nobody storage
chown -R cpanelusername:nobody bootstrap/cache
```

---

## STEP 9 — Update `.htaccess` in `public_html/everfresh_farm/`

Replace the `.htaccess` in `public_html/everfresh_farm/` with:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /everfresh_farm/

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Serve existing files/folders directly
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f

    # API and admin requests → Laravel (index.php)
    RewriteRule ^ index.php [L]
</IfModule>
```

---

## STEP 10 — Update CORS for Production

On the server, edit `everfresh_laravel/config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'],
'allowed_origins' => ['https://yourdomain.com'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## STEP 11 — Verify Everything

Open browser and test:

| URL | Expected Result |
|-----|----------------|
| `https://yourdomain.com/everfresh_farm/` | React frontend loads |
| `https://yourdomain.com/everfresh_farm/api/site-settings` | JSON response |
| `https://yourdomain.com/everfresh_farm/admin` | Filament admin panel |
| `https://yourdomain.com/everfresh_farm/storage/gallery/images/xxx.jpg` | Image loads |

---

## Troubleshooting

### Blank page / 500 error
```bash
# Check Laravel logs
cat /home/cpanelusername/everfresh_laravel/storage/logs/laravel.log | tail -50
```

### Images not loading
```bash
# Check symlink exists
ls -la /home/cpanelusername/public_html/everfresh_farm/storage

# Check storage permissions
chmod -R 775 /home/cpanelusername/everfresh_laravel/storage
```

### API returning 404
- Check `.htaccess` has `RewriteBase /everfresh_farm/`
- Check `mod_rewrite` is enabled (contact host if needed)

### Database connection error
- Double-check DB credentials in `.env`
- Use `localhost` not `127.0.0.1` for DB_HOST on shared hosting

### React routes 404 on refresh
- The `.htaccess` `RewriteRule ^ index.php [L]` handles this — make sure it's correct

---

## Quick Checklist

- [ ] React built with `base: '/everfresh_farm/'` in vite.config.js
- [ ] `api.js` baseURL updated to `/everfresh_farm/api`
- [ ] React dist copied into `backend/public/`
- [ ] `index.php` paths updated to point to `everfresh_laravel/`
- [ ] Production `.env` created with correct DB credentials and APP_KEY
- [ ] `everfresh_laravel/` uploaded to home directory (outside public_html)
- [ ] `public/` contents uploaded to `public_html/everfresh_farm/`
- [ ] Database created in cPanel MySQL
- [ ] `php artisan migrate --force` run
- [ ] Storage symlink created manually
- [ ] Folder permissions set (775 for storage)
- [ ] `.htaccess` updated with `RewriteBase /everfresh_farm/`
- [ ] CORS updated with production domain
- [ ] All caches cleared
