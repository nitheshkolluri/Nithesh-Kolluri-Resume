import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const optimizeText = async (text: string, type: 'summary' | 'bullet'): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure standard environment variables.";
  
  const prompt = type === 'summary' 
    ? `Rewrite the following professional summary to be more impactful, ATS-friendly, and concise (max 3-4 sentences). Focus on achievements and hard skills. Text: "${text}"`
    : `Rewrite the following resume bullet point to be action-oriented, result-driven, and ATS-friendly. Start with a strong action verb. Text: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini optimization failed:", error);
    return text;
  }
};

export const bridgeGapWithProjects = async (projects: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  const prompt = `
    I have a gap in my professional employment since June 2024, but I have been working on these personal projects: 
    "${projects}"
    
    Please generate a single "Professional Experience" entry titled "Independent Software Consultant" or "Freelance Full Stack Engineer".
    Format it with 3-4 strong bullet points that describe these projects as professional consulting work or serious product development. 
    Return ONLY the bullet points, separated by newlines.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || "Could not generate content.";
  } catch (error) {
    console.error("Gemini gap bridging failed:", error);
    return "Error generating gap bridge.";
  }
};