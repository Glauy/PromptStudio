
import React from 'react';
import { PhotographyShot } from '../../types';

interface ShotStripProps {
  shots: PhotographyShot[];
  results: Record<string, string>;
  activeId: string;
  onSelect: (id: string) => void;
}

const ShotStrip: React.FC<ShotStripProps> = ({ shots, results, activeId, onSelect }) => {
  return (
    <div className="flex-1 flex items-center space-x-12 overflow-x-auto py-10 scrollbar-hide px-4">
      {shots.map(shot => {
        const isSelected = activeId === shot.id;
        const hasResult = !!results[shot.id];
        
        return (
          <div key={shot.id} className="relative shrink-0 flex flex-col items-center">
             {/* 胶卷圆孔装饰 */}
             <div className="absolute -top-6 inset-x-0 flex justify-around opacity-10">
                <div className="w-2 h-2 rounded-full bg-black"></div>
                <div className="w-2 h-2 rounded-full bg-black"></div>
             </div>

             <button 
                onClick={() => onSelect(shot.id)}
                className={`relative shrink-0 w-44 aspect-[16/10] rounded-[2.5rem] overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group
                  ${isSelected 
                    ? 'border-[#C0392B] scale-110 shadow-[0_30px_70px_-15px_rgba(192,57,43,0.4)] z-10' 
                    : 'border-zinc-100 opacity-40 hover:opacity-100 hover:border-zinc-300 hover:-translate-y-3 bg-zinc-50'
                  }
                `}
              >
                {hasResult ? (
                  <img src={results[shot.id]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={shot.label} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white/40">
                    <span className="text-[12px] font-mono text-zinc-300 mb-2 group-hover:text-zinc-500 transition-colors">0{shot.id.split('-').pop()}</span>
                    <span className="text-[13px] font-black text-zinc-400 uppercase tracking-widest leading-none truncate w-full group-hover:text-zinc-900 transition-colors italic">{shot.label.split(' - ')[1]}</span>
                  </div>
                )}
                
                {isSelected && (
                  <div className="absolute inset-x-0 bottom-0 h-2.5 bg-[#C0392B] shadow-[0_-5px_20px_rgba(192,57,43,0.6)]"></div>
                )}
                
                {/* 悬浮微光 */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* 胶卷圆孔装饰 */}
              <div className="absolute -bottom-6 inset-x-0 flex justify-around opacity-10">
                <div className="w-2 h-2 rounded-full bg-black"></div>
                <div className="w-2 h-2 rounded-full bg-black"></div>
              </div>
          </div>
        );
      })}
      <div className="w-20 shrink-0"></div>
    </div>
  );
};

export default ShotStrip;
