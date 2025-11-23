import { CloudRain, Zap, Waves, Wind } from 'lucide-react';

export interface SoundTrack {
  id: string;
  label: string;
  icon: any;
  color: string;
  type: 'pink' | 'brown' | 'white' | 'drone'; // Generator type
}

export const SOUNDS: SoundTrack[] = [
  {
    id: 'rain',
    label: 'Soft Rain (Pink Noise)',
    icon: CloudRain,
    color: 'text-blue-400',
    type: 'pink'
  },
  {
    id: 'brown',
    label: 'Deep Focus (Brown Noise)',
    icon: Waves,
    color: 'text-amber-700',
    type: 'brown'
  },
  {
    id: 'wind',
    label: 'Wind / Fan (White Noise)',
    icon: Wind,
    color: 'text-sky-200',
    type: 'white'
  },
  {
    id: 'drone',
    label: '40Hz Binaural Drone',
    icon: Zap,
    color: 'text-purple-400',
    type: 'drone'
  }
];