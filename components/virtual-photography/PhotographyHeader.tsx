
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, LayoutGrid, BookOpen, Camera, Activity } from 'lucide-react';
import { PhotographySession, PhotographyMode } from '../../types';

interface PhotographyHeaderProps {
  sessions: PhotographySession[];
  activeSessionId: string;
  onSessionSelect: (id: string) => void;
  mode: PhotographyMode;
  onModeChange: (mode: PhotographyMode) => void;
  activeSessionTitle: string;
}

const PhotographyHeader: React.FC<PhotographyHeaderProps> = ({ 
  sessions, activeSessionId, mode, onModeChange, activeSessionTitle 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  // 模拟自动隐藏逻辑：鼠标在顶部区域则显示，否则 3s 后隐藏
  useEffect(() => {
    let timer: any;
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
        clearTimeout(timer);
      } else if (isVisible && !showPicker) {
        timer = setTimeout(() => setIsVisible(false), 3000);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [isVisible, showPicker]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-2xl border-b border-zinc-100 px-8 flex items-center justify-between z-[100] transition-all duration-700 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('app:go-home'))}
          className="p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-100 transition-all group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center space-x-4 px-5 py-2.5 bg-zinc-900 text-white rounded-2xl shadow-xl transition-all active:scale-95 group"
          >
            <LayoutGrid className="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-colors" />
            <div className="flex flex-col items-start text-left">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">正在执行的拍摄协议</span>
              <span className="text-xs font-bold serif truncate max-w-[120px]">{activeSessionTitle}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showPicker ? 'rotate-180' : ''}`} />
          </button>

          {showPicker && (
            <div className="absolute top-full left-0 mt-4 w-[480px] bg-white rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-zinc-100 p-6 grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-300">
              {sessions.map(s => (
                <button 
                  key={s.id}
                  onClick={() => { window.dispatchEvent(new CustomEvent('app:reuse-preset', { detail: { sceneId: s.id } })); setShowPicker(false); }}
                  className={`flex items-center space-x-3 p-3 rounded-2xl transition-all ${activeSessionId === s.id ? 'bg-zinc-50 ring-1 ring-red-600/10' : 'hover:bg-zinc-50'}`}
                >
                  <img src={s.shots[0].previewUrl} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-0.5 line-clamp-1">{s.persona.temperament}</p>
                    <p className="text-xs font-bold serif truncate">{s.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="flex bg-zinc-100 rounded-xl p-1 border border-zinc-200">
          <button 
            onClick={() => onModeChange('script')}
            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${mode === 'script' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>剧本模式</span>
          </button>
          <button 
            onClick={() => onModeChange('portrait')}
            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${mode === 'portrait' ? 'bg-[#C0392B] text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>写真模式</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-3 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
           <Activity className="w-3.5 h-3.5 text-green-500 animate-pulse" />
           <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">工作站状态：在线</span>
        </div>
      </div>
    </header>
  );
};

export default PhotographyHeader;
