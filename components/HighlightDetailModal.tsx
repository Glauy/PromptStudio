
import React, { useMemo } from 'react';
import { X, Copy, Zap } from 'lucide-react';
import { Highlight, Preset } from '../types';
import { getPresetsForHighlight } from '../data/highlights';

interface HighlightDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight: Highlight;
}

const HighlightDetailModal: React.FC<HighlightDetailModalProps> = ({ isOpen, onClose, highlight }) => {
  const presets = useMemo(() => getPresetsForHighlight(highlight), [highlight]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: Preset) => {
    window.dispatchEvent(new CustomEvent('app:reuse-preset', { detail: preset }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-12 duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
        
        <div className="relative w-full md:w-[40%] h-64 md:h-auto overflow-hidden bg-zinc-900 shrink-0">
          <img src={highlight.coverUrl} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" alt={highlight.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] mb-4 block opacity-60">Community Pick</span>
            <h2 className="text-5xl font-black serif tracking-tighter mb-6 leading-none italic">{highlight.title}</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {highlight.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-bold border border-white/20 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs font-medium leading-relaxed italic opacity-80 border-l-2 border-white/20 pl-6">
              "{highlight.description}"
            </p>
          </div>

          <button onClick={onClose} className="absolute top-8 left-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 md:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col bg-[#F9F9FB] overflow-hidden">
          <div className="px-10 py-8 border-b border-zinc-100 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-4">
              <Zap className="w-4 h-4 text-red-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">
                Found {presets.length} Community Protocols
              </span>
            </div>
            <button onClick={onClose} className="hidden md:flex w-10 h-10 items-center justify-center bg-zinc-900 text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-studio-scroll">
            {presets.map((preset) => (
              <div key={preset.id} className="group/item flex items-center space-x-8 p-6 bg-white rounded-[2rem] border border-zinc-100 hover:border-zinc-300 hover:shadow-xl transition-all duration-500">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg relative group/thumb">
                  <img src={preset.url} className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-md font-bold text-zinc-900 serif tracking-tight">{preset.title}</h4>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">@{preset.author}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mb-4 line-clamp-2 leading-relaxed">"{preset.data.subject}"</p>
                  <button onClick={() => handleApplyPreset(preset)} className="flex items-center space-x-2 bg-zinc-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg">
                    <Copy className="w-3 h-3" />
                    <span>Apply DSL</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-zinc-50 border-t border-zinc-100 text-center shrink-0">
            <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
              Certified Aesthetic Protocol · v3.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightDetailModal;
