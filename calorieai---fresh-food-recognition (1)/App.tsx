
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import Scanner from './components/Scanner';
import AnalysisResult from './components/AnalysisResult';
import Profile from './components/Profile';
import History from './components/History';
import Recipes from './components/Recipes';
import Navigation from './components/Navigation';
import { View, FoodAnalysis, UserStats } from './types';

// localStorage 键名
const HISTORY_STORAGE_KEY = 'calorieai_history';
const STATS_STORAGE_KEY = 'calorieai_stats';

// 从 localStorage 读取历史记录，或返回默认数据
const loadHistory = (): FoodAnalysis[] => {
  try {
    const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('读取历史记录失败:', error);
  }
  return [];
};

// 从 localStorage 读取统计数据，或返回默认值
const loadStats = (): UserStats => {
  try {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.goal === 'number') {
        return parsed;
      }
    }
  } catch (error) {
    console.error('读取统计数据失败:', error);
  }
  return {
    goal: 2100,
    eaten: 0,
    burned: 0
  };
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('splash');
  const [history, setHistory] = useState<FoodAnalysis[]>(loadHistory);
  const [scannedResult, setScannedResult] = useState<FoodAnalysis | null>(null);
  const [stats, setStats] = useState<UserStats>(loadStats);

  // 保存历史记录到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('保存历史记录失败:', error);
    }
  }, [history]);

  // 保存统计数据到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('保存统计数据失败:', error);
    }
  }, [stats]);

  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => setCurrentView('home'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleSaveResult = (result: FoodAnalysis) => {
    const newHistory = [result, ...history];
    setHistory(newHistory);
    // 统计数据：根据新的历史记录重新计算 eaten
    const totalEaten = newHistory.reduce((sum, meal) => sum + meal.totalCalories, 0);
    setStats(prev => ({
      ...prev,
      eaten: totalEaten
    }));
    setCurrentView('home');
  };

  const renderView = () => {
    switch (currentView) {
      case 'splash':
        return <SplashScreen />;
      case 'home':
        return <Home stats={stats} meals={history} onScan={() => setCurrentView('scan')} />;
      case 'history':
        return <History meals={history} />;
      case 'recipes':
        return <Recipes />;
      case 'scan':
        return <Scanner 
          onClose={() => setCurrentView('home')} 
          onComplete={(result) => {
            setScannedResult(result);
            setCurrentView('result');
          }} 
        />;
      case 'result':
        return scannedResult ? (
          <AnalysisResult 
            data={scannedResult} 
            onSave={handleSaveResult} 
            onBack={() => setCurrentView('home')} 
          />
        ) : null;
      case 'profile':
        return <Profile onBack={() => setCurrentView('home')} />;
      default:
        return <Home stats={stats} meals={history} onScan={() => setCurrentView('scan')} />;
    }
  };

  return (
    <div className="mx-auto max-w-[480px] min-h-screen bg-white dark:bg-[#0d140a] relative flex flex-col shadow-2xl overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderView()}
      </main>
      
      {['home', 'profile', 'history', 'recipes'].includes(currentView) && (
        <Navigation 
          activeView={currentView} 
          onNavigate={setCurrentView} 
          onScan={() => setCurrentView('scan')} 
        />
      )}
    </div>
  );
};

export default App;
