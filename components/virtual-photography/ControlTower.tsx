
import React from 'react';
import { Aperture, Dna, Layout, Cpu, ShieldCheck, Palette } from 'lucide-react';
import { PhotographySession, PhotographyShot, StructuredPrompt } from '../../types';
import ProtocolSection from './ProtocolSection';
import DslInspector from '../DslInspector';

/**
 * ControlTowerProps 接口定义
 * 用于驱动右侧控制塔的全部数据与状态
 */
interface ControlTowerProps {
  /** 核心摄影 Session，包含 L1 系统参数与 L2 人物 DNA */
  session: PhotographySession;
  /** 当前选中的分镜对象 (L3 协议) */
  activeShot: PhotographyShot;
  /** 渲染引擎是否正在执行任务 */
  isRendering: boolean;
  /** 点击快门的回调函数 */
  onShoot: () => void;
  /** 供 DslInspector 展示的结构化提示词对象 */
  dslData: Partial<StructuredPrompt>;
  /** 控制 DSL 观察面板的可见性 */
  showDsl: boolean;
  /** 切换 DSL 观察面板状态的回调 */
  onToggleDsl: () => void;
}

/**
 * ControlTower: 虚拟摄影指令中枢
 * 
 * 此组件采用“分层协议”架构进行 UI 布局：
 * - 顶层 relative 容器：作为 DslInspector 的定位锚点。
 * - 内部 scroll 容器：承载可滚动的 L1-L3 协议配置区块。
 * - 底部 sticky 区域：锁定快门编译按钮。
 * 
 * 注意：DslInspector 必须作为 relative 容器的直接子级，且不能被 overflow 限制，
 * 否则向左滑出的面板会被父级容器裁剪。
 */
const ControlTower: React.FC<ControlTowerProps> = ({ 
  session, 
  activeShot, 
  isRendering, 
  onShoot, 
  dslData, 
  showDsl, 
  onToggleDsl 
}) => {
  return (
    /* 
      【关键修复】：此处为定位基准容器，不设置 overflow。
      它确保了 DslInspector 使用 right-full 定位时能正确投影到左侧 Viewfinder 区域。
    */
    <div className="w-[480px] bg-[#050505] border-l border-white/10 flex flex-col relative">
      
      {/* 
         DSL 观察器组件：
         当 showDsl 为真时，会利用 translate-x-0 从左侧划入视口，
         展示当前摄影协议编译后的 JSON 原始数据。
      */}
      <DslInspector 
        data={dslData} 
        isVisible={showDsl} 
        onToggle={onToggleDsl} 
      />

      {/* 
         内部滚动区域：
         独立滚动协议内容，不影响 DslInspector 的定位。
      */}
      <div className="flex-1 overflow-y-auto p-10 custom-studio-scroll">
        <div className="space-y-12 pb-12">
          
          {/* 
              LAYER 1: 系统配置 (Hardware)
              核心：定义虚拟相机的物理属性（机身、镜头、色彩模型）。
          */}
          <ProtocolSection
            layerIndex="第一层"
            title="系统配置"
            subTitle="System Hardware Config"
            icon={<Aperture className="w-4 h-4" />}
            iconBg="bg-red-600/10"
            iconColor="text-red-500"
            statusText="V4.0_STABLE"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center group">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">机身 (Camera)</span>
                <span className="text-xs text-zinc-200 font-medium">{session.system.cameraBody}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">镜头 (Lens)</span>
                <span className="text-xs text-zinc-200 font-medium">{session.system.lens}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">色彩矩阵 (Matrix)</span>
                <span className="text-[10px] text-blue-400 font-mono italic">{session.system.colorScience}</span>
              </div>
            </div>
          </ProtocolSection>

          {/* 
              LAYER 2: 主体特征 (Persona)
              核心：锁定人物在不同分镜间的一致性 DNA。
          */}
          <ProtocolSection
            layerIndex="第二层"
            title="主体特征"
            subTitle="Persona DNA Protocol"
            icon={<Dna className="w-4 h-4" />}
            iconBg="bg-blue-600/10"
            iconColor="text-blue-500"
            statusText="一致性锁定"
            statusColor="text-green-500/50"
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs text-zinc-600 font-black uppercase mb-3 tracking-widest flex items-center justify-between">
                  <span>主体蓝图 (Blueprint)</span>
                  <Palette className="w-3 h-3" />
                </p>
                <div className="text-xs text-zinc-300 leading-relaxed font-mono p-4 bg-black/40 rounded-2xl border border-white/5 italic">
                  "{session.persona.features}"
                </div>
              </div>
              <div className="h-px bg-white/10"></div>
              <div>
                <p className="text-xs text-zinc-600 font-black uppercase mb-3 tracking-widest">服饰与氛围 (Wardrobe)</p>
                <textarea 
                  value={session.persona.outfit}
                  readOnly
                  className="w-full bg-transparent border-none outline-none text-xs text-blue-400 font-mono italic resize-none leading-relaxed"
                  rows={2}
                />
              </div>
            </div>
          </ProtocolSection>

          {/* 
              LAYER 3: 分镜脚本 (Cinematography)
              核心：决定当前快门瞬间的构图与动态。
          */}
          <ProtocolSection
            layerIndex="第三层"
            title="分镜脚本"
            subTitle="Shot Execution Protocol"
            icon={<Layout className="w-4 h-4" />}
            iconBg="bg-amber-600/10"
            iconColor="text-amber-500"
            statusText="序列活跃"
            statusColor="text-amber-600/50"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] text-amber-900 font-black uppercase tracking-widest">画面构图</p>
                  <p className="text-xs text-zinc-300 font-mono">{activeShot.composition.split('(')[0]}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-amber-900 font-black uppercase tracking-widest">目标姿态</p>
                  <p className="text-xs text-zinc-300 font-mono">{activeShot.pose}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-amber-900/10">
                <p className="text-[10px] text-amber-900 font-black uppercase mb-2 tracking-widest">叙事逻辑 (Narrative)</p>
                <p className="text-xs text-zinc-400 italic leading-relaxed">"{activeShot.narrative}"</p>
              </div>
            </div>
          </ProtocolSection>
        </div>
      </div>

      {/* 
          底部快门控制区：
          通过 sticky 或独立 flex 项锁定在底部。
      */}
      <div className="p-10 border-t border-white/5 bg-[#050505]">
        <button 
          onClick={onShoot}
          disabled={isRendering}
          className={`w-full group relative overflow-hidden bg-white py-6 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center shadow-2xl ${isRendering ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.2)]'}`}
        >
          <div className="relative z-10 flex items-center space-x-4">
            <Cpu className={`w-5 h-5 text-red-600 ${isRendering ? 'animate-spin' : ''}`} />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-black">
              {isRendering ? '正在编译协议数据...' : '执行协议编译并拍摄'}
            </span>
          </div>
          <div className="absolute inset-0 bg-zinc-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
        
        <div className="flex items-center justify-center space-x-4 mt-8 opacity-20">
          <ShieldCheck className="w-4 h-4 text-zinc-400" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">由 Gemini 3.0 专业视觉引擎驱动</span>
        </div>
      </div>
    </div>
  );
};

export default ControlTower;
