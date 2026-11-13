import asyncio
import os
import subprocess
import edge_tts

# Locución con español rioplatense natural (Elena Neural)
VOICEOVER_LINES = [
    {
        "id": "vo-01-hook",
        "text": "No todos los negocios necesitan el mismo tipo de software. Te explico la diferencia en treinta segundos.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+5%"
    },
    {
        "id": "vo-02-web",
        "text": "Una página web es tu vidriera digital. Presenta tu marca, posiciona en Google y convierte visitas en consultas.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+5%"
    },
    {
        "id": "vo-03-webapp",
        "text": "Una aplicación web es para operar por dentro: paneles de control, usuarios y datos. Ideal para jubilar tus planillas de Excel.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+5%"
    },
    {
        "id": "vo-04-saas",
        "text": "Y un SaaS es un producto completo: tus clientes acceden con sus cuentas y pagan una suscripción automática mes a mes.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+5%"
    },
    {
        "id": "vo-05-cta",
        "text": "En PlayComún entendemos tu negocio antes de tocar una línea de código. Hablemos en playcomun punto com.",
        "voice": "es-AR-ElenaNeural",
        "rate": "+5%"
    }
]

output_dir = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(output_dir, exist_ok=True)

async def generate():
    print("=== Generando locución para PlaycomunWeb: ¿Qué necesita tu negocio? ===")
    results = []
    
    for item in VOICEOVER_LINES:
        raw_path = os.path.join(output_dir, f"{item['id']}-raw.mp3")
        clean_path = os.path.join(output_dir, f"{item['id']}.mp3")
        
        # 1. Generate speech via Edge TTS
        comm = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"])
        await comm.save(raw_path)
        
        # 2. Trim silence with FFmpeg and normalize
        cmd = [
            "ffmpeg", "-y", "-i", raw_path,
            "-af", "areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-40dB,areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-40dB,silenceremove=stop_periods=-1:stop_duration=0.18:stop_threshold=-35dB,loudnorm=I=-16:TP=-1.5:LRA=11",
            clean_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        if os.path.exists(raw_path):
            os.remove(raw_path)
            
        # 3. Probe clean duration
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", clean_path],
            capture_output=True, text=True, check=True
        )
        dur = float(probe.stdout.strip())
        results.append({**item, "duration": dur, "file": f"assets/audio/{item['id']}.mp3"})
        print(f"[{item['id']}] {dur:.2f}s -> \"{item['text']}\"")
        
    print("\nLocución generada exitosamente.")
    return results

if __name__ == "__main__":
    asyncio.run(generate())
