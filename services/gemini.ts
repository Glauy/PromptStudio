
import { GoogleGenAI, Type } from "@google/genai";
import { StructuredPrompt, PhotographySession, PhotographyShot } from "../types";

const AESTHETIC_GUARD = `
  Masterful Eastern aesthetic, high-end Chinese visual language. 
  Focus on "Gu Xiang" (refined bone structure), porcelain skin textures with natural micro-details. 
  Avoid Western features, anime styles, or generic AI looks. 
  Lighting should be cinematic but subtle, inspired by ink-wash paintings or Hasselblad medium format photography. 
  Masterpiece, 8k, professional color grading, ultra-fine textures.
`;

/**
 * 核心：三层协议编译器
 * 将结构化的 DSL 编译为具备物理逻辑的描述性 Prompt
 */
export function compilePhotographyPrompt(session: PhotographySession, shot: PhotographyShot): string {
  // 第一层：硬件协议 (光学与色彩)
  const layer1 = `[HARDWARE_PROTOCOL] 
    Body: ${session.system.cameraBody}, 
    Lens: ${session.system.lens}, 
    Lighting: ${session.system.lightingRig}, 
    Color: ${session.system.colorScience}`;

  // 第二层：主体协议 (人物与DNA)
  const layer2 = `[SUBJECT_PROTOCOL] 
    DNA: ${session.persona.features}, 
    Outfit: ${session.persona.outfit}, 
    Aura: ${session.persona.temperament}`;

  // 第三层：分镜协议 (构图与叙事)
  const layer3 = `[SHOT_PROTOCOL] 
    Composition: ${shot.composition}, 
    Pose: ${shot.pose}, 
    Narrative: ${shot.narrative}`;

  // 最终编译拼接
  return `
    Professional Photography Session: 
    ${layer1}. 
    ${layer2}. 
    ${layer3}. 
    ${AESTHETIC_GUARD}
  `.replace(/\s+/g, ' ').trim();
}

export async function optimizePromptStructured(rawPrompt: string): Promise<Partial<StructuredPrompt>> {
  try {
    // Fix: Create a fresh instance right before generating content
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个顶级的 AI 视觉策展人，专精于东方美学与商业摄影。请将以下提示词，优化为具有深度、专业影像感的结构化 DSL。
      
      原始输入: ${rawPrompt}
      
      优化准则：
      1. 严格以 JSON 格式返回。
      2. subject: 深入刻画主体的神韵与质感，确保人物形象气质符合东方面孔。
      3. 保持英文描述。`,
      config: {
        responseMimeType: "application/json"
      }
    });

    // Fix: Correct property access for text
    const text = response.text;
    if (!text) return {};
    return JSON.parse(text) as Partial<StructuredPrompt>;
  } catch (error) {
    console.error("Gemini optimization error:", error);
    return {};
  }
}

export async function generateVisual(prompt: string, isSimulated: boolean = true): Promise<string> {
  if (isSimulated) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
  }

  try {
    // Fix: Always create a new GoogleGenAI instance right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: { 
        imageConfig: { 
          aspectRatio: "3:4",
          imageSize: "1K"
        } 
      },
    });

    // Fix: Safely iterate through candidates and parts to find the image part
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error: any) {
    console.error("Image gen error:", error);
    // Fix: Handle API key selection requirement for gemini-3-pro-image-preview
    if (error?.message?.includes("Requested entity was not found.") && window.aistudio) {
       await window.aistudio.openSelectKey();
    }
    return `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
  }
}
