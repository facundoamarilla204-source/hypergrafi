import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_COLORS, FONT_BODY } from "../theme/brand";
import { drawStroke, fadeSlideUp } from "../animations/motion";

interface IntegratedSubtitleProps {
  children: React.ReactNode;
  delayFrames?: number;
  showConnector?: boolean;
  connectorStartFrame?: number;
}

/**
 * Subtitulo limpio (Opcion A) ubicado en la zona segura inferior,
 * con conector vertical opcional que lo vincula a la ilustracion superior.
 */
export const IntegratedSubtitle: React.FC<IntegratedSubtitleProps> = ({
  children,
  delayFrames = 24,
  showConnector = true,
  connectorStartFrame = 36,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      {showConnector && (
        <svg width="24" height="52" viewBox="0 0 24 52" fill="none">
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="42"
            stroke={BRAND_COLORS.red}
            strokeWidth="2.5"
            strokeLinecap="round"
            {...drawStroke(frame, connectorStartFrame, 14, 50)}
          />
          <circle
            cx="12"
            cy="46"
            r="4.5"
            fill={BRAND_COLORS.red}
            opacity={interpolate(
              frame,
              [connectorStartFrame + 10, connectorStartFrame + 16],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />
        </svg>
      )}

      <div
        style={{
          ...fadeSlideUp(frame, fps, delayFrames, 16),
          textAlign: "center",
          fontFamily: FONT_BODY,
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.25,
          color: BRAND_COLORS.graphite,
          paddingBottom: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
};

