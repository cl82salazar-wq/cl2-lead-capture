# CL2 Smart Services — Next steps (lead form + auto-reply)

Coding/automation lane checklist. **Do not edit Shopify admin products** (Luke owns live store ops).  
Public storefront: https://cl2-smart-services.myshopify.com  
Support: cl82salazar@gmail.com · SLA: 24 business hours

## Done already
- [x] Hosted static lead site on GitHub Pages: https://cl82salazar-wq.github.io/cl2-lead-capture/
- [x] Repo: https://github.com/cl82salazar-wq/cl2-lead-capture
- [x] Static contact + thank-you pages in `website/live/`
- [x] `website_url` set to Shopify storefront in `form.js`, `thank-you.js`, HTML, `PASTE_READY_FILLED.txt`
- [x] Public storefront responds (no password wall); products visible (see pulse notes below)

## Still blocked
- [ ] **Etsy shop URL** — still `TODO` in `form.js`, `thank-you.js`, `PASTE_READY_FILLED.txt`, and the Etsy button on `thank-you.html`. Paste the real shop URL when available; until then the Etsy CTA alerts / stays `#`.

---

## 1) Publish the contact form (pick one)

### Option A — Tally (fastest)
1. Create form titled **Contact CL2 Smart Services** using fields from `PASTE_READY_FILLED.txt` (sections FORM TITLE → PRIVACY LINE).
2. Headline / subhead / intro: copy from that same file. For “shop” links use **https://cl2-smart-services.myshopify.com** until Etsy URL exists (or omit Etsy sentence).
3. Thank-you screen: paste **THANK-YOU PAGE (FULL)** or **THANK-YOU (SHORT BOX)** from `PASTE_READY_FILLED.txt`. Home button → Shopify URL above.
4. Publish → copy the public form URL (and embed snippet if you want it on a host later).

### Option B — Google Forms
1. Same field list / required flags from `PASTE_READY_FILLED.txt`.
2. Confirmation message: use **THANK-YOU (SHORT BOX)** text; include Shopify URL as the browse link.
3. Turn on **Collect email addresses** (or keep the Email question required).
4. Link the form to a Google Sheet (Responses tab) — this becomes the interim Leads sink.

### Option C — Keep static HTML for now (done via GitHub Pages)
1. ~~Host `website/live/`~~ Live at https://cl82salazar-wq.github.io/cl2-lead-capture/ (source also in local `website/live/`).
2. Leave submit as JSON download + optional mailto (current `form.js`).
3. Still do step 2 auto-reply below once you move to Tally/Google Forms (static site cannot send email by itself).

---

## 2) Wire auto-reply + owner notify

Use copy from:
- `PASTE_READY_FILLED.txt` → **AUTO-REPLY EMAIL** / **OWNER NOTIFY EMAIL**
- Template: `automation/templates/TPL_Website_form_autoreply.md`

### Tally
1. Form settings → Email notifications → **Send email to respondent**.
2. Subject: `We got your message — CL2 Smart Services`
3. Body: paste auto-reply; map `{{name}}` / interest field; put **https://cl2-smart-services.myshopify.com** where the Etsy URL would go until Etsy is ready; close with support email.
4. Also enable **notify myself** (or integrate Make/Zapier) using **OWNER NOTIFY** subject/body → inbox `cl82salazar@gmail.com`.

### Google Forms + Apps Script / Zapier / Make
1. Trigger: new form response.
2. Action A — email submitter (auto-reply body above).
3. Action B — email `cl82salazar@gmail.com` with `[CL2 Lead] …` owner notify body.
4. Action C (Phase 1) — append row to **Leads** (`CL2_Ops_Master.xlsx` / Sheet) with `source = Website_form`, `status = New`.

### Field mapping (minimum)
| Form field | Leads / notify |
|---|---|
| Name | name |
| Email | email |
| What can we help with? | interest / what_can_we_help_with |
| Tell us more | notes |
| Product / Qty / Deadline / Found us | notes helpers |

---

## 3) Smoke test (before sharing the link)
1. Submit a test lead as yourself.
2. Confirm: auto-reply lands in the tester inbox within a few minutes.
3. Confirm: owner notify hits `cl82salazar@gmail.com`.
4. Log row on Leads → then delete the test row.
5. Click thank-you **Back to home** → should open https://cl2-smart-services.myshopify.com
6. Etsy button: expected to stay blocked until URL is pasted.

## 4) After Etsy URL arrives (Chris)
1. Set `ETSY_SHOP_URL` in `form.js` and `thank-you.js`.
2. Replace remaining `TODO: paste real Etsy shop URL` lines in `PASTE_READY_FILLED.txt`.
3. Update Tally/Google Forms auto-reply + thank-you “browse” link to the real Etsy URL (keep Shopify as secondary storefront link).

---

## Storefront pulse (2026-08-12)
- Title: **CL2 Smart Services**
- Password wall: **No** (public 200 OK)
- Products showing: **Yes** — 2 product cards (~$24.99 each)
  - Loyal Like a German Shepherd - Unisex T-Shirt
  - Man's Best Friend - German Shepherd Unisex T-Shirt
- Nav includes Home / Catalog / Contact
- No obvious broken storefront bits from HTML fetch (sold-out strings are theme badge CSS only)

Lane reminder: coding/automation only — Luke handles Shopify admin / live catalog ops.
