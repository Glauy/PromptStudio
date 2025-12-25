
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wand2, 
  Copy, 
  RefreshCcw, 
  CheckCircle2, 
  Wand,
  Database,
  Sparkles,
  Search,
  Image as ImageIcon,
  Play,
  Zap,
  Download,
  Maximize2
} from 'lucide-react';
import { StructuredPrompt, UserMode } from '../types';
import CockpitLayout from './common/CockpitLayout';
import { generateVisual } from '../services/gemini';
import ImageModal from './common/ImageModal';

const COLOR_MAP: Record<keyof StructuredPrompt, string> = {
  subject: "text-[#2ECC71]",        
  environment: "text-[#1ABC9C]",    
  composition: "text-[#3498DB]",    
  camera: "text-[#5DADE2]",         
  cameraSettings: "text-[#85C1E9]", 
  lighting: "text-[#F1C40F]",       
  color: "text-[#E74C3C]",          
  mood: "text-[#9B59B6]",           
  style: "text-[#AF7AC5]",          
  medium: "text-[#AAB7B8]",         
  quality: "text-[#7F8C8D]",        
  genre: "text-[#95A5A6]",          
};

interface ProtocolRendererProps {
  data: Partial<StructuredPrompt>;
  defaults: Partial<StructuredPrompt>;
  mode: UserMode;
  weights?: Record<string, number>;
  fieldOrder: (keyof StructuredPrompt)[];
  isDraft?: boolean;
}

const ProtocolRenderer: React.FC<ProtocolRendererProps> = ({ data, defaults, mode, weights, fieldOrder, isDraft }) => {
  const renderEntries = useMemo(() => {
    return fieldOrder
      .map(key => {
        const userValue = data[key];
        const defaultValue = defaults[key];
        const isGhost = !userValue && !!defaultValue;
        return { 
          key, 
          value: userValue || defaultValue, 
          isGhost 
        };
      })
      .filter(item => !!item.value);
  }, [data, defaults, fieldOrder]);
  
  if (renderEntries.length === 0) return null;

  return (
    <div className={`flex flex-col items-center space-y-4 w-full text-center transition-all duration-500 px-6`}>
      {renderEntries.map(({ key, value, isGhost }, index) => {
        const fieldKey = key as keyof StructuredPrompt;
        const colorClass = COLOR_MAP[fieldKey] || "text-zinc-500";
        const weight = weights?.[fieldKey];
        const displayVal = (mode === 'expert' && weight && weight !== 100) 
          ? `(${value}:${(weight / 100).toFixed(1)})` 
          : value;

        return (
          <div key={fieldKey} className={`group/item transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-default ${isGhost ? 'opacity-20 italic' : ''} w-full`}>
            <span className={`${colorClass} font-mono text-[15px] leading-relaxed tracking-tight font-semibold block`}>
              {displayVal}{index < renderEntries.length - 1 ? ',' : ''}
            </span>
            {isGhost && isDraft && (
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-700 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                系统桩点
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface PromptOutputPanelProps {
  promptData: Partial<StructuredPrompt>;
  defaults: Partial<StructuredPrompt>;
  optimizedData: Partial<StructuredPrompt>;
  weights: Record<string, number>;
  fieldOrder: (keyof StructuredPrompt)[];
  mode: UserMode;
  isOptimizing: boolean;
  onOptimize: () => void;
  onCopy: (text: string) => void;
  onReset: () => void;
  onRenderSuccess?: (url: string) => void;
}

const PromptOutputPanel: React.FC<PromptOutputPanelProps> = ({
  promptData,
  defaults,
  optimizedData,
  weights,
  fieldOrder,
  mode,
  isOptimizing,
  onOptimize,
  onCopy,
  onReset,
  onRenderSuccess,
}) => {
  const [viewMode, setViewMode] = useState<'base' | 'enhanced' | 'visual'>('base');
  const [copied, setCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [simulationMode, setSimulationMode] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(optimizedData).length > 0) {
      setViewMode('enhanced');
    }
  }, [optimizedData]);

  const getMergedOrderedText = (data: Partial<StructuredPrompt>) => {
    const sourceData = { ...defaults, ...data };
    return fieldOrder
      .map(key => sourceData[key])
      .filter(Boolean)
      .join(', ');
  };

  const handleCopy = () => {
    const activeData = viewMode === 'enhanced' && Object.keys(optimizedData).length > 0 ? optimizedData : promptData;
    onCopy(getMergedOrderedText(activeData));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRender = async () => {
    setViewMode('visual');
    setIsRendering(true);
    const activeData = Object.keys(optimizedData).length > 0 ? optimizedData : promptData;
    const finalPrompt = getMergedOrderedText(activeData);
    
    try {
      const url = await generateVisual(finalPrompt, simulationMode);
      setGeneratedImageUrl(url);
      if (onRenderSuccess) onRenderSuccess(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRendering(false);
    }
  };

  const hasEnhanced = Object.keys(optimizedData).length > 0;

  return (
    <CockpitLayout
      header={{ title: "指令驾驶舱", version: "V3.5 准则" }}
      tabs={{
        activeId: viewMode,
        onChange: (id) => setViewMode(id),
        options: [
          { 
            id: 'base', 
            label: '基础协议', 
            subLabel: '架构层', 
            icon: <Database className="w-3.5 h-3.5" /> 
          },
          { 
            id: 'enhanced', 
            label: '智能润色', 
            subLabel: '增强层', 
            disabled: !hasEnhanced && !isOptimizing,
            icon: <Sparkles className={`w-3.5 h-3.5 ${hasEnhanced ? 'text-blue-400' : ''}`} /> 
          },
          {
            id: 'visual',
            label: '视觉核心',
            subLabel: '渲染层',
            icon: <ImageIcon className="w-3.5 h-3.5" />
          }
        ]
      }}
      footer={
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              <div 
                onClick={() => setSimulationMode(!simulationMode)}
                className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors duration-300 ${simulationMode ? 'bg-blue-600' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${simulationMode ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                {simulationMode ? '模拟渲染模式' : '真实引擎模式'}
              </span>
            </div>
            {viewMode === 'visual' && generatedImageUrl && !isRendering && (
               <button className="text-zinc-500 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
               </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleRender}
              disabled={isRendering}
              className={`flex-1 flex items-center justify-center py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl bg-white text-black hover:bg-zinc-200 shadow-white/5 border border-white/10`}
            >
              {isRendering ? (
                <Zap className="w-4 h-4 mr-3 animate-spin text-blue-500" />
              ) : (
                <Play className="w-4 h-4 mr-3 fill-current" />
              )}
              {isRendering ? '正在编译像素阵列' : '一键渲染视觉作品'}
            </button>

            <div className="flex space-x-2">
              <button 
                onClick={handleCopy}
                title="拷贝指令"
                className={`w-16 h-16 flex items-center justify-center bg-zinc-900 border rounded-2xl transition-all group
                  ${copied ? 'border-green-500 text-green-500' : 'border-white/10 text-zinc-500 hover:text-white'}`}
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5 group-hover:scale-110" />}
              </button>
              <button 
                onClick={onOptimize}
                disabled={isOptimizing}
                title="AI 润色"
                className={`w-16 h-16 flex items-center justify-center bg-zinc-900 border rounded-2xl transition-all disabled:opacity-30 group
                  ${hasEnhanced ? 'border-blue-500/30 text-blue-400' : 'border-white/10 text-zinc-500 hover:text-blue-500 hover:border-blue-500/50'}`}
              >
                <Wand2 className={`w-5 h-5 group-hover:rotate-12 transition-transform ${isOptimizing ? 'animate-pulse text-blue-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      }
    >
      <ImageModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        imageUrl={generatedImageUrl || ''}
        title="AI 视觉创作实验室作品"
        description={getMergedOrderedText(Object.keys(optimizedData).length > 0 ? optimizedData : promptData)}
      />

      {viewMode === 'visual' ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
          {isRendering ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 animate-pulse"></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-2">光影特征提取中</p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">正在解析视觉 DNA 权重...</p>
              </div>
            </div>
          ) : generatedImageUrl ? (
            <div className="relative group w-full animate-in zoom-in-95 duration-700">
               <div className="absolute -inset-4 bg-blue-500/10 blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
               <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                 <img 
                   src={generatedImageUrl} 
                   alt="AI Generated" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <button 
                      onClick={() => setIsPreviewOpen(true)}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white border border-white/20 hover:bg-white/20 transition-colors"
                    >
                       <Maximize2 className="w-3 h-3" />
                       <span>全屏预览</span>
                    </button>
                 </div>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center opacity-20 text-center space-y-6 pt-16">
                <ImageIcon className="w-16 h-16" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em]">等待渲染引擎就绪</p>
            </div>
          )}
        </div>
      ) : isOptimizing ? (
        <div className="flex flex-col items-center space-y-8 pt-16">
           <div className="relative">
             <div className="w-20 h-20 rounded-full border-[3px] border-zinc-900 border-t-blue-500 animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-400 animate-pulse" />
             </div>
           </div>
           <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-2">DSL 协议深度重构中</p>
             <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">审美特征向量编译中...</p>
           </div>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center w-full">
          {viewMode === 'base' ? (
             <ProtocolRenderer 
               data={promptData} 
               defaults={defaults}
               mode={mode} 
               weights={weights} 
               fieldOrder={fieldOrder} 
               isDraft 
             />
          ) : hasEnhanced ? (
             <ProtocolRenderer 
               data={optimizedData} 
               defaults={{}} 
               mode={mode} 
               fieldOrder={fieldOrder} 
             />
          ) : (
             <div className="flex flex-col items-center opacity-20 text-center space-y-6 pt-16">
                <Wand className="w-16 h-16" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em]">等待 AI 同步指令</p>
             </div>
          )}
        </div>
      )}
    </CockpitLayout>
  );
};

export default PromptOutputPanel;
