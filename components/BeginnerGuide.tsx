
import React, { useEffect } from 'react';
import { Sparkles, LayoutGrid, Edit3, Wand2, Play } from 'lucide-react';
import { useOnboarding, OnboardingStep } from '../hooks/useOnboarding';
import OnboardingStage from './common/OnboardingStage';

const LAB_STEPS: OnboardingStep[] = [
  {
    targetId: 'scenes',
    title: '锚定视觉容器',
    content: '从 12 类专业影像维度中选择一个。每个场景都预设了不同的光学物理逻辑与审美护栏，确保创作不偏离艺术范式。',
    icon: <LayoutGrid className="w-5 h-5 text-zinc-900" />
  },
  {
    targetId: 'guide-target-lookbook-trigger',
    title: '注入风格基因',
    content: '在风格志中挑选专家级预设。这些预设包含了精密的色彩平衡、构图权重与滤镜参数，是极佳的创作起点。',
    icon: <Sparkles className="w-5 h-5 text-blue-500" />
  },
  {
    targetId: 'guide-target-input-subject',
    title: '定义视觉核心',
    content: '在指令舱内自由修改主体描述。支持中英文混合输入，底层编译器会自动将其映射到高维特征空间。',
    icon: <Edit3 className="w-5 h-5 text-amber-500" />
  },
  {
    targetId: 'guide-target-btn-optimize',
    title: 'AI 智慧润色 (可选)',
    content: '点击魔棒。Gemini 将基于东方美学准则为你优化描述词，注入专业影调细节。若你追求极致纯粹，亦可跳过此步直接渲染。',
    icon: <Wand2 className="w-5 h-5 text-purple-500" />
  },
  {
    targetId: 'guide-target-btn-render',
    title: '编译并渲染',
    content: '一切就绪。点击渲染，我们的分布式引擎将执行最后的像素重构，将你的结构化 DSL 指令转化为震撼视口的视觉作品。',
    icon: <Play className="w-5 h-5 text-emerald-500" />
  }
];

interface BeginnerGuideProps {
  isVisible?: boolean;
  onDismiss?: () => void;
}

const BeginnerGuide: React.FC<BeginnerGuideProps> = ({ isVisible: externalVisible, onDismiss: externalDismiss }) => {
  const onboarding = useOnboarding({
    key: 'promptstudio_onboarding_v3',
    steps: LAB_STEPS,
    autoStartDelay: 2000
  });

  useEffect(() => {
    const handleTrigger = (e: any) => {
      if (e.detail === 'beginner') {
        onboarding.start();
      }
    };
    window.addEventListener('app:mode-change', handleTrigger);
    return () => window.removeEventListener('app:mode-change', handleTrigger);
  }, [onboarding]);

  const active = externalVisible !== undefined ? externalVisible : onboarding.isActive;

  if (!active) return null;

  return (
    <OnboardingStage
      step={onboarding.currentStep}
      stepIndex={onboarding.currentStepIndex}
      totalSteps={onboarding.totalSteps}
      targetRect={onboarding.targetRect}
      onNext={onboarding.next}
      onDismiss={() => {
        onboarding.dismiss();
        if (externalDismiss) externalDismiss();
      }}
    />
  );
};

export default BeginnerGuide;
