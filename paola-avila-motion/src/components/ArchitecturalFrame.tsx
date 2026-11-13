import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BRAND_ASSETS, BRAND_COLORS, SAFE_AREA } from "../theme/brand";

export type BackgroundTone = "ivory" | "white" | "graphite";
export type WatermarkPosition = "bottom-right" | "top-left" | "none";

interface ArchitecturalFrameProps {
  tone?: BackgroundTone;
  watermark?: WatermarkPosition;
  watermarkOpacity?: number;
  watermarkTransform?: string;
  showRegistrationMarks?: boolean;
  opacity?: number;
  translateY?: number;
  children: React.ReactNode;
}

const TONE_BG: Record<BackgroundTone, string> = {
  ivory: BRAND_COLORS.ivory,
  white: BRAND_COLORS.white,
  graphite: BRAND_COLORS.graphite,
};

/**
 * Contenedor maestro 9:16 con zonas seguras de Instagram,
 * marca de agua institucional adaptable y marcas de registro arquitectonicas.
 */
export const ArchitecturalFrame: React.FC<ArchitecturalFrameProps> = ({
  tone = "ivory",
  watermark = "none",
  watermarkOpacity = 0.05,
  watermarkTransform,
  showRegistrationMarks = true,
  opacity = 1,
  translateY = 0,
  children,
}) => {
  const hairlineColor =
    tone === "graphite" ? BRAND_COLORS.hairlineLight : BRAND_COLORS.hairline;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: TONE_BG[tone],
        opacity,
        transform: `translateY(${translateY}px)`,
        paddingTop: SAFE_AREA.top,
        paddingBottom: SAFE_AREA.bottom,
        paddingLeft: SAFE_AREA.left,
        paddingRight: SAFE_AREA.right,
        justifyContent: "space-between",
      }}
    >
      {/* Marca de agua institucional */}
      {watermark === "bottom-right" && (
        <Img
          src={staticFile(BRAND_ASSETS.isotipo)}
          style={{
            position: "absolute",
            right: -120,
            bottom: 360,
            width: 680,
            opacity: watermarkOpacity,
            pointerEvents: "none",
            scale: 3.053,
            translate: "252.4px -57.5px",
            transform: watermarkTransform,
          }}
        />
      )}

      {watermark === "top-left" && (
        <Img
          src={staticFile(BRAND_ASSETS.isotipo)}
          style={{
            position: "absolute",
            left: -130,
            top: 180,
            width: 540,
            opacity: watermarkOpacity,
            pointerEvents: "none",
            transform: watermarkTransform,
          }}
        />
      )}

      {/* Marcas de registro arquitectonicas sutiles para dar estructura al formato vertical */}
      {showRegistrationMarks && (
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          fill="none"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {/* Eje vertical sutil izquierdo */}
          <line
            x1="52"
            y1={SAFE_AREA.top}
            x2="52"
            y2={1920 - SAFE_AREA.bottom}
            stroke={hairlineColor}
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Esquinas de registro */}
          <path
            d={`M42 ${SAFE_AREA.top} H62 M52 ${SAFE_AREA.top - 10} V${SAFE_AREA.top + 10}`}
            stroke={BRAND_COLORS.red}
            strokeWidth="1.5"
            opacity="0.45"
          />
          <path
            d={`M42 ${1920 - SAFE_AREA.bottom} H62 M52 ${1920 - SAFE_AREA.bottom - 10} V${1920 - SAFE_AREA.bottom + 10}`}
            stroke={BRAND_COLORS.red}
            strokeWidth="1.5"
            opacity="0.45"
          />
        </svg>
      )}

      {children}
    </AbsoluteFill>
  );
};

