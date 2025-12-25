
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Compass, 
  X, 
  BookOpen,
  ChevronUp,
  Zap
} from 'lucide-react';
import { STUDIO_TIPS, MODE_DESCRIPTIONS } from '../data/constants';

const StudioTips: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTip, setActiveTip] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % STUDIO_TIPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded Almanac Content */}
      <div className={`
        mb-6 w-[420px] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 
        transition-all duration-700 origin-bottom-right pointer-events-auto
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-20 pointer-events-none'}
      `}>
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-xl shadow-black/10">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">实验室指南</h4>
              <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Studio Almanac</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-8 max-h-[600px] overflow-y-auto scrollbar-hide">
          {/* Tips Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">灵感与建议</span>
              <div className="flex space-x-1.5">
                {STUDIO_TIPS.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-500 ${activeTip === idx ? 'w-4 bg-red-600' : 'w-1 bg-zinc-100'}`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-zinc-50 rounded-[2rem] p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-16 h-16" />
              </div>
              <h5 className="text-[11px] font-black uppercase tracking-tight mb-2 text-zinc-400">
                {STUDIO_TIPS[activeTip].title}
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed italic font-medium animate-in fade-in slide-in-from-right-2 duration-500">
                {STUDIO_TIPS[activeTip].content}
              </p>
            </div>
          </section>

          {/* Mode Guide */}
          <section className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 block">控制模式解析</span>
            <div className="space-y-6">
              {MODE_DESCRIPTIONS.map((item) => (
                <div key={item.mode} className="flex items-start group">
                  <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shrink-0">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div className="ml-5">
                    <span className="text-[11px] font-black uppercase tracking-widest block mb-1 group-hover:text-red-700 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lab Assurance */}
          <section className="bg-zinc-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
             <div className="flex items-center space-x-5 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-zinc-400" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-loose opacity-60">
                  基于顶级视觉实验室 <br /> 深度学习编译算法
                </p>
             </div>
             <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                <Compass className="w-24 h-24" />
             </div>
          </section>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-4 px-8 py-5 rounded-full shadow-2xl transition-all duration-500 active:scale-95 group pointer-events-auto
          ${isOpen ? 'bg-zinc-100 text-black' : 'bg-black text-white hover:scale-110 shadow-black/20'}
        `}
      >
        {isOpen ? (
          <>
            <ChevronUp className="w-4 h-4 rotate-180" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">收起指南</span>
          </>
        ) : (
          <>
            <div className="relative">
              <Zap className="w-4 h-4 text-red-500" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">炼金指南</span>
          </>
        )}
      </button>
    </div>
  );
};

export default StudioTips;
