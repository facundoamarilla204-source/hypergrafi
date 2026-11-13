import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleRate = 44100;
const duration = 47.0;
const totalSamples = Math.floor(sampleRate * duration);
const bpm = 124;
const beatSec = 60 / bpm;
const sixteenthSec = beatSec / 4;

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// Helpers
function addSample(i, l, r) {
  if (i >= 0 && i < totalSamples) {
    left[i] += l;
    right[i] += r;
  }
}

// 1. Kick Drum
function triggerKick(startTime) {
  const kickDuration = 0.22;
  const kickSamples = Math.floor(kickDuration * sampleRate);
  const startSample = Math.floor(startTime * sampleRate);

  for (let s = 0; s < kickSamples; s++) {
    const t = s / sampleRate;
    const env = Math.exp(-t * 18);
    const freq = 45 + 130 * Math.exp(-t * 35);
    const phase = 2 * Math.PI * freq * t;
    const click = (s < 100) ? (Math.random() * 2 - 1) * 0.3 * (1 - s / 100) : 0;
    const val = (Math.sin(phase) * 0.85 + click) * env;
    addSample(startSample + s, val, val);
  }
}

// 2. Snare / Clap
function triggerClap(startTime) {
  const clapDuration = 0.20;
  const clapSamples = Math.floor(clapDuration * sampleRate);
  const startSample = Math.floor(startTime * sampleRate);

  for (let s = 0; s < clapSamples; s++) {
    const t = s / sampleRate;
    const env = Math.exp(-t * 22);
    // Filtered noise
    const noise = (Math.random() * 2 - 1) * 0.45;
    const body = Math.sin(2 * Math.PI * 220 * t) * 0.3 * Math.exp(-t * 30);
    const val = (noise + body) * env;
    addSample(startSample + s, val * 0.9, val * 1.0);
  }
}

// 3. Hi-Hat
function triggerHat(startTime, open = false) {
  const hatDuration = open ? 0.12 : 0.045;
  const hatSamples = Math.floor(hatDuration * sampleRate);
  const startSample = Math.floor(startTime * sampleRate);

  for (let s = 0; s < hatSamples; s++) {
    const t = s / sampleRate;
    const env = Math.exp(-t * (open ? 25 : 70));
    const noise = (Math.random() * 2 - 1) * 0.22;
    const tone = Math.sin(2 * Math.PI * 7500 * t) * 0.08;
    const val = (noise + tone) * env;
    addSample(startSample + s, val * 0.8, val * 1.1);
  }
}

// 4. Bass synth (D minor groove)
const bassNotes = [
  73.42, 73.42, 73.42, 87.31, // D2, D2, D2, F2
  73.42, 73.42, 98.00, 110.0, // D2, D2, G2, A2
  65.41, 65.41, 65.41, 73.42, // C2, C2, C2, D2
  58.27, 58.27, 65.41, 73.42  // Bb1, Bb1, C2, D2
];

function triggerBass(startTime, freq, dur = 0.18) {
  const bassSamples = Math.floor(dur * sampleRate);
  const startSample = Math.floor(startTime * sampleRate);

  for (let s = 0; s < bassSamples; s++) {
    const t = s / sampleRate;
    const env = Math.exp(-t * 9);
    // Saw-like rich tone
    let val = 0;
    val += Math.sin(2 * Math.PI * freq * t) * 0.45;
    val += Math.sin(2 * Math.PI * freq * 2 * t) * 0.22;
    val += Math.sin(2 * Math.PI * freq * 3 * t) * 0.10;
    // Saturation
    val = Math.tanh(val * 1.4) * 0.4 * env;
    addSample(startSample + s, val * 0.95, val * 0.95);
  }
}

// 5. Pluck / Arp Melody (High energy gym synth)
const arpNotes = [
  293.66, 349.23, 440.00, 523.25, 587.33, 523.25, 440.00, 349.23,
  293.66, 349.23, 440.00, 587.33, 698.46, 587.33, 440.00, 349.23
];

function triggerArp(startTime, freq, dur = 0.14) {
  const arpSamples = Math.floor(dur * sampleRate);
  const startSample = Math.floor(startTime * sampleRate);

  for (let s = 0; s < arpSamples; s++) {
    const t = s / sampleRate;
    const env = Math.exp(-t * 14);
    const val = (Math.sin(2 * Math.PI * freq * t) * 0.6 + Math.sin(2 * Math.PI * (freq * 2.01) * t) * 0.25) * env * 0.22;
    addSample(startSample + s, val * 1.1, val * 0.85);
  }
}

// Build the Track
const totalBeats = Math.floor(duration / beatSec);

for (let b = 0; b < totalBeats; b++) {
  const tBeat = b * beatSec;

  // Kick on every beat (Four on the floor)
  triggerKick(tBeat);

  // Snare/Clap on 2 and 4
  if (b % 2 === 1) {
    triggerClap(tBeat);
  }

  // Hi-hats on off-beats (8ths) and 16ths
  triggerHat(tBeat + beatSec * 0.25, false);
  triggerHat(tBeat + beatSec * 0.5, true);
  triggerHat(tBeat + beatSec * 0.75, false);

  // Bass notes (16th patterns)
  for (let step = 0; step < 4; step++) {
    const t16 = tBeat + step * sixteenthSec;
    const noteIdx = (b * 4 + step) % bassNotes.length;
    triggerBass(t16, bassNotes[noteIdx], sixteenthSec * 0.9);

    // Arpeggio comes in after beat 4 (from 2 seconds onwards)
    if (b >= 2) {
      const arpIdx = (b * 4 + step) % arpNotes.length;
      triggerArp(t16, arpNotes[arpIdx], sixteenthSec * 0.85);
    }
  }
}

// Master fade and soft limiting
for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  let masterEnv = 1.0;
  // Fade in first 0.4s
  if (t < 0.4) masterEnv = t / 0.4;
  // Fade out last 0.8s
  if (t > duration - 0.8) masterEnv = Math.max(0, (duration - t) / 0.8);

  left[i] = Math.tanh(left[i] * masterEnv * 0.95);
  right[i] = Math.tanh(right[i] * masterEnv * 0.95);
}

// Write 16-bit PCM WAV
const byteRate = sampleRate * 4;
const blockAlign = 4;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk size
buffer.writeUInt16LE(1, 20); // PCM format
buffer.writeUInt16LE(2, 22); // Stereo
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // 16 bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const sL = Math.max(-32768, Math.min(32767, Math.floor(left[i] * 32767)));
  const sR = Math.max(-32768, Math.min(32767, Math.floor(right[i] * 32767)));
  buffer.writeInt16LE(sL, offset);
  buffer.writeInt16LE(sR, offset + 2);
  offset += 4;
}

const wavPath = path.join(__dirname, '../assets/audio/bgm-beat.wav');
const mp3Path = path.join(__dirname, '../assets/audio/bgm-beat.mp3');

fs.writeFileSync(wavPath, buffer);
console.log(`Generated WAV: ${wavPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);

try {
  execSync(`ffmpeg -y -i "${wavPath}" -b:a 192k "${mp3Path}"`, { stdio: 'inherit' });
  console.log(`Converted to MP3: ${mp3Path}`);
  fs.unlinkSync(wavPath); // Clean up WAV to save space
} catch (e) {
  console.warn('ffmpeg conversion failed or not needed, keeping WAV as bgm-beat.wav');
}
