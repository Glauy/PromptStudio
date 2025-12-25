
import React, { useState } from 'react';
import { Terminal, Copy, CheckCircle2, Cpu, Activity, Brackets, ChevronLeft, ChevronRight } from 'lucide-react';
import { StructuredPrompt } from '../types';

interface DslInspectorProps {
  data: Partial<StructuredPrompt>;
  isVisible: boolean;
  onToggle: () => void;
}

const DslInspector: React.FC<DslInspectorProps> = ({ data, isVisible, onToggle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`absolute top-0 right-full h-full z-[40] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-start
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
      `}
      style={{ marginRight: '-1px' }} // 负边距让边框完美重合
    >
      {/* 侧边垂直切换拨片 (挂载在面板右侧边缘，实际上紧贴主舱体) */}
      <div className="absolute top-12 -right-12 h-40 flex items-center justify-center">
         <button 
           onClick={onToggle}
           className="bg-zinc-900 border border-white/10 hover:border-white/30 text-white p-2 rounded-r-xl shadow-2xl transition-all group flex flex-col items-center space-y-3"
           style={{ writingMode: 'vertical-rl' }}
         >
           <div className="flex flex-col items-center space-y-1 py-2">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">DEV MODE</span>
             <div className={`w-1 h-1 rounded-full ${isVisible ? 'bg-green-500' : 'bg-zinc-600'}`}></div>
           </div>
           <ChevronLeft className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-500 ${isVisible ? '' : 'rotate-180'}`} />
         </button>
      </div>

      {/* 面板主体 */}
      <div className="w-[300px] bg-zinc-950 border-r border-y border-white/10 rounded-l-[2rem] flex flex-col h-full shadow-[-40px_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Brackets className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-[10px] text-white font-black uppercase tracking-widest">DSL 观察层</h4>
              <p className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase mt-0.5 leading-none">Live Trace</p>
            </div>
          </div>
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'hover:bg-white/5 text-zinc-500 hover:text-white'}`}
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* JSON Content Area */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] custom-dsl-scroll">
          <pre className="leading-relaxed">
            <span className="text-zinc-600 block mb-4">// StructuredPrompt</span>
            <div className="text-blue-400/90 space-y-1">
              {Object.entries(data).length === 0 ? (
                <span className="text-zinc-700 italic">{"{ } // Null state"}</span>
              ) : (
                Object.entries(data).map(([key, value]) => (
                  <div key={key} className="group flex flex-col mb-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-zinc-500">"{key}":</span>
                      <span className="text-amber-200 break-all leading-normal italic">"{value}"</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </pre>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/5 bg-black/40">
          <div className="flex items-center justify-between opacity-30">
             <div className="flex items-center space-x-2">
                <Cpu className="w-3 h-3 text-zinc-400" />
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">DNA v3.5</span>
             </div>
             <div className="flex items-center space-x-1">
                <Activity className="w-2.5 h-2.5 text-green-500" />
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Stream Active</span>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-dsl-scroll::-webkit-scrollbar { width: 2px; }
        .custom-dsl-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-dsl-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
};

export default DslInspector;
