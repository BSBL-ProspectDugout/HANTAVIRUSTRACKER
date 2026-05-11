'use client';

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  change?: string;
  changeType?: 'up' | 'down' | 'stable';
}

interface StatisticsPanelProps {
  stats: Stat[];
  title?: string;
}

export default function StatisticsPanel({ stats, title = 'Key Metrics' }: StatisticsPanelProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow p-6 border-l-4 ${stat.color}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <span className={`text-xs font-semibold ${
                      stat.changeType === 'up' ? 'text-red-600' :
                      stat.changeType === 'down' ? 'text-green-600' :
                      'text-gray-600'
                    }`}>
                      {stat.changeType === 'up' ? '📈' : stat.changeType === 'down' ? '📉' : '➡️'} {stat.change}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-3xl opacity-25">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
