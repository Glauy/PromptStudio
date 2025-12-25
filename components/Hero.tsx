
import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-zinc-50 -z-10 translate-x-1/4 -translate-y-1/4 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50/50 -z-10 -translate-x-1/2 rounded-full blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 z-10 text-center lg:text-left">
          <div className="inline-flex items-center space-x-3 bg-zinc-50 text-black px-4 py-2 rounded-full text-[10px] font-black tracking-widest mb-10 border border-zinc-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap className="w-3 h-3 text-red-600" />
            <span className="uppercase">PromptStudio Professional v2.5</span>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-black mb-10 leading-[1] serif tracking-tighter animate-in fade-in slide-in-from-left-6 duration-1000">
            重塑 <br />
            <span className="text-red-700 italic">光影</span> 的逻辑
          </h2>
          
          <p className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed font-light mx-auto lg:mx-0 animate-in fade-in duration-1000 delay-300">
            用摄影师的直觉控制 AI。PromptStudio 是一款基于结构化 DSL 的专业级视觉创作实验室，让每一个像素都精准承载您的艺术表达。
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
            <div className="text-[10px] font-bold tracking-widest border-r border-gray-200 pr-8">TRUSTED BY</div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Leica_logo.svg/2560px-Leica_logo.svg.png" className="h-4 object-contain" alt="Leica" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Hasselblad_logo.svg/2560px-Hasselblad_logo.svg.png" className="h-4 object-contain" alt="Hasselblad" />
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
            
            {/* Visual Metadata Overlay */}
            <div className="absolute -bottom-12 -left-12 bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-gray-100 max-w-[280px] animate-in slide-in-from-left-8 duration-1000 delay-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                <span className="text-[10px] text-black font-black uppercase tracking-widest">Active DSL Layer</span>
              </div>
              <p className="text-base font-bold mb-4 serif">《青花·浮光》</p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>LIGHTING</span>
                  <span className="text-black uppercase">Chiaroscuro</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-black"></div>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-zinc-100 border-2 border-white shadow-sm overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-black text-white text-[8px] flex items-center justify-center border-2 border-white">+1k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
