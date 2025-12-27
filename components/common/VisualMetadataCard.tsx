
import React from 'react';

interface MetadataStat {
  label: string;
  value: string;
  progress?: number; // 0-100
}

interface VisualMetadataCardProps {
  title: string;
  statusLabel?: string;
  stats?: MetadataStat[];
  avatars?: string[];
  extraCount?: string;
  className?: string;
}

const VisualMetadataCard: React.FC<VisualMetadataCardProps> = ({
  title,
  statusLabel = "Active Layer",
  stats = [],
  avatars = [],
  extraCount,
  className = ""
}) => {
  return (
    <div className={`
      bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] 
      border border-white/50 border-gray-100 max-w-[300px] 
      transition-all duration-700 hover:scale-[1.05] hover:-translate-y-2
      ${className}
    `}>
      {/* 状态指示区 */}
      <div className="flex items-center space-x-3 mb-5">
        <div className="relative flex h-2.5 w-2.5">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></div>
        </div>
        <span className="text-[10px] text-zinc-900 font-black uppercase tracking-[0.25em]">{statusLabel}</span>
      </div>

      {/* 标题 */}
      <h4 className="text-xl font-bold mb-6 serif tracking-tight text-zinc-900 leading-tight">
        {title.startsWith('《') ? title : `《${title}》`}
      </h4>

      {/* 指标/统计区 */}
      <div className="space-y-5 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-400">{stat.label}</span>
              <span className="text-zinc-900">{stat.value}</span>
            </div>
            {typeof stat.progress === 'number' && (
              <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zinc-900 transition-all duration-1000 ease-out" 
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 社交/堆叠区 */}
      {(avatars.length > 0 || extraCount) && (
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2.5">
            {avatars.map((url, i) => (
              <div 
                key={i} 
                className="w-9 h-9 rounded-full bg-zinc-100 border-2 border-white shadow-sm overflow-hidden transition-transform hover:translate-y-[-4px]"
              >
                 <img src={url} className="w-full h-full object-cover" alt="User" />
              </div>
            ))}
            {extraCount && (
              <div className="w-9 h-9 rounded-full bg-zinc-900 text-white text-[9px] font-black flex items-center justify-center border-2 border-white shadow-lg">
                {extraCount}
              </div>
            )}
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-200"></div>
        </div>
      )}
    </div>
  );
};

export default VisualMetadataCard;
