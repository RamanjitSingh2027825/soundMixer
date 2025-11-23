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
    <div className={`group relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-slate-800/80 ring-1 ring-slate-700' : 'bg-slate-900/50 hover:bg-slate-800/50'}`}>
      
      {/* Header */}
      <div className="flex items-center gap-3 w-full mb-4">
        <div className={`p-2 rounded-lg transition-colors ${isActive ? sound.color + ' bg-white/5' : 'text-slate-500'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-sm font-medium ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
          {sound.label}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-colors ${isActive ? 'bg-slate-700' : 'bg-slate-800'}`}
        style={{
          backgroundImage: `linear-gradient(to right, ${isActive ? 'currentColor' : 'transparent'} ${volume * 100}%, transparent ${volume * 100}%)`
        }}
      />
      
      {/* Value Readout (Optional) */}
      <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
        {Math.round(volume * 100)}%
      </div>
    </div>
  );
};

export default SoundControl;