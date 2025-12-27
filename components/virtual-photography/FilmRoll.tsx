
import React from 'react';
import { Film } from 'lucide-react';
import { PhotographyShot } from '../../types';

/**
 * 胶卷列表组件属性定义
 */
interface FilmRollProps {
  /** 当前 Session 定义的全部分镜脚本序列 */
  shots: PhotographyShot[];
  /** 实时生成的渲染结果映射表 { shotId: imageUrl } */
  results: Record<string, string>;
  /** 当前处于选中状态（在取景器中展示）的分镜 ID */
  activeShotId: string;
  /** 点击分镜卡片时的切换回调 */
  onShotSelect: (id: string) => void;
}

/**
 * FilmRoll: 摄影任务的序列管理器
 * 负责展示当前拍摄任务中的全部分镜，并以胶卷缩略图的形式反馈拍摄进度。
 */
const FilmRoll: React.FC<FilmRollProps> = ({ shots, results, activeShotId, onShotSelect }) => {
  return (
    <div className="w-full max-w-5xl h-48 shrink-0 flex items-center space-x-12 px-4">
      {/* 装饰侧栏：标识该区块为胶卷存档区 */}
      <div className="flex flex-col items-center space-y-2 text-zinc-700 shrink-0">
        <Film className="w-6 h-6" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">胶卷库</span>
      </div>
      
      {/* 滚动容器：承载分镜卡片 */}
      <div className="flex-1 flex items-center space-x-8 overflow-x-auto py-6 custom-studio-scroll scrollbar-hide">
        {shots.map(shot => {
          const isSelected = activeShotId === shot.id;
          const hasResult = !!results[shot.id];
          
          return (
            <button 
              key={shot.id}
              onClick={() => onShotSelect(shot.id)}
              className={`relative shrink-0 w-28 aspect-[3/4] rounded-2xl overflow-hidden border transition-all duration-500 ${
                isSelected 
                ? 'border-red-600 ring-4 ring-red-600/20 scale-105 z-10 shadow-[0_15px_40px_rgba(220,38,38,0.2)]' 
                : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
              }`}
            >
              {/* 图像层：优先展示生成后的预览图，否则展示占位占位符 */}
              {hasResult ? (
                <img src={results[shot.id]} className="w-full h-full object-cover" alt={shot.label} />
              ) : (
                <div className="w-full h-full bg-zinc-900/50 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-zinc-600 mb-2">{shot.id.split('-').pop()}</span>
                  <span className="text-xs font-bold text-zinc-700 leading-tight">{shot.label.split(' - ')[1]}</span>
                </div>
              )}

              {/* 渲染中反馈：如果该项被选中且尚未有结果，显示微小的呼吸灯提示 */}
              {isSelected && !hasResult && (
                 <div className="absolute inset-0 bg-red-600/5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]"></div>
                 </div>
              )}
            </button>
          );
        })}
        {/* 末尾占位：防止最后一项贴边 */}
        <div className="shrink-0 w-8"></div>
      </div>
    </div>
  );
};

export default FilmRoll;
