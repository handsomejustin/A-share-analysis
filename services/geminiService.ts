import { GoogleGenAI } from "@google/genai";
import { AnalysisReport } from "../types";

export const fetchMarketAnalysis = async (): Promise<AnalysisReport> => {
  // NOTE: In a real production app, never expose keys in client code. 
  // This is for demonstration using the injected process.env.API_KEY.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    你是一个名为“哨兵”的高级金融市场情报分析师。
    请利用Google Search搜索最新的中国A股市场信息，重点关注：上证指数、沪深300、创业板指、科创50。
    
    请生成一份专业的“情报简报”，包含以下章节（请严格使用Markdown格式）：

    ### 1) 市场快照 (高层次)
    - 整体A股市场基调（防御性/进攻性/震荡）
    - 核心驱动因素简述

    ### 2) 核心指数状态
    - 分析上证指数、沪深300、创业板指、科创50的当前走势。
    - 标注关键支撑位和阻力位。
    - 给出短期偏向（看多/看空/中性）。

    ### 3) 宏观与政策影响
    - 列出关键的宏观经济数据或政策新闻（如央行动态、财政政策、行业监管）。
    - 解释这些因素对A股的具体影响。

    ### 4) 机会与风险评估
    - **环境**: 当前交易环境描述。
    - **策略**: 建议的战术（如：逢低吸纳、减仓观望、板块轮动）。
    - **风险等级**: 低/中/高。

    ### 5) 警示与未知
    - 未来一周可能引发波动的事件。
    - 市场可能忽视的潜在黑天鹅。

    ### 6) 总结
    - 一段简短的总结陈词，给投资者的最终建议。

    要求：语言专业简练，风格冷静客观，类似Bloomberg终端报告。请包含具体数据支持。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Keeping output focused but allowing for some creativity in analysis
        temperature: 0.3, 
      }
    });

    const text = response.text || "无法生成报告，请重试。";
    
    // Extract grounding chunks for sources if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));

    // Deduplicate sources
    const uniqueSources = Array.from(new Map(sources.map((s:any) => [s.uri, s])).values()) as {title: string, uri: string}[];

    return {
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      content: text,
      sources: uniqueSources
    };

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};