
import React from 'react';
import { UserStats, FoodAnalysis } from '../types';

interface HomeProps {
  stats: UserStats;
  meals: FoodAnalysis[];
  onScan: () => void;
}

const Home: React.FC<HomeProps> = ({ stats, meals, onScan }) => {
  const remaining = stats.goal - stats.eaten + stats.burned;
  const progressPercent = Math.min((stats.eaten / stats.goal) * 100, 100);
  
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/80 dark:bg-[#0d140a]/80 backdrop-blur-md z-10">
        <div className="flex size-10 shrink-0 items-center">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" 
               style={{ backgroundImage: 'url("https://picsum.photos/seed/elena/100/100")' }}></div>
        </div>
        <div className="flex-1 px-4">
          <p className="text-xs text-sage dark:text-primary/70 font-medium">{new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          <h2 className="text-lg font-bold leading-tight tracking-tight dark:text-white">你好，Elena！</h2>
        </div>
        <button className="flex size-10 items-center justify-center rounded-xl bg-background-light dark:bg-white/5 border border-sage/10 dark:text-white">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </button>
      </header>

      <div className="px-6 py-4">
        <div className="relative flex flex-col items-center justify-center bg-cream dark:bg-primary/5 rounded-[2rem] p-8 overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 size-40 bg-sage/10 rounded-full blur-3xl"></div>
          
          <div className="relative flex items-center justify-center">
            <svg className="size-56 transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
              <circle 
                className="text-sage/10 dark:text-white/5" 
                cx="50" 
                cy="50" 
                fill="transparent" 
                r={radius} 
                stroke="currentColor" 
                strokeWidth="8"
              />
              <circle 
                className="text-primary transition-all duration-1000" 
                cx="50" 
                cy="50" 
                fill="transparent" 
                r={radius} 
                stroke="currentColor" 
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-sage dark:text-primary/70 text-sm font-semibold uppercase tracking-wider">剩余</p>
              <p className="text-4xl font-extrabold tracking-tight dark:text-white">{remaining.toLocaleString()}</p>
              <p className="text-sage/60 dark:text-white/40 text-xs mt-1">目标: {stats.goal} 千卡</p>
            </div>
          </div>
          
          <div className="mt-8 flex gap-8 w-full justify-around">
            <div className="text-center">
              <p className="text-xs text-sage/70 dark:text-white/50 mb-1">已摄入</p>
              <p className="font-bold text-lg dark:text-white">{stats.eaten}</p>
            </div>
            <div className="h-10 w-px bg-sage/10 dark:bg-white/10"></div>
            <div className="text-center">
              <p className="text-xs text-sage/70 dark:text-white/50 mb-1">已消耗</p>
              <p className="font-bold text-lg dark:text-white">{stats.burned}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 flex justify-between items-end mt-4">
        <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white">每日营养素</h3>
        <span className="text-xs text-primary font-bold cursor-pointer">查看详情</span>
      </div>

      <div className="flex gap-4 px-6 py-4 overflow-x-auto no-scrollbar">
        {[
          { color: 'bg-blue-400', label: '蛋白质', current: 45, goal: 120 },
          { color: 'bg-orange-400', label: '碳水', current: 150, goal: 250 },
          { color: 'bg-yellow-400', label: '脂肪', current: 30, goal: 70 },
        ].map((macro, idx) => (
          <div key={idx} className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl p-4 bg-white dark:bg-white/5 border border-sage/10 shadow-sm">
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full ${macro.color}`}></div>
              <p className="text-sage/80 dark:text-white/60 text-xs font-bold uppercase">{macro.label}</p>
            </div>
            <p className="text-xl font-bold leading-tight dark:text-white">{macro.current}<span className="text-xs text-sage/50">/{macro.goal}g</span></p>
            <div className="w-full bg-sage/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
              <div className={`${macro.color} h-full`} style={{ width: `${(macro.current / macro.goal) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pt-4 flex justify-between items-end">
        <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white">今日饮食</h3>
        <span className="text-xs text-sage/60">查看全部</span>
      </div>

      <div className="px-6 py-4 flex flex-col gap-3">
        {meals.map((meal, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 bg-white dark:bg-white/5 rounded-xl border border-sage/5 shadow-sm">
            <div className="size-16 rounded-lg bg-cover bg-center shrink-0 border border-sage/10" 
                 style={{ backgroundImage: `url(${meal.imageUrl || `https://picsum.photos/seed/${meal.dishName}/200/200`})` }}></div>
            <div className="flex-1">
              <p className="font-bold text-sm dark:text-white">{meal.dishName}</p>
              <p className="text-xs text-sage/60">{meal.mealType} • {meal.timestamp}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm dark:text-white">{meal.totalCalories}</p>
              <p className="text-[10px] text-sage/50 font-bold uppercase tracking-tighter">KCAL</p>
            </div>
          </div>
        ))}
        
        <div className="flex items-center gap-4 p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-dashed border-sage/20 cursor-pointer hover:bg-sage/5 transition-colors" onClick={onScan}>
          <div className="size-16 rounded-lg bg-sage/5 flex items-center justify-center shrink-0 border border-sage/10">
            <span className="material-symbols-outlined text-sage/30">restaurant</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-sage/40 italic tracking-wide">下一餐吃什么？</p>
            <p className="text-xs text-sage/30">根据您的计划推荐</p>
          </div>
          <div className="text-right">
            <span className="material-symbols-outlined text-sage/40">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
