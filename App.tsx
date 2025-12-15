import React, { useState, useCallback } from 'react';
import { MarketIndex, AnalysisReport, LoadingState } from './types';
import { INITIAL_INDICES, MODEL_NAME } from './constants';
import IndexCard from './components/IndexCard';
import ReportView from './components/ReportView';
import { fetchMarketAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [indices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [lastUpdated, setLastUpdated] = useState<string>("--:--");

  const handleStartAnalysis = useCallback(async () => {
    setStatus(LoadingState.ANALYZING);
    try {
      const result = await fetchMarketAnalysis();
      setReport(result);
      setStatus(LoadingState.COMPLETED);
      setLastUpdated(new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'}));
    } catch (e) {
      console.error(e);
      setStatus(LoadingState.ERROR);
      // In a real app, show a toast notification
      alert("分析生成失败，请检查网络或 API Key");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0b0e14]/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <div>
                <h1 className="text-lg font-bold text-white tracking-wide">
                    哨兵 <span className="text-blue-500">智能情报</span>
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Market Intelligence System</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                数据状态: 收盘 (Closed)
            </span>
            <div className="h-6 w-px bg-slate-800"></div>
            <button className="text-xs text-slate-400 hover:text-white transition-colors">
                中文 / EN
            </button>
            <button 
                onClick={handleStartAnalysis}
                disabled={status === LoadingState.ANALYZING}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all shadow-lg 
                    ${status === LoadingState.ANALYZING 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-blue-50 hover:scale-105 active:scale-95'
                    }`}
            >
                {status === LoadingState.ANALYZING ? '分析中...' : '开始分析'}
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar - Market Data */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* Tickers Section */}
            <section>
                <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                        市场指数 (Indices)
                    </h2>
                </div>
                <div className="space-y-3">
                    {indices.map(index => (
                        <IndexCard key={index.id} data={index} />
                    ))}
                </div>
            </section>

            {/* System Params Section */}
            <section className="bg-[#131b26] rounded-lg border border-slate-800 p-4">
                <h3 className="text-xs font-bold text-blue-500 mb-4 uppercase tracking-wider">系统参数 (System)</h3>
                <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                        <span className="text-slate-500">模型 (Model)</span>
                        <span className="text-slate-300 font-mono">{MODEL_NAME}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                        <span className="text-slate-500">搜索增强 (Grounding)</span>
                        <span className="text-emerald-400 font-mono">Google Search Enabled</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                        <span className="text-slate-500">数据源 (Data)</span>
                        <span className="text-slate-300 font-mono">Static/Sina</span>
                    </div>
                     <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500">上次更新</span>
                        <span className="text-slate-300 font-mono">{lastUpdated}</span>
                    </div>
                </div>
            </section>

        </div>

        {/* Right Content - Intelligence Report */}
        <div className="lg:col-span-8 xl:col-span-9">
             <div className="flex items-center mb-3 px-1">
                <h2 className="text-sm font-bold text-blue-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    战术分析 (Tactical Analysis)
                </h2>
            </div>

            <div className="bg-[#131b26] rounded-xl border border-slate-800 p-6 min-h-[600px] shadow-2xl shadow-black/50 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                        <circle cx="50" cy="50" r="30" strokeDasharray="2 2" />
                        <line x1="50" y1="10" x2="50" y2="90" />
                        <line x1="10" y1="50" x2="90" y2="50" />
                    </svg>
                </div>
                
                <ReportView report={report} loading={status === LoadingState.ANALYZING} />
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;