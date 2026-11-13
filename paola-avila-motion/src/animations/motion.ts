import { Easing, interpolate, spring } from "remotion";

/** Desaceleracion organica para entradas editoriales */
export const EDITORIAL_EASE = Easing.bezier(0.22, 1, 0.36, 1);

/** Curva simetrica para desplazamientos continuos y transiciones entre escenas */
export const CONTINUITY_EASE = Easing.bezier(0.65, 0, 0.35, 1);

export const fadeSlideUp = (
  frame: number,
  fps: number,
  delayFrames = 0,
  distance = 28
) => {
  const progress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 24, stiffness: 130, mass: 0.9 },
  });

  return {
    opacity: interpolate(progress, [0, 0.55, 1], [0, 0.9, 1], {
      extrapolateRight: "clamp",
    }),
    transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
  };
};

/** Revelado por escala sutil (nunca desde 0 para mantener fisicalidad natural) */
export const scaleReveal = (
  frame: number,
  fps: number,
  delayFrames = 0,
  fromScale = 0.94
) => {
  const progress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 22, stiffness: 140, mass: 0.85 },
  });

  return {
    opacity: interpolate(progress, [0, 0.5, 1], [0, 0.85, 1], {
      extrapolateRight: "clamp",
    }),
    transform: `scale(${interpolate(progress, [0, 1], [fromScale, 1])})`,
  };
};

export const drawStroke = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  pathLength: number
) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EDITORIAL_EASE,
    }
  );

  return {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength * (1 - progress),
  };
};

/** Movimiento sutil de camara para dar profundidad organica sin marear */
export const cameraDrift = (
  frame: number,
  durationFrames: number,
  fromScale = 1,
  toScale = 1.025
) => {
  const scale = interpolate(frame, [0, durationFrames], [fromScale, toScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CONTINUITY_EASE,
  });
  return `scale(${scale})`;
};
