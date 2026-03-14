# Portfolio Project

## Quick Reference

- **Frontend**: React + Vite + Three.js at `frontend/`
- **Backend**: Laravel 11 at `backend/`
- **Run**: `docker compose up -d --build`
- **URL**: http://localhost:8080
- **Docs**: `plan.md`, `architecture.md`

## 3D Scene Coordinate System

From the viewer's perspective:

| Axis | Direction |
|------|-----------|
| Z+ | left |
| Z- | right |
| X+ | further (zoom out) |
| X- | closer (zoom in) |
| Y+ | up |
| Y- | down |
| Y+ rotation | clockwise (top view) |
| Y- rotation | counter-clockwise (top view) |

## Camera Vectors

Defined in `frontend/src/components/ComputersCanvas.jsx`:

- `CAMERA_START` / `LOOK_START` - position at scroll 0%
- `CAMERA_MID` / `LOOK_MID` - position at scroll 80%
- `CAMERA_END` / `LOOK_END` - position at scroll 100%

**Rule**: When moving CAMERA_END left/right (Z axis), always update LOOK_END's Z to match so the camera looks straight ahead.

## Animation Flow

1. Wide shot - full desk setup visible
2. Scroll zoom - camera moves toward the monitor
3. Screenshot on screen - monitor displays portfolio screenshot
4. Keep zooming - blend from screenshot into real site
5. Full site - seamlessly browsing the actual portfolio

See `plan.md` for implementation phases and current status.
