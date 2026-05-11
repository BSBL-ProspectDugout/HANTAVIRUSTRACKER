'use client';

interface TrendData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface TrendAnalysisProps {
  title: string;
  data: TrendData[];
  subtitle?: string;
}

export default function TrendAnalysis({ title, data, subtitle }: TrendAnalysisProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-sm font-bold text-gray-900">
                {item.value} ({item.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${item.color}`}
                style={{ width: `${(item.value / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Dominant</p>
          <p className="text-lg font-bold text-gray-900">
            {data.reduce((prev, current) => (prev.value > current.value) ? prev : current).name}
          </p>
        </div>
      </div>
    </div>
  );
}
