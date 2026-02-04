
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  onNavigate: (view: View) => void;
  onScan: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onNavigate, onScan }) => {
  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center">
        <button 
          onClick={onScan}
          className="flex size-16 items-center justify-center rounded-full bg-primary text-[#121b0e] shadow-[0_8px_30px_rgb(112,226,54,0.4)] border-4 border-white dark:border-[#0d140a] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[32px] font-bold">photo_camera</span>
        </button>
        <span className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-sage/60">扫一扫</span>
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 dark:bg-[#0d140a]/90 backdrop-blur-xl border-t border-sage/10 px-8 py-4 flex justify-between items-center z-[90]">
        <button 
          onClick={() => onNavigate('home')} 
          className={`flex flex-col items-center transition-colors ${activeView === 'home' ? 'text-primary' : 'text-sage/40 dark:text-white/40'}`}
        >
          <span className="material-symbols-outlined font-bold">home</span>
          <span className="text-[10px] font-bold mt-1">首页</span>
        </button>
        
        <button 
          onClick={() => onNavigate('history')} 
          className={`flex flex-col items-center transition-colors ${activeView === 'history' ? 'text-primary' : 'text-sage/40 dark:text-white/40'}`}
        >
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold mt-1">历史</span>
        </button>

        <div className="w-16"></div>

        <button 
          onClick={() => onNavigate('recipes')} 
          className={`flex flex-col items-center transition-colors ${activeView === 'recipes' ? 'text-primary' : 'text-sage/40 dark:text-white/40'}`}
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px] font-bold mt-1">食谱</span>
        </button>

        <button 
          onClick={() => onNavigate('profile')} 
          className={`flex flex-col items-center transition-colors ${activeView === 'profile' ? 'text-primary' : 'text-sage/40 dark:text-white/40'}`}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">我的</span>
        </button>
      </nav>
    </>
  );
};

export default Navigation;
