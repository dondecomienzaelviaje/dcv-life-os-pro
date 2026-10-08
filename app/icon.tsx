import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          border: "3px solid #caa24a",
          borderRadius: 16,
          color: "#caa24a",
          fontSize: 38,
          fontWeight: 700,
        }}
      >
        D
      </div>
    ),
    { ...size }
  );
}