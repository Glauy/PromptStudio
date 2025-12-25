
import { SceneDefinition } from '../../types';

export const natureScene: SceneDefinition = {
  id: 'nature',
  name: '自然风景',
  nameEn: 'Nature',
  description: '以中国传统山水画意境为灵感的大幅风光场景。',
  icon: 'Trees',
  isAvailable: true,
  defaults: {
    subject: 'The majestic Huangshan mountains partially covered in swirling sea of clouds',
    environment: 'ancient pine trees clinging to granite cliffs, ink-wash aesthetic',
    camera: 'Fujifilm GFX 100 II',
    cameraSettings: 'f/11, 23mm wide angle, ISO 50, long exposure 2s',
    lighting: 'ethereal golden hour, soft morning mist',
    medium: 'landscape fine art photography',
    quality: '100 megapixels detail, medium format texture'
  },
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'tags',
      label: '地理核心 (Landscape)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '黄山云海', value: 'jagged granite peaks of Huangshan, mystical sea of clouds, ancient pines' },
        { label: '漓江烟雨', value: 'Guilin karst mountains, misty river reflection, cormorant fisherman' },
        { label: '藏地神山', value: 'Meili Snow Mountain, first golden sunlight hitting the peak' }
      ],
      priority: 1
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '大气光效 (Atmosphere)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '日照金山', value: 'alpenglow effect, golden light hitting the peaks' },
        { label: '烟雨朦胧', value: 'ethereal morning mist, diffused cold blue light' },
        { label: '星河长明', value: 'long exposure, milky way galaxy over the horizon, dark sky' }
      ],
      priority: 2
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '风光旗舰系统 (Optics)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '飞思一亿像素', value: 'Phase One IQ4 150MP, Rodenstock 32mm' },
        { label: '哈苏宽幅', value: 'Hasselblad 907X, XCD 21mm Ultra-Wide' }
      ],
      priority: 3
    },
    cameraSettings: {
      valueType: 'text',
      label: '风光曝光矩阵 (Settings)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: f/11, hyperfocal distance, ND filter',
      priority: 4
    }
  }
};
