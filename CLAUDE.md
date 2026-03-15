# Portfolio Project

## Quick Reference

- **Frontend**: React + Vite at `frontend/`
- **Backend**: Laravel 11 API at `backend/`
- **Run**: `docker compose up -d --build`
- **URL**: http://localhost:8080 (via Nginx proxy)

## Stack

- React 19 + Vite (frontend)
- Laravel 11 (backend API)
- MariaDB 11 (database)
- Redis 7 (cache & sessions)
- Nginx (reverse proxy)
- Docker Compose

## Ports

| Service | Port | Purpose |
|---------|------|---------|
| Nginx | 8080 | Reverse proxy (main URL) |
| Vite | 5173 | React dev server |
| PHP-FPM | 9000 | Laravel API |
| MariaDB | 3306 | Database |
| Redis | 6379 | Cache & sessions |
