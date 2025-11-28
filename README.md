# 🛰️ SkyTrack GPS - Real-Time Vehicle Tracking

A modern, real-time GPS tracking application built with Vite, Leaflet.js, and Socket.io.

## Features

- 📍 Real-time vehicle tracking on interactive map
- 📱 Phone as GPS tracker - use your smartphone as a tracking device
- 🗺️ Dark mode map with custom markers
- 📊 Live stats and battery monitoring
- ⚡ WebSocket-based real-time updates

## Quick Deploy (FREE Hosting)

### Option 1: Manual Upload to GitHub

1. Go to [github.com](https://github.com) and create a new repository
2. Upload all files from this folder to your repository
3. Follow the deployment steps below

### Option 2: Use GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Create a new repository with this folder
3. Publish to GitHub

## Deploy Backend (Render.com - Free)

1. Sign up at [render.com](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Click "Create Web Service"
6. Copy your backend URL (e.g., `https://skytrack-backend.onrender.com`)

## Deploy Frontend (Vercel - Free)

1. Sign up at [vercel.com](https://vercel.com/)
2. Click "Add New" → "Project"  
3. Import your GitHub repository
4. Add Environment Variable:
   - **Name**: `VITE_SERVER_URL`
   - **Value**: Your Render backend URL (from above)
5. Click "Deploy"
6. Get your app URL (e.g., `https://skytrack.vercel.app`)

## Update CORS (Important!)

After deploying to Vercel, update `server/index.js` line 12:

```javascript
const io = new Server(server, {
  cors: {
    origin: "https://your-vercel-url.vercel.app", // <-- Replace with your actual Vercel URL
    methods: ["GET", "POST"]
  }
});
```

Push the change to GitHub, and Render will automatically redeploy.

## How to Use

1. **Dashboard**: Open your Vercel URL
2. **Tracker**: Open `your-vercel-url.vercel.app/tracker.html` on your phone
3. Enter a device name and click "Start Tracking"
4. Watch your location appear on the dashboard!

## Local Development

```bash
# Install dependencies
npm install

# Start frontend (Terminal 1)
npm run dev

# Start backend (Terminal 2)
node server/index.js
```

Open http://localhost:5173 for the dashboard
Open http://localhost:5173/tracker.html for the tracker

## Tech Stack

- **Frontend**: Vite, Leaflet.js, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Map**: OpenStreetMap (via CartoDB Dark theme)
- **Hosting**: Vercel (frontend) + Render (backend)

## Notes

- Free tier on Render may sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Geolocation requires HTTPS or localhost
