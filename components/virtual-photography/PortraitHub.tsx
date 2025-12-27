
import React, { useRef, useState } from 'react';
import { Upload, Scan, UserCheck, ShieldCheck, Image as ImageIcon } from 'lucide-react';

/**
 * PortraitHubProps 属性定义
 */
interface PortraitHubProps {
  /** 原始引用的图片 Base64 */
  image?: string;
  /** 是否正在解析特征 */
  isAnalyzing: boolean;
  /** 特征锁定状态 */
  isLocked: boolean;
  /** 图片选择回调 */
  onImageSelect: (base64: string) => void;
}

/**
 * PortraitHub: 写真模式下的“感光工作站”
 * 负责用户自拍图片的上传、视觉反馈预览以及模拟面部骨相扫描。
 */
const PortraitHub: React.FC<PortraitHubProps> = ({ image, isAnalyzing, isLocked, onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onImageSelect(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-lg aspect-[3/4] bg-zinc-900/50 rounded-[3rem] border border-white/5 overflow-hidden flex flex-col items-center justify-center group">
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*" 
        />

        {image ? (
          <div className="relative w-full h-full animate-in fade-in zoom-in-95 duration-700">
            <img src={image} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" alt="Reference" />
            
            {/* 扫描线动画：模拟特征提取 */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-blue-500/10 pointer-events-none">
                <div className="w-full h-0.5 bg-blue-400 shadow-[0_0_15px_#3b82f6] absolute top-0 left-0 animate-[scan_2s_infinite]"></div>
              </div>
            )}

            {/* 状态悬浮标签 */}
            <div className="absolute top-8 left-8 flex items-center space-x-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
              {isLocked ? (
                <UserCheck className="w-4 h-4 text-green-500" />
              ) : (
                <Scan className="w-4 h-4 text-blue-400 animate-pulse" />
              )}
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-200">
                {isLocked ? '身份特征已锁定' : '特征同步中...'}
              </span>
            </div>

            {/* 重选按钮 */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-8 inset-x-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] transition-all opacity-0 group-hover:opacity-100"
            >
              重新上传自拍图片
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8 p-12 text-center group">
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-500">
              <Upload className="w-8 h-8 text-zinc-600 group-hover:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-3">上传人物参考图</h4>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-loose">
                上传自拍或模特图 <br /> 引擎将自动提取骨相 DNA 进行写真生成
              </p>
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              选择本地影像文件
            </button>
          </div>
        )}

        <style>{`
          @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PortraitHub;
