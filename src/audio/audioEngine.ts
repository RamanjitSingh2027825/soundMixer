// src/audio/audioEngine.ts

let audioCtx: AudioContext | null = null;

// Create a noise buffer (White, Pink, or Brown)
const createNoiseBuffer = (ctx: AudioContext, type: 'white' | 'pink' | 'brown') => {
  const bufferSize = 2 * ctx.sampleRate; // 2 seconds loop
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  if (type === 'white') {
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  } 
  
  else if (type === 'pink') {
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // (roughly) compensate for gain
      b6 = white * 0.115926;
    }
  } 
  
  else if (type === 'brown') {
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // (roughly) compensate for gain
    }
  }

  return buffer;
};

export class SoundGenerator {
  ctx: AudioContext;
  nodes: Record<string, { source: AudioBufferSourceNode | OscillatorNode; gain: GainNode }>;

  constructor() {
    // Singleton AudioContext
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    this.ctx = audioCtx;
    this.nodes = {};
  }

  startNoise(id: string, type: 'white' | 'pink' | 'brown') {
    if (this.nodes[id]) return;

    const buffer = createNoiseBuffer(this.ctx, type);
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = this.ctx.createGain();
    gain.gain.value = 0; // Start muted

    source.connect(gain);
    gain.connect(this.ctx.destination);
    source.start();

    this.nodes[id] = { source, gain };
  }

  startOscillator(id: string, freq: number, type: 'sine' | 'triangle' = 'sine') {
    if (this.nodes[id]) return;

    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;

    const gain = this.ctx.createGain();
    gain.gain.value = 0;

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();

    this.nodes[id] = { source: osc, gain };
  }

  setVolume(id: string, value: number) {
    if (this.nodes[id]) {
      // Smooth transition to prevent clicking
      this.nodes[id].gain.gain.setTargetAtTime(value, this.ctx.currentTime, 0.1);
    }
  }

  resume() {
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stopAll() {
    Object.values(this.nodes).forEach(({ source }) => source.stop());
    this.nodes = {};
  }
}