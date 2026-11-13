import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";

export const { fontFamily: FONT_DISPLAY } = loadNewsreader("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const { fontFamily: FONT_BODY } = loadManrope("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

/**
 * Zonas seguras para Instagram Reels (evita solapamiento con UI superior/inferior y botones laterales).
 */
export const SAFE_AREA = {
  top: 220,
  bottom: 360,
  left: 84,
  right: 120,
} as const;

/**
 * Paleta institucional de Paola Avila Propiedades.
 * Nota: Valores extraidos visualmente de public/brand y capturas de Instagram;
 * actualizar aqui cuando se confirmen los codigos HEX oficiales.
 */
export const BRAND_COLORS = {
  red: "#E2231A",
  redSoft: "rgba(226, 35, 26, 0.12)",
  ivory: "#FAF7F2",
  white: "#FFFFFF",
  graphite: "#1E1E1E",
  graphiteMuted: "#5A5753",
  hairline: "rgba(30, 30, 30, 0.12)",
  hairlineLight: "rgba(255, 255, 255, 0.18)",
} as const;

export const BRAND_ASSETS = {
  isotipo: "brand/isotipo.png",
  logoMain: "brand/logo1.png",
  logoDarkBg: "brand/logo2.png",
  logoMonoDark: "brand/logo3.png",
  logoMonoLight: "brand/logo4.png",
  logoHorizontal: "brand/logohorizontal.png",
} as const;

