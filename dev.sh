#!/bin/bash
# Development server script for Replit preview
# Uses custom Vite config for 0.0.0.0:5000 binding
exec npx vite --config vite.config.dev.ts
