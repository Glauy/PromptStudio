
import React, { useEffect } from 'react';
import { X, Download, Share2, ZoomIn, Info, ShieldCheck, Maximize, Share } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  description?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, title, description }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
      {/* 沉浸式背景遮罩 */}
      <div 
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-3xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* 独立渲染面板 */}
      <div className="relative w-full max-w-7xl h-full flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
        
        {/* 顶部工具栏 - 独立于图片区域 */}
        <div className="flex items-center justify-between px-4 py-6 shrink-0">
          <div className="flex items-center space-x-4">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] leading-none">Visual Preview Layer</span>
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">HD Engine Synchronization</span>
             </div>
          </div>
          <div className="flex items-center space-x-3">
             <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest">
                <Share className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">分享作品</span>
             </button>
             <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">导出原件</span>
             </button>
             <div className="w-px h-4 bg-white/10 mx-2"></div>
             <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-xl hover:scale-110 active:scale-90 transition-all shadow-2xl"
             >
                <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* 图片独立展示舞台 - 带填充保护区域 */}
        <div className="flex-1 min-h-0 bg-zinc-900/20 rounded-[2.5rem] border border-white/5 overflow-hidden flex items-center justify-center p-8 md:p-12 relative group">
          {/* 背景光影氛围 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none"></div>
          
          <div className="relative h-full w-full flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt="Artistic Result" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>

          {/* 右下角极简水印/状态 */}
          <div className="absolute bottom-10 right-10 flex items-center space-x-3 opacity-20 group-hover:opacity-60 transition-opacity">
             <ShieldCheck className="w-4 h-4 text-white" />
             <span className="text-[9px] font-black text-white uppercase tracking-widest">Certified AI Visual Artifact</span>
          </div>
        </div>

        {/* 底部信息面板 - 完全独立且不遮挡 */}
        <div className="mt-8 px-6 pb-4 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Info className="w-4 h-4 text-blue-400" />
                 </div>
                 <h3 className="text-white text-2xl font-bold serif tracking-tight">
                   {title ? `《${title}》` : '视觉实验室创作成果'}
                 </h3>
               </div>
               
               <div className="relative">
                 <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-transparent rounded-full opacity-30"></div>
                 <p className="text-zinc-500 text-sm font-medium leading-relaxed italic line-clamp-3">
                   {description || '暂无详细描述，此作品由基于结构化 DSL 的 AI 视觉引擎生成。'}
                 </p>
               </div>
            </div>

            <div className="flex flex-col items-end space-y-4">
               <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                  <div className="text-right">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Pixel Precision</p>
                    <p className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">4096 x 4096 PX</p>
                  </div>
                  <div className="w-px h-8 bg-white/10 mx-2"></div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Color Space</p>
                    <p className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.2em]">DCI-P3 WIDE</p>
                  </div>
               </div>
               
               <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                 <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">编译完成：特征向量提取一致</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
