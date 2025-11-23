import { useState, useEffect, useRef } from 'react';
import { SOUNDS } from '../data/sounds';
import { SoundGenerator } from '../audio/audioEngine';

export const useAudioMixer = (phase: 'work' | 'break') => {
  // Initial state
  const [volumes, setVolumes] = useState<Record<string, number>>(() => 
    SOUNDS.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {})
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const engineRef = useRef<SoundGenerator | null>(null);

  useEffect(() => {
    engineRef.current = new SoundGenerator();
    const engine = engineRef.current;

    SOUNDS.forEach(sound => {
      if (sound.type === 'drone') {
        engine.startOscillator(sound.id, 150, 'sine'); 
      } else {
        engine.startNoise(sound.id, sound.type as 'white' | 'pink' | 'brown');
      }
    });

    return () => engine.stopAll();
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const isBreak = phase === 'break';
    const dimmer = isBreak ? 0.3 : 1.0;

    if (isPlaying) {
      engine.resume();
      Object.entries(volumes).forEach(([id, vol]) => {
        let finalVol = vol * 0.2 * dimmer; 
        if (isBreak && id === 'drone') finalVol = 0; 
        engine.setVolume(id, finalVol);
      });
    } else {
      SOUNDS.forEach(s => engine.setVolume(s.id, 0));
    }
  }, [isPlaying, volumes, phase]);

  const setTrackVolume = (id: string, val: number) => {
    setVolumes(prev => ({ ...prev, [id]: val }));
  };

  // --- NEW FUNCTION ---
  const applyPreset = (presetLevels: Record<string, number>) => {
    // Merge with current to ensure no keys are missing, though preset should cover them
    setVolumes(prev => ({ ...prev, ...presetLevels }));
    if (!isPlaying && engineRef.current) {
        engineRef.current.resume();
        setIsPlaying(true);
    }
  };

  const toggleMasterPlay = () => {
    if (!isPlaying && engineRef.current) engineRef.current.resume();
    setIsPlaying(!isPlaying);
  };

  return { volumes, setTrackVolume, applyPreset, isPlaying, toggleMasterPlay };
};