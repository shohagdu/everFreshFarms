#!/bin/bash

echo "======================================"
echo "  Ever Fresh Farm - Setup Script"
echo "======================================"

# ---- BACKEND SETUP ----
echo ""
echo ">>> Setting up Laravel backend..."
cd /var/www/personal/everfresh_farm/backend

# Ask for MySQL password
echo ""
read -p "Enter your MySQL root password (or leave blank if none): " MYSQL_PASS

# Create database
if [ -z "$MYSQL_PASS" ]; then
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS everfresh_farm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'everfresh'@'localhost' IDENTIFIED BY 'everfresh123'; GRANT ALL PRIVILEGES ON everfresh_farm.* TO 'everfresh'@'localhost'; FLUSH PRIVILEGES;" 2>&1
else
    mysql -u root -p"$MYSQL_PASS" -e "CREATE DATABASE IF NOT EXISTS everfresh_farm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'everfresh'@'localhost' IDENTIFIED BY 'everfresh123'; GRANT ALL PRIVILEGES ON everfresh_farm.* TO 'everfresh'@'localhost'; FLUSH PRIVILEGES;" 2>&1
fi

# Update .env with new credentials
sed -i "s/DB_USERNAME=root/DB_USERNAME=everfresh/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=everfresh123/" .env

# Run migrations and seeder
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link

echo ""
echo ">>> Backend ready!"
echo "    Admin URL:   http://localhost:8000/admin"
echo "    Admin Email: admin@everfreshfarm.com"
echo "    Admin Pass:  password"

echo ""
echo "======================================"
echo "  Start Commands:"
echo ""
echo "  Backend:  cd backend && php artisan serve"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "  Admin Panel: http://localhost:8000/admin"
echo "  Website:     http://localhost:5173"
echo "======================================"
