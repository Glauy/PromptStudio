
import { Asset } from '../types';

/**
 * 全球视觉资产池 (Unified Source Pool)
 * 采用数组结构，独立于业务场景 ID，作为纯净的底层资源仓。
 * 这里仅存储图片 URL、ID 和标签，不包含业务逻辑提示词。
 */
export const SCENE_ASSETS_POOL: Asset[] = [
  {
    id: 'asset-portrait-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    tags: ['portrait', 'fine-art', 'female']
  },
  {
    id: 'asset-nature-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    tags: ['landscape', 'mist', 'zen']
  },
  {
    id: 'asset-miniature-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1594732832278-abd644401426?q=80&w=1200&auto=format&fit=crop',
    tags: ['miniature', 'craft', 'macro']
  },
  {
    id: 'asset-vintage-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1552334405-4929565998d5?q=80&w=1200&auto=format&fit=crop',
    tags: ['vintage', 'hanfu', 'culture']
  },
  {
    id: 'asset-future-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=1200&auto=format&fit=crop',
    tags: ['future', 'scifi', 'neo-oriental']
  },
  {
    id: 'asset-artistic-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop',
    tags: ['art', 'illustration', 'digital']
  },
  {
    id: 'asset-commercial-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1526170315870-efeca63c5d53?q=80&w=1200&auto=format&fit=crop',
    tags: ['commercial', 'product', 'minimal']
  },
  {
    id: 'asset-stilllife-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1200&auto=format&fit=crop',
    tags: ['still-life', 'zen', 'tea']
  },
  {
    id: 'asset-space-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    tags: ['architecture', 'interior', 'minimal']
  },
  {
    id: 'asset-narrative-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    tags: ['narrative', 'film-still', 'mood']
  },
  {
    id: 'asset-emotional-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1200&auto=format&fit=crop',
    tags: ['emotional', 'atmosphere', 'fog']
  },
  {
    id: 'asset-fresh-001',
    path: '',
    previewUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop',
    tags: ['fresh', 'lifestyle', 'bright']
  }
];

/**
 * 资产搜索工具
 */
export const getAssetById = (id: string): Asset | undefined => {
  return SCENE_ASSETS_POOL.find(a => a.id === id);
};

/**
 * 风格志画廊资产库 (Gallery Assets Pool)
 */
export const GALLERY_ASSETS: Asset[] = [
  { id: 'v-portrait-01', path: '', previewUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800', tags: ['portrait', 'bw'] },
  { id: 'v-nature-01', path: '', previewUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', tags: ['nature', 'ink'] },
  { id: 'v-fresh-01', path: '', previewUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', tags: ['fresh', 'lifestyle'] },
  { id: 'v-future-01', path: '', previewUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800', tags: ['future', 'tech'] },
  { id: 'v-artistic-01', path: '', previewUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800', tags: ['artistic', 'mural'] },
  { id: 'v-space-01', path: '', previewUrl: 'https://images.unsplash.com/photo-1616423641454-ec0077885392?auto=format&fit=crop&q=80&w=800', tags: ['space', 'minimalist'] }
];
