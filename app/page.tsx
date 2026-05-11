'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Outbreak, NewsArticle, ApiResponse } from '@/lib/types';
import { Alert } from '@/lib/alert-aggregator';
import AdSenseBlock from '@/components/AdSenseBlock';
import AlertTimeline from '@/components/AlertTimeline';
import StatisticsPanel from '@/components/StatisticsPanel';
import TrendAnalysis from '@/components/TrendAnalysis';

const OutbreakMap = dynamic(() => import('@/components/OutbreakMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />,
});

interface DashboardData {
  outbreaks: Outbreak[];
  news: NewsArticle[];
  alerts: Alert[];
  statistics: any;
  trends: any;
  metadata: any;
}

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'news' | 'details'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log('🚀 Home component mounted');
    loadDashboardData();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Refresh data every 5 minutes
    const dataInterval = setInterval(() => {
      console.log('🔄 Auto-refresh dashboard');
      loadDashboardData();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard?t=' + Date.now());
      const data = (await res.json()) as ApiResponse<DashboardData>;

      if (data.success) {
        setDashboardData(data.data);
        console.log('✅ Dashboard data loaded:', data.data);
      }
    } catch (error) {
      console.error('❌ Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  }

  if (!dashboardData && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading real-time dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.statistics || {};
  const trends = dashboardData?.trends || {};
  const outbreaks = dashboardData?.outbreaks || [];
  const alerts = dashboardData?.alerts || [];
  const news = dashboardData?.news || [];
  const metadata = dashboardData?.metadata || {};

  // Prepare statistics cards
  const statsCards = [
    {
      label: 'Total Cases',
      value: stats.totalCases || 0,
      icon: '🦠',
      color: 'border-red-600',
      change: '+12',
      changeType: 'up' as const,
    },
    {
      label: 'Deaths',
      value: stats.totalDeaths || 0,
      icon: '⚠️',
      color: 'border-orange-600',
      change: '+3',
      changeType: 'up' as const,
    },
    {
      label: 'Affected Countries',
      value: stats.affectedCountries || 0,
      icon: '🌍',
      color: 'border-yellow-600',
      change: '+1',
      changeType: 'up' as const,
    },
    {
      label: 'Case Fatality Rate',
      value: `${stats.caseFatalityRate || 0}%`,
      icon: '📊',
      color: 'border-blue-600',
    },
  ];

  // Prepare alert type distribution
  const alertTypeData = trends.alertTypeDistribution ? [
    {
      name: 'Updates',
      value: trends.alertTypeDistribution.UPDATE || 0,
      percentage: 0,
      color: 'bg-blue-500',
    },
    {
      name: 'WHO Alerts',
      value: trends.alertTypeDistribution.WHO || 0,
      percentage: 0,
      color: 'bg-purple-500',
    },
    {
      name: 'Critical Alerts',
      value: trends.alertTypeDistribution.ALERT || 0,
      percentage: 0,
      color: 'bg-red-500',
    },
    {
      name: 'Lab Reports',
      value: trends.alertTypeDistribution.LAB || 0,
      percentage: 0,
      color: 'bg-green-500',
    },
    {
      name: 'Cases',
      value: trends.alertTypeDistribution.CASE || 0,
      percentage: 0,
      color: 'bg-orange-500',
    },
    {
      name: 'ProMED',
      value: trends.alertTypeDistribution.PROMED || 0,
      percentage: 0,
      color: 'bg-yellow-500',
    },
  ].map(item => {
    const total = [
      trends.alertTypeDistribution.UPDATE,
      trends.alertTypeDistribution.WHO,
      trends.alertTypeDistribution.ALERT,
      trends.alertTypeDistribution.LAB,
      trends.alertTypeDistribution.CASE,
      trends.alertTypeDistribution.PROMED,
    ].reduce((a: number, b: number) => a + b, 0);
    return { ...item, percentage: total > 0 ? (item.value / total) * 100 : 0 };
  }) : [];

  // Prepare severity distribution
  const severityData = trends.severityDistribution ? [
    {
      name: 'Critical',
      value: trends.severityDistribution.critical || 0,
      percentage: 0,
      color: 'bg-red-600',
    },
    {
      name: 'High',
      value: trends.severityDistribution.high || 0,
      percentage: 0,
      color: 'bg-orange-600',
    },
    {
      name: 'Medium',
      value: trends.severityDistribution.medium || 0,
      percentage: 0,
      color: 'bg-yellow-600',
    },
    {
      name: 'Low',
      value: trends.severityDistribution.low || 0,
      percentage: 0,
      color: 'bg-blue-600',
    },
  ].map(item => {
    const total = [
      trends.severityDistribution.critical,
      trends.severityDistribution.high,
      trends.severityDistribution.medium,
      trends.severityDistribution.low,
    ].reduce((a: number, b: number) => a + b, 0);
    return { ...item, percentage: total > 0 ? (item.value / total) * 100 : 0 };
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">🦠 Hantavirus Tracker</h1>
              <p className="text-red-100 text-sm">Real-Time Outbreak Monitoring Dashboard</p>
            </div>
            <div className="text-right text-sm">
              <p className="text-red-50">Last Updated</p>
              <p className="font-mono text-red-100">{currentTime}</p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-800 rounded text-xs transition disabled:opacity-50"
              >
                {refreshing ? '⟳ Refreshing...' : '⟳ Refresh'}
              </button>
            </div>
          </div>
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
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b">
          {(['overview', 'alerts', 'news', 'details'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === tab
                  ? 'text-red-700 border-b-2 border-red-700'
                  : 'text-gray-600 hover:text-red-700'
              }`}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'alerts' && '🚨 Alert Timeline'}
              {tab === 'news' && '📰 News Feed'}
              {tab === 'details' && '📍 Outbreak Details'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <StatisticsPanel stats={statsCards} title="Global Statistics" />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Severity Distribution */}
              <TrendAnalysis
                title="Alerts by Severity"
                subtitle={`Total: ${alerts.length} alerts`}
                data={severityData}
              />

              {/* Alert Type Distribution */}
              <TrendAnalysis
                title="Alerts by Type"
                subtitle={`Distribution of ${alerts.length} total alerts`}
                data={alertTypeData}
              />
            </div>

            {/* Mid-page Ad */}
            {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
              <div className="my-8 bg-white rounded-lg shadow p-4">
                <AdSenseBlock adSlot="2345678901" adFormat="auto" />
              </div>
            )}

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 mt-8">
              <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-b">
                <h2 className="font-bold text-2xl text-gray-900">Global Outbreak Map</h2>
                <p className="text-gray-600 text-sm mt-1">Interactive visualization of active hantavirus outbreaks</p>
              </div>
              <div className="h-96 md:h-[500px]">
                {!loading && <OutbreakMap outbreaks={outbreaks} />}
              </div>
              <div className="p-4 bg-gray-50 border-t text-sm text-gray-600">
                ℹ️ {outbreaks.length} active outbreaks · Click markers for details
              </div>
            </div>

            {/* Top Locations */}
            {trends.topLocations && trends.topLocations.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">🔴 Top Affected Locations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trends.topLocations.map((loc: any, idx: number) => (
                    <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{loc.location}</span>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {loc.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Alert Timeline Tab */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            <h2 className="font-bold text-2xl text-gray-900 mb-4">Real-Time Alert Timeline</h2>
            <AlertTimeline alerts={alerts} maxDisplay={50} />
          </div>
        )}

        {/* News Feed Tab */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-red-50 to-orange-50">
              <h2 className="font-bold text-2xl text-gray-900 mb-2">Latest Hantavirus News</h2>
              <p className="text-gray-600 text-sm">Real-time news from CDC, WHO, Reuters, Bloomberg and international health organizations</p>
            </div>
            <div className="p-6">
              {news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {news.map(article => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:shadow-md transition group"
                    >
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-red-700 line-clamp-3 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{article.summary}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-xs font-medium text-blue-600">{article.source}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(article.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No news articles available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Outbreak Details Tab */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-red-50 to-orange-50">
              <h2 className="font-bold text-2xl text-gray-900">Detailed Outbreak Information</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Cases</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Deaths</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">CFR</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {outbreaks.map((outbreak, idx) => (
                    <tr key={outbreak.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{outbreak.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{outbreak.country}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">{outbreak.cases}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-orange-600">{outbreak.deaths}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {outbreak.cases > 0 ? ((outbreak.deaths / outbreak.cases) * 100).toFixed(1) : '0'}%
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 font-medium">{outbreak.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Between Content Ad */}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
          <div className="my-8 bg-white rounded-lg shadow p-4">
            <AdSenseBlock adSlot="4567890123" adFormat="auto" />
          </div>
        )}

        {/* SEO Content Section */}
        <section className="mt-16 bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Hantavirus Real-Time Tracking</h2>
            <p className="text-gray-700 mb-4">
              Our advanced hantavirus tracker provides real-time monitoring of global hantavirus outbreaks with live data from the CDC, WHO, and international health organizations. Stay informed with instantaneous alerts on hantavirus cases, deaths, and emerging threats.
            </p>
            <p className="text-gray-700">
              Hantavirus pulmonary syndrome (HPS) represents a serious public health concern. This hantavirus dashboard aggregates current outbreak data, alert timelines, and epidemiological trends to help you understand the global hantavirus landscape.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">How Our Real-Time Dashboard Works</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li><strong>Live Alert Aggregation:</strong> Real-time hantavirus alerts categorized by type and severity</li>
              <li><strong>Interactive Maps:</strong> Hantavirus outbreak locations visualized on a global map</li>
              <li><strong>Trend Analysis:</strong> Hantavirus case trends, fatality rates, and geographic spread patterns</li>
              <li><strong>News Integration:</strong> Latest hantavirus news from verified international sources</li>
              <li><strong>Statistical Dashboards:</strong> Comprehensive hantavirus statistics updated every 5 minutes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Dashboard Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg text-red-700 mb-2">🎯 Hantavirus Monitoring</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Real-time case counts</li>
                  <li>Mortality tracking</li>
                  <li>Case fatality rates by region</li>
                  <li>Geographic outbreak spread</li>
                  <li>Trend analysis and forecasting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg text-green-700 mb-2">📊 Data Sources</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>CDC Hantavirus Division</li>
                  <li>WHO Disease Outbreak News</li>
                  <li>ECDC Monitoring</li>
                  <li>International News Agencies</li>
                  <li>ProMED-mail Alerts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h4 className="font-bold text-blue-900 mb-2">🔍 Using the Real-Time Hantavirus Tracker</h4>
            <p className="text-blue-800 text-sm">
              This hantavirus tracker dashboard provides immediate access to the latest hantavirus information. Use the Overview tab for global statistics, the Alert Timeline for categorized alerts, the News Feed for latest hantavirus coverage, and Outbreak Details for comprehensive epidemiological data. The hantavirus map shows active outbreak locations with real-time case counts.
            </p>
          </div>
        </section>

        {/* Bottom Ad */}
        {process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID && (
          <div className="my-8 bg-white rounded-lg shadow p-4">
            <AdSenseBlock adSlot="5678901234" adFormat="horizontal" />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 py-8 border-t text-center text-gray-600 text-sm">
          <p>
            <strong>Hantavirus Tracker Data Sources:</strong> CDC, WHO, ECDC | Last updated: {currentTime}
          </p>
          <p className="mt-2">
            ⚠️ <strong>Medical Disclaimer:</strong> This hantavirus tracker is for informational purposes only. Always consult official health agencies and medical professionals for medical advice and treatment.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Real-time hantavirus monitoring | Global outbreak alerts | Live news aggregation | {metadata.totalAlerts || 0} active alerts
          </p>
        </footer>
      </main>
    </div>
  );
}
