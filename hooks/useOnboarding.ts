
import React, { useState, useEffect, useCallback, useRef } from 'react';

export interface OnboardingStep {
  targetId: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface UseOnboardingOptions {
  key: string;
  steps: OnboardingStep[];
  autoStartDelay?: number;
}

export function useOnboarding({ key, steps, autoStartDelay = 1500 }: UseOnboardingOptions) {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const requestRef = useRef<number>(null);

  const updateRect = useCallback(() => {
    const step = steps[currentStepIndex];
    const el = document.getElementById(step.targetId);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
    }
  }, [currentStepIndex, steps]);

  const start = useCallback(() => {
    setIsActive(true);
    setCurrentStepIndex(0);
  }, []);

  const dismiss = useCallback(() => {
    setIsActive(false);
    localStorage.setItem(key, 'true');
  }, [key]);

  const next = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      dismiss();
    }
  }, [currentStepIndex, steps.length, dismiss]);

  // 检查首次启动
  useEffect(() => {
    if (localStorage.getItem(key)) return;
    const timer = setTimeout(start, autoStartDelay);
    return () => clearTimeout(timer);
  }, [key, autoStartDelay, start]);

  // 追踪位置与自动滚动
  useEffect(() => {
    if (!isActive) return;

    // 定时刷新位置以应对动态布局
    const sync = () => {
      updateRect();
      requestRef.current = requestAnimationFrame(sync);
    };
    requestRef.current = requestAnimationFrame(sync);

    // 步骤切换时自动滚动
    const step = steps[currentStepIndex];
    const el = document.getElementById(step.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      // 滚动到目标上方 120px 处，避开 Fixed Header
      window.scrollTo({ top: absoluteTop - 120, behavior: 'smooth' });
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, currentStepIndex, steps, updateRect]);

  return {
    isActive,
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    totalSteps: steps.length,
    targetRect,
    start,
    next,
    dismiss
  };
}
