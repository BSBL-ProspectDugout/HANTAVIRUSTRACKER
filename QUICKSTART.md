# Quick Start Guide

Get the Hantavirus Tracker running in 5 minutes.

## Option 1: Local Development (Fastest)

### Prerequisites
- Node.js 16+ (download from https://nodejs.org/)
- Git (optional, for version control)

### Steps

1. **Extract/Navigate to project**
   ```bash
   cd hantavirus-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit http://localhost:3001
   - You should see the interactive map and news feed

5. **Customize**
   - Edit `lib/scraper.ts` to add real data sources
   - Modify `app/page.tsx` to change styling
   - Add your API keys in `.env.local`

## Option 2: Docker (Easiest Deployment)

### Prerequisites
- Docker installed (https://www.docker.com/products/docker-desktop)

### Steps

1. **Build Docker image**
   ```bash
   docker build -t hantavirus-tracker .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 hantavirus-tracker
   ```

3. **Open in browser**
   - Visit http://localhost:3000

## Option 3: Deploy to Vercel (Production Ready)

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com/
   - Click "New Project"
   - Select your GitHub repository

3. **Deploy**
   - Click "Deploy"
   - Your site is live at your-project.vercel.app

4. **Add custom domain**
   - Go to Settings → Domains
   - Add hantavirusnews.com or hantanews.com
   - Follow DNS instructions

## Project Structure

```
hantavirus-tracker/
├── app/
│   ├── api/outbreaks/    # API for outbreak data
│   ├── api/news/         # API for news articles
│   ├── page.tsx          # Main homepage
│   └── layout.tsx        # Root layout
├── components/
│   └── OutbreakMap.tsx   # Interactive Leaflet map
├── lib/
│   ├── scraper.ts        # Data fetching
│   ├── real-sources.ts   # Real API integrations
│   └── types.ts          # TypeScript types
└── README.md             # Full documentation
```

## API Endpoints

The app includes two built-in APIs:

### Get Outbreak Data
```
GET /api/outbreaks
```

Returns:
```json
{
  "success": true,
  "data": {
    "outbreaks": [...],
    "stats": {
      "totalCases": 34,
      "totalDeaths": 6,
      "affectedCountries": 3,
      "affectedLocations": 5
    }
  }
}
```

### Get News Articles
```
GET /api/news?q=california
```

Returns:
```json
{
  "success": true,
  "data": {
    "articles": [...],
    "count": 5
  }
}
```

## Adding Real Data Sources

The app comes with sample data. To use real data:

1. **Sign up for NewsAPI**
   - Visit https://newsapi.org/
   - Get your free API key
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_NEWS_API_KEY=your_key_here
     ```

2. **Update the scraper**
   - Open `lib/scraper.ts`
   - Uncomment functions in `lib/real-sources.ts`
   - Replace sample data with real API calls

## Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'primary': '#your-color',
    }
  }
}
```

### Change Refresh Interval
In `app/api/outbreaks/route.ts`:
```typescript
export const revalidate = 1800; // 30 minutes instead of 1 hour
```

### Add More Outbreak Locations
In `lib/scraper.ts`, add to `SAMPLE_OUTBREAKS`:
```typescript
{
  id: 'my-location-2024',
  location: 'My City',
  country: 'My Country',
  lat: 0,
  lng: 0,
  cases: 10,
  deaths: 2,
  date: new Date().toISOString(),
  source: 'My Source',
}
```

## Next Steps

- [ ] Add real data sources
- [ ] Deploy to your domain
- [ ] Set up monitoring
- [ ] Add more features (alerts, trends, etc.)
- [ ] Customize styling

## Troubleshooting

### "Port 3000 already in use"
The app will automatically use port 3001 instead.

### Map not showing
Make sure Leaflet CSS is loaded. Clear browser cache (Ctrl+Shift+Delete).

### API returning empty data
Check `lib/scraper.ts` - make sure sample data is enabled.

## Resources

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Leaflet.js**: https://leafletjs.com/
- **TypeScript**: https://www.typescriptlang.org/docs/

## Getting Help

1. Check the [README.md](README.md) for full documentation
2. Check the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
3. Review [lib/real-sources.ts](lib/real-sources.ts) for API integration examples
4. Visit the official docs for:
   - Next.js: https://nextjs.org/
   - Tailwind: https://tailwindcss.com/
   - Leaflet: https://leafletjs.com/

---

**Ready to go live?** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.
