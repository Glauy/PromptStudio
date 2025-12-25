
/**
 * AI 视觉创作 DSL 类型定义
 */

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

export interface Preset {
  id: string;
  title: string;
  sceneId: SceneId;
  data: Partial<StructuredPrompt>;
  author: string;
}

export type PromptWeights = Partial<Record<keyof StructuredPrompt, number>>;

export type SceneId = 
  | 'portrait'
  | 'nature'
  | 'miniature'
  | 'emotional'
  | 'fresh'
  | 'vintage'
  | 'artistic'
  | 'commercial'
  | 'stilllife'
  | 'space'
  | 'future'
  | 'narrative';

export type UserMode = 'beginner' | 'advanced' | 'expert';

export type DisplayType = 'tags' | 'grid' | 'dropdown' | 'text';
export type FieldValueType = 'text' | 'enum' | 'range' | 'multi';

export interface FieldOption {
  label: string;
  value: string;
  description?: string;
  defaultWeight?: number;
}

export interface FieldSchema {
  label: string;
  valueType: FieldValueType;
  displayType?: DisplayType;
  isRequired?: boolean;
  isRecommended?: boolean;
  minVisibility: UserMode;
  minEditable: UserMode;
  editableWeightInExpert: boolean;
  options?: FieldOption[];
  priority: number;
  placeholder?: string;
}

export interface SceneDefinition {
  id: SceneId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  isAvailable?: boolean;
  fields: Partial<Record<keyof StructuredPrompt, FieldSchema>>;
  defaults: Partial<StructuredPrompt>;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  coverImage: string;
}
