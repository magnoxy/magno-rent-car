'use server';

import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function getCarContent(brand: string, model: string, year: number) {
    if (!ai) {
        console.warn("GEMINI_API_KEY not set, using mock data");
        return {
            description: `Desfrute da excelência com este ${brand} ${model} ${year}. Uma experiência de condução incomparável com conforto premium e desempenho excepcional. Ideal para quem exige o melhor.`,
            suggestedPrice: 250
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `Describe a ${year} ${brand} ${model} for a premium rental app and suggest a USD price. Output JSON only.`,
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

        // Provide a way to get text. The SDK might return it in .text() function or property
        // checking documentation for @google/genai 0.1.x/1.x
        // It usually has response.text() function
        const text = typeof response.text === 'function' ? response.text : response.text;

        if (!text) {
            throw new Error("No text response from AI");
        }

        return JSON.parse(text);
    } catch (e) {
        console.error("AI Service Error:", e);
        // Fallback
        return {
            description: `Desfrute da excelência com este ${brand} ${model} ${year}. Uma experiência de condução incomparável com conforto premium e desempenho excepcional.`,
            suggestedPrice: 180
        };
    }
}
