
import React, { ReactNode } from 'react';
import { Cpu, Activity } from 'lucide-react';

interface TabOption {
  id: string;
  label: string;
  subLabel: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface CockpitLayoutProps {
  header: {
    title: string;
    version: string;
  };
  tabs?: {
    options: TabOption[];
    activeId: string;
    onChange: (id: any) => void;
  };
  children: ReactNode;
  footer?: ReactNode;
}

const CockpitLayout: React.FC<CockpitLayoutProps> = ({ header, tabs, children, footer }) => {
  return (
    <div className="bg-[#0A0A0B] rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative flex flex-col h-full border border-white/5 overflow-hidden transition-all duration-500">
      {/* 顶部全局状态栏 - 保持紧凑 */}
      <div className="relative z-10 px-8 py-5 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#0A0A0B]/50 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="relative">
             <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]"></div>
             <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400">{header.title}</span>
            <div className="flex items-center space-x-2 mt-0.5">
               <Activity className="w-2.5 h-2.5 text-zinc-700" />
               <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest italic leading-none">内核状态：实时同步</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 px-4 py-1.5 bg-zinc-900/50 rounded-full border border-white/5">
           <Cpu className="w-3 h-3 text-zinc-600" />
           <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{header.version}</span>
        </div>
      </div>

      {/* 内部协议切换器 (Tabs) */}
      {tabs && (
        <div className="px-8 pt-6 flex space-x-3 shrink-0 z-20">
          {tabs.options.map((option) => {
            const isActive = tabs.activeId === option.id;
            return (
              <button
                key={option.id}
                disabled={option.disabled}
                onClick={() => tabs.onChange(option.id)}
                className={`
                  relative flex flex-col items-start px-5 py-3.5 rounded-2xl border transition-all duration-500 flex-1
                  ${isActive 
                    ? 'bg-white/5 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' 
                    : 'bg-transparent border-transparent opacity-30 hover:opacity-60 hover:bg-white/[0.02]'}
                  ${option.disabled ? 'cursor-not-allowed grayscale' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center space-x-2 mb-1">
                   {option.icon && <span className={isActive ? 'text-blue-400' : 'text-zinc-500'}>{option.icon}</span>}
                   <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                     {option.label}
                   </span>
                </div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.1em]">{option.subLabel}</span>
                {isActive && (
                  <div className="absolute -bottom-[2px] left-4 right-4 h-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 核心内容区 - 使用 items-stretch 充满宽度 */}
      <div className="flex-1 overflow-y-auto px-10 py-12 cockpit-scroll relative">
        <div className="min-h-full flex flex-col items-stretch animate-in fade-in slide-in-from-bottom-4 duration-700">
           {children}
        </div>
      </div>

      {/* 底部操作区 */}
      {footer && (
        <div className="relative z-10 p-8 border-t border-white/5 bg-[#0A0A0B]/80 backdrop-blur-xl shrink-0">
          {footer}
        </div>
      )}

      <style>{`
        .cockpit-scroll::-webkit-scrollbar { width: 4px; }
        .cockpit-scroll::-webkit-scrollbar-track { background: transparent; }
        .cockpit-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .cockpit-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default CockpitLayout;
