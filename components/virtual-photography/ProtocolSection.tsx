
import React, { ReactNode } from 'react';

/**
 * 协议区块属性定义
 */
interface ProtocolSectionProps {
  /** 协议层级标识 (如：第一层) */
  layerIndex: string;
  /** 协议主标题 (如：系统配置) */
  title: string;
  /** 协议英文/副标题 (如：System Hardware Config) */
  subTitle: string;
  /** 协议层级图标 */
  icon: ReactNode;
  /** 图标容器背景色类 */
  iconBg: string;
  /** 图标颜色类 */
  iconColor: string;
  /** 状态标签文字 (如：V4.0_STABLE) */
  statusText?: string;
  /** 状态标签颜色类 */
  statusColor?: string;
  /** 协议项内部的具体字段渲染 */
  children: ReactNode;
}

/**
 * ProtocolSection: 协议展示的标准化原子组件
 * 用于在控制塔中统一呈现不同层级的视觉协议，确保 UI 逻辑的一致性。
 */
const ProtocolSection: React.FC<ProtocolSectionProps> = ({ 
  layerIndex, title, subTitle, icon, iconBg, iconColor, statusText, statusColor = 'text-zinc-700', children 
}) => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 头部信息：定义层级与状态 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center border border-white/5`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-200">{layerIndex}：{title}</h3>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">{subTitle}</p>
          </div>
        </div>
        {statusText && <span className={`text-[10px] font-mono ${statusColor}`}>{statusText}</span>}
      </div>
      
      {/* 内容卡片：包裹具体参数项 */}
      <div className="bg-white/[0.02] p-6 rounded-[1.5rem] border border-white/5 space-y-4 shadow-inner">
        {children}
      </div>
    </section>
  );
};

export default ProtocolSection;
