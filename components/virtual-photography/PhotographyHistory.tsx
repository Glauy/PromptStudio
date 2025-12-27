
import React from 'react';
import { Film, Clock } from 'lucide-react';

interface PhotographyHistoryProps {
  items: string[];
}

const PhotographyHistory: React.FC<PhotographyHistoryProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="h-40 bg-white/40 border-t border-zinc-100 px-10 flex items-center space-x-8 shrink-0 relative">
      <div className="flex flex-col items-center space-y-1 text-zinc-400 shrink-0">
        <Film className="w-5 h-5" />
        <span className="text-[8px] font-black uppercase tracking-[0.3em]">底片库</span>
      </div>

      <div className="flex-1 flex items-center space-x-6 overflow-x-auto py-4 custom-studio-scroll scrollbar-hide">
        {items.map((url, i) => (
          <div 
            key={i}
            className="group relative shrink-0 w-24 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-200 shadow-sm transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <img src={url} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center space-x-1">
                <Clock className="w-2 h-2 text-white" />
                <span className="text-[7px] text-white font-mono">0{items.length - i}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
      
      {/* 渐变遮罩 */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F5F7] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default PhotographyHistory;
