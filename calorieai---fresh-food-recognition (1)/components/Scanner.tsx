
import React, { useRef, useState, useEffect } from 'react';
import { analyzeFoodImage } from '../services/gemini';
import { FoodAnalysis } from '../types';

interface ScannerProps {
  onClose: () => void;
  onComplete: (result: FoodAnalysis) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onClose, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("无法访问摄像头，请检查权限。");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    setIsAnalyzing(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    try {
      const result = await analyzeFoodImage(imageData);
      onComplete({
        ...result,
        imageUrl: canvasRef.current.toDataURL('image/jpeg')
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError("分析失败，请重试。");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative z-20 flex items-center justify-between p-6 pt-12">
        <button onClick={onClose} className="flex size-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10">
          <span className="material-symbols-outlined !text-[24px]">close</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-black/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 flex items-center gap-2">
            <div className={`size-2 rounded-full bg-primary ${isAnalyzing ? 'animate-ping' : 'animate-pulse'}`}></div>
            <span className="text-white text-xs font-semibold tracking-wide uppercase">
              {isAnalyzing ? '正在处理...' : 'AI 实时识别中'}
            </span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10">
          <span className="material-symbols-outlined !text-[24px]">flash_on</span>
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-[0.5px] border-white/30 rounded-3xl">
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-xl"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-xl"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-xl"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <p className="text-white text-sm font-medium">正在检测食物...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 w-full z-20">
        <p className="text-white/90 text-base font-normal leading-normal px-4 text-center drop-shadow-sm">
          将食物置于框内以获得最佳效果
        </p>
        {isAnalyzing && (
          <h4 className="text-primary text-sm font-bold leading-normal tracking-[0.1em] px-4 py-2 text-center uppercase animate-pulse">
            正在分析卡路里...
          </h4>
        )}
        {error && (
          <p className="text-red-400 text-sm font-bold px-4 py-2 text-center">{error}</p>
        )}
      </div>

      <div className="absolute bottom-0 w-full z-30 pb-10 pt-6 px-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button className="flex shrink-0 items-center justify-center rounded-xl size-12 bg-white/10 backdrop-blur-md text-white border border-white/20 overflow-hidden">
             <img src="https://picsum.photos/seed/last-scan/100/100" className="w-full h-full object-cover opacity-60" />
          </button>
          
          <div className="p-1 rounded-full border-2 border-white/50">
            <button 
              onClick={handleCapture}
              disabled={isAnalyzing}
              className={`flex shrink-0 items-center justify-center rounded-full size-20 bg-primary text-background-dark shadow-lg shadow-primary/20 active:scale-95 transition-transform ${isAnalyzing ? 'opacity-50' : ''}`}
            >
              <span className="material-symbols-outlined !text-[36px]">photo_camera</span>
            </button>
          </div>

          <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-white/10 backdrop-blur-md text-white border border-white/20">
            <span className="material-symbols-outlined !text-[24px]">history</span>
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-6">
          <span className="text-primary text-xs font-bold uppercase tracking-widest border-b-2 border-primary pb-1">智能识别</span>
          <span className="text-white/40 text-xs font-bold uppercase tracking-widest">扫条形码</span>
          <span className="text-white/40 text-xs font-bold uppercase tracking-widest">手动录入</span>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
