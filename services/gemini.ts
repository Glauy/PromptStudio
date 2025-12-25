
import { GoogleGenAI, Type } from "@google/genai";
import { StructuredPrompt } from "../types";

/**
 * 审美护栏：强制注入专业摄影与中式美学逻辑
 */
const AESTHETIC_GUARD = `Eastern aesthetic, high-end Chinese style, refined Chinese features (approx. 25 years old), porcelain skin, no Western/Japanese elements, 8k professional photography, Hasselblad/ARRI look.`;

// Note: API_KEY must be obtained exclusively from process.env.API_KEY
export async function optimizePromptStructured(rawPrompt: string): Promise<Partial<StructuredPrompt>> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个专业的 AI 视觉艺术专家，深谙东方美学与高端摄影。请将以下提示词片段，优化为更具意境、专业摄影感的结构化配置。
      
      原始输入: ${rawPrompt}
      
      要求：
      1. 严格按照 JSON 格式返回。
      2. 提升 subject 的描述深度，确保人物形象气质符合 25 岁左右的精致东方人。
      3. 排除任何欧美或日本风格元素。
      4. 补充 lighting 和 cameraSettings 字段以增强中大画幅摄影质感。
      5. 保持英文描述。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            environment: { type: Type.STRING },
            composition: { type: Type.STRING },
            camera: { type: Type.STRING },
            cameraSettings: { type: Type.STRING },
            lighting: { type: Type.STRING },
            color: { type: Type.STRING },
            mood: { type: Type.STRING },
            style: { type: Type.STRING },
            medium: { type: Type.STRING },
            quality: { type: Type.STRING },
            genre: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return {};
    return JSON.parse(text) as Partial<StructuredPrompt>;
  } catch (error) {
    console.error("Gemini optimization error:", error);
    return {};
  }
}

/**
 * 生成视觉图像
 * @param prompt 完整的提示词字符串
 * @param isSimulated 是否模拟生成
 */
export async function generateVisual(prompt: string, isSimulated: boolean = true): Promise<string> {
  // 在渲染层级强制追加审美护栏
  const refinedPrompt = `${AESTHETIC_GUARD}, ${prompt}`;

  if (isSimulated) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Professional fine art photography: ${refinedPrompt}. High resolution, masterpiece texture.` },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
}
