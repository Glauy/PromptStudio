
import { Preset } from '../types';

/**
 * 精选预设库 (Highlight Presets)
 * 每一组都代表一种极致的视觉逻辑，用于“社区精选”展示
 */
export const HIGHLIGHT_PRESETS: (Preset & { likes: string })[] = [
  {
    id: 'cp-shanshui',
    assetId: 'asset-nature-001',
    title: '墨染·山河',
    sceneId: 'nature',
    author: 'PromptStudio Curator',
    likes: '15.2k',
    prompt: 'A refined 25-year-old Chinese woman in minimalist flowing white silk robes, standing on a karst mountain peak, vast Guilin landscape, heavy morning mist, ethereal sea of clouds, distant ink-wash style mountains, Tyndall effect, Hasselblad X2D, 30mm Ultra-Wide, Oriental Shanshui aesthetic.',
    data: {
      subject: 'A refined 25-year-old Chinese woman in minimalist flowing white silk robes',
      environment: 'vast Guilin landscape, heavy morning mist, ink-wash mountains',
      style: 'Oriental Shanshui aesthetic, virtual-real fusion',
      quality: 'masterpiece, high-end poetic mood'
    }
  },
  {
    id: 'cp-crimson',
    assetId: 'asset-portrait-001',
    title: '锦瓷·红妆',
    sceneId: 'portrait',
    author: 'PromptStudio Curator',
    likes: '12.8k',
    prompt: 'A stunning 25-year-old Chinese model with high-bone structure, cinnabar red lips, flawless matte porcelain skin, Rembrandt lighting, high-end studio editorial, Sony A7R V, 85mm f/1.2 GM II.',
    data: {
      subject: '25-year-old Chinese model with high-bone structure, cinnabar red lips',
      lighting: 'Rembrandt lighting, deep shadows',
      medium: 'high-end fashion editorial',
      quality: 'flawless porcelain skin texture'
    }
  },
  {
    id: 'cp-garden',
    assetId: 'asset-fresh-001',
    title: '疏影·园林',
    sceneId: 'fresh',
    author: 'PromptStudio Curator',
    likes: '9.4k',
    prompt: 'A graceful 25-year-old Chinese girl, Traditional Suzhou garden, moon window, natural soft light, negative space, Leica M11, Summilux 35mm f/1.4, Clear and literary fresh realistic photography.',
    data: {
      subject: 'graceful 25-year-old Chinese girl with clear eyes',
      environment: 'Suzhou garden, circular moon window, bamboo shadows',
      composition: 'zen-style negative space',
      style: 'literary fresh aesthetic'
    }
  },
  {
    id: 'cp-ink-shadow',
    assetId: 'asset-emotional-001',
    title: '墨影·骨相',
    sceneId: 'emotional',
    author: 'Aesthetic Lab',
    likes: '8.1k',
    prompt: 'Monochrome ink-wash style portrait, 25-year-old Chinese man, cinematic shadow and light, ink texture overlay, philosophical silence, high contrast BW photography.',
    data: {
      subject: '25-year-old Chinese man, scholarly elegance',
      style: 'Freehand ink-wash shadow, poetic monochrome',
      lighting: 'dramatic side light, high contrast',
      mood: 'philosophical silence'
    }
  },
  {
    id: 'cp-red-snow',
    assetId: 'asset-vintage-001',
    title: '朱墙·白雪',
    sceneId: 'space',
    author: 'Architecture Lead',
    likes: '11.2k',
    prompt: 'Minimalist Forbidden City architecture, red walls covered in white snow, symmetrical composition, cold cinematic atmosphere, deep red and pure white contrast.',
    data: {
      subject: 'Forbidden City red walls with thick white snow',
      composition: 'majestic symmetry, minimalist architectural lines',
      mood: 'cold and silent narrative',
      color: 'cinnabar red and snow white'
    }
  },
  {
    id: 'cp-dunhuang',
    assetId: 'asset-artistic-001',
    title: '敦煌·绝响',
    sceneId: 'artistic',
    author: 'Digital Artist',
    likes: '18.5k',
    prompt: 'Ethereal Dunhuang Muse, 25-year-old goddess, floating silk ribbons, mineral pigments texture, gold foil particles, ornate jewelry, divine Oriental aesthetic, digital fine art illustration.',
    data: {
      subject: '25-year-old Oriental goddess in divine pose',
      medium: 'Mineral pigment texture, gold foil accents',
      style: 'Dunhuang Re-echo, sacred aesthetic',
      quality: 'artistic illustration level'
    }
  },
  {
    id: 'cp-monochrome',
    assetId: 'asset-commercial-001',
    title: '纯影·骨相',
    sceneId: 'commercial',
    author: 'Pro Photographer',
    likes: '7.6k',
    prompt: 'Extreme HD black and white commercial portrait, Leica M11 Monochrom style, focus on facial muscle micro-movements and bone structure, high-end skin grain, silver gelatin print look.',
    data: {
      subject: 'Extreme detail of 25-year-old male face, bone structure focus',
      camera: 'Leica M11 Monochrom',
      lighting: 'precise studio key light',
      quality: 'silver gelatin print texture, high-end grain'
    }
  },
  {
    id: 'cp-youth',
    assetId: 'asset-narrative-001',
    title: '芳华·映画',
    sceneId: 'narrative',
    author: 'Storyteller',
    likes: '13.1k',
    prompt: 'Youthful narrative photography, rainy afternoon library, 25-year-old girl with clear breathing skin, natural light through window, nostalgic and soft cinematic vibe.',
    data: {
      subject: '25-year-old girl with "breathing" skin texture',
      environment: 'rainy old street library, soft natural light',
      mood: 'nostalgic, youthful longing',
      quality: 'translucent air quality, soft focus'
    }
  }
];
