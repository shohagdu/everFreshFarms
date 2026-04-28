# Ever Fresh Farm — cPanel Deployment Guide

**Live URL:** https://everfreshfarmsbd.com  
**Stack:** Laravel 12 (backend) + React/Vite (frontend) + Filament Admin

---

## Folder Structure on cPanel Server

```
/home/USERNAME/
├── everfresh_laravel/        ← Laravel app (PRIVATE — outside public_html)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── artisan
│   └── .env                  ← fill in your DB credentials
│
└── public_html/              ← Web-accessible (React build + Laravel public)
    ├── index.php             ← already modified for cPanel paths
    ├── .htaccess
    ├── index.html            ← React frontend
    ├── assets/               ← React JS/CSS
    ├── logo.png
    ├── logo.jpeg
    ├── farm.jpeg
    ├── favicon.ico
    ├── robots.txt
    └── storage/              ← symlink (created in Step 4 below)
```

---

## STEP 1 — Upload Files

### Upload Laravel app
Upload everything inside `everfresh_laravel/` to:
```
/home/USERNAME/everfresh_laravel/
```

### Upload public files
Upload everything inside `public_html/` to:
```
/home/USERNAME/public_html/
```

> **Note:** Replace `USERNAME` with your actual cPanel account username everywhere in this guide.

---

## STEP 2 — Configure the `.env` File

Open `/home/USERNAME/everfresh_laravel/.env` in cPanel File Manager and fill in your database credentials:

```env
APP_NAME="Ever Fresh Farm"
APP_ENV=production
APP_KEY=base64:ajhbii2stbdsxL5T1a9gVyIwuLMzN38t11Ls4whMqBE=
APP_DEBUG=false
APP_URL=https://everfreshfarmsbd.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=YOUR_CPANEL_DB_NAME        ← e.g. username_everfresh
DB_USERNAME=YOUR_CPANEL_DB_USER        ← e.g. username_dbuser
DB_PASSWORD=YOUR_CPANEL_DB_PASSWORD

FILESYSTEM_DISK=public
SESSION_DRIVER=database
CACHE_STORE=database
```

> **Important:** On cPanel, DB_HOST must be `localhost` (not 127.0.0.1).

---

## STEP 3 — Create MySQL Database in cPanel

1. Go to **cPanel → MySQL Databases**
2. Create a new database — e.g. `everfresh`  
   (cPanel will prefix it: `USERNAME_everfresh`)
3. Create a new user — e.g. `dbuser` with a strong password  
   (cPanel will prefix it: `USERNAME_dbuser`)
4. Add the user to the database with **All Privileges**
5. Update `.env` with these exact full names

---

## STEP 4 — Run Commands in cPanel Terminal

Go to **cPanel → Terminal** and run the following:

```bash
# Create the storage symlink in public_html
ln -s /home/USERNAME/everfresh_laravel/storage/app/public /home/USERNAME/public_html/storage

# Set correct permissions
chmod -R 775 /home/USERNAME/everfresh_laravel/storage
chmod -R 775 /home/USERNAME/everfresh_laravel/bootstrap/cache

# Go to Laravel directory
cd /home/USERNAME/everfresh_laravel

# Run database migrations
php artisan migrate --force

# Seed the database (creates admin user)
php artisan db:seed --force

# Cache config, routes and views for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

---

## STEP 5 — Verify the Site

Open your browser and test:

| URL | Expected |
|-----|----------|
| `https://everfreshfarmsbd.com/` | React frontend loads |
| `https://everfreshfarmsbd.com/api/site-settings` | JSON response |
| `https://everfreshfarmsbd.com/admin` | Filament admin login page |
| `https://everfreshfarmsbd.com/storage/gallery/images/xxx.jpg` | Image loads |

---

## Admin Login

| Field | Value |
|-------|-------|
| URL | https://everfreshfarmsbd.com/admin |
| Email | admin@everfreshfarm.com |
| Password | password |

> **Change the admin password immediately after first login.**

---

## Troubleshooting

### 500 Internal Server Error
```bash
# Check Laravel logs
tail -50 /home/USERNAME/everfresh_laravel/storage/logs/laravel.log
```

### Blank white page
- Make sure `.env` DB credentials are correct
- Make sure `APP_KEY` is set in `.env`
- Check `APP_DEBUG=true` temporarily to see the error, then set back to `false`

### Images not loading
```bash
# Check symlink exists
ls -la /home/USERNAME/public_html/storage

# Re-create if missing
ln -s /home/USERNAME/everfresh_laravel/storage/app/public /home/USERNAME/public_html/storage
```

### API returning 404
- Make sure `.htaccess` is uploaded to `public_html/`
- Contact your host to confirm `mod_rewrite` is enabled

### Database connection error
- Use `localhost` not `127.0.0.1` for `DB_HOST`
- Double check the full database name and username (with cPanel prefix)

### Admin panel CSS not loading (unstyled page)
```bash
cd /home/USERNAME/everfresh_laravel
php artisan filament:upgrade
php artisan view:clear
```

---

## Re-deploying (Updates)

When you make changes locally:

1. Rebuild frontend:
   ```bash
   cd frontend && npm run build
   cp -r dist/* ../deployCpanelServer/public_html/
   ```

2. Copy changed backend files to `deployCpanelServer/everfresh_laravel/`

3. Upload changed files to cPanel

4. Clear caches on server:
   ```bash
   cd /home/USERNAME/everfresh_laravel
   php artisan config:cache
   php artisan route:cache
   php artisan view:clear
   php artisan optimize
   ```