'use client';

import { Alert } from '@/lib/alert-aggregator';

interface AlertTimelineProps {
  alerts: Alert[];
  maxDisplay?: number;
}

const alertTypeColors = {
  UPDATE: 'bg-blue-50 border-blue-200 text-blue-900',
  WHO: 'bg-purple-50 border-purple-200 text-purple-900',
  ALERT: 'bg-red-50 border-red-200 text-red-900',
  LAB: 'bg-green-50 border-green-200 text-green-900',
  CASE: 'bg-orange-50 border-orange-200 text-orange-900',
  PROMED: 'bg-yellow-50 border-yellow-200 text-yellow-900',
};

const severityBadges = {
  critical: 'bg-red-600 text-white',
  high: 'bg-orange-600 text-white',
  medium: 'bg-yellow-600 text-white',
  low: 'bg-blue-600 text-white',
};

export default function AlertTimeline({ alerts, maxDisplay = 20 }: AlertTimelineProps) {
  const displayAlerts = alerts.slice(0, maxDisplay);

  return (
    <div className="space-y-4">
      {displayAlerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No alerts in this time period</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`border-l-4 p-4 rounded ${alertTypeColors[alert.type]} relative`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-full h-full flex items-start">
                <div className="absolute -left-3 mt-2 w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>

              <div className="flex justify-between items-start gap-3 ml-2">
                <div className="flex-1">
                  {/* Alert type and severity badges */}
                  <div className="flex gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-white bg-opacity-70 rounded">
                      {alert.type}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${severityBadges[alert.severity]}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">{alert.title}</h4>

                  {/* Description */}
                  <p className="text-sm opacity-90 mb-2 line-clamp-2">{alert.description}</p>

                  {/* Tags and metadata */}
                  <div className="flex flex-wrap gap-2 items-center text-xs opacity-75">
                    <span className="font-medium">{alert.source}</span>
                    {alert.relatedLocation && (
                      <>
                        <span className="text-opacity-50">•</span>
                        <span className="bg-white bg-opacity-40 px-2 py-0.5 rounded">
                          📍 {alert.relatedLocation}
                        </span>
                      </>
                    )}
                    <span className="text-opacity-50">•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>

                  {/* Tags */}
                  {alert.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {alert.tags.map(tag => (
                        <span key={tag} className="inline-block px-2 py-0.5 text-xs bg-white bg-opacity-40 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {alerts.length > maxDisplay && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-600">
            Showing {maxDisplay} of {alerts.length} alerts
          </p>
        </div>
      )}
    </div>
  );
}
