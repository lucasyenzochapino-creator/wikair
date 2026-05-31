"use client";
export default function BackButton({ label = "← Volver" }: { label?: string }) {
  return (
    <button
      className="back"
      onClick={() => window.history.back()}
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", color: "inherit" }}
    >
      {label}
    </button>
  );
}
