# Portfolio

A 3D interactive portfolio site. Users scroll through a cinematic zoom into a desktop PC, which transitions seamlessly into the actual portfolio.

**Stack**: React, Three.js, Vite, Laravel 11, MariaDB, Redis, Nginx, Docker

## Quick Start

```bash
# 1. Copy env file
cp .env.example .env

# 2. Build and start containers
docker compose up -d --build

# 3. Install frontend dependencies
docker compose run --rm node npm install
docker compose up -d node

# 4. Generate app key and run migrations
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate
```

Open **http://localhost:8080**

## Project Structure

```
Portfolio/
├── frontend/          React + Vite + Three.js
│   ├── Dockerfile
│   └── src/
│       ├── App.jsx                  Root component, scroll & reveal logic
│       └── components/
│           ├── ComputersCanvas.jsx  3D scene, camera animation
│           ├── CanvasLoader.jsx     Loading progress
│           └── ScreenContent.jsx    Monitor screen content
├── backend/           Laravel 11 API
│   └── Dockerfile
├── docker/
│   └── nginx/         Nginx reverse proxy config
├── .env               Single config for Docker + Laravel
├── plan.md            Implementation phases & status
├── architecture.md    System design & diagrams
└── docker-compose.yml
```

## Services

| Service | Port | Purpose |
|---------|------|---------|
| Nginx | 8080 | Reverse proxy |
| Node/Vite | 5173 | React dev server |
| PHP-FPM | 9000 | Laravel API |
| MariaDB | 3306 | Database |
| Redis | 6379 | Cache & sessions |

## Useful Commands

```bash
docker compose down              # Stop containers
docker compose logs -f           # View logs
docker compose exec php bash     # Enter PHP container
docker compose exec node sh      # Enter Node container
docker compose exec php php artisan <cmd>  # Artisan commands
docker compose exec node npm run build     # Production build
```
