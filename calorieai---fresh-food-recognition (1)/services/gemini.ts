
import { GoogleGenAI, Type } from "@google/genai";
import { FoodAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const analyzeFoodImage = async (base64Image: string): Promise<FoodAnalysis> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = "请专业地分析这张食物图片。识别菜名，估计总热量，提供以克为单位的宏量营养素（蛋白质、碳水化合物、脂肪），并列出检测到的主要成分。确定它最可能是早餐、午餐、晚餐还是零食。请务必使用中文返回所有文本信息。";

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dishName: { type: Type.STRING },
          totalCalories: { type: Type.NUMBER },
          accuracy: { type: Type.NUMBER },
          nutrients: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fat: { type: Type.NUMBER }
            },
            required: ["protein", "carbs", "fat"]
          },
          ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          mealType: { type: Type.STRING }
        },
        required: ["dishName", "totalCalories", "nutrients", "ingredients", "accuracy", "mealType"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return {
    ...result,
    timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  };
};
