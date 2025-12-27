
import React from 'react';
import { Search, Menu, UserCircle2, Info, Camera } from 'lucide-react';

interface HeaderProps {
  onNavigateAbout?: () => void;
  onNavigateVirtual?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateAbout, onNavigateVirtual }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="glass-header h-24 border-b border-gray-100/50 backdrop-blur-xl bg-white/70">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <div 
              onClick={() => window.dispatchEvent(new CustomEvent('app:go-home'))}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-black/10">
                <span className="text-2xl font-bold serif">墨</span>
              </div>
              <div>
                <h1 className="text-sm font-black tracking-[0.3em] uppercase leading-none">PromptStudio</h1>
                <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-1">Digital Alchemist</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-10">
              {['实验室', '场景库', '社区精选'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item === '实验室' ? 'lab' : item === '场景库' ? 'scenes' : 'community'}`} 
                  className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all group-hover:w-full"></span>
                </a>
              ))}
              <button 
                onClick={onNavigateVirtual}
                className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
              >
                <Camera className="w-3 h-3" />
                <span>虚拟摄影</span>
              </button>
              <button 
                onClick={onNavigateAbout}
                className="text-[11px] font-black uppercase tracking-widest text-zinc-900 hover:text-red-700 transition-colors flex items-center space-x-2 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100"
              >
                <Info className="w-3 h-3" />
                <span>了解我们</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden sm:flex items-center bg-zinc-50 border border-gray-100 rounded-full px-5 py-2 group focus-within:ring-2 focus-within:ring-black transition-all">
              <Search className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="搜索视觉预设..." 
                className="bg-transparent border-none outline-none text-[11px] font-bold ml-3 w-40 placeholder:text-gray-300" 
              />
            </div>
            
            <button className="flex items-center space-x-3 bg-black text-white pl-3 pr-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
              <UserCircle2 className="w-5 h-5" />
              <span>开发者登录</span>
            </button>
            
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
