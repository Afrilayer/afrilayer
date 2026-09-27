# Afrilayer

**See what's happening across Africa.**

Afrilayer is an interactive, map-first activity layer for discovering what is happening across Africa by place, category and time.

## Current build — 0.11.0

The current MVP is intentionally a product shell with clearly labelled prototype signals. It now has:

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

The repository does **not** currently claim to ingest live news, public datasets, events or infrastructure feeds. The visible non-weather activity signals are demo data used to validate the product interaction. Weather is a live Open-Meteo layer and is clearly attributed in the UI.

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
- [x] Signal normalization and deduplication foundation\n- [x] Source registry foundation\n- [x] README kept current with product state

### Next
- [ ] Replace the stylized map with a real geographic map layer while preserving pan/zoom interaction
- [ ] Add richer country-level signal density and confidence visualization
- [ ] Define and register the first non-weather source adapter
- [ ] Add the first high-quality public source
- [ ] Normalize locations to coordinates
- [x] Add deduplication and confidence fields
- [ ] Persist normalized signals
- [ ] Add real-time/periodic refresh without turning the map into a noisy feed

## License

MIT


## Signal architecture

Afrilayer now has a small source layer in `lib/`:

- `signals.ts` defines normalized signal confidence and deduplication.
- `sources.ts` provides a registry contract for future live adapters.
- Weather remains the first live source and is kept separate from prototype activity.

A source should produce normalized signals before the UI consumes them:

`source → normalize → deduplicate → display`
