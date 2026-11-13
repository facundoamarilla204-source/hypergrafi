import os
import subprocess
import math
import struct
import wave

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

TOTAL_DURATION = 44.0

def synthesize_bgm():
    print(f"--- Sintetizando pista musical instrumental limpia (124 BPM, {TOTAL_DURATION}s, SIN VOZ) ---")
    sample_rate = 44100
    total_samples = int(sample_rate * TOTAL_DURATION)
    bpm = 124.0
    beat_sec = 60.0 / bpm
    sixteenth_sec = beat_sec / 4.0

    left = [0.0] * total_samples
    right = [0.0] * total_samples

    def add_sample(i, l, r):
        if 0 <= i < total_samples:
            left[i] += l
            right[i] += r

    def kick(start_t):
        dur = 0.20
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 24)
            freq = 48 + 120 * math.exp(-t * 40)
            val = math.sin(2 * math.pi * freq * t) * 0.80 * env
            add_sample(start_s + s, val, val)

    def snap(start_t):
        dur = 0.09
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 42)
            tone = (math.sin(2 * math.pi * 1200 * t) * 0.38 +
                    math.sin(2 * math.pi * 2400 * t) * 0.22) * env
            add_sample(start_s + s, tone * 0.9, tone * 1.05)

    def hat(start_t, open_hat=False):
        dur = 0.08 if open_hat else 0.035
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        import random
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * (30 if open_hat else 80))
            noise = (random.random() * 2 - 1) * 0.20
            val = noise * env
            add_sample(start_s + s, val * 0.8, val * 1.1)

    bass_freqs = [
        73.42, 73.42, 87.31, 73.42,   # D2, D2, F2, D2
        65.41, 65.41, 73.42, 65.41,   # C2, C2, D2, C2
        58.27, 58.27, 65.41, 73.42,   # Bb1, Bb1, C2, D2
        87.31, 98.00, 110.0, 73.42    # F2, G2, A2, D2
    ]

    def bass(start_t, freq):
        dur = 0.15
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 12)
            val = (math.sin(2 * math.pi * freq * t) * 0.45 +
                   math.sin(4 * math.pi * freq * t) * 0.20) * env
            val = math.tanh(val * 1.2) * 0.34
            add_sample(start_s + s, val, val)

    chords = [
        [293.66, 349.23, 440.00, 523.25], # Dm7
        [349.23, 440.00, 523.25, 659.25], # Fmaj7
        [233.08, 293.66, 349.23, 440.00], # Bbmaj7
        [261.63, 329.63, 392.00, 587.33]  # Cadd9
    ]

    def chord_stab(start_t, chord_idx):
        notes = chords[chord_idx % len(chords)]
        dur = 0.38
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 9.0)
            val = 0.0
            for i, f in enumerate(notes):
                val += math.sin(2 * math.pi * f * t) * (0.09 if i < 2 else 0.06)
            val *= env
            add_sample(start_s + s, val * 0.9, val * 1.1)

    def chime(start_t):
        freqs = [1046.5, 1318.5, 1568.0, 2093.0]
        for idx, f in enumerate(freqs):
            t_note = start_t + idx * 0.06
            dur = 0.35
            samples = int(dur * sample_rate)
            start_s = int(t_note * sample_rate)
            for s in range(samples):
                t = s / sample_rate
                env = math.exp(-t * 8.0)
                val = math.sin(2 * math.pi * f * t) * 0.08 * env
                add_sample(start_s + s, val, val)

    total_beats = int(TOTAL_DURATION / beat_sec)

    for b in range(total_beats):
        t_beat = b * beat_sec
        bar_idx = b // 4

        if b >= 8:
            if b % 2 == 0:
                kick(t_beat)
        else:
            if b % 4 == 0 or b % 4 == 2:
                kick(t_beat)

        if b % 2 == 1:
            snap(t_beat)

        hat(t_beat)
        hat(t_beat + sixteenth_sec * 2, open_hat=(b % 2 == 1))

        if b % 4 == 0 or b % 4 == 2.5:
            chord_stab(t_beat, bar_idx)

        for step in range(4):
            t_16 = t_beat + step * sixteenth_sec
            note_idx = (b * 4 + step) % len(bass_freqs)
            bass(t_16, bass_freqs[note_idx])

    # Section chimes aligned with transitions
    chime(4.7)
    chime(9.9)
    chime(19.1)
    chime(25.6)
    chime(33.8)
    chime(38.6)

    # Master Fade out at tail (last 1.8s)
    fade_samples = int(1.8 * sample_rate)
    for s in range(fade_samples):
        idx = total_samples - fade_samples + s
        factor = (fade_samples - s) / fade_samples
        left[idx] *= factor
        right[idx] *= factor

    wav_path = os.path.join(OUTPUT_DIR, "bgm_raw.wav")
    with wave.open(wav_path, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        packed_data = bytearray()
        for i in range(total_samples):
            l = max(-1.0, min(1.0, left[i]))
            r = max(-1.0, min(1.0, right[i]))
            packed_data.extend(struct.pack("<hh", int(l * 32767 * 0.85), int(r * 32767 * 0.85)))
        wf.writeframes(packed_data)

    bgm_mp3 = os.path.join(OUTPUT_DIR, "bgm.mp3")
    master_mp3 = os.path.join(OUTPUT_DIR, "master-mix.mp3")

    for target in (bgm_mp3, master_mp3):
        cmd = [
            "ffmpeg", "-y", "-i", wav_path,
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=10",
            "-b:a", "192k",
            target
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    if os.path.exists(wav_path):
        os.remove(wav_path)

    # Remove old voiceover files so there is zero TTS voice
    for fname in os.listdir(OUTPUT_DIR):
        if fname.startswith("vo-") and fname.endswith(".mp3"):
            try:
                os.remove(os.path.join(OUTPUT_DIR, fname))
            except OSError:
                pass

    print("Audio instrumental limpio (sin voz) listo en:", master_mp3)

if __name__ == "__main__":
    synthesize_bgm()
