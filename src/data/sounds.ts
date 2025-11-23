import { Moon, Cloud, Sunset, Zap, Activity, LucideIcon } from 'lucide-react';

export interface SoundTrack {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  type: 'binaural'; 
  freq: number; // Carrier Frequency
  beat: number; // The Target Brainwave Frequency
}

export const SOUNDS: SoundTrack[] = [
  {
    id: 'delta',
    label: 'Delta Waves',
    description: 'Deep Sleep & Healing (0.5-4Hz)',
    icon: Moon,
    color: 'text-indigo-400',
    type: 'binaural',
    freq: 100, // Low carrier for sleep
    beat: 2.5  // Target: Deep Delta
  },
  {
    id: 'theta',
    label: 'Theta Waves',
    description: 'Meditation & Intuition (4-8Hz)',
    icon: Cloud,
    color: 'text-purple-400',
    type: 'binaural',
    freq: 150, // Comfortable carrier
    beat: 6    // Target: Deep Theta
  },
  {
    id: 'alpha',
    label: 'Alpha Waves',
    description: 'Relaxed Flow & Focus (8-14Hz)',
    icon: Sunset,
    color: 'text-emerald-400',
    type: 'binaural',
    freq: 200,
    beat: 10   // Target: Perfect Alpha
  },
  {
    id: 'beta',
    label: 'Beta Waves',
    description: 'Active Thinking (14-30Hz)',
    icon: Activity,
    color: 'text-amber-400',
    type: 'binaural',
    freq: 250,
    beat: 20   // Target: Mid Beta
  },
  {
    id: 'gamma',
    label: 'Gamma Waves',
    description: 'Peak Awareness (30Hz+)',
    icon: Zap,
    color: 'text-rose-400',
    type: 'binaural',
    freq: 300, // Higher carrier for intensity
    beat: 40   // Target: Pure Gamma
  }
];