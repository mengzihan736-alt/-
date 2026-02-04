
import React from 'react';
import { FoodAnalysis } from '../types';

interface AnalysisResultProps {
  data: FoodAnalysis;
  onSave: (result: FoodAnalysis) => void;
  onBack: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onSave, onBack }) => {
  const totalGrams = data.nutrients.protein + data.nutrients.carbs + data.nutrients.fat;
  const proteinPercent = Math.round((data.nutrients.protein / totalGrams) * 100) || 0;
  const carbsPercent = Math.round((data.nutrients.carbs / totalGrams) * 100) || 0;
  const fatPercent = 100 - proteinPercent - carbsPercent;

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark text-[#121b0e] dark:text-white">
      <header className="flex items-center p-4 pb-2 justify-between">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">分析结果</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-4 pb-32">
        <div className="my-4 aspect-video overflow-hidden rounded-xl shadow-lg border-4 border-white dark:border-gray-800">
          <img src={data.imageUrl || `https://picsum.photos/seed/${data.dishName}/600/400`} alt={data.dishName} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col items-center py-6">
          <h1 className="text-primary tracking-tight text-[48px] font-extrabold leading-tight px-4 text-center">{data.totalCalories} 千卡</h1>
          <p className="text-sage dark:text-primary/70 text-sm font-medium uppercase tracking-widest">预估热量值</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-sage/10 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">营养成分分解</h3>
            <span className="text-xs bg-primary/10 text-sage dark:text-primary px-3 py-1 rounded-full font-bold">置信度: {data.accuracy}%</span>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative size-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-gray-100 dark:stroke-gray-800" cx="18" cy="18" fill="none" r="16" strokeWidth="4"></circle>
                <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray={`${carbsPercent} 100`} strokeWidth="4"></circle>
                <circle className="stroke-sage" cx="18" cy="18" fill="none" r="16" strokeDasharray={`${proteinPercent} 100`} strokeDashoffset={`-${carbsPercent}`} strokeWidth="4"></circle>
                <circle className="stroke-orange-300" cx="18" cy="18" fill="none" r="16" strokeDasharray={`${fatPercent} 100`} strokeDashoffset={`-${carbsPercent + proteinPercent}`} strokeWidth="4"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-[10px] text-gray-500 uppercase">已追踪</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-primary"></div>
                  <span className="font-medium">碳水化合物</span>
                </div>
                <span className="font-bold">{data.nutrients.carbs}g <span className="text-gray-400 font-normal">({carbsPercent}%)</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-sage"></div>
                  <span className="font-medium">蛋白质</span>
                </div>
                <span className="font-bold">{data.nutrients.protein}g <span className="text-gray-400 font-normal">({proteinPercent}%)</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-orange-300"></div>
                  <span className="font-medium">脂肪</span>
                </div>
                <span className="font-bold">{data.nutrients.fat}g <span className="text-gray-400 font-normal">({fatPercent}%)</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-2">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">识别到的配料</p>
          <div className="flex flex-wrap gap-2">
            {data.ingredients.map((ing, i) => (
              <span key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">check_circle</span> {ing}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button className="text-sage dark:text-primary font-bold flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined">edit</span>
            修改成分或分量
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg p-6 pb-10 border-t border-gray-100 dark:border-gray-800 z-50">
        <button 
          onClick={() => onSave(data)}
          className="w-full bg-primary hover:bg-primary/90 text-[#121b0e] font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">save</span>
          保存到饮食日志
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
