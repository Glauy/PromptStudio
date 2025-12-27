
import React from 'react';
import { Maximize2, Loader2, Focus, Crosshair, Aperture } from 'lucide-react';

interface MasterViewportProps {
  imageUrl?: string;
  isRendering: boolean;
  prompt: string;
  onExpand: () => void;
}

const MasterViewport: React.FC<MasterViewportProps> = ({ imageUrl, isRendering, prompt, onExpand }) => {
  return (
    <div className="relative h-full w-full max-w-5xl aspect-[16/9] group">
      {/* 极简工程倒角 */}
      <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-zinc-200 group-hover:border-red-600/20 transition-all duration-1000"></div>
      <div className="absolute -top-6 -right-6 w-16 h-16 border-t-2 border-r-2 border-zinc-200 group-hover:border-red-600/20 transition-all duration-1000"></div>
      <div className="absolute -bottom-6 -left-6 w-16 h-16 border-b-2 border-l-2 border-zinc-200 group-hover:border-red-600/20 transition-all duration-1000"></div>
      <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-zinc-200 group-hover:border-red-600/20 transition-all duration-1000"></div>

      {/* 画布容器 */}
      <div className="h-full w-full bg-white rounded-[3rem] border border-zinc-100 overflow-hidden flex items-center justify-center relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] viewport-frame group-hover:shadow-[0_60px_150px_-30px_rgba(0,0,0,0.1)] transition-all duration-1000">
        
        {/* 对焦准星装饰 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <Crosshair className="w-48 h-48 text-black" />
        </div>

        {imageUrl ? (
          <div className="w-full h-full relative cursor-zoom-in group/img" onClick={onExpand}>
            <img 
              src={imageUrl} 
              className="w-full h-full object-cover animate-in fade-in zoom-in-[0.99] duration-1000" 
              alt="Artistic Fragment" 
            />
            
            {/* 叠加层：模拟取景器 OS 信息 */}
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
               <div className="bg-white/80 backdrop-blur-3xl px-6 py-4 rounded-2xl border border-white/50 flex items-center space-x-6">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Exposure Matrix</span>
                    <span className="text-[11px] font-mono text-zinc-900 font-bold tracking-wider">f/1.9 1/250s ISO100</span>
                  </div>
                  <div className="w-px h-6 bg-zinc-200"></div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Pixel Code</span>
                    <span className="text-[11px] font-mono text-blue-600 font-bold tracking-wider">#RAW_4K_DCI</span>
                  </div>
               </div>
               <button className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-2xl pointer-events-auto hover:scale-110 active:scale-95 transition-all">
                 <Maximize2 className="w-6 h-6" />
               </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-12 w-full px-24 text-center">
             <div className="relative group/wait">
                <div className="absolute inset-0 bg-zinc-100 blur-[80px] opacity-0 group-hover/wait:opacity-100 transition-opacity duration-1000"></div>
                <div className="w-24 h-24 rounded-3xl border-2 border-zinc-100 flex items-center justify-center bg-white/50 backdrop-blur-sm group-hover:border-red-600/20 transition-colors">
                  <Focus className="w-10 h-10 text-zinc-100 group-hover:text-red-600/20 transition-colors animate-pulse" />
                </div>
             </div>
             
             <div className="space-y-6">
                <p className="text-[12px] font-black uppercase tracking-[0.8em] text-zinc-200 translate-x-[0.4em]">Protocol Sync Pending</p>
                <div className="flex flex-wrap justify-center gap-3 opacity-30 select-none">
                  {prompt.split(',').slice(0, 6).map((word, i) => (
                    <span key={i} className="text-[9px] font-mono text-zinc-400 px-4 py-2 border border-zinc-100 rounded-full bg-zinc-50/50">
                      {word.trim().split(' ')[0]}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* 动态渲染蒙层 */}
        {isRendering && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-[100px] z-40 flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-700">
             <div className="relative">
                <Aperture className="w-14 h-14 text-[#C0392B] animate-spin" />
                <div className="absolute inset-0 bg-red-600/10 blur-[100px] animate-pulse"></div>
             </div>
             <div className="text-center">
                <h3 className="text-[18px] font-black uppercase tracking-[1em] text-zinc-900 block mb-4 translate-x-[0.5em] serif">执行像素拓扑重构</h3>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 italic">Compiling High-Bone Vector Matrix...</span>
             </div>
          </div>
        )}

        {/* 品牌印章 */}
        <div className="absolute top-12 left-12 flex items-center space-x-6 pointer-events-none">
           <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center rounded-2xl font-black text-xl serif shadow-xl">墨</div>
           <div className="h-6 w-px bg-zinc-100"></div>
           <span className="text-[9px] font-mono text-zinc-300 uppercase tracking-[0.4em]">Node_L40S_Nvidia</span>
        </div>
      </div>
    </div>
  );
};

export default MasterViewport;
