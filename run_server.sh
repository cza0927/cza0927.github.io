#!/usr/bin/env bash
set -euo pipefail

# Live local preview (run once, keep terminal open):
# - watches file changes
# - incremental rebuild
# - browser auto-refresh via livereload
RUBY_BUNDLE="$HOME/.rbenv/versions/3.1.7/bin/bundle"
HOST="127.0.0.1"
PORT="4000"

if [ -x "$RUBY_BUNDLE" ]; then
	JEKYLL_CMD=("$RUBY_BUNDLE" _2.2.19_ exec jekyll serve --livereload --incremental --host "$HOST" --port "$PORT" --open-url)
	BUNDLE_CHECK=("$RUBY_BUNDLE" _2.2.19_ check)
else
	JEKYLL_CMD=(bundle exec jekyll serve --livereload --incremental --host "$HOST" --port "$PORT" --open-url)
	BUNDLE_CHECK=(bundle check)
fi

echo "[preview] Checking local gems..."
if ! "${BUNDLE_CHECK[@]}" >/dev/null 2>&1; then
	echo "[preview] Missing gems. Run this first:"
	echo "  ~/.rbenv/versions/3.1.7/bin/bundle _2.2.19_ install"
	exit 1
fi

echo "[preview] Starting Jekyll live server at http://${HOST}:${PORT}"
exec "${JEKYLL_CMD[@]}"