import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({ text: response.text });
  } catch (err) {
    res.status(500).json({ error: "Generation failed" });
  }
}