import { VIDEO_CONFIG } from "../../theme/brand";

export interface EpisodeSegment {
  id: string;
  label: string;
  durationSec: number;
  narration: string;
  captionLines: {
    text: string;
    highlightWords?: string[];
  };
}

/**
 * Configuracion central de tiempos del Episodio 01,
 * sincronizada con las pausas reales de public/audio/ep01-voz.mp3 (51.72s).
 */
export const EPISODE_01_SEGMENTS: EpisodeSegment[] = [
  {
    id: "01-hook",
    label: "Gancho",
    durationSec: 5.8,
    narration:
      "¿Sabías que firmar un boleto de compraventa no significa que ya seas dueño de una propiedad?",
    captionLines: {
      text: "Firmar un boleto no te hace dueño todavía",
      highlightWords: ["boleto", "dueño"],
    },
  },
  {
    id: "02-boleto-def",
    label: "Qué es el boleto",
    durationSec: 11.2,
    narration:
      "Te explicamos la diferencia. El boleto de compraventa es un contrato donde comprador y vendedor acuerdan el precio, la forma de pago, los plazos y las condiciones de la operación.",
    captionLines: {
      text: "Es un contrato que fija precio, pago, plazos y condiciones",
      highlightWords: ["contrato", "precio", "plazos"],
    },
  },
  {
    id: "03-boleto-uso",
    label: "Para qué sirve el boleto",
    durationSec: 10.8,
    narration:
      "Sirve para dejar establecidos los compromisos de ambas partes, como pagar el precio y otorgar la escritura. Pero el boleto, por sí solo, no transfiere la propiedad.",
    captionLines: {
      text: "Establece compromisos, pero no transfiere el dominio",
      highlightWords: ["compromisos", "no", "transfiere"],
    },
  },
  {
    id: "04-escritura-def",
    label: "Qué es la escritura pública",
    durationSec: 6.7,
    narration:
      "La escritura pública se firma ante un escribano, quien verifica la documentación y la situación legal del inmueble.",
    captionLines: {
      text: "Se firma ante escribano, verificando la situación legal",
      highlightWords: ["escribano", "situación", "legal"],
    },
  },
  {
    id: "05-escritura-uso",
    label: "Función de la escritura",
    durationSec: 6.2,
    narration:
      "Es el instrumento necesario para formalizar la transmisión del dominio, junto con los demás requisitos legales.",
    captionLines: {
      text: "Formaliza la transmisión del dominio junto a los requisitos legales",
      highlightWords: ["Formaliza", "dominio"],
    },
  },
  {
    id: "06-comparacion",
    label: "Comparación y conclusión",
    durationSec: 7.0,
    narration:
      "Recordá: el boleto establece compromisos; la escritura permite concretar la transferencia de propiedad.",
    captionLines: {
      text: "Boleto: compromisos · Escritura: transferencia de propiedad",
      highlightWords: ["compromisos", "transferencia"],
    },
  },
  {
    id: "07-cierre",
    label: "Cierre institucional",
    durationSec: 4.8,
    narration: "En Paola Avila Propiedades, te acompañamos en cada paso.",
    captionLines: {
      text: "Te acompañamos en cada paso",
      highlightWords: ["acompañamos"],
    },
  },
];

export const EPISODE_01_OVERLAP_FRAMES = 8;

export const getSegmentTiming = () => {
  const fps = VIDEO_CONFIG.fps;
  let cursor = 0;

  return EPISODE_01_SEGMENTS.map((seg) => {
    const durationInFrames = Math.round(seg.durationSec * fps);
    const from = cursor;
    cursor += durationInFrames;
    return {
      ...seg,
      from,
      durationInFrames,
    };
  });
};

export const getEpisode01TotalFrames = () => {
  const timings = getSegmentTiming();
  const last = timings[timings.length - 1];
  return last.from + last.durationInFrames;
};

/**
 * Canales de audio del Episodio 01 con voz en off real integrada.
 */
export const EPISODE_01_AUDIO = {
  voiceoverSrc: "audio/ep01-voz.mp3",
  musicSrc: "audio/ambient-corporate.wav",
  musicVolume: 0.05,
  sfx: {
    tick: "audio/sfx-tick.wav",
    whoosh: "audio/sfx-whoosh.wav",
    seal: "audio/sfx-seal.wav",
    volume: 0.18,
  },
} as const;
