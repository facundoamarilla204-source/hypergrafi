import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene05CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 30%, #4c16a3 0%, #2f0d68 45%, #180438 100%)",
        padding: "200px 80px 260px 80px",
        fontFamily: "'Sora', sans-serif",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "#ffffff",
            border: "6px solid #8249F1",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.45), 0 0 35px rgba(130, 73, 241, 0.6)",
            transform: `scale(${entrance})`,
          }}
        >
          <Img src={staticFile("assets/otter.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Img src={staticFile("assets/logo.png")} style={{ height: 90, filter: "brightness(0) invert(1)" }} />
      </div>

      <div>
        <h1 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.18 }}>
          Entrá y descubrí<br />
          tus herramientas.
        </h1>
        <p style={{ fontSize: 32, color: "#ddd6fe", marginTop: 12 }}>
          Gratis, inmediato y sin registros en tu navegador.
        </p>
      </div>

      {/* Prominent Domain Box */}
      <div
        style={{
          width: "100%",
          background: "#ffffff",
          border: "4px solid #8249F1",
          borderRadius: 36,
          padding: "34px 44px",
          boxShadow: "0 25px 65px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 66, fontWeight: 800, color: "#6D28D9" }}>playcomun.online</span>
        <span style={{ fontSize: 28, color: "#64748B", fontWeight: 600 }}>Disponible ahora en cualquier dispositivo</span>
      </div>

      <div
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #7C3AED 0%, #8249F1 50%, #6916dc 100%)",
          color: "#ffffff",
          borderRadius: 26,
          padding: "26px 54px",
          fontSize: 34,
          fontWeight: 800,
          boxShadow: "0 16px 40px rgba(124, 58, 237, 0.55)",
        }}
      >
        Comenzar ahora gratis
      </div>

      <div style={{ display: "flex", gap: 14, fontSize: 28, color: "#c4b5fd", fontWeight: 600 }}>
        <span>✓ 100% Online</span>
        <span>·</span>
        <span>✓ Sin costo</span>
        <span>·</span>
        <span>✓ Hecho en Argentina</span>
      </div>
    </AbsoluteFill>
  );
};
