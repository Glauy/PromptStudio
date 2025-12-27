
import React, { useState, useMemo, useEffect } from 'react';
import { X, LayoutGrid, Box, ArrowLeft } from 'lucide-react';
import { Preset, SceneId } from '../types';
import { getPresetsByScene } from '../data/presets';
import { SCENE_DEFINITIONS } from '../data/constants';
import PresetCard from './PresetCard';

type LookbookVariant = 'explorer' | 'focused';

interface PresetLookbookProps {
  isOpen: boolean;
  onClose: () => void;
  initialSceneId: SceneId;
  variant?: LookbookVariant;
}

const PresetLookbook: React.FC<PresetLookbookProps> = ({ 
  isOpen, 
  onClose, 
  initialSceneId, 
  variant = 'explorer' 
}) => {
  const [activeTab, setActiveTab] = useState<SceneId>(initialSceneId);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialSceneId);
    }
  }, [isOpen, initialSceneId]);

  const isFocused = variant === 'focused';
  const sceneInfo = useMemo(() => SCENE_DEFINITIONS[activeTab], [activeTab]);
  const presets = useMemo(() => getPresetsByScene(activeTab), [activeTab]);

  const scenes = useMemo(() => {
    return Object.values(SCENE_DEFINITIONS).filter(s => s.id);
  }, []);

  if (!isOpen) return null;

  const handleApply = (preset: Preset) => {
    window.dispatchEvent(new CustomEvent('app:reuse-preset', { detail: preset }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-12">
      <div 
        className="absolute inset-0 bg-[#0A0A0B]/98 backdrop-blur-3xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      <div className={`relative w-full max-w-[1500px] h-full bg-white rounded-none sm:rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-98 slide-in-from-bottom-12 duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
        
        {!isFocused && (
          <div className="w-full md:w-[300px] bg-zinc-50 border-r border-zinc-100 flex flex-col h-[200px] md:h-auto shrink-0">
            <div className="p-8 border-b border-zinc-100 shrink-0">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <LayoutGrid className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">风格导航</h3>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">DNA Selector</p>
                 </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-studio-scroll">
              {scenes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                    activeTab === s.id 
                      ? 'bg-white shadow-lg shadow-zinc-200/50 border border-zinc-200' 
                      : 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      activeTab === s.id ? 'bg-zinc-900 text-white' : 'bg-zinc-200/50 group-hover:bg-zinc-200'
                    }`}>
                      <Box className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-bold tracking-tight ${activeTab === s.id ? 'text-zinc-900' : 'text-zinc-500'}`}>
                        {s.name}
                      </p>
                    </div>
                  </div>
                  {activeTab === s.id && <div className="w-1 h-1 rounded-full bg-blue-500" />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className={`px-10 py-10 border-b border-zinc-50 flex items-center justify-between shrink-0 ${isFocused ? 'bg-zinc-50/20' : ''}`}>
            <div className={`flex items-center space-x-6 ${isFocused ? 'mx-auto translate-x-10' : ''}`}>
               {isFocused && (
                 <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-2xl">
                    <LayoutGrid className="w-5 h-5" />
                 </div>
               )}
               <div>
                 <span className={`text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-1.5 block ${isFocused ? 'text-center' : ''}`}>
                   {isFocused ? 'Scene Focused Collection' : 'Archive Browsing'}
                 </span>
                 <h2 className="text-3xl font-black serif tracking-tight text-zinc-900 leading-none">
                   {sceneInfo?.name} <span className="text-zinc-300 mx-2">/</span> <span className="text-zinc-300 not-italic uppercase font-sans text-xl">{sceneInfo?.nameEn}</span>
                 </h2>
               </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-zinc-100 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-2xl transition-all group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 custom-studio-scroll bg-white">
            {presets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                 <Box className="w-12 h-12" />
                 <p className="text-sm font-black uppercase tracking-[0.4em]">No Data</p>
              </div>
            ) : (
              <div className={`grid gap-8 ${isFocused ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {presets.map((preset, idx) => (
                  <PresetCard 
                    key={preset.id} 
                    preset={preset} 
                    index={idx} 
                    onApply={handleApply} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="px-10 py-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between shrink-0">
             <div className="flex items-center space-x-6">
                <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">
                  PromptStudio · v3.5
                </p>
                {isFocused && (
                  <button onClick={onClose} className="text-[8px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors flex items-center space-x-2">
                    <ArrowLeft className="w-2.5 h-2.5" />
                    <span>返回全局场景</span>
                  </button>
                )}
             </div>
             <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Protocol Verified</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresetLookbook;
