
import { SceneDefinition } from '../../types';

export const stillLifeScene: SceneDefinition = {
  id: 'stilllife',
  name: '静物摄影',
  nameEn: 'Still Life',
  description: '捕捉物品在光影中的静默时刻，探讨东方生活方式中的材质与哲学。',
  icon: 'Box',
  isAvailable: true,
  fields: {
    subject: {
      valueType: 'text',
      displayType: 'grid',
      label: '静谧核心 (Object)',
      minVisibility: 'beginner',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { 
          label: '宋瓷雅器', 
          value: 'A minimalist Ru-ware celadon vase, single branch of plum blossom, cracked glaze detail',
          description: '极致的素雅，强调冰裂纹的细腻质感。'
        },
        { 
          label: '文房墨宝', 
          value: 'Handcrafted ink stick with gold leaf, ancient calligraphy brush, raw mulberry paper texture',
          description: '展现文人生活的细节，书卷气十足。'
        },
        { 
          label: '禅茶一味', 
          value: 'A bowl of matcha with bamboo whisk, steam rising, dark pottery texture, rustic aesthetic',
          description: '捕捉动态的静谧，强调烟雾与陶土对比。'
        }
      ],
      priority: 1
    },
    composition: {
      valueType: 'text',
      displayType: 'tags',
      label: '构图法则 (Layout)',
      minVisibility: 'beginner',
      minEditable: 'advanced',
      editableWeightInExpert: true,
      options: [
        { label: '留白构图', value: 'heavy negative space, minimalist focus' },
        { label: '黄金分割', value: 'Rule of thirds, balanced visual weight' },
        { label: '微距特写', value: 'Macro extreme close-up, focusing on material grain' }
      ],
      priority: 2
    },
    lighting: {
      valueType: 'enum',
      displayType: 'grid',
      label: '光影逻辑 (Vibe)',
      minVisibility: 'advanced',
      minEditable: 'beginner',
      editableWeightInExpert: true,
      options: [
        { label: '晨曦窗影', value: 'soft morning light through bamboo blinds, rhythmic shadows' },
        { label: '幽室烛光', value: 'single flickering candle light, warm tones, heavy shadows' },
        { label: '透彻自然', value: 'clear diffused daylight, natural shadows, realistic colors' }
      ],
      priority: 3
    }
  }
};
