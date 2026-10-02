let context: AudioContext | null = null;

function getContext() {
  context ??= new AudioContext();
  return context;
}

export function resumeSounds() {
  const ctx = getContext();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

function tone(
  from: number,
  to: number,
  duration: number,
  type: OscillatorType = "square"
) {
  const ctx = getContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(to, 1),
    now + duration
  );

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

export const sounds = {
  wall: () => tone(520, 520, 0.04),
  paddle: () => tone(330, 440, 0.06),
  brick: () => tone(880, 1320, 0.07, "triangle"),
  lifeLost: () => tone(300, 90, 0.35, "sawtooth"),
  levelClear: () => {
    tone(523, 523, 0.1, "triangle");
    setTimeout(() => tone(659, 659, 0.1, "triangle"), 110);
    setTimeout(() => tone(784, 784, 0.18, "triangle"), 220);
  },
};
