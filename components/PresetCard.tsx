
import React from 'react';
import { Zap, User, Sparkles, ChevronRight, Hash } from 'lucide-react';
import { Preset } from '../types';

interface PresetCardProps {
  preset: Preset;
  onApply: (preset: Preset) => void;
  index: number;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, onApply, index }) => {
  return (
    <div 
      className="group relative flex flex-col bg-white rounded-3xl border border-zinc-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-6"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* 图像区域 - 调整为更紧凑的 1:1 比例 */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <img 
          src={preset.url} 
          alt={preset.title}
          className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        
        {/* 覆盖层 - 仅在悬浮时显示快捷操作 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 backdrop-blur-[2px]">
          <button 
            onClick={() => onApply(preset)}
            className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500 hover:bg-zinc-100 active:scale-95"
          >
            <Zap className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* DNA 标识 - 浮动显示，更小巧 */}
        <div className="absolute top-4 right-4 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="flex items-center space-x-1.5">
             <Sparkles className="w-2.5 h-2.5 text-white" />
             <span className="text-[8px] font-black text-white uppercase tracking-widest">DNA Certified</span>
           </div>
        </div>
      </div>

      {/* 信息区域 - 极简排版 */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold serif text-zinc-900 tracking-tight truncate mr-4">
            {preset.title}
          </h3>
          <div className="flex items-center space-x-1 opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
             <Hash className="w-2.5 h-2.5 text-zinc-400" />
             <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
               {preset.id.split('-').pop()?.toUpperCase()}
             </span>
          </div>
        </div>
        
        {/* 提示词片段 - 更紧凑，类似 EXIF 信息 */}
        <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100 mb-4 flex-1">
           <p className="text-[10px] text-zinc-500 font-medium leading-relaxed line-clamp-2 italic">
             "{preset.data.subject}"
           </p>
        </div>

        {/* 底部功能区 */}
        <div className="flex items-center justify-between pt-3 border-t border-dashed border-zinc-100">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden shrink-0">
              <User className="w-2.5 h-2.5 text-zinc-400" />
            </div>
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest truncate max-w-[80px]">
              @{preset.author.split(' ')[0]}
            </span>
          </div>
          
          <button 
            onClick={() => onApply(preset)}
            className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors group/btn"
          >
            <span className="group-hover/btn:underline decoration-2 underline-offset-4">载入</span>
            <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresetCard;
