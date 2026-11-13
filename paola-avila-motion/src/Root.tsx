import React from "react";
import { Composition } from "remotion";
import { StyleTestDemo } from "./compositions/StyleTestDemo";
import { BoletoVsEscrituraReel } from "./episodes/01-boleto-vs-escritura/BoletoVsEscrituraReel";
import { getEpisode01TotalFrames } from "./episodes/01-boleto-vs-escritura/config";
import { VIDEO_CONFIG } from "./theme/brand";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="01-BoletoVsEscritura"
        component={BoletoVsEscrituraReel}
        durationInFrames={getEpisode01TotalFrames()}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
      <Composition
        id="StyleTestDemo"
        component={StyleTestDemo}
        durationInFrames={270}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
