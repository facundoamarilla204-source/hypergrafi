import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";

const toolsData = [
  {
    verb: "CALCULÁ",
    sub: "Precios y margen en segundos",
    title: "Calculadora de Precios",
    tag: "Precios y Costos",
    desc: "Fijá precios rentables considerando costos e impuestos.",
    result: "Costo $10.000 · Margen 40% → Venta $16.666",
    img: "assets/tool-precios-calc.png",
  },
  {
    verb: "GENERÁ",
    sub: "Presupuestos y facturas en PDF",
    title: "Generador de Presupuestos",
    tag: "Gestión Comercial",
    desc: "Cotizaciones comerciales con tu logo listas para enviar.",
    result: "Formato A4 Profesional · Listo en 5 segundos",
    img: "assets/tool-presupuestos-pdf.png",
  },
  {
    verb: "CREÁ",
    sub: "Códigos QR para tu negocio",
    title: "Generador de Códigos QR",
    tag: "Clientes & Marketing",
    desc: "QR para tu menú, WhatsApp, enlaces y cobros directos.",
    result: "Descarga PNG / SVG nítido sin caducidad",
    img: "assets/tool-qr.png",
  },
  {
    verb: "FIRMÁ",
    sub: "Documentos desde el teléfono",
    title: "Firmar PDF Online",
    tag: "Documentos PDF",
    desc: "Firma manuscrita digital directa desde tu smartphone.",
    result: "Uní, ordená y firmá PDFs · 100% Privado",
    img: "assets/catalog-tools.png",
  },
  {
    verb: "OPTIMIZÁ",
    sub: "Imágenes y archivos sin peso extra",
    title: "Compresor de Imágenes",
    tag: "Optimización",
    desc: "Reducí el peso de fotos y catálogos sin perder nitidez.",
    result: "De 4.2 MB a 980 KB · Ahorro -77%",
    img: "assets/hero-landing.png",
  },
  {
    verb: "DESCARGÁ",
    sub: "Videos y extraé audios MP3",
    title: "Descargador de Videos",
    tag: "Redes Sociales",
    desc: "Guardá reels, tiktoks y audios públicos al instante.",
    result: "Instagram · TikTok · Facebook · MP4 y MP3",
    img: "assets/catalog-tools.png",
  },
];

export const Scene03Tools: React.FC = () => {
  const frame = useCurrentFrame();
  // 60 frames (2.0s) per tool: 360 frames total
  const toolIndex = Math.min(Math.floor(frame / 60), toolsData.length - 1);
  const currentTool = toolsData[toolIndex];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 35%, #3a0d7d 0%, #24084f 55%, #140230 100%)",
        padding: "200px 80px 260px 80px",
        fontFamily: "'Sora', sans-serif",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "12px 28px", background: "rgba(255,255,255,0.1)", borderRadius: 9999, fontSize: 28, fontWeight: 700 }}>
        PlayComun Online · Herramientas Reales
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, fontWeight: 800, textTransform: "uppercase", color: "#ffffff" }}>
          {currentTool.verb}
        </div>
        <div style={{ fontSize: 32, color: "#ddd6fe", fontWeight: 600 }}>
          {currentTool.sub}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          background: "#ffffff",
          borderRadius: 36,
          padding: 44,
          color: "#0F172A",
          boxShadow: "0 35px 70px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>
            {currentTool.tag}
          </span>
          <span style={{ fontSize: 28, fontWeight: 700, background: "#DCFCE7", color: "#15803D", padding: "6px 16px", borderRadius: 12 }}>
            En vivo
          </span>
        </div>

        <div style={{ fontSize: 44, fontWeight: 800 }}>{currentTool.title}</div>
        <div style={{ fontSize: 30, color: "#64748B" }}>{currentTool.desc}</div>

        <div style={{ width: "100%", height: 440, borderRadius: 20, overflow: "hidden", border: "2px solid #E2E8F0" }}>
          <Img src={staticFile(currentTool.img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{ background: "#F5F3FF", padding: "20px 28px", borderRadius: 18, fontSize: 30, fontWeight: 800, color: "#7C3AED", textAlign: "center" }}>
          {currentTool.result}
        </div>
      </div>

      {/* Progress Bars */}
      <div style={{ display: "flex", gap: 12, width: "100%", justifyContent: "center" }}>
        {toolsData.map((_, i) => (
          <div
            key={i}
            style={{
              height: 8,
              flex: 1,
              maxWidth: 120,
              borderRadius: 4,
              background: i === toolIndex ? "#8249F1" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
