# Roadmap

## Phase 1: Foundation & Architecture (Completed)

- [x] Codebase audit completed
- [x] Architecture documentation created (docs/ARCHITECTURE.md)
- [x] Data model finalized (lib/types.ts)
- [x] Remove unused Supabase dependencies
- [x] Delete `/app/db/` and `/app/admin/` directories
- [x] Replace `lib/types.ts` with Git-aligned types
- [x] Update `lib/mock-data.ts` (kept design tokens only)
- [x] Centralize constants (countries, categories) in lib/constants.ts
- [x] Build-time registry.json generation
- [x] Provider validation (validation/provider.schema.json)
- [x] Fix all TypeScript build errors

## Phase 2: Build Africa's Most Trusted API Registry (Completed)

**Payments (12 providers):**
- [x] Paystack (NG)
- [x] Flutterwave (NG/KE/ZA/GH)
- [x] Pesapal (KE/UG/TZ/RW)
- [x] Yoco (ZA)
- [x] Ozow (ZA)
- [x] Interswitch (NG)
- [x] DPO Group (9 countries)
- [x] Peach Payments (ZA/ZM/MW)
- [x] WatuPay (KE/TZ/UG)

**Messaging/Airtime (3):**
- [x] Africa's Talking (12 countries)
- [x] Nalo SMS
- [x] Zenzera

**Banking/Open Finance (3):**
- [x] Stitch (ZA/NG/KE/GH)
- [x] Mono (NG/KE/GH/ZA)

**Identity/KYC (4):**
- [x] Dojah (NG/KE/GH)
- [x] VerifyMe (NG)
- [x] Youverify (NG/KE/GH/ZA)
- [x] Smile Identity

**Logistics (2):**
- [x] Sendy (KE/UG/TZ)
- [x] Twiga Foods

**Geolocation (1):**
- [x] OkHi (KE/NG)

**Mobile Money (2):**
- [x] MTN MoMo
- [x] Vodafone Cash (GH)

**Telecom (1):**
- [x] Safaricom (KE)

**Government (1):**
- [x] Nigeria Government APIs

**Financial Infrastructure (1):**
- [x] Pula (Insurance/Agri-finance - 7 countries)

## Phase 2.5: Registry Quality & Launch Readiness (Completed)

- [x] Provider templates (provider.template.json, README.template.md)
- [x] GitHub Actions validation workflow
- [x] Improved CONTRIBUTING.md
- [x] CODE_OF_CONDUCT.md
- [x] LICENSE
- [x] docs/FAQ.md
- [x] Sitemap and robots.txt

## Phase 3: Stabilize Features (To Do)

- [ ] Search page SSR with build index
- [ ] Image optimization (logo copying to public/)
- [ ] Verify all category/country pages work
- [ ] Ensure all features work reliably

## Phase 4: Performance & Polish (To Do)

- [ ] Lazy load screenshots
- [ ] Lighthouse scores ≥ 90/95/100
- [ ] Accessibility fixes
- [ ] Mobile responsiveness verified

## Phase 5: Community Ready (To Do)

- [ ] Pull request template
- [ ] GitHub Discussions setup

---

*Total providers: 22+ across 10+ African countries*