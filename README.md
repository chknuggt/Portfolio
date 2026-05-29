# macOS Portfolio

An open source macOS-style portfolio built with React and Go. The UI mimics macOS — complete with a dock, Finder, Bear notes, Spotlight, and draggable windows — all powered by a dynamic Go API backed by PostgreSQL. Content is fully manageable from a database with no code changes required.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, UnoCSS, Three.js |
| Backend | Go, Chi, pgx/v5, sqlc, Goose |
| Database | PostgreSQL |
| Infrastructure | Docker, Nginx |

## Features

- macOS-style desktop with draggable windows, dock, and menu bar
- Finder with dynamic file system from the database
- Bear notes app with markdown content
- Typora markdown editor
- Spotify, VSCode, Chess.com, FaceTime, Siri integrations
- Launchpad showing your projects
- Spotlight search
- 3D intro scene with Three.js
- Fully dynamic — all content managed via database

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/chknuggt/Portfolio.git
cd Portfolio

# 2. Copy env file and configure
cp .env.example .env

# 3. Build and start
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
```

Open **http://localhost:8080**

## Project Structure

```
Portfolio/
├── frontend/               React + Vite frontend
│   ├── src/
│   │   ├── components/     UI components (apps, dock, windows)
│   │   ├── configs/        App definitions and wallpapers
│   │   ├── context/        PortfolioContext — global data from API
│   │   ├── lib/            API client and types
│   │   ├── pages/          Desktop page
│   │   └── stores/         Zustand state management
│   └── Dockerfile
├── backend/                Go API
│   ├── cmd/api/            HTTP handlers and routes
│   ├── internal/db/        sqlc-generated DB layer
│   ├── migrations/         Goose SQL migrations
│   ├── queries/            sqlc SQL queries
│   └── Dockerfile
├── docker/
│   └── nginx/              Nginx reverse proxy configs
├── docker-compose.yml
└── docker-compose.local.yml
```

## Services

| Service | Purpose |
|---------|---------|
| Nginx | Reverse proxy (`:8080` locally, `:443` in production) |
| Node | React static build served via Nginx |
| API | Go HTTP server on `:8080` |
| PostgreSQL | Primary database |

## Content Management

All content is stored in PostgreSQL and manageable via any SQL client (e.g. TablePlus):

| Table | What it controls |
|-------|-----------------|
| `profile` | Name, title, bio, avatar, social links |
| `projects` | Portfolio projects shown in Finder and Launchpad |
| `bear_notes` | Notes shown in the Bear app |
| `experience` | Work experience |
| `education` | Education history |
| `skills` | Skills list |
| `music` | Music tracks in the music player |
| `finder_items` | File system shown in Finder and on the desktop |
| `about_sections` | Key-value config (GitHub URL, Spotify embed, Chess.com URL, VSCode repo) |
| `typora_documents` | Document loaded in the Typora editor |

## Useful Commands

```bash
# Stop containers
docker compose down

# View logs
docker compose logs -f

# Enter the API container
docker exec -it portfolio-api sh

# Enter the database
docker exec -it portfolio-postgres psql -U <user> -d portfolio
```

## License

MIT
