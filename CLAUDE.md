# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Raspberry Pi-based offline chat application that creates a WiFi hotspot with a web-based chat interface. The project is designed to provide local communication when there's no internet connection.

## Architecture

The application consists of three main components:

1. **Hotspot Service** (`/hotspot/`) - Creates WiFi access point and captive portal
2. **Web Application** (`/web/`) - React-based chat interface with Express.js backend
3. **Database** - CouchDB for persistent chat storage

### Key Components

- **Frontend**: React 18 with TypeScript, using MDB React UI Kit for styling
- **Backend**: Express.js server serving static files and handling routing
- **Database**: CouchDB with PouchDB for real-time synchronization
- **Authentication**: Simple localStorage-based user identification

## Development Commands

All development commands should be run from the `/web` directory:

```bash
# Install dependencies
npm install

# Start development server (React dev server)
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Start production server (Express backend)
npm start
```

## Docker Commands

From the project root:

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up

# Build and start services
docker-compose up --build

# Stop all services
docker-compose down
```

## Database Configuration

- CouchDB runs on port 5984
- Default credentials: admin/password
- Database name: rpi-chat
- The frontend uses PouchDB for real-time sync with CouchDB

## Environment Variables

- `PORT`: Web server port (default: 5000 for dev, 80 for production)
- `REACT_APP_COUCH_HOST`: CouchDB connection string
  - Development: `http://admin:password@localhost:5984`
  - Production: `http://10.0.0.1:5984`

## File Structure

- `/web/src/` - React components and hooks
- `/web/backend.js` - Express server
- `/hotspot/` - WiFi hotspot configuration
- `/couchdb/` - Database initialization scripts
- `/data/` - CouchDB data persistence

## Key Implementation Details

- Messages are stored in CouchDB with real-time sync via PouchDB
- User authentication is localStorage-based (no server-side auth)
- The app uses PouchDB's live changes feed for real-time message updates
- Docker multi-stage build optimizes the web container size
- The hotspot service creates a captive portal redirecting to the chat interface