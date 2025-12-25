
import { SceneDefinition } from '../../types';

export const commercialScene: SceneDefinition = {
  id: 'commercial',
  name: '商业摄影',
  nameEn: 'Commercial',
  description: '极致的清晰度与光影控制，展现高端国潮产品的材质美感与品牌质感。',
  icon: 'Briefcase',
  isAvailable: true,
  defaults: {
    subject: 'High-end skincare set in white porcelain jars with jade patterns',
    environment: 'minimalist light gray studio background, high-end stone pedestal',
    lighting: 'clean professional studio lighting, soft rim light, precise reflections',
    camera: 'Hasselblad H6D-100c',
    cameraSettings: 'f/8, 1/125s, ISO 100, focus stacking',
    quality: 'commercial catalog photography, sharp focus, 8k resolution'
  },
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '视觉标的 (Object)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '中式美妆', 
          value: 'Intricate carved lipstick with traditional Phoenix patterns, gold casing, macro texture',
          description: '强调雕花工艺与金属拉丝质感。'
        },
        { 
          label: '高端珠宝', 
          value: 'Natural translucent green Jadeite pendant, minimalist silver setting, soft caustic light',
          description: '表现玉石的通透感与温润水头。'
        },
        { 
          label: '文创科技', 
          value: 'A modern smartphone with a silk-textured back panel, bamboo motifs, sleek design',
          description: '科技感与中式元素的有机融合。'
        }
      ],
      priority: 1
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '布光矩阵 (Lighting)',
      minVisibility: 'advanced',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '极简柔光 (Top)', value: 'Large softbox from above, shadowless background, clean aesthetic' },
        { label: '戏剧轮廓 (Side)', value: 'Hard side lighting, dramatic rim light to define shape' },
        { label: '渐变柔光 (Gradient)', value: 'Soft gradient lighting, pearlescent reflections on surface' }
      ],
      priority: 2
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '商业旗舰 (System)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '哈苏中画幅', value: 'Hasselblad X2D, 80mm f/1.9' },
        { label: '飞思一亿像素', value: 'Phase One XF, IQ4 digital back' }
      ],
      priority: 3
    }
  }
};
