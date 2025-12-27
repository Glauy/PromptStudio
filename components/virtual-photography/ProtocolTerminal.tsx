
import React from 'react';
// Added Camera to lucide-react imports
import { Cpu, Zap, Image as ImageIcon, Trash2, Layout, Scan, CheckCircle2, Film, Sparkles, Camera } from 'lucide-react';
import { PhotographySession, PhotographyMode } from '../../types';

interface ProtocolTerminalProps {
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

const ProtocolTerminal: React.FC<ProtocolTerminalProps> = ({ 
  session, activeShotId, onShotSelect, mode, refImage, isLocked, onImageUpload, isRendering, onShoot, sessionResults 
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* 流水线纵轴背景线 */}
      <div className="absolute left-10 top-24 bottom-60 w-px bg-zinc-100 -z-10"></div>

      {/* 终端头部 */}
      <div className="p-8 pb-6 bg-white/40">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-3 h-3 text-red-600" />
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-red-600">Active Workflow</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 serif truncate">{session.title}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 space-y-12 custom-studio-scroll pb-10">
        
        {/* L1. 硬件层 */}
        <div className="relative pl-10">
          <div className="absolute left-[-2px] top-1 w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg">
             <Cpu className="w-2.5 h-2.5" />
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">L1. Optical Grid</span>
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-400 uppercase tracking-widest mb-1">Body/Lens</span>
                  <span className="text-[10px] font-mono text-zinc-800 font-bold">{session.system.cameraBody.split(' ')[0]} · {session.system.lens.split(' ')[0]}</span>
               </div>
               <div className="h-6 w-px bg-zinc-200"></div>
               <div className="text-right">
                  <span className="text-[8px] text-zinc-400 uppercase tracking-widest mb-1">Color</span>
                  <span className="text-[10px] font-mono text-zinc-800 font-bold">14-bit RAW</span>
               </div>
            </div>
          </div>
        </div>

        {/* L2. 人物基因层 */}
        <div className="relative pl-10">
          <div className={`absolute left-[-2px] top-1 w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-colors ${isLocked ? 'bg-[#C0392B] text-white' : 'bg-zinc-100 text-zinc-400'}`}>
             <Zap className="w-2.5 h-2.5" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">L2. Persona DNA</span>
              {isLocked && <CheckCircle2 className="w-3 h-3 text-green-500" />}
            </div>
            
            {mode === 'portrait' ? (
              <div className="relative aspect-[16/10] bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 overflow-hidden flex flex-col items-center justify-center group hover:border-red-600/20">
                {refImage ? (
                  <>
                    <img src={refImage} className="w-full h-full object-cover" />
                    <button onClick={() => onImageUpload('')} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center space-y-2 cursor-pointer">
                     <ImageIcon className="w-5 h-5 text-zinc-300" />
                     <span className="text-[9px] font-black uppercase text-zinc-400">注入参考特征</span>
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                           const reader = new FileReader();
                           reader.onload = (re) => onImageUpload(re.target?.result as string);
                           reader.readAsDataURL(file);
                         }
                     }} />
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 relative group overflow-hidden">
                 <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] group-hover:rotate-12 transition-transform">
                   <Layout className="w-20 h-20" />
                 </div>
                 <p className="text-[11px] text-zinc-600 leading-relaxed italic serif relative z-10">"{session.persona.features.substring(0, 80)}..."</p>
              </div>
            )}
          </div>
        </div>

        {/* L3. 分镜执行层 - 这里的 UI 提升很大 */}
        <div className="relative pl-10">
          <div className="absolute left-[-2px] top-1 w-5 h-5 rounded-full bg-[#C0392B] text-white flex items-center justify-center shadow-lg shadow-red-700/20">
             <Layout className="w-2.5 h-2.5" />
          </div>
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">L3. Scenarios List</span>
            
            <div className="space-y-4">
               {session.shots.map(shot => {
                 const uniqueKey = `${session.id}-${shot.id}`;
                 const isSelected = activeShotId === shot.id;
                 const hasResult = !!sessionResults[uniqueKey];
                 const displayImage = hasResult ? sessionResults[uniqueKey] : shot.previewUrl;

                 return (
                   <button 
                     key={shot.id} 
                     onClick={() => onShotSelect(shot.id)}
                     className={`w-full group/shot p-3 rounded-[1.5rem] border text-left transition-all flex items-center space-x-4
                       ${isSelected 
                         ? 'bg-white border-[#C0392B] shadow-2xl shadow-red-700/5 -translate-y-1' 
                         : 'bg-white border-zinc-100 hover:border-zinc-300 opacity-60 hover:opacity-100'}
                     `}
                   >
                     <div className={`w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-zinc-100 shadow-sm relative`}>
                        <img src={displayImage} className="w-full h-full object-cover transition-transform group-hover/shot:scale-110" />
                        {hasResult && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                          </div>
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-[#C0392B]' : 'text-zinc-500'}`}>{shot.label}</span>
                          {isSelected && <Scan className="w-3 h-3 text-[#C0392B] animate-pulse" />}
                        </div>
                        <p className="text-[11px] font-bold text-zinc-900 truncate leading-none mb-1">{shot.composition}</p>
                        <p className="text-[8px] text-zinc-400 uppercase tracking-widest truncate">{shot.pose}</p>
                     </div>
                   </button>
                 );
               })}
            </div>
          </div>
        </div>
      </div>

      {/* 底部快门区 */}
      <div className="p-8 border-t border-zinc-100 bg-white/80 backdrop-blur-xl shrink-0">
        <button 
          onClick={onShoot}
          disabled={isRendering || (mode === 'portrait' && !refImage)}
          className={`w-full py-6 rounded-[2rem] flex flex-col items-center justify-center space-y-1 transition-all active:scale-[0.98] relative overflow-hidden group
            ${isRendering || (mode === 'portrait' && !refImage) 
              ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed' 
              : 'shutter-red text-white'}
          `}
        >
          {isRendering && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
          <div className="flex items-center space-x-3 relative z-10">
            <Camera className={`w-4 h-4 ${isRendering ? 'animate-spin' : ''}`} />
            <span className="text-[13px] font-black uppercase tracking-[0.8em] translate-x-[0.4em]">
              {isRendering ? 'Pixel Gen' : 'Capture'}
            </span>
          </div>
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40">Matrix Ready v4.2</span>
        </button>
      </div>
    </div>
  );
};

export default ProtocolTerminal;
