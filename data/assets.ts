
/**
 * 视觉资产清单 - 定义专业级别生成指令
 * 视觉准则：
 * 1. 25 岁左右精致东方形象（拒绝欧美化、日本元素）
 * 2. 专业摄影规格（哈苏/徕卡质感、中画幅影调、丁达尔光影）
 * 3. 场景化意境：基于各场景 defaults 提示词挑选预览图
 */

export const SCENE_ASSETS = {
  portrait: {
    path: '../assets/images/scene/portrait.jpg',
    // 匹配：25岁精致东方女性肖像，丝绸质感，哈苏画质
    previewUrl: 'https://images.unsplash.com/photo-1542513217-0b0eed3a16ad?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Professional high-end fashion photography of a 25-year-old Chinese woman, refined Eastern bone structure, porcelain skin, wearing a minimalist modern silk dress, cinematic chiaroscuro lighting, 8k resolution, Hasselblad texture.'
  },
  nature: {
    path: 'assets/images/scene/nature.webp',
    // 匹配：黄山云海，水墨意境风光摄影
    previewUrl: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Grand landscape of Zhangjiajie pillar mountains, morning mist, traditional Chinese ink-painting atmosphere but photorealistic, morning golden hour light, epic spatial scale, 8k resolution.'
  },
  miniature: {
    path: 'assets/images/scene/miniature.webp',
    // 匹配：苏州园林微缩模型，极致微距细节
    previewUrl: 'https://images.unsplash.com/photo-1584433305355-9cb73387ee61?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Macro photography of a handcrafted 1:50 scale Suzhou garden model, exquisite wood carving, tiny koi pond with light refraction, tilt-shift aesthetic, hyper-detailed.'
  },
  vintage: {
    path: 'assets/images/scene/vintage.webp',
    // 匹配：明制汉服，25岁东方女性，江南雅韵
    previewUrl: 'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Cinematic portrait of a 25-year-old woman in Ming Dynasty Hanfu, performing tea ceremony, soft morning window light, Jiangnan scholar study, muted elegant colors, historical accuracy.'
  },
  artistic: {
    path: 'assets/images/scene/artistic.webp',
    // 匹配：敦煌壁画风格数字艺术
    previewUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Fine art digital painting, fusion of Dunhuang mural style and modern abstract art, celestial flying goddess, mineral pigments, gold leaf textures, surreal composition.'
  },
  commercial: {
    path: 'assets/images/scene/commercial.webp',
    // 匹配：高端珠宝/中式美妆商业摄影
    previewUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Commercial studio shot of a luxury jade carving pendant, white porcelain background, caustic light reflections, sharp macro detail, premium jewelry photography.'
  },
  stilllife: {
    path: 'assets/images/scene/stilllife.webp',
    // 匹配：汝窑瓷器，禅意静物
    previewUrl: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Still life photography of a Ru-ware celadon tea set, single plum blossom branch, weathered wood texture, Zen minimalism, high contrast natural light.'
  },
  space: {
    path: 'assets/images/scene/space.webp',
    // 匹配：新中式建筑空间，极简光影
    previewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Architectural photography of a modern Zen interior, circular moon gate, bamboo shadows on concrete walls, minimalist luxury, perfect perspective, 8k.'
  },
  future: {
    path: 'assets/images/scene/future.webp',
    // 匹配：赛博汉风，25岁东方女飞行员
    previewUrl: 'https://images.unsplash.com/photo-1503891450247-ee5f8ec36bd6?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Cyberpunk Chongqing cityscape at night, Neo-Hanfu tech-wear on a 25-year-old Chinese pilot, glowing holographic red lanterns, jade energy circuits, anamorphic lens flares.'
  },
  narrative: {
    path: 'assets/images/scene/narrative.webp',
    // 匹配：电影质感，雨夜邂逅，叙事氛围
    previewUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Movie still, a 25-year-old Chinese man and woman meeting under a rainy bus stop in 1990s Shanghai, warm nostalgic street lamp, cinematic longing, ARRI Alexa look.'
  },
  emotional: {
    path: 'assets/images/scene/emotional.webp',
    // 匹配：高级情绪，孤独与哲思，Wabi-sabi 审美
    previewUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Profound silence, a 25-year-old scholar watching rain from a pavilion, negative space, Wabi-sabi aesthetic, muted tones, deep emotional resonance.'
  },
  fresh: {
    path: 'assets/images/scene/fresh.webp',
    // 匹配：25岁清纯东方女性，生活气息，高调空气感
    previewUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop',
    prompt: 'Lifestyle photography, 25-year-old Chinese woman with clear skin and natural hair, wearing white linen, bright airy morning light, high-key aesthetic, pure and innocent mood.'
  }
};

export const GALLERY_ASSETS = {
  p1: {
    path: 'assets/images/gallery/p1.webp',
    previewUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
    prompt: 'Editorial portrait of a Chinese model in "Dragon Scales" haute couture, high micro-contrast, red and gold palette, fierce but elegant gaze.'
  },
  p2: {
    path: 'assets/images/gallery/p2.webp',
    previewUrl: 'https://images.unsplash.com/photo-1524055988636-43b1daad9e29?auto=format&fit=crop&q=80&w=800',
    prompt: 'Landscape of misty yellow mountains, vertical composition, a single pine tree emerging from clouds, ink-wash spirit, 100MP detail.'
  },
  p3: {
    path: 'assets/images/gallery/p3.webp',
    previewUrl: 'https://images.unsplash.com/photo-1627063411429-7188dd741db8?auto=format&fit=crop&q=80&w=800',
    prompt: 'Close up of a 25-year-old female face with traditional Peking Opera makeup elements, sharp focus on eyes, dramatic theater lighting.'
  }
};
