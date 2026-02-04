
import React from 'react';

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark text-[#121b0e] dark:text-white">
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-inherit">
        <button onClick={onBack} className="p-2">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">我的进度</h2>
        <button className="p-2">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>
      </header>

      <div className="flex flex-col items-center py-6 px-4">
        <div className="relative">
          <div className="size-28 rounded-full border-4 border-primary/20 bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/150/150")' }}></div>
          <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-background-dark flex items-center justify-center shadow-md cursor-pointer">
            <span className="material-symbols-outlined text-[14px]">edit</span>
          </div>
        </div>
        <h3 className="text-[22px] font-bold mt-4">Alex Rivera</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="material-symbols-outlined text-primary text-base">eco</span>
          <p className="text-sage dark:text-primary/70 text-sm font-medium uppercase tracking-wider">健康探索者</p>
        </div>
        <p className="text-[#121b0e]/50 dark:text-white/40 text-xs mt-1">加入时间：2024年1月</p>
      </div>

      <div className="px-4">
        <div className="bg-background-light dark:bg-[#1f2b17] rounded-xl p-4 border border-[#d8e6d1] dark:border-[#2d3d24]">
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-400"><span className="material-symbols-outlined">chevron_left</span></button>
            <p className="font-bold">2024年10月</p>
            <button className="text-gray-400"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
          <div className="grid grid-cols-7 text-center gap-y-2">
             {['日', '一', '二', '三', '四', '五', '六'].map(d => (
               <span key={d} className="text-[10px] font-bold text-gray-400">{d}</span>
             ))}
             {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
               <div key={day} className="h-10 flex flex-col items-center justify-center relative">
                 <span className={`text-sm font-semibold ${day === 24 ? 'text-white bg-primary size-8 rounded-full flex items-center justify-center shadow-lg' : ''}`}>{day}</span>
                 {day < 24 && day % 3 !== 0 && (
                    <span className="size-1 bg-primary rounded-full absolute bottom-0.5"></span>
                 )}
               </div>
             ))}
          </div>
          <div className="flex items-center gap-2 mt-4 px-2">
            <span className="size-2 bg-primary rounded-full"></span>
            <span className="text-[11px] text-gray-500 font-medium">每日目标已达成</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-6">
        <h3 className="text-lg font-bold mb-4">活动摘要</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1f2b17] border border-[#d8e6d1] dark:border-[#2d3d24] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <span className="text-xs font-medium text-gray-500">坚持天数</span>
            </div>
            <p className="text-2xl font-bold">14 天</p>
            <p className="text-green-600 text-[10px] font-bold mt-1 flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span> 本月 +2%</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-[#1f2b17] border border-[#d8e6d1] dark:border-[#2d3d24] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">task_alt</span>
              <span className="text-xs font-medium text-gray-500">达标率</span>
            </div>
            <p className="text-2xl font-bold">85%</p>
            <p className="text-green-600 text-[10px] font-bold mt-1 flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span> 本月 +5%</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <button className="w-full flex items-center justify-center gap-2 text-primary font-bold py-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
          <span>查看详细历史</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
