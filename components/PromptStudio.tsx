
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sliders,
  Edit3,
  CheckCircle2,
  User,
  Trees,
  Search,
  Heart,
  Sun,
  Film,
  Palette,
  Briefcase,
  Box,
  Home,
  Cpu,
  MessageSquare,
  Sparkles,
  Lock,
  XCircle,
  Link,
  Code2,
  Activity,
  RotateCcw
} from 'lucide-react';
import { SceneId, StructuredPrompt, UserMode, PromptWeights, FieldSchema, Preset } from '../types';
import { SCENE_DEFINITIONS } from '../data/scenes';
import { optimizePromptStructured } from '../services/gemini';
import PromptOutputPanel from './PromptOutputPanel';
import DslInspector from './DslInspector';
import Select, { SelectOption } from './common/Select';
import AutoResizeTextarea from './common/AutoResizeTextarea';
import RenderingHistory, { HistoryItem } from './RenderingHistory';

const ICON_MAP: Record<string, React.ReactNode> = {
  'User': <User className="w-4 h-4" />,
  'Trees': <Trees className="w-4 h-4" />,
  'Search': <Search className="w-4 h-4" />,
  'Heart': <Heart className="w-4 h-4" />,
  'Sun': <Sun className="w-4 h-4" />,
  'Film': <Film className="w-4 h-4" />,
  'Palette': <Palette className="w-4 h-4" />,
  'Briefcase': <Briefcase className="w-4 h-4" />,
  'Box': <Box className="w-4 h-4" />,
  'Home': <Home className="w-4 h-4" />,
  'Cpu': <Cpu className="w-4 h-4" />,
  'MessageSquare': <MessageSquare className="w-4 h-4" />,
};

const MODE_RANK: Record<UserMode, number> = {
  'beginner': 1,
  'advanced': 2,
  'expert': 3
};

const PromptStudio: React.FC = () => {
  const [activeSceneId, setActiveSceneId] = useState<SceneId>('portrait');
  const [mode, setMode] = useState<UserMode>('beginner');
  const [promptData, setPromptData] = useState<Partial<StructuredPrompt>>({});
  const [weights, setWeights] = useState<PromptWeights>({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState<Partial<StructuredPrompt>>({});
  const [activePreset, setActivePreset] = useState<Preset | null>(null);
  const [showDsl, setShowDsl] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 使用 useMemo 获取当前场景配置，确保引用稳定
  const scene = useMemo(() => SCENE_DEFINITIONS[activeSceneId] || SCENE_DEFINITIONS['portrait'], [activeSceneId]);

  const fieldPriority = useMemo(() => {
    return (Object.entries(scene.fields) as [keyof StructuredPrompt, FieldSchema][])
      .sort((a, b) => a[1].priority - b[1].priority)
      .map(([key]) => key);
  }, [scene]);

  useEffect(() => {
    const handleReuse = (e: any) => {
      const preset = e.detail as Preset;
      setActiveSceneId(preset.sceneId);
      // 这里的设置依赖于 activeSceneId 的同步更新，放在一个宏任务中确保状态流一致
      setTimeout(() => {
        setPromptData({ ...preset.data });
        setActivePreset(preset);
        setOptimizedData({});
        setMode('advanced');
      }, 0);
      document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('app:reuse-preset', handleReuse);
    return () => window.removeEventListener('app:reuse-preset', handleReuse);
  }, []);

  useEffect(() => {
    const initialWeights: PromptWeights = {};
    (Object.entries(scene.fields) as [keyof StructuredPrompt, FieldSchema][]).forEach(([key]) => {
      initialWeights[key] = 100;
    });
    setWeights(initialWeights);
  }, [activeSceneId, scene]);

  const handleInputChange = (key: keyof StructuredPrompt, value: string) => {
    setPromptData(prev => ({ ...prev, [key]: value }));
    const opt = scene.fields[key]?.options?.find(o => o.value === value);
    if (opt?.defaultWeight) setWeights(prev => ({ ...prev, [key]: opt.defaultWeight }));
  };

  const getMergedData = () => {
    const merged: Partial<StructuredPrompt> = { ...scene.defaults };
    (Object.keys(promptData) as Array<keyof StructuredPrompt>).forEach(key => {
      if (promptData[key]?.trim()) {
        merged[key] = promptData[key];
      }
    });
    return merged;
  };

  const handleMagic = async () => {
    const dataToOptimize = getMergedData();
    setIsOptimizing(true);
    window.dispatchEvent(new CustomEvent('app:debug-log', { detail: { type: 'request', content: dataToOptimize } }));
    const rawInput = Object.values(dataToOptimize).filter(Boolean).join(', ');
    const result = await optimizePromptStructured(rawInput);
    setOptimizedData(result);
    window.dispatchEvent(new CustomEvent('app:debug-log', { detail: { type: 'response', content: result } }));
    setIsOptimizing(false);
  };

  const handleReset = () => {
    setPromptData({});
    setOptimizedData({});
    setActivePreset(null);
  };

  const handleSceneChange = (val: SceneId) => {
    if (val === activeSceneId) return;
    // 切换场景时执行完整重置
    setActiveSceneId(val);
    setPromptData({});
    setOptimizedData({});
    setActivePreset(null);
  };

  const handleRenderSuccess = (url: string) => {
    const activeData = Object.keys(optimizedData).length > 0 ? optimizedData : promptData;
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      data: { ...activeData },
      timestamp: Date.now()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 10));
  };

  const handleRestoreFromHistory = (item: HistoryItem) => {
    setPromptData({ ...item.data });
    setOptimizedData({});
    setActivePreset(null);
    document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sceneOptions: SelectOption[] = useMemo(() => {
    return Object.values(SCENE_DEFINITIONS)
      .filter(s => s.id)
      .map(s => ({
        label: s.name,
        value: s.id,
        subLabel: s.nameEn,
        icon: ICON_MAP[s.icon],
        disabled: s.isAvailable === false
      }));
  }, []);

  const isFieldVisible = (schema: FieldSchema) => {
    return MODE_RANK[mode] >= MODE_RANK[schema.minVisibility];
  };

  const canEditManually = (schema: FieldSchema) => {
    return MODE_RANK[mode] >= MODE_RANK[schema.minEditable];
  };

  const renderField = (fieldKey: keyof StructuredPrompt, schema: FieldSchema, index: number) => {
    const value = promptData[fieldKey] || '';
    const editable = canEditManually(schema);
    const hasOptions = (schema.options?.length || 0) > 0;
    const isSubjectField = fieldKey === 'subject';
    
    const isOriginalFromPreset = activePreset && activePreset.data[fieldKey] === value;
    const isModifiedFromPreset = activePreset && activePreset.data[fieldKey] !== undefined && activePreset.data[fieldKey] !== value;

    const inputClasses = `w-full bg-white border rounded-2xl px-6 text-sm transition-all outline-none 
      ${isOriginalFromPreset ? 'border-blue-500 ring-4 ring-blue-500/5 focus:ring-blue-500/10' : 
        isModifiedFromPreset ? 'border-amber-400 ring-4 ring-amber-400/5 focus:ring-amber-400/10' : 
        editable ? 'border-zinc-200 focus:ring-2 focus:ring-zinc-900 shadow-sm' : 'border-zinc-100 bg-zinc-50/50 text-zinc-400 cursor-not-allowed'}
    `;

    return (
      <div 
        key={fieldKey} 
        className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-bold text-zinc-800">{schema.label}</label>
            {schema.isRecommended && <Sparkles className="w-3 h-3 text-blue-500" />}
          </div>
          <span className="text-zinc-300 font-mono text-[10px] uppercase tracking-widest">{fieldKey}</span>
        </div>

        <div className="relative">
          {isSubjectField ? (
            <AutoResizeTextarea
              readOnly={!editable}
              value={value}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              className={`${inputClasses} py-4 pr-32`}
              placeholder={schema.placeholder || (editable ? `请输入或选择${schema.label}` : `请从下方预设选择${schema.label}`)}
            />
          ) : (
            <input
              type="text"
              readOnly={!editable}
              value={value}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              className={`${inputClasses} h-14 pr-32`}
              placeholder={schema.placeholder || (editable ? `请输入或选择${schema.label}` : `请从下方预设选择${schema.label}`)}
            />
          )}
          
          <div className={`absolute right-6 flex items-center space-x-3 pointer-events-none select-none ${isSubjectField ? 'top-5' : 'top-1/2 -translate-y-1/2'}`}>
            {isOriginalFromPreset && (
               <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2">
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">预设锁定</span>
                  <Link className="w-3.5 h-3.5 text-blue-500" />
               </div>
            )}
            {isModifiedFromPreset && (
               <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2">
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">已覆写</span>
                  <button 
                    onClick={() => handleInputChange(fieldKey, activePreset.data[fieldKey] || '')}
                    className="p-1 hover:bg-amber-100 rounded pointer-events-auto transition-colors"
                    title="回退至预设值"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  </button>
               </div>
            )}
            {!isOriginalFromPreset && !isModifiedFromPreset && (
              editable ? (
                <Edit3 className="w-4 h-4 text-zinc-300" />
              ) : (
                <Lock className="w-4 h-4 text-zinc-200" />
              )
            )}
          </div>
        </div>

        {hasOptions && (
          <div className={`transition-all duration-300 ${schema.displayType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'flex flex-wrap gap-2'}`}>
            {schema.options?.map(opt => (
              schema.displayType === 'grid' ? (
                <button
                  key={opt.value}
                  onClick={() => handleInputChange(fieldKey, opt.value)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                    value === opt.value ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900/5 shadow-md' : 'border-zinc-100 bg-zinc-50/30 hover:border-zinc-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${value === opt.value ? 'text-zinc-900' : 'text-zinc-800'}`}>{opt.label}</span>
                    {value === opt.value && <CheckCircle2 className="w-4 h-4 text-zinc-900" />}
                  </div>
                  {opt.description && <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">{opt.description}</p>}
                </button>
              ) : (
                <button
                  key={opt.value}
                  onClick={() => handleInputChange(fieldKey, opt.value)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                    value === opt.value 
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10' 
                      : 'border-zinc-100 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-black'
                  }`}
                >
                  {opt.label}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    );
  };

  const visibleFields = (Object.entries(scene.fields) as [keyof StructuredPrompt, FieldSchema][])
    .sort((a, b) => a[1].priority - b[1].priority)
    .filter(([_, schema]) => isFieldVisible(schema));

  return (
    <section id="lab" className="py-16 bg-[#F9F9FB] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center space-x-5 shrink-0">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-white rounded-2xl shadow-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-3xl font-bold serif tracking-tight">指令驾驶舱</h2>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Visual DNA Compiler v3.5</p>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            {activePreset ? (
              <div className="flex items-center space-x-4 bg-white border border-blue-500/20 pl-5 pr-3 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.08)] animate-in slide-in-from-top-4 duration-500">
                 <div className="flex items-center space-x-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   <div className="flex flex-col">
                      <div className="flex items-center space-x-2 mb-0.5">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none">正在基于预设进行创作</span>
                        <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 italic tracking-tight">《{activePreset.title}》</span>
                   </div>
                 </div>
                 <div className="w-px h-6 bg-zinc-100 mx-1"></div>
                 <button 
                  onClick={handleReset} 
                  className="p-1.5 hover:bg-red-50 text-zinc-300 hover:text-red-500 rounded-lg transition-all"
                  title="完全重置并退出预设"
                 >
                    <XCircle className="w-4 h-4" />
                 </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 opacity-20">
                 <Activity className="w-3 h-3 text-zinc-400" />
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">就绪：等待创作指令</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6 shrink-0">
            <div className="flex bg-zinc-200/50 rounded-xl p-1 border border-zinc-200 shadow-inner">
              {(['beginner', 'advanced', 'expert'] as UserMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                    mode === m ? 'bg-white text-black shadow-md' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  {m === 'beginner' ? '新手' : m === 'advanced' ? '进阶' : '专家'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          <div className="lg:col-span-7 flex flex-col lg:h-[740px] relative">
            <DslInspector data={promptData} isVisible={showDsl} onToggle={() => setShowDsl(!showDsl)} />

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-zinc-100 flex flex-col h-full relative overflow-hidden">
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="p-6 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/20 shrink-0">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-lg ${mode === 'expert' ? 'bg-red-500 shadow-red-500/50' : mode === 'advanced' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-green-500 shadow-green-500/50'}`}></div>
                      <span className="text-xs font-black uppercase tracking-widest leading-none">{mode} 模式活跃</span>
                    </div>

                    {!showDsl && (
                       <button 
                         onClick={() => setShowDsl(true)}
                         className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-400 hover:text-black transition-all bg-white shadow-sm"
                       >
                         <Code2 className="w-3 h-3" />
                         <span className="text-[9px] font-bold uppercase tracking-widest">开启 DSL 观测</span>
                       </button>
                    )}
                  </div>

                  <div className="w-[200px]">
                    <Select 
                      options={sceneOptions} 
                      value={activeSceneId} 
                      onChange={(val) => handleSceneChange(val as SceneId)}
                      className="min-w-[200px]"
                    />
                  </div>
                </div>

                <div className="p-10 space-y-12 overflow-y-auto flex-1 custom-studio-scroll">
                  {visibleFields.map(([key, schema], idx) => renderField(key as keyof StructuredPrompt, schema, idx))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:h-[740px]">
            <PromptOutputPanel 
              promptData={promptData}
              defaults={scene.defaults}
              optimizedData={optimizedData}
              weights={weights}
              fieldOrder={fieldPriority}
              mode={mode}
              isOptimizing={isOptimizing}
              onOptimize={handleMagic}
              onReset={handleReset}
              onCopy={(text) => navigator.clipboard.writeText(text)}
              onRenderSuccess={handleRenderSuccess}
            />
          </div>
        </div>

        <RenderingHistory 
          items={history} 
          onRestore={handleRestoreFromHistory}
          onClear={() => setHistory([])}
        />
      </div>
    </section>
  );
};

export default PromptStudio;
