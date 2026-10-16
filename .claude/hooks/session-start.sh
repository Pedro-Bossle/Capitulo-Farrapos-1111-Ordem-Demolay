#!/bin/bash
# Instala o graphify (grafo de conhecimento do código) em sessões do Claude Code na nuvem.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v graphify >/dev/null 2>&1; then
  pip install --quiet --root-user-action=ignore graphifyy
fi

if [ ! -f "$HOME/.claude/skills/graphify/SKILL.md" ]; then
  graphify install --platform claude >/dev/null
fi
