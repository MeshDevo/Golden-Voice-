# Golden Voice

Golden Voice is a platform for anime dubbing. It publishes dubbed and
translated works — anime and games — together with their episodes,
scripts and media assets, and presents them to visitors as web pages
backed by a PostgreSQL database.

## What it does

- A catalogue of works with filtering by type and a detail page for
  each work.
- Each work can carry dubbed versions (per language, with episodes),
  translated versions, and writing scripts.
- Media files (covers, audio, video) are managed as assets: the
  database stores their metadata, the files themselves live in media
  storage.
- User accounts with authentication, and audit logging of changes.

## Structure

One application in a single process: the page handlers and the
business services live side by side, and the pages are rendered on
the server.

```text
golden-voice/
  src/
    app/          application entry point and server bootstrap
    web/          pages, components and server-side rendering
    modules/      one folder per domain, each with its services,
                  repositories and data-transfer objects:
                    auth        accounts and authentication
                    users       user profiles
                    works       the works catalogue
                    dubbed      dubbed versions and episodes
                    translated  translated versions
                    writing     scripts
                    assets      media file metadata
    database/     the shared Prisma database client
    shared/       configuration, errors, middleware, utilities
  prisma/         the database schema (schema.prisma)
  public/         static files served with the pages (styles, media)
  legacy/         earlier iterations kept for reference
```

## Technology

- Node.js and TypeScript
- Express for the server, React for the pages (rendered server-side)
- Prisma ORM with PostgreSQL

## Running it

Requirements: Node.js 20+, and a PostgreSQL database.

```bash
cp .env.example .env    # set DATABASE_URL and JWT_SECRET
npm install
npm run prisma:generate
npx prisma db push      # create the tables from prisma/schema.prisma
npm run dev             # http://localhost:4000
```

Production:

```bash
npm run build
npm start
```

Pages: `/` (home), `/works` (catalogue, filter with `?type=`),
`/works/:workId` (work detail), `/health` (health check).

## License

GV1.0 — see [LICENSE](LICENSE). Owner: Ahmed Ali (أحمد علي).
