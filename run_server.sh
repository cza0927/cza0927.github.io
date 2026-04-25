#!/usr/bin/env bash
set -euo pipefail

# Fast local preview: auto rebuild + auto refresh browser.
RUBY_BUNDLE="$HOME/.rbenv/versions/3.1.7/bin/bundle"

if [ -x "$RUBY_BUNDLE" ]; then
	"$RUBY_BUNDLE" _2.2.19_ exec jekyll serve --livereload --incremental --host 127.0.0.1 --port 4000
else
	bundle exec jekyll serve --livereload --incremental --host 127.0.0.1 --port 4000
fi