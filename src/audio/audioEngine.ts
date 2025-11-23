// src/audio/audioEngine.ts

let audioCtx: AudioContext | null = null;

export class SoundGenerator {
  ctx: AudioContext;
  nodes: Record<string, { sources: AudioNode[]; gain: GainNode }>;

  constructor() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    this.ctx = audioCtx;
    this.nodes = {};
  }

  // True Stereo Binaural Beat Generator (Pure Sine Waves)
  startBinaural(id: string, carrierFreq: number, beatFreq: number) {
    if (this.nodes[id]) return;

    // Create Master Gain for this track
    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0; // Start muted
    masterGain.connect(this.ctx.destination);

    // --- LEFT EAR (Carrier) ---
    const oscL = this.ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.value = carrierFreq;
    
    const panL = this.ctx.createStereoPanner();
    panL.pan.value = -1; // Hard Left

    oscL.connect(panL);
    panL.connect(masterGain);

    // --- RIGHT EAR (Carrier + Beat) ---
    const oscR = this.ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.value = carrierFreq + beatFreq; // The Magic happens here
    
    const panR = this.ctx.createStereoPanner();
    panR.pan.value = 1; // Hard Right

    oscR.connect(panR);
    panR.connect(masterGain);

    // Start
    oscL.start();
    oscR.start();

    this.nodes[id] = { sources: [oscL, oscR], gain: masterGain };
  }

  setVolume(id: string, value: number) {
    if (this.nodes[id]) {
      // Smooth transition to prevent clicking
      this.nodes[id].gain.gain.setTargetAtTime(value, this.ctx.currentTime, 0.1);
    }
  }

  resume() {
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  stopAll() {
    Object.values(this.nodes).forEach(({ sources }) => {
      sources.forEach(s => {
        if (s instanceof OscillatorNode) s.stop();
        s.disconnect();
      });
    });
    this.nodes = {};
  }
}