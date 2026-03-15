# Portfolio

Personal portfolio site built with Laravel 11, Vite, and Tailwind CSS.

**Stack**: Laravel 11, Vite, Tailwind CSS, MariaDB, Redis, Nginx, Docker

## Quick Start

```bash
# 1. Copy env file
cp .env.example .env

# 2. Build and start containers
docker compose up -d --build

# 3. Install backend dependencies and setup
docker compose exec php composer install
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate

# 4. Install frontend assets and build
docker compose exec php npm install
docker compose exec php npm run build
```

Open **http://localhost:8080**

## Project Structure

```
Portfolio/
├── backend/           Laravel 11 + Vite + Tailwind
│   ├── Dockerfile
│   ├── resources/     Blade views, CSS, JS
│   ├── routes/
│   └── vite.config.js
├── docker/
│   └── nginx/         Nginx reverse proxy config
├── .env               Config for Docker + Laravel
└── docker-compose.yml
```

## Services

| Service | Port | Purpose |
|---------|------|---------|
| Nginx | 8080 | Reverse proxy |
| PHP-FPM | 9000 | Laravel + Vite |
| MariaDB | 3306 | Database |
| Redis | 6379 | Cache & sessions |

## Useful Commands

```bash
docker compose down              # Stop containers
docker compose logs -f           # View logs
docker compose exec php bash     # Enter PHP container
docker compose exec php php artisan <cmd>  # Artisan commands
docker compose exec php npm run dev        # Vite dev server
docker compose exec php npm run build      # Production build
```
