
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, Brackets, Camera, BookOpen, Activity, LayoutGrid, Sparkles, ChevronDown } from 'lucide-react';
import { PhotographySession, PhotographyShot, PhotographyMode } from '../types';
import { generateVisual, compilePhotographyPrompt } from '../services/gemini';
import { HIGHLIGHT_CONFIGS, getPresetsForHighlight } from '../data/highlights';
import ImageModal from '../components/common/ImageModal';
import MasterViewport from '../components/virtual-photography/MasterViewport';
import ProtocolTerminal from '../components/virtual-photography/ProtocolTerminal';

/**
 * 方案工厂：将社区精选转化为摄影会话协议
 */
const createSessionFromHighlight = (config: typeof HIGHLIGHT_CONFIGS[0]): PhotographySession => {
  const primaryPreset = getPresetsForHighlight(config)[0];
  return {
    id: config.id,
    title: config.title,
    system: {
      cameraBody: primaryPreset?.data.camera || 'Hasselblad H6D-100c',
      lens: primaryPreset?.data.cameraSettings || 'HC 80mm f/1.9',
      lightingRig: primaryPreset?.data.lighting || 'Cinematic Studio Light',
      colorScience: 'Professional Color Matrix'
    },
    persona: {
      modelId: 'default-model',
      features: primaryPreset?.data.subject || 'Refined Oriental model',
      outfit: primaryPreset?.data.style || 'High-end fashion',
      temperament: config.subTitle
    },
    shots: [
      { id: `${config.id}-1`, label: '分镜 - 特写', composition: 'Extreme Close-up', pose: 'Facing Camera', narrative: '聚焦神韵与细节', previewUrl: config.coverUrl },
      { id: `${config.id}-2`, label: '分镜 - 中景', composition: 'Medium Shot', pose: 'Side Profile', narrative: '展现姿态与环境互动', previewUrl: config.coverUrl },
      { id: `${config.id}-3`, label: '分镜 - 远景', composition: 'Wide Shot', pose: 'Atmospheric', narrative: '整体氛围与叙事', previewUrl: config.coverUrl }
    ]
  };
};

const VirtualPhotography: React.FC = () => {
  const [sessions] = useState(() => HIGHLIGHT_CONFIGS.map(createSessionFromHighlight));
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [mode, setMode] = useState<PhotographyMode>('script');
  const [activeShotId, setActiveShotId] = useState(sessions[0].shots[0].id);
  const [isRendering, setIsRendering] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showDsl, setShowDsl] = useState(false);
  const [showSessionPicker, setShowSessionPicker] = useState(false);
  const [sessionResults, setSessionResults] = useState<Record<string, string>>({});
  
  const [refImage, setRefImage] = useState<string | undefined>();
  const [isLocked, setIsLocked] = useState(false);

  const activeSession = useMemo(() => sessions.find(s => s.id === activeSessionId) || sessions[0], [activeSessionId, sessions]);
  const activeShot = useMemo(() => activeSession.shots.find(s => s.id === activeShotId) || activeSession.shots[0], [activeShotId, activeSession]);

  useEffect(() => {
    setActiveShotId(activeSession.shots[0].id);
    const initializeApiKey = async () => {
      if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
        await window.aistudio.openSelectKey();
      }
    };
    initializeApiKey();
  }, [activeSessionId]);

  const handleShoot = async () => {
    if (mode === 'portrait' && !refImage) return;
    setIsRendering(true);
    const finalPrompt = compilePhotographyPrompt(activeSession, activeShot);
    try {
      const url = await generateVisual(finalPrompt, false); 
      setSessionResults(prev => ({ ...prev, [`${activeSessionId}-${activeShotId}`]: url }));
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="h-screen bg-[#FDFDFD] text-[#1A1A1C] font-sans flex flex-col overflow-hidden relative paper-texture">
      {/* 沉浸式动态光影 */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#C0392B]/5 blur-[200px] pointer-events-none"></div>

      {/* 顶部导航与方案选择器 */}
      <nav className="h-20 border-b border-zinc-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-2xl shrink-0 z-50">
        <div className="flex items-center space-x-10">
          <button onClick={() => window.dispatchEvent(new CustomEvent('app:go-home'))} className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-all border border-zinc-100 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          {/* 方案选择器按钮 */}
          <div className="relative">
            <button 
              onClick={() => setShowSessionPicker(!showSessionPicker)}
              className="flex items-center space-x-4 px-6 py-2.5 bg-zinc-900 text-white rounded-2xl shadow-xl hover:scale-[1.02] transition-all group"
            >
              <LayoutGrid className="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-colors" />
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">当前拍摄协议</span>
                <span className="text-xs font-bold serif">{activeSession.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSessionPicker ? 'rotate-180' : ''}`} />
            </button>

            {/* 下拉方案画廊 */}
            {showSessionPicker && (
              <div className="absolute top-full left-0 mt-4 w-[600px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-zinc-100 p-8 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300 z-[60]">
                {sessions.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => { setActiveSessionId(s.id); setShowSessionPicker(false); }}
                    className={`flex items-center space-x-4 p-4 rounded-3xl transition-all ${activeSessionId === s.id ? 'bg-zinc-50 ring-2 ring-red-600/20' : 'hover:bg-zinc-50'}`}
                  >
                    <img src={s.shots[0].previewUrl} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                    <div className="flex-1 text-left">
                      <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{s.persona.temperament}</p>
                      <p className="text-sm font-bold serif">{s.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex bg-zinc-100 rounded-xl p-1 border border-zinc-200">
            <button onClick={() => setMode('script')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center space-x-2 ${mode === 'script' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}>
              <BookOpen className="w-3.5 h-3.5" />
              <span>剧本模式</span>
            </button>
            <button onClick={() => setMode('portrait')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center space-x-2 ${mode === 'portrait' ? 'bg-[#C0392B] text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600'}`}>
              <Camera className="w-3.5 h-3.5" />
              <span>写真模式</span>
            </button>
          </div>
          <div className="w-px h-6 bg-zinc-100"></div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
             <Activity className="w-3.5 h-3.5 text-green-500 animate-pulse" />
             <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">Studio Engine: Live</span>
          </div>
        </div>
      </nav>

      {/* 工作台组件 (Workbench) */}
      <main className="flex-1 flex overflow-hidden z-10">
        {/* 左侧控制塔 */}
        <div className="w-[360px] border-r border-zinc-100 flex flex-col shrink-0 bg-white/60 backdrop-blur-3xl shadow-[30px_0_60px_rgba(0,0,0,0.01)] z-20 overflow-hidden">
          <ProtocolTerminal 
            session={activeSession}
            activeShotId={activeShotId}
            onShotSelect={setActiveShotId}
            mode={mode}
            refImage={refImage}
            isLocked={isLocked}
            onImageUpload={(img) => { setRefImage(img); setIsLocked(true); }}
            isRendering={isRendering}
            onShoot={handleShoot}
            sessionResults={sessionResults}
          />
        </div>

        {/* 视口区域 */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-zinc-50/20">
          <div className="flex-1 flex items-center justify-center p-12">
             <MasterViewport 
               imageUrl={sessionResults[`${activeSessionId}-${activeShotId}`]} 
               isRendering={isRendering}
               prompt={compilePhotographyPrompt(activeSession, activeShot)}
               onExpand={() => setPreviewOpen(true)}
             />
          </div>
        </div>
      </main>

      <ImageModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} imageUrl={sessionResults[`${activeSessionId}-${activeShotId}`] || ''} />
    </div>
  );
};

export default VirtualPhotography;
