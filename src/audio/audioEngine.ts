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

  // True Stereo Binaural Beat Generator
  startBinaural(id: string, carrierFreq: number, beatFreq: number) {
    if (this.nodes[id]) return;

    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(this.ctx.destination);

    // Left Ear
    const oscL = this.ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.value = carrierFreq;
    const panL = this.ctx.createStereoPanner();
    panL.pan.value = -1;
    oscL.connect(panL);
    panL.connect(masterGain);

    // Right Ear (Carrier + Beat)
    const oscR = this.ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.value = carrierFreq + beatFreq;
    const panR = this.ctx.createStereoPanner();
    panR.pan.value = 1;
    oscR.connect(panR);
    panR.connect(masterGain);

    oscL.start();
    oscR.start();

    this.nodes[id] = { sources: [oscL, oscR], gain: masterGain };
  }

  setVolume(id: string, value: number) {
    if (this.nodes[id]) {
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