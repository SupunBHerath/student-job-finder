
import { GoogleGenAI } from "@google/genai";
import { AspectRatio, CvData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will not throw in production as the key is expected to be set.
  // It's a safeguard for local development.
  console.warn("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: aspectRatio,
    },
  });

  const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
};


export const generateCv = async (cvData: CvData): Promise<string> => {
  const prompt = `
Generate a professional CV/resume based on the following information. The output should be in clean, well-formatted plain text, suitable for copying and pasting into a document. Do not use Markdown.

**Personal Details:**
- Full Name: ${cvData.fullName}
- Email: ${cvData.email}
- Phone: ${cvData.phone}
- LinkedIn: ${cvData.linkedIn}

**Professional Summary:**
${cvData.summary}

**Work Experience:**
${cvData.workExperience.map(exp => `
- **${exp.role}** at **${exp.company}** (${exp.startDate} to ${exp.endDate || 'Present'})
  ${exp.description.split('\n').map(line => `  ${line}`).join('\n')}
`).join('')}

**Education:**
${cvData.education.map(edu => `
- **${edu.degree}**, ${edu.institution} (${edu.startDate} to ${edu.endDate || 'Present'})
`).join('')}

**Skills:**
${cvData.skills}

Please format the CV cleanly with clear headings and bullet points for experience and education. Ensure a professional tone.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
};
