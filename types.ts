
/**
 * 虚拟摄影工作流模式
 */
export type PhotographyMode = 'script' | 'portrait';

// Fix: Add UserMode definition used for controlling interface complexity levels
export type UserMode = 'beginner' | 'advanced' | 'expert';

// Fix: Add SceneId definition for all supported visual categories
export type SceneId = 
  | 'portrait' 
  | 'nature' 
  | 'miniature' 
  | 'vintage' 
  | 'artistic' 
  | 'commercial' 
  | 'stilllife' 
  | 'space' 
  | 'future' 
  | 'narrative' 
  | 'emotional' 
  | 'fresh';

// Fix: Add Category interface for the scene gallery component
export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  coverImage: string;
}

// Fix: Add FieldOption interface for DSL parameter options
export interface FieldOption {
  label: string;
  value: string;
  description?: string;
  defaultWeight?: number;
}

// Fix: Add FieldSchema interface for defining DSL input fields
export interface FieldSchema {
  valueType: 'text' | 'enum' | 'number';
  displayType?: 'grid' | 'tags' | 'slider';
  label: string;
  minVisibility: UserMode;
  minEditable: UserMode;
  editableWeightInExpert?: boolean;
  options?: FieldOption[];
  priority: number;
  placeholder?: string;
  isRequired?: boolean;
  isRecommended?: boolean;
}

// Fix: Add SceneDefinition interface for defining domain-specific visual spaces
export interface SceneDefinition {
  id: SceneId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  fields: Record<string, FieldSchema>;
}

// Fix: Add Asset interface for managing visual resources
export interface Asset {
  id: string;
  path: string;
  previewUrl: string;
  tags: string[];
}

// Fix: Add Preset interface for style templates
export interface Preset {
  id: string;
  assetId?: string;
  url?: string;
  title: string;
  sceneId: SceneId;
  author: string;
  prompt?: string;
  data: Partial<StructuredPrompt>;
}

// Fix: Add Highlight interface for curated community collections
export interface Highlight {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  featuredPresetIds: string[];
  tags: string[];
  coverUrl: string;
  issueNumber: string;
}

// Fix: Add PromptWeights type definition for expert-level fine-tuning
export type PromptWeights = Record<string, number>;

/**
 * 虚拟写真会话扩展
 */
export interface PortraitSession {
  /** 原始上传图片的 base64 数据 */
  referenceImage?: string;
  /** 是否已提取面部特征 */
  identityLocked: boolean;
}

export interface PhotographyShot {
  id: string;
  label: string;
  composition: string;
  pose: string;
  narrative: string;
  previewUrl?: string;
  isGenerated?: boolean;
}

export interface PhotographySession {
  id: string;
  title: string;
  /** L1: 摄影系统 (光学/硬件协议) */
  system: {
    cameraBody: string;
    lens: string;
    lightingRig: string;
    colorScience: string;
  };
  /** L2: 主体协议 (DNA/身份协议) */
  persona: {
    modelId: string;
    features: string;
    outfit: string;
    temperament: string;
  };
  /** L3: 分镜脚本 (动作/执行协议) */
  shots: PhotographyShot[];
}

export interface StructuredPrompt {
  subject?: string;
  environment?: string;
  composition?: string;
  camera?: string;
  cameraSettings?: string;
  lighting?: string;
  color?: string;
  medium?: string;
  style?: string;
  genre?: string;
  mood?: string;
  quality?: string;
}
