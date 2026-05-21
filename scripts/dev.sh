#!/usr/bin/env bash

set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cleanup() {
  if [[ -n "${backend_pid:-}" ]]; then
    kill "$backend_pid" 2>/dev/null || true
  fi

  if [[ -n "${frontend_pid:-}" ]]; then
    kill "$frontend_pid" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

npm --prefix "$root_dir/backend" run start:dev &
backend_pid=$!

npm --prefix "$root_dir/frontend" run dev &
frontend_pid=$!

wait -n "$backend_pid" "$frontend_pid"
exit_code=$?

cleanup
wait "$backend_pid" "$frontend_pid" 2>/dev/null || true

exit "$exit_code"