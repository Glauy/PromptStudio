
import { SceneDefinition } from '../../types';

export const artisticScene: SceneDefinition = {
  id: 'artistic',
  name: '艺术插画',
  nameEn: 'Artistic Vision',
  description: '跨越维度的视觉表达，将敦煌壁画、工笔重彩与现代数字美学完美融合。',
  icon: 'Palette',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '艺术主体 (Muse)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '敦煌飞天', 
          value: 'A celestial female figure inspired by Dunhuang murals, 25 years old, floating ribbons, ornate jewelry, mineral pigments texture',
          description: '汲取莫高窟灵感，强调动感与神圣感。'
        },
        { 
          label: '水墨幻境', 
          value: 'A surreal portrait of a young Chinese woman merging with ink-wash mountains and lotus flowers, negative space',
          description: '大虚大实，强调中国画的留白美学。'
        },
        { 
          label: '工笔重彩', 
          value: 'Highly detailed Gongbi style illustration of a refined lady, crisp lines, rich colors, bird and flower motifs',
          description: '极致的线条勾勒，呈现宫廷绘画的精致感。'
        }
      ],
      priority: 1
    },
    medium: {
      valueType: 'text',
      displayType: 'tags',
      label: '艺术媒介 (Medium)',
      minVisibility: 'beginner',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '宣纸水墨', value: 'traditional ink wash on Xuan paper, natural bleed effect' },
        { label: '丝绸重彩', value: 'Mineral pigments on silk, rich saturation, subtle shimmer' },
        { label: '现代插画', value: 'Clean vector-based digital illustration, flat colors, modern minimalism' }
      ],
      priority: 2
    },
    color: {
      valueType: 'text',
      displayType: 'grid',
      label: '色值方案 (Palette)',
      minVisibility: 'advanced',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '玄青黛蓝 (冷调)', value: 'Deep ink black, indigo, and silver' },
        { label: '朱红石绿 (传统)', value: 'Classic Cinnabar red and Malachite green contrast' },
        { label: '浮光溢彩 (华丽)', value: 'Warm gold, ivory white, and pearl luster' }
      ],
      priority: 3
    }
  }
};
