import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { BRAND_COLORS, FONT_BODY } from "../theme/brand";
import {
  CONTINUITY_EASE,
  EDITORIAL_EASE,
  cameraDrift,
  drawStroke,
} from "../animations/motion";
import { ArchitecturalFrame } from "../components/ArchitecturalFrame";
import {
  EditorialHeader,
  EditorialTitle,
} from "../components/EditorialTypography";
import { ConceptHighlight } from "../components/ConceptHighlight";
import { IntegratedSubtitle } from "../components/IntegratedSubtitle";
import { BrandOutro } from "../components/BrandOutro";
import { ContinuityWipe } from "../transitions/ContinuityWipe";
import { HouseBlueprintIcon } from "../illustrations/HouseBlueprintIcon";

/**
 * Demostracion visual refinada (9 segundos / 270 frames a 30 FPS).
 * Construida integramente sobre la biblioteca de componentes reutilizables
 * de Paola Avila Propiedades.
 */
export const StyleTestDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Escena 1: 0 - 75f (0 - 2.5s) -> Gancho editorial equilibrado
  // Escena 2: 66 - 212f (2.2 - 7.06s) -> Ilustracion arquitectonica conectada + subtitulo
  // Escena 3: 206 - 270f (6.86 - 9.0s) -> Cierre institucional breve (~2.1s)

  const scene1Exit = interpolate(frame, [62, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CONTINUITY_EASE,
  });

  const scene2Opacity = interpolate(
    frame,
    [66, 78, 200, 212],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scene2TranslateY = interpolate(frame, [66, 80], [44, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  const scene3Opacity = interpolate(frame, [204, 216], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EDITORIAL_EASE,
  });

  const hookRuleScaleX = interpolate(frame, [16, 34, 62, 74], [0, 1, 1, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CONTINUITY_EASE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_COLORS.ivory }}>
      {/* ESCENA 1: GANCHO EDITORIAL EQUILIBRADO */}
      <Sequence from={0} durationInFrames={78}>
        <ArchitecturalFrame
          tone="ivory"
          watermark="bottom-right"
          watermarkOpacity={0.08}
          watermarkTransform={cameraDrift(frame, 75, 1, 1.03)}
          opacity={1 - scene1Exit}
          translateY={-68 * scene1Exit}
        >
          <EditorialHeader tag="Guia Practica · 01" category="Compraventa" />

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <EditorialTitle size="hero" delayFrames={6}>
              Antes de firmar una{" "}
              <span style={{ color: BRAND_COLORS.red, fontStyle: "italic" }}>
                reserva
              </span>
              , revisa esto.
            </EditorialTitle>

            {/* Diagrama de cota lineal que equilibra el espacio vertical */}
            <svg width="876" height="90" viewBox="0 0 876 90" fill="none">
              <line
                x1="0"
                y1="45"
                x2="876"
                y2="45"
                stroke={BRAND_COLORS.hairline}
                strokeWidth="2"
                {...drawStroke(frame, 10, 22, 880)}
              />
              <circle cx="14" cy="45" r="6" fill={BRAND_COLORS.red} />
              <circle cx="438" cy="45" r="6" fill={BRAND_COLORS.graphite} />
              <circle cx="862" cy="45" r="6" fill={BRAND_COLORS.graphite} />
            </svg>

            <ConceptHighlight
              label="Revision previa obligatoria"
              value="3 documentos clave"
              delayFrames={16}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 64,
                height: 4,
                backgroundColor: BRAND_COLORS.red,
                transform: `scaleX(${hookRuleScaleX})`,
                transformOrigin: "left",
              }}
            />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 30,
                fontWeight: 600,
                color: BRAND_COLORS.graphiteMuted,
                opacity: 1 - scene1Exit,
              }}
            >
              Desliza al analisis tecnico
            </span>
          </div>
        </ArchitecturalFrame>
      </Sequence>

      {/* ESCENA 2: EXPLICACION VISUAL CONECTADA */}
      <Sequence from={66} durationInFrames={148}>
        <ArchitecturalFrame
          tone="white"
          watermark="top-left"
          watermarkOpacity={0.05}
          watermarkTransform={cameraDrift(frame - 66, 148, 1, 1.03)}
          opacity={scene2Opacity}
          translateY={scene2TranslateY}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <EditorialHeader tag="Paso 01 · Verificacion" category="Registro" />
            <EditorialTitle
              size="section"
              delayFrames={6}
              subtitle="Cada propiedad debe corresponder con su documentacion legal."
            >
              Documentacion vinculada
            </EditorialTitle>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HouseBlueprintIcon startFrame={8} width={910} height={660} />
          </div>

          <IntegratedSubtitle delayFrames={28} connectorStartFrame={48}>
            Controla siempre la{" "}
            <span style={{ color: BRAND_COLORS.red }}>escritura</span> y los{" "}
            <span style={{ color: BRAND_COLORS.red }}>planos</span>
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      <ContinuityWipe startFrame={200} durationFrames={16} />

      {/* ESCENA 3: CIERRE INSTITUCIONAL BREVE */}
      <Sequence from={206} durationInFrames={64}>
        <AbsoluteFill style={{ opacity: scene3Opacity }}>
          <BrandOutro />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
