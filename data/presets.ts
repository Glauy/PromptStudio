
import { Preset } from '../types';
import { GALLERY_ASSETS } from './assets';

export const COMMUNITY_PRESETS: (Preset & { url: string; likes: string })[] = [
  { 
    id: 'p1', 
    title: '绯色·新中式', 
    author: '墨羽轩',
    sceneId: 'portrait',
    url: GALLERY_ASSETS.p1.path,
    likes: '2.4k',
    data: {
      subject: 'A stunning 25-year-old Chinese female model, exquisite high-bone structure, detailed silk embroidery, modern neo-Hanfu',
      lighting: 'high-contrast dramatic side lighting, sharp shadows, chiaroscuro effect',
      camera: 'Sony A7R V, FE 85mm f/1.2 GM',
      cameraSettings: 'f/1.2, 1/160s, ISO 100'
    }
  },
  { 
    id: 'p2', 
    title: '苍山·雾语', 
    author: '风之谷',
    sceneId: 'nature',
    url: GALLERY_ASSETS.p2.path,
    likes: '3.1k',
    data: {
      subject: 'mystical sea of clouds flowing through ancient pine forests of Huangshan',
      lighting: 'ethereal morning mist, diffused cold blue light',
      camera: 'Fujifilm GFX 100 II',
      cameraSettings: 'f/11, long exposure 2s'
    }
  },
  { 
    id: 'p3', 
    title: '戏梦·梨园', 
    author: '梨园子弟',
    sceneId: 'portrait',
    url: GALLERY_ASSETS.p3.path,
    likes: '1.8k',
    data: {
      subject: '25-year-old Chinese woman with modern Peking Opera facial painting, refined features',
      lighting: 'dramatic spotlight, deep shadows',
      camera: 'Leica SL2',
      style: 'Cinematic Avant-garde'
    }
  }
];
