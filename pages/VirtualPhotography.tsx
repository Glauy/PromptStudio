
import React, { useState, useMemo, useEffect } from 'react';
import { PhotographySession, PhotographyShot, PhotographyMode } from '../types';
import { generateVisual, compilePhotographyPrompt } from '../services/gemini';
import { HIGHLIGHT_CONFIGS, getPresetsForHighlight } from '../data/highlights';
import ImageModal from '../components/common/ImageModal';
import PhotographyHeader from '../components/virtual-photography/PhotographyHeader';
import PhotographySidebar from '../components/virtual-photography/PhotographySidebar';
import PhotographyViewport from '../components/virtual-photography/PhotographyViewport';
import PhotographyHistory from '../components/virtual-photography/PhotographyHistory';

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
  const [sessionResults, setSessionResults] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<string[]>([]);
  
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
      setHistory(prev => [url, ...prev].slice(0, 20));
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="h-screen bg-[#F5F5F7] text-[#1A1A1C] flex flex-col overflow-hidden relative paper-texture">
      {/* 沉浸式顶部导航 - 支持自动隐藏 */}
      <PhotographyHeader 
        sessions={sessions}
        activeSessionId={activeSessionId}
        /* Fix: Corrected typo in function name to fix 'Cannot find name setActiveSceneId' error */
        onSessionSelect={setActiveSessionId}
        mode={mode}
        onModeChange={setMode}
        activeSessionTitle={activeSession.title}
      />

      {/* 主创作空间 */}
      <main className="flex-1 flex overflow-hidden">
        {/* 左侧：专业控制塔 */}
        <PhotographySidebar 
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

        {/* 右侧：工作视口与历史长廊 */}
        <div className="flex-1 flex flex-col relative bg-zinc-50/10">
          <PhotographyViewport 
            imageUrl={sessionResults[`${activeSessionId}-${activeShotId}`]}
            isRendering={isRendering}
            prompt={compilePhotographyPrompt(activeSession, activeShot)}
            onExpand={() => setPreviewOpen(true)}
          />
          
          {/* 历史记录胶片 */}
          <PhotographyHistory items={history} />
        </div>
      </main>

      <ImageModal 
        isOpen={previewOpen} 
        onClose={() => setPreviewOpen(false)} 
        imageUrl={sessionResults[`${activeSessionId}-${activeShotId}`] || ''} 
      />
    </div>
  );
};

export default VirtualPhotography;