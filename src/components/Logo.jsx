import React from "react";

function Logo({
  size = 130,
  text = "SF",
  fontSize,
  clickable = false,
}) {

  const logoSize = size;
  const ringSize = size + 15;
  const haloSize = size + 50;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Halo */}
      <div
        style={{
          position: "absolute",
          width: haloSize,
          height: haloSize,
          borderRadius: "50%",
          background: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), transparent 45%),
            linear-gradient(
              160deg,
              var(--gradient-start),
              var(--gradient-end),
              var(--surface2)
            )
          `,
          filter: "blur(20px)",
          animation: "pulseGlow 5s ease-in-out infinite",
        }}
      />

      {/* Anneau */}
      <div
        style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.15)",
          boxShadow: `
            0 0 30px var(--glow-color),
            0 0 80px var(--gradient-end)
          `,
          animation: "rotateRing 12s linear infinite",
        }}
      />

      {/* Cercle principal */}
      <div
        style={{
          position: "relative",
          width: logoSize,
          height: logoSize,
          borderRadius: "50%",
          background: `
            linear-gradient(
              145deg,
              var(--gradient-start),
              var(--accent),
              var(--gradient-end)
            )
          `,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.18)",
          cursor: clickable ? "pointer" : "default",
          boxShadow: `
            inset 0 2px 8px rgba(255,255,255,.2),
            inset 0 -8px 20px rgba(0,0,0,.3),
            0 20px 50px var(--glow-color),
            0 8px 20px rgba(0,0,0,.4)
          `,
        }}
      >
        {/* Reflet */}
        <div
          style={{
            position: "absolute",
            top: size * 0.08,
            left: size * 0.15,
            width: size * 0.45,
            height: size * 0.18,
            borderRadius: "50%",
            background: "rgba(255,255,255,.28)",
            filter: "blur(8px)",
            transform: "rotate(-20deg)",
          }}
        />

        {/* Texte */}
        <span
          style={{
            zIndex: 2,
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: fontSize || size * 0.38,
            letterSpacing: "2px",
            background:
              "linear-gradient(180deg,#ffffff,#dbeafe,#a5b4fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 18px rgba(255,255,255,.35)",
            userSelect: "none",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export default Logo;