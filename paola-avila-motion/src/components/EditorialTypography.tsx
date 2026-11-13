import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_COLORS, FONT_BODY, FONT_DISPLAY } from "../theme/brand";
import { fadeSlideUp } from "../animations/motion";

interface EditorialHeaderProps {
  tag: string;
  category?: string;
  delayFrames?: number;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  tag,
  category,
  delayFrames = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...fadeSlideUp(frame, fps, delayFrames, 16),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1.5px solid ${BRAND_COLORS.hairline}`,
        paddingBottom: 20,
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: BRAND_COLORS.red,
        }}
      >
        {tag}
      </span>
      {category && (
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            fontWeight: 600,
            color: BRAND_COLORS.graphiteMuted,
          }}
        >
          {category}
        </span>
      )}
    </div>
  );
};

interface EditorialTitleProps {
  children: React.ReactNode;
  size?: "hero" | "section";
  delayFrames?: number;
  subtitle?: string;
}

export const EditorialTitle: React.FC<EditorialTitleProps> = ({
  children,
  size = "section",
  delayFrames = 6,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fontSize = size === "hero" ? 94 : 68;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h1
        style={{
          ...fadeSlideUp(frame, fps, delayFrames, 28),
          fontFamily: FONT_DISPLAY,
          fontSize,
          fontWeight: 500,
          lineHeight: 1.06,
          color: BRAND_COLORS.graphite,
          margin: 0,
        }}
      >
        {children}
      </h1>
      {subtitle && (
        <p
          style={{
            ...fadeSlideUp(frame, fps, delayFrames + 5, 20),
            fontFamily: FONT_BODY,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.38,
            color: BRAND_COLORS.graphiteMuted,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

