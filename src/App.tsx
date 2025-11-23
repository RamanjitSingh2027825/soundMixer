import React, { useState } from 'react';
import { Activity, Sparkles, Play, Pause, LayoutTemplate } from 'lucide-react';
import FocusTimer from './components/FocusTimer';
import SoundControl from './components/SoundControl';
import { useAudioMixer } from './hooks/useAudioMixer';
import { SOUNDS } from './data/sounds';
import { PRESETS } from './data/presets'; // Import presets

function App() {
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  
  // Destructure applyPreset
  const { volumes, setTrackVolume, applyPreset, toggleMasterPlay, isPlaying } = useAudioMixer(phase);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/20 to-[#020617] pointer-events-none" />

      <div className="relative max-w-md mx-auto min-h-screen flex flex-col">
        
        <header className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Flow State</h1>
              <p className="text-xs text-slate-500 font-medium">Deep Focus Mixer</p>
            </div>
          </div>
          <button 
            onClick={toggleMasterPlay}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${isPlaying ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}
          >
            {isPlaying ? 'Active' : 'Ready'}
          </button>
        </header>

        <main className="flex-1 px-6 flex flex-col gap-8 pb-32">
          
          {/* Timer */}
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-emerald-500/5" />
            <FocusTimer onPhaseChange={setPhase} />
          </div>

          {/* PRESETS SECTION */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" /> Quick Presets
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-6 px-6">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.levels)}
                  className="flex-shrink-0 snap-start flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors min-w-[100px] group"
                >
                  <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors text-slate-400">
                    <preset.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mixer Controls */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Manual Mix
              </h2>
              {phase === 'break' && (
                <span className="text-xs text-emerald-400 animate-pulse">Relax Mode (Dimmed)</span>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
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
          </div>
        </main>

        {/* Floating FAB */}
        <div className="fixed bottom-8 right-8 md:hidden z-50">
          <button 
            onClick={toggleMasterPlay}
            className="w-14 h-14 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;