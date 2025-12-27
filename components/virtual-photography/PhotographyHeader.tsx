
import React, { useState, useEffect, useRef } from 'react';
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
  sessions, activeSessionId, onSessionSelect, mode, onModeChange, activeSessionTitle 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  // Fix: Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout to avoid namespace errors in browser environment
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 优化的自动显示隐藏逻辑
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isAtTop = e.clientY < 100;

      if (isAtTop) {
        // 鼠标在顶部区域：强制显示并清除隐藏计时
        setIsVisible(true);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // 鼠标离开顶部区域：如果当前是显示的，且没有打开菜单，则开启 5 秒隐藏倒计时
        if (isVisible && !showPicker && !timerRef.current) {
          timerRef.current = setTimeout(() => {
            setIsVisible(false);
            timerRef.current = null;
          }, 5000); // 调整为 5 秒
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, showPicker]);

  // 当下拉菜单打开时，确保计时器清除，防止在操作菜单时隐藏
  useEffect(() => {
    if (showPicker && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [showPicker]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-2xl border-b border-zinc-100 px-8 flex items-center justify-between z-[100] transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('app:go-home'))}
          className="p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-100 transition-all group shadow-sm active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center space-x-4 px-5 py-2.5 bg-[#121214] text-white rounded-full shadow-xl transition-all active:scale-95 group border border-white/5"
          >
            <LayoutGrid className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
            <div className="flex flex-col items-start text-left min-w-[100px]">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">正在执行的拍摄协议</span>
              <span className="text-xs font-bold serif truncate max-w-[140px] tracking-tight">{activeSessionTitle}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform duration-300 ${showPicker ? 'rotate-180' : ''}`} />
          </button>

          {showPicker && (
            <div className="absolute top-full left-0 mt-4 w-[520px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.25)] border border-zinc-100 p-6 grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-500 origin-top-left z-50">
              {sessions.map(s => (
                <button 
                  key={s.id}
                  onClick={() => { onSessionSelect(s.id); setShowPicker(false); }}
                  className={`flex items-center space-x-3 p-3.5 rounded-2xl transition-all text-left ${activeSessionId === s.id ? 'bg-zinc-50 ring-1 ring-red-600/10' : 'hover:bg-zinc-50'}`}
                >
                  <img src={s.shots[0].previewUrl} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-0.5 truncate">{s.persona.temperament}</p>
                    <p className="text-xs font-bold serif truncate text-zinc-900">{s.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="flex bg-zinc-100 rounded-2xl p-1 border border-zinc-200/50 shadow-inner">
          <button 
            onClick={() => onModeChange('script')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${mode === 'script' ? 'bg-white text-black shadow-md ring-1 ring-black/5' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>剧本模式</span>
          </button>
          <button 
            onClick={() => onModeChange('portrait')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${mode === 'portrait' ? 'bg-[#C0392B] text-white shadow-lg shadow-red-700/20' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>写真模式</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-3 px-5 py-2.5 bg-zinc-50 rounded-full border border-zinc-100">
           <div className="relative">
             <Activity className="w-3.5 h-3.5 text-green-500" />
             <div className="absolute inset-0 bg-green-500 blur-sm animate-pulse opacity-50"></div>
           </div>
           <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">工作站：在线</span>
        </div>
      </div>
    </header>
  );
};

export default PhotographyHeader;
