#!/bin/bash
# Development server script for Replit preview
# Runs Vite with host 0.0.0.0 and port 5000 for Replit compatibility
exec npx vite --host 0.0.0.0 --port 5000
