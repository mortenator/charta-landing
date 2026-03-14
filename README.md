# Charta Landing Page

Landing page for [getcharta.ai](https://getcharta.ai) — the ThinkCell killer for Google Slides.

## Stack

Pure HTML/CSS. Zero dependencies. Fast loads, mobile responsive.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework preset: **Other** (no build command needed)
4. Set output directory to `.` (root)
5. Hit Deploy

Vercel will serve `index.html` at your custom domain.

## Custom Domain

1. In Vercel project → Settings → Domains
2. Add `getcharta.ai` and `www.getcharta.ai`
3. Update DNS at your registrar: add the CNAME/A records Vercel provides

## Updating the Marketplace Link

When Charta is live on Google Workspace Marketplace, replace all `href="#install"` and `href="#"` in the hero/CTA buttons with the actual marketplace URL.

## Files

- `index.html` — complete self-contained landing page
- `README.md` — this file
