
import React from 'react';

const Recipes: React.FC = () => {
  const recipes = [
    {
      title: "藜麦能量碗",
      time: "20 分钟",
      cal: "350 千卡",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      tag: "纯素"
    },
    {
      title: "蜂蜜柠檬三文鱼",
      time: "25 分钟",
      cal: "480 千卡",
      img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
      tag: "高蛋白"
    },
    {
      title: "牛油果青酱面",
      time: "15 分钟",
      cal: "410 千卡",
      img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400",
      tag: "快捷"
    },
    {
      title: "莓果奶昔碗",
      time: "10 分钟",
      cal: "290 千卡",
      img: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400",
      tag: "早餐"
    }
  ];

  return (
    <div className="flex flex-col w-full h-full pb-10">
      <header className="p-6 sticky top-0 bg-white/80 dark:bg-[#0d140a]/80 backdrop-blur-md z-10">
        <h2 className="text-2xl font-bold dark:text-white">智能食谱</h2>
        <div className="mt-4 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sage/40">search</span>
          <input 
            type="text" 
            placeholder="搜索配料或菜名..." 
            className="w-full bg-background-light dark:bg-white/5 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all dark:text-white"
          />
        </div>
      </header>

      <div className="px-6 py-2 overflow-x-auto no-scrollbar flex gap-2">
        {['全部', '早餐', '午餐', '晚餐', '纯素', '高蛋白'].map((cat, i) => (
          <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary text-[#121b0e]' : 'bg-sage/10 text-sage dark:text-white/60 hover:bg-sage/20'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="px-6 py-6 grid grid-cols-2 gap-4">
        {recipes.map((recipe, idx) => (
          <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-sage/5 shadow-sm group">
            <div className="relative h-32 w-full">
              <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-sage">
                {recipe.tag}
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-sm leading-tight dark:text-white line-clamp-1">{recipe.title}</h4>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-sage/60 font-medium">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {recipe.time}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">local_fire_department</span> {recipe.cal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-6 p-6 bg-cream dark:bg-primary/5 rounded-[2rem] border border-primary/10 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-[#121b0e] dark:text-white">AI 膳食计划</h3>
          <p className="text-xs text-sage mt-1 max-w-[180px]">基于您近期的饮食扫描，为您量身定制 7 天计划。</p>
          <button className="mt-4 px-6 py-2 bg-primary text-[#121b0e] rounded-full text-xs font-bold shadow-lg shadow-primary/20">生成计划</button>
        </div>
        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-primary/10 text-[120px] rotate-12">restaurant_menu</span>
      </div>
    </div>
  );
};

export default Recipes;
