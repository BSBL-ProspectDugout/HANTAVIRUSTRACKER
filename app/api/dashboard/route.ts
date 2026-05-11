import { NextResponse } from 'next/server';
import { fetchOutbreakData, fetchNewsData, calculateOutbreakStats } from '@/lib/scraper';
import { categorizeAlert, sortAlerts, getRecentAlerts } from '@/lib/alert-aggregator';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/dashboard
 *
 * Comprehensive endpoint returning all data needed for real-time dashboard
 * Includes: outbreaks, news, alerts, statistics, and trends
 */
export async function GET() {
  try {
    // Fetch all data in parallel
    const [outbreaks, news] = await Promise.all([
      fetchOutbreakData(),
      fetchNewsData(),
    ]);

    // Convert news to alerts
    const alerts = news.map(article => categorizeAlert(article));
    const sortedAlerts = sortAlerts(alerts);
    const recentAlerts = getRecentAlerts(sortedAlerts, 24); // Last 24 hours

    // Calculate statistics
    const stats = calculateOutbreakStats(outbreaks);

    // Calculate trends
    const last7Days = getRecentAlerts(sortedAlerts, 168);
    const trend = {
      alertsLast24h: recentAlerts.length,
      alertsLast7d: last7Days.length,
      criticalAlerts: sortedAlerts.filter(a => a.severity === 'critical').length,
      casesTotal: stats.totalCases,
      deathsTotal: stats.totalDeaths,
      caseFatalityRate: stats.totalCases > 0 ? (stats.totalDeaths / stats.totalCases * 100).toFixed(1) : '0',
    };

    // Get top locations from alerts
    const locationMap = new Map<string, number>();
    sortedAlerts.forEach(alert => {
      if (alert.relatedLocation) {
        locationMap.set(alert.relatedLocation, (locationMap.get(alert.relatedLocation) || 0) + 1);
      }
    });
    const topLocations = Array.from(locationMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([location, count]) => ({ location, count }));

    // Get alert type distribution
    const alertTypeDistribution = {
      UPDATE: sortedAlerts.filter(a => a.type === 'UPDATE').length,
      WHO: sortedAlerts.filter(a => a.type === 'WHO').length,
      ALERT: sortedAlerts.filter(a => a.type === 'ALERT').length,
      LAB: sortedAlerts.filter(a => a.type === 'LAB').length,
      CASE: sortedAlerts.filter(a => a.type === 'CASE').length,
      PROMED: sortedAlerts.filter(a => a.type === 'PROMED').length,
    };

    // Get severity distribution
    const severityDistribution = {
      critical: sortedAlerts.filter(a => a.severity === 'critical').length,
      high: sortedAlerts.filter(a => a.severity === 'high').length,
      medium: sortedAlerts.filter(a => a.severity === 'medium').length,
      low: sortedAlerts.filter(a => a.severity === 'low').length,
    };

    const response: ApiResponse<any> = {
      success: true,
      data: {
        // Core data
        outbreaks,
        news: news.slice(0, 20),
        alerts: recentAlerts.slice(0, 50),

        // Statistics
        statistics: {
          ...stats,
          ...trend,
        },

        // Trends and analysis
        trends: {
          alertsLast24h: recentAlerts.length,
          alertsLast7d: last7Days.length,
          topLocations,
          alertTypeDistribution,
          severityDistribution,
        },

        // Dashboard metadata
        metadata: {
          totalAlerts: sortedAlerts.length,
          totalOutbreaks: outbreaks.length,
          totalNewsArticles: news.length,
          lastUpdated: new Date().toISOString(),
          refreshInterval: '5 minutes',
        },
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching dashboard data',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 300; // Revalidate every 5 minutes
