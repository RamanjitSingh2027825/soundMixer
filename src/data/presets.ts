import { Zap, BookOpen, Moon, Shield, Code, PenTool, Coffee, Anchor, Activity, Brain, Sun, Feather } from 'lucide-react';

export interface Preset {
  id: string;
  name: string;
  icon: any;
  levels: Record<string, number>; 
}

export const PRESETS: Preset[] = [
  {
    id: 'deep-code',
    name: 'Deep Logic',
    icon: Code,
    levels: { beta: 0.7, gamma: 0.4, alpha: 0.1, theta: 0, delta: 0 }
  },
  {
    id: 'flow-state',
    name: 'Creative Flow',
    icon: PenTool,
    levels: { alpha: 0.8, theta: 0.2, beta: 0, gamma: 0, delta: 0 }
  },
  {
    id: 'zen',
    name: 'Zen Monk',
    icon: Anchor,
    levels: { theta: 0.6, alpha: 0.4, delta: 0, beta: 0, gamma: 0 }
  },
  {
    id: 'peak',
    name: 'Limitless',
    icon: Zap,
    levels: { gamma: 0.9, beta: 0.2, alpha: 0, theta: 0, delta: 0 }
  },
  {
    id: 'sleep',
    name: 'Sleep Tunnel',
    icon: Moon,
    levels: { delta: 0.8, theta: 0.2, alpha: 0, beta: 0, gamma: 0 }
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    levels: { alpha: 0.6, beta: 0.2, theta: 0, gamma: 0, delta: 0 }
  }
];