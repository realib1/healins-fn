# Healins

Healins is a federated health intelligence platform scaffold with separate frontend, backend, and AI service workspaces.

## Services

- `frontend/` - React + TypeScript Vite app
- `backend/` - NestJS backend scaffold for clinical, facility, permission, audit, and forecast workflows
- `ai-service/` - FastAPI AI service scaffold for summaries, risk scoring, and outbreak signals

## Local development

Run the full stack from the repo root:

```bash
npm run dev
```

If you only want the frontend and backend dev servers without Docker, run `npm run dev:local`.

1. Install backend dependencies with `npm install` in `backend/`.
2. Create the repo-local Python virtual environment with `uv venv .venv`.
3. Install AI dependencies with `uv pip install --python .venv/bin/python -r ai-service/requirements.txt`.
4. Copy the `.env.example` files to `.env` where needed.
5. Start the full stack with the root Docker Compose file, which includes PostgreSQL.
