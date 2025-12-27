
import React from 'react';
import { 
  Sliders,
  Edit3,
  CheckCircle2,
  Sparkles,
  Lock,
  XCircle,
  Link,
  Activity,
  RotateCcw,
  LayoutGrid,
  Brackets,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
// Added UserMode to the imported types from '../types'
import { StructuredPrompt, FieldSchema, UserMode } from '../types';
import { usePromptStudio } from '../hooks/usePromptStudio';
import PromptOutputPanel from './PromptOutputPanel';
import DslInspector from './DslInspector';
import AutoResizeTextarea from './common/AutoResizeTextarea';
import RenderingHistory from './RenderingHistory';
import PresetLookbook from './PresetLookbook';

const PromptStudio: React.FC = () => {
  const ps = usePromptStudio();

  const renderField = (fieldKey: keyof StructuredPrompt, schema: FieldSchema, index: number) => {
    const value = ps.promptData[fieldKey] || '';
    const editable = ps.canEditField(schema);
    const hasOptions = (schema.options?.length || 0) > 0;
    const isSubjectField = fieldKey === 'subject';
    const isMissing = schema.isRequired && !value.trim();
    
    const isOriginalFromPreset = ps.activePreset && ps.activePreset.data[fieldKey] === value;
    const isModifiedFromPreset = ps.activePreset && ps.activePreset.data[fieldKey] !== undefined && ps.activePreset.data[fieldKey] !== value;

    const inputClasses = `w-full bg-white border rounded-2xl px-6 text-sm transition-all outline-none 
      ${isMissing && ps.isOptimizing ? 'border-red-500 ring-4 ring-red-500/5' : ''}
      ${isOriginalFromPreset ? 'border-blue-500 ring-4 ring-blue-500/5 focus:ring-blue-500/10' : 
        isModifiedFromPreset ? 'border-amber-400 ring-4 ring-amber-400/5 focus:ring-amber-400/10' : 
        editable ? 'border-zinc-200 focus:ring-2 focus:ring-zinc-900 shadow-sm' : 'border-zinc-100 bg-zinc-50/50 text-zinc-400 cursor-not-allowed'}
    `;

    return (
      <div 
        key={fieldKey} 
        id={fieldKey === 'subject' ? 'guide-target-input-subject' : undefined}
        className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-bold text-zinc-800">
              {schema.label}
              {schema.isRequired && <span className="text-red-500 ml-1 font-black">*</span>}
            </label>
            {schema.isRecommended && <Sparkles className="w-3 h-3 text-blue-500" />}
          </div>
          <span className="text-zinc-300 font-mono text-[10px] uppercase tracking-widest">{fieldKey}</span>
        </div>

        <div className="relative">
          {isSubjectField ? (
            <AutoResizeTextarea
              readOnly={!editable}
              value={value}
              onChange={(e) => ps.handleInputChange(fieldKey, e.target.value)}
              className={`${inputClasses} py-4 pr-32`}
              placeholder={schema.placeholder || (editable ? `请输入${schema.label}...` : `锁定中`)}
            />
          ) : (
            <input
              readOnly={!editable}
              value={value}
              onChange={(e) => ps.handleInputChange(fieldKey, e.target.value)}
              className={`${inputClasses} h-14 pr-32`}
              placeholder={schema.placeholder || (editable ? `请输入${schema.label}...` : `锁定中`)}
            />
          )}
          
          <div className={`absolute right-6 flex items-center space-x-3 pointer-events-none select-none ${isSubjectField ? 'top-5' : 'top-1/2 -translate-y-1/2'}`}>
            {isOriginalFromPreset && (
               <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2">
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">预设锁定</span>
                  <Link className="w-3.5 h-3.5 text-blue-500" />
               </div>
            )}
            {isModifiedFromPreset && (
               <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2">
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">已覆写</span>
                  <button 
                    onClick={() => ps.handleInputChange(fieldKey, ps.activePreset?.data[fieldKey] || '')}
                    className="p-1 hover:bg-amber-100 rounded pointer-events-auto transition-colors"
                    title="回退至预设值"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  </button>
               </div>
            )}
            {!isOriginalFromPreset && !isModifiedFromPreset && (
              editable ? (
                <Edit3 className="w-4 h-4 text-zinc-300" />
              ) : (
                <Lock className="w-4 h-4 text-zinc-200" />
              )
            )}
          </div>
        </div>

        {hasOptions && (
          <div className={`transition-all duration-300 ${schema.displayType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'flex flex-wrap gap-2'}`}>
            {schema.options?.map(opt => (
              schema.displayType === 'grid' ? (
                <button
                  key={opt.value}
                  onClick={() => ps.handleInputChange(fieldKey, opt.value)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                    value === opt.value ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900/5 shadow-md' : 'border-zinc-100 bg-zinc-50/30 hover:border-zinc-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${value === opt.value ? 'text-zinc-900' : 'text-zinc-800'}`}>{opt.label}</span>
                    {value === opt.value && <CheckCircle2 className="w-4 h-4 text-zinc-900" />}
                  </div>
                  {opt.description && <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">{opt.description}</p>}
                </button>
              ) : (
                <button
                  key={opt.value}
                  onClick={() => ps.handleInputChange(fieldKey, opt.value)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                    value === opt.value 
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10' 
                      : 'border-zinc-100 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-black'
                  }`}
                >
                  {opt.label}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    );
  };

  const visibleFields = (Object.entries(ps.scene.fields) as [keyof StructuredPrompt, FieldSchema][])
    .sort((a, b) => a[1].priority - b[1].priority)
    .filter(([_, schema]) => ps.isFieldVisible(schema));

  return (
    <section id="lab" className="py-16 bg-[#F9F9FB] border-y border-gray-100">
      <PresetLookbook 
        isOpen={ps.isLookbookOpen} 
        onClose={() => ps.setIsLookbookOpen(false)} 
        initialSceneId={ps.activeSceneId}
        variant="explorer"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center space-x-6 shrink-0">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-white rounded-2xl shadow-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8">
              <div>
                <h2 className="text-3xl font-bold serif tracking-tight">指令驾驶舱</h2>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Visual DNA Compiler v3.5</p>
              </div>
              
              <div className="flex items-center space-x-4 pb-1">
                 <button 
                  id="guide-target-lookbook-trigger"
                  onClick={() => ps.setIsLookbookOpen(true)}
                  className="flex items-center space-x-2 text-zinc-400 hover:text-black transition-all group"
                 >
                    <LayoutGrid className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">浏览风格志</span>
                 </button>
                 <div className="w-px h-3 bg-zinc-200"></div>
                 <button 
                  onClick={() => ps.setShowDsl(!ps.showDsl)}
                  className={`flex items-center space-x-2 transition-all group ${ps.showDsl ? 'text-blue-500 font-black' : 'text-zinc-400 hover:text-black'}`}
                 >
                    <Brackets className={`w-3.5 h-3.5 group-hover:rotate-12 transition-transform ${ps.showDsl ? 'rotate-12' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">指令观察器</span>
                 </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            {ps.missingFields.length > 0 ? (
               <div className="flex items-center space-x-3 bg-red-50 border border-red-100 px-5 py-2.5 rounded-2xl text-red-600 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    待填充必填项: {ps.missingFields.join(', ')}
                  </span>
               </div>
            ) : ps.activePreset ? (
              <div className="flex items-center space-x-4 bg-white border border-blue-500/20 pl-5 pr-3 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.08)] animate-in slide-in-from-top-4 duration-500">
                 <div className="flex items-center space-x-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   <div className="flex flex-col">
                      <div className="flex items-center space-x-2 mb-0.5">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none">基于风格预设进行创作</span>
                        <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 italic tracking-tight">《{ps.activePreset.title}》</span>
                   </div>
                 </div>
                 <div className="w-px h-6 bg-zinc-100 mx-1"></div>
                 <button 
                  onClick={ps.handleReset} 
                  className="p-1.5 hover:bg-red-50 text-zinc-300 hover:text-red-500 rounded-lg transition-all"
                  title="完全重置并退出预设"
                 >
                    <XCircle className="w-4 h-4" />
                 </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 opacity-20">
                 <Activity className="w-3 h-3 text-zinc-400" />
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Ready / 等待创作指令</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6 shrink-0">
            <div className="flex bg-zinc-200/50 rounded-xl p-1 border border-zinc-200 shadow-inner">
              {(['beginner', 'advanced', 'expert'] as UserMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('app:mode-change', { detail: m }));
                  }}
                  className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 ${
                    ps.mode === m ? 'bg-white text-black shadow-md ring-1 ring-black/5' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  {m === 'beginner' ? '新手' : m === 'advanced' ? '进阶' : '专家'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          <div className="lg:col-span-7 flex flex-col lg:h-[740px] relative">
            <DslInspector data={ps.promptData} isVisible={ps.showDsl} onToggle={() => ps.setShowDsl(!ps.showDsl)} />

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-zinc-100 flex flex-col h-full relative overflow-hidden">
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="p-6 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/20 shrink-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-lg ${ps.mode === 'expert' ? 'bg-red-500 shadow-red-500/50' : ps.mode === 'advanced' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-green-500 shadow-green-500/50'}`}></div>
                      <span className="text-xs font-black uppercase tracking-widest leading-none">{ps.mode} 模式活跃</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => ps.setIsLookbookOpen(true)}
                    className="flex items-center space-x-3 px-5 py-2.5 bg-zinc-100/50 hover:bg-zinc-200/50 rounded-2xl border border-zinc-200 transition-all group"
                  >
                     <div className="flex items-center space-x-3">
                       <LayoutGrid className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900" />
                       <div className="flex flex-col items-end">
                         <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest leading-none">{ps.scene.name}</span>
                         <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1 group-hover:text-blue-500 transition-colors">点击切换场景</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
                     </div>
                  </button>
                </div>

                <div className="p-10 space-y-12 overflow-y-auto flex-1 custom-studio-scroll">
                  {visibleFields.map(([key, schema], idx) => renderField(key as keyof StructuredPrompt, schema, idx))}
                </div>
              </div>
            </div>
          </div>

          <div id="cockpit" className="lg:col-span-5 flex flex-col lg:h-[740px]">
            <PromptOutputPanel 
              promptData={ps.promptData}
              defaults={ps.sceneDefaults}
              optimizedData={ps.optimizedData}
              weights={ps.weights}
              fieldOrder={ps.fieldPriority}
              mode={ps.mode}
              isOptimizing={ps.isOptimizing}
              isValid={ps.isValid}
              onOptimize={ps.handleOptimize}
              onReset={ps.handleReset}
              onCopy={(text) => navigator.clipboard.writeText(text)}
              onRenderSuccess={ps.handleRenderSuccess}
            />
          </div>
        </div>

        <RenderingHistory 
          items={ps.history} 
          onRestore={ps.handleRestoreFromHistory}
          onClear={() => ps.setHistory([])}
        />
      </div>
    </section>
  );
};

export default PromptStudio;
