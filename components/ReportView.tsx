import React from 'react';
import { AnalysisReport } from '../types';

interface ReportViewProps {
  report: AnalysisReport | null;
  loading: boolean;
}

const ReportView: React.FC<ReportViewProps> = ({ report, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="font-mono text-sm animate-pulse">正在连接 Google Search 检索 A 股情报...</div>
        <div className="text-xs text-slate-600">Gathering Intelligence • Analyzing Trends • Generating Report</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>点击“开始分析”以获取最新市场情报</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Report</h2>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20">
            生成时间: {report.timestamp}
          </span>
        </div>
      </div>

      {/* Report Content */}
      <div className="prose prose-invert prose-sm max-w-none text-slate-300">
        {/* We use whitespace-pre-wrap to respect newlines from Gemini, and some custom styling for headers */}
        <div className="space-y-4 font-light leading-relaxed whitespace-pre-wrap">
            {report.content}
        </div>
      </div>

      {/* Sources Footnote */}
      {report.sources && report.sources.length > 0 && (
        <div className="mt-8 pt-4 border-t border-slate-800/50">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">情报来源 (Sources)</h4>
          <ul className="space-y-1">
            {report.sources.map((source, idx) => (
              <li key={idx}>
                <a 
                  href={source.uri} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs text-blue-500/70 hover:text-blue-400 hover:underline truncate block transition-colors"
                >
                  [{idx + 1}] {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportView;