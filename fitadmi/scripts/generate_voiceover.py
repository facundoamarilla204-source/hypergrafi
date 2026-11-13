import asyncio
import os
import subprocess
import edge_tts

VOICEOVER_LINES = [
    {
        "id": "vo-01-planes",
        "text": "Paso 1. Creá tus planes y agregá a tus entrenadores. Configurá tus membresías, precios y duración en pocos minutos.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+4%"
    },
    {
        "id": "vo-02-clientes",
        "text": "Paso 2. Cargá tus clientes. Registrá a tus socios y asignales sus planes para mantener toda su información organizada.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+4%"
    },
    {
        "id": "vo-03-stock",
        "text": "Paso 3. Gestioná tus productos y el stock. Cargá agua, suplementos, bebidas y todo lo que vendas en tu gimnasio para controlar las existencias.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+4%"
    },
    {
        "id": "vo-04-caja",
        "text": "Paso 4. Controlá tu caja. Registrá los cobros de membresías, las ventas y los movimientos de dinero desde un solo lugar.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+4%"
    },
    {
        "id": "vo-05-organizado",
        "text": "Paso 5. ¡Listo! Empezá a trabajar con todo organizado. Controlá la asistencia, gestioná tus clases y consultá la información de tu gimnasio desde un solo panel.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+4%"
    },
    {
        "id": "vo-06-cierre",
        "text": "Con FitAdmi, digitalizar tu gimnasio es más fácil de lo que pensás. Empezá hoy y probalo gratis durante 7 días.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+4%"
    }
]

output_dir = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(output_dir, exist_ok=True)

async def generate():
    print("=== Generando locución femenina natural con Edge TTS (Elena Neural) ===")
    results = []
    
    for item in VOICEOVER_LINES:
        raw_path = os.path.join(output_dir, f"{item['id']}-raw.mp3")
        clean_path = os.path.join(output_dir, f"{item['id']}.mp3")
        
        # 1. Generate speech via Edge TTS
        comm = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"])
        await comm.save(raw_path)
        
        # 2. Trim silence with FFmpeg, clamp internal pauses to 200ms, and normalize to broadcast loudnorm
        cmd = [
            "ffmpeg", "-y", "-i", raw_path,
            "-af", "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-40dB,areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-40dB,silenceremove=stop_periods=-1:stop_duration=0.20:stop_threshold=-35dB,loudnorm=I=-16:TP=-1.5:LRA=11",
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
        
    print("\nTodos los clips de voz femenina fueron generados exitosamente.")
    return results

if __name__ == "__main__":
    asyncio.run(generate())
