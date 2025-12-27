
import React from 'react';
import { Maximize2, Aperture, Focus, Crosshair } from 'lucide-react';

interface PhotographyViewportProps {
  imageUrl?: string;
  isRendering: boolean;
  prompt: string;
  onExpand: () => void;
}

const PhotographyViewport: React.FC<PhotographyViewportProps> = ({ imageUrl, isRendering, prompt, onExpand }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
      {/* 视口背景装饰 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Crosshair className="w-64 h-64" />
      </div>

      <div className="relative w-full max-w-5xl aspect-[4/3] max-h-[75vh] bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden flex items-center justify-center group transition-all duration-700">
        
        {/* 渲染加载蒙层 */}
        {isRendering && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-[100px] z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
             <Aperture className="w-12 h-12 text-[#C0392B] animate-spin" />
             <div className="text-center">
                <h3 className="text-lg font-black uppercase tracking-[0.6em] text-zinc-900 mb-2 serif">编译像素阵列</h3>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Parsing High-Bone Vector Matrix...</span>
             </div>
          </div>
        )}

        {imageUrl ? (
          <div className="w-full h-full relative group/img cursor-zoom-in" onClick={onExpand}>
            <img 
              src={imageUrl} 
              className="w-full h-full object-cover animate-in fade-in zoom-in-[0.98] duration-1000" 
              alt="Shoot Result" 
            />
            
            {/* 叠加摄影数据 (EXIF-Style) */}
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between opacity-0 group-hover/img:opacity-100 transition-all duration-500 translate-y-4 group-hover/img:translate-y-0">
               <div className="bg-black/80 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-white/10 flex items-center space-x-6">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Exposure</span>
                    <span className="text-[11px] font-mono text-white font-bold tracking-wider">f/1.9 1/160s ISO100</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Optical Engine</span>
                    <span className="text-[11px] font-mono text-blue-400 font-bold tracking-wider">RAW_4K_DCI</span>
                  </div>
               </div>
               <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                  <Maximize2 className="w-5 h-5" />
               </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8 p-12 text-center">
             <div className="w-20 h-20 rounded-3xl border border-zinc-100 flex items-center justify-center bg-zinc-50 animate-pulse">
                <Focus className="w-8 h-8 text-zinc-200" />
             </div>
             <div className="space-y-4">
                <p className="text-[12px] font-black uppercase tracking-[0.6em] text-zinc-300">取景器已就绪</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                  {prompt.split(',').slice(0, 4).map((word, i) => (
                    <span key={i} className="text-[9px] font-mono text-zinc-400 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full">
                      {word.trim().split(' ')[0]}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* 视口角落装饰 */}
        <div className="absolute top-10 left-10 flex items-center space-x-4 pointer-events-none opacity-30">
           <div className="w-10 h-10 bg-zinc-900 text-white flex items-center justify-center rounded-xl font-black text-lg serif">墨</div>
           <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Protocol Sync_OK</span>
        </div>
      </div>
    </div>
  );
};

export default PhotographyViewport;
