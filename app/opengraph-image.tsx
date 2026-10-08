import { ImageResponse } from "next/og";

export const alt = "DCV LIFE OS: tu sistema operativo personal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(202,162,74,0.28), rgba(10,10,10,0) 55%)",
          color: "#f4f3ef",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          <span>DCV</span>
          <span style={{ color: "#caa24a", marginLeft: 28 }}>LIFE OS</span>
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#8f8c85", marginTop: 28 }}>
          Tu sistema operativo personal.
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 56 }}>
          Organiza tu vida. Construye tu progreso.
        </div>
      </div>
    ),
    { ...size }
  );
}