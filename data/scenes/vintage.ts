
import { SceneDefinition } from '../../types';

export const vintageScene: SceneDefinition = {
  id: 'vintage',
  name: '古风复古',
  nameEn: 'Ancient Grace',
  description: '还原唐宋风华与明清雅韵，专注于汉服质感与东方园林意境的深度重构。',
  icon: 'Film',
  isAvailable: true,
  defaults: {
    subject: 'A graceful 25-year-old Chinese woman in a refined Ming-style Hanfu, porcelain skin, intricate hair ornaments, holding a silk round fan',
    environment: 'misty traditional Jiangnan garden with moon gates and weeping willows',
    camera: 'Sony A7R V with 50mm f/1.2 GM',
    cameraSettings: 'f/1.8, 1/125s, ISO 100, filmic grain',
    lighting: 'soft diffused dawn light, ethereal atmosphere',
    medium: 'vintage film photography',
    quality: 'ultra-detailed silk textures, authentic historical accuracy'
  },
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '红颜雅韵 (Subject)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '宋韵点茶', 
          value: 'A 25-year-old scholarly Chinese woman in simple Song-style attire, delicate features, quiet and elegant expression, focusing on tea ceremony',
          description: '强调简约而不简单的宋式高级美，清冷且知性。'
        },
        { 
          label: '大唐华章', 
          value: 'A stunning 25-year-old woman in luxurious Tang-style Ruqun, vibrant cinnabar red and gold embroidery, exquisite makeup, noble and ethereal',
          description: '还原盛唐的绚丽与大方，骨相饱满且精致。'
        },
        { 
          label: '江湖侠气', 
          value: 'A youthful 25-year-old Chinese female martial artist, clean ponytail, minimalist indigo cotton robes, standing in a bamboo grove, firm gaze',
          description: '英姿飒爽的青涩感，强调眼神的力量。'
        }
      ],
      priority: 1,
      placeholder: '描述一位穿着特定形制汉服的 25 岁东方女性...'
    },
    environment: {
      valueType: 'text',
      displayType: 'tags',
      label: '时空背景 (Setting)',
      minVisibility: 'beginner',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '烟雨江南', value: 'Traditional water town, white walls and black tiles, light rain, mist on the river' },
        { label: '深山古刹', value: 'Ancient Zen temple, weathered stone walls, burning incense, soft light through leaves' },
        { label: '红墙故宫', value: 'Forbidden City red walls, golden sunlight, snow falling, majestic symmetry' }
      ],
      priority: 2
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '光影逻辑 (Lighting)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '疏影横斜 (月光)', value: 'cool moonlit shadows, mysterious night garden, soft rim light' },
        { label: '斜阳入室 (金辉)', value: 'warm golden hour sunlight passing through wooden lattice windows' },
        { label: '幽兰空谷 (柔光)', value: 'soft, overcast natural light, low contrast, poetic silence' }
      ],
      priority: 3
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '胶片质感 (Device)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '哈苏宽幅胶片', value: 'Hasselblad XPAN, 45mm lens, 65:24 panoramic ratio' },
        { label: '徕卡人文色彩', value: 'Leica M11, Summicron 35mm, high micro-contrast' }
      ],
      priority: 4
    }
  }
};
