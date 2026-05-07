# 🦠 Hantavirus Outbreak Tracker

A real-time web application for monitoring hantavirus outbreaks globally and aggregating news from multiple sources.

## Features

- **Interactive World Map**: Real-time visualization of outbreak locations with Leaflet.js
- **Live Statistics**: Total cases, deaths, affected countries, and outbreak locations
- **News Aggregation**: Automatically fetches and displays the latest hantavirus news from multiple sources
- **Search Functionality**: Search through news articles by keyword
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Auto-Updates**: Data refreshes every 6 hours automatically

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Mapping**: Leaflet.js (open-source map library)
- **Backend**: Next.js API Routes (Node.js)
- **Data Sources**: CDC, WHO, ECDC, and public news APIs
- **Type Safety**: TypeScript

## Project Structure

```
hantavirus-tracker/
├── app/
│   ├── api/
│   │   ├── news/
│   │   │   └── route.ts          # News API endpoint
│   │   └── outbreaks/
│   │       └── route.ts          # Outbreak data API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main homepage
│   └── globals.css               # Global styles
├── components/
│   └── OutbreakMap.tsx           # Leaflet map component
├── lib/
│   ├── scraper.ts                # Data fetching utilities
│   └── types.ts                  # TypeScript type definitions
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd hantavirus-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3001 in your browser

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

### Get Outbreak Data
**GET** `/api/outbreaks`

Returns current outbreak locations and statistics.

```json
{
  "success": true,
  "data": {
    "outbreaks": [
      {
        "id": "ca-2024",
        "location": "California",
        "country": "United States",
        "lat": 36.7783,
        "lng": -119.4179,
        "cases": 8,
        "deaths": 2,
        "date": "2026-05-05T20:08:21.417Z",
        "source": "CDC"
      }
    ],
    "stats": {
      "totalCases": 34,
      "totalDeaths": 6,
      "affectedCountries": 3,
      "affectedLocations": 5
    }
  },
  "timestamp": "2026-05-05T20:08:25.790Z"
}
```

### Get News Articles
**GET** `/api/news?q=search_query`

Returns news articles about hantavirus. Optionally filter by search query.

```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "1",
        "title": "CDC Updates Hantavirus Prevention Guidelines",
        "summary": "The CDC has released updated guidelines...",
        "source": "CDC.gov",
        "url": "https://www.cdc.gov/hantavirus",
        "publishedDate": "2026-05-03T20:08:29.379Z",
        "location": "United States"
      }
    ],
    "count": 5
  },
  "timestamp": "2026-05-05T20:08:29.380Z"
}
```

## Data Sources

Currently uses sample data. To integrate real data sources:

### 1. CDC API
- Hantavirus case data: https://www.cdc.gov/hantavirus/
- JSON API available for automated fetching

### 2. WHO (World Health Organization)
- Global outbreak data and alerts
- Available via their REST API

### 3. News APIs
- NewsAPI.org (requires API key)
- Google News RSS feeds
- Reuters, AP News feeds

## Customization

### Adding Real Data Sources

Edit `lib/scraper.ts` to integrate live data:

```typescript
export async function fetchOutbreakData(): Promise<Outbreak[]> {
  // Replace SAMPLE_OUTBREAKS with real API calls
  // Example:
  const response = await axios.get('https://api.cdc.gov/hantavirus/data');
  return response.data.map(item => ({
    id: item.id,
    location: item.location,
    // ... map other fields
  }));
}
```

### Styling

- Update Tailwind colors in `tailwind.config.js`
- Modify component styles in `components/OutbreakMap.tsx` and `app/page.tsx`
- Global styles in `app/globals.css`

### Updating Data Refresh Interval

In `app/api/outbreaks/route.ts` and `app/api/news/route.ts`:
```typescript
export const revalidate = 3600; // Change 3600 (1 hour) to desired seconds
```

## Deployment

### Deploy to Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Deploy to Other Platforms

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional Server
```bash
npm run build
npm start
```

## Features for Future Development

- [ ] Real CDC and WHO API integration
- [ ] Historical outbreak trends and graphs
- [ ] Email alerts for new outbreaks
- [ ] User accounts and saved locations
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced filters and analytics
- [ ] Integration with other diseases

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - feel free to use this project for personal or commercial use.

## Disclaimer

⚠️ **This is a tracking and informational tool only.** 
- Always consult official health agencies (CDC, WHO) for medical advice
- Do not use this as a substitute for professional medical guidance
- Data is provided "as-is" for informational purposes only

## Contact & Support

For questions or issues, please create an issue on GitHub or contact the maintainer.

---

Built with ❤️ for public health awareness
