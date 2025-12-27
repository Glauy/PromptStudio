
import { SceneDefinition } from '../../types';

export const miniatureScene: SceneDefinition = {
  id: 'miniature',
  name: '微缩世界',
  nameEn: 'Miniature World',
  description: '展示极致工艺细节与东方盆景美学的微观宇宙。',
  icon: 'Search',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'tags',
      label: '微缩主体 (Object)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '江南水乡模型', value: '1:50 scale miniature Jiangnan pavilion, white walls and black tiles' },
        { label: '指尖盆景', value: 'ancient Bonsai tree in a tiny porcelain pot, microscopic moss detail' },
        { label: '榫卯机关', value: 'intricate Luban lock, wooden joints close-up, historical craftsmanship' }
      ],
      priority: 1
    },
    camera: {
      valueType: 'text',
      displayType: 'tags',
      label: '显微成像系统 (Micro)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      options: [
        { label: '佳能专业微距', value: 'Canon EOS R5, RF 100mm Macro' },
        { label: '老蛙探针镜头', value: 'Laowa 24mm f/14 Probe Lens' }
      ],
      priority: 3
    },
    cameraSettings: {
      valueType: 'text',
      label: '景深合成控制 (Focus)',
      minVisibility: 'advanced',
      minEditable: 'expert',
      editableWeightInExpert: true,
      placeholder: '例如: focus stacking, f/8 for sharpness',
      priority: 4
    }
  }
};
