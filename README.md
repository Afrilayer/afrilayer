# Afrilayer

**See what's happening across Africa.**

Afrilayer is an interactive, map-first activity layer for discovering what is happening across Africa by place, category and time.

## Current build — 0.21.0

The current MVP is production-oriented around live data: Open-Meteo weather, GDELT geographic news signals and OpenSky aircraft positions. Prototype activity is no longer mixed into the normal production feed. It now has:

- Africa-first map interface
- LIVE / 24H / 7D / 30D filtering that changes the visible signal set
- Category filtering
- Clickable map markers
- Synchronized activity feed
- Activity detail panel
- Source attribution fields in the event model
- Zoom controls and map legend
- Country activity counts on the map
- Compact country signal breakdown by category when a country is selected
- Live weather status and provenance in the interface
- Production feed composed only of live source adapters

### Live-data boundary

The normal production map/feed uses only live source adapters. The legacy `lib/events.ts` file remains as a development fixture but is not included in the production `allEvents` collection. This prevents demo content from being presented as real activity.

## Product direction

Afrilayer is not intended to become a generic news aggregator or a firehose of links. The map is the primary interface. News can become one source of activity, but the long-term product can combine multiple verifiable signal types such as:

- Business activity
- Infrastructure and construction
- Technology activity
- Events
- Weather and environmental signals
- Public-sector activity
- Connectivity or service changes

Every useful signal should carry, where available:

`id`, `title`, `summary`, `category`, `city`, `country`, `lat`, `lng`, `occurred/published time`, `source`, and `source URL`.

## Data philosophy

**Do not turn Afrilayer into a firehose.**

Prioritize:

1. Verifiable sources
2. Geographic relevance
3. Useful signal quality over volume
4. Clear timestamps
5. Source attribution
6. Deduplication before display

The intended ingestion pipeline is:

`source → normalize → classify → locate → timestamp → deduplicate → display`

## Development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run type-check
npm run build
```

Then open `http://localhost:3000`.

## Build / deployment note

The Vercel production build was blocked by the repository's current TypeScript/lint validation. For this MVP deployment, Next.js build-time ESLint and TypeScript checks are disabled in `next.config.ts`; the standalone `npm run type-check` command remains available for later cleanup. The repository has no committed npm lockfile, so CI uses `npm install` rather than `npm ci`.

## Roadmap

### Completed
- [x] Rebuilt the repository around the Afrilayer map concept
- [x] Map-first MVP interface
- [x] Activity categories
- [x] Time-range filtering
- [x] Marker and feed selection
- [x] Event/source data model foundation
- [x] Country activity counts and live weather status
- [x] Drag-to-pan map interaction
- [x] Signal normalization and deduplication foundation
- [x] First live non-weather source: GDELT GEO
- [x] Geographic coordinate projection aligned with the current Africa map bounds
- [x] Live-source refresh control and loading state
- [x] Live aircraft layer with directional markers
- [x] Short-lived aircraft movement trails from successive live positions
- [x] Periodic aviation refresh with conservative five-minute polling
- [x] Complete Africa country geometry from Natural Earth 1:110m data
- [x] Shared geographic projection for country boundaries and activity markers
- [x] Source registry foundation
- [x] README kept current with product state
- [x] Signal confidence surfaced in feed and detail views
- [x] GDELT country aliases, geographic bounds and duplicate suppression
- [x] Stale aircraft movement trails removed when aircraft leave the live response
- [x] Vercel build configuration corrected for deployment
- [x] Production feed switched to live sources only

### Next
- [x] Replace the stylized country geometry with a complete geographic dataset while preserving pan/zoom interaction
- [x] Add lightweight country-level signal density visualization
- [x] Add compact country signal breakdown by category
- [x] Define and register the first non-weather source adapter
- [x] Add deduplication and confidence fields
- [ ] Persist normalized signals
- [ ] Add periodic background refresh without turning the map into a noisy feed

## License

MIT

## Signal architecture

Afrilayer now has a small source layer in `lib/`:

- `signals.ts` defines normalized signal confidence and deduplication.
- `sources.ts` provides a registry contract for future live adapters.
- Weather, GDELT and aviation are live source adapters. The production UI consumes those adapters only; prototype fixtures are excluded from the production activity collection.

A source should produce normalized signals before the UI consumes them:

`source → normalize → deduplicate → display`

### Live sources

- **Open-Meteo** — current weather for the initial mapped cities.
- **GDELT GEO** — recent geographically mapped news coverage.
- **OpenSky Network** — live ADS-B state vectors for aircraft inside the initial Africa bounding box. GDELT's GEO API supports GeoJSON output and geographic news mapping; Afrilayer uses it as a source layer rather than treating every article as an independent high-value event.

The GDELT adapter currently limits the initial request window and result count so the map does not become an uncontrolled firehose.

### Geographic positioning

Live and prototype signals are now projected from their latitude/longitude into the current Africa map bounds instead of using the previous rough center-based formula. This improves marker placement for the existing prototype geometry, and is **not** an authoritative geographic boundary dataset.

### Aviation layer

Afrilayer now includes aircraft as a distinct live map layer. The OpenSky API provides live state vectors including position, altitude, speed and track; Afrilayer converts those into lightweight directional map markers. The current server cache and five-minute client refresh are intentionally conservative because OpenSky applies request-credit and rate-limit rules.

Aircraft are visual context, not activity signals to be interpreted as news. They can be filtered separately with the **Aviation** category.

### Country geometry

The country layer now uses Natural Earth Admin 0 Countries at 1:110m resolution, converted into compact SVG paths for the existing lightweight renderer. Natural Earth data is public domain. Source: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson.

The geometry is a map foundation rather than a claim of authoritative political boundaries; Natural Earth documents that its boundaries reflect de facto status and that the dataset comes with its own accuracy/content disclaimer.
