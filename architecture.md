# Portfolio - Architecture

## System Overview

```
Browser (localhost:8080)
    │
    ▼
┌─────────┐      ┌──────────┐      ┌───────────┐
│  Nginx   │─────▶│ Node/Vite │      │  MariaDB  │
│  :8080   │      │  :5173    │      │  :3306    │
│          │      └──────────┘      └───────────┘
│          │                              ▲
│          │──▶ /api/* ──▶┌──────────┐    │
│          │              │ PHP-FPM  │────┘
└─────────┘              │  :9000   │──▶┌───────┐
                          └──────────┘   │ Redis │
                                         │ :6379 │
                                         └───────┘
```

## Routing

| Path | Destination | Purpose |
|------|-------------|---------|
| `/` | Node (Vite dev server) | React SPA |
| `/api/*` | PHP-FPM (Laravel) | REST API |
| `/sanctum/*` | PHP-FPM (Laravel) | Auth |
| `*.php` | PHP-FPM | Legacy/direct PHP |

## Frontend Architecture

```
frontend/src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root component, scroll logic, reveal overlay
└── components/
    ├── ComputersCanvas.jsx     # Three.js canvas, camera animation, 3D model
    ├── CanvasLoader.jsx        # Loading spinner (progress %)
    └── ScreenContent.jsx       # VS Code-styled monitor content
```

### Scroll Animation Flow

The app uses a fixed Three.js canvas behind scrollable spacer sections:

```
┌─────────────────────────────┐  scroll: 0vh
│  Hero Section (100vh)       │  "Hi, I'm Mario"
│  3D: Wide shot of desk      │
├─────────────────────────────┤  scroll: 100vh
│  Zoom Spacer (200vh)        │  Camera zooms toward monitor
│  3D: Stage 1 (0-80%)       │  Wide → monitor closeup
│  3D: Stage 2 (80-100%)     │  Monitor → screen fill
├─────────────────────────────┤  scroll: 300vh
│  Reveal Zone (200vh)        │  Portfolio fades in (opacity 0→1)
│                             │  over the first 100vh of this zone
└─────────────────────────────┘  scroll: 400vh (max)
```

- **Camera**: Interpolates between start/mid/end vectors using `useFrame`
- **Reveal**: Fixed overlay with opacity driven by `scrollY` position
- **Layers**: Canvas (z:0) → Scroll spacers (z:1) → Portfolio overlay (z:10)

### Key Constants

Defined in `ComputersCanvas.jsx`:

| Constant | Value | Role |
|----------|-------|------|
| `CAMERA_START` | `(20, 0, 5.5)` | Wide shot position |
| `CAMERA_MID` | `(1.5, -1.7, 8.3)` | Monitor closeup position |
| `CAMERA_END` | `(-8, -1.7, 8.3)` | Inside-screen position |
| `STAGE_BREAK` | `0.8` | Scroll % where stage 2 begins |

## Backend Architecture

Laravel 11 CMS API serving portfolio content from MariaDB.

### Database Schema

```
settings                    contents
┌────────────────┐          ┌────────────────────┐
│ id (PK)        │          │ id (PK)            │
│ key (unique)   │          │ type               │
│ value          │          │ slug (unique)      │
└────────────────┘          │ title              │
                            │ excerpt (nullable) │
                            │ icon (nullable)    │
                            │ link (nullable)    │
                            │ img (nullable)     │
                            │ body (nullable)    │
                            └────────────────────┘
```

### Content Types

| Type | Count | Used By |
|------|-------|---------|
| page | 3 | Bear profile notes |
| project | 6 | Bear, Launchpad, Finder |
| terminal | 4 | Terminal app |
| link | 5 | Safari favorites & frequent |

### API Routes

```
GET /api/settings              → SettingController@index
GET /api/content/{type}        → ContentController@index
GET /api/content/slug/{slug}   → ContentController@show
```

### Request Flow

```
Browser → Nginx (/api/*) → Laravel router → Middleware → Controller → Model → MariaDB
```

## Docker Services

| Service | Image | Purpose |
|---------|-------|---------|
| nginx | nginx:alpine | Reverse proxy, static files |
| node | node:20-alpine | Vite dev server (React) |
| php | php:8.3-fpm | Laravel API |
| mariadb | mariadb:11 | Database |
| redis | redis:7-alpine | Cache, sessions |

All services run as non-root users with configurable UID/GID via `.env`.
