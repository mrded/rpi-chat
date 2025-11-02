# CLAUDE.md

Quick notes for Claude Code.

## TL;DR
- Raspberry Pi hotspot with a captive-portal chat.
- `hotspot/` boots hostapd/dnsmasq and points traffic to the web app.
- `web/` is a React Router + Express server with an embedded PouchDB API at `/db`.
- `ansible/` contains deployment configuration for Raspberry Pi.

## Commands (run from `web/`)
```bash
npm install
npm run dev      # React Router dev server + Express on :5000 (requires Node v24+)
npm run build    # Build for production (requires Node v24+, creates build/)
npm start        # Run production server (works on Node v20+, uses pre-built files)
npm test         # Jest suite
npm run typecheck
```

## Node Version Requirements
- **Development & Build**: Node v24+ required (for esbuild/Vite compatibility)
- **Production Runtime**: Node v20+ sufficient (only serves pre-built static files)
- `.nvmrc` is set to v24 for local development
- Raspberry Pi deployment uses Node v20 from system packages

## Data & Layout
- Chat storage lives under `web/data/` (managed by express-pouchdb).
- Frontend routes/components sit in `web/app/`.
- `web/server.js` - Dev server with Vite (for local development)
- `web/server-prod.js` - Production server (serves pre-built static files)
- `web/build/` - Production build output (created by `npm run build`)
- Port is configurable via `PORT` (defaults to `5000` dev, `80` production).

## Deployment
Ansible playbooks for Raspberry Pi deployment:

**Web app deployment:**
- `ansible/web.yml` - deploys the web app to Raspberry Pi on port 80
- Inventory: `ansible/inventory.yml` (host: zero3.local, user: mrded)
- Run: `cd ansible && ansible-playbook web.yml`
- Builds app locally, deploys pre-built files to `/opt/rpi-chat/`
- Creates systemd service with CAP_NET_BIND_SERVICE capability for port 80
- Only reinstalls dependencies when package.json changes
- Preserves `data/` and `node_modules/` across deployments

**USB OTG networking:**
- `ansible/usb-otg.yml` - configures USB ethernet gadget for direct connection
- Run: `cd ansible && ansible-playbook usb-otg.yml`
- Enables USB networking on Pi Zero at `192.168.4.1`
- Includes DHCP server for automatic IP assignment (host gets 192.168.4.2-192.168.4.10)
- Connect via micro USB cable, then SSH to `192.168.4.1`
- Auto-activates on boot, no WiFi required for development/deployment
