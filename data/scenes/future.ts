
import { SceneDefinition } from '../../types';

export const futureScene: SceneDefinition = {
  id: 'future',
  name: '未来视觉',
  nameEn: 'Neo-Futurism',
  description: '解构传统元素，重构未来想象。探索“赛博汉风”下的数字机甲与城市文明。',
  icon: 'Cpu',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '未来角色 (Persona)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '赛博女侠', 
          value: 'A 25-year-old Chinese female warrior in tactical tech-wear Hanfu, glowing neon energy sword, cybernetic face markings',
          description: '传统武侠与近未来科技的碰撞。'
        },
        { 
          label: '数字乐手', 
          value: 'A young Chinese male musician playing a futuristic holographic Pipa, floating digital particles, ethereal neon glow',
          description: '将传统乐器数字化，强调艺术的流动感。'
        }
      ],
      priority: 1
    },
    environment: {
      valueType: 'text',
      displayType: 'tags',
      label: '赛博空间 (Cityscape)',
      minVisibility: 'beginner',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '霓虹重楼', value: 'Hyper-dense vertical city with traditional roofs, neon signs in Chinese characters, rainy night' },
        { label: '赛博茶馆', value: 'Traditional tea house interior with floating holographic screens and robotic servers' }
      ],
      priority: 2
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '能量光影 (Light Source)',
      minVisibility: 'advanced',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '流光溢彩', value: 'dynamic neon trails, high-speed light blur, multi-colored glow' },
        { label: '冷冽机能', value: 'sterile white laboratory light, sharp shadows, clinical precision' },
        { label: '幽兰萤火', value: 'soft bioluminescent glow from floating jade drones' }
      ],
      priority: 3
    }
  }
};
