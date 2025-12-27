
import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Globe, 
  Camera, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Beaker, 
  Terminal,
  FileCode2,
  Share2,
  Workflow,
  Focus
} from 'lucide-react';
import VisualMetadataCard from './common/VisualMetadataCard';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 animate-in fade-in duration-1000">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex items-center justify-between mix-blend-difference text-white">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.4em] hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回实验室</span>
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.5em]">The Philosophy of Visual DNA</div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-zinc-50/50 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-40"></div>
        </div>

        <span className="text-red-700 font-black text-[10px] uppercase tracking-[1em] mb-12 block animate-in slide-in-from-top-12 duration-1000 italic">Vision into Structure</span>
        <h1 className="text-7xl lg:text-9xl font-black serif tracking-tighter leading-none mb-12 animate-in slide-in-from-bottom-12 duration-1000 delay-200">
          重塑东方的 <br />
          <span className="text-zinc-200 italic">数字骨相</span>
        </h1>
        <p className="max-w-2xl text-xl text-zinc-500 font-light leading-relaxed animate-in fade-in duration-1000 delay-500">
          PromptStudio 致力于将模糊的艺术直觉转化为精密的视觉协议。我们通过 DSL (领域特定语言) 架构，在虚拟空间中重建光影逻辑，让每一颗像素都具备可工程化的美学基因。
        </p>
      </section>

      {/* 核心价值：从混沌到结构 */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-24 items-center border-t border-zinc-100">
        <div className="space-y-12">
          <div className="inline-flex items-center space-x-4 px-5 py-2.5 bg-zinc-900 text-white rounded-2xl shadow-xl">
             <FileCode2 className="w-5 h-5" />
             <span className="text-[10px] font-black uppercase tracking-widest">Visual DSL Architecture</span>
          </div>
          <h2 className="text-5xl font-black serif leading-tight">将视觉直觉 <br /> 转化为 <span className="text-red-700">算法逻辑</span></h2>
          <div className="space-y-6 text-zinc-500 text-lg leading-relaxed">
            <p>
              传统的 AI 提示词是繁琐且不可控的。在 PromptStudio，我们将复杂的描述拆解为 Subject (骨相)、Environment (环境)、Lighting (光影) 等标准参数。
            </p>
            <p>
              这种结构化方式不仅实现了极致的**风格一致性**，更让创作者能以摄影师的视角——通过调整焦段、光圈、影调权重，精准操控 AI 的生成质量。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-8">
             <div className="space-y-3">
                <h4 className="font-black text-xs uppercase tracking-widest">100% 可视化</h4>
                <p className="text-xs text-zinc-400">所有参数一目了然，不再是盲盒猜测。</p>
             </div>
             <div className="space-y-3">
                <h4 className="font-black text-xs uppercase tracking-widest">极致复用</h4>
                <p className="text-xs text-zinc-400">一套协议即可跨场景生成同风格作品。</p>
             </div>
          </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-red-700 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
           <VisualMetadataCard 
              title="协议编译示例"
              statusLabel="Protocol Visualization"
              stats={[
                { label: "Bone Structure", value: "Refined Oriental", progress: 95 },
                { label: "Lens Spec", value: "85mm Prime f/1.2", progress: 75 },
                { label: "Mood Tone", value: "Wabi-Sabi Zen", progress: 88 }
              ]}
              className="mx-auto transform rotate-3 group-hover:rotate-0 transition-transform duration-1000"
           />
        </div>
      </section>

      {/* 实验室与场景定制 */}
      <section className="bg-zinc-50 py-32 overflow-hidden border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Laboratory Ecosystem</span>
              <h2 className="text-6xl font-black serif leading-none tracking-tighter">
                为每一位 <br /> <span className="text-zinc-300 italic">数字炼金术士</span> 赋能
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Focus, 
                title: '普通创作者', 
                desc: '借助内置的专家级预设，即使没有摄影背景，也能瞬间生成具有大片感的高级配图，让灵感即刻落地。' 
              },
              { 
                icon: Workflow, 
                title: '专业团队', 
                desc: '利用实验室定制专属场景协议，确保品牌视觉系统的高度统一。无论是商业海报还是内容运营，效率提升 10 倍以上。' 
              },
              { 
                icon: Share2, 
                title: '社区共创', 
                desc: '在活跃的社区中分享您的 DSL 架构。每一个高级风格都可以被拆解、学习并再次复用，形成美学的正向循环。' 
              }
            ].map((feature, i) => (
              <div key={i} className="p-12 bg-white rounded-[3rem] border border-zinc-100 hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 mb-6 serif">{feature.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术底座说明 */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-24">
         <div className="lg:col-span-4 flex flex-col justify-center space-y-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-bold serif leading-tight">以 Gemini 为核心的 <br /> 审美编译引擎</h3>
            <p className="text-zinc-500">
              我们深度整合了 Google Gemini 3 Pro 引擎，配合自研的审美护栏算法，实时理解并润色复杂的艺术指令，确保生成的作品始终保持高级质感。
            </p>
         </div>
         <div className="lg:col-span-8 bg-zinc-950 rounded-[4rem] p-16 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Terminal className="w-64 h-64" />
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-4">
                  <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">// Kernel Sync</div>
                  <h5 className="text-xl font-bold italic serif">实时指令重构</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed">将模糊的自然语言动态映射为结构化参数，实现视觉与代码的完美同步。</p>
               </div>
               <div className="space-y-4">
                  <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">// Aesthetic Shield</div>
                  <h5 className="text-xl font-bold italic serif">自研审美护栏</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed">过滤通用 AI 风格，锁定东方骨相细节，确保每一帧画面都具备艺术收藏价值。</p>
               </div>
               <div className="space-y-4">
                  <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">// Global Search</div>
                  <h5 className="text-xl font-bold italic serif">实时视觉趋势</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed">集成 Google Search Grounding，确保生成的场景紧跟当下艺术与商业审美趋势。</p>
               </div>
               <div className="space-y-4">
                  <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">// DSL Export</div>
                  <h5 className="text-xl font-bold italic serif">极致的工程化</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed">支持导出标准的 JSON 协议，无缝对接 Midjourney、Flux 等主流图像生成后端。</p>
               </div>
            </div>
         </div>
      </section>

      {/* 底部 Footer */}
      <footer className="py-32 bg-zinc-900 text-center px-6 rounded-t-[5rem] mt-24">
        <div className="max-w-4xl mx-auto">
          <Zap className="w-12 h-12 text-red-700 mx-auto mb-12 animate-bounce" />
          <h2 className="text-5xl font-black text-white serif mb-12 leading-tight">
            视觉创作，不再是 <br />
            <span className="italic text-zinc-500">一个人的独白</span>
          </h2>
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-6 px-12 py-6 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>立即返回实验室</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
