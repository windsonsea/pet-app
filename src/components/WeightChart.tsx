'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeightChartProps {
  records: { date: string; value: number }[];
}

export default function WeightChart({ records }: WeightChartProps) {
  if (records.length < 2) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
        <h2 className="font-bold text-lg text-stone-800 mb-4">📈 体重变化趋势</h2>
        <p className="text-stone-400 text-sm">数据不足，至少需要 2 条体重记录才能生成趋势图</p>
      </div>
    );
  }

  const data = [...records].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
      <h2 className="font-bold text-lg text-stone-800 mb-4">📈 体重变化趋势</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e6df" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#c4b5a5" />
            <YAxis tick={{ fontSize: 12 }} stroke="#c4b5a5" />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #f0e6df',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 5, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, fill: '#ea580c', stroke: '#fff', strokeWidth: 2 }}
              name="体重"
              unit=" kg"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
