
import React, { useState, useMemo } from 'react';
import { Highlight } from '../types';
import { getPresetsForHighlight } from '../data/highlights';
import { ArrowUpRight, Layers, Zap } from 'lucide-react';
import HighlightDetailModal from './HighlightDetailModal';

interface HighlightCardProps {
  highlight: Highlight;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlight }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const presets = useMemo(() => getPresetsForHighlight(highlight), [highlight]);

  const handleQuickReuse = (e: React.MouseEvent) => {
    e.stopPropagation();
    const primaryPreset = presets[0];
    if (primaryPreset) {
      window.dispatchEvent(new CustomEvent('app:reuse-preset', { detail: primaryPreset }));
    }
  };

  return (
    <>
      <div 
        className="group relative flex flex-col"
        onClick={() => setIsDetailOpen(true)}
      >
        <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-100 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.4)] group-hover:-translate-y-4 cursor-pointer">
          <img 
            src={highlight.coverUrl} 
            alt={highlight.title} 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
          />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-1">
                  ISSUE {highlight.issueNumber || '00'}
                </span>
                <div className="w-12 h-[1px] bg-white/30"></div>
                <p className="text-[8px] text-white/40 mt-1 font-bold tracking-widest italic">EDITORIAL PICK</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2.5 border border-white/10 shadow-2xl">
                <Layers className="w-3.5 h-3.5 text-white/80" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-4xl font-black text-white serif tracking-tighter leading-none group-hover:italic transition-all duration-700">
                {highlight.title}
              </h3>
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em]">{highlight.subTitle}</p>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>

          <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 flex flex-col items-center justify-center p-6">
             <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500">
                <button 
                  onClick={handleQuickReuse}
                  className="group/btn flex items-center space-x-3 bg-white text-black px-6 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                   <Zap className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                   <span>应用此风格</span>
                </button>
                <button 
                  onClick={() => setIsDetailOpen(true)}
                  className="flex items-center space-x-2 text-white/60 hover:text-white transition-all group/link"
                >
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/20 pb-1 group-hover/link:border-white transition-all">浏览合集详情</span>
                   <ArrowUpRight className="w-3 h-3 translate-y-0.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                </button>
             </div>
          </div>
        </div>

        <div className="mt-6 px-4 space-y-2">
           <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest">{highlight.title}</h4>
           <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2 italic font-medium">
              "{highlight.description}"
           </p>
        </div>
      </div>

      <HighlightDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        highlight={highlight} 
      />
    </>
  );
};

export default HighlightCard;
