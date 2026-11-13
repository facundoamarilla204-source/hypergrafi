import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND_ASSETS, BRAND_COLORS, FONT_BODY } from "../theme/brand";
import { EDITORIAL_EASE, scaleReveal } from "../animations/motion";

interface BrandOutroProps {
  tagline?: string;
}

/**
 * Cierre institucional breve (~2 segundos) sobre fondo grafito
 * con entrada elegante del logo oficial y despliegue de la linea roja.
 */
export const BrandOutro: React.FC<BrandOutroProps> = ({
  tagline = "Buenos Aires · Asesoramiento Inmobiliario",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineScaleX = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.graphite,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          ...scaleReveal(frame, fps, 2, 0.94),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Img
          src={staticFile(BRAND_ASSETS.logoDarkBg)}
          style={{
            width: 580,
            height: "auto",
          }}
        />
        <div
          style={{
            width: 120,
            height: 3.5,
            backgroundColor: BRAND_COLORS.red,
            borderRadius: 2,
            transform: `scaleX(${lineScaleX})`,
            transformOrigin: "center",
          }}
        />
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: BRAND_COLORS.ivory,
            opacity: 0.9,
          }}
        >
          {tagline}
        </span>
      </div>
    </AbsoluteFill>
  );
};

