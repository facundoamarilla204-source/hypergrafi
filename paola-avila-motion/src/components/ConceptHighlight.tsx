import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_COLORS, FONT_BODY } from "../theme/brand";
import { fadeSlideUp } from "../animations/motion";

interface ConceptHighlightProps {
  label: string;
  value: string;
  delayFrames?: number;
}

/**
 * Bloque reutilizable para destacar datos clave, comparaciones o notas tecnicas
 * con la estetica editorial de Paola Avila Propiedades.
 */
export const ConceptHighlight: React.FC<ConceptHighlightProps> = ({
  label,
  value,
  delayFrames = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...fadeSlideUp(frame, fps, delayFrames, 18),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 28px",
        borderRadius: 16,
        backgroundColor: BRAND_COLORS.white,
        border: `1.5px solid ${BRAND_COLORS.hairline}`,
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 28,
          fontWeight: 600,
          color: BRAND_COLORS.graphiteMuted,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 30,
          fontWeight: 700,
          color: BRAND_COLORS.red,
        }}
      >
        {value}
      </span>
    </div>
  );
};

