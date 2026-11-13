import asyncio
import os
import subprocess
import edge_tts

VOICEOVER_LINES = [
    {
        "id": "vo-01-hook",
        "text": "¿Digitalizar tu gimnasio en cinco minutos? Mirá cómo queda listo.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    },
    {
        "id": "vo-02-planes",
        "text": "Paso uno: creás tus planes de membresía y sumás a tus entrenadores.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    },
    {
        "id": "vo-03-clientes",
        "text": "Paso dos: cargás tus clientes, completás sus datos y asignás el plan.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    },
    {
        "id": "vo-04-stock",
        "text": "Paso tres: gestionás tus productos y controlás el stock de bebidas y suplementos.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    },
    {
        "id": "vo-05-caja",
        "text": "Paso cuatro: controlás tu caja, cobros de membresías y ventas en un solo lugar.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    },
    {
        "id": "vo-06-organizado",
        "text": "Paso cinco: ¡listo! Asistencia por DNI, clases y control total desde un solo panel.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    },
    {
        "id": "vo-07-cta",
        "text": "¡Desafío completado! Con FitAdmi es fácil. Entrá y probalo gratis siete días.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+12%"
    }
]

output_dir = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(output_dir, exist_ok=True)

async def generate():
    print("=== Generando locución para fitadmi-desafio con Elena Neural ===")
    results = []
    
    for item in VOICEOVER_LINES:
        raw_path = os.path.join(output_dir, f"{item['id']}-raw.mp3")
        clean_path = os.path.join(output_dir, f"{item['id']}.mp3")
        
        # 1. Generate speech via Edge TTS
        comm = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"])
        await comm.save(raw_path)
        
        # 2. Trim silence with FFmpeg, clamp internal pauses to 180ms, and normalize to broadcast loudnorm
        cmd = [
            "ffmpeg", "-y", "-i", raw_path,
            "-af", "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-40dB,areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-40dB,silenceremove=stop_periods=-1:stop_duration=0.18:stop_threshold=-35dB,loudnorm=I=-16:TP=-1.5:LRA=11",
            clean_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        if os.path.exists(raw_path):
            os.remove(raw_path)
            
        # 3. Get clean duration
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", clean_path],
            capture_output=True, text=True, check=True
        )
        dur = float(probe.stdout.strip())
        results.append({**item, "duration": dur, "file": f"assets/audio/{item['id']}.mp3"})
        print(f"[{item['id']}] {dur:.2f}s -> \"{item['text'][:45]}...\"")
        
    print("\nTodos los clips de voz fueron generados exitosamente.")
    return results

if __name__ == "__main__":
    asyncio.run(generate())
