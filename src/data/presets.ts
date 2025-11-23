import { Zap, BookOpen, Moon, Shield, Code, PenTool, Coffee, Plane, CloudLightning, Anchor, Activity, Brain } from 'lucide-react';

export interface Preset {
  id: string;
  name: string;
  icon: any;
  levels: Record<string, number>; // rain, brown, wind, drone
}

export const PRESETS: Preset[] = [
  {
    id: 'deep-work',
    name: 'Deep Work',
    icon: Brain,
    levels: { brown: 0.8, drone: 0.3, rain: 0, wind: 0 } 
    // Rationale: High Brown noise silences thought; Drone locks focus.
  },
  {
    id: 'code-crunch',
    name: 'Code Crunch',
    icon: Code,
    levels: { brown: 0.6, drone: 0.6, rain: 0, wind: 0.1 }
    // Rationale: Intense Drone for logic processing, Brown for background.
  },
  {
    id: 'creative-flow',
    name: 'Creative Flow',
    icon: PenTool,
    levels: { rain: 0.5, brown: 0.2, wind: 0, drone: 0.1 }
    // Rationale: Pink noise (Rain) promotes relaxation without sleepiness.
  },
  {
    id: 'reading',
    name: 'Reading Lounge',
    icon: BookOpen,
    levels: { rain: 0.4, wind: 0.1, brown: 0.1, drone: 0 }
    // Rationale: Light texture that isn't intrusive to language processing.
  },
  {
    id: 'anxiety-shield',
    name: 'Anxiety Shield',
    icon: Shield,
    levels: { brown: 0.9, rain: 0.2, wind: 0, drone: 0 }
    // Rationale: "Womb-like" heavy frequencies to ground the nervous system.
  },
  {
    id: 'noise-blocker',
    name: 'Office Blocker',
    icon: Activity,
    levels: { wind: 0.6, brown: 0.5, rain: 0.3, drone: 0 }
    // Rationale: White noise (Wind) masks human speech frequencies best.
  },
  {
    id: 'sleep-tunnel',
    name: 'Sleep Tunnel',
    icon: Moon,
    levels: { brown: 0.7, rain: 0.1, wind: 0, drone: 0 }
    // Rationale: Pure, dark noise to induce delta waves.
  },
  {
    id: 'airplane-mode',
    name: 'Airplane Cabin',
    icon: Plane,
    levels: { brown: 0.6, wind: 0.5, rain: 0, drone: 0 }
    // Rationale: Simulates the engine drone for travel naps.
  },
  {
    id: 'heavy-storm',
    name: 'Heavy Storm',
    icon: CloudLightning,
    levels: { rain: 1.0, wind: 0.4, brown: 0.4, drone: 0 }
    // Rationale: Maximal immersion for blocking the world out.
  },
  {
    id: 'coffee-shop',
    name: 'Muffled Cafe',
    icon: Coffee,
    levels: { brown: 0.5, wind: 0.2, rain: 0.1, drone: 0 }
    // Rationale: Warm texture (Brown) + slight hiss (Wind) mimics distant AC/Chatter.
  },
  {
    id: 'grounding',
    name: 'Grounding',
    icon: Anchor,
    levels: { drone: 0.2, brown: 0.8, rain: 0, wind: 0 }
    // Rationale: Heavy bass focus to calm jitters.
  },
  {
    id: 'gamma-boost',
    name: 'Gamma Boost',
    icon: Zap,
    levels: { drone: 1.0, wind: 0.1, brown: 0.1, rain: 0 }
    // Rationale: Pure 40Hz drive for peak mental athletic performance.
  }
];