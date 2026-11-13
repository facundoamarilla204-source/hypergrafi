import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_COLORS, FONT_BODY, FONT_DISPLAY } from "../../theme/brand";
import { drawStroke, EDITORIAL_EASE } from "../../animations/motion";

const BOLETO_CLAUSES = [
  { label: "Precio acordado", start: 135 },
  { label: "Forma de pago", start: 170 },
  { label: "Plazos", start: 205 },
  { label: "Condiciones", start: 240 },
] as const;

/**
 * Representacion estilizada del Boleto de Compraventa con 4 clausulas
 * que se resaltan progresivamente en sincronia con la locucion.
 */
export const BoletoContractGraphic: React.FC<{ startFrame?: number }> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const unfold = interpolate(local, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  return (
    <svg width="860" height="690" viewBox="0 0 860 690" fill="none">
      <g style={{ transform: `scaleY(${unfold})`, transformOrigin: "430px 40px" }}>
        <rect
          x="70"
          y="20"
          width="720"
          height="640"
          rx="26"
          fill={BRAND_COLORS.white}
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3.5"
        />
        {/* Barra superior de contrato privado */}
        <rect
          x="110"
          y="64"
          width="240"
          height="10"
          rx="5"
          fill={BRAND_COLORS.red}
        />
        <text
          x="110"
          y="122"
          fill={BRAND_COLORS.graphite}
          fontSize="40"
          fontFamily={FONT_DISPLAY}
          fontWeight="600"
        >
          Boleto de Compraventa
        </text>
        <text
          x="110"
          y="162"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="24"
          fontFamily={FONT_BODY}
          fontWeight="600"
        >
          Acuerdo privado entre partes
        </text>
        <line
          x1="110"
          y1="190"
          x2="750"
          y2="190"
          stroke={BRAND_COLORS.hairline}
          strokeWidth="2"
        />

        {BOLETO_CLAUSES.map((clause, index) => {
          const y = 224 + index * 102;
          const clauseLocal = Math.max(0, local - clause.start);
          const progress = interpolate(clauseLocal, [0, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EDITORIAL_EASE,
          });
          const dotScale = spring({
            frame: Math.max(0, clauseLocal - 4),
            fps,
            config: { damping: 18, stiffness: 180 },
          });

          return (
            <g key={clause.label} transform={`translate(110, ${y})`}>
              <rect
                x="0"
                y="0"
                width={640 * progress}
                height="78"
                rx="14"
                fill={BRAND_COLORS.redSoft}
              />
              <rect
                x="0"
                y="0"
                width="640"
                height="78"
                rx="14"
                stroke={
                  progress > 0.2 ? BRAND_COLORS.red : BRAND_COLORS.hairline
                }
                strokeWidth="2"
              />
              <text
                x="28"
                y="49"
                fill={BRAND_COLORS.graphite}
                fontSize="28"
                fontFamily={FONT_BODY}
                fontWeight="700"
              >
                {clause.label}
              </text>
              <g transform={`translate(598, 39) scale(${dotScale})`}>
                <circle cx="0" cy="0" r="16" fill={BRAND_COLORS.red} />
                <path
                  d="M-6 1L-1 6L7 -4"
                  stroke={BRAND_COLORS.white}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

/**
 * Escena 03: Boleto conectado a Comprador y Vendedor (compromisos)
 * y separacion clara respecto de la transferencia del dominio de la casa.
 */
export const PartiesObligationsGraphic: React.FC<{ startFrame?: number }> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const phase2Opacity = interpolate(local, [182, 198], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  const phase2Scale = interpolate(
    spring({
      frame: Math.max(0, local - 182),
      fps,
      config: { damping: 20, stiffness: 130 },
    }),
    [0, 1],
    [0.94, 1]
  );

  const cardSpring = spring({
    frame: Math.max(0, local - 12),
    fps,
    config: { damping: 22, stiffness: 120 },
  });

  return (
    <svg width="880" height="690" viewBox="0 0 880 690" fill="none">
      {/* Nodo central superior: BOLETO */}
      <g transform="translate(270, 20)">
        <rect
          x="0"
          y="0"
          width="340"
          height="100"
          rx="18"
          fill={BRAND_COLORS.ivory}
          stroke={BRAND_COLORS.graphite}
          strokeWidth="3"
        />
        <text
          x="170"
          y="46"
          textAnchor="middle"
          fill={BRAND_COLORS.red}
          fontSize="22"
          fontFamily={FONT_BODY}
          fontWeight="700"
          letterSpacing="0.1em"
        >
          CONTRATO
        </text>
        <text
          x="170"
          y="80"
          textAnchor="middle"
          fill={BRAND_COLORS.graphite}
          fontSize="30"
          fontFamily={FONT_DISPLAY}
          fontWeight="600"
        >
          Boleto de Compraventa
        </text>
      </g>

      {/* Conexiones hacia ambas partes */}
      <path
        d="M360 120V165H200V210"
        stroke={BRAND_COLORS.red}
        strokeWidth="3"
        strokeLinecap="round"
        {...drawStroke(frame, startFrame + 8, 22, 260)}
      />
      <path
        d="M520 120V165H680V210"
        stroke={BRAND_COLORS.red}
        strokeWidth="3"
        strokeLinecap="round"
        {...drawStroke(frame, startFrame + 8, 22, 260)}
      />

      {/* Comprador */}
      <g transform="translate(30, 210)" opacity={cardSpring}>
        <rect
          x="0"
          y="0"
          width="340"
          height="150"
          rx="18"
          fill={BRAND_COLORS.white}
          stroke={BRAND_COLORS.hairline}
          strokeWidth="2"
        />
        <text
          x="28"
          y="48"
          fill={BRAND_COLORS.red}
          fontSize="22"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          COMPRADOR
        </text>
        <text
          x="28"
          y="96"
          fill={BRAND_COLORS.graphite}
          fontSize="28"
          fontFamily={FONT_BODY}
          fontWeight="600"
        >
          Pagar el precio
        </text>
        <text
          x="28"
          y="128"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="22"
          fontFamily={FONT_BODY}
        >
          en los plazos pactados
        </text>
      </g>

      {/* Vendedor */}
      <g transform="translate(510, 210)" opacity={cardSpring}>
        <rect
          x="0"
          y="0"
          width="340"
          height="150"
          rx="18"
          fill={BRAND_COLORS.white}
          stroke={BRAND_COLORS.hairline}
          strokeWidth="2"
        />
        <text
          x="28"
          y="48"
          fill={BRAND_COLORS.red}
          fontSize="22"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          VENDEDOR
        </text>
        <text
          x="28"
          y="96"
          fill={BRAND_COLORS.graphite}
          fontSize="28"
          fontFamily={FONT_BODY}
          fontWeight="600"
        >
          Otorgar escritura
        </text>
        <text
          x="28"
          y="128"
          fill={BRAND_COLORS.graphiteMuted}
          fontSize="22"
          fontFamily={FONT_BODY}
        >
          y entregar el inmueble
        </text>
      </g>

      {/* Fase 2: Diferencia clara con la transferencia del dominio (sincronizada a los ~6.2s de la escena) */}
      <g
        transform={`translate(60, 415) scale(${phase2Scale})`}
        opacity={phase2Opacity}
      >
        <rect
          x="0"
          y="0"
          width="760"
          height="235"
          rx="22"
          fill={BRAND_COLORS.ivory}
          stroke={BRAND_COLORS.red}
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />

        {/* Linea divisoria de barrera animada entre concepto y propiedad */}
        <line
          x1="465"
          y1="38"
          x2="465"
          y2="198"
          stroke={BRAND_COLORS.red}
          strokeWidth="2.5"
          {...drawStroke(frame, startFrame + 190, 18, 170)}
        />

        {/* Casa arquitectonica que se construye mediante trazos a la derecha */}
        <g transform="translate(525, 48)">
          <line
            x1="0"
            y1="132"
            x2="170"
            y2="132"
            stroke={BRAND_COLORS.graphite}
            strokeWidth="3.5"
            strokeLinecap="round"
            {...drawStroke(frame, startFrame + 192, 16, 180)}
          />
          <path
            d="M22 132V62L85 16L148 62V132"
            stroke={BRAND_COLORS.graphite}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...drawStroke(frame, startFrame + 198, 22, 340)}
          />
          <path
            d="M10 70L85 14L160 70"
            stroke={BRAND_COLORS.red}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...drawStroke(frame, startFrame + 206, 20, 220)}
          />
          <rect
            x="68"
            y="84"
            width="34"
            height="48"
            rx="3"
            stroke={BRAND_COLORS.graphite}
            strokeWidth="2.5"
            {...drawStroke(frame, startFrame + 214, 14, 170)}
          />
        </g>

        <text
          x="42"
          y="76"
          fill={BRAND_COLORS.red}
          fontSize="28"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          BOLETO ≠ DOMINIO
        </text>
        <text
          x="42"
          y="128"
          fill={BRAND_COLORS.graphite}
          fontSize="31"
          fontFamily={FONT_DISPLAY}
          fontWeight="500"
        >
          Por sí solo, no transfiere
        </text>
        <text
          x="42"
          y="170"
          fill={BRAND_COLORS.graphite}
          fontSize="31"
          fontFamily={FONT_DISPLAY}
          fontWeight="500"
        >
          la propiedad del inmueble.
        </text>
      </g>
    </svg>
  );
};

/**
 * Escena 04: Escritura Publica con hojas notariales, sello del escribano y verificacion legal.
 */
export const EscrituraNotarialGraphic: React.FC<{ startFrame?: number }> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const sealScale = spring({
    frame: Math.max(0, local - 38),
    fps,
    config: { damping: 16, stiffness: 170 },
  });

  return (
    <svg width="860" height="640" viewBox="0 0 860 640" fill="none">
      {/* Hoja posterior */}
      <rect
        x="170"
        y="44"
        width="560"
        height="540"
        rx="22"
        fill={BRAND_COLORS.ivory}
        stroke={BRAND_COLORS.hairline}
        strokeWidth="2.5"
      />
      {/* Hoja principal */}
      <rect
        x="130"
        y="24"
        width="560"
        height="540"
        rx="22"
        fill={BRAND_COLORS.white}
        stroke={BRAND_COLORS.graphite}
        strokeWidth="3.5"
      />

      {/* Encabezado notarial */}
      <text
        x="180"
        y="92"
        fill={BRAND_COLORS.red}
        fontSize="23"
        fontFamily={FONT_BODY}
        fontWeight="700"
        letterSpacing="0.12em"
      >
        INSTRUMENTO PÚBLICO
      </text>
      <text
        x="180"
        y="148"
        fill={BRAND_COLORS.graphite}
        fontSize="44"
        fontFamily={FONT_DISPLAY}
        fontWeight="600"
      >
        Escritura Pública
      </text>
      <line
        x1="180"
        y1="178"
        x2="640"
        y2="178"
        stroke={BRAND_COLORS.hairline}
        strokeWidth="2"
      />

      {/* Lineas de control notarial */}
      {[
        "Intervención de Escribano Público",
        "Control de títulos y antecedentes",
        "Verificación de estado legal y dominio",
      ].map((item, idx) => (
        <g key={item} transform={`translate(180, ${222 + idx * 66})`}>
          <circle cx="8" cy="-8" r="6" fill={BRAND_COLORS.red} />
          <text
            x="26"
            y="0"
            fill={BRAND_COLORS.graphite}
            fontSize="24"
            fontFamily={FONT_BODY}
            fontWeight="600"
          >
            {item}
          </text>
        </g>
      ))}

      {/* Firma */}
      <path
        d="M190 475C225 445 255 495 295 462C325 440 345 480 385 466"
        stroke={BRAND_COLORS.graphite}
        strokeWidth="3.5"
        strokeLinecap="round"
        {...drawStroke(frame, startFrame + 20, 24, 260)}
      />
      <text
        x="190"
        y="512"
        fill={BRAND_COLORS.graphiteMuted}
        fontSize="20"
        fontFamily={FONT_BODY}
        fontWeight="600"
      >
        Escribano autorizante
      </text>

      {/* Sello notarial en rojo institucional */}
      <g transform={`translate(560, 456) scale(${sealScale})`}>
        <circle
          cx="0"
          cy="0"
          r="58"
          fill={BRAND_COLORS.redSoft}
          stroke={BRAND_COLORS.red}
          strokeWidth="3.5"
        />
        <circle
          cx="0"
          cy="0"
          r="44"
          stroke={BRAND_COLORS.red}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill={BRAND_COLORS.red}
          fontSize="18"
          fontFamily={FONT_BODY}
          fontWeight="700"
        >
          VERIFICADO
        </text>
      </g>
    </svg>
  );
};

