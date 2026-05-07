'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Outbreak, NewsArticle, ApiResponse } from '@/lib/types';
import AdSenseBlock from '@/components/AdSenseBlock';

const OutbreakMap = dynamic(() => import('@/components/OutbreakMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />,
});

export default function Home() {
  const [outbreaks, setOutbreaks] = useState<Outbreak[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [stats, setStats] = useState({
    totalCases: 0,
    totalDeaths: 0,
    affectedCountries: 0,
    affectedLocations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    console.log('🚀 Home component mounted - calling loadData()');
    loadData();
    // Refresh every 5 minutes for fresh news
    const interval = setInterval(() => {
      console.log('🔄 Auto-refresh interval triggered');
      loadData();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  async function loadData() {
    try {
      console.log('📡 loadData() - Fetching from APIs...');
      setLoading(true);
      const [outbreaksRes, newsRes] = await Promise.all([
        fetch('/api/outbreaks?t=' + Date.now()),
        fetch('/api/news?t=' + Date.now()),
      ]);

      console.log('📡 Outbreaks response status:', outbreaksRes.status);
      console.log('📡 News response status:', newsRes.status);

      const outbreaksData = (await outbreaksRes.json()) as ApiResponse<any>;
      const newsData = (await newsRes.json()) as ApiResponse<any>;

      console.log('📡 Outbreaks data success:', outbreaksData.success, 'Count:', outbreaksData.data?.outbreaks?.length);
      console.log('📡 News data success:', newsData.success, 'Count:', newsData.data?.articles?.length);

      if (outbreaksData.success) {
        console.log('✅ Setting outbreaks:', outbreaksData.data.outbreaks.length);
        setOutbreaks(outbreaksData.data.outbreaks);
        setStats(outbreaksData.data.stats);
      }

      if (newsData.success) {
        console.log('✅ Setting news articles:', newsData.data.articles.length);
        console.log('📰 First article:', newsData.data.articles[0]?.title);
        setNews(newsData.data.articles);
        setSearchResults(newsData.data.articles);
      }

      console.log('✅ loadData() completed successfully');
    } catch (error) {
      console.error('❌ Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(news);
      return;
    }

    try {
      const res = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      const data = (await res.json()) as ApiResponse<any>;
      if (data.success) {
        setSearchResults(data.data.articles);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🦠 Hantavirus Tracker - Real-Time Outbreak Monitoring</h1>
          <p className="text-lg text-red-100 mb-2">
            Track hantavirus outbreaks globally with our interactive map. Get real-time hantavirus news, statistics, and updates from CDC, WHO, and international health organizations.
          </p>
          <p className="text-sm text-red-50">
            Monitor HPS (Hantavirus Pulmonary Syndrome) cases, deaths, and disease transmission worldwide. Latest hantavirus information from verified public health sources.
          </p>
        </div>
      </header>

      {/* Top Banner Ad */}
      {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
        <div className="bg-gray-100 py-4 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <AdSenseBlock adSlot="1234567890" adFormat="horizontal" />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <div className="text-gray-600 text-sm font-semibold mb-1">Total Cases</div>
            <div className="text-4xl font-bold text-red-700">{stats.totalCases}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
            <div className="text-gray-600 text-sm font-semibold mb-1">Deaths</div>
            <div className="text-4xl font-bold text-orange-700">{stats.totalDeaths}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <div className="text-gray-600 text-sm font-semibold mb-1">Affected Countries</div>
            <div className="text-4xl font-bold text-yellow-700">{stats.affectedCountries}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <div className="text-gray-600 text-sm font-semibold mb-1">Locations</div>
            <div className="text-4xl font-bold text-blue-700">{stats.affectedLocations}</div>
          </div>
        </div>

        {/* Mid-page Ad */}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
          <div className="mb-8 bg-white rounded-lg shadow p-4">
            <AdSenseBlock adSlot="2345678901" adFormat="auto" />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 md:h-[500px]">
                {!loading && <OutbreakMap outbreaks={outbreaks} />}
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600">
                  ℹ️ Click on markers for detailed outbreak information
                </p>
              </div>
            </div>
          </div>

          {/* News Feed Section */}
          <div className="space-y-4">
            {/* Side Ad */}
            {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
              <div className="bg-white rounded-lg shadow p-4">
                <AdSenseBlock adSlot="3456789012" adFormat="vertical" style={{ minHeight: '600px' }} />
              </div>
            )}

            {/* News Feed */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b bg-gray-50">
              <h2 className="font-bold text-lg mb-3 text-gray-900">Latest News</h2>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition"
                >
                  Search
                </button>
              </form>
            </div>

            {/* News List */}
            <div className="flex-1 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border-b hover:bg-red-50 transition"
                  >
                    <h3 className="font-semibold text-sm text-gray-900 hover:text-red-700 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{article.summary}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium text-blue-600">{article.source}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No news articles found</div>
              )}
            </div>
            </div>
          </div>
        </div>

        {/* Between Content Ad */}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
          <div className="my-8 bg-white rounded-lg shadow p-4">
            <AdSenseBlock adSlot="4567890123" adFormat="auto" />
          </div>
        )}

        {/* Outbreak Details Table */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-red-50 to-orange-50">
            <h2 className="font-bold text-2xl text-gray-900">Outbreak Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Country
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                    Cases
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                    Deaths
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {outbreaks.map((outbreak, idx) => (
                  <tr
                    key={outbreak.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {outbreak.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{outbreak.country}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">
                      {outbreak.cases}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-orange-600">
                      {outbreak.deaths}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-medium">{outbreak.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(outbreak.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Ad */}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
          <div className="my-8 bg-white rounded-lg shadow p-4">
            <AdSenseBlock adSlot="5678901234" adFormat="horizontal" />
          </div>
        )}

        {/* SEO Content Section */}
        <section className="mt-16 bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Hantavirus</h2>
            <p className="text-gray-700 mb-4">
              Hantavirus is a serious public health concern transmitted through contact with infected rodents. This hantavirus tracker provides real-time data on hantavirus outbreaks and the latest hantavirus news from international health organizations.
            </p>
            <p className="text-gray-700">
              Hantavirus pulmonary syndrome (HPS) is a severe and potentially fatal respiratory disease caused by hantavirus. Cases of hantavirus have been reported across the United States and internationally, making hantavirus awareness critical for public health.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hantavirus Symptoms & Prevention</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg text-red-700 mb-2">🔴 Early Hantavirus Symptoms</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Fatigue and muscle aches</li>
                  <li>High fever (above 101°F)</li>
                  <li>Severe headache</li>
                  <li>Chills and body aches</li>
                  <li>Nausea and abdominal pain</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg text-green-700 mb-2">✅ Hantavirus Prevention Tips</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Seal cracks and gaps in homes</li>
                  <li>Use traps for rodent control</li>
                  <li>Store food in sealed containers</li>
                  <li>Avoid contact with rodent droppings</li>
                  <li>Wear protective equipment when cleaning</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hantavirus Outbreak Statistics</h3>
            <p className="text-gray-700 mb-3">
              Our hantavirus map tracks confirmed hantavirus cases and deaths worldwide. The hantavirus tracker monitors disease transmission across different regions, showing where hantavirus outbreaks are occurring.
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-600">
                <strong>Current Hantavirus Statistics:</strong> This hantavirus tracker shows real-time data from verified sources including the CDC (Centers for Disease Control), WHO (World Health Organization), and ECDC (European Centre for Disease Prevention and Control).
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hantavirus News & Latest Updates</h3>
            <p className="text-gray-700">
              Stay updated with the latest hantavirus news from our aggregated news feed. Our hantavirus tracker pulls current hantavirus information from reputable sources, keeping you informed about hantavirus outbreaks and public health responses.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Understanding Hantavirus Transmission</h3>
            <p className="text-gray-700 mb-3">
              Hantavirus transmission occurs primarily through:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li><strong>Rodent contact:</strong> Direct contact with infected rodents or their droppings is the main hantavirus transmission route</li>
              <li><strong>Inhalation:</strong> Breathing dust containing hantavirus particles can cause infection</li>
              <li><strong>Contaminated surfaces:</strong> Touching surfaces contaminated with hantavirus and then your face</li>
              <li><strong>Rare person-to-person:</strong> Some hantavirus types can spread between people in rare cases</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h4 className="font-bold text-blue-900 mb-2">🔍 Using the Hantavirus Tracker</h4>
            <p className="text-blue-800">
              This hantavirus tracker provides an interactive hantavirus map showing outbreak locations, a real-time hantavirus news feed, and current statistics on hantavirus cases and deaths. The hantavirus tracker updates automatically with the latest hantavirus information from official health sources.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t text-center text-gray-600 text-sm">
          <p>
            <strong>Hantavirus Tracker Data Sources:</strong> CDC, WHO, ECDC | Last updated: {currentTime}
          </p>
          <p className="mt-2">
            ⚠️ <strong>Medical Disclaimer:</strong> This hantavirus tracker is for informational purposes only. Always consult official health agencies and medical professionals for hantavirus medical advice and treatment.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Real-time hantavirus monitoring | Hantavirus outbreak alerts | Hantavirus news aggregation
          </p>
        </footer>
      </main>
    </div>
  );
}
