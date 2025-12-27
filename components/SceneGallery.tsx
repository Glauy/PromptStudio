
import React, { useState } from 'react';
import { CATEGORIES } from '../data/constants';
import { OFFICIAL_SCENE_PRESETS } from '../data/scene_presets';
import { resolvePresetMedia } from '../data/presets';
import { ArrowUpRight, Grid } from 'lucide-react';
import { SceneId } from '../types';
import PresetLookbook from './PresetLookbook';

const SceneGallery: React.FC = () => {
  const [lookbookScene, setLookbookScene] = useState<SceneId | null>(null);

  const handleSceneClick = (sceneId: string) => {
    setLookbookScene(sceneId as SceneId);
  };

  return (
    <section id="scenes" className="py-24 bg-white border-b border-gray-100 relative overflow-visible">
      {/* 预设画廊 Modal - 变体：聚焦模式 */}
      {lookbookScene && (
        <PresetLookbook 
          isOpen={!!lookbookScene} 
          onClose={() => setLookbookScene(null)} 
          initialSceneId={lookbookScene} 
          variant="focused"
        />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-end justify-between mb-16">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">Visual Universe</span>
            <h2 className="text-4xl font-bold serif tracking-tight text-zinc-900">场景分类库</h2>
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100 text-zinc-400">
               <Grid className="w-3.5 h-3.5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Grid View</span>
             </div>
             <button className="group flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest border-b-2 border-zinc-900 pb-1.5 hover:text-red-700 hover:border-red-700 transition-all">
               <span>浏览所有场景规格</span>
               <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 relative">
          {CATEGORIES.map((category, index) => {
            // 关键修复：使用 resolvePresetMedia 包装原始预设，以填充基于 assetId 的 url
            const rawPreset = OFFICIAL_SCENE_PRESETS[category.id as SceneId];
            const preset = rawPreset ? resolvePresetMedia(rawPreset) : null;
            
            // 兜底：如果预设没解析出来，则尝试使用 category 自带的封面图
            const displayUrl = preset?.url || category.coverImage;
            
            return (
              <div 
                key={category.id} 
                onClick={() => handleSceneClick(category.id)}
                className="group flex flex-col space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10 hover:z-30 transition-all cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* 图像容器 */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-50 border border-zinc-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] group-hover:-translate-y-3">
                  <img 
                    src={displayUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* 智能渐变层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* 预设列表触发器 */}
                  <div className="absolute top-6 right-6 translate-y-4 translate-x-4 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <div 
                      className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black shadow-2xl border border-white/20 hover:scale-110 active:scale-95 transition-all"
                    >
                      <Grid className="w-5 h-5" />
                    </div>
                  </div>

                  {/* 悬浮时的底部信息 */}
                  <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                      探索风格志
                    </span>
                  </div>
                </div>

                {/* 信息文本区 */}
                <div className="px-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-700 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] group-hover:text-red-700 transition-colors">
                      {category.nameEn}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 serif tracking-tight group-hover:italic transition-all">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SceneGallery;
