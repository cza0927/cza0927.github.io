#!/usr/bin/env bash
set -euo pipefail

# Fast local preview without WEBrick:
# - Jekyll incremental build in watch mode
# - Python static server for _site
RUBY_BUNDLE="$HOME/.rbenv/versions/3.1.7/bin/bundle"
HOST="127.0.0.1"
PORT="4000"

if [ -x "$RUBY_BUNDLE" ]; then
	JEKYLL_CMD=("$RUBY_BUNDLE" _2.2.19_ exec jekyll build --watch --incremental)
else
	JEKYLL_CMD=(bundle exec jekyll build --watch --incremental)
fi

echo "[preview] Starting incremental Jekyll build..."
"${JEKYLL_CMD[@]}" &
JEKYLL_PID=$!

cleanup() {
	if kill -0 "$JEKYLL_PID" >/dev/null 2>&1; then
		kill "$JEKYLL_PID" >/dev/null 2>&1 || true
	fi
}

trap cleanup EXIT INT TERM

echo "[preview] Serving _site at http://${HOST}:${PORT}"
python3 -m http.server "$PORT" --bind "$HOST" --directory _site