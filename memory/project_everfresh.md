---
name: Ever Fresh Farm - Full Stack Project
description: Bengali organic goat farm website converted to dynamic full-stack app
type: project
---

Laravel 11 backend (./backend) + React+Vite+Tailwind frontend (./frontend).

**Why:** Static HTML template at ./everfresh-farm (1).html was converted to fully dynamic system.

**How to apply:** When user asks to add features or modify the site, the backend is in ./backend and frontend is in ./frontend/src/components.

Stack:
- Frontend: React 18, Vite, Tailwind CSS v4, Axios — runs on port 5173
- Backend: Laravel 11, Filament 3 admin panel — runs on port 8000
- DB: MySQL database named `everfresh_farm`
- Admin URL: http://localhost:8000/admin  (admin@everfreshfarm.com / password after seeding)

Sections managed via admin: Banner, Logo/Site Settings, About Us, Products, Why Choose Us, Gallery Images, Gallery Videos, Contact Info, Contact Messages inbox.

DB credentials in backend/.env — user needs to set correct MySQL password and run migrations.
