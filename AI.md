# AI Agent Rules for Afrilayer

## Core Architectural Rules (Non-Negotiable)

1. **Never introduce a database.**
   - No PostgreSQL, Supabase, Firebase, MongoDB, or Prisma
   - Provider data lives in `/providers/{slug}/` folders only
   - Use filesystem or Git for all data operations

2. **GitHub is the source of truth.**
   - The repository *is* the database
   - GitHub is the CMS, audit log, and contributor system
   - Statistics and changelogs derive from Git history

3. **No admin panel or authentication.**
   - Contributions happen via Pull Requests
   - No user accounts, sign-in, or protected routes
   - All content is public and version-controlled

4. **Do not redesign unless explicitly requested.**
   - Preserve Afrilayer branding and color scheme
   - Audit for consistency, but defer visual changes
   - Use existing design system from Tailwind CSS and component styles

## Provider Data Rules

5. **Provider data comes exclusively from `/providers/`.**
   - Each provider is a folder with `provider.json` and `README.md`
   - Never fabricate or hallucinate provider data
   - Only ingest providers with official public documentation

6. **All pages load data through `lib/providers/loader.ts`.**
   - No direct filesystem reads in page components
   - Use normalized `Provider` object across all UI
   - Future storage migrations should not require UI changes

7. **Validate before accepting providers.**
   - Required fields: slug, name, description, website, documentation
   - Validate URLs are reachable (HTTP 200)
   - Validate slug uniqueness
   - Validate country/category against canonical lists

## Code Quality Rules

8. **Remove dead code.**
   - Delete unused imports, files, and directories
   - Remove Supabase dependencies if unused
   - Audit before adding new code paths

9. **Prefer server components.**
   - Avoid `"use client"` unless interactivity required
   - Static generation wherever possible
   - ISR revalidation at 1 hour for fresh data

10. **Keep builds fast.**
    - No unnecessary dependencies
    - Lazy load heavy components
    - Optimize images at build time

## Workflow Rules

11. **Write documentation before code.**
    - Update `docs/ROADMAP.md` for planned changes
    - Update `docs/DATA_MODEL.md` for schema changes
    - Create or update `docs/FOLDER_STRUCTURE.md`

12. **Follow the contribution model.**
    - Contributors fork, add folder, submit PR
    - No code changes required for provider additions
    - Validation runs in CI

---

*Last updated: 2026-07-18*