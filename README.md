# Afrilayer

**See what's happening across Africa.**

Afrilayer is an interactive, map-first activity layer for discovering what is happening across Africa by place, category and time.

## Current build — 0.15.0

The current MVP combines a map-first interface with live weather, GDELT geographic news signals and live ADS-B aircraft positions, while keeping remaining prototype activity clearly labelled. It now has:

- Africa-first map interface
- LIVE / 24H / 7D / 30D filtering that changes the visible signal set
- Category filtering
- Clickable map markers
- Synchronized activity feed
- Activity detail panel
- Source attribution fields in the event model
- Zoom controls and map legend
- Country activity counts on the map
- Live weather status and provenance in the interface
- A clean separation between demo signals and future source ingestion

### What is not live yet

The repository now has a live GDELT GEO news layer in addition to the live Open-Meteo weather layer. The remaining non-weather prototype signals are still demo data. GDELT signals are fetched server-side, geographically mapped and clearly attributed in the UI.

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
- [x] Live-source refresh control and loading state\n- [x] Live aircraft layer with directional markers
- [x] Source registry foundation
- [x] README kept current with product state

### Next
- [ ] Replace the stylized country geometry with a complete geographic dataset while preserving pan/zoom interaction
- [ ] Add richer country-level signal density and confidence visualization
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
- Weather remains the first live source and is kept separate from prototype activity.

A source should produce normalized signals before the UI consumes them:

`source → normalize → deduplicate → display`


### Live sources

- **Open-Meteo** — current weather for the initial mapped cities.
- **GDELT GEO** — recent geographically mapped news coverage.\n- **OpenSky Network** — live ADS-B state vectors for aircraft inside the initial Africa bounding box. GDELT's GEO API supports GeoJSON output and geographic news mapping; Afrilayer uses it as a source layer rather than treating every article as an independent high-value event. citeturn0search3turn0search2

The GDELT adapter currently limits the initial request window and result count so the map does not become an uncontrolled firehose.

### Geographic positioning

Live and prototype signals are now projected from their latitude/longitude into the current Africa map bounds instead of using the previous rough center-based formula. This improves marker placement for the existing prototype geometry, but the country shapes are still intentionally incomplete and are **not** an authoritative geographic boundary dataset.

### Aviation layer

Afrilayer now includes aircraft as a distinct live map layer. The OpenSky API provides live state vectors including position, altitude, speed and track; Afrilayer converts those into lightweight directional map markers. The current server cache is intentionally conservative because OpenSky applies request-credit and rate-limit rules. citeturn0search0turn0search2

Aircraft are visual context, not activity signals to be interpreted as news. They can be filtered separately with the **Aviation** category.