
import { SceneDefinition } from '../../types';

export const narrativeScene: SceneDefinition = {
  id: 'narrative',
  name: '叙事视觉',
  nameEn: 'Cinematic Story',
  description: '每一帧都是电影。专注于人物命运的交汇点，捕捉极具故事张力的视觉切片。',
  icon: 'MessageSquare',
  isAvailable: true,
  defaults: {
    subject: 'A 25-year-old Chinese couple meeting at a rainy bus stop under a single warm street lamp',
    environment: 'empty modern city street at night, wet asphalt reflecting city lights',
    mood: 'nostalgic and romantic, cinematic longing',
    camera: 'ARRI Alexa 35 with Cooke Anamorphic/i S7 lenses',
    cameraSettings: 'T2.3, 24fps motion blur, cinematic 2.39:1 aspect ratio',
    lighting: 'dramatic key light, moody shadows, soft rain texture',
    medium: 'movie still, cinematic storytelling'
  },
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '剧情核心 (Drama)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '别离瞬间', 
          value: 'A young Chinese man looking back through a train window, melancholic expression, raindrops on glass',
          description: '强调隔绝感与未说出口的情绪。'
        },
        { 
          label: '市井重逢', 
          value: 'Two old friends meeting in a crowded night market in Shanghai, warm steam rising, joyful but tearful gaze',
          description: '捕捉烟火气中的真实情感。'
        },
        { 
          label: '独自行走', 
          value: 'A 25-year-old woman walking alone in a futuristic airport, vast empty space, sense of new beginnings',
          description: '利用构图表达个体的孤独与力量。'
        }
      ],
      priority: 1
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '电影工业系统 (Cinema)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '阿莱旗舰', value: 'ARRI Alexa 35, Master Prime lenses' },
        { label: '索尼威尼斯', value: 'Sony VENICE 2, Anamorphic lens system' }
      ],
      priority: 3
    },
    cameraSettings: {
      valueType: 'text',
      label: '电影快门规格 (Motion)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: 24fps, 180-degree shutter, cinematic grain',
      priority: 4
    }
  }
};
