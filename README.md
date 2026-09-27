# Afrilayer

**See what's happening across Africa.**

Afrilayer is an interactive map for discovering activity across Africa — by place, category and time.

## Product direction

Afrilayer is not a conventional news site or directory. The map is the primary interface. Information is represented as geographic activity signals that can eventually come from public datasets, APIs, feeds, events, infrastructure sources and other verifiable sources.

### Initial experience

- Africa-first interactive map
- Live / 24H / 7D / 30D time controls
- Activity categories
- Clickable geographic signals
- Event detail panel
- Activity feed synchronized with the map
- Designed to grow into a multi-source ingestion platform

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Data philosophy

Do not turn Afrilayer into a firehose. Each signal should have a location, time, category and source. The product should favor useful, attributable activity over volume.

## License

MIT