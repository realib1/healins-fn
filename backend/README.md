# Healins Backend

NestJS API scaffold for the Healins platform.

## Scripts

- `npm run start:dev` - run the NestJS app in watch mode
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - run the compiled server

## API Surface

- `GET /`
- `GET /health`
- `GET /v1/patients`
- `GET /v1/patients/:id`
- `GET /v1/encounters`
- `GET /v1/facilities`
- `GET /v1/permissions`
- `GET /v1/forecast/summary`
- `GET /v1/audit`

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies with `npm install`.
3. Run `npm run start:dev`.
