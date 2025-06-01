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
    responseMimeType: 'application/json',
    temprature: 1,
    maxOutputTokens: 8195,
    topP: 0.95,
    topK: 40,
    stopSequences: ['\n'],
  };
  const model = 'gemini-2.5-flash-preview-04-17';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Learn Python : :As your are coaching teacher
    - User want to learn about the topic
    - Generate 5-7 Course title for study (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,

the code should be in javascript language`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Formulating Course Titles**

I'm currently working on crafting a list of Python course titles, aiming for 5-7 options that are concise and appealing. The goal is to provide a solid foundation for the user's Python learning journey, and I'm focusing on the brevity and clarity of the titles. I'll soon provide a JSON array with the finalized course titles.


**Constructing Python Course Titles**

I've revised the plan to align with the core request, which is providing a JSON array of Python course titles. I'm focusing on crafting 5-7 short, relevant titles, ignoring the conflicting JavaScript language mention. The JSON output will be pure, without extra text.


`,
        },
        {
          text: `\`\`\`json
[
  "Python Basics Bootcamp",
  "Core Python Concepts",
  "Python Data Structures",
  "Functions & Modules in Python",
  "Object-Oriented Python",
  "Python File Handling",
  "Introduction to Python"
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

   export const rest = ai.models.generateContentStream({
    model,
    config,
    contents,
  });

