
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const AIService = {
  async getCarContent(brand: string, model: string, year: number) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Describe a ${year} ${brand} ${model} for a premium rental app and suggest a USD price.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              suggestedPrice: { type: Type.NUMBER }
            },
            required: ["description", "suggestedPrice"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (e) {
      return { description: "Premium driving experience.", suggestedPrice: 150 };
    }
  }
};
