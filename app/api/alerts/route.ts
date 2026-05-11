import { NextResponse, NextRequest } from 'next/server';
import { fetchNewsData, searchNews } from '@/lib/scraper';
import { categorizeAlert, sortAlerts, filterAlertsByType, getRecentAlerts } from '@/lib/alert-aggregator';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/alerts
 *
 * Get categorized alerts with optional filtering
 * Query parameters:
 *   - hours: number of hours to look back (default: 24)
 *   - type: filter by alert type (UPDATE, WHO, ALERT, LAB, CASE, PROMED)
 *   - severity: filter by severity (critical, high, medium, low)
 */
export async function GET(request: NextRequest) {
  try {
    const hoursParam = request.nextUrl.searchParams.get('hours') || '24';
    const typeParam = request.nextUrl.searchParams.get('type');
    const severityParam = request.nextUrl.searchParams.get('severity');

    const hours = Math.min(parseInt(hoursParam), 168); // Max 7 days

    // Fetch news and convert to alerts
    const newsArticles = await fetchNewsData();
    let alerts = newsArticles.map(article => categorizeAlert(article));

    // Filter by time
    alerts = getRecentAlerts(alerts, hours);

    // Filter by type if specified
    if (typeParam) {
      alerts = filterAlertsByType(alerts, typeParam as any);
    }

    // Filter by severity if specified
    if (severityParam) {
      alerts = alerts.filter(a => a.severity === severityParam);
    }

    // Sort by severity and recency
    alerts = sortAlerts(alerts);

    // Get summary stats
    const stats = {
      total: alerts.length,
      critical: alerts.filter(a => a.severity === 'critical').length,
      high: alerts.filter(a => a.severity === 'high').length,
      medium: alerts.filter(a => a.severity === 'medium').length,
      low: alerts.filter(a => a.severity === 'low').length,
      byType: {
        UPDATE: alerts.filter(a => a.type === 'UPDATE').length,
        WHO: alerts.filter(a => a.type === 'WHO').length,
        ALERT: alerts.filter(a => a.type === 'ALERT').length,
        LAB: alerts.filter(a => a.type === 'LAB').length,
        CASE: alerts.filter(a => a.type === 'CASE').length,
        PROMED: alerts.filter(a => a.type === 'PROMED').length,
      },
    };

    const response: ApiResponse<any> = {
      success: true,
      data: {
        alerts: alerts.slice(0, 100), // Return top 100 alerts
        stats,
        count: alerts.length,
        timeRange: `${hours} hours`,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching alerts',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 300; // Revalidate every 5 minutes
