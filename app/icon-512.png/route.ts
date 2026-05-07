import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

function WikiAirIcon(size: number) {
  const scale = size / 512;
  const s = (value: number) => value * scale;

  return React.createElement(
    "div",
    {
      style: {
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        borderRadius: s(110),
        position: "relative",
        overflow: "hidden"
      }
    },
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(380),
        height: s(380),
        borderRadius: "50%",
        border: `${s(14)}px solid #d4af37`,
        boxSizing: "border-box"
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(256),
        height: s(256),
        borderRadius: "50%",
        border: `${s(5)}px solid rgba(0,217,255,0.55)`,
        boxSizing: "border-box"
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(62),
        height: s(292),
        background: "#d4af37",
        clipPath: "polygon(50% 0%, 72% 38%, 100% 62%, 67% 62%, 58% 100%, 42% 100%, 33% 62%, 0% 62%, 28% 38%)",
        transform: "rotate(0deg)",
        filter: "drop-shadow(0 0 18px rgba(212,175,55,0.35))"
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(270),
        height: s(52),
        background: "#d4af37",
        clipPath: "polygon(0% 45%, 43% 26%, 50% 0%, 57% 26%, 100% 45%, 100% 62%, 58% 55%, 54% 100%, 46% 100%, 42% 55%, 0% 62%)",
        top: s(250),
        left: s(121)
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(18),
        height: s(118),
        background: "rgba(255,241,168,0.75)",
        borderRadius: s(20),
        top: s(118),
        left: s(247)
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(22),
        height: s(22),
        borderRadius: "50%",
        background: "#00e5ff",
        top: s(138),
        right: s(136)
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        width: s(112),
        height: s(8),
        background: "#00e5ff",
        top: s(184),
        right: s(146),
        transform: "rotate(-45deg)",
        borderRadius: s(20),
        opacity: 0.75
      }
    })
  );
}

export async function GET() {
  return new ImageResponse(WikiAirIcon(512), {
    width: 512,
    height: 512
  });
}
