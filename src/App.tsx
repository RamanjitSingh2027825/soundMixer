import React, { useState } from 'react';
import { Play, Pause, LayoutTemplate, Sparkles, Volume2, VolumeX } from 'lucide-react';
import FocusTimer from './components/FocusTimer';
import SoundControl from './components/SoundControl';
import { useAudioMixer } from './hooks/useAudioMixer';
import { SOUNDS } from './data/sounds';
import { PRESETS } from './data/presets';

function App() {
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  
  // Destructure the new Master Volume controls
  const { 
    volumes, 
    setTrackVolume, 
    applyPreset, 
    toggleMasterPlay, 
    isPlaying,
    masterVolume,
    setMasterVolume
  } = useAudioMixer(phase);

  return (
    <div className="h-[100dvh] w-full relative bg-black text-white overflow-hidden font-sans">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -left-[10%] w-[70%] h-[50%] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob ${phase === 'work' ? 'bg-indigo-600' : 'bg-emerald-600'} transition-colors duration-[2000ms]`}></div>
        <div className={`absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000 ${phase === 'work' ? 'bg-purple-600' : 'bg-teal-600'} transition-colors duration-[2000ms]`}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000 bg-blue-600"></div>
      </div>

      <div className="relative z-10 h-full overflow-y-auto no-scrollbar flex flex-col">
        
        {/* Header with Master Volume */}
        <header className="p-6 shrink-0 backdrop-blur-sm sticky top-0 z-50 space-y-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Flow State
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Sonic Focus Tool</p>
            </div>
            <button 
              onClick={toggleMasterPlay}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all backdrop-blur-md ${isPlaying ? 'bg-white/10 border-white/30 text-white shadow-lg' : 'bg-transparent border-white/10 text-white/50'}`}
            >
              {isPlaying ? 'Active' : 'Paused'}
            </button>
          </div>

          {/* New Master Volume Slider */}
          <div className="flex items-center gap-3 px-1 pt-1">
            <button 
                onClick={() => setMasterVolume(masterVolume > 0 ? 0 : 0.8)} 
                className="text-white/70 hover:text-white transition-colors"
            >
                {masterVolume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="relative flex-1 h-6 flex items-center group">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={masterVolume}
                    onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                    className="w-full z-10 opacity-0 cursor-pointer absolute inset-0 h-full"
                />
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <div 
                        className="h-full bg-white/80 transition-all duration-100 ease-out"
                        style={{ width: `${masterVolume * 100}%` }}
                    />
                </div>
                <div 
                    className="h-4 w-4 bg-white rounded-full shadow-lg absolute pointer-events-none transition-all duration-100 ease-out group-active:scale-110"
                    style={{ left: `calc(${masterVolume * 100}% - 8px)` }}
                />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col max-w-md mx-auto w-full px-6 pb-32">
          
          {/* Timer Section */}
          <div className="py-8 shrink-0">
            <FocusTimer onPhaseChange={setPhase} />
          </div>

          {/* Presets */}
          <div className="mb-8 shrink-0">
            <div className="flex items-center gap-2 mb-4 text-white/60 px-1">
              <LayoutTemplate className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Environments</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x no-scrollbar -mx-6 px-6">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.levels)}
                  className="snap-start shrink-0 flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all w-[100px] group active:scale-95"
                >
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/20 transition-colors text-white/80 group-hover:text-white shadow-inner">
                    <preset.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium text-white/60 group-hover:text-white text-center leading-tight">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mixer Stack */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 mb-2">
              <div className="flex items-center gap-2 text-white/60">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Mixer</span>
              </div>
              {phase === 'break' && <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded animate-pulse">Dims in Break</span>}
            </div>

            {SOUNDS.map(sound => (
              <SoundControl
                key={sound.id}
                sound={sound}
                volume={volumes[sound.id]}
                onChange={(val) => {
                  setTrackVolume(sound.id, val);
                  if (val > 0 && !isPlaying) toggleMasterPlay();
                }}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Mobile FAB */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <button 
          onClick={toggleMasterPlay}
          className="w-16 h-16 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center active:scale-90 transition-transform"
        >
          {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
        </button>
      </div>
    </div>
  );
}

export default App;