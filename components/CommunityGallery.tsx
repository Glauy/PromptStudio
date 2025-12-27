
import React from 'react';
import { Zap, Grid, ArrowUpRight } from 'lucide-react';
import { HIGHLIGHT_CONFIGS } from '../data/highlights';
import HighlightCard from './HighlightCard';

const CommunityGallery: React.FC = () => {
  return (
    <section id="community" className="py-24 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-red-700 font-bold text-xs uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>EDITORIAL / 深度策展</span>
            </div>
            <h2 className="text-6xl font-black serif text-zinc-900 leading-tight tracking-tighter">
              视觉协议 <br /> <span className="text-zinc-300 italic">社区精选</span>
            </h2>
          </div>
          
          <div className="max-w-md md:text-right">
             <div className="flex items-center justify-end space-x-3 mb-4 text-zinc-400">
               <Grid className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Curated by Aesthetic Lab</span>
             </div>
             <p className="text-zinc-500 text-sm font-light leading-relaxed">
               由专业视觉策展人筛选的 <span className="text-black font-bold">DSL 协议协议</span>。每一个专题都是对特定美学的精密拆解，致力于为专业创作者提供高一致性的底座。
             </p>
          </div>
        </div>

        {/* 专题网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {HIGHLIGHT_CONFIGS.map((highlight) => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>

        {/* 底部装饰 */}
        <div className="mt-32 text-center relative">
          <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-200 -z-10"></div>
          <button className="inline-flex items-center space-x-6 px-12 py-6 rounded-full bg-white border border-zinc-200 shadow-xl cursor-pointer hover:shadow-2xl transition-all group active:scale-95">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-zinc-100 overflow-hidden shadow-sm transition-transform group-hover:translate-x-1">
                   <img src={`https://i.pravatar.cc/100?u=footer-${i}`} alt="user" />
                 </div>
               ))}
             </div>
             <div className="flex flex-col items-start text-left">
               <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">同步 3,500+ 个专业协议</span>
               <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">浏览协议广场</span>
             </div>
             <ArrowUpRight className="w-5 h-5 text-red-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityGallery;
