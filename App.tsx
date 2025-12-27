
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PromptStudio from './components/PromptStudio';
import SceneGallery from './components/SceneGallery';
import CommunityGallery from './components/CommunityGallery';
import Footer from './components/Footer';
import StudioTips from './components/StudioTips';
import DebugConsole from './components/DebugConsole';
import AboutPage from './components/AboutPage';
import BeginnerGuide from './components/BeginnerGuide';
import VirtualPhotography from './pages/VirtualPhotography';

type ViewType = 'home' | 'about' | 'virtual-photography';

function App() {
  const [view, setView] = useState<ViewType>('home');

  useEffect(() => {
    const handleGoHome = () => setView('home');
    const handleGoVirtual = () => setView('virtual-photography');
    window.addEventListener('app:go-home', handleGoHome);
    window.addEventListener('app:go-virtual', handleGoVirtual);
    return () => {
      window.removeEventListener('app:go-home', handleGoHome);
      window.removeEventListener('app:go-virtual', handleGoVirtual);
    };
  }, []);

  if (view === 'about') {
    return <AboutPage onBack={() => setView('home')} />;
  }

  if (view === 'virtual-photography') {
    return <VirtualPhotography />;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Header 
        onNavigateAbout={() => setView('about')} 
        onNavigateVirtual={() => setView('virtual-photography')}
      />
      <main>
        <Hero />
        
        {/* 合作伙伴展示 */}
        <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale">
              <span className="text-sm font-bold tracking-[0.4em] uppercase">Midjourney</span>
              <span className="text-sm font-bold tracking-[0.4em] uppercase">Stable Diffusion</span>
              <span className="text-sm font-bold tracking-[0.4em] uppercase">DALL·E 3</span>
              <span className="text-sm font-bold tracking-[0.4em] uppercase">Gemini Vision</span>
              <span className="text-sm font-bold tracking-[0.4em] uppercase">Flux.1</span>
            </div>
          </div>
        </section>

        {/* 实验室核心 */}
        <div id="lab-container">
           <PromptStudio />
        </div>
        
        <SceneGallery />
        <CommunityGallery />
      </main>
      <Footer />
      
      {/* 悬浮组件 */}
      <DebugConsole />
      <StudioTips />
      
      {/* 沉浸式新手引导 */}
      <BeginnerGuide />
    </div>
  );
}

export default App;
