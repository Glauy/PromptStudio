
import { SceneDefinition } from '../../types';

export const freshScene: SceneDefinition = {
  id: 'fresh',
  name: '文艺清新',
  nameEn: 'Fresh Aesthetic',
  description: '通透的空气感与高调明朗的生活切片。',
  icon: 'Sun',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'tags',
      label: '生活切片 (Lifestyle)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '校园初见', value: 'A 25-year-old Chinese student reading under a Ginkgo tree, soft sunlight' },
        { label: '春日游园', value: 'young woman in light cotton clothes walking in a botanical garden, natural pose' },
        { label: '午后书屋', value: 'A young female sitting by a window in a quiet library, contemplative mood' }
      ],
      priority: 1
    },
    environment: {
      valueType: 'text',
      displayType: 'tags',
      label: '叙事空间 (Context)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '极简咖啡厅', value: 'minimalist white-walled cafe, wooden furniture, large windows' },
        { label: '京都风庭院', value: 'Zen garden with pebbles, maple leaves, and soft shadows' },
        { label: '居家暖阁', value: 'cozy sun-drenched bedroom with white linen and soft morning light' }
      ],
      priority: 2
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '光影氛围 (Vibe)',
      minVisibility: 'beginner',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '逆光通透', value: 'soft backlighting, ethereal glow around the subject, hazy finish' },
        { label: '树影斑驳', value: 'dappled sunlight through leaves, rhythmic shadows, natural contrast' },
        { label: '阴天冷光', value: 'diffused overcast light, cool tones, even illumination' }
      ],
      priority: 3
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '色彩系统 (Film)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '富士经典负片', value: 'Fujifilm X-T5, Classic Neg film simulation' },
        { label: '佳能明亮人像', value: 'Canon EOS R6 Mark II, high-key bright skin tones' },
        { label: '徕卡柔和质感', value: 'Leica SL2, Summilux 35mm, soft micro-contrast' }
      ],
      priority: 4
    },
    cameraSettings: {
      valueType: 'text',
      label: '光学规格 (Lens)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: f/2.0, +0.7ev 曝光补偿, 奶油般虚化',
      priority: 5
    }
  }
};
