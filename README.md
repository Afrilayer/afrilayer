# Afrilayer

**See what's happening across Africa.**

Afrilayer is an interactive, map-first activity layer for discovering what is happening across Africa by place, category and time.

## Current build — 0.5.0

The current MVP is intentionally a product shell with clearly labelled prototype signals. It now has:

- Africa-first map interface
- LIVE / 24H / 7D / 30D filtering that changes the visible signal set
- Category filtering
- Clickable map markers
- Synchronized activity feed
- Activity detail panel
- Source attribution fields in the event model
- Zoom controls and map legend
- A clean separation between demo signals and future source ingestion

### What is not live yet

The repository does **not** currently claim to ingest live news, public datasets, events or infrastructure feeds. The visible signals are demo data used to validate the product interaction.

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
- [x] README kept current with product state

### Next
- [ ] Replace the stylized map with a real geographic map layer
- [ ] Define source adapters and ingestion contracts
- [ ] Add the first high-quality public source
- [ ] Normalize locations to coordinates
- [ ] Add deduplication and confidence fields
- [ ] Persist normalized signals
- [ ] Add real-time/periodic refresh without turning the map into a noisy feed

## License

MIT
