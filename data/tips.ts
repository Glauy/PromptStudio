
import { UserMode } from '../types';

export const STUDIO_TIPS = [
  {
    id: 1,
    title: '摄影师建议',
    content: '“对于人物肖像，肤色 (Skin Tone) 的控制优先级通常高于构图，尝试在专家模式下微调肤色字段的权重。”',
    category: 'portrait'
  },
  {
    id: 2,
    title: '光影逻辑',
    content: '“光线是画面的灵魂。在自然风景场景中，丁达尔效应 (Tyndall Effect) 配合金色时刻能瞬间提升作品的灵性。”',
    category: 'nature'
  },
  {
    id: 3,
    title: '微距美学',
    content: '“微距摄影不仅是放大，更是对虚实的极致控制。建议使用 100mm 镜头预设，并开启高画质增强。”',
    category: 'macro'
  }
];

export const MODE_DESCRIPTIONS: { mode: UserMode; title: string; desc: string }[] = [
  { mode: 'beginner', title: '新手', desc: '预设驱动，一键出片。' },
  { mode: 'advanced', title: '进阶', desc: '全参数开放，精细化构图。' },
  { mode: 'expert', title: '专家', desc: '语义权重微调，底层 Prompt 调试。' }
];
