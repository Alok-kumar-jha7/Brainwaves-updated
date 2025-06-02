// config/geminiAiConfig.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export const generateTopics = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        stopSequences: ["\n"],
        responseMimeType: "application/json",
      },
    });

const result = await model.generateContent(prompt);
    
    const response = await result.response;
    return {
      text: response.text({ format: 'text' }),
    };
  } catch (error) {
    console.error('Error generating topics:', error);
    throw error;
  }
};
export const generateCourse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        stopSequences: ["\n"],
        responseMimeType: "application/json",
      },
    });

const result = await model.generateContent(prompt);
    
    const response = await result.response;
    return {
      text: response.text({ format: 'text' }),
    };
  } catch (error) {
    console.error('Error generating topics:', error);
    throw error;
  }
};