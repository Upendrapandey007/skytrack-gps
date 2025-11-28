# SkyTrack Deployment Guide

## Quick Deploy (Free)

### 1. Deploy Backend to Render

1. Push your code to GitHub (create a new repository)
2. Go to [render.com](https://render.com) and sign up (free)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` config
6. Click "Create Web Service"
7. Wait for deployment (you'll get a URL like `https://skytrack-backend.onrender.com`)

### 2. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. In "Environment Variables", add:
   - Key: `VITE_SERVER_URL`
   - Value: Your Render backend URL (from step 1)
5. Click "Deploy"
6. You'll get a URL like `https://skytrack.vercel.app`

### 3. Update CORS

After getting your Vercel URL, update `server/index.js`:

```javascript
const io = new Server(server, {
  cors: {
    origin: "https://your-vercel-url.vercel.app", // Replace with your actual URL
    methods: ["GET", "POST"]
  }
});
```

Then push to GitHub - Render will auto-redeploy.

## Testing

1. Open the Vercel URL on your computer
2. Open `https://your-vercel-url.vercel.app/tracker.html` on your phone
3. Enter a device name and start tracking
4. Watch it appear on the main dashboard!

## Free Tier Limits

- **Render**: Backend may sleep after 15 minutes of inactivity
- **Vercel**: 100GB bandwidth/month

## Alternative: Deploy to Railway

If you prefer Railway instead of Render:

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add environment variable: `PORT=3000`
4. Deploy!
