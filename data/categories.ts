
import { Category } from '../types';
import { SCENE_ASSETS } from './assets';

export const CATEGORIES: Category[] = [
  { 
    id: 'portrait', 
    name: '人物肖像', 
    nameEn: 'Portrait', 
    icon: 'User', 
    description: '东方骨相美学与光影质感。', 
    coverImage: SCENE_ASSETS.portrait.path
  },
  { 
    id: 'nature', 
    name: '自然风景', 
    nameEn: 'Nature', 
    icon: 'Trees', 
    description: '山川湖海的壮阔，控制空间与自然光。', 
    coverImage: SCENE_ASSETS.nature.path
  },
  { 
    id: 'miniature', 
    name: '微缩世界', 
    nameEn: 'Miniature World', 
    icon: 'Search', 
    description: '微观宇宙奇迹，极致细节与景深。', 
    coverImage: SCENE_ASSETS.miniature.path
  },
  { 
    id: 'vintage', 
    name: '古风复古', 
    nameEn: 'Ancient Grace', 
    icon: 'Film', 
    description: '唐宋风华与明清雅韵的深度重构。', 
    coverImage: SCENE_ASSETS.vintage.path
  },
  { 
    id: 'artistic', 
    name: '艺术插画', 
    nameEn: 'Artistic Vision', 
    icon: 'Palette', 
    description: '敦煌壁画、工笔重彩与现代数字艺术。', 
    coverImage: SCENE_ASSETS.artistic.path
  },
  { 
    id: 'commercial', 
    name: '商业摄影', 
    nameEn: 'Commercial', 
    icon: 'Briefcase', 
    description: '极致清晰度与高端国潮产品质感。', 
    coverImage: SCENE_ASSETS.commercial.path
  },
  { 
    id: 'stilllife', 
    name: '静物摄影', 
    nameEn: 'Still Life', 
    icon: 'Box', 
    description: '宋瓷、茶道等禅意静谧之美。', 
    coverImage: SCENE_ASSETS.stilllife.path
  },
  { 
    id: 'space', 
    name: '空间摄影', 
    nameEn: 'Architectural Space', 
    icon: 'Home', 
    description: '新中式建筑线条与极简空间美学。', 
    coverImage: SCENE_ASSETS.space.path
  },
  { 
    id: 'future', 
    name: '未来视觉', 
    nameEn: 'Neo-Futurism', 
    icon: 'Cpu', 
    description: '赛博汉风与新中式科幻美学。', 
    coverImage: SCENE_ASSETS.future.path
  },
  { 
    id: 'narrative', 
    name: '叙事视觉', 
    nameEn: 'Cinematic Story', 
    icon: 'MessageSquare', 
    description: '电影感瞬间与情绪驱动的构图。', 
    coverImage: SCENE_ASSETS.narrative.path
  },
  { 
    id: 'emotional', 
    name: '高级情绪', 
    nameEn: 'Cinematic Mood', 
    icon: 'Heart', 
    description: '电影叙事感，用光影诉说未竟之言。', 
    coverImage: SCENE_ASSETS.emotional.path
  },
  { 
    id: 'fresh', 
    name: '文艺清新', 
    nameEn: 'Fresh Aesthetic', 
    icon: 'Sun', 
    description: '通透空气感与高调明朗的生活切片。', 
    coverImage: SCENE_ASSETS.fresh.path
  }
];
