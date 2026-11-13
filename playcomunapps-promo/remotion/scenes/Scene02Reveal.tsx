import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene02Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15 } });
  const previewY = interpolate(frame, [0, 25], [60, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 30%, #3d1083 0%, #280b57 50%, #150333 100%)",
        padding: "200px 80px 260px 80px",
        fontFamily: "'Sora', sans-serif",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Img src={staticFile("assets/logo.png")} style={{ height: 80, filter: "brightness(0) invert(1)" }} />
          <div style={{ width: 90, height: 90, borderRadius: "50%", border: "4px solid #8249F1", overflow: "hidden" }}>
            <Img src={staticFile("assets/otter.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <h1 style={{ fontSize: 60, fontWeight: 800, textAlign: "center", lineHeight: 1.16 }}>
          Muchas herramientas.<br />
          <span style={{ color: "#DDD6FE" }}>Un solo lugar.</span>
        </h1>
        <p style={{ fontSize: 32, color: "#ddd6fe", textAlign: "center" }}>
          Todas las utilidades y calculadoras directo en tu navegador.
        </p>
      </div>

      {/* Search Bar Mockup */}
      <div
        style={{
          width: "100%",
          background: "#ffffff",
          borderRadius: 28,
          padding: "24px 32px",
          color: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          transform: `scale(${entrance})`,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 600 }}>🔍 ¿Qué necesitás resolver hoy?</span>
        <span style={{ background: "#7C3AED", color: "#ffffff", padding: "14px 28px", borderRadius: 18, fontSize: 28, fontWeight: 700 }}>
          Buscar
        </span>
      </div>

      {/* Real Website Screenshot */}
      <div
        style={{
          width: "100%",
          borderRadius: 28,
          overflow: "hidden",
          border: "3px solid rgba(255,255,255,0.2)",
          transform: `translateY(${previewY}px)`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
        }}
      >
        <Img src={staticFile("assets/catalog-tools.png")} style={{ width: "100%", display: "block" }} />
      </div>

      <div style={{ fontSize: 30, fontWeight: 700, color: "#A7F3D0" }}>
        ✓ 100% Online · Sin instalación · Uso gratis
      </div>
    </AbsoluteFill>
  );
};
