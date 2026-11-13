import os
import math
import wave
import subprocess

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

WAV_PATH = os.path.join(OUTPUT_DIR, "master-clean.wav")
MP3_PATH = os.path.join(OUTPUT_DIR, "master-mix.mp3")
BGM_MP3_PATH = os.path.join(OUTPUT_DIR, "bgm.mp3")

def generate_clean_soundtrack():
    print("--- Generando banda sonora limpia, moderna y sin distorsión (124 BPM) ---")
    sample_rate = 44100
    duration = 28.5
    total_samples = int(sample_rate * duration)
    bpm = 124.0
    beat_sec = 60.0 / bpm
    sixteenth_sec = beat_sec / 4.0

    left = [0.0] * total_samples
    right = [0.0] * total_samples

    def add_sample(i, l, r):
        if 0 <= i < total_samples:
            left[i] += l
            right[i] += r

    # 1. Clean Kick (punchy, deep 52Hz with fast decay)
    def kick(start_t):
        dur = 0.20
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 24)
            freq = 48 + 120 * math.exp(-t * 42)
            val = math.sin(2 * math.pi * freq * t) * 0.78 * env
            add_sample(start_s + s, val, val)

    # 2. Warm Finger Snap / Clean Pop
    def snap(start_t):
        dur = 0.08
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 45)
            # Dual sine for tonal woody pop
            val = (math.sin(2 * math.pi * 1850 * t) * 0.4 + math.sin(2 * math.pi * 920 * t) * 0.6) * env * 0.45
            add_sample(start_s + s, val * 0.9, val * 1.1)

    # 3. Soft Closed / Open Hi-hat (metallic sine overtone, NOT harsh white noise)
    def hihat(start_t, open_hat=False):
        dur = 0.09 if open_hat else 0.035
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * (30 if open_hat else 85))
            # Ringing high frequency metallic cluster (smooth, not harsh)
            val = (
                math.sin(2 * math.pi * 7400 * t) * 0.35 +
                math.sin(2 * math.pi * 9200 * t) * 0.35 +
                math.sin(2 * math.pi * 11500 * t) * 0.30
            ) * env * 0.22
            add_sample(start_s + s, val * 0.8, val * 1.2)

    # 4. Melodic Synth Chords (Lush Neo-Soul / Future House in G minor: Gm9, Ebmaj7, Bbmaj7, Fsus4)
    chords = [
        [196.00, 293.66, 349.23, 440.00],  # Gm9 (G3, D4, F4, A4)
        [155.56, 233.08, 293.66, 349.23],  # Ebmaj7 (Eb3, Bb3, D4, F4)
        [233.08, 293.66, 349.23, 466.16],  # Bbmaj7 (Bb3, D4, F4, Bb4)
        [174.61, 261.63, 349.23, 392.00]   # Fsus4 (F3, C4, F4, G4)
    ]

    def chord_stab(start_t, chord_idx):
        notes = chords[chord_idx % len(chords)]
        dur = 0.50
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 6.5)
            val = 0.0
            for i, f in enumerate(notes):
                # Smooth sine with gentle second harmonic for warmth
                harm = math.sin(2 * math.pi * f * t) + 0.3 * math.sin(2 * math.pi * (f * 2) * t)
                val += harm * (0.10 if i < 2 else 0.08)
            val *= env
            add_sample(start_s + s, val * 0.88, val * 1.12)

    # 5. Deep Synth Bassline
    bass_freqs = [98.00, 98.00, 116.54, 98.00, 77.78, 77.78, 87.31, 77.78, 116.54, 116.54, 130.81, 116.54, 87.31, 87.31, 98.00, 87.31]
    def bass_note(start_t, freq):
        dur = 0.18
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 14.0)
            # Fundamental + soft sub-octave
            val = (math.sin(2 * math.pi * freq * t) * 0.7 + math.sin(2 * math.pi * (freq * 0.5) * t) * 0.4) * env * 0.38
            add_sample(start_s + s, val, val)

    # 6. Gentle Notification Pop (Crisp UI Tap for push notifications in Scene 1)
    def ui_pop(start_t, pitch=1050):
        dur = 0.06
        samples = int(dur * sample_rate)
        start_s = int(start_t * sample_rate)
        for s in range(samples):
            t = s / sample_rate
            env = math.exp(-t * 60)
            val = math.sin(2 * math.pi * (pitch - 400 * t) * t) * env * 0.35
            add_sample(start_s + s, val, val)

    # 7. Soft Melodic Chime for Section Transitions (Warm sine arpeggio, NO white noise!)
    def section_chime(start_t):
        notes = [587.33, 783.99, 880.00, 1174.66]  # D5, G5, A5, D6
        for i, n in enumerate(notes):
            t_note = start_t + i * 0.04
            dur = 0.35
            samples = int(dur * sample_rate)
            start_s = int(t_note * sample_rate)
            for s in range(samples):
                t = s / sample_rate
                env = math.exp(-t * 9.0)
                val = math.sin(2 * math.pi * n * t) * env * 0.16
                add_sample(start_s + s, val * 0.9, val * 1.1)

    total_beats = int(duration / beat_sec)

    for b in range(total_beats):
        t_beat = b * beat_sec
        bar_idx = b // 4

        # Four on the floor kick
        kick(t_beat)

        # Snaps on 2 and 4
        if b % 2 == 1:
            snap(t_beat)

        # Hi-hat groove
        hihat(t_beat + beat_sec * 0.25, False)
        hihat(t_beat + beat_sec * 0.50, True)
        hihat(t_beat + beat_sec * 0.75, False)

        # Chord progression
        if b % 4 == 0 or b % 4 == 2.5:
            chord_stab(t_beat, bar_idx)

        # Bass groove (16th notes)
        for step in range(4):
            t_16 = t_beat + step * sixteenth_sec
            note_idx = (b * 4 + step) % len(bass_freqs)
            bass_note(t_16, bass_freqs[note_idx])

    # Add UI Notification Pops in Scene 1 (Hook) as each card pops in:
    # 0.4s, 0.8s, 1.2s, 1.6s, 2.0s, 2.4s
    notification_times = [0.4, 0.8, 1.2, 1.6, 2.0, 2.4]
    pitches = [880, 987, 1046, 1174, 1318, 1567]
    for t_notif, p in zip(notification_times, pitches):
        ui_pop(t_notif, pitch=p)

    # Clean melodic section chimes at scene transitions (NO NOISE / DISTORTION)
    section_chime(3.4)   # Entering Scene 2
    section_chime(7.9)   # Entering Scene 3
    section_chime(19.9)  # Entering Scene 4
    section_chime(24.4)  # Entering Scene 5

    # Master Fade out at tail (last 1.8s)
    fade_samples = int(1.8 * sample_rate)
    for s in range(fade_samples):
        idx = total_samples - fade_samples + s
        factor = (fade_samples - s) / fade_samples
        left[idx] *= factor
        right[idx] *= factor

    # Clamp and write 16-bit WAV
    max_peak = max(max(abs(x) for x in left), max(abs(x) for x in right), 0.001)
    norm = 0.88 / max_peak

    import struct
    with wave.open(WAV_PATH, "w") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        raw_bytes = bytearray()
        for i in range(total_samples):
            l_val = int(max(-32767, min(32767, left[i] * norm * 32767)))
            r_val = int(max(-32767, min(32767, right[i] * norm * 32767)))
            raw_bytes.extend(struct.pack("<hh", l_val, r_val))
        wf.writeframes(raw_bytes)

    print(f"[OK] WAV generado: {WAV_PATH}")

    # Encode to MP3 with FFmpeg
    print("--- 2. Convirtiendo a MP3 de alta fidelidad ---")
    subprocess.run([
        "ffmpeg", "-y", "-i", WAV_PATH,
        "-codec:a", "libmp3lame", "-b:a", "192k",
        MP3_PATH
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    subprocess.run([
        "ffmpeg", "-y", "-i", WAV_PATH,
        "-codec:a", "libmp3lame", "-b:a", "192k",
        BGM_MP3_PATH
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    if os.path.exists(WAV_PATH):
        os.remove(WAV_PATH)

    print(f"[OK] Master mix MP3 generado exitosamente: {MP3_PATH}")

if __name__ == "__main__":
    generate_clean_soundtrack()
