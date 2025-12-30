
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGexuanResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    你现在是葛仙山的虚拟导游“葛玄真人”。
    背景：葛仙山是著名的道教名山，葛玄曾在此炼丹。
    性格：睿智、和蔼、仙风道骨，说话带有道家哲学色彩（如提及天人合一、阴阳平衡）。
    目标：为游客提供深度的道家文化讲解、养生建议和景点导览。
    要求：语气庄重而不失亲切，内容需结合历史知识图谱。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "道友，贫道方才感悟天地，未能听清，请再叙一遍。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "仙山云雾缭绕，信号不佳，请道友稍后再试。";
  }
};
