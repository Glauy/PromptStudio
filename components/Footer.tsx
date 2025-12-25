
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold serif">墨</div>
              <span className="font-bold tracking-tight uppercase text-sm">PromptStudio</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              全球领先的 AI 视觉提示词 DSL 创作平台。致力于通过技术手段，将艺术创作的门槛降低，同时将表达的精准度提升到极致。
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6">实验室</h5>
            <ul className="space-y-4 text-xs text-gray-500">
              <li><a href="#" className="hover:text-black">核心炼金术</a></li>
              <li><a href="#" className="hover:text-black">提示词指南</a></li>
              <li><a href="#" className="hover:text-black">进阶模式</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6">社区</h5>
            <ul className="space-y-4 text-xs text-gray-500">
              <li><a href="#" className="hover:text-black">热门创作</a></li>
              <li><a href="#" className="hover:text-black">创作者访谈</a></li>
              <li><a href="#" className="hover:text-black">视觉大赛</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6">通讯订阅</h5>
            <p className="text-[10px] text-gray-400 mb-4">订阅我们，获取最新的视觉艺术趋势与技术更新。</p>
            <div className="flex">
              <input type="email" placeholder="您的邮箱" className="bg-zinc-50 border-none outline-none text-xs px-4 py-3 rounded-l-lg flex-1" />
              <button className="bg-black text-white px-4 py-3 rounded-r-lg text-xs font-bold">订阅</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-50 space-y-4 md:space-y-0">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">© 2024 PROMPTSTUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 text-[10px] text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
