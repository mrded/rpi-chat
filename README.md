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

## Usage

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
