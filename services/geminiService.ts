import { GoogleGenAI } from "@google/genai";

/**
 * SECURE IMPLEMENTATION GUIDE:
 * 
 * 1. API Key Extraction:
 *    The API key is pulled from `process.env.API_KEY`. 
 *    It is NOT hardcoded in this file.
 * 
 * 2. Git Safety:
 *    Ensure a `.env` file exists in your project root with: API_KEY=your_actual_key
 *    Ensure `.env` is listed in your `.gitignore` file so it is never uploaded to GitHub.
 * 
 * 3. Browser Security:
 *    For public web apps, restrict your API Key in Google AI Studio to:
 *    - HTTP Referrers (your website URL)
 *    - Specific APIs (Gemini API)
 */

// Initialize the SDK securely
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Example function showing usage
export const optimizeText = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
    });
    return response.text || "";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "";
  }
};
