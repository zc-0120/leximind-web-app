import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCMZ6m0Zn8pB2Ez_CT_Vk_z4t3nezKG_mU");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
  generationConfig: { responseMimeType: "application/json" },
  tools: [
    {
      codeExecution: {},
    },
  ],
});

/**
 * API route for generating content using Gemini AI model.
 */
export async function GET(req: Request): Promise<Response> {
  /**
   * Get the prompt from the request body.
   */
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("q");

  /**
   * Use the Gemini AI model to generate content from the prompt.
   */
  const result = await model.generateContent(
    `使用繁體中文回答以下句子的文法、翻譯、單字重點：${decodeURIComponent(text || "")}，Please provide a response in a structured JSON format that matches the following model: {文法重點:'', 單字重點:'', 翻譯:''}。`,
  );

  /**
   * Return the generated content as a JSON response.
   */
  return new Response(
    JSON.stringify({
      summary: result.response.text(),
    }),
  );
}
