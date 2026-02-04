
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-between px-6 py-12 bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <div className="h-10"></div>
      
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative flex items-center justify-center w-32 h-32 bg-primary/10 rounded-xl overflow-hidden shadow-sm animate-bounce">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-sage/20 opacity-40"></div>
          <div className="relative z-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-7xl select-none" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
              eco
            </span>
            <span className="material-symbols-outlined absolute text-sage/80 text-3xl translate-y-2 select-none" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 48" }}>
              lens_camera
            </span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-[#121b0e] dark:text-white text-4xl font-extrabold tracking-tight leading-none">
            卡路里<span className="text-primary">AI</span>
          </h1>
          <p className="mt-3 text-sage/70 dark:text-sage/50 text-base font-medium tracking-wide">
            新鲜食物智能识别
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse delay-75"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-150"></div>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'wght' 700" }}>
            auto_awesome
          </span>
          <p className="text-sage dark:text-primary/70 text-xs font-semibold uppercase tracking-widest leading-none">
            AI 驱动分析
          </p>
        </div>
        <div className="h-6"></div>
      </div>

      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-sage/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default SplashScreen;
