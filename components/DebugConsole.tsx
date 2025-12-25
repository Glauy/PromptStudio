
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Trash2, Activity, Cpu } from 'lucide-react';

interface DebugLog {
  id: string;
  timestamp: string;
  type: 'request' | 'response' | 'error';
  content: any;
}

const DebugConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLog = (e: any) => {
      const newLog: DebugLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
        ...e.detail
      };
      setLogs(prev => [...prev, newLog].slice(-20));
      if (!isOpen) setHasNew(true);
    };

    window.addEventListener('app:debug-log' as any, handleLog);
    return () => window.removeEventListener('app:debug-log' as any, handleLog);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    if (isOpen) setHasNew(false);
  }, [logs, isOpen]);

  return (
    <div className="fixed bottom-32 right-10 z-[70] flex flex-col items-end pointer-events-none">
      {/* 终端面板 - 高定 UI */}
      <div className={`
        mb-6 w-[560px] bg-[#0A0A0B]/90 backdrop-blur-[40px] rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right overflow-hidden flex flex-col pointer-events-auto
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 translate-x-0' : 'opacity-0 scale-90 translate-y-12 translate-x-4 pointer-events-none'}
      `}>
        {/* Header */}
        <div className="px-8 py-5 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
               <Activity className="w-4 h-4 text-blue-400" />
               <div className="absolute inset-0 bg-blue-400 blur-md opacity-40"></div>
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-200">System Log Trace</span>
               <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5">Gemini 3.2 Professional Engine</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setLogs([])} className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setIsOpen(false)} className="w-2 h-2 rounded-full bg-zinc-800 hover:bg-zinc-600 transition-colors"></button>
          </div>
        </div>

        {/* 日志内容区 */}
        <div ref={scrollRef} className="flex-1 max-h-[500px] overflow-y-auto p-8 font-mono text-[11px] space-y-10 custom-debug-scroll">
          {logs.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center space-y-4 opacity-20">
              <Cpu className="w-10 h-10 text-zinc-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Kernel Waiting for Input...</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 元数据行 */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-[10px] text-zinc-700 font-bold tracking-wider">[{log.timestamp}]</span>
                  <span className={`
                    text-[8px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase shadow-sm
                    ${log.type === 'request' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-blue-500/10' : 
                      log.type === 'response' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-green-500/10' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'}
                  `}>
                    {log.type === 'request' ? 'Request' : log.type === 'response' ? 'Response' : 'Error'}
                  </span>
                </div>
                {/* 内容卡片 */}
                <div className="relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                   <div className="relative bg-white/[0.03] border border-white/10 p-6 rounded-[1.5rem] leading-relaxed">
                      <pre className="text-zinc-400 whitespace-pre-wrap break-all selection:bg-blue-500/30">
                        {typeof log.content === 'string' ? log.content : JSON.stringify(log.content, null, 2)}
                      </pre>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 悬浮切换按钮 - 保持极简风格 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center space-x-4 px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 active:scale-95 border pointer-events-auto
          ${isOpen ? 'bg-zinc-900 border-white/20 text-white' : 'bg-[#0D1117]/95 backdrop-blur-md border-white/5 text-zinc-400 hover:text-white hover:border-white/20'}
        `}
      >
        <div className="flex items-center font-mono">
           <span className={`${isOpen ? 'text-green-500' : 'text-zinc-600'} mr-3 opacity-80 transition-colors`}> &gt;_ </span>
           <span className="text-[10px] font-black uppercase tracking-[0.5em]">Console</span>
        </div>
        {hasNew && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
          </span>
        )}
      </button>

      <style>{`
        .custom-debug-scroll::-webkit-scrollbar { width: 3px; }
        .custom-debug-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-debug-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-debug-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default DebugConsole;
