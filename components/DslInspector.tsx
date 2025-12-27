
import React, { useState } from 'react';
import { Terminal, Copy, CheckCircle2, Cpu, Activity, Brackets, ChevronLeft } from 'lucide-react';
import { StructuredPrompt } from '../types';

/**
 * DslInspector 属性定义
 */
interface DslInspectorProps {
  /** 需要观察的结构化数据，通常是编译前的 DSL */
  data: Partial<StructuredPrompt>;
  /** 面板是否可见 */
  isVisible: boolean;
  /** 点击侧边拨片切换面板可见性的回调 */
  onToggle: () => void;
}

/**
 * DslInspector: 视觉协议底层数据观察器
 * 
 * 功能职责：
 * 1. 协议解构：将高阶摄影 Session 实时映射为 Gemini 可理解的 JSON 数据。
 * 2. 开发者透传：提供侧边机械式拨片交互，方便调试底层 Prompts。
 * 3. 跨容器投影：使用 right-full 绝对定位，从右侧边栏向左侧工作区展开，实现“非侵入式”查看。
 */
const DslInspector: React.FC<DslInspectorProps> = ({ data, isVisible, onToggle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="absolute top-0 right-full h-full z-[40] pointer-events-none"
      style={{ marginRight: '-1px' }} 
    >
      {/* 
         侧边垂直切换拨片 (Dev Mode Switcher)
         - 定位于 ControlTower 的左边缘，常驻可见。
         - 采用 vertical-rl 模式，模拟工业设备的机械开关感。
      */}
      <div className="absolute top-12 -right-12 h-40 flex items-center justify-center pointer-events-auto z-50">
         <button 
           onClick={onToggle}
           className={`border border-white/10 p-2 rounded-r-xl shadow-2xl transition-all duration-500 group flex flex-col items-center space-y-3
             ${isVisible ? 'bg-blue-600 text-white border-blue-400/30 ring-4 ring-blue-600/20' : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-black'}
           `}
           style={{ writingMode: 'vertical-rl' }}
           title={isVisible ? "关闭观察器" : "开启协议追踪"}
         >
           <div className="flex flex-col items-center space-y-1 py-2">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">DEV MODE</span>
             <div className={`w-1 h-1 rounded-full ${isVisible ? 'bg-white animate-pulse' : 'bg-zinc-600'}`}></div>
           </div>
           <ChevronLeft className={`w-3.5 h-3.5 transition-transform duration-500 ${isVisible ? '' : 'rotate-180'}`} />
         </button>
      </div>

      {/* 
         面板主体 (The JSON Viewport)
         - 宽度 340px，向左展开。
         - 带有重度毛玻璃与暗黑背景。
      */}
      <div className={`w-[340px] bg-zinc-950/95 backdrop-blur-3xl border-r border-y border-white/10 rounded-l-[2.5rem] flex flex-col h-full shadow-[-40px_0_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[20%] opacity-0'}
      `}>
        {/* Panel Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Brackets className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-[10px] text-white font-black uppercase tracking-widest">DSL 观察层</h4>
              <p className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase mt-0.5 leading-none">Structured Data Trace</p>
            </div>
          </div>
          <button 
            onClick={handleCopy}
            className={`p-2.5 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'hover:bg-white/5 text-zinc-500 hover:text-white border border-transparent hover:border-white/10'}`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* JSON Code Area */}
        <div className="flex-1 overflow-y-auto p-8 font-mono text-[11px] custom-dsl-scroll bg-[#050505]/50">
          <pre className="leading-relaxed">
            <span className="text-zinc-700 block mb-6 opacity-40 italic tracking-wider">// DNA Sequence Trace v4.0.1</span>
            <div className="text-blue-400/90 space-y-2">
              {Object.entries(data).length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center opacity-10 text-center">
                   <Activity className="w-10 h-10 mb-4 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">Kernel Waiting...</span>
                </div>
              ) : (
                Object.entries(data).map(([key, value]) => (
                  <div key={key} className="group flex flex-col mb-4 p-4 rounded-xl hover:bg-blue-600/5 transition-colors border border-transparent hover:border-blue-500/10">
                    <div className="flex items-baseline space-x-3">
                      <span className="text-zinc-600 font-bold select-none">"{key}":</span>
                      <span className="text-amber-200/90 break-all leading-normal italic font-medium">"{value}"</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </pre>
        </div>

        {/* Panel Footer */}
        <div className="p-6 border-t border-white/5 bg-black/60 backdrop-blur-md">
          <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
                <Cpu className="w-3 h-3 text-zinc-600" />
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Protocol Sync: OK</span>
             </div>
             <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                <span className="text-[7px] text-zinc-700 font-black uppercase tracking-widest leading-none">Active Trace</span>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-dsl-scroll::-webkit-scrollbar { width: 3px; }
        .custom-dsl-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-dsl-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-dsl-scroll::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.3); }
      `}</style>
    </div>
  );
};

export default DslInspector;
