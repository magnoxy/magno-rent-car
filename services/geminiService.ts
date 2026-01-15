
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCarDescription = async (brand: string, model: string, year: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a compelling rental description for a ${year} ${brand} ${model}. Focus on comfort, performance, and style. Keep it under 100 words.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini description error:", error);
    return "Experience the road in style with this premium vehicle.";
  }
};

export const getPriceEstimation = async (brand: string, model: string, year: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `What is a competitive daily rental price in USD for a ${year} ${brand} ${model}? Return only the numeric value.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedPrice: { type: Type.NUMBER }
          },
          required: ["estimatedPrice"]
        }
      }
    });
    const data = JSON.parse(response.text);
    return data.estimatedPrice;
  } catch (error) {
    return 150;
  }
};
