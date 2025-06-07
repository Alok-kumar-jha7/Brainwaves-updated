import { GoogleGenerativeAI } from '@google/generative-ai';
// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node



 

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export const generateTopics = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
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
      text: response.text(),
    };
  } catch (error) {
    console.error('Error generating topics:', error);
    throw error;
  }
};
export const generateCourses = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
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
      text: response.text(),
    };
  } catch (error) {
    console.error('Error generating Courses:', error);
    throw error;
  }
};