import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BRAND_COLORS } from "../../theme/brand";
import {
  CONTINUITY_EASE,
  EDITORIAL_EASE,
  cameraDrift,
} from "../../animations/motion";
import { ArchitecturalFrame } from "../../components/ArchitecturalFrame";
import {
  EditorialHeader,
  EditorialTitle,
} from "../../components/EditorialTypography";
import { IntegratedSubtitle } from "../../components/IntegratedSubtitle";
import { BrandOutro } from "../../components/BrandOutro";
import { ContinuityWipe } from "../../transitions/ContinuityWipe";
import { HouseBlueprintIcon } from "../../illustrations/HouseBlueprintIcon";
import {
  EPISODE_01_AUDIO,
  EPISODE_01_OVERLAP_FRAMES,
  getSegmentTiming,
} from "./config";
import {
  BoletoContractGraphic,
  EscrituraNotarialGraphic,
  PartiesObligationsGraphic,
} from "./illustrations";
import {
  ComparisonDocumentsGraphic,
  DomainTransferGraphic,
} from "./illustrationsMore";

const useSceneFade = (
  from: number,
  duration: number,
  isFirst = false,
  isLast = false
) => {
  const frame = useCurrentFrame();
  const local = frame - from;

  const enterOpacity = isFirst
    ? 1
    : interpolate(local, [0, EPISODE_01_OVERLAP_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EDITORIAL_EASE,
      });

  const exitOpacity = isLast
    ? 1
    : interpolate(
        local,
        [duration - EPISODE_01_OVERLAP_FRAMES, duration],
        [1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CONTINUITY_EASE,
        }
      );

  const translateY = isFirst
    ? 0
    : interpolate(local, [0, 14], [32, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EDITORIAL_EASE,
      });

  return {
    opacity: Math.min(enterOpacity, exitOpacity),
    translateY,
  };
};

export const BoletoVsEscrituraReel: React.FC = () => {
  const frame = useCurrentFrame();
  const segments = getSegmentTiming();

  const [s1, s2, s3, s4, s5, s6, s7] = segments;

  const f1 = useSceneFade(s1.from, s1.durationInFrames, true, false);
  const f2 = useSceneFade(s2.from, s2.durationInFrames);
  const f3 = useSceneFade(s3.from, s3.durationInFrames);
  const f4 = useSceneFade(s4.from, s4.durationInFrames);
  const f5 = useSceneFade(s5.from, s5.durationInFrames);
  const f6 = useSceneFade(s6.from, s6.durationInFrames);
  const f7 = useSceneFade(s7.from, s7.durationInFrames, false, true);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.ivory,
        translate: "0px 14.1px"
      }}
    >
      {/* Canales de audio: musica casi en mute (0.06) para no tapar la futura voz en off */}
      {EPISODE_01_AUDIO.voiceoverSrc && (
        <Audio src={staticFile(EPISODE_01_AUDIO.voiceoverSrc)} />
      )}
      {EPISODE_01_AUDIO.musicSrc && (
        <Audio
          src={staticFile(EPISODE_01_AUDIO.musicSrc)}
          volume={EPISODE_01_AUDIO.musicVolume}
          loop
        />
      )}

      {/* Efectos sonoros discretos sincronizados con las animaciones */}
      {[s1.from + 54, s1.from + 74].map((tickFrame) => (
        <Sequence key={`s1-tick-${tickFrame}`} from={tickFrame} durationInFrames={12}>
          <Audio src={staticFile(EPISODE_01_AUDIO.sfx.tick)} volume={EPISODE_01_AUDIO.sfx.volume} />
        </Sequence>
      ))}

      {[s2.from + 143, s2.from + 178, s2.from + 213, s2.from + 248].map((tickFrame) => (
        <Sequence key={`s2-tick-${tickFrame}`} from={tickFrame} durationInFrames={12}>
          <Audio src={staticFile(EPISODE_01_AUDIO.sfx.tick)} volume={EPISODE_01_AUDIO.sfx.volume} />
        </Sequence>
      ))}

      <Sequence from={s3.from + 188} durationInFrames={12}>
        <Audio src={staticFile(EPISODE_01_AUDIO.sfx.tick)} volume={EPISODE_01_AUDIO.sfx.volume} />
      </Sequence>

      {[s2.from, s3.from, s4.from - 4, s5.from, s6.from, s7.from - 4].map((wFrame) => (
        <Sequence key={`whoosh-${wFrame}`} from={wFrame} durationInFrames={16}>
          <Audio src={staticFile(EPISODE_01_AUDIO.sfx.whoosh)} volume={EPISODE_01_AUDIO.sfx.volume} />
        </Sequence>
      ))}

      <Sequence from={s4.from + 44} durationInFrames={20}>
        <Audio src={staticFile(EPISODE_01_AUDIO.sfx.seal)} volume={EPISODE_01_AUDIO.sfx.volume} />
      </Sequence>
      <Sequence from={s7.from + 4} durationInFrames={20}>
        <Audio src={staticFile(EPISODE_01_AUDIO.sfx.seal)} volume={EPISODE_01_AUDIO.sfx.volume} />
      </Sequence>

      {/* ESCENA 01: GANCHO */}
      <Sequence from={s1.from} durationInFrames={s1.durationInFrames}>
        <ArchitecturalFrame
          tone="ivory"
          watermark="bottom-right"
          watermarkOpacity={0.07}
          watermarkTransform={cameraDrift(frame - s1.from, s1.durationInFrames)}
          opacity={f1.opacity}
          translateY={f1.translateY}
        >
          <EditorialHeader tag="Educación Inmobiliaria" category="Episodio 01" />

          <EditorialTitle size="hero" delayFrames={2}>
            ¿Firmar un{" "}
            <span style={{ color: BRAND_COLORS.red, fontStyle: "italic" }}>
              BOLETO
            </span>{" "}
            te hace dueño de la{" "}
            <span style={{ color: BRAND_COLORS.red }}>PROPIEDAD</span>?
          </EditorialTitle>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <HouseBlueprintIcon startFrame={6} width={880} height={580} />
          </div>

          <IntegratedSubtitle delayFrames={16} showConnector={false}>
            Firmar un <span style={{ color: BRAND_COLORS.red }}>boleto</span> no
            te hace <span style={{ color: BRAND_COLORS.red }}>dueño</span>{" "}
            todavía
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      {/* ESCENA 02: QUE ES EL BOLETO */}
      <Sequence from={s2.from} durationInFrames={s2.durationInFrames}>
        <ArchitecturalFrame
          tone="white"
          watermark="top-left"
          watermarkOpacity={0.045}
          opacity={f2.opacity}
          translateY={f2.translateY}
        >
          <EditorialHeader tag="01 · El contrato" category="Boleto" />
          <EditorialTitle
            size="section"
            subtitle="Acuerdo privado donde ambas partes fijan las reglas de la operación."
          >
            Qué es el boleto de compraventa
          </EditorialTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BoletoContractGraphic startFrame={8} />
          </div>
          <IntegratedSubtitle delayFrames={18} showConnector={false}>
            Fija <span style={{ color: BRAND_COLORS.red }}>precio</span>, forma
            de pago, <span style={{ color: BRAND_COLORS.red }}>plazos</span> y
            condiciones
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      {/* ESCENA 03: PARA QUE SIRVE EL BOLETO */}
      <Sequence from={s3.from} durationInFrames={s3.durationInFrames}>
        <ArchitecturalFrame
          tone="ivory"
          watermark="bottom-right"
          watermarkOpacity={0.05}
          opacity={f3.opacity}
          translateY={f3.translateY}
        >
          <EditorialHeader tag="02 · Compromisos" category="Boleto" />
          <EditorialTitle size="section">
            Genera obligaciones, no dominio
          </EditorialTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PartiesObligationsGraphic startFrame={6} />
          </div>
          <IntegratedSubtitle delayFrames={20} showConnector={false}>
            Establece{" "}
            <span style={{ color: BRAND_COLORS.red }}>compromisos</span>, pero{" "}
            <span style={{ color: BRAND_COLORS.red }}>no transfiere</span> la
            propiedad
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      <ContinuityWipe startFrame={s4.from - 4} durationFrames={14} />

      {/* ESCENA 04: QUE ES LA ESCRITURA PUBLICA */}
      <Sequence from={s4.from} durationInFrames={s4.durationInFrames}>
        <ArchitecturalFrame
          tone="white"
          watermark="top-left"
          watermarkOpacity={0.045}
          opacity={f4.opacity}
          translateY={f4.translateY}
        >
          <EditorialHeader tag="03 · Seguridad legal" category="Escritura" />
          <EditorialTitle
            size="section"
            subtitle="Se otorga ante escribano público, garantizando respaldo jurídico."
          >
            Qué es la escritura pública
          </EditorialTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <EscrituraNotarialGraphic startFrame={6} />
          </div>
          <IntegratedSubtitle delayFrames={18} showConnector={false}>
            Se firma ante{" "}
            <span style={{ color: BRAND_COLORS.red }}>escribano</span>, que
            verifica la{" "}
            <span style={{ color: BRAND_COLORS.red }}>situación legal</span>
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      {/* ESCENA 05: FUNCION DE LA ESCRITURA */}
      <Sequence from={s5.from} durationInFrames={s5.durationInFrames}>
        <ArchitecturalFrame
          tone="ivory"
          watermark="bottom-right"
          watermarkOpacity={0.05}
          opacity={f5.opacity}
          translateY={f5.translateY}
        >
          <EditorialHeader tag="04 · Transmisión" category="Dominio" />
          <EditorialTitle size="section">
            Formalizar la transferencia
          </EditorialTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DomainTransferGraphic startFrame={6} />
          </div>
          <IntegratedSubtitle delayFrames={18} showConnector={false}>
            <span style={{ color: BRAND_COLORS.red }}>Formaliza</span> el{" "}
            <span style={{ color: BRAND_COLORS.red }}>dominio</span> junto a
            los requisitos legales
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      {/* ESCENA 06: COMPARACION Y CONCLUSION */}
      <Sequence from={s6.from} durationInFrames={s6.durationInFrames}>
        <ArchitecturalFrame
          tone="white"
          watermark="none"
          opacity={f6.opacity}
          translateY={f6.translateY}
        >
          <EditorialHeader tag="Resumen clave" category="Diferencia" />
          <EditorialTitle size="section">
            En simples palabras
          </EditorialTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ComparisonDocumentsGraphic startFrame={4} />
          </div>
          <IntegratedSubtitle delayFrames={14} showConnector={false}>
            Boleto:{" "}
            <span style={{ color: BRAND_COLORS.red }}>compromisos</span> ·
            Escritura:{" "}
            <span style={{ color: BRAND_COLORS.red }}>transferencia</span>
          </IntegratedSubtitle>
        </ArchitecturalFrame>
      </Sequence>

      <ContinuityWipe startFrame={s7.from - 4} durationFrames={14} />

      {/* ESCENA 07: CIERRE INSTITUCIONAL */}
      <Sequence from={s7.from} durationInFrames={s7.durationInFrames}>
        <AbsoluteFill style={{ opacity: f7.opacity }}>
          <BrandOutro tagline="Te acompañamos en cada paso." />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
