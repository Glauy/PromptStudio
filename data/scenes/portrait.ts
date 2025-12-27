
import { SceneDefinition } from '../../types';

export const portraitScene: SceneDefinition = {
  id: 'portrait',
  name: '人物肖像',
  nameEn: 'Portrait',
  description: '融合东方骨相美学与现代高级时装感的专业肖像空间。',
  icon: 'User',
  isAvailable: true,
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
          label: '锦绣骨相 (精致)', 
          value: 'A stunning 25-year-old Chinese female model, refined high-bone structure, flawless porcelain skin, traditional phoenix eyes, editorial pose',
          description: '强调极致的骨相与细腻的皮肤纹理。'
        },
        { 
          label: '雨后清新 (青涩)', 
          value: 'A 25-year-old young Chinese woman with a clean and naive face, ethereal gaze, natural long black hair, wearing a white cotton dress',
          description: '捕捉清新自然的青涩感，通透感极佳。'
        },
        { 
          label: '墨色文人', 
          value: 'A refined 25-year-old Chinese man, scholarly elegance, minimalist attire, contemplative gaze, studio lighting',
          description: '文人雅士的现代转译。'
        }
      ],
      priority: 1,
      placeholder: '描述一位 25 岁、具有东方气质的主体...'
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '光影逻辑 (Lighting)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '蝉意柔光', value: 'diffused natural soft light, hazy atmosphere, zen lighting' },
        { label: '伦勃朗侧光', value: 'classic Rembrandt lighting, dramatic shadows, highlighting bone structure' },
        { label: '自然天光', value: 'bright overcast daylight, soft diffused shadows, high micro-contrast' }
      ],
      priority: 2
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '影像终端 (Device)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '哈苏 X2D', value: 'Hasselblad X2D 100C, XCD 90mm f/2.5' },
        { label: '徕卡 M11', value: 'Leica M11, Summilux 50mm f/1.4' },
        { label: '索尼 Alpha', value: 'Sony A7R V, FE 85mm f/1.2 GM' }
      ],
      priority: 3
    },
    cameraSettings: {
      valueType: 'text',
      label: '光学规格 (Specs)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: f/1.2, 1/160s, ISO 100, eye-autofocus',
      priority: 4
    }
  }
};
