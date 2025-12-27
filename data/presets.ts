
import { Preset, SceneId } from '../types';
import { OFFICIAL_SCENE_PRESETS } from './scene_presets';
import { HIGHLIGHT_PRESETS } from './highlight_presets';
import { getAssetById } from './assets';

/**
 * 社区投稿预设 (保留作为扩展接口)
 */
export const COMMUNITY_PRESETS: (Preset & { likes: string })[] = [];

/**
 * 助手函数：将预设对象中的 assetId 还原为实际的渲染数据
 * 这种模式允许 Preset 对象在存储时极简，在运行时饱满
 */
export const resolvePresetMedia = (preset: Preset): Preset => {
  if (preset.url) return preset; 
  
  if (preset.assetId) {
    const asset = getAssetById(preset.assetId);
    if (asset) {
      return {
        ...preset,
        url: asset.previewUrl
      };
    }
  }
  
  return preset;
};

/**
 * 获取指定场景下的所有可用预设（聚合官方场景预设、精选预设与社区预设）
 */
export const getPresetsByScene = (sceneId: SceneId): Preset[] => {
  const official = OFFICIAL_SCENE_PRESETS[sceneId] 
    ? [resolvePresetMedia(OFFICIAL_SCENE_PRESETS[sceneId])] 
    : [];
    
  const highlights = HIGHLIGHT_PRESETS
    .filter(p => p.sceneId === sceneId)
    .map(resolvePresetMedia);
    
  const community = COMMUNITY_PRESETS
    .filter(p => p.sceneId === sceneId)
    .map(resolvePresetMedia);
  
  return [...official, ...highlights, ...community];
};

/**
 * 全量预设平铺视图（用于搜索或广场）
 */
export const getAllPresets = (): Preset[] => {
  const allBase = [
    ...Object.values(OFFICIAL_SCENE_PRESETS),
    ...HIGHLIGHT_PRESETS,
    ...COMMUNITY_PRESETS
  ];
  return allBase.map(resolvePresetMedia);
};
