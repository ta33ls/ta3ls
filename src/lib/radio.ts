import type { SkillBand } from "@/lib/site-data";

type WebkitWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export class RadioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private oscillatorA: OscillatorNode | null = null;
  private oscillatorB: OscillatorNode | null = null;
  private on = false;

  private ensure(band: SkillBand) {
    if (this.context) return;

    const AudioContextClass =
      window.AudioContext || (window as WebkitWindow).webkitAudioContext;
    if (!AudioContextClass) throw new Error("AudioContext unavailable");

    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.0001;

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.knee.value = 16;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.35;

    master.connect(compressor);
    compressor.connect(context.destination);

    const length = Math.floor(context.sampleRate * 4);
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;

    for (let index = 0; index < length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.015 * white) / 1.015;
      data[index] = last * 3.2;
    }

    const noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 900;
    noiseFilter.Q.value = 0.8;

    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.12;

    const sweep = context.createOscillator();
    const sweepGain = context.createGain();
    sweep.frequency.value = 0.06;
    sweepGain.gain.value = 90;
    sweep.connect(sweepGain);
    sweepGain.connect(noiseFilter.frequency);
    sweep.start();

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    const oscillatorA = context.createOscillator();
    oscillatorA.type = "sine";
    oscillatorA.frequency.value = band.audio.root;

    const oscillatorB = context.createOscillator();
    oscillatorB.type = "triangle";
    oscillatorB.frequency.value = band.audio.root * band.audio.ratio;
    oscillatorB.detune.value = 5;

    const gainA = context.createGain();
    gainA.gain.value = 0.036;

    const gainB = context.createGain();
    gainB.gain.value = 0.018;

    oscillatorA.connect(gainA);
    gainA.connect(master);
    oscillatorB.connect(gainB);
    gainB.connect(master);

    oscillatorA.start();
    oscillatorB.start();

    this.context = context;
    this.master = master;
    this.noiseGain = noiseGain;
    this.noiseFilter = noiseFilter;
    this.oscillatorA = oscillatorA;
    this.oscillatorB = oscillatorB;

    this.applyStation(band, true);
  }

  applyStation(band: SkillBand, immediate = false) {
    if (!this.context || !this.oscillatorA || !this.oscillatorB) return;
    if (!this.noiseFilter || !this.noiseGain) return;

    const now = this.context.currentTime;
    const glide = immediate ? 0.05 : 0.45;

    this.oscillatorA.frequency.cancelScheduledValues(now);
    this.oscillatorA.frequency.setTargetAtTime(band.audio.root, now, glide);
    this.oscillatorB.frequency.cancelScheduledValues(now);
    this.oscillatorB.frequency.setTargetAtTime(
      band.audio.root * band.audio.ratio,
      now,
      glide
    );

    this.noiseFilter.frequency.cancelScheduledValues(now);
    this.noiseFilter.frequency.setTargetAtTime(band.audio.filter, now, glide);
    this.noiseFilter.Q.cancelScheduledValues(now);
    this.noiseFilter.Q.setTargetAtTime(band.audio.q, now, glide);

    this.noiseGain.gain.cancelScheduledValues(now);
    this.noiseGain.gain.setTargetAtTime(band.audio.noise, now, glide);
  }

  tune(band: SkillBand, index: number) {
    this.applyStation(band);
    if (!this.context || !this.master || !this.on) return;

    const now = this.context.currentTime;
    const blip = this.context.createOscillator();
    const blipGain = this.context.createGain();
    const pan = this.context.createStereoPanner
      ? this.context.createStereoPanner()
      : null;

    blip.type = "sine";
    blip.frequency.value = 784;
    blipGain.gain.setValueAtTime(0.0001, now);
    blipGain.gain.exponentialRampToValueAtTime(0.018, now + 0.015);
    blipGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    if (pan) {
      pan.pan.value = -0.2 + index * 0.13;
      blip.connect(blipGain);
      blipGain.connect(pan);
      pan.connect(this.master);
    } else {
      blip.connect(blipGain);
      blipGain.connect(this.master);
    }

    blip.start(now);
    blip.stop(now + 0.25);
  }

  async start(band: SkillBand) {
    this.ensure(band);
    if (!this.context || !this.master) return;
    await this.context.resume();
    this.applyStation(band);
    this.on = true;

    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(
      Math.max(this.master.gain.value, 0.0001),
      now
    );
    this.master.gain.exponentialRampToValueAtTime(0.2, now + 1.4);
  }

  stop() {
    if (!this.context || !this.master) return;
    this.on = false;

    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(
      Math.max(this.master.gain.value, 0.0001),
      now
    );
    this.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  }

  close() {
    this.on = false;
    if (this.context) {
      void this.context.close();
    }
    this.context = null;
    this.master = null;
    this.noiseGain = null;
    this.noiseFilter = null;
    this.oscillatorA = null;
    this.oscillatorB = null;
  }
}
