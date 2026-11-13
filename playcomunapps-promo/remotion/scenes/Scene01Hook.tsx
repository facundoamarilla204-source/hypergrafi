import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14 } });
  const card1Y = interpolate(frame, [0, 20], [80, 0], { extrapolateRight: "clamp" });
  const card2Y = interpolate(frame, [5, 25], [120, 0], { extrapolateRight: "clamp" });
  const card3Y = interpolate(frame, [10, 30], [160, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 25%, #4c16a3 0%, #2f0d68 45%, #1a053d 100%)",
        padding: "200px 80px 260px 80px",
        fontFamily: "'Sora', sans-serif",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "14px 28px",
          background: "rgba(255, 255, 255, 0.12)",
          border: "2px solid rgba(255, 255, 255, 0.25)",
          borderRadius: 9999,
          fontSize: 28,
          fontWeight: 600,
        }}
      >
        ● Catálogo de utilidades online
      </div>

      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.18,
          transform: `scale(${titleScale})`,
        }}
      >
        ¿Y si tu próxima<br />
        <span style={{ color: "#DDD6FE" }}>herramienta</span><br />
        ya estuviera acá?
      </h1>

      <div style={{ position: "relative", width: "100%", height: 600 }}>
        {/* Card 1 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 20,
            width: 780,
            transform: `translateX(-50%) translateY(${card1Y}px) rotate(-4deg)`,
            background: "#ffffff",
            color: "#0F172A",
            borderRadius: 28,
            padding: "36px 40px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>
            📊 Precios y Costos
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, margin: "14px 0" }}>Calculadora de Precios</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#10B981" }}>Venta: $16.666 (Margen 40%)</div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 140,
            width: 780,
            transform: `translateX(-50%) translateY(${card2Y}px) rotate(3deg)`,
            background: "#ffffff",
            color: "#0F172A",
            borderRadius: 28,
            padding: "36px 40px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>
            📄 Gestión Comercial
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, margin: "14px 0" }}>Generador de Presupuestos</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#10B981" }}>PDF Listo en 5 segundos</div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 260,
            width: 780,
            transform: `translateX(-50%) translateY(${card3Y}px) rotate(-1deg)`,
            background: "#ffffff",
            color: "#0F172A",
            borderRadius: 28,
            padding: "36px 40px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>
            🎬 Utilidades
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, margin: "14px 0" }}>Descargador de Videos</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#10B981" }}>MP4 / MP3 en 1 Clic</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, fontSize: 28, color: "#ddd6fe" }}>
        <span>⚡ Sin instalar</span>
        <span>·</span>
        <span>🎯 28 herramientas</span>
        <span>·</span>
        <span>✨ 100% libre</span>
      </div>
    </AbsoluteFill>
  );
};
