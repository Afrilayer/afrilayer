# Roadmap

## Phase 1: Foundation & Architecture (Completed)

- [x] Codebase audit completed
- [x] Architecture documentation created
- [x] Data model finalized
- [x] Remove unused Supabase dependencies
- [x] Delete `/app/db/` and `/app/admin/` directories
- [x] Replace `lib/types.ts` with Git-aligned types
- [x] Update `lib/mock-data.ts` (kept design tokens only)
- [x] Centralize constants (countries, categories)
- [x] Build-time registry.json generation
- [x] Provider validation (JSON schema)

## Phase 2: Build Africa's Most Trusted API Registry

- [x] Pesapal (Payments - KE, UG, TZ, RW)
- [x] Africa's Talking (Messaging/Airtime/Payments - 12 countries)
- [x] Stitch (Banking/Payments - ZA, NG, KE, GH)
- [x] VerifyMe (Identity/KYC - NG)
- [x] Sendy (Logistics - KE, UG, TZ)
- [x] OkHi (Geolocation - KE, NG)
- [x] Mono (Banking - NG, KE, GH, ZA)
- [x] Yoco (Payments - ZA)
- [x] Ozow (Payments - ZA)
- [x] Vodafone Cash (Mobile Money - GH)
- [x] Youverify (Identity - NG)
- [x] Zenzera (Messaging/Airtime - ZA, NG, KE, GH)
- [x] Twiga Foods (Logistics - KE)
- [ ] Dojah - Already exists
- [ ] Kobo360 (Logistics - NG, KE)
- [ ] Pesapal API - Already exists
- [ ] Continue adding providers...

## Phase 3: Stabilize Features

- [ ] Search page SSR with build index
- [ ] Remove duplicate `/providers` page
- [ ] Verify all category/country pages
- [ ] Fix inline style handlers
- [ ] Ensure all features work reliably

## Phase 4: Performance & Polish

- [ ] Image optimization (logo copying to public/)
- [ ] Lazy load screenshots
- [ ] Lighthouse scores ≥ 90
- [ ] Accessibility fixes
- [ ] Mobile responsiveness verified

## Phase 5: Community Ready

- [ ] GitHub Actions validation workflow
- [ ] Contribution template
- [ ] PR template
- [ ] Full documentation published

---

*Last updated: 2026-07-16*