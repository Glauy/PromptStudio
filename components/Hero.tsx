
import React from 'react';
import { ChevronRight, Zap, Layers } from 'lucide-react';
import VisualMetadataCard from './common/VisualMetadataCard';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden bg-white">
      {/* 动态背景 */}
      <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-zinc-50 -z-10 translate-x-1/4 -translate-y-1/4 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50/50 -z-10 -translate-x-1/2 rounded-full blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 z-10 text-center lg:text-left">
          <div className="inline-flex items-center space-x-3 bg-zinc-50 text-black px-4 py-2 rounded-full text-[10px] font-black tracking-widest mb-10 border border-zinc-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Layers className="w-3 h-3 text-red-600" />
            <span className="uppercase tracking-[0.3em]">Visual DNA Compiler v3.5</span>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-black mb-10 leading-[1] serif tracking-tighter animate-in fade-in slide-in-from-left-6 duration-1000">
            从直觉到 <br />
            <span className="text-red-700 italic">视觉协议</span>
          </h2>
          
          <p className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed font-light mx-auto lg:mx-0 animate-in fade-in duration-1000 delay-300">
            告别繁琐的提示词玄学。PromptStudio 通过结构化 DSL 模拟真实摄影逻辑，将您的艺术灵感编译为精密的视觉 DNA。让每一次生成，都具备专业级的风格一致性。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-5 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <a href="#lab" className="group relative bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/10 flex items-center overflow-hidden">
              <span className="relative z-10">进入实验室</span>
              <ChevronRight className="relative z-10 ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <button className="px-10 py-5 bg-white border border-gray-100 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-50 transition-all shadow-sm">
              浏览预设
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center lg:justify-start space-x-8 opacity-40 grayscale animate-in fade-in duration-1000 delay-700">
            <div className="text-[10px] font-bold tracking-widest border-r border-gray-200 pr-8 uppercase">Photographic Logic</div>
            <div className="flex space-x-6">
              <span className="text-[10px] font-black tracking-widest uppercase italic">Parametric Control</span>
              <span className="text-[10px] font-black tracking-widest uppercase italic">Style Consistency</span>
              <span className="text-[10px] font-black tracking-widest uppercase italic">One-Click Rendering</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative group animate-in zoom-in-95 duration-1000">
          <div className="relative aspect-[3/4] w-full max-w-lg mx-auto">
            <div className="absolute inset-0 bg-black rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
              alt="Visual Aesthetic" 
              className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1"
            />
            
            <VisualMetadataCard 
              className="absolute -bottom-12 -left-12 animate-in slide-in-from-left-8 duration-1000 delay-700"
              title="协议：青花浮光"
              statusLabel="Protocol Instance"
              stats={[
                { label: "Refraction", value: "Glass Morph", progress: 85 },
                { label: "Anatomy", value: "High-Bone Structure", progress: 92 }
              ]}
              avatars={[
                "https://i.pravatar.cc/100?u=1",
                "https://i.pravatar.cc/100?u=2",
                "https://i.pravatar.cc/100?u=3"
              ]}
              extraCount="+2k"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
