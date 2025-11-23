import { useState, useEffect, useRef } from 'react';
import { SOUNDS } from '../data/sounds';
import { SoundGenerator } from '../audio/audioEngine';

export const useAudioMixer = (phase: 'work' | 'break') => {
  const [volumes, setVolumes] = useState<Record<string, number>>(() => 
    SOUNDS.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {})
  );
  
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);
  const engineRef = useRef<SoundGenerator | null>(null);

  useEffect(() => {
    engineRef.current = new SoundGenerator();
    const engine = engineRef.current;

    SOUNDS.forEach(sound => {
      if (sound.type === 'binaural') {
        engine.startBinaural(sound.id, sound.freq, sound.beat);
      }
    });

    return () => engine.stopAll();
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const isBreak = phase === 'break';
    
    if (isPlaying) {
      engine.resume();
      Object.entries(volumes).forEach(([id, vol]) => {
        let finalVol = vol * masterVolume;

        // Smart Phase Mixing: Drop intensity during breaks
        if (isBreak) {
            if (id === 'gamma' || id === 'beta') finalVol *= 0.1; // Kill high intensity
            if (id === 'alpha' || id === 'theta') finalVol = Math.min(1, finalVol * 1.2); // Boost relax
        }

        engine.setVolume(id, finalVol);
      });
    } else {
      SOUNDS.forEach(s => engine.setVolume(s.id, 0));
    }
  }, [isPlaying, volumes, phase, masterVolume]);

  const setTrackVolume = (id: string, val: number) => {
    setVolumes(prev => ({ ...prev, [id]: val }));
  };

  const applyPreset = (presetLevels: Record<string, number>) => {
    const zeroState = SOUNDS.reduce((acc, s) => ({ ...acc, [s.id]: 0 }), {});
    setVolumes({ ...zeroState, ...presetLevels });
    if (!isPlaying && engineRef.current) {
        engineRef.current.resume();
        setIsPlaying(true);
    }
  };

  const toggleMasterPlay = () => {
    if (!isPlaying && engineRef.current) engineRef.current.resume();
    setIsPlaying(!isPlaying);
  };

  return { volumes, setTrackVolume, applyPreset, isPlaying, toggleMasterPlay, masterVolume, setMasterVolume };
};