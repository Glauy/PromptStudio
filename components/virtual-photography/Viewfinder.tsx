
import React from 'react';
import { Focus, Aperture } from 'lucide-react';

/**
 * 取景器组件属性定义
 */
interface ViewfinderProps {
  /** 当前选中的分镜渲染结果 URL */
  activeImageUrl?: string;
  /** 全局渲染引擎状态：正在执行像素编译时为 true */
  isRendering: boolean;
  /** 点击图像执行全屏预览的回调 */
  onPreview: () => void;
  /** 映射自摄影协议 L1 层的物理光学参数 */
  systemParams: {
    /** 物理光圈值 (如 f/1.9) */
    aperture: string;
    /** 快门速度 (如 1/250s) */
    shutter: string;
    /** 感光度 (ISO) */
    iso: string;
  };
}

/**
 * Viewfinder: 虚拟摄影系统的视觉输出核心
 * 模拟专业相机的取景窗口，整合了光学参数反馈、对焦框视觉增强以及异步渲染状态提示。
 */
const Viewfinder: React.FC<ViewfinderProps> = ({ activeImageUrl, isRendering, onPreview, systemParams }) => {
  return (
    <div className="relative w-full max-w-5xl flex-1 flex flex-col justify-center">
      {/* 外部框体：模拟专业级监视器边框 */}
      <div className="aspect-[16/9] bg-zinc-900/30 rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-[0_0_120px_rgba(0,0,0,0.6)]">
        
        {/* 取景舞台：核心像素呈现区域 */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative aspect-[3/4] h-full border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center bg-black shadow-2xl">
            
            {/* 动态对焦参考线：增加摄影沉浸感 */}
            <div className="absolute top-8 left-8 border-t-2 border-l-2 border-white/30 w-10 h-10"></div>
            <div className="absolute top-8 right-8 border-t-2 border-r-2 border-white/30 w-10 h-10"></div>
            <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-white/30 w-10 h-10"></div>
            <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-white/30 w-10 h-10"></div>
            
            {/* 图像呈现逻辑：根据是否有渲染结果展示内容 */}
            {activeImageUrl ? (
              <img 
                src={activeImageUrl} 
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000 cursor-zoom-in" 
                alt="Viewfinder Content" 
                onClick={onPreview}
              />
            ) : (
              <div className="flex flex-col items-center opacity-20 space-y-6">
                <Focus className="w-20 h-20" />
                <span className="text-sm font-black uppercase tracking-[0.5em]">取景器已就绪</span>
              </div>
            )}

            {/* 渲染覆盖层：当后端执行生成任务时，阻塞交互并提供视觉反馈 */}
            {isRendering && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 z-30">
                <Aperture className="w-16 h-16 text-red-600 animate-spin" />
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-[0.5em] text-red-500 mb-2">正在捕捉光学特征...</p>
                  <p className="text-[10px] text-zinc-500 italic">正在由 Gemini 编译一亿像素视觉协议</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部物理参数状态条：实时反馈 L1 配置 */}
        <div className="absolute bottom-10 inset-x-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center space-x-12 px-10 py-4 bg-black/80 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl transition-all group-hover:bg-black/90">
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">光圈</span>
              <span className="text-sm font-mono font-bold italic text-zinc-100">{systemParams.aperture}</span>
            </div>
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">快门</span>
              <span className="text-sm font-mono font-bold italic text-zinc-100">{systemParams.shutter}</span>
            </div>
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">感光度</span>
              <span className="text-sm font-mono font-bold italic text-zinc-100">{systemParams.iso}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewfinder;
