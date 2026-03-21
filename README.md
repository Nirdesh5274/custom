# Customs Digital Portal

Full-stack government-style customs website built with Next.js (App Router), TypeScript, Prisma, MongoDB, and NextAuth.

## Features

- Public website with sections for Notices, News, and Events
- Dynamic homepage ticker message managed from admin
- Secure admin login (Credentials auth)
- Admin dashboard with update CRUD (create, edit, delete)
- REST APIs for public and admin content access
- Database-backed architecture designed for feature expansion

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Prisma ORM
- MongoDB
- NextAuth (Credentials)
- Tailwind CSS

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
copy .env.example .env
```

For local MongoDB, ensure a single-node replica set is enabled (Prisma requires this for write transactions).

3. Sync schema and seed:

```bash
npm run db:push
npm run db:seed
```

4. Start development server:

```bash
npm run dev
```

5. Open:

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Default Admin Credentials

- Email: admin@custom.gov.in
- Password: Admin@123

Change these values in `.env` before production.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run db:generate
npm run db:push
npm run db:seed
```

## API Endpoints

- Public:
	- `GET /api/public/updates?type=NOTICE|NEWS|EVENT&limit=10`
	- `GET /api/public/updates/:id`
	- `GET /api/public/settings`
- Admin (auth required):
	- `GET/POST /api/admin/updates`
	- `GET/PATCH/DELETE /api/admin/updates/:id`
	- `GET/POST /api/admin/settings`

## Future Extension Ideas

- Notice attachments and downloadable PDFs
- Multi-role workflow (creator/reviewer/publisher)
- Audit logs and version history
- Department pages, officer directory, tenders, recruitments
- CMS for banners, menus, and footer links
