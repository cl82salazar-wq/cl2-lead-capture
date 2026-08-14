# Brand drop-in (one pass)

Do **not** invent a mark. When the locked CL2 Smart Services files arrive, overwrite these three paths only:

| Slot | Use | Overwrite with |
|------|-----|----------------|
| `assets/favicon.svg` | tab icon | locked square/icon |
| `assets/mark.svg` | header mark (small) | locked mark |
| `assets/logo.svg` | header wordmark + og:image | locked horizontal logo |

Optional later (not required to go live):

- `assets/apple-touch-icon.png` — 180×180 PNG
- `assets/og.png` — 1200×630 PNG (then point `og:image` at it)

HTML already references the slot names. Services-first copy stays. Old kit filenames remain as backups until the locked files land.
