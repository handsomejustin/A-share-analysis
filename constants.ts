import { MarketIndex } from "./types";

// Helper to generate fake history data for sparklines
const generateHistory = (base: number) => {
  return Array.from({ length: 40 }, () => base + (Math.random() - 0.5) * (base * 0.02));
};

export const INITIAL_INDICES: MarketIndex[] = [
  {
    id: 'shanghai',
    name: '上证指数',
    code: '000001.SH',
    currentPrice: 3867.92,
    change: -21.39,
    changePercent: -0.55,
    history: generateHistory(3867.92)
  },
  {
    id: 'csi300',
    name: '沪深300',
    code: '000300.SH',
    currentPrice: 4552.06,
    change: -28.86,
    changePercent: -0.63,
    history: generateHistory(4552.06)
  },
  {
    id: 'chinext',
    name: '创业板指',
    code: '399006.SZ',
    currentPrice: 3137.80,
    change: -56.54,
    changePercent: -1.77,
    history: generateHistory(3137.80)
  },
  {
    id: 'star50',
    name: '科创50',
    code: '000688.SH',
    currentPrice: 3334.31,
    change: -63.19,
    changePercent: -1.86,
    history: generateHistory(3334.31)
  }
];

export const MODEL_NAME = "Gemini 2.5 Flash";