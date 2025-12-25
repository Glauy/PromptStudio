
import React, { useState } from 'react';
import { History, RotateCcw, Maximize2, Trash2, Clock, Sparkles } from 'lucide-react';
import { StructuredPrompt } from '../types';
import ImageModal from './common/ImageModal';

export interface HistoryItem {
  id: string;
  url: string;
  data: Partial<StructuredPrompt>;
  timestamp: number;
}

interface RenderingHistoryProps {
  items: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onClear: () => void;
}

const RenderingHistory: React.FC<RenderingHistoryProps> = ({ items, onRestore, onClear }) => {
  const [previewItem, setPreviewItem] = useState<HistoryItem | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <ImageModal 
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        imageUrl={previewItem?.url || ''}
        title={previewItem?.data?.subject?.substring(0, 20)}
        description={previewItem?.data?.subject}
      />

      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-xl">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-800 leading-none">渲染实验历史</h3>
            <p className="text-[9px] text-zinc-400 font-bold tracking-[0.2em] uppercase mt-1.5">Rendering Artifacts Trace</p>
          </div>
        </div>
        
        <button 
          onClick={onClear}
          className="group flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5 group-hover:rotate-12" />
          <span>清除历史存档</span>
        </button>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto pb-8 pt-2 px-2 gap-8 custom-studio-scroll snap-x">
          {items.map((item) => (
            <div 
              key={item.id}
              className="relative shrink-0 w-72 snap-start group/card"
            >
              {/* 图片容器优化 */}
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] bg-zinc-100 transition-all duration-700 group-hover/card:-translate-y-3 group-hover/card:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                <img 
                  src={item.url} 
                  alt="Rendered result" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover/card:scale-110"
                />
                
                {/* 悬浮操作层优化 */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                  <div className="flex space-x-4 mb-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                    <button 
                      onClick={() => onRestore(item)}
                      className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl"
                      title="回填指令"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setPreviewItem(item)}
                      className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
                      title="放大预览"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-white/80 font-medium line-clamp-2 leading-relaxed italic px-2">
                    {item.data.subject}
                  </p>
                </div>

                {/* 时间戳标签优化 */}
                <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center space-x-2">
                   <Clock className="w-3 h-3 text-white" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">
                     {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
              </div>

              {/* 卡片底部元数据 - 修复对齐问题 */}
              <div className="mt-6 px-4">
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 overflow-hidden">
                       <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                       <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest truncate">
                         DNA_SNAP_{item.id.substring(0,6).toUpperCase()}
                       </span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                 </div>
                 <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] italic opacity-60">
                    编译成功 · 已存入快照库
                 </p>
              </div>
            </div>
          ))}
          
          <div className="shrink-0 w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default RenderingHistory;
