
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, MousePointer2 } from 'lucide-react';
import { OnboardingStep } from '../../hooks/useOnboarding';

interface OnboardingStageProps {
  step: OnboardingStep;
  stepIndex: number;
  totalSteps: number;
  targetRect: DOMRect | null;
  onNext: () => void;
  onDismiss: () => void;
}

const OnboardingStage: React.FC<OnboardingStageProps> = ({
  step,
  stepIndex,
  totalSteps,
  targetRect,
  onNext,
  onDismiss
}) => {
  // 必须在所有早期返回之前定义所有 Hook
  const layout = useMemo(() => {
    if (!targetRect) return null;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const gap = 24;
    const cardWidth = 360;
    const cardHeight = 320; 

    let top = targetRect.bottom + gap;
    let left = targetRect.left + (targetRect.width / 2) - (cardWidth / 2);
    let arrowSide: 'top' | 'bottom' = 'top';

    if (targetRect.height > vh * 0.5) {
      top = Math.max(120, targetRect.top + 80); 
    }

    if (top + cardHeight > vh - 20) {
      top = targetRect.top - cardHeight - gap;
      arrowSide = 'bottom';
    }

    if (top < 100 && targetRect.top > 200) {
        top = targetRect.top - cardHeight - gap;
        arrowSide = 'bottom';
    } else if (top < 100) {
        top = targetRect.bottom + gap;
        arrowSide = 'top';
    }

    left = Math.max(20, Math.min(left, vw - cardWidth - 20));

    return { top, left, arrowSide };
  }, [targetRect]);

  // 使用填充规则确保镂空完整且平滑
  const spotlightPath = useMemo(() => {
    if (!targetRect) return "";
    const w = window.innerWidth;
    const h = window.innerHeight;
    const r = targetRect;
    const p = 8; // padding
    
    return `M 0 0 H ${w} V ${h} H 0 Z 
            M ${r.left - p} ${r.top - p} 
            H ${r.right + p} 
            V ${r.bottom + p} 
            H ${r.left - p} 
            Z`;
  }, [targetRect]);

  if (!targetRect || !layout) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden select-none">
      {/* 沉浸式遮罩层 */}
      <svg className="absolute inset-0 w-full h-full">
        <path 
          d={spotlightPath} 
          fill="rgba(0,0,0,0.7)" 
          fillRule="evenodd" 
          className="transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        />
      </svg>

      {/* 动态物理高亮框 */}
      <div 
        className="absolute border-[3px] border-white/80 rounded-2xl shadow-[0_0_0_1000px_rgba(0,0,0,0),0_0_40px_rgba(255,255,255,0.4)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          top: targetRect.top - 10, 
          left: targetRect.left - 10, 
          width: targetRect.width + 20, 
          height: targetRect.height + 20 
        }}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <MousePointer2 className="w-6 h-6 text-white drop-shadow-lg fill-current" />
        </div>
      </div>

      {/* 引导卡片 */}
      <div 
        className="fixed transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto"
        style={{ top: layout.top, left: layout.left, width: 360 }}
      >
        {/* 精确指向箭头 */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-8 border-transparent transition-all duration-700
            ${layout.arrowSide === 'top' ? 'border-b-white -top-4' : 'border-t-white -bottom-4'}
          `}
        />

        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-zinc-100 overflow-hidden">
          {/* 线性进度条 */}
          <div className="h-1.5 bg-zinc-100 flex">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`flex-1 transition-all duration-1000 ${i <= stepIndex ? 'bg-zinc-900' : ''}`} />
            ))}
          </div>

          <div className="p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-[1.25rem] bg-zinc-50 flex items-center justify-center border border-zinc-100 shadow-sm">
                  {step.icon}
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 block mb-0.5">Protocol Step</span>
                   <span className="text-[11px] font-black text-zinc-900 uppercase tracking-widest leading-none">
                     {stepIndex + 1} / {totalSteps}
                   </span>
                </div>
              </div>
              <button 
                onClick={onDismiss} 
                className="p-2.5 hover:bg-zinc-50 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900" />
              </button>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
              <h4 className="text-2xl font-bold text-zinc-900 mb-4 serif tracking-tight">{step.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed mb-10 font-medium">{step.content}</p>
            </div>

            <button 
              onClick={onNext}
              className="w-full flex items-center justify-between bg-zinc-900 text-white pl-10 pr-8 py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.25em] hover:bg-black transition-all group active:scale-[0.98] shadow-2xl shadow-black/20"
            >
              <span>{stepIndex === totalSteps - 1 ? '完成初始化' : '下一步'}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OnboardingStage;
