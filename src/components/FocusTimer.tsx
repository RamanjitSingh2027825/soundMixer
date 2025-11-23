import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Coffee } from 'lucide-react';

interface FocusTimerProps {
  onPhaseChange: (phase: 'work' | 'break') => void;
}

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const FocusTimer: React.FC<FocusTimerProps> = ({ onPhaseChange }) => {
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      const nextPhase = phase === 'work' ? 'break' : 'work';
      setPhase(nextPhase);
      setTimeLeft(nextPhase === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60);
      setIsActive(false); // Pause auto-start or keep true to loop
      onPhaseChange(nextPhase);
      // Optional: Play a chime sound here
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

  const progress = 1 - timeLeft / (phase === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60);

  return (
    <div className="relative w-64 h-64 flex flex-col items-center justify-center">
      {/* Circular Progress Background */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" className="stroke-slate-800" strokeWidth="4" fill="none" />
        <circle 
          cx="50" cy="50" r="45" 
          className={`transition-all duration-1000 ${phase === 'work' ? 'stroke-indigo-500' : 'stroke-emerald-500'}`} 
          strokeWidth="4" fill="none" 
          strokeDasharray="283" 
          strokeDashoffset={283 * (1 - progress)} 
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div className="z-10 flex flex-col items-center gap-2">
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${phase === 'work' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          {phase === 'work' ? <Brain className="w-3 h-3" /> : <Coffee className="w-3 h-3" />}
          {phase} mode
        </div>
        
        <div className="text-5xl font-mono font-bold text-slate-100 tracking-tighter">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4 mt-2">
          <button onClick={toggleTimer} className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </button>
          <button onClick={resetTimer} className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;