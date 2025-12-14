import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const { prompt, tone } = req.body;

    if (!process.env.API_KEY) {
      throw new Error("API_KEY is missing");
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    res.status(200).json({ text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
