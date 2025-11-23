import { useState, useEffect, useRef } from 'react';
import { SOUNDS } from '../data/sounds';
import { SoundGenerator } from '../audio/audioEngine';

export const useAudioMixer = () => {
  const [volumes, setVolumes] = useState<Record<string, number>>(() => 
    SOUNDS.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {})
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const engineRef = useRef<SoundGenerator | null>(null);

  // Initialize Engine
  useEffect(() => {
    engineRef.current = new SoundGenerator();
    const engine = engineRef.current;

    // Initialize all nodes (muted)
    SOUNDS.forEach(sound => {
      if (sound.type === 'drone') {
        engine.startOscillator(sound.id, 150, 'sine'); // Low drone
      } else {
        engine.startNoise(sound.id, sound.type as 'white' | 'pink' | 'brown');
      }
    });

    return () => engine.stopAll();
  }, []);

  // Sync React State -> Audio Engine
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    if (isPlaying) {
      engine.resume();
      // Apply current volumes
      Object.entries(volumes).forEach(([id, vol]) => {
        engine.setVolume(id, vol * 0.2); // * 0.2 to prevent clipping/loudness
      });
    } else {
      // Mute all if global pause
      SOUNDS.forEach(s => engine.setVolume(s.id, 0));
    }
  }, [isPlaying, volumes]);

  const setTrackVolume = (id: string, val: number) => {
    setVolumes(prev => ({ ...prev, [id]: val }));
  };

  const toggleMasterPlay = () => {
    // Browsers require user interaction to start AudioContext
    if (!isPlaying && engineRef.current) {
      engineRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  return { volumes, setTrackVolume, isPlaying, toggleMasterPlay };
};