
import { Preset, SceneId } from '../types';
import { getAssetById } from './assets';

/**
 * 官方场景预设实例库
 * 使用 assetId 映射底层 SCENE_ASSETS_POOL 获取预览图，提示词直接定义在预设中。
 */
export const OFFICIAL_SCENE_PRESETS: Record<SceneId, Preset> = {
  portrait: {
    id: 'official-portrait',
    assetId: 'asset-portrait-001',
    title: '东方雅韵·肖像',
    sceneId: 'portrait',
    author: 'PromptStudio Official',
    prompt: 'Professional fine art portrait of an elegant woman, exquisite Eastern bone structure, editorial skin texture, cinematic soft light, 85mm prime.',
    data: {
      subject: 'A graceful 25-year-old Chinese woman with refined features, ethereal porcelain skin, wearing a minimalist silk Qipao, gentle but firm gaze',
      environment: 'high-end zen-style studio, soft shadows, minimalist aesthetic',
      camera: 'Sony A7R V with Sony FE 85mm f/1.2 GM',
      cameraSettings: 'f/1.2, 1/160s, ISO 100, eye-autofocus enabled',
      lighting: 'classic Rembrandt lighting with a subtle warm fill',
      medium: 'high-fashion photography',
      quality: '8k resolution, cinematic grain, hyper-detailed textures'
    }
  },
  nature: {
    id: 'official-nature',
    assetId: 'asset-nature-001',
    title: '苍山负雪·风光',
    sceneId: 'nature',
    author: 'PromptStudio Official',
    prompt: 'Ethereal mountain landscape with mist and morning light, traditional zen-like atmosphere, wide angle, high resolution.',
    data: {
      subject: 'The majestic Huangshan mountains partially covered in swirling sea of clouds',
      environment: 'ancient pine trees clinging to granite cliffs, ink-wash aesthetic',
      camera: 'Fujifilm GFX 100 II',
      cameraSettings: 'f/11, 23mm wide angle, ISO 50, long exposure 2s',
      lighting: 'ethereal golden hour, soft morning mist',
      medium: 'landscape fine art photography',
      quality: '100 megapixels detail, medium format texture'
    }
  },
  miniature: {
    id: 'official-miniature',
    assetId: 'asset-miniature-001',
    title: '寸间乾坤·微缩',
    sceneId: 'miniature',
    author: 'PromptStudio Official',
    prompt: 'Intricate miniature model photography, high detail, shallow depth of field, miniature landscape scene.',
    data: {
      subject: 'A detailed miniature model of a Jiangnan water town house',
      environment: 'on an artisan workbench, surrounded by delicate tools',
      composition: 'tilt-shift effect, macro depth of field',
      camera: 'Canon EOS R5 with RF 100mm f/2.8L Macro IS USM',
      cameraSettings: '1.4x magnification, f/8, 20-image focus stack',
      lighting: 'soft led spot lighting from the side, tiny warm lanterns inside the model',
      medium: 'macro craftsmanship photography',
      quality: 'hyper-realistic textures of wood and tile'
    }
  },
  vintage: {
    id: 'official-vintage',
    assetId: 'asset-vintage-001',
    title: '大唐华章·复古',
    sceneId: 'vintage',
    author: 'PromptStudio Official',
    prompt: 'Classical vintage aesthetic, traditional architecture details, cinematic film grain, nostalgic mood, hanfu portrait.',
    data: {
      subject: 'A stunning 25-year-old woman in luxurious Tang-style Ruqun, vibrant cinnabar red and gold embroidery, exquisite makeup, noble and ethereal',
      environment: 'Traditional Forbidden City red walls, golden sunlight, light snow falling',
      camera: 'Sony A7R V with 50mm f/1.2 GM',
      cameraSettings: 'f/1.8, 1/125s, ISO 100, filmic grain',
      lighting: 'soft diffused dawn light, ethereal atmosphere',
      medium: 'vintage film photography',
      quality: 'ultra-detailed silk textures, authentic historical accuracy'
    }
  },
  future: {
    id: 'official-future',
    assetId: 'asset-future-001',
    title: '赛博汉风·未来',
    sceneId: 'future',
    author: 'PromptStudio Official',
    prompt: 'Futuristic technology fusion, sci-fi robot and traditional elements, neon blue and orange accents.',
    data: {
      subject: 'A cool 25-year-old Chinese female pilot in sleek high-tech Neo-Hanfu mech armor',
      environment: 'futuristic mega-city Chongqing with glowing holographic calligraphy and neon lanterns',
      lighting: 'cyberpunk neon lighting, glowing jade accents, moody red and teal contrast',
      camera: 'Leica SL2-S with Summilux-C 35mm T1.4',
      cameraSettings: 'f/1.4, cinematic anamorphic lens flare, high ISO grain',
      medium: 'sci-fi concept art photography',
      quality: 'masterpiece, complex digital textures, glowing circuitry'
    }
  },
  artistic: {
    id: 'official-artistic',
    assetId: 'asset-artistic-001',
    title: '敦煌神韵·艺术',
    sceneId: 'artistic',
    author: 'PromptStudio Official',
    prompt: 'Abstract fine art illustration, rich textures, golden accents, contemporary digital aesthetic, Dunhuang muse.',
    data: {
      subject: 'An ethereal 25-year-old Chinese goddess floating among stylized golden clouds',
      style: 'Neo-Chinese digital art, fusion of traditional ink and futuristic neon',
      medium: 'Fine art digital painting, high brushstroke texture',
      color: 'Cinnabar red, mineral green, and gold leaf accents',
      quality: 'masterpiece, complex details, surreal composition'
    }
  },
  commercial: {
    id: 'official-commercial',
    assetId: 'asset-commercial-001',
    title: '玉石之光·商业',
    sceneId: 'commercial',
    author: 'PromptStudio Official',
    prompt: 'Minimalist product photography, high-end design, clean studio background, elegant shadows, jade jewelry.',
    data: {
      subject: 'Natural translucent green Jadeite pendant, minimalist silver setting, soft caustic light',
      environment: 'minimalist light gray studio background, high-end stone pedestal',
      lighting: 'clean professional studio lighting, soft rim light, precise reflections',
      camera: 'Hasselblad H6D-100c',
      cameraSettings: 'f/8, 1/125s, ISO 100, focus stacking',
      quality: 'commercial catalog photography, sharp focus, 8k resolution'
    }
  },
  stilllife: {
    id: 'official-stilllife',
    assetId: 'asset-stilllife-001',
    title: '宋瓷雅器·静物',
    sceneId: 'stilllife',
    author: 'PromptStudio Official',
    prompt: 'Minimalist oriental still life, Japanese tea set on dark wood, zen-like composition, soft side light.',
    data: {
      subject: 'A set of fine Ru-ware celadon tea set on a dark weathered wood table',
      environment: 'quiet tea room with natural light from a paper screen window',
      composition: 'minimalist, negative space, top-down view',
      lighting: 'natural window light, soft morning rays, high contrast shadows',
      camera: 'Sony A7R V with 90mm f/2.8 Macro',
      cameraSettings: 'f/4.0, shallow depth of field, natural color grading',
      quality: 'tactile textures, peaceful atmosphere'
    }
  },
  space: {
    id: 'official-space',
    assetId: 'asset-space-001',
    title: '圆窗入画·空间',
    sceneId: 'space',
    author: 'PromptStudio Official',
    prompt: 'Modern architectural space, clean lines, minimalist interior, play of natural light, zen tea room.',
    data: {
      subject: 'A minimalist high-end Zen tea room with a circular moon window',
      environment: 'modern architectural interior with dark oak wood and natural stone textures',
      camera: 'Sony A7R V with Canon TS-E 24mm f/3.5L II (Tilt-Shift)',
      cameraSettings: 'f/11, ISO 100, perfect vertical lines, architectural perspective correction',
      lighting: 'soft natural light from a side window, long soft shadows, volumetric dust particles',
      composition: 'symmetrical balance, wide-angle interior photography',
      quality: 'ultra-high resolution, clean textures, professional architectural finish'
    }
  },
  narrative: {
    id: 'official-narrative',
    assetId: 'asset-narrative-001',
    title: '雨夜邂逅·叙事',
    sceneId: 'narrative',
    author: 'PromptStudio Official',
    prompt: 'Cinematic storytelling scene, emotional lighting, wide screen aspect ratio, film noir vibe, rainy street.',
    data: {
      subject: 'A 25-year-old Chinese couple meeting at a rainy bus stop under a single warm street lamp',
      environment: 'empty modern city street at night, wet asphalt reflecting city lights',
      mood: 'nostalgic and romantic, cinematic longing',
      camera: 'ARRI Alexa 35 with Cooke Anamorphic/i S7 lenses',
      cameraSettings: 'T2.3, 24fps motion blur, cinematic 2.39:1 aspect ratio',
      lighting: 'dramatic key light, moody shadows, soft rain texture',
      medium: 'movie still, cinematic storytelling'
    }
  },
  emotional: {
    id: 'official-emotional',
    assetId: 'asset-emotional-001',
    title: '万籁俱静·情绪',
    sceneId: 'emotional',
    author: 'PromptStudio Official',
    prompt: 'Deep emotional atmosphere, silhouette in fog, poetic and moody visual expression.',
    data: {
      subject: 'A 25-year-old Chinese scholar watching rain from a pavilion, profound silence',
      mood: 'melancholic and philosophical, wabi-sabi aesthetic',
      camera: 'Leica M11 with Summilux 35mm f/1.4',
      cameraSettings: 'f/1.4, slow shutter, cinematic motion blur',
      lighting: 'single candle light, heavy shadows, film noir look',
      medium: 'storytelling photography',
      quality: 'heavy film grain, cinematic color grading'
    }
  },
  fresh: {
    id: 'official-fresh',
    assetId: 'asset-fresh-001',
    title: '午后书屋·清新',
    sceneId: 'fresh',
    author: 'PromptStudio Official',
    prompt: 'Bright and fresh spring aesthetic, flowers in soft sunlight, high-key airy photography, afternoon library.',
    data: {
      subject: 'A graceful 25-year-old Chinese woman with a natural smile reading by a window',
      environment: 'brightly lit minimalist library near a window with sheer curtains',
      lighting: 'high-key, soft natural backlighting, light airy atmosphere',
      camera: 'Fujifilm X-T5, Nostalgic Neg film simulation',
      cameraSettings: 'f/2.0, +0.7ev exposure compensation, shallow depth of field',
      color: 'pastel tones, desaturated greens and warm whites',
      medium: 'lifestyle fine-art photography',
      quality: 'clean, 8k, low contrast, delicate textures'
    }
  }
};
