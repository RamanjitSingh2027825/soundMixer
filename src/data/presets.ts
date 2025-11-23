import { Zap, BookOpen, Moon, Shield, Code, PenTool, Coffee, Anchor, Activity, Brain, Sun, Feather } from 'lucide-react';

export interface Preset {
  id: string;
  name: string;
  icon: any;
  levels: Record<string, number>; // delta, theta, alpha, beta, gamma
}

export const PRESETS: Preset[] = [
  {
    id: 'deep-sleep',
    name: 'Deep Sleep',
    icon: Moon,
    levels: { delta: 0.8, theta: 0.2, alpha: 0, beta: 0, gamma: 0 }
    // Dominant Delta for restorative sleep.
  },
  {
    id: 'lucid-dream',
    name: 'Lucid Dream',
    icon: Cloud,
    levels: { theta: 0.7, delta: 0.3, alpha: 0.1, beta: 0, gamma: 0 }
    // Theta heavy for REM state and visualization.
  },
  {
    id: 'meditation',
    name: 'Zen Monk',
    icon: Anchor,
    levels: { theta: 0.5, alpha: 0.5, delta: 0, beta: 0, gamma: 0 }
    // The "Awake-but-Asleep" bridge state.
  },
  {
    id: 'flow-state',
    name: 'Creative Flow',
    icon: PenTool,
    levels: { alpha: 0.8, theta: 0.2, beta: 0, gamma: 0, delta: 0 }
    // High Alpha promotes relaxed creativity without stress.
  },
  {
    id: 'reading',
    name: 'Reading Mode',
    icon: BookOpen,
    levels: { alpha: 0.6, beta: 0.2, theta: 0, gamma: 0, delta: 0 }
    // Alpha for calm, low Beta for linguistic processing.
  },
  {
    id: 'focus',
    name: 'Deep Focus',
    icon: Brain,
    levels: { beta: 0.7, alpha: 0.3, gamma: 0, theta: 0, delta: 0 }
    // Standard Beta for active work and logic.
  },
  {
    id: 'intense-work',
    name: 'Code Crunch',
    icon: Code,
    levels: { beta: 0.5, gamma: 0.5, alpha: 0, theta: 0, delta: 0 }
    // Mixing Beta and Gamma for high-speed processing.
  },
  {
    id: 'peak-performance',
    name: 'Limitless',
    icon: Zap,
    levels: { gamma: 0.8, beta: 0.2, alpha: 0, theta: 0, delta: 0 }
    // High Gamma for "A-Ha!" moments and memory binding.
  },
  {
    id: 'morning-boost',
    name: 'Sunrise',
    icon: Sun,
    levels: { beta: 0.6, gamma: 0.2, alpha: 0.2, theta: 0, delta: 0 }
    // Wakes up the brain from grogginess.
  },
  {
    id: 'anxiety-relief',
    name: 'Calm Down',
    icon: Feather,
    levels: { alpha: 0.6, delta: 0.2, theta: 0.2, beta: 0, gamma: 0 }
    // Grounding mix to lower heart rate.
  }
];