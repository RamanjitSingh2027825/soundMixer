import { Moon, Cloud, Sunset, Activity, Zap, LucideIcon } from 'lucide-react';

export interface SoundTrack {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  type: 'binaural'; 
  freq: number; // Carrier Frequency
  beat: number; // Target Brainwave Frequency
}

export const SOUNDS: SoundTrack[] = [
  {
    id: 'delta',
    label: 'Delta',
    description: 'Deep Sleep (0.5-4Hz)',
    icon: Moon,
    color: 'text-indigo-400',
    type: 'binaural',
    freq: 100,
    beat: 2.5
  },
  {
    id: 'theta',
    label: 'Theta',
    description: 'Meditation (4-8Hz)',
    icon: Cloud,
    color: 'text-purple-400',
    type: 'binaural',
    freq: 150,
    beat: 6
  },
  {
    id: 'alpha',
    label: 'Alpha',
    description: 'Flow State (8-14Hz)',
    icon: Sunset,
    color: 'text-emerald-400',
    type: 'binaural',
    freq: 200,
    beat: 10
  },
  {
    id: 'beta',
    label: 'Beta',
    description: 'Active Focus (14-30Hz)',
    icon: Activity,
    color: 'text-amber-400',
    type: 'binaural',
    freq: 250,
    beat: 20
  },
  {
    id: 'gamma',
    label: 'Gamma',
    description: 'Peak Insight (30Hz+)',
    icon: Zap,
    color: 'text-rose-400',
    type: 'binaural',
    freq: 300,
    beat: 40
  }
];