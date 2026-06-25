# CVhero

AI-driven, production-grade CV builder. A complete rebuild on a modern, fully
typed, serverless-friendly stack.

> **Status:** functional rebuild. The whole UI is implemented in the approved
> "Editorial Ink" design (Poppins, Linear/Notion feel). The app runs in **demo
> mode** with sample data until you add credentials, then auth, CRUD, autosave,
> AI, and rate limiting activate automatically.
>
> **Wired:** auth (email + Google), dashboard CRUD, editor (data-bound, drag
> reorder, autosave), 6 templates + live render engine, AI (cover letter,
> ATS score, tailor-to-vacancy) with plan rate limiting.
> **Pending:** PDF export (`@react-pdf/renderer`), Mollie subscriptions +
> webhooks + billing portal, marketing SEO/sitemap, and the TS-strict pass.

## Going live

1. Fill `.env.local` (see table below) with Supabase, Anthropic, and Mollie keys.
2. Apply `supabase/migrations/0001_init.sql` to your Supabase project.
3. In Supabase Auth, enable the **Google** provider and add
   `${NEXT_PUBLIC_APP_URL}/auth/callback` as a redirect URL.
4. Restart — middleware now enforces auth and all data persists.

## Tech stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js (App Router) + TypeScript (strict)                    |
| Styling    | Tailwind CSS + shadcn/ui                                      |
| Backend    | Supabase — Auth, Postgres, Storage, **Row Level Security**    |
| AI         | Anthropic Claude API (streaming + structured output)         |
| PDF export | `@react-pdf/renderer` (serverless, ATS-safe, selectable text)|
| Payments   | **Mollie** (iDEAL/SEPA for the NL/EU market)                 |
| Drag/drop  | `@dnd-kit` (section reordering)                               |
| Deployment | Vercel                                                        |

### Architectural principles

- **Data ≠ presentation.** A single canonical CV schema
  (`src/lib/resume/schema.ts`, Zod-validated) is the contract shared by the
  editor, the render engine, the PDF exporter, and the AI endpoints. Templates
  are pure presentation over that data, so switching templates never loses data.
- **Secrets stay server-side.** Anything without the `NEXT_PUBLIC_` prefix is
  server-only. All Claude calls go through server routes — never the client.
- **RLS everywhere.** Every table has Row Level Security; users can only ever
  read/write their own rows. Privileged writes (webhooks, usage metering) use a
  separate service-role client (`src/lib/supabase/admin.ts`).
- **Plan-based rate limiting.** AI usage is metered in `ai_usage` and gated by
  the per-tier limits in `src/lib/billing/plans.ts`.

## Project layout (foundation)

```
supabase/migrations/0001_init.sql   # schema + RLS + triggers
src/lib/resume/schema.ts            # canonical CV data model (Zod)
src/lib/resume/factory.ts           # empty-resume / empty-item factories
src/lib/supabase/{server,client,admin,middleware,types}.ts
src/lib/billing/plans.ts            # tiers + quota limits
```

## Getting started

1. **Install**

   ```bash
   npm install
   ```

2. **Environment** — copy and fill in:

   ```bash
   cp .env.example .env.local
   ```

   | Variable                        | Where to get it / notes                       |
   | ------------------------------- | --------------------------------------------- |
   | `NEXT_PUBLIC_APP_URL`           | App base URL (`http://localhost:3000` in dev) |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Project Settings → API             |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API             |
   | `SUPABASE_SERVICE_ROLE_KEY`     | Supabase → Project Settings → API (**secret**)|
   | `ANTHROPIC_API_KEY`             | console.anthropic.com (**server-only**)       |
   | `ANTHROPIC_MODEL`               | e.g. `claude-opus-4-8`                         |
   | `MOLLIE_API_KEY`                | Mollie dashboard (`test_…` in dev)            |
   | `MOLLIE_PRO_PRICE_EUR`          | Pro recurring price, e.g. `9.99`              |
   | `MOLLIE_PRO_INTERVAL`           | e.g. `1 month`                                |

3. **Database** — apply the migration to your Supabase project, either with the
   Supabase CLI:

   ```bash
   supabase db push
   ```

   …or by pasting `supabase/migrations/0001_init.sql` into the Supabase SQL
   editor. This creates `profiles`, `resumes`, `resume_content`,
   `subscriptions`, `ai_usage`, enables RLS, and installs the new-user trigger.

4. **Run**

   ```bash
   npm run dev
   ```

## Design source

UI/UX is implemented exactly from the approved Claude Design project
(`Export, Settings & States.dc.html` and siblings). Reading it requires design
authorization — run `/design-login` in the Claude Code session that builds the
UI.

## Scripts

| Script           | Purpose                       |
| ---------------- | ----------------------------- |
| `npm run dev`    | Local dev server (Turbopack)  |
| `npm run build`  | Production build              |
| `npm run start`  | Run the production build      |
| `npm run lint`   | ESLint                        |
