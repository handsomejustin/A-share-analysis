export interface MarketIndex {
  id: string;
  name: string;
  code: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  history: number[]; // For sparkline
}

export interface AnalysisReport {
  timestamp: string;
  content: string; // Markdown content
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}