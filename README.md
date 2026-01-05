## For the app

1. npm ci
2. npm run dev


## Prisma DB run commands in package.json
- Generate prisma client: `happens after npm install (postinstall)`
- Create and run migrations (local dev): `npm run db:migrate`
- Create and run migrations (live/prod): `npm run db:deploy`
- Regenerate Prisma Client: `npm run db:generate`
- Run Prisma GUI: `npm run db:studio`


## For the Postgres DB

1. Start Docker and run: docker compose up -d
2. Run initial db migration: `npm run db:migrate`
3. Stop db with: docker compose down
4. Stop and delete: docker compose down -v

DATABASE_URL in .env file is already setup.


In order, your steps are:
1. npm install/ci
2. cp .env.example .env
3. docker compose up -d
4. npm run db:migrate

This will get your postgres container loaded with the first migration of user table. 
