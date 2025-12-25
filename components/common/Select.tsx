
import React, { useState, useRef, useEffect, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
  subLabel?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

const Select: React.FC<SelectProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "请选择...", 
  className = "",
  variant = 'light'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // 核心：精准计算视口位置，完全脱离容器束缚
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 4, // 下移 4px 留出空隙
        left: rect.left,
        width: rect.width
      });
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
      // 全局监听，确保位置同步
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current?.contains(event.target as Node) || 
        menuRef.current?.contains(event.target as Node)
      ) return;
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 下拉面板渲染逻辑 (Portal)
  const menuContent = isOpen && createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: `${coords.width}px`,
        zIndex: 9999
      }}
      className={`
        rounded-xl border shadow-2xl overflow-hidden
        ${variant === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-900 border-zinc-800 text-zinc-300'}
        animate-fade-in
      `}
    >
      <div className="max-h-60 overflow-y-auto p-1 custom-select-scroll">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <div
              key={option.value}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
              className={`
                flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors
                ${isSelected 
                  ? 'bg-zinc-100 text-zinc-900 font-bold' 
                  : 'hover:bg-zinc-50 text-zinc-600'}
                ${option.disabled ? 'opacity-30 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center space-x-3 truncate">
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                <div className="flex flex-col truncate">
                  <span className="truncate">{option.label}</span>
                  {option.subLabel && <span className="text-[10px] opacity-50 uppercase tracking-tighter">{option.subLabel}</span>}
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-zinc-900" />}
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );

  return (
    <div className={`relative w-full ${className}`}>
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        type="button"
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all
          ${variant === 'light' 
            ? 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300' 
            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'}
          ${isOpen ? 'ring-2 ring-zinc-900/5 border-zinc-900' : ''}
        `}
      >
        <div className="flex items-center space-x-3 truncate">
          {selectedOption?.icon && <span className="shrink-0 opacity-70">{selectedOption.icon}</span>}
          <span className={selectedOption ? 'font-medium' : 'text-zinc-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {menuContent}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out forwards;
        }
        .custom-select-scroll::-webkit-scrollbar { width: 4px; }
        .custom-select-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Select;
