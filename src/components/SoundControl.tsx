import React from 'react';
import { SoundTrack } from '../data/sounds';

interface SoundControlProps {
  sound: SoundTrack;
  volume: number;
  onChange: (val: number) => void;
}

const SoundControl: React.FC<SoundControlProps> = ({ sound, volume, onChange }) => {
  const Icon = sound.icon;
  const isActive = volume > 0;

  return (
    <div className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 border ${isActive ? 'bg-white/10 border-white/20 shadow-lg backdrop-blur-md' : 'bg-white/5 border-white/5 backdrop-blur-sm'}`}>
      
      <button 
        onClick={() => onChange(isActive ? 0 : 0.5)}
        className={`p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white text-black shadow-glow' : 'text-white/50 bg-white/5'}`}
      >
        <Icon className="w-5 h-5" />
      </button>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
            {sound.label}
          </span>
        </div>

        <div className="relative w-full h-4 flex items-center">
           <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full z-10 opacity-0 cursor-pointer absolute inset-0 h-full"
          />
          {/* Custom Track Visualization */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
             <div 
                className={`h-full transition-all duration-100 ease-out ${isActive ? 'bg-white' : 'bg-white/30'}`}
                style={{ width: `${volume * 100}%` }}
             />
          </div>
          {/* Custom Thumb Visualization */}
          <div 
            className="h-4 w-4 bg-white rounded-full shadow-lg absolute pointer-events-none transition-all duration-100 ease-out"
            style={{ left: `calc(${volume * 100}% - 8px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SoundControl;