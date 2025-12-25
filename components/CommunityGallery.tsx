
import React from 'react';
import { Heart, Share2, Copy, Zap } from 'lucide-react';
import { Preset } from '../types';
import { COMMUNITY_PRESETS } from '../data/presets';
import { GALLERY_ASSETS } from '../data/assets';

const CommunityGallery: React.FC = () => {
  const handleReuse = (preset: Preset) => {
    window.dispatchEvent(new CustomEvent('app:reuse-preset', { detail: preset }));
  };

  return (
    <section id="community" className="py-24 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-red-700 font-bold text-xs uppercase tracking-widest mb-3">
              <Zap className="w-3 h-3" />
              <span>Inspiring Assets</span>
            </div>
            <h2 className="text-4xl font-bold serif text-zinc-900">社区精选 & DSL 实例</h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-500 text-sm max-w-sm text-center md:text-right font-light leading-relaxed">
            这里的每一张图片都是一个 <span className="text-black font-bold">DSL 实例</span>。您可以一键复用其背后的参数组合，开启创作。
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {COMMUNITY_PRESETS.map((preset) => {
            const asset = GALLERY_ASSETS[preset.id as keyof typeof GALLERY_ASSETS];
            
            return (
              <div key={preset.id} className="break-inside-avoid bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-100 relative z-10 hover:z-20">
                <div className="relative overflow-hidden aspect-[4/5] bg-zinc-100">
                  <img 
                    src={preset.url} 
                    alt={preset.title} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (asset?.previewUrl) {
                        target.src = asset.previewUrl;
                      } else {
                        target.src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800';
                      }
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 backdrop-blur-[2px]">
                    <div className="flex space-x-4 mb-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                      <button className="bg-white text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl">
                        <Heart className="w-6 h-6" />
                      </button>
                      <button onClick={() => handleReuse(preset)} className="bg-white text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl">
                        <Copy className="w-6 h-6" />
                      </button>
                      <button className="bg-white text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl">
                        <Share2 className="w-6 h-6" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleReuse(preset)}
                      className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-zinc-100 active:scale-95 transition-all translate-y-6 group-hover:translate-y-0 transition-transform duration-700 delay-75"
                    >
                      一键复用 DSL 预设
                    </button>
                  </div>

                  <div className="absolute top-6 left-6">
                    <span className="bg-black/20 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-white/10">
                      {preset.sceneId}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-red-700 transition-colors serif tracking-tight">《{preset.title}》</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Captured by {preset.author}</p>
                    </div>
                    <div className="flex items-center text-xs font-bold text-zinc-400">
                      <Heart className="w-4 h-4 mr-2 text-red-500 fill-red-500" />
                      {preset.likes}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-6 border-t border-gray-50">
                    <div className="flex -space-x-2.5">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-7 h-7 rounded-full bg-zinc-100 border-2 border-white overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?u=${i+preset.id}`} className="w-full h-full object-cover" alt="avatar" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                      Applied by 2k+ creators
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityGallery;
