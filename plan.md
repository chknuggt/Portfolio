# Portfolio - Implementation Plan

## Overview

A macOS-themed portfolio website with a 3D cinematic intro. The site simulates the macOS desktop experience with draggable windows, dock, and apps. All content is managed through a Laravel CMS backend with MariaDB, making everything editable without touching code.

## Phases

### Phase 1: 3D Intro Scene (DONE)

- [x] Docker Compose setup (PHP, Node, Nginx, MariaDB, Redis)
- [x] React + Vite frontend with Three.js
- [x] Desktop PC 3D model with scroll-based camera animation
- [x] Two-stage camera zoom (wide shot -> monitor -> screen)
- [x] VS Code-styled screen content on the monitor
- [x] Scroll-triggered fade-in overlay for portfolio reveal
- [x] Mobile detection (skip 3D on small screens)

### Phase 2: macOS Desktop UI (DONE)

- [x] macOS-style desktop with wallpaper and dock
- [x] Draggable/resizable windows with app bar (close/minimize/maximize)
- [x] Dock with magnification effects
- [x] Dark mode and Control Center
- [x] Spotlight search
- [x] Apple menu, WiFi menu, battery menu
- [x] Login/lock screen
- [x] Apps: Bear, Safari, Terminal, Finder, FaceTime, Spotify, Siri, VSCode, Typora

### Phase 3: Backend CMS API (DONE)

- [x] MariaDB database with `settings` and `contents` tables
- [x] `settings` table: 17 key/value pairs (name, email, links, music, siri bio, etc.)
- [x] `contents` table: 18 entries across 4 types (page, project, terminal, link)
- [x] Laravel API controllers (SettingController, ContentController)
- [x] API routes: `/api/settings`, `/api/content/{type}`, `/api/content/slug/{slug}`
- [x] Database seeder with all portfolio content
- [x] Removed unused Laravel defaults (users, cache, jobs tables)
- [x] Cleaned up unnecessary Node files from backend
- [x] Nginx config simplified for local development
- [x] Closed unnecessary public ports (MariaDB, Redis)

### Phase 4: Wire Frontend to API (NEXT)

Connect the frontend to fetch all content from the Laravel API instead of hardcoded configs.

- [ ] Create API client utility (fetch wrapper with base URL)
- [ ] Fetch settings on app load (name, title, username, email, links)
- [ ] Update Bear app to fetch pages and projects from `/api/content/page` and `/api/content/project`
- [ ] Update Terminal to fetch terminal content from `/api/content/terminal`
- [ ] Update Safari to fetch links from `/api/content/link`
- [ ] Update Siri to use settings for bio and system prompt
- [ ] Update Spotify to use settings for music info
- [ ] Update Finder to build file tree from projects data
- [ ] Update Launchpad to use project data
- [ ] Update App.jsx hero section with settings
- [ ] Update AppleMenu, Login screen with username from settings
- [ ] Remove hardcoded config files (bear.tsx, terminal.tsx, websites.ts, launchpad.ts, music.ts)
- [ ] Add loading states for API fetches
- [ ] Add error handling for failed API calls

### Phase 5: Admin Panel

Build a simple admin interface to manage content without touching the database directly.

- [ ] Laravel authentication (login/logout)
- [ ] Admin dashboard with content overview
- [ ] CRUD interface for settings (edit key/value pairs)
- [ ] CRUD interface for contents (add/edit/delete pages, projects, terminal files, links)
- [ ] Markdown editor for content body
- [ ] Image upload for project thumbnails and icons
- [ ] Preview changes before saving

### Phase 6: Contact Form

- [ ] `POST /api/contact` endpoint
- [ ] Input validation and sanitization
- [ ] Rate limiting (prevent spam)
- [ ] Email sending (SMTP configuration)
- [ ] Contact form UI in the frontend (Safari or standalone app)
- [ ] Success/error feedback to user

### Phase 7: Monitor Screen Texture & Transition

- [ ] Take screenshot of finished portfolio site
- [ ] Apply screenshot as the 3D monitor's screen texture
- [ ] Replace the VS Code screen content with the screenshot
- [ ] Zoom camera until monitor fills viewport
- [ ] Cross-fade from 3D screenshot to live portfolio site
- [ ] Ensure pixel-perfect alignment during transition
- [ ] Polish timing and easing curves

### Phase 8: Polish & Deploy

- [ ] Performance optimization (lazy loading, model compression, API caching)
- [ ] SEO meta tags and Open Graph
- [ ] Responsive design for all breakpoints
- [ ] Accessibility audit
- [ ] Production Docker config with SSL (Let's Encrypt)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deploy to VPS (Hetzner)
- [ ] Domain setup (marioselef.com)

## Database Schema

### settings table

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| key | varchar(255) | Unique setting key |
| value | text | Setting value |

### contents table

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| type | varchar(255) | Content type (page, project, terminal, link) |
| slug | varchar(255) | Unique URL-friendly identifier |
| title | varchar(255) | Display title |
| excerpt | varchar(255) | Short description (nullable) |
| icon | varchar(255) | Icon class or category (nullable) |
| link | varchar(255) | External URL (nullable) |
| img | varchar(255) | Image path (nullable) |
| body | text | Full content / markdown (nullable) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | All settings as key/value object |
| GET | `/api/content/{type}` | All content filtered by type |
| GET | `/api/content/slug/{slug}` | Single content item by slug |

## Current Status

Phase 3 complete. Ready to begin Phase 4 - wiring the frontend to fetch from the API.
