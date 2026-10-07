# Bookstore API

A small Express REST API and plain HTML catalog for the fictional Paper & Spine bookstore.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (the managed workflow supplies PORT)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract; regenerate after changes
- `lib/db/src/schema/books.ts` — database table
- `artifacts/api-server/src/routes/books.ts` — list, add, and delete handlers
- `artifacts/api-server/src/pages/bookstore.ts` — standalone HTML/CSS/JS page served by Express

## Architecture decisions

- Use the existing PostgreSQL database instead of introducing SQLite alongside it.
- Keep the UI plain HTML served by Express to match the small scope.
- Sample catalog rows are inserted once during setup, never recreated on startup after a user deletes them.

## Product

The HTML page at `/` lists the catalog and allows adding and deleting books. It calls the same REST API as external clients:

- `GET /api/books` → 200 with an array of `{ id, title, author }`
- `POST /api/books` → 201 with a book; JSON body `{ "title": "...", "author": "..." }`
- `DELETE /api/books/:id` → 204; 404 when the book does not exist

Invalid input returns 400 with `{ "error": "..." }`. Books persist across service restarts.
This fictional demo has no authentication: anyone who can access it can modify the catalog.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
