import React, { useState } from 'react';
import { Play, Pause, Settings2 } from 'lucide-react';
import FocusTimer from './components/FocusTimer';
import SoundControl from './components/SoundControl';
import { useAudioMixer } from './hooks/useAudioMixer';
import { SOUNDS } from './data/sounds';

function App() {
  const { volumes, setTrackVolume, isPlaying, toggleMasterPlay } = useAudioMixer();
  const [phase, setPhase] = useState<'work' | 'break'>('work');

  // Intensity Logic: When in "Break", we dim the music volume or mute beats
  const getAdjustedVolume = (soundId: string, baseVol: number) => {
    if (phase === 'break') {
      // Mute beats completely during break, dim others by 50%
      if (soundId === 'lofi') return 0; 
      return baseVol * 0.5;
    }
    return baseVol;
  };

  // We wrap the hook's setTrackVolume to update our internal UI state 
  // while the hook manages the actual Audio objects.
  // Note: In a production app, we'd likely sync this better inside the hook.
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      
      {/* Navbar */}
      <nav className="p-6 flex items-center justify-between border-b border-slate-900/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Settings2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Flow State</h1>
        </div>
        <button 
          onClick={toggleMasterPlay}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isPlaying ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}
        >
          {isPlaying ? 'Master On' : 'Master Off'}
        </button>
      </nav>

      <main className="flex-1 max-w-lg mx-auto w-full p-6 flex flex-col gap-8 pb-32">
        
        {/* Timer Section */}
        <section className="flex justify-center py-4">
          <FocusTimer onPhaseChange={setPhase} />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* Mixer Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold text-slate-100">Sound Mixer</h2>
            <span className="text-xs text-slate-500 uppercase tracking-wider">{phase === 'break' ? 'Break Mode Active (Dimmed)' : 'Focus Mode Active'}</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {SOUNDS.map(sound => (
              <SoundControl
                key={sound.id}
                sound={sound}
                // We display the base volume set by user, 
                // but the actual audio object (inside hook) listens to this change.
                // To achieve the "dimming" effect visually, you might want to separate 
                // "userVolume" vs "effectiveVolume".
                // For now, we just control the base volume.
                volume={volumes[sound.id]}
                onChange={(val) => {
                   // If we want real-time dimming logic in the audio engine, 
                   // we would pass the phase to the hook. 
                   // For simplicity, this app lets you mix manually.
                   setTrackVolume(sound.id, val);
                }}
              />
            ))}
          </div>
        </section>

      </main>

      {/* Floating Play/Pause FAB (Mobile) */}
      <div className="fixed bottom-8 right-8 md:hidden">
        <button 
          onClick={toggleMasterPlay}
          className="w-14 h-14 rounded-full bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center active:scale-95 transition-transform"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
      </div>

    </div>
  );
}

export default App;