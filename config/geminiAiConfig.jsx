// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';


  const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'application/json',
  };
  export const model = 'gemini-2.5-flash-preview-04-17';
  const generateTopicsAiModel = [
    {
      role: 'user',
      parts: [
        {
          text: `Learn Python : :As your are coaching teacher
    - User want to learn about the topic
    - Generate 5-7 Course title for study (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  "Python Basics",
  "Data Types in Python",
  "Control Flow",
  "Functions & Modules",
  "Object-Oriented Python",
  "File Handling",
  "Error Handling"
]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    generateTopicsAiModel,
  });
    export const generateTopics = {
        sendMessage: async (userInput) => {
        const updatedModel = generateTopicsAiModel.map((part) => {
            if (part.role === 'user') {
            return {
                ...part,
                parts: part.parts.map((p) => ({
                ...p,
                text: p.text.replace('INSERT_INPUT_HERE', userInput),
                })),
            };
            }
            return part;
        });
    
        const aiResponse = await ai.models.generateContentStream({
            model,
            config,
            messages: updatedModel,
        });
    
        return aiResponse;
        },
    };


