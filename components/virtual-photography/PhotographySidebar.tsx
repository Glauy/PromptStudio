
import React from 'react';
import { Cpu, Zap, Layout, Trash2, ImageIcon, Scan, CheckCircle2, Camera } from 'lucide-react';
import { PhotographySession, PhotographyMode } from '../../types';

interface PhotographySidebarProps {
  session: PhotographySession;
  activeShotId: string;
  onShotSelect: (id: string) => void;
  mode: PhotographyMode;
  refImage?: string;
  isLocked: boolean;
  onImageUpload: (base64: string) => void;
  isRendering: boolean;
  onShoot: () => void;
  sessionResults: Record<string, string>;
}

const PhotographySidebar: React.FC<PhotographySidebarProps> = ({ 
  session, activeShotId, onShotSelect, mode, refImage, isLocked, onImageUpload, isRendering, onShoot, sessionResults 
}) => {
  return (
    <aside className="w-[320px] bg-white border-r border-zinc-100 flex flex-col shrink-0 z-20 shadow-[20px_0_40px_rgba(0,0,0,0.02)]">
      {/* 状态指示区 */}
      <div className="p-6 border-b border-zinc-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">活跃工作流</span>
          </div>
          <span className="text-[8px] font-mono text-zinc-300">V4.2_STABLE</span>
        </div>
        <h2 className="text-lg font-bold serif text-zinc-900 truncate">{session.title}</h2>
      </div>

      {/* 协议堆栈 */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 custom-studio-scroll">
        
        {/* L1. 光学系统 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">第一层：光学系统</span>
          </div>
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">机身/镜头</span>
              <span className="text-[10px] font-mono text-zinc-800">{session.system.cameraBody.split(' ')[0]} · {session.system.lens.split(' ')[0]}</span>
            </div>
            <div className="h-px bg-zinc-200/50"></div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">色彩矩阵</span>
              <span className="text-[9px] font-mono text-blue-600 font-bold">14-BIT RAW</span>
            </div>
          </div>
        </div>

        {/* L2. 身份协议 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className={`w-3.5 h-3.5 ${isLocked ? 'text-red-600' : 'text-zinc-400'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">第二层：身份协议</span>
            </div>
            {isLocked && <CheckCircle2 className="w-3 h-3 text-green-500" />}
          </div>
          
          {mode === 'portrait' ? (
            <div className="relative aspect-[16/10] bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 overflow-hidden flex flex-col items-center justify-center group">
              {refImage ? (
                <>
                  <img src={refImage} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => onImageUpload('')} 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                     <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center space-y-2 cursor-pointer">
                   <ImageIcon className="w-5 h-5 text-zinc-300" />
                   <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">注入特征图</span>
                   <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                       const file = e.target.files?.[0];
                       if (file) {
                         const reader = new FileReader();
                         reader.onload = (re) => onImageUpload(re.target?.result as string);
                         reader.readAsDataURL(file);
                       }
                    }} 
                   />
                </label>
              )}
            </div>
          ) : (
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 italic serif text-[10px] text-zinc-500 leading-relaxed line-clamp-3">
              "{session.persona.features}"
            </div>
          )}
        </div>

        {/* L3. 分镜列表 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Layout className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">第三层：分镜脚本</span>
          </div>
          <div className="space-y-3">
            {session.shots.map(shot => {
              const uniqueKey = `${session.id}-${shot.id}`;
              const isSelected = activeShotId === shot.id;
              const hasResult = !!sessionResults[uniqueKey];
              return (
                <button 
                  key={shot.id}
                  onClick={() => onShotSelect(shot.id)}
                  className={`w-full p-3 rounded-2xl border flex items-center space-x-3 transition-all ${isSelected ? 'bg-white border-red-600 shadow-lg -translate-y-0.5' : 'bg-zinc-50 border-zinc-100 opacity-60 hover:opacity-100'}`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-zinc-100 bg-white">
                    <img src={hasResult ? sessionResults[uniqueKey] : shot.previewUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                       <span className={`text-[9px] font-black uppercase tracking-widest ${isSelected ? 'text-red-600' : 'text-zinc-400'}`}>{shot.label.split(' - ')[1]}</span>
                       {isSelected && <Scan className="w-2.5 h-2.5 text-red-600" />}
                    </div>
                    <p className="text-[10px] font-bold text-zinc-900 truncate">{shot.composition}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部快门 - 精致化 */}
      <div className="p-6 border-t border-zinc-50 bg-white/80 backdrop-blur-xl">
        <button 
          onClick={onShoot}
          disabled={isRendering || (mode === 'portrait' && !refImage)}
          className={`w-full py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-xl ${isRendering || (mode === 'portrait' && !refImage) ? 'bg-zinc-100 text-zinc-300' : 'bg-[#C0392B] text-white hover:bg-red-700 shadow-red-700/10'}`}
        >
          <Camera className={`w-4 h-4 ${isRendering ? 'animate-spin' : ''}`} />
          <span className="text-xs font-black uppercase tracking-[0.4em]">执行拍摄</span>
        </button>
        <p className="text-center text-[8px] font-mono text-zinc-300 mt-4 uppercase tracking-widest">Aesthetic Protocol Verified</p>
      </div>
    </aside>
  );
};

export default PhotographySidebar;
