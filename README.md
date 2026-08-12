# CL2 Smart Services — Static contact + thank-you pages

Pre-launch lead capture you can open locally (double-click `index.html`) or on GitHub Pages.

**Live:** https://cl82salazar-wq.github.io/cl2-lead-capture/

## Files

| File | Purpose |
|------|---------|
| `index.html` | Contact / custom-order form (fields from `PASTE_READY`) |
| `thank-you.html` | Confirmation page after submit |
| `styles.css` | Brand styling (navy `#00205b`, teal `#00a8a8`, cyan `#00b4d8`) |
| `form.js` / `thank-you.js` | Client-side submit + thank-you helpers |
| `assets/*.svg` | Logo / icon from brand kit |
| `PASTE_READY_FILLED.txt` | Same copy with placeholders filled for Tally / Google Forms |

## Form submit choice (no backend yet)

**Primary when `WEB3FORMS_ACCESS_KEY` is set:** email the lead to `cl82salazar@gmail.com` via [Web3Forms](https://web3forms.com) (free).

**Fallback / no key:** download a JSON lead file + optional mailto.

Why this over mailto-only:

- Works offline and in browsers that block or mangle long `mailto:` links
- Gives Chris a durable file to paste/import into `CL2_Ops_Master.xlsx` → **Leads**
- Checkbox on the form also opens a pre-filled email to `cl82salazar@gmail.com` when desired

File upload is **not** supported in this static build — the form tells customers to email PNG/JPG/PDF/SVG to support.

When you wire Tally / Google Forms / Make later, replace the JS submit handler with the embed; keep the thank-you copy.

## Placeholders filled

| Key | Value |
|-----|--------|
| `sla_hours` | `24` |
| `support_email` | `cl82salazar@gmail.com` |
| `etsy_shop_url` | **TODO** — not found in brand/docs |
| `website_url` | `https://cl2-smart-services.myshopify.com` |

Update TODOs in:

- `index.html` / `thank-you.html` (visible `TODO:` badges)
- `form.js` / `thank-you.js` (`ETSY_SHOP_URL`, `WEBSITE_URL`)
- `PASTE_READY_FILLED.txt`

## Quick test

1. Open `index.html` in a browser  
2. Fill required fields → **Send message**  
3. Confirm a `CL2-lead-*.json` downloads and `thank-you.html` appears  
4. Log the test lead on the Leads tab, then delete the test row  

## Next automation step

Phase 1 (roadmap): Form → Google Sheet `Leads` row + notify email + auto-reply (`TPL_Website_form_autoreply.md`).
