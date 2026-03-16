# Portfolio

A macOS-themed portfolio website with a 3D cinematic intro and a Laravel CMS backend. The site simulates the macOS desktop experience with draggable windows, dock, and interactive apps — all content is managed through a database.

**Stack**: React, Three.js, Vite, TypeScript, UnoCSS, Zustand, Laravel 11, MariaDB, Redis, Nginx, Docker

## Quick Start

```bash
# 1. Copy env file
cp .env.example .env

# 2. Build and start containers
docker compose up -d --build

# 3. Generate app key and run migrations with seed
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate --seed
```

Open **http://localhost:8080**

## Project Structure

```
Portfolio/
├── frontend/              React + Vite + Three.js + macOS UI
│   ├── src/
│   │   ├── App.jsx        Root component, 3D intro, scroll logic
│   │   ├── components/    Apps (Bear, Safari, Terminal, Finder, etc.)
│   │   ├── configs/       App configurations and content
│   │   ├── stores/        Zustand state management
│   │   └── types/         TypeScript type definitions
│   └── public/
│       ├── markdown/      Markdown content files
│       ├── img/           Icons, wallpapers, site images
│       └── music/         Audio files
├── backend/               Laravel 11 CMS API
│   ├── app/
│   │   ├── Http/Controllers/Api/   API controllers
│   │   └── Models/                 Eloquent models
│   ├── database/
│   │   ├── migrations/    Database schema
│   │   └── seeders/       Initial content data
│   └── routes/api.php     API route definitions
├── docker/
│   └── nginx/             Nginx reverse proxy config
├── docker-compose.yml
├── plan.md                Implementation phases & status
└── architecture.md        System design & diagrams
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | All settings (name, email, links, music, etc.) |
| GET | `/api/content/{type}` | Content by type: `page`, `project`, `terminal`, `link` |
| GET | `/api/content/slug/{slug}` | Single content item by slug |

## Database

Two tables:

- **settings** — 17 key/value pairs (personal info, links, music, siri config)
- **contents** — 18 entries across 4 types (pages, projects, terminal files, safari links)

## Services

| Service | Internal Port | Exposed Port | Purpose |
|---------|---------------|--------------|---------|
| Nginx | 80 | 8080 | Reverse proxy |
| Node/Vite | 5173 | — | React dev server |
| PHP-FPM | 9000 | — | Laravel API |
| MariaDB | 3306 | — | Database |
| Redis | 6379 | — | Cache & sessions |

## Useful Commands

```bash
# Container management
docker compose up -d --build    # Start all services
docker compose down             # Stop all services
docker compose logs -f          # View logs

# Laravel
docker compose exec php php artisan migrate --seed   # Run migrations + seed
docker compose exec php php artisan migrate:fresh --seed  # Reset DB + seed
docker compose exec php php artisan tinker           # Interactive PHP shell

# Database
docker compose exec mariadb mariadb -u marioselef -p portfolio  # DB shell

# Frontend
docker compose exec node npm run build    # Production build
```

## macOS Desktop Features

- Draggable/resizable windows with traffic light buttons
- Dock with magnification effects
- Dark mode and Control Center
- Spotlight search
- Apps: Bear (notes), Safari, Terminal, Finder, FaceTime, Spotify, Siri, VSCode, Typora
- Login/lock screen
- Apple menu, WiFi menu, battery indicator
