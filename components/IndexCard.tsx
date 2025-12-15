import React from 'react';
import { MarketIndex } from '../types';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface IndexCardProps {
  data: MarketIndex;
}

const IndexCard: React.FC<IndexCardProps> = ({ data }) => {
  const isPositive = data.change >= 0;
  const color = isPositive ? '#10b981' : '#ef4444'; // Tailwind emerald-500 : red-500
  const bgClass = 'bg-[#131b26]'; // Dark card background

  // Prepare data for recharts
  const chartData = data.history.map((val, idx) => ({ i: idx, val }));

  return (
    <div className={`${bgClass} rounded-lg border border-slate-800 p-4 mb-3 hover:border-slate-600 transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xs text-slate-400 font-bold tracking-wider uppercase">{data.name}</h3>
          <span className="text-xs text-slate-500">{data.code}</span>
        </div>
        <div className={`text-xs px-2 py-1 rounded ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-xl font-mono text-white font-medium">
            {data.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            24H 高 {Math.max(...data.history).toFixed(0)} <span className="mx-1">|</span> 低 {Math.min(...data.history).toFixed(0)}
          </div>
        </div>
        
        {/* Mini Chart */}
        <div className="h-12 w-24 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <YAxis domain={['dataMin', 'dataMax']} hide={true} />
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndexCard;