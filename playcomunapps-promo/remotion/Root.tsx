import React from "react";
import { Composition } from "remotion";
import { Main } from "./Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PlayComunPromo"
        component={Main}
        durationInFrames={855} // 28.5 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "PlayComun Online",
          url: "https://www.playcomun.online/",
        }}
      />
    </>
  );
};
