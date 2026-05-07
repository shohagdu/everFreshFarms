# cPanel Deployment Guide
## Ever Fresh Farm — React (Vite) + Laravel + Filament

---

## Server Folder Structure

```
/home/USERNAME/
├── everfresh_laravel/          ← Laravel app (PRIVATE — outside public_html)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── artisan
│   ├── composer.json
│   └── .env
│
└── public_html/                ← Web root (accessible via https://yourdomain.com)
    ├── index.php               ← Laravel entry point (points to ../everfresh_laravel)
    ├── .htaccess               ← Custom rules for React + Laravel + Filament
    ├── index.html              ← React frontend (SPA)
    ├── assets/                 ← React JS/CSS build output
    ├── vendor/
    │   └── livewire/           ← Published Livewire JS assets
    │       ├── livewire.min.js
    │       └── manifest.json
    ├── storage/                ← Symlink → everfresh_laravel/storage/app/public
    ├── favicon.svg
    ├── logo.png
    ├── logo.jpeg
    └── farm.jpeg
```

> Replace `USERNAME` with your actual cPanel account username throughout this guide.

---

## STEP 1 — Build the React Frontend

On your **local machine**:

```bash
cd frontend
npm install
npm run build
```

This creates `frontend/dist/` with all static files.

Then copy the build output into `backend/public/`:

```bash
cp -r frontend/dist/* backend/public/
```

---

## STEP 2 — Prepare the `.env` File

Create `backend/.env` for production:

```env
APP_NAME="Ever Fresh Farm"
APP_ENV=production
APP_KEY=base64:GENERATE_THIS_BELOW
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=USERNAME_dbname
DB_USERNAME=USERNAME_dbuser
DB_PASSWORD=your_db_password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_PATH=/
SESSION_DOMAIN=null

FILESYSTEM_DISK=public
QUEUE_CONNECTION=database
CACHE_STORE=database

MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USERNAME=info@yourdomain.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="info@yourdomain.com"
MAIL_FROM_NAME="Ever Fresh Farm"

LIVEWIRE_UPDATE_URI=/livewire/update
```

Generate the APP_KEY:
```bash
cd backend
php artisan key:generate --show
```
Paste the output into `APP_KEY=` above.

---

## STEP 3 — Upload Files to cPanel

### 3a. Upload the Laravel app (private — outside public_html)

Upload all contents of `backend/` **except** the `public/` folder to:
```
/home/USERNAME/everfresh_laravel/
```

**Skip these** (local-only):
- `node_modules/`
- `.git/`
- `public/` ← goes to public_html instead (see 3b)

**Required files/folders:**
```
app/
bootstrap/
config/
database/
resources/
routes/
storage/
vendor/
artisan
composer.json
composer.lock
.env          ← the production one from Step 2
```

### 3b. Upload public files (web root)

Upload all contents of `backend/public/` to:
```
/home/USERNAME/public_html/
```

This includes:
```
index.php           ← Laravel entry (uses ../everfresh_laravel path)
.htaccess           ← cPanel-specific rules
index.html          ← React SPA
assets/             ← React build output
vendor/livewire/    ← Livewire JS assets
favicon.svg
logo.png
logo.jpeg
farm.jpeg
robots.txt
```

---

## STEP 4 — Set Up the Database

1. Go to cPanel → **MySQL Databases**
2. Create a database — e.g. `everfresh` → becomes `USERNAME_everfresh`
3. Create a user — e.g. `dbuser` → becomes `USERNAME_dbuser`
4. Add user to database with **All Privileges**
5. Update the `.env` on the server with these exact names

---

## STEP 5 — Run Laravel Setup (cPanel Terminal)

Go to **cPanel → Terminal**:

```bash
cd /home/USERNAME/everfresh_laravel

# Run database migrations (creates all tables including sessions)
php artisan migrate --force

# Clear and rebuild caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
php artisan optimize
```

---

## STEP 6 — Create the Storage Symlink

`php artisan storage:link` won't work here because `public/` is in a different location. Create it manually:

```bash
ln -s /home/USERNAME/everfresh_laravel/storage/app/public \
      /home/USERNAME/public_html/storage
```

Verify:
```bash
ls -la /home/USERNAME/public_html/storage
# Should show: storage -> /home/USERNAME/everfresh_laravel/storage/app/public
```

---

## STEP 7 — Set Folder Permissions

```bash
cd /home/USERNAME/everfresh_laravel

chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

---

## STEP 8 — Verify Everything

| URL | Expected Result |
|-----|----------------|
| `https://yourdomain.com/` | React frontend loads |
| `https://yourdomain.com/api/site-settings` | JSON response |
| `https://yourdomain.com/admin/login` | Filament login page loads |
| `https://yourdomain.com/admin` | Redirects to login or dashboard |
| `https://yourdomain.com/vendor/livewire/livewire.min.js` | Returns JavaScript (not HTML) |

---

## Key Files Explained

### `backend/public/index.php`
Points to the Laravel app using a relative path:
```php
$laravelPath = __DIR__ . '/../everfresh_laravel';
```
When deployed at `public_html/index.php`, this correctly resolves to `/home/USERNAME/everfresh_laravel`.

### `backend/public/.htaccess`
Handles three types of requests:
- **Existing files/folders** → served directly (images, CSS, JS, vendor assets)
- **`api/`, `admin/`, `livewire/`, `filament/`** → routed to `index.php` (Laravel)
- **Everything else** → serves `index.html` (React SPA)

### `backend/public/vendor/livewire/manifest.json`
Tells Livewire where to find its published JavaScript:
```json
{"/livewire.js":"livewire.min.js"}
```
The browser loads `/vendor/livewire/livewire.min.js` which is a real static file in `public_html/vendor/livewire/`. Without this file being accessible, the Filament admin login form falls back to a native HTML POST and returns **405 Method Not Allowed**.

---

## Troubleshooting

### 500 Server Error
```bash
# Check Laravel error log
tail -50 /home/USERNAME/everfresh_laravel/storage/logs/laravel.log
```

### 405 Method Not Allowed on admin login
The Livewire JS is not loading. Check:
```bash
# Test in browser — must return JavaScript, NOT HTML
curl https://yourdomain.com/vendor/livewire/livewire.min.js | head -5
```
If it returns HTML, the `vendor/livewire/` folder is missing from `public_html/`.

### 419 Page Expired (CSRF error)
The sessions table is missing. Run:
```bash
cd /home/USERNAME/everfresh_laravel
php artisan migrate --force
```

### Images not loading
```bash
# Check symlink
ls -la /home/USERNAME/public_html/storage

# Fix permissions
chmod -R 775 /home/USERNAME/everfresh_laravel/storage
```

### API returning 404
- Confirm `.htaccess` routes `api/*` to `index.php`
- Check `mod_rewrite` is enabled (contact host if needed)

### React routes 404 on page refresh
The `.htaccess` catch-all `RewriteRule ^ index.html [L]` handles this. Make sure the `.htaccess` is the cPanel version from `backend/public/`, not the default Laravel one.

---

## Deployment Checklist

- [ ] React built and copied into `backend/public/`
- [ ] Production `.env` created with correct DB credentials and APP_KEY
- [ ] `backend/` contents (excluding `public/`) uploaded to `everfresh_laravel/`
- [ ] `backend/public/` contents uploaded to `public_html/`
- [ ] Database and user created in cPanel MySQL
- [ ] `php artisan migrate --force` run
- [ ] Storage symlink created: `public_html/storage → everfresh_laravel/storage/app/public`
- [ ] Folder permissions set (775 on storage and bootstrap/cache)
- [ ] All caches cleared (`config:clear`, `route:clear`, `view:clear`, `cache:clear`)
- [ ] `https://yourdomain.com/vendor/livewire/livewire.min.js` returns JavaScript
- [ ] `https://yourdomain.com/admin/login` loads and login works
