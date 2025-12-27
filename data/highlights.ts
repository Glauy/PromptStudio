
import { Highlight, Preset } from '../types';
import { HIGHLIGHT_PRESETS } from './highlight_presets';
import { resolvePresetMedia } from './presets';

/**
 * 社区精选专题配置 (8 组核心分类)
 */
export const HIGHLIGHT_CONFIGS: Highlight[] = [
  {
    id: 'col-shanshui',
    title: '山水诗意',
    subTitle: 'Shanshui Poeticism',
    description: '人在画中，虚实相生。利用丁达尔效应与意境留白，构建具有东方神韵的宏大视觉。',
    featuredPresetIds: ['cp-shanshui'],
    tags: ['意境山水', '虚实相生'],
    coverUrl: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'SH'
  },
  {
    id: 'col-crimson',
    title: '锦瓷红妆',
    subTitle: 'Crimson Splendor',
    description: '极致骨相，高定质感。模拟中画幅的哑光瓷肌质感，定义当代东方美学人像。',
    featuredPresetIds: ['cp-crimson'],
    tags: ['极致骨相', '高定质感'],
    coverUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'CR'
  },
  {
    id: 'col-garden',
    title: '庭院清雅',
    subTitle: 'Garden Elegance',
    description: '文艺清新，园林留白。捕捉苏州园林中的月窗与斑驳竹影，呈现诗意的文学质感。',
    featuredPresetIds: ['cp-garden'],
    tags: ['文艺清新', '园林留白'],
    coverUrl: 'https://images.unsplash.com/photo-1505245208761-baad325e92fe?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'GE'
  },
  {
    id: 'col-ink',
    title: '墨影骨相',
    subTitle: 'Ink Shadow',
    description: '水墨影调，写意人像。大虚大实的影调控制，让人物在墨色渲染中呈现深邃的哲思。',
    featuredPresetIds: ['cp-ink-shadow'],
    tags: ['水墨影调', '写意人像'],
    coverUrl: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'IS'
  },
  {
    id: 'col-red-snow',
    title: '朱墙白雪',
    subTitle: 'Imperial Snow',
    description: '极简建筑，冷峻叙事。红墙与积雪的极致对比，利用几何构图表达空间的诗意。',
    featuredPresetIds: ['cp-red-snow'],
    tags: ['极简建筑', '冷峻叙事'],
    coverUrl: 'https://images.unsplash.com/photo-1552334405-4929565998d5?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'RW'
  },
  {
    id: 'col-dunhuang',
    title: '敦煌绝响',
    subTitle: 'Dunhuang Echo',
    description: '艺术插画级人像。利用矿物颜料、金箔与飞天绸带，将东方神韵推向神性美学。',
    featuredPresetIds: ['cp-dunhuang'],
    tags: ['艺术插画', '神性美学'],
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'DH'
  },
  {
    id: 'col-monochrome',
    title: '纯影骨相',
    subTitle: 'Studio Monochrome',
    description: '极致清晰的黑白商业人像。模拟徕卡 M11M 影调，聚焦面部微运动与骨骼转折。',
    featuredPresetIds: ['cp-monochrome'],
    tags: ['黑白影像', '商业质感'],
    coverUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'SM'
  },
  {
    id: 'col-youth',
    title: '芳华映画',
    subTitle: 'Youthful Narrative',
    description: '捕捉具有“清涩感”与“呼吸感”的瞬间，光影通透、肤质柔和，文艺感十足。',
    featuredPresetIds: ['cp-youth'],
    tags: ['文艺写真', '呼吸感'],
    coverUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1200',
    issueNumber: 'YN'
  }
];

/**
 * 获取专题关联的所有解析后的预设
 */
export const getPresetsForHighlight = (highlight: Highlight): Preset[] => {
  return highlight.featuredPresetIds
    .map(id => HIGHLIGHT_PRESETS.find(p => p.id === id))
    .filter((p): p is (Preset & { likes: string }) => p !== undefined)
    .map(resolvePresetMedia);
};
