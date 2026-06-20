#!/usr/bin/env bash
# Start the portfolio dev server on port 8080

set -e
cd "$(dirname "$0")"

PORT=8080

if command -v npm >/dev/null 2>&1 && [ -f package.json ]; then
  if [ ! -d node_modules ]; then
    npm install
  fi
  npm run dev
elif command -v python3 >/dev/null 2>&1; then
  echo "Starting server at http://localhost:${PORT}"
  echo "Press Ctrl+C to stop."
  python3 -m http.server "$PORT"
else
  echo "Error: install Node.js (npm) or Python 3 to run the dev server." >&2
  exit 1
fi
