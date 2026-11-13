import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Reveal } from "./scenes/Scene02Reveal";
import { Scene03Tools } from "./scenes/Scene03Tools";
import { Scene04Value } from "./scenes/Scene04Value";
import { Scene05CTA } from "./scenes/Scene05CTA";

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a053d" }}>
      {/* Master Audio Track (BGM + Voiceover mix) */}
      <Audio src={staticFile("assets/audio/master-mix.mp3")} volume={1} />

      {/* Escena 1: Gancho (0s - 3.5s -> Frames 0 to 105) */}
      <Sequence from={0} durationInFrames={105} name="01-Hook">
        <Scene01Hook />
      </Sequence>

      {/* Escena 2: Presentación (3.5s - 8.0s -> Frames 105 to 240) */}
      <Sequence from={105} durationInFrames={135} name="02-Reveal">
        <Scene02Reveal />
      </Sequence>

      {/* Escena 3: Descubrimiento de Herramientas (8.0s - 20.0s -> Frames 240 to 600) */}
      <Sequence from={240} durationInFrames={360} name="03-Tools">
        <Scene03Tools />
      </Sequence>

      {/* Escena 4: Propuesta de Valor (20.0s - 24.5s -> Frames 600 to 735) */}
      <Sequence from={600} durationInFrames={135} name="04-Value">
        <Scene04Value />
      </Sequence>

      {/* Escena 5: Cierre & CTA (24.5s - 28.5s -> Frames 735 to 855) */}
      <Sequence from={735} durationInFrames={120} name="05-CTA">
        <Scene05CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
