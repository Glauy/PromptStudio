
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PromptStudio from './components/PromptStudio';
import SceneGallery from './components/SceneGallery';
import CommunityGallery from './components/CommunityGallery';
import Footer from './components/Footer';
import StudioTips from './components/StudioTips';
import DebugConsole from './components/DebugConsole';

function App() {
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main>
        <Hero />
        
        {/* Statistics or Social Proof Section */}
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

        <PromptStudio />
        <SceneGallery />
        <CommunityGallery />
      </main>
      <Footer />
      
      {/* Floating Global Widgets */}
      <DebugConsole />
      <StudioTips />
    </div>
  );
}

export default App;
