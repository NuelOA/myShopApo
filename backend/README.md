# Pinpad Proxy Server

A simple Express.js server that acts as a proxy between the React frontend and the pinpad device.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## Endpoints

- `GET /health` - Health check
- `POST /api/pay` - Proxy payment requests to pinpad

## Configuration

The server will proxy requests to the pinpad IP address specified in the request body, or default to `192.168.1.195:8080`.

If the pinpad is unreachable, it returns a mock successful response for testing purposes.