import { NewsArticle } from './types';

export interface Alert {
  id: string;
  type: 'UPDATE' | 'WHO' | 'ALERT' | 'LAB' | 'CASE' | 'PROMED';
  title: string;
  description: string;
  source: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  relatedLocation?: string;
  tags: string[];
}

/**
 * Categorize news articles into alert types
 */
export function categorizeAlert(article: NewsArticle): Alert {
  const title = article.title.toLowerCase();
  const summary = (article.summary || '').toLowerCase();
  const source = article.source.toLowerCase();
  const combined = `${title} ${summary}`;

  // Determine alert type
  let type: Alert['type'] = 'UPDATE';
  let severity: Alert['severity'] = 'medium';
  const tags: string[] = [];

  // WHO alerts
  if (source.includes('who') || title.includes('world health organization')) {
    type = 'WHO';
    severity = 'high';
    tags.push('official');
  }

  // ProMED alerts
  if (source.includes('promed') || title.includes('promed')) {
    type = 'PROMED';
    severity = 'high';
    tags.push('expert');
  }

  // Laboratory/Lab test results
  if (combined.includes('lab') || combined.includes('laboratory') || combined.includes('test')) {
    type = 'LAB';
    severity = 'high';
    tags.push('research');
  }

  // Case confirmations
  if (
    combined.includes('case') ||
    combined.includes('confirmed') ||
    combined.includes('patient') ||
    combined.includes('diagnosed')
  ) {
    type = 'CASE';
    severity = 'critical';
    tags.push('confirmed');
  }

  // Critical alerts
  if (
    combined.includes('outbreak') ||
    combined.includes('epidemic') ||
    combined.includes('surge') ||
    combined.includes('increase') ||
    combined.includes('critical') ||
    combined.includes('emergency')
  ) {
    type = 'ALERT';
    severity = 'critical';
    tags.push('urgent');
  }

  // Deaths or fatalities
  if (combined.includes('death') || combined.includes('fatal') || combined.includes('died')) {
    severity = 'critical';
    tags.push('fatal');
  }

  // Extract location mentions
  const locations = extractLocations(combined);
  const relatedLocation = locations[0];

  // Extract region
  const region = extractRegion(combined);
  if (region) tags.push(region);

  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    title: article.title,
    description: article.summary || article.title,
    source: article.source,
    timestamp: article.publishedDate,
    severity,
    relatedLocation,
    tags,
  };
}

/**
 * Extract location mentions from text
 */
function extractLocations(text: string): string[] {
  const locations = [
    'argentina',
    'chile',
    'usa',
    'united states',
    'south africa',
    'cape verde',
    'cabo verde',
    'nevada',
    'new mexico',
    'colorado',
    'utah',
    'netherlands',
    'germany',
    'switzerland',
    'united kingdom',
    'cruise ship',
    'hondius',
    'tenerife',
    'ushuaia',
    'buenos aires',
  ];

  return locations.filter(loc => text.includes(loc));
}

/**
 * Extract region from text
 */
function extractRegion(text: string): string | null {
  if (text.includes('south america') || text.includes('argentina') || text.includes('chile')) {
    return 'South America';
  }
  if (text.includes('north america') || text.includes('usa') || text.includes('united states')) {
    return 'North America';
  }
  if (text.includes('europe') || text.includes('netherlands') || text.includes('germany')) {
    return 'Europe';
  }
  if (text.includes('africa') || text.includes('south africa')) {
    return 'Africa';
  }
  if (text.includes('atlantic') || text.includes('ocean') || text.includes('cruise')) {
    return 'International';
  }
  return null;
}

/**
 * Sort alerts by severity and recency
 */
export function sortAlerts(alerts: Alert[]): Alert[] {
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return [...alerts].sort((a, b) => {
    // First by severity
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    // Then by timestamp
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}

/**
 * Filter alerts by type
 */
export function filterAlertsByType(alerts: Alert[], type: Alert['type']): Alert[] {
  return alerts.filter(a => a.type === type);
}

/**
 * Filter alerts by severity
 */
export function filterAlertsBySeverity(alerts: Alert[], severity: Alert['severity']): Alert[] {
  return alerts.filter(a => a.severity === severity);
}

/**
 * Filter alerts by location
 */
export function filterAlertsByLocation(alerts: Alert[], location: string): Alert[] {
  return alerts.filter(a => a.relatedLocation?.toLowerCase().includes(location.toLowerCase()));
}

/**
 * Get alerts from past N hours
 */
export function getRecentAlerts(alerts: Alert[], hours: number): Alert[] {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  return alerts.filter(a => new Date(a.timestamp) > cutoff);
}
