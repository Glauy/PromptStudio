
import { SceneDefinition } from '../../types';

export const spaceScene: SceneDefinition = {
  id: 'space',
  name: '空间摄影',
  nameEn: 'Architectural Space',
  description: '探索新中式建筑的线条美学，捕捉光影在极简空间中的流动与停留。',
  icon: 'Home',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '空间主题 (Subject)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '禅意茶室', 
          value: 'A minimalist Zen tea room, low wooden table, circular moon window looking out to a bamboo garden',
          description: '强调几何线条与自然景观的融合。'
        },
        { 
          label: '云端雅苑', 
          value: 'Modern high-end luxury living room, double-height ceiling, large windows overlooking a misty mountain range, Silk carpets',
          description: '表现垂直空间感与极致的奢华通透。'
        },
        { 
          label: '书香门第', 
          value: 'A contemporary private library with floor-to-ceiling wooden bookshelves, warm hidden LED lighting, scholarly atmosphere',
          description: '注重材质的厚重感与光影的层次。'
        }
      ],
      priority: 1,
      placeholder: '描述一个特定的室内或建筑空间...'
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '移轴/广角系统 (Optics)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '佳能移轴旗舰', value: 'Canon TS-E 24mm f/3.5L II' },
        { label: '索尼超广角', value: 'Sony FE 12-24mm f/2.8 GM' }
      ],
      priority: 3
    },
    cameraSettings: {
      valueType: 'text',
      label: '透视校正参数 (Specs)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: f/11 for deep focus, shift +5mm, ISO 100',
      priority: 4
    }
  }
};
