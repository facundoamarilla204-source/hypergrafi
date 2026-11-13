import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene04Value: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #350b73 0%, #200645 55%, #100128 100%)",
        padding: "200px 80px 260px 80px",
        fontFamily: "'Sora', sans-serif",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "12px 28px", background: "rgba(255,255,255,0.12)", borderRadius: 9999, fontSize: 28, fontWeight: 700, color: "#ddd6fe", marginBottom: 20 }}>
          Ecosistema Completo
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15 }}>
          Todo lo que necesitás,<br />
          <span style={{ color: "#DDD6FE" }}>en un solo lugar.</span>
        </h1>
        <p style={{ fontSize: 32, color: "#ddd6fe", marginTop: 12 }}>
          Sin suscripciones forzosas ni configuraciones complejas.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: "100%",
          transform: `scale(${entrance})`,
        }}
      >
        <div style={{ background: "#ffffff", borderRadius: 28, padding: 32, color: "#0F172A", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Precios y Finanzas</div>
          <div style={{ fontSize: 28, color: "#64748B" }}>Precios, rentabilidad, IVA y cuotas.</div>
          <div style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 28, fontWeight: 700, padding: "4px 14px", borderRadius: 8, alignSelf: "flex-start" }}>
            8 Herramientas
          </div>
        </div>

        <div style={{ background: "#ffffff", borderRadius: 28, padding: 32, color: "#0F172A", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 40 }}>📑</div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Gestión & PDF</div>
          <div style={{ fontSize: 28, color: "#64748B" }}>Presupuestos, recibos y firma online.</div>
          <div style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 28, fontWeight: 700, padding: "4px 14px", borderRadius: 8, alignSelf: "flex-start" }}>
            6 Herramientas
          </div>
        </div>

        <div style={{ background: "#ffffff", borderRadius: 28, padding: 32, color: "#0F172A", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 40 }}>⚡</div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Archivos & Media</div>
          <div style={{ fontSize: 28, color: "#64748B" }}>Compresor, convertidor y descarga.</div>
          <div style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 28, fontWeight: 700, padding: "4px 14px", borderRadius: 8, alignSelf: "flex-start" }}>
            8 Herramientas
          </div>
        </div>

        <div style={{ background: "#ffffff", borderRadius: 28, padding: 32, color: "#0F172A", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 40 }}>🎯</div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Utilidades Rápidas</div>
          <div style={{ fontSize: 28, color: "#64748B" }}>Códigos QR, paletas y reseñas.</div>
          <div style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 28, fontWeight: 700, padding: "4px 14px", borderRadius: 8, alignSelf: "flex-start" }}>
            6 Herramientas
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", padding: "16px 28px", borderRadius: 18, display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 600 }}>
          <span>⚡ 100% en tu navegador</span>
          <span style={{ color: "#10B981" }}>✓ Instantáneo</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", padding: "16px 28px", borderRadius: 18, display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 600 }}>
          <span>🔒 Privado y seguro</span>
          <span style={{ color: "#10B981" }}>✓ Sin registro</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
