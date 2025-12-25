
import { SceneDefinition } from '../../types';

export const portraitScene: SceneDefinition = {
  id: 'portrait',
  name: '人物肖像',
  nameEn: 'Portrait',
  description: '融合东方骨相美学与现代高级时装感的专业肖像空间。',
  icon: 'User',
  isAvailable: true,
  defaults: {
    subject: 'A graceful 25-year-old Chinese woman with refined features, ethereal porcelain skin, wearing a minimalist silk Qipao, gentle but firm gaze',
    environment: 'high-end zen-style studio, soft shadows, minimalist aesthetic',
    camera: 'Sony A7R V with Sony FE 85mm f/1.2 GM',
    cameraSettings: 'f/1.2, 1/160s, ISO 100, eye-autofocus enabled',
    lighting: 'classic Rembrandt lighting with a subtle warm fill',
    medium: 'high-fashion photography',
    quality: '8k resolution, cinematic grain, hyper-detailed textures'
  },
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '视觉核心 (Subject)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '云想衣裳 (精致)', 
          value: 'A stunning 25-year-old Chinese female model, exquisite high-bone structure, detailed silk embroidery, modern neo-Hanfu, editorial pose',
          description: '强调精致的骨相与刺绣细节，尽显东方尊贵感。'
        },
        { 
          label: '雨后青茶 (青涩)', 
          value: 'A 25-year-old young Chinese woman with a clean, youthful face, naive and ethereal gaze, natural long black hair, wearing a white cotton dress',
          description: '捕捉清晨茶园般的青涩感，强调自然皮肤质感。'
        },
        { 
          label: '墨色绅士', 
          value: 'A refined 25-year-old Chinese man, scholarly elegance, sharp minimalist suit with ink-wash patterns, deep contemplative gaze',
          description: '文人雅士与现代绅士的融合。'
        }
      ],
      priority: 1,
      placeholder: '描述一位 25 岁左右、具有东方气质的主体...'
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '光影逻辑 (Lighting)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '东方蝉意 (柔光)', value: 'diffused natural soft light, hazy atmosphere, subtle god rays' },
        { label: '雕刻时光 (硬光)', value: 'high-contrast dramatic side lighting, sharp shadows, chiaroscuro effect' },
        { label: '霓虹冷暖', value: 'cyberpunk red and teal neon lighting, cinematic backlighting' }
      ],
      priority: 2
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '数字影像终端 (Device)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '索尼人像旗舰', value: 'Sony A7R V, FE 85mm f/1.2 GM' },
        { label: '徕卡传奇色彩', value: 'Leica M11, Summilux-M 50mm f/1.4 ASPH' },
        { label: '哈苏中画幅', value: 'Hasselblad X2D 100C, XCD 90mm f/2.5' }
      ],
      priority: 3
    },
    cameraSettings: {
      valueType: 'text',
      label: '精密光学规格 (Specs)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: f/1.2, 1/200s, ISO 100, 浅景深控制',
      priority: 4
    }
  }
};
