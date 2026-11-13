import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_COLORS, FONT_BODY, FONT_DISPLAY } from "../../theme/brand";
import { drawStroke, EDITORIAL_EASE } from "../../animations/motion";

/**
 * Escena 05: Escritura conectada con el inmueble y los requisitos legales
 * (tradicion / inscripcion) para formalizar la transmision del dominio.
 */
export const DomainTransferGraphic: React.FC<{ startFrame?: number }> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const badgeSpring = spring({
    frame: Math.max(0, local - 42),
    fps,
    config: { damping: 20, stiffness: 130 },
  });

  return (
    <svg width="880" height="620" viewBox="0 0 880 620" fill="none">
      <rect
        x="20"
        y="20"
        width="840"
        height="580"
        rx="26"
        fill={BRAND_COLORS.ivory}
        stroke={BRAND_COLORS.hairline}
        strokeWidth="1.5"
      />

      {/* Bloque izquierdo: Escritura + Requisitos legales */}
      <g transform="translate(64, 120)">
        <rect
          x="0"
          y="0"
          width="300"
          height="230"
          rx="18"
          fill={BRAND_COLORS.white}
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3.5"
        />
        <text
          x="28"
          y="54"
          fill={BRAND_COLORS.red}
          fontSize="21"
          fontFamily={FONT_BODY}
          fontWeight="700"
          letterSpacing="0.08em"
        >
          ESCRITURA PÚBLICA
        </text>
        <line
          x1="28"
          y1="74"
          x2="272"
          y2="74"
          stroke={BRAND_COLORS.hairline}
          strokeWidth="2"
        />
        <text
          x="28"
          y="124"
          fill={BRAND_COLORS.graphite}
          fontSize="25"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          + Requisitos legales
        </text>
        <text
          x="28"
          y="162"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="22"
          fontFamily={FONT_BODY}
        >
          (tradición e inscripción)
        </text>
      </g>

      {/* Conector de transmision */}
      <path
        d="M376 235H486"
        stroke={BRAND_COLORS.red}
        strokeWidth="4.5"
        strokeLinecap="round"
        {...drawStroke(frame, startFrame + 14, 18, 120)}
      />
      <circle cx="486" cy="235" r="7" fill={BRAND_COLORS.red} />

      {/* Bloque derecho: Casa reconstruida con trazos arquitectonicos */}
      <g transform="translate(510, 96)">
        <line
          x1="0"
          y1="255"
          x2="300"
          y2="255"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="4"
          strokeLinecap="round"
          {...drawStroke(frame, startFrame + 8, 16, 300)}
        />
        <path
          d="M28 255V120L150 32L272 120V255"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawStroke(frame, startFrame + 16, 24, 620)}
        />
        <path
          d="M12 132L150 28L288 132"
          stroke={BRAND_COLORS.red}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawStroke(frame, startFrame + 22, 22, 360)}
        />
        <rect
          x="120"
          y="166"
          width="60"
          height="89"
          rx="4"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3"
          {...drawStroke(frame, startFrame + 28, 16, 300)}
        />
      </g>

      {/* Pie de formalizacion */}
      <g transform="translate(150, 445)" opacity={badgeSpring}>
        <rect
          x="0"
          y="0"
          width="580"
          height="88"
          rx="44"
          fill={BRAND_COLORS.white}
          stroke={BRAND_COLORS.red}
          strokeWidth="2.5"
        />
        <text
          x="290"
          y="54"
          textAnchor="middle"
          fill={BRAND_COLORS.graphite}
          fontSize="28"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          Transmisión formal del dominio
        </text>
      </g>
    </svg>
  );
};

/**
 * Escena 06: Comparacion lado a lado clara incluso sin sonido.
 */
export const ComparisonDocumentsGraphic: React.FC<{ startFrame?: number }> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const leftScale = interpolate(
    spring({
      frame: local,
      fps,
      config: { damping: 22, stiffness: 120 },
    }),
    [0, 1],
    [0.94, 1]
  );

  const rightScale = interpolate(
    spring({
      frame: Math.max(0, local - 24),
      fps,
      config: { damping: 22, stiffness: 120 },
    }),
    [0, 1],
    [0.94, 1]
  );

  const rightHighlight = interpolate(local, [28, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  return (
    <svg width="900" height="580" viewBox="0 0 900 580" fill="none">
      {/* IZQUIERDA: BOLETO */}
      <g transform={`translate(20, 40) scale(${leftScale})`}>
        <rect
          x="0"
          y="0"
          width="405"
          height="490"
          rx="24"
          fill={BRAND_COLORS.white}
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3"
        />
        <rect
          x="32"
          y="36"
          width="110"
          height="8"
          rx="4"
          fill={BRAND_COLORS.graphiteMuted}
        />
        <text
          x="32"
          y="108"
          fill={BRAND_COLORS.graphite}
          fontSize="44"
          fontFamily={FONT_DISPLAY}
          fontWeight="600"
        >
          BOLETO
        </text>
        <line
          x1="32"
          y1="138"
          x2="372"
          y2="138"
          stroke={BRAND_COLORS.hairline}
          strokeWidth="2"
        />
        <text
          x="32"
          y="214"
          fill={BRAND_COLORS.graphite}
          fontSize="32"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          Acuerdo y
        </text>
        <text
          x="32"
          y="256"
          fill={BRAND_COLORS.graphite}
          fontSize="32"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          obligaciones
        </text>
        <text
          x="32"
          y="330"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="24"
          fontFamily={FONT_BODY}
        >
          Contrato privado entre
        </text>
        <text
          x="32"
          y="364"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="24"
          fontFamily={FONT_BODY}
        >
          comprador y vendedor.
        </text>
      </g>

      {/* DERECHA: ESCRITURA */}
      <g transform={`translate(475, 40) scale(${rightScale})`}>
        <rect
          x="0"
          y="0"
          width="405"
          height="490"
          rx="24"
          fill={BRAND_COLORS.ivory}
          stroke={rightHighlight > 0.3 ? BRAND_COLORS.red : BRAND_COLORS.graphite}
          strokeWidth="3.5"
        />
        <rect
          x="32"
          y="36"
          width="110"
          height="8"
          rx="4"
          fill={BRAND_COLORS.red}
        />
        <text
          x="32"
          y="108"
          fill={BRAND_COLORS.red}
          fontSize="44"
          fontFamily={FONT_DISPLAY}
          fontWeight="600"
        >
          ESCRITURA
        </text>
        <line
          x1="32"
          y1="138"
          x2="372"
          y2="138"
          stroke={BRAND_COLORS.hairline}
          strokeWidth="2"
        />
        <text
          x="32"
          y="214"
          fill={BRAND_COLORS.graphite}
          fontSize="32"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          Formalización de
        </text>
        <text
          x="32"
          y="256"
          fill={BRAND_COLORS.graphite}
          fontSize="32"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          la transferencia
        </text>
        <text
          x="32"
          y="330"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="24"
          fontFamily={FONT_BODY}
        >
          Instrumento público ante
        </text>
        <text
          x="32"
          y="364"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="24"
          fontFamily={FONT_BODY}
        >
          escribano autorizante.
        </text>
      </g>
    </svg>
  );
};

