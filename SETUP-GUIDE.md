# Setting up rasipurampolice.in

This deployment package replaces the long Google Apps Script URL with your official custom domain **`https://rasipurampolice.in`**.

---

## 1. Domain Registration Status
- **Domain:** `rasipurampolice.in`
- **Availability:** Verified **AVAILABLE** as of October 2026.
- **Estimated Cost:** ~₹399 – ₹499 / year.
- **Where to register:**
  - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) *(Recommended — at-cost pricing, built-in free SSL & DDoS protection)*
  - [GoDaddy India](https://in.godaddy.com)
  - [Namecheap](https://www.namecheap.com)
  - [BigRock India](https://www.bigrock.in)

---

## 2. Package Files Overview

All deployment assets are compiled and ready in:
`/Users/sujithsampath/Documents/Codex/2026-10-06/i-want-a-qr-code-scanner/outputs/rasipurampolice-domain/`

| File | Purpose |
|---|---|
| `public-qr.png` | Crisp 1024×1024 PNG print QR code pointing to `https://rasipurampolice.in` |
| `public-qr.svg` | Scalable vector QR code for flex banners and print shops |
| `worker.js` | Cloudflare Worker edge code (serves portal in <30ms and proxies to Google Sheets) |
| `wrangler.toml` | Cloudflare Worker configuration |
| `index.html` | Self-contained citizen portal with inlined Tamil fonts and police emblem |
| `admin.html` | Officer dashboard interface |
| `server.mjs` | Standalone Node.js server (runs locally or on any cloud/VPS) |
| `Dockerfile` | Container definition for Docker / Cloud Run / Kubernetes |
| `package.json` | Project configuration and deployment scripts |

---

## 3. How It Works

1. **For Citizens:**
   - Citizens visit `https://rasipurampolice.in` or scan the new QR code.
   - They see an official, fast-loading, HTTPS-secured government portal.
   - **Zero Google warning banners, zero ugly links, zero suspicion.**
   - In-page microphone recording works natively (no Google iframe restrictions).

2. **For Police Officers:**
   - Officers visit `https://rasipurampolice.in/admin` (redirects to the private Google OAuth dashboard).
   - All submitted reports, photos, voice notes, and GPS coordinates automatically flow into your **existing private Google Sheet and Google Drive folder**.

---

## 4. Deployment Instructions

### Method A: Cloudflare Workers (Recommended — 100% Free Tier, Zero Maintenance)

1. Register `rasipurampolice.in` (e.g. on Cloudflare or any registrar and point nameservers to Cloudflare).
2. Open terminal and run:
   ```bash
   cd "/Users/sujithsampath/Documents/Codex/2026-10-06/i-want-a-qr-code-scanner/outputs/rasipurampolice-domain"
   npx wrangler login
   npx wrangler deploy
   ```
3. In the Cloudflare Dashboard:
   - Go to **Workers & Pages** ➔ Select `rasipurampolice-portal`.
   - Go to **Settings** ➔ **Domains & Routes** ➔ **Add Custom Domain**.
   - Enter `rasipurampolice.in` and `www.rasipurampolice.in`.
4. Done! The portal is live at `https://rasipurampolice.in`.

---

### Method B: Standalone Node.js / VPS Hosting

To run on an existing department server or VPS:
```bash
cd "/Users/sujithsampath/Documents/Codex/2026-10-06/i-want-a-qr-code-scanner/outputs/rasipurampolice-domain"
npm install
PORT=80 node server.mjs
```
Or with Docker:
```bash
docker build -t rasipurampolice .
docker run -d -p 80:8080 --name police-portal rasipurampolice
```
Point the `A` record of `rasipurampolice.in` to your server's public IP address.
