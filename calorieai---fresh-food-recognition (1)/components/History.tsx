
import React from 'react';
import { FoodAnalysis } from '../types';

interface HistoryProps {
  meals: FoodAnalysis[];
}

const History: React.FC<HistoryProps> = ({ meals }) => {
  return (
    <div className="flex flex-col w-full h-full pb-10">
      <header className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/80 dark:bg-[#0d140a]/80 backdrop-blur-md z-10">
        <h2 className="text-2xl font-bold dark:text-white">饮食历史</h2>
        <button className="p-2 text-sage">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </header>

      <div className="px-6 py-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 p-4 bg-primary/10 rounded-2xl border border-primary/20">
            <p className="text-[10px] font-bold uppercase text-sage tracking-widest">周平均</p>
            <p className="text-xl font-extrabold mt-1 dark:text-white">1,840 <span className="text-xs font-normal">千卡</span></p>
          </div>
          <div className="flex-1 p-4 bg-sage/10 rounded-2xl border border-sage/20">
            <p className="text-[10px] font-bold uppercase text-sage tracking-widest">坚持率</p>
            <p className="text-xl font-extrabold mt-1 dark:text-white">92%</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-sage/60 uppercase tracking-widest mb-4">今天</h3>
            <div className="space-y-3">
              {meals.map((meal, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-sage/5 shadow-sm">
                  <div className="size-14 rounded-xl bg-cover bg-center shrink-0" 
                       style={{ backgroundImage: `url(${meal.imageUrl || `https://picsum.photos/seed/${meal.dishName}/200/200`})` }}></div>
                  <div className="flex-1">
                    <p className="font-bold text-sm dark:text-white">{meal.dishName}</p>
                    <p className="text-xs text-sage/60">{meal.mealType} • {meal.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm dark:text-white">{meal.totalCalories}</p>
                    <p className="text-[10px] text-sage/50 font-bold">千卡</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-sage/60 uppercase tracking-widest mb-4">昨天</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-sage/5 opacity-80">
                <div className="size-14 rounded-xl bg-cover bg-center shrink-0" 
                     style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200)' }}></div>
                <div className="flex-1">
                  <p className="font-bold text-sm dark:text-white">地中海风味沙拉</p>
                  <p className="text-xs text-sage/60">午餐 • 下午 12:45</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm dark:text-white">420</p>
                  <p className="text-[10px] text-sage/50 font-bold">千卡</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-sage/5 opacity-80">
                <div className="size-14 rounded-xl bg-cover bg-center shrink-0" 
                     style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200)' }}></div>
                <div className="flex-1">
                  <p className="font-bold text-sm dark:text-white">田园蔬菜披萨</p>
                  <p className="text-xs text-sage/60">晚餐 • 下午 07:30</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm dark:text-white">310</p>
                  <p className="text-[10px] text-sage/50 font-bold">千卡</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
