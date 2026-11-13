import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND_COLORS } from "../theme/brand";
import { CONTINUITY_EASE } from "../animations/motion";

interface ContinuityWipeProps {
  startFrame: number;
  durationFrames?: number;
  color?: string;
}

/**
 * Transicion reutilizable de continuidad: una linea roja arquitectonica
 * se expande y barre brevemente la escena para dar paso a la siguiente.
 */
export const ContinuityWipe: React.FC<ContinuityWipeProps> = ({
  startFrame,
  durationFrames = 16,
  color = BRAND_COLORS.red,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  if (local < 0 || local > durationFrames) {
    return null;
  }

  const mid = durationFrames * 0.45;
  const scaleX = interpolate(local, [0, mid, durationFrames], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CONTINUITY_EASE,
  });

  const origin = local <= mid ? "left" : "right";

  return (
    <AbsoluteFill style={{ pointerEvents: "none", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          height: 6,
          backgroundColor: color,
          transform: `scaleX(${scaleX})`,
          transformOrigin: origin,
        }}
      />
    </AbsoluteFill>
  );
};

