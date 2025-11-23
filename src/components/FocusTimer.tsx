import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Coffee } from 'lucide-react';

interface FocusTimerProps {
  onPhaseChange: (phase: 'work' | 'break') => void;
}

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const FocusTimer: React.FC<FocusTimerProps> = ({ onPhaseChange }) => {
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      const nextPhase = phase === 'work' ? 'break' : 'work';
      setPhase(nextPhase);
      onPhaseChange(nextPhase);
      setTimeLeft(nextPhase === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, onPhaseChange]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setPhase('work');
    setTimeLeft(WORK_MINUTES * 60);
    onPhaseChange('work');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalTime = phase === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60;
  const progress = 1 - timeLeft / totalTime;
  const strokeColor = phase === 'work' ? '#818cf8' : '#34d399'; // Indigo vs Emerald

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Glow Effect behind timer */}
      <div className={`absolute inset-0 blur-3xl opacity-30 rounded-full ${isActive ? 'animate-pulse' : ''}`} 
           style={{ backgroundColor: strokeColor }} />

      <div className="relative w-72 h-72">
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
          {/* Track */}
          <circle cx="50" cy="50" r="45" className="stroke-white/10" strokeWidth="2" fill="none" />
          {/* Progress */}
          <circle 
            cx="50" cy="50" r="45" 
            stroke={strokeColor}
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="283" 
            strokeDashoffset={283 * (1 - progress)} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-white/70`}>
            {phase === 'work' ? <Brain className="w-3 h-3" /> : <Coffee className="w-3 h-3" />}
            {phase}
          </div>
          
          <div className="text-6xl font-light tracking-tighter text-white drop-shadow-lg">
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-6 mt-6">
            <button onClick={resetTimer} className="p-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTimer} 
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;