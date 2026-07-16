# Folder Structure

## Provider Folders (The Database)

```
/providers/
├── {provider-slug}/
│   ├── provider.json      # REQUIRED - Core metadata
│   ├── README.md          # REQUIRED - Human documentation
│   ├── api.json           # OPTIONAL - Code samples, pricing, runtime
│   ├── openapi.yaml       # OPTIONAL - OpenAPI specification
│   └── imgs/
│       ├── logo.svg       # REQUIRED - Provider logo
│       ├── hero.png       # OPTIONAL - Hero screenshot
│       └── screenshots/   # OPTIONAL - Additional UI screenshots
```

## Example: Paystack Provider

```
/providers/paystack/
├── provider.json
├── README.md
├── api.json
└── imgs/
    ├── logo.svg
    └── screenshots/
        ├── dashboard.png
        └── docs.png
```

## Contributing a New Provider

1. Fork the repository
2. Create `/providers/{your-provider-slug}/` folder
3. Create `provider.json` following the schema
4. Create `README.md` with documentation
5. Copy/add `imgs/logo.svg`
6. Open a Pull Request
7. Automated validation runs
8. Merge after approval

## Build Output

```
/public/generated/
├── registry.json          # Auto-generated index
└── providers/
    ├── paystack.svg
    ├── flutterwave.svg
    └── ...                # All provider logos
```

## Do Not Edit

These files are auto-generated:
- `/public/generated/registry.json`
- `/public/generated/providers/*.svg`

The build process overwrites them on each deployment.