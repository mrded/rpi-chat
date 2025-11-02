# rpi-chat

Local WiFi hotspot chat for Raspberry Pi. The hotspot boots a captive portal that serves the local-only messenger.

![IMG_2804](https://user-images.githubusercontent.com/347098/60011424-ac6ff500-9671-11e9-9a2e-8c5273a1d860.PNG)

## Motivation

You’ve probably noticed that there’s no internet connection in some very important places, such as tube tunnels or lower ground floors.

So why don’t we create one? Maybe not a real internet - but something else.

The idea is to create a Wi-Fi hotspot with a local chat, allowing people nearby to connect and get to know who’s around.

## Components

- `hotspot/` – WiFi access point and captive portal scripts for Raspberry Pi
- `web/` – React Router + Express app with an embedded PouchDB server (`/db`) and React UI
- `ansible/` – Ansible playbooks and configuration for deploying to Raspberry Pi

## Usage

### Deployment with Ansible

Deploy the web app to your Raspberry Pi (runs on port 80):

```bash
cd ansible
ansible-playbook web.yml
```

Configure USB OTG networking for direct USB connection:

```bash
cd ansible
ansible-playbook usb-otg.yml
```

**Web deployment:**
- Build the app locally with Node v24+ (where esbuild works)
- Install Node.js 20 and npm on the Pi (sufficient for production runtime)
- Deploy the pre-built app to `/opt/rpi-chat/`
- Install production dependencies (only when package.json changes)
- Create and start a systemd service on port 80

**USB OTG networking:**
- Enables USB ethernet gadget mode on Raspberry Pi Zero
- Pi accessible at `192.168.4.1` via USB connection
- Includes DHCP server for automatic IP assignment to host computer
- Connect micro USB cable to Pi's data port, then SSH to `192.168.4.1`
- No WiFi needed for development/deployment
- Auto-activates on boot

**Deployment speed:**
- First deployment: ~3-4 minutes (installs all dependencies)
- Subsequent deployments: ~10-30 seconds (skips npm install if dependencies unchanged)
- Chat data persists across deployments in `/opt/rpi-chat/data/`

**Architecture support:**
- Works on both 32-bit (armhf) and 64-bit (arm64) Raspberry Pi OS
- Local development/build requires Node.js v24+ (for esbuild/Vite)
- Production runtime on Pi uses Node.js v20 (serves pre-built static files)
- Builds are done locally, so no esbuild compatibility issues on the Pi

### Manual setup

1. Provision a Pi with the scripts in `hotspot/` (run `entrypoint.sh` on boot).
2. From `web/`, install and start the chat stack:
   ```bash
   npm install
   npm start
   ```
   The app listens on port `5000`; chat history persists in `web/data/`.

Optional commands:

- `npm test` – run Jest suite
- `npm run typecheck` – TypeScript checks
