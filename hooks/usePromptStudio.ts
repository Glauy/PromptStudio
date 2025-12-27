
import { useState, useEffect, useMemo, useCallback } from 'react';
import { SceneId, StructuredPrompt, UserMode, PromptWeights, FieldSchema, Preset } from '../types';
import { SCENE_DEFINITIONS } from '../data/constants';
import { OFFICIAL_SCENE_PRESETS } from '../data/scene_presets';
import { optimizePromptStructured } from '../services/gemini';
import { HistoryItem } from '../components/RenderingHistory';

const MODE_RANK: Record<UserMode, number> = {
  'beginner': 1,
  'advanced': 2,
  'expert': 3
};

export function usePromptStudio() {
  const [activeSceneId, setActiveSceneId] = useState<SceneId>('portrait');
  const [mode, setMode] = useState<UserMode>('beginner');
  const [promptData, setPromptData] = useState<Partial<StructuredPrompt>>({});
  const [weights, setWeights] = useState<PromptWeights>({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState<Partial<StructuredPrompt>>({});
  const [activePreset, setActivePreset] = useState<Preset | null>(null);
  const [showDsl, setShowDsl] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  const scene = useMemo(() => SCENE_DEFINITIONS[activeSceneId] || SCENE_DEFINITIONS['portrait'], [activeSceneId]);
  const sceneDefaults = useMemo(() => OFFICIAL_SCENE_PRESETS[activeSceneId]?.data || {}, [activeSceneId]);

  const fieldPriority = useMemo(() => {
    return (Object.entries(scene.fields) as [keyof StructuredPrompt, FieldSchema][])
      .sort((a, b) => a[1].priority - b[1].priority)
      .map(([key]) => key);
  }, [scene]);

  // 必填项校验逻辑
  const missingFields = useMemo(() => {
    return (Object.entries(scene.fields) as [keyof StructuredPrompt, FieldSchema][])
      .filter(([key, schema]) => schema.isRequired && !promptData[key]?.trim())
      .map(([_, schema]) => schema.label);
  }, [scene, promptData]);

  const isValid = missingFields.length === 0;

  // 外部事件监听：模式切换
  useEffect(() => {
    const handleExternalModeChange = (e: any) => {
      const newMode = e.detail as UserMode;
      if (newMode !== mode) setMode(newMode);
    };
    window.addEventListener('app:mode-change', handleExternalModeChange);
    return () => window.removeEventListener('app:mode-change', handleExternalModeChange);
  }, [mode]);

  // 外部事件监听：重用预设 + 视图跳转
  useEffect(() => {
    const handleReuse = (e: any) => {
      const preset = e.detail as Preset;
      
      // 1. 切换场景
      setActiveSceneId(preset.sceneId);
      
      // 2. 异步填充数据并执行跳转
      setTimeout(() => {
        setPromptData({ ...preset.data });
        setActivePreset(preset);
        setOptimizedData({});
        setMode('advanced');
        
        // 核心修复：执行平滑跳转至实验室区域
        const labElement = document.getElementById('lab');
        if (labElement) {
          labElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50); // 微小延迟确保状态响应
    };
    window.addEventListener('app:reuse-preset', handleReuse);
    return () => window.removeEventListener('app:reuse-preset', handleReuse);
  }, []);

  // 权重初始化
  useEffect(() => {
    const initialWeights: PromptWeights = {};
    (Object.entries(scene.fields) as [keyof StructuredPrompt, FieldSchema][]).forEach(([key]) => {
      initialWeights[key] = 100;
    });
    setWeights(initialWeights);
  }, [activeSceneId, scene]);

  const handleInputChange = useCallback((key: keyof StructuredPrompt, value: string) => {
    setPromptData(prev => ({ ...prev, [key]: value }));
    const opt = scene.fields[key]?.options?.find(o => o.value === value);
    if (opt?.defaultWeight) setWeights(prev => ({ ...prev, [key]: opt.defaultWeight }));
  }, [scene]);

  const getMergedData = useCallback(() => {
    const merged: Partial<StructuredPrompt> = { ...sceneDefaults };
    (Object.keys(promptData) as Array<keyof StructuredPrompt>).forEach(key => {
      if (promptData[key]?.trim()) {
        merged[key] = promptData[key];
      }
    });
    return merged;
  }, [sceneDefaults, promptData]);

  const handleOptimize = async () => {
    if (!isValid) return;
    const dataToOptimize = getMergedData();
    setIsOptimizing(true);
    
    window.dispatchEvent(new CustomEvent('app:debug-log', { 
      detail: { type: 'request', content: dataToOptimize } 
    }));

    const rawInput = Object.values(dataToOptimize).filter(Boolean).join(', ');
    const result = await optimizePromptStructured(rawInput);
    
    setOptimizedData(result);
    window.dispatchEvent(new CustomEvent('app:debug-log', { 
      detail: { type: 'response', content: result } 
    }));
    setIsOptimizing(false);
  };

  const handleReset = useCallback(() => {
    setPromptData({});
    setOptimizedData({});
    setActivePreset(null);
  }, []);

  const handleRenderSuccess = useCallback((url: string) => {
    const activeData = Object.keys(optimizedData).length > 0 ? optimizedData : promptData;
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      data: { ...activeData },
      timestamp: Date.now()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 10));
  }, [optimizedData, promptData]);

  const handleRestoreFromHistory = useCallback((item: HistoryItem) => {
    setPromptData({ ...item.data });
    setOptimizedData({});
    setActivePreset(null);
    
    // 从历史记录恢复时也执行跳转
    document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const isFieldVisible = (schema: FieldSchema) => MODE_RANK[mode] >= MODE_RANK[schema.minVisibility];
  const canEditField = (schema: FieldSchema) => MODE_RANK[mode] >= MODE_RANK[schema.minEditable];

  return {
    // 状态
    activeSceneId, setActiveSceneId,
    mode, setMode,
    promptData, weights,
    isOptimizing, optimizedData,
    activePreset, setActivePreset,
    showDsl, setShowDsl,
    history, setHistory,
    isLookbookOpen, setIsLookbookOpen,
    
    // 计算属性
    scene,
    sceneDefaults,
    fieldPriority,
    missingFields,
    isValid,
    
    // 方法
    handleInputChange,
    handleOptimize,
    handleReset,
    handleRenderSuccess,
    handleRestoreFromHistory,
    isFieldVisible,
    canEditField
  };
}
