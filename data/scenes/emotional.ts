
import { SceneDefinition } from '../../types';

export const emotionalScene: SceneDefinition = {
  id: 'emotional',
  name: '高级情绪',
  nameEn: 'Cinematic Mood',
  description: '以留白与情绪为核心的叙事性影像空间。',
  icon: 'Heart',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '叙事主体 (Persona)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '雨巷背影', 
          value: 'A lonely 25-year-old Chinese woman holding an oil-paper umbrella in a rainy alley',
          description: '致敬戴望舒的《雨巷》，极具文学叙事感。'
        },
        { 
          label: '残荷听雨', 
          value: 'A young scholar watching raindrops hitting dry lotus leaves in an autumn garden',
          description: '强调侘寂之美，对凋零细节的深刻洞察。'
        }
      ],
      priority: 1
    },
    mood: {
      valueType: 'enum',
      displayType: 'tags',
      label: '情感基调 (Vibe)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '寂静', value: 'profound silence, negative space, zen' },
        { label: '怀旧', value: 'nostalgic warm tones, 90s Hong Kong film aesthetic' },
        { label: '疏离', value: 'cold emotional distance, desaturated colors' }
      ],
      priority: 2
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '人文纪实器械 (Tactile)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '徕卡 35mm 圣杯', value: 'Leica M11, 35mm Steel Rim' },
        { label: '玛米亚中画幅', value: 'Mamiya RZ67, 110mm f/2.8' }
      ],
      priority: 3
    }
  }
};
