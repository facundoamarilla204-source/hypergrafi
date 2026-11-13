import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_COLORS, FONT_BODY } from "../theme/brand";
import { drawStroke, EDITORIAL_EASE } from "../animations/motion";

interface HouseBlueprintIconProps {
  startFrame?: number;
  width?: number;
  height?: number;
}

const DOC_FIELDS = [
  { label: "Titularidad", highlightStart: 46 },
  { label: "Planos aprobados", highlightStart: 66 },
  { label: "Libre de deudas", highlightStart: 86 },
] as const;

/**
 * Ilustracion arquitectonica de autor:
 * Volumen principal con doble cubierta geometrica, lineas de cota reales,
 * nodos estructurales y documento que se despliega verticalmente conectado al plano.
 */
export const HouseBlueprintIcon: React.FC<HouseBlueprintIconProps> = ({
  startFrame = 0,
  width = 910,
  height = 660,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - startFrame);

  const gridOpacity = interpolate(localFrame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  // Despliegue vertical del documento desde su cabecera superior
  const docUnfold = interpolate(localFrame, [22, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  const docHeaderOpacity = interpolate(localFrame, [18, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 910 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lamina tecnica marfil con borde sutil */}
      <rect
        x="10"
        y="10"
        width="890"
        height="640"
        rx="28"
        fill={BRAND_COLORS.ivory}
        stroke={BRAND_COLORS.hairline}
        strokeWidth="1.5"
        opacity={gridOpacity}
      />

      {/* Grilla arquitectonica ortogonal */}
      <line
        x1="46"
        y1="528"
        x2="864"
        y2="528"
        stroke={BRAND_COLORS.hairline}
        strokeWidth="1.5"
        strokeDasharray="6 6"
        opacity={gridOpacity}
      />
      <line
        x1="418"
        y1="48"
        x2="418"
        y2="578"
        stroke={BRAND_COLORS.hairline}
        strokeWidth="1.5"
        strokeDasharray="6 6"
        opacity={gridOpacity}
      />

      {/* VOLUMEN ARQUITECTONICO (IZQUIERDA) */}
      <g transform="translate(52, 118)">
        {/* Cota superior de ancho */}
        <g opacity={gridOpacity}>
          <line
            x1="20"
            y1="14"
            x2="310"
            y2="14"
            stroke={BRAND_COLORS.graphiteMuted}
            strokeWidth="1.5"
            {...drawStroke(frame, startFrame + 4, 16, 300)}
          />
          <line x1="20" y1="6" x2="20" y2="22" stroke={BRAND_COLORS.graphiteMuted} strokeWidth="1.5" />
          <line x1="310" y1="6" x2="310" y2="22" stroke={BRAND_COLORS.graphiteMuted} strokeWidth="1.5" />
          <text
            x="165"
            y="6"
            textAnchor="middle"
            fill={BRAND_COLORS.graphiteMuted}
            fontSize="20"
            fontFamily={FONT_BODY}
            fontWeight="600"
          >
            8.60 m
          </text>
        </g>

        {/* Linea de tierra */}
        <line
          x1="4"
          y1="342"
          x2="328"
          y2="342"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="4"
          strokeLinecap="round"
          {...drawStroke(frame, startFrame + 2, 16, 330)}
        />

        {/* Volumen principal (doble modulo geometrico) */}
        <path
          d="M28 342V176L122 96L216 176V342"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawStroke(frame, startFrame + 6, 22, 620)}
        />
        <path
          d="M168 136L238 78L308 136V342"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawStroke(frame, startFrame + 10, 20, 440)}
        />

        {/* Cubierta acentuada en rojo institucional */}
        <path
          d="M12 188L122 92L190 150M168 136L238 76L320 144"
          stroke={BRAND_COLORS.red}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawStroke(frame, startFrame + 14, 22, 460)}
        />

        {/* Abertura principal y vano lateral */}
        <rect
          x="96"
          y="236"
          width="52"
          height="106"
          rx="3"
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3"
          {...drawStroke(frame, startFrame + 18, 16, 320)}
        />
        <rect
          x="232"
          y="186"
          width="42"
          height="64"
          rx="3"
          stroke={BRAND_COLORS.red}
          strokeWidth="2.5"
          {...drawStroke(frame, startFrame + 22, 14, 220)}
        />

        {/* Nodos de vertice */}
        <circle cx="122" cy="92" r="5" fill={BRAND_COLORS.red} opacity={gridOpacity} />
        <circle cx="238" cy="76" r="5" fill={BRAND_COLORS.red} opacity={gridOpacity} />

        <text
          x="166"
          y="388"
          textAnchor="middle"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="23"
          fontFamily={FONT_BODY}
          fontWeight="700"
          letterSpacing="0.1em"
          opacity={gridOpacity}
        >
          PLANO · INMUEBLE
        </text>
      </g>

      {/* CONECTOR DE EJE HACIA EL DOCUMENTO */}
      <path
        d="M372 308H452"
        stroke={BRAND_COLORS.red}
        strokeWidth="3.5"
        strokeLinecap="round"
        {...drawStroke(frame, startFrame + 18, 14, 90)}
      />
      <circle
        cx="452"
        cy="308"
        r="6.5"
        fill={BRAND_COLORS.red}
        opacity={docHeaderOpacity}
      />

      {/* DOCUMENTO DESPLEGABLE (DERECHA) */}
      <g transform="translate(472, 74)">
        {/* Cuerpo que se despliega verticalmente */}
        <g
          style={{
            transform: `scaleY(${docUnfold})`,
            transformOrigin: "0px 0px",
          }}
        >
          <rect
            x="0"
            y="0"
            width="390"
            height="470"
            rx="18"
            fill={BRAND_COLORS.white}
            stroke={BRAND_COLORS.graphite}
            strokeWidth="3.5"
          />

          <text
            x="32"
            y="54"
            fill={BRAND_COLORS.red}
            fontSize="22"
            fontFamily={FONT_BODY}
            fontWeight="700"
            letterSpacing="0.1em"
          >
            ESCRITURA · CONTROL
          </text>
          <line
            x1="32"
            y1="76"
            x2="358"
            y2="76"
            stroke={BRAND_COLORS.hairline}
            strokeWidth="2"
          />

          {/* Campos con resaltado progresivo */}
          {DOC_FIELDS.map((field, index) => {
            const y = 104 + index * 102;
            const fieldLocal = Math.max(0, localFrame - field.highlightStart);

            const highlightProgress = interpolate(fieldLocal, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EDITORIAL_EASE,
            });

            const checkScale = spring({
              frame: Math.max(0, fieldLocal - 4),
              fps,
              config: { damping: 18, stiffness: 190 },
            });

            return (
              <g key={field.label} transform={`translate(28, ${y})`}>
                <rect
                  x="0"
                  y="0"
                  width={334 * highlightProgress}
                  height="74"
                  rx="12"
                  fill={BRAND_COLORS.redSoft}
                />
                <rect
                  x="0"
                  y="0"
                  width="334"
                  height="74"
                  rx="12"
                  stroke={
                    highlightProgress > 0.2
                      ? BRAND_COLORS.red
                      : BRAND_COLORS.hairline
                  }
                  strokeWidth="2"
                />
                <text
                  x="22"
                  y="46"
                  fill={BRAND_COLORS.graphite}
                  fontSize="27"
                  fontFamily={FONT_BODY}
                  fontWeight="700"
                >
                  {field.label}
                </text>

                <g transform={`translate(294, 37) scale(${checkScale})`}>
                  <circle cx="0" cy="0" r="18" fill={BRAND_COLORS.red} />
                  <path
                    d="M-7 1L-2 6L8 -5"
                    stroke={BRAND_COLORS.white}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};
