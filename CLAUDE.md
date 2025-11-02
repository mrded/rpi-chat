# CLAUDE.md

Quick notes for Claude Code.

## TL;DR
- Raspberry Pi hotspot with a captive-portal chat.
- `hotspot/` boots hostapd/dnsmasq and points traffic to the web app.
- `web/` is a React Router + Express server with an embedded PouchDB API at `/db`.

## Commands (run from `web/`)
```bash
npm install
npm start        # React Router dev server + Express on :5000
npm test         # Jest suite
npm run typecheck
```

## Data & Layout
- Chat storage lives under `web/data/` (managed by express-pouchdb).
- Frontend routes/components sit in `web/app/`; `web/server.js` wires Express, React Router, and PouchDB.
- Port is configurable via `PORT` (defaults to `5000`).
