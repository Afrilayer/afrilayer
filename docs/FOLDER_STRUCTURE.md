# Folder Structure

## Provider Folders (The Database)

```
/providers/
├── {provider-slug}/              # URL-friendly slug (kebab-case)
│   ├── provider.json             # REQUIRED - Provider metadata
│   ├── README.md                 # REQUIRED - Human documentation
│   ├── api.json                  # OPTIONAL - Code samples, pricing, runtime data
│   ├── openapi.yaml              # OPTIONAL - OpenAPI specification
│   └── logo.svg                  # OPTIONAL - Provider logo (or use logoUrl)
├── verification/
│   └── verify.txt                # Verification metadata (cv/pv)
├── provider.template.json        # Template for new providers
└── README.template.md            # Template for provider READMEs
```

## Example: Paystack Provider

```
/providers/paystack/
├── provider.json                 # Complete metadata and schema
├── README.md                     # Human-readable documentation
├── api.json                      # Code samples and pricing (optional)
└── logo.svg                      # Provider logo (optional)
```

## Contributing a New Provider

1. Fork the repository
2. Create `/providers/{your-provider-slug}/` folder (use kebab-case)
3. Copy `provider.template.json` to your folder as `provider.json`
4. Copy `README.template.md` to your folder as `README.md`
5. Fill in your provider's information
6. Validate JSON syntax
7. Open a Pull Request
8. Automated validation runs in CI
9. Merge after approval

## Build Output

Generated automatically during `npm run build`:

```
/public/generated/
├── registry.json               # Auto-generated index with counts
└── providers/                    # Provider logos (if included in source)
```

## Do Not Edit

These files are auto-generated and will be overwritten:
- `/public/generated/registry.json`
- `/public/generated/providers/*.svg`

---

*Last updated: 2026-07-18*