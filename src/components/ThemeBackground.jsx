// // // // // Background 
// // // // // src/components/ThemeBackground.jsx
// // // // import { useEffect, useRef } from "react";
// // // // // ============================================================
// // // // // 20 IDENTITÉS VISUELLES — Dark & Light
// // // // // ============================================================
// // // // const THEMES = {
// // // //   // ===== GALAXY — Espace, cosmos, mystère =====
// // // //   "dark-galaxy": {
// // // //     bg: "linear-gradient(135deg, #050818 0%, #0d0628 40%, #1a0540 70%, #0a1628 100%)",
// // // //     glow1: [99,102,241], glow2: [168,85,247],
// // // //     particles: { color: [200,190,255], count: 180, type: "cosmic-stars", nebula: true },
// // // //   },
// // // //   "light-galaxy": {
// // // //     bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
// // // //     glow1: [99,102,241], glow2: [139,92,246],
// // // //     particles: { color: [99,102,241], count: 80, type: "cosmic-stars", nebula: false },
// // // //   },
// // // //   // ===== SIMPLE — Bleu classique, professionnel =====
// // // //   "dark-simple": {
// // // //     bg: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1e293b 100%)",
// // // //     glow1: [59,130,246], glow2: [96,165,250],
// // // //     particles: { color: [148,163,184], count: 90, type: "floating-dots", nebula: true },
// // // //   },
// // // //   "light-simple": {
// // // //     bg: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)",
// // // //     glow1: [59,130,246], glow2: [96,165,250],
// // // //     particles: { color: [59,130,246], count: 90, type: "floating-dots", nebula: false },
// // // //   },
// // // //   // ===== LUXURY — Or, prestige, richesse =====
// // // //   "dark-luxury": {
// // // //     bg: "linear-gradient(135deg, #0a0800 0%, #1a1200 35%, #2a1e00 65%, #1a1000 100%)",
// // // //     glow1: [212,175,55], glow2: [245,215,110],
// // // //     particles: { color: [212,175,55], count: 100, type: "gold-dust", nebula: true },
// // // //   },
// // // //   "light-luxury": {
// // // //     bg: "linear-gradient(135deg, #faf8f0 0%, #fff8e1 50%, #fef3c7 100%)",
// // // //     glow1: [212,175,55], glow2: [184,134,11],
// // // //     particles: { color: [184,134,11], count: 60, type: "gold-dust", nebula: false },
// // // //   },
// // // //   // ===== EXOTIC — Orange feu, chaleur tropicale =====
// // // //   "dark-exotic": {
// // // //     bg: "linear-gradient(135deg, #1c0800 0%, #2d1200 50%, #3d1800 100%)",
// // // //     glow1: [249,115,22], glow2: [251,146,60],
// // // //     particles: { color: [253,186,116], count: 90, type: "fireflies", nebula: true },
// // // //   },
// // // //   "light-exotic": {
// // // //     bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)",
// // // //     glow1: [249,115,22], glow2: [234,88,12],
// // // //     particles: { color: [234,88,12], count: 60, type: "fireflies", nebula: false },
// // // //   },
// // // //   // ===== VERDATRE — Nature, forêt, menthe =====
// // // //   "dark-verdatre": {
// // // //     bg: "linear-gradient(135deg, #020f08 0%, #022c22 50%, #064e3b 100%)",
// // // //     glow1: [16,185,129], glow2: [52,211,153],
// // // //     particles: { color: [110,231,183], count: 100, type: "nature", nebula: true },
// // // //   },
// // // //   "light-verdatre": {
// // // //     bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 60%, #a7f3d0 100%)",
// // // //     glow1: [16,185,129], glow2: [5,150,105],
// // // //     particles: { color: [5,150,105], count: 60, type: "nature", nebula: false },
// // // //   },
// // // //   // ===== GLAMOUR — Rose, magenta, élégance =====
// // // //   "dark-glamour": {
// // // //     bg: "linear-gradient(135deg, #1a0510 0%, #2d0a1e 50%, #3f0d2a 100%)",
// // // //     glow1: [219,39,119], glow2: [244,114,182],
// // // //     particles: { color: [249,168,212], count: 120, type: "hearts", nebula: true },
// // // //   },
// // // //   "light-glamour": {
// // // //     bg: "linear-gradient(135deg, #fff0f6 0%, #fce7f3 60%, #fbcfe8 100%)",
// // // //     glow1: [219,39,119], glow2: [190,24,93],
// // // //     particles: { color: [190,24,93], count: 60, type: "hearts", nebula: false },
// // // //   },
// // // //   // ===== GRAPHITE — Minimaliste, sobre, béton =====
// // // //   "dark-graphite": {
// // // //     bg: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)",
// // // //     glow1: [113,113,122], glow2: [161,161,170],
// // // //     particles: { color: [161,161,170], count: 80, type: "metal-dust", nebula: false },
// // // //   },
// // // //   "light-graphite": {
// // // //     bg: "linear-gradient(135deg, #fafafa 0%, #f4f4f5 60%, #e4e4e7 100%)",
// // // //     glow1: [82,82,91], glow2: [63,63,70],
// // // //     particles: { color: [82,82,91], count: 40, type: "metal-dust", nebula: false },
// // // //   },
// // // //   // ===== VOLCANIC — Lave, feu, explosion =====
// // // //   "dark-volcanic": {
// // // //     bg: "linear-gradient(135deg, #1a0000 0%, #2d0505 40%, #450a0a 70%, #2a0000 100%)",
// // // //     glow1: [239,68,68], glow2: [249,115,22],
// // // //     particles: { color: [252,165,165], count: 90, type: "lava-sparks", nebula: true },
// // // //   },
// // // //   "light-volcanic": {
// // // //     bg: "linear-gradient(135deg, #fff5f5 0%, #fee2e2 60%, #fecaca 100%)",
// // // //     glow1: [239,68,68], glow2: [185,28,28],
// // // //     particles: { color: [185,28,28], count: 50, type: "lava-sparks", nebula: false },
// // // //   },
// // // //   // ===== OCEANIC — Mer profonde, vagues =====
// // // //   "dark-oceanic": {
// // // //     bg: "linear-gradient(135deg, #020d1a 0%, #082f49 50%, #0c4a6e 100%)",
// // // //     glow1: [14,165,233], glow2: [56,189,248],
// // // //     particles: { color: [125,211,252], count: 120, type: "water-bubbles", nebula: true },
// // // //   },
// // // //   "light-oceanic": {
// // // //     bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 60%, #bae6fd 100%)",
// // // //     glow1: [14,165,233], glow2: [2,132,199],
// // // //     particles: { color: [2,132,199], count: 60, type: "water-bubbles", nebula: false },
// // // //   },
// // // //   // ===== MODERN — Tech, futuriste, épuré =====
// // // //   "dark-modern": {
// // // //     bg: "linear-gradient(135deg, #010409 0%, #0d1117 50%, #161b22 100%)",
// // // //     glow1: [59,130,246], glow2: [99,102,241],
// // // //     particles: { color: [148,163,184], count: 100, type: "digital-grid", nebula: false },
// // // //   },
// // // //   "light-modern": {
// // // //     bg: "linear-gradient(135deg, #f5f7fb 0%, #eff6ff 60%, #dbeafe 100%)",
// // // //     glow1: [37,99,235], glow2: [59,130,246],
// // // //     particles: { color: [37,99,235], count: 50, type: "digital-grid", nebula: false },
// // // //   },
// // // // };
// // // // const DEFAULT = THEMES["dark-galaxy"];
// // // // export function getTheme(name) {
// // // //   return THEMES[name] || DEFAULT;
// // // // }
// // // // export const THEME_NAMES = Object.keys(THEMES);
// // // // // ============================================================
// // // // // COMPOSANT
// // // // // ============================================================
// // // // function ThemeBackground({ theme = "dark-galaxy" }) {
// // // //   const canvasRef = useRef(null);
// // // //   const cfg = getTheme(theme);
// // // //   useEffect(() => {
// // // //     const canvas = canvasRef.current;
// // // //     const ctx = canvas.getContext("2d");
// // // //     const resize = () => {
// // // //       canvas.width  = window.innerWidth;
// // // //       canvas.height = window.innerHeight;
// // // //     };
// // // //     resize();
// // // //     window.addEventListener("resize", resize);
// // // //     // Construire les particules
// // // //     const particles = buildParticles(cfg, canvas);
// // // //     let frame;
// // // //     const animate = () => {
// // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //       particles.forEach(p => {
// // // //         update(p, canvas);
// // // //         draw(ctx, p, cfg);
// // // //       });
// // // //       frame = requestAnimationFrame(animate);
// // // //     };
// // // //     animate();
// // // //     return () => {
// // // //       cancelAnimationFrame(frame);
// // // //       window.removeEventListener("resize", resize);
// // // //     };
// // // //   }, [theme]);
// // // //   const [r1, g1, b1] = cfg.glow1;
// // // //   const [r2, g2, b2] = cfg.glow2;
// // // //   return (
// // // //     <>
// // // //       {/* Fond dégradé */}
// // // //       <div style={{
// // // //         position: "absolute", inset: 0, zIndex: 0,
// // // //         background: cfg.bg,
// // // //         transition: "background 0.8s ease",
// // // //       }} />
// // // //       {/* Lueurs */}
// // // //       <div style={{
// // // //         position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
// // // //         background: `
// // // //           radial-gradient(ellipse at 20% 30%,
// // // //             rgba(${r1},${g1},${b1},0.18) 0%, transparent 55%),
// // // //           radial-gradient(ellipse at 80% 70%,
// // // //             rgba(${r2},${g2},${b2},0.18) 0%, transparent 55%)
// // // //         `,
// // // //         animation: "glowPulse 6s ease-in-out infinite alternate",
// // // //       }} />
// // // //       {/* Particules canvas */}
// // // //       <canvas ref={canvasRef} style={{
// // // //         position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
// // // //       }} />
// // // //       <style>{`
// // // //         @keyframes glowPulse {
// // // //           from { opacity: 0.6; }
// // // //           to   { opacity: 1; }
// // // //         }
// // // //       `}</style>
// // // //     </>
// // // //   );
// // // // }
// // // // // ============================================================
// // // // // LOGIQUE PARTICULES
// // // // // ============================================================
// // // // function buildParticles(cfg, canvas) {
// // // //   const { count, type, nebula, color } = cfg.particles;
// // // //   const w = canvas.width;
// // // //   const h = canvas.height;
// // // //   const all = [];
// // // //   // Particules principales
// // // //   for (let i = 0; i < count; i++) {
// // // //     const p = {
// // // //       x: Math.random() * w,
// // // //       y: Math.random() * h,
// // // //       r: type === "gold" || type === "sparkles"
// // // //         ? Math.random() * 2.5 + 0.5
// // // //         : Math.random() * 1.5 + 0.3,
// // // //       alpha: Math.random(),
// // // //       speed: Math.random() * 0.007 + 0.002,
// // // //       color,
// // // //       type,
// // // //       isNebula: false,
// // // //     };
// // // //     // Comportements spéciaux
// // // //     if (type === "embers" || type === "gold") {
// // // //       p.dy = -(Math.random() * 0.4 + 0.1);
// // // //       p.dx = (Math.random() - 0.5) * 0.2;
// // // //     }
// // // //     if (type === "waves") {
// // // //       p.offset = Math.random() * Math.PI * 2;
// // // //       p.wy     = p.y;
// // // //     }
// // // //     if (type === "leaves") {
// // // //       p.angle = Math.random() * Math.PI * 2;
// // // //       p.spin  = (Math.random() - 0.5) * 0.02;
// // // //       p.dy    = -(Math.random() * 0.3 + 0.05);
// // // //     }
// // // //     if (type === "grid") {
// // // //       p.x = Math.floor(Math.random() * 30) * (w / 30);
// // // //       p.y = Math.floor(Math.random() * 20) * (h / 20);
// // // //     }
// // // //     all.push(p);
// // // //   }
// // // //   // Nébuleuses (uniquement dark)
// // // //   if (nebula) {
// // // //     for (let i = 0; i < 18; i++) {
// // // //       all.push({
// // // //         isNebula: true,
// // // //         x: Math.random() * w, y: Math.random() * h,
// // // //         r: Math.random() * 90 + 40,
// // // //         dx: (Math.random() - 0.5) * 0.06,
// // // //         dy: (Math.random() - 0.5) * 0.06,
// // // //         hue: Math.random() > 0.5 ? cfg.glow1 : cfg.glow2,
// // // //         alpha: 0,
// // // //       });
// // // //     }
// // // //   }
// // // //   return all;
// // // // }
// // // // function update(p, canvas) {
// // // //   if (p.isNebula) {
// // // //     p.x += p.dx; p.y += p.dy;
// // // //     if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
// // // //     if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
// // // //     return;
// // // //   }
// // // //   p.alpha += p.speed;
// // // //   if (p.alpha > 1 || p.alpha < 0.05) p.speed *= -1;
// // // //   if (p.dy !== undefined) {
// // // //     p.y += p.dy;
// // // //     p.x += p.dx || 0;
// // // //     if (p.y < -10) {
// // // //       p.y = canvas.height + 10;
// // // //       p.x = Math.random() * canvas.width;
// // // //     }
// // // //   }
// // // //   if (p.offset !== undefined) {
// // // //     p.offset += 0.015;
// // // //     p.alpha = (Math.sin(p.offset) + 1) / 2 * 0.7;
// // // //   }
// // // //   if (p.spin !== undefined) {
// // // //     p.angle += p.spin;
// // // //   }
// // // // }
// // // // function draw(ctx, p, cfg) {
// // // //   if (p.isNebula) {
// // // //     const [r, g, b] = p.hue;
// // // //     const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
// // // //     grad.addColorStop(0, `rgba(${r},${g},${b},0.07)`);
// // // //     grad.addColorStop(1, "rgba(0,0,0,0)");
// // // //     ctx.fillStyle = grad;
// // // //     ctx.beginPath();
// // // //     ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // // //     ctx.fill();
// // // //     return;
// // // //   }
// // // //   const [r, g, b] = p.color;
// // // //   const a = Math.max(0, Math.min(1, p.alpha));
// // // //   if (p.type === "sparkles" || p.type === "gold") {
// // // //     // Étoile à 4 branches
// // // // ctx.save();
// // // //     ctx.translate(p.x, p.y);
// // // //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // // //     ctx.beginPath();
// // // //     for (let i = 0; i < 4; i++) {
// // // //       ctx.rotate(Math.PI / 2);
// // // //       ctx.lineTo(0, p.r * 2);
// // // //       ctx.lineTo(p.r * 0.4, p.r * 0.4);
// // // //     }
// // // //     ctx.closePath();
// // // //     ctx.fill();
// // // //     ctx.restore();
// // // //     return;
// // // //   }
// // // //   if (p.type === "leaves") {
// // // // ctx.save();
// // // //     ctx.translate(p.x, p.y);
// // // //     ctx.rotate(p.angle);
// // // //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // // //     ctx.beginPath();
// // // //     ctx.ellipse(0, 0, p.r * 3, p.r, 0, 0, Math.PI * 2);
// // // //     ctx.fill();
// // // //     ctx.restore();
// // // //     return;
// // // //   }
// // // //   if (p.type === "grid") {
// // // //     ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.4})`;
// // // //     ctx.fillRect(p.x, p.y, 1, 1);
// // // //     return;
// // // //   }
// // // //   // Défaut — point circulaire
// // // //   ctx.beginPath();
// // // //   ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // // //   ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // // //   ctx.fill();
// // // // }
// // // // export default ThemeBackground;


// // // /**
// // //  * ThemeBackground.jsx — fond animé multi-thèmes (dark / light)
// // //  *
// // //  * Améliorations :
// // //  * - Types de particules alignés avec chaque identité (galaxy, luxury, oceanic…)
// // //  * - Nébuleuses, étoiles, poussière d’or, lucioles, bulles, grille tech…
// // //  * - Densité réduite sur mobile / prefers-reduced-motion
// // //  * - Resize + DPR correct, cleanup propre
// // //  */

// // // import { useEffect, useRef } from "react";

// // // /* ============================================================
// // //    20 IDENTITÉS VISUELLES
// // //    ============================================================ */
// // // const THEMES = {
// // //   "dark-galaxy": {
// // //     bg: "linear-gradient(135deg, #050818 0%, #0d0628 40%, #1a0540 70%, #0a1628 100%)",
// // //     glow1: [99, 102, 241],
// // //     glow2: [168, 85, 247],
// // //     particles: { color: [200, 190, 255], count: 160, type: "cosmic-stars", nebula: true },
// // //   },
// // //   "light-galaxy": {
// // //     bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
// // //     glow1: [99, 102, 241],
// // //     glow2: [139, 92, 246],
// // //     particles: { color: [99, 102, 241], count: 70, type: "cosmic-stars", nebula: false },
// // //   },
// // //   "dark-simple": {
// // //     bg: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1e293b 100%)",
// // //     glow1: [59, 130, 246],
// // //     glow2: [96, 165, 250],
// // //     particles: { color: [148, 163, 184], count: 80, type: "floating-dots", nebula: true },
// // //   },
// // //   "light-simple": {
// // //     bg: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)",
// // //     glow1: [59, 130, 246],
// // //     glow2: [96, 165, 250],
// // //     particles: { color: [59, 130, 246], count: 50, type: "floating-dots", nebula: false },
// // //   },
// // //   "dark-luxury": {
// // //     bg: "linear-gradient(135deg, #0a0800 0%, #1a1200 35%, #2a1e00 65%, #1a1000 100%)",
// // //     glow1: [212, 175, 55],
// // //     glow2: [245, 215, 110],
// // //     particles: { color: [212, 175, 55], count: 90, type: "gold-dust", nebula: true },
// // //   },
// // //   "light-luxury": {
// // //     bg: "linear-gradient(135deg, #faf8f0 0%, #fff8e1 50%, #fef3c7 100%)",
// // //     glow1: [212, 175, 55],
// // //     glow2: [184, 134, 11],
// // //     particles: { color: [184, 134, 11], count: 50, type: "gold-dust", nebula: false },
// // //   },
// // //   "dark-exotic": {
// // //     bg: "linear-gradient(135deg, #1c0800 0%, #2d1200 50%, #3d1800 100%)",
// // //     glow1: [249, 115, 22],
// // //     glow2: [251, 146, 60],
// // //     particles: { color: [253, 186, 116], count: 80, type: "fireflies", nebula: true },
// // //   },
// // //   "light-exotic": {
// // //     bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)",
// // //     glow1: [249, 115, 22],
// // //     glow2: [234, 88, 12],
// // //     particles: { color: [234, 88, 12], count: 45, type: "fireflies", nebula: false },
// // //   },
// // //   "dark-verdatre": {
// // //     bg: "linear-gradient(135deg, #020f08 0%, #022c22 50%, #064e3b 100%)",
// // //     glow1: [16, 185, 129],
// // //     glow2: [52, 211, 153],
// // //     particles: { color: [110, 231, 183], count: 70, type: "nature", nebula: true },
// // //   },
// // //   "light-verdatre": {
// // //     bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 60%, #a7f3d0 100%)",
// // //     glow1: [16, 185, 129],
// // //     glow2: [5, 150, 105],
// // //     particles: { color: [5, 150, 105], count: 40, type: "nature", nebula: false },
// // //   },
// // //   "dark-glamour": {
// // //     bg: "linear-gradient(135deg, #1a0510 0%, #2d0a1e 50%, #3f0d2a 100%)",
// // //     glow1: [219, 39, 119],
// // //     glow2: [244, 114, 182],
// // //     particles: { color: [249, 168, 212], count: 90, type: "hearts", nebula: true },
// // //   },
// // //   "light-glamour": {
// // //     bg: "linear-gradient(135deg, #fff0f6 0%, #fce7f3 60%, #fbcfe8 100%)",
// // //     glow1: [219, 39, 119],
// // //     glow2: [190, 24, 93],
// // //     particles: { color: [190, 24, 93], count: 45, type: "hearts", nebula: false },
// // //   },
// // //   "dark-graphite": {
// // //     bg: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)",
// // //     glow1: [113, 113, 122],
// // //     glow2: [161, 161, 170],
// // //     particles: { color: [161, 161, 170], count: 60, type: "metal-dust", nebula: false },
// // //   },
// // //   "light-graphite": {
// // //     bg: "linear-gradient(135deg, #fafafa 0%, #f4f4f5 60%, #e4e4e7 100%)",
// // //     glow1: [82, 82, 91],
// // //     glow2: [63, 63, 70],
// // //     particles: { color: [82, 82, 91], count: 35, type: "metal-dust", nebula: false },
// // //   },
// // //   "dark-volcanic": {
// // //     bg: "linear-gradient(135deg, #1a0000 0%, #2d0505 40%, #450a0a 70%, #2a0000 100%)",
// // //     glow1: [239, 68, 68],
// // //     glow2: [249, 115, 22],
// // //     particles: { color: [252, 165, 165], count: 85, type: "lava-sparks", nebula: true },
// // //   },
// // //   "light-volcanic": {
// // //     bg: "linear-gradient(135deg, #fff5f5 0%, #fee2e2 60%, #fecaca 100%)",
// // //     glow1: [239, 68, 68],
// // //     glow2: [185, 28, 28],
// // //     particles: { color: [185, 28, 28], count: 40, type: "lava-sparks", nebula: false },
// // //   },
// // //   "dark-oceanic": {
// // //     bg: "linear-gradient(135deg, #020d1a 0%, #082f49 50%, #0c4a6e 100%)",
// // //     glow1: [14, 165, 233],
// // //     glow2: [56, 189, 248],
// // //     particles: { color: [125, 211, 252], count: 100, type: "water-bubbles", nebula: true },
// // //   },
// // //   "light-oceanic": {
// // //     bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 60%, #bae6fd 100%)",
// // //     glow1: [14, 165, 233],
// // //     glow2: [2, 132, 199],
// // //     particles: { color: [2, 132, 199], count: 50, type: "water-bubbles", nebula: false },
// // //   },
// // //   "dark-modern": {
// // //     bg: "linear-gradient(135deg, #010409 0%, #0d1117 50%, #161b22 100%)",
// // //     glow1: [59, 130, 246],
// // //     glow2: [99, 102, 241],
// // //     particles: { color: [148, 163, 184], count: 70, type: "digital-grid", nebula: false },
// // //   },
// // //   "light-modern": {
// // //     bg: "linear-gradient(135deg, #f5f7fb 0%, #eff6ff 60%, #dbeafe 100%)",
// // //     glow1: [37, 99, 235],
// // //     glow2: [59, 130, 246],
// // //     particles: { color: [37, 99, 235], count: 40, type: "digital-grid", nebula: false },
// // //   },
// // // };

// // // const DEFAULT = THEMES["dark-galaxy"];

// // // export function getTheme(name) {
// // //   return THEMES[name] || DEFAULT;
// // // }

// // // export const THEME_NAMES = Object.keys(THEMES);

// // // /* ============================================================
// // //    COMPOSANT
// // //    ============================================================ */
// // // function ThemeBackground({ theme = "dark-galaxy" }) {
// // //   const canvasRef = useRef(null);
// // //   const cfg = getTheme(theme);

// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return;
// // //     const ctx = canvas.getContext("2d", { alpha: true });

// // //     const reduced =
// // //       typeof window !== "undefined" &&
// // //       window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

// // //     const isMobile =
// // //       typeof window !== "undefined" && window.innerWidth < 768;

// // //     let particles = [];
// // //     let frame = 0;
// // //     let running = true;

// // //     const resize = () => {
// // //       const dpr = Math.min(window.devicePixelRatio || 1, 2);
// // //       const w = window.innerWidth;
// // //       const h = window.innerHeight;
// // //       canvas.width = Math.floor(w * dpr);
// // //       canvas.height = Math.floor(h * dpr);
// // //       canvas.style.width = `${w}px`;
// // //       canvas.style.height = `${h}px`;
// // //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// // //       particles = buildParticles(cfg, w, h, { reduced, isMobile });
// // //     };

// // //     resize();
// // //     window.addEventListener("resize", resize);

// // //     const tick = () => {
// // //       if (!running) return;
// // //       const w = window.innerWidth;
// // //       const h = window.innerHeight;
// // //       ctx.clearRect(0, 0, w, h);
// // //       for (const p of particles) {
// // //         update(p, w, h);
// // //         draw(ctx, p);
// // //       }
// // //       frame = requestAnimationFrame(tick);
// // //     };

// // //     if (!reduced) tick();
// // //     else {
// // //       // Une seule frame statique
// // //       const w = window.innerWidth;
// // //       const h = window.innerHeight;
// // //       ctx.clearRect(0, 0, w, h);
// // //       for (const p of particles) draw(ctx, p);
// // //     }

// // //     return () => {
// // //       running = false;
// // //       cancelAnimationFrame(frame);
// // //       window.removeEventListener("resize", resize);
// // //     };
// // //   }, [theme]);

// // //   const [r1, g1, b1] = cfg.glow1;
// // //   const [r2, g2, b2] = cfg.glow2;

// // //   return (
// // //     <>
// // //       <div
// // //         style={{
// // //           position: "absolute",
// // //           inset: 0,
// // //           zIndex: 0,
// // //           background: cfg.bg,
// // //           transition: "background 0.8s ease",
// // //         }}
// // //       />
// // //       <div
// // //         style={{
// // //           position: "absolute",
// // //           inset: 0,
// // //           zIndex: 0,
// // //           pointerEvents: "none",
// // //           background: `
// // //             radial-gradient(ellipse at 20% 30%, rgba(${r1},${g1},${b1},0.16) 0%, transparent 55%),
// // //             radial-gradient(ellipse at 80% 70%, rgba(${r2},${g2},${b2},0.14) 0%, transparent 55%)
// // //           `,
// // //           animation: "tbGlowPulse 7s ease-in-out infinite alternate",
// // //         }}
// // //       />
// // //       <canvas
// // //         ref={canvasRef}
// // //         style={{
// // //           position: "absolute",
// // //           inset: 0,
// // //           zIndex: 0,
// // //           pointerEvents: "none",
// // //         }}
// // //       />
// // //       <style>{`
// // //         @keyframes tbGlowPulse {
// // //           from { opacity: 0.55; }
// // //           to   { opacity: 1; }
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // }

// // // /* ============================================================
// // //    PARTICULES
// // //    ============================================================ */
// // // function buildParticles(cfg, w, h, { reduced, isMobile }) {
// // //   const { type, nebula, color } = cfg.particles;
// // //   let count = cfg.particles.count;
// // //   if (isMobile) count = Math.floor(count * 0.45);
// // //   if (reduced) count = Math.floor(count * 0.25);

// // //   const all = [];

// // //   for (let i = 0; i < count; i++) {
// // //     const p = {
// // //       x: Math.random() * w,
// // //       y: Math.random() * h,
// // //       r: 0.4 + Math.random() * 1.8,
// // //       alpha: 0.15 + Math.random() * 0.7,
// // //       speed: 0.002 + Math.random() * 0.008,
// // //       color,
// // //       type,
// // //       isNebula: false,
// // //       phase: Math.random() * Math.PI * 2,
// // //     };

// // //     switch (type) {
// // //       case "cosmic-stars":
// // //         p.r = 0.3 + Math.random() * 1.6;
// // //         p.twinkle = 0.004 + Math.random() * 0.01;
// // //         break;
// // //       case "gold-dust":
// // //         p.r = 0.5 + Math.random() * 2.2;
// // //         p.dy = -(0.08 + Math.random() * 0.35);
// // //         p.dx = (Math.random() - 0.5) * 0.25;
// // //         break;
// // //       case "fireflies":
// // //         p.r = 1 + Math.random() * 2;
// // //         p.dx = (Math.random() - 0.5) * 0.35;
// // //         p.dy = (Math.random() - 0.5) * 0.35;
// // //         p.twinkle = 0.01 + Math.random() * 0.02;
// // //         break;
// // //       case "nature":
// // //         p.r = 1.2 + Math.random() * 2;
// // //         p.angle = Math.random() * Math.PI * 2;
// // //         p.spin = (Math.random() - 0.5) * 0.03;
// // //         p.dy = 0.15 + Math.random() * 0.35;
// // //         p.dx = (Math.random() - 0.5) * 0.4;
// // //         break;
// // //       case "hearts":
// // //         p.r = 2 + Math.random() * 3;
// // //         p.dy = -(0.12 + Math.random() * 0.3);
// // //         p.dx = (Math.random() - 0.5) * 0.2;
// // //         break;
// // //       case "metal-dust":
// // //         p.r = 0.4 + Math.random() * 1.2;
// // //         p.dx = (Math.random() - 0.5) * 0.15;
// // //         p.dy = (Math.random() - 0.5) * 0.15;
// // //         break;
// // //       case "lava-sparks":
// // //         p.r = 0.6 + Math.random() * 2;
// // //         p.dy = -(0.4 + Math.random() * 1.2);
// // //         p.dx = (Math.random() - 0.5) * 0.5;
// // //         p.life = Math.random();
// // //         break;
// // //       case "water-bubbles":
// // //         p.r = 1 + Math.random() * 4;
// // //         p.dy = -(0.2 + Math.random() * 0.6);
// // //         p.dx = Math.sin(p.phase) * 0.3;
// // //         p.wobble = 0.02 + Math.random() * 0.03;
// // //         break;
// // //       case "digital-grid":
// // //         p.x = Math.floor(Math.random() * 28) * (w / 28);
// // //         p.y = Math.floor(Math.random() * 18) * (h / 18);
// // //         p.r = 1;
// // //         p.pulse = Math.random() * Math.PI * 2;
// // //         break;
// // //       default: // floating-dots
// // //         p.dx = (Math.random() - 0.5) * 0.12;
// // //         p.dy = (Math.random() - 0.5) * 0.12;
// // //         break;
// // //     }

// // //     all.push(p);
// // //   }

// // //   if (nebula && !reduced) {
// // //     const nCount = isMobile ? 8 : 16;
// // //     for (let i = 0; i < nCount; i++) {
// // //       all.push({
// // //         isNebula: true,
// // //         x: Math.random() * w,
// // //         y: Math.random() * h,
// // //         r: 50 + Math.random() * 100,
// // //         dx: (Math.random() - 0.5) * 0.05,
// // //         dy: (Math.random() - 0.5) * 0.05,
// // //         hue: Math.random() > 0.5 ? cfg.glow1 : cfg.glow2,
// // //       });
// // //     }
// // //   }

// // //   return all;
// // // }

// // // function update(p, w, h) {
// // //   if (p.isNebula) {
// // //     p.x += p.dx;
// // //     p.y += p.dy;
// // //     if (p.x < -p.r || p.x > w + p.r) p.dx *= -1;
// // //     if (p.y < -p.r || p.y > h + p.r) p.dy *= -1;
// // //     return;
// // //   }

// // //   p.phase = (p.phase || 0) + (p.twinkle || p.speed || 0.005);

// // //   if (p.twinkle != null) {
// // //     p.alpha = 0.2 + (Math.sin(p.phase) + 1) * 0.4;
// // //   } else {
// // //     p.alpha += p.speed;
// // //     if (p.alpha > 0.95 || p.alpha < 0.08) p.speed *= -1;
// // //   }

// // //   if (p.dx != null) p.x += p.dx;
// // //   if (p.dy != null) p.y += p.dy;

// // //   if (p.wobble) {
// // //     p.x += Math.sin(p.phase) * p.wobble * 8;
// // //   }

// // //   if (p.spin != null) p.angle = (p.angle || 0) + p.spin;

// // //   if (p.pulse != null) {
// // //     p.pulse += 0.03;
// // //     p.alpha = 0.15 + (Math.sin(p.pulse) + 1) * 0.25;
// // //   }

// // //   // wrap
// // //   if (p.type === "lava-sparks" || p.type === "gold-dust" || p.type === "hearts") {
// // //     if (p.y < -12) {
// // //       p.y = h + 8;
// // //       p.x = Math.random() * w;
// // //     }
// // //   } else if (p.type === "water-bubbles") {
// // //     if (p.y < -15) {
// // //       p.y = h + 10;
// // //       p.x = Math.random() * w;
// // //     }
// // //   } else if (p.type === "nature") {
// // //     if (p.y > h + 15) {
// // //       p.y = -10;
// // //       p.x = Math.random() * w;
// // //     }
// // //   } else {
// // //     if (p.x < -5) p.x = w + 5;
// // //     if (p.x > w + 5) p.x = -5;
// // //     if (p.y < -5) p.y = h + 5;
// // //     if (p.y > h + 5) p.y = -5;
// // //   }
// // // }

// // // function draw(ctx, p) {
// // //   if (p.isNebula) {
// // //     const [r, g, b] = p.hue;
// // //     const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
// // //     grad.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
// // //     grad.addColorStop(1, "rgba(0,0,0,0)");
// // //     ctx.fillStyle = grad;
// // //     ctx.beginPath();
// // //     ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // //     ctx.fill();
// // //     return;
// // //   }

// // //   const [r, g, b] = p.color;
// // //   const a = Math.max(0, Math.min(1, p.alpha));

// // //   if (p.type === "cosmic-stars" || p.type === "gold-dust") {
// // //     // croix / éclat
// // //     ctx.save();
// // //     ctx.translate(p.x, p.y);
// // //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // //     ctx.beginPath();
// // //     for (let i = 0; i < 4; i++) {
// // //       ctx.rotate(Math.PI / 2);
// // //       ctx.lineTo(0, p.r * 2.2);
// // //       ctx.lineTo(p.r * 0.35, p.r * 0.35);
// // //     }
// // //     ctx.closePath();
// // //     ctx.fill();
// // //     // cœur brillant
// // //     ctx.beginPath();
// // //     ctx.arc(0, 0, p.r * 0.45, 0, Math.PI * 2);
// // //     ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`;
// // //     ctx.fill();
// // //     ctx.restore();
// // //     return;
// // //   }

// // //   if (p.type === "hearts") {
// // //     ctx.save();
// // //     ctx.translate(p.x, p.y);
// // //     ctx.scale(p.r / 6, p.r / 6);
// // //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // //     ctx.beginPath();
// // //     ctx.moveTo(0, 3);
// // //     ctx.bezierCurveTo(-5, -2, -5, -6, 0, -4);
// // //     ctx.bezierCurveTo(5, -6, 5, -2, 0, 3);
// // //     ctx.fill();
// // //     ctx.restore();
// // //     return;
// // //   }

// // //   if (p.type === "nature") {
// // //     ctx.save();
// // //     ctx.translate(p.x, p.y);
// // //     ctx.rotate(p.angle || 0);
// // //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // //     ctx.beginPath();
// // //     ctx.ellipse(0, 0, p.r * 2.5, p.r * 0.9, 0, 0, Math.PI * 2);
// // //     ctx.fill();
// // //     ctx.restore();
// // //     return;
// // //   }

// // //   if (p.type === "digital-grid") {
// // //     ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.55})`;
// // //     ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
// // //     // fine croix
// // //     ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.25})`;
// // //     ctx.lineWidth = 0.5;
// // //     ctx.beginPath();
// // //     ctx.moveTo(p.x - 4, p.y);
// // //     ctx.lineTo(p.x + 4, p.y);
// // //     ctx.moveTo(p.x, p.y - 4);
// // //     ctx.lineTo(p.x, p.y + 4);
// // //     ctx.stroke();
// // //     return;
// // //   }

// // //   if (p.type === "water-bubbles") {
// // //     ctx.beginPath();
// // //     ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // //     ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.7})`;
// // //     ctx.lineWidth = 1;
// // //     ctx.stroke();
// // //     ctx.beginPath();
// // //     ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.25, 0, Math.PI * 2);
// // //     ctx.fillStyle = `rgba(255,255,255,${a * 0.35})`;
// // //     ctx.fill();
// // //     return;
// // //   }

// // //   if (p.type === "fireflies" || p.type === "lava-sparks") {
// // //     const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
// // //     glow.addColorStop(0, `rgba(${r},${g},${b},${a})`);
// // //     glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
// // //     ctx.fillStyle = glow;
// // //     ctx.beginPath();
// // //     ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
// // //     ctx.fill();
// // //     ctx.beginPath();
// // //     ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
// // //     ctx.fillStyle = `rgba(255,255,220,${a})`;
// // //     ctx.fill();
// // //     return;
// // //   }

// // //   // floating-dots / metal-dust / défaut
// // //   ctx.beginPath();
// // //   ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // //   ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // //   ctx.fill();
// // // }

// // // export default ThemeBackground;
// // // // '''
// // // // )
// // // // print("written", Path("/home/workdir/artifacts/ThemeBackground.jsx").stat().st_size)
// // // // PY
// // // // from pathlib import Path
// // // // print("ok")



// // /**
// //  * ThemeBackground.jsx — fonds animés distincts (dark + light)
// //  * Galaxy = voie lactée ; light = contraste renforcé ; export themeCssVars
// //  */
// // import { useEffect, useRef } from "react";

// // const THEMES = {
// //   "dark-galaxy": {
// //     bg: "radial-gradient(ellipse at 50% 0%, #1a0b3c 0%, #0b0520 40%, #03010a 100%)",
// //     glow1: [129, 140, 248], glow2: [192, 132, 252], accent: "#a78bfa",
// //     particles: { color: [220, 210, 255], count: 220, type: "galaxy", nebula: true },
// //   },
// //   "light-galaxy": {
// //     bg: "linear-gradient(160deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)",
// //     glow1: [67, 56, 202], glow2: [109, 40, 217], accent: "#4f46e5",
// //     particles: { color: [49, 46, 129], count: 110, type: "galaxy", nebula: true, light: true },
// //   },
// //   "dark-simple": {
// //     bg: "linear-gradient(145deg, #0a0f1e 0%, #0f172a 55%, #1e293b 100%)",
// //     glow1: [59, 130, 246], glow2: [96, 165, 250], accent: "#3b82f6",
// //     particles: { color: [148, 163, 184], count: 70, type: "floating-dots", nebula: true },
// //   },
// //   "light-simple": {
// //     bg: "linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 60%, #94a3b8 100%)",
// //     glow1: [30, 64, 175], glow2: [37, 99, 235], accent: "#1d4ed8",
// //     particles: { color: [30, 58, 138], count: 55, type: "floating-dots", nebula: false, light: true },
// //   },
// //   "dark-luxury": {
// //     bg: "linear-gradient(145deg, #0c0a04 0%, #1a1408 40%, #2a1f0a 100%)",
// //     glow1: [212, 175, 55], glow2: [245, 215, 110], accent: "#d4af37",
// //     particles: { color: [255, 220, 120], count: 100, type: "gold-dust", nebula: true },
// //   },
// //   "light-luxury": {
// //     bg: "linear-gradient(145deg, #efe6c8 0%, #e8d9a8 50%, #d4b96a 100%)",
// //     glow1: [120, 90, 10], glow2: [161, 120, 20], accent: "#92400e",
// //     particles: { color: [92, 64, 8], count: 70, type: "gold-dust", nebula: false, light: true },
// //   },
// //   "dark-exotic": {
// //     bg: "linear-gradient(145deg, #1c0800 0%, #2d1200 50%, #3d1800 100%)",
// //     glow1: [249, 115, 22], glow2: [251, 146, 60], accent: "#f97316",
// //     particles: { color: [255, 200, 120], count: 90, type: "fireflies", nebula: true },
// //   },
// //   "light-exotic": {
// //     bg: "linear-gradient(145deg, #fed7aa 0%, #fdba74 55%, #fb923c 100%)",
// //     glow1: [154, 52, 18], glow2: [194, 65, 12], accent: "#9a3412",
// //     particles: { color: [124, 45, 18], count: 55, type: "fireflies", nebula: false, light: true },
// //   },
// //   "dark-verdatre": {
// //     bg: "linear-gradient(145deg, #020f08 0%, #022c22 50%, #064e3b 100%)",
// //     glow1: [16, 185, 129], glow2: [52, 211, 153], accent: "#10b981",
// //     particles: { color: [110, 231, 183], count: 75, type: "nature", nebula: true },
// //   },
// //   "light-verdatre": {
// //     bg: "linear-gradient(145deg, #a7f3d0 0%, #6ee7b7 55%, #34d399 100%)",
// //     glow1: [6, 95, 70], glow2: [4, 120, 87], accent: "#065f46",
// //     particles: { color: [6, 78, 59], count: 50, type: "nature", nebula: false, light: true },
// //   },
// //   "dark-glamour": {
// //     bg: "linear-gradient(145deg, #1a0510 0%, #2d0a1e 50%, #3f0d2a 100%)",
// //     glow1: [219, 39, 119], glow2: [244, 114, 182], accent: "#db2777",
// //     particles: { color: [251, 180, 220], count: 100, type: "hearts", nebula: true },
// //   },
// //   "light-glamour": {
// //     bg: "linear-gradient(145deg, #fbcfe8 0%, #f9a8d4 55%, #f472b6 100%)",
// //     glow1: [131, 24, 67], glow2: [157, 23, 77], accent: "#9d174d",
// //     particles: { color: [112, 26, 66], count: 55, type: "hearts", nebula: false, light: true },
// //   },
// //   "dark-graphite": {
// //     bg: "linear-gradient(180deg, #09090b 0%, #18181b 50%, #27272a 100%)",
// //     glow1: [113, 113, 122], glow2: [161, 161, 170], accent: "#a1a1aa",
// //     particles: { color: [180, 180, 190], count: 50, type: "metal-dust", nebula: false },
// //   },
// //   "light-graphite": {
// //     bg: "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 50%, #71717a 100%)",
// //     glow1: [39, 39, 42], glow2: [63, 63, 70], accent: "#27272a",
// //     particles: { color: [24, 24, 27], count: 40, type: "metal-dust", nebula: false, light: true },
// //   },
// //   "dark-volcanic": {
// //     bg: "linear-gradient(160deg, #1a0000 0%, #3b0a0a 50%, #1a0500 100%)",
// //     glow1: [239, 68, 68], glow2: [249, 115, 22], accent: "#ef4444",
// //     particles: { color: [255, 160, 100], count: 100, type: "lava-sparks", nebula: true },
// //   },
// //   "light-volcanic": {
// //     bg: "linear-gradient(160deg, #fca5a5 0%, #f87171 50%, #ef4444 100%)",
// //     glow1: [127, 29, 29], glow2: [153, 27, 27], accent: "#7f1d1d",
// //     particles: { color: [69, 10, 10], count: 50, type: "lava-sparks", nebula: false, light: true },
// //   },
// //   "dark-oceanic": {
// //     bg: "linear-gradient(180deg, #020d1a 0%, #0c4a6e 55%, #0369a1 100%)",
// //     glow1: [14, 165, 233], glow2: [56, 189, 248], accent: "#0ea5e9",
// //     particles: { color: [125, 211, 252], count: 110, type: "water-bubbles", nebula: true },
// //   },
// //   "light-oceanic": {
// //     bg: "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)",
// //     glow1: [12, 74, 110], glow2: [3, 105, 161], accent: "#075985",
// //     particles: { color: [12, 74, 110], count: 60, type: "water-bubbles", nebula: false, light: true },
// //   },
// //   "dark-modern": {
// //     bg: "linear-gradient(145deg, #010409 0%, #0d1117 50%, #161b22 100%)",
// //     glow1: [59, 130, 246], glow2: [34, 211, 238], accent: "#22d3ee",
// //     particles: { color: [34, 211, 238], count: 80, type: "digital-grid", nebula: false },
// //   },
// //   "light-modern": {
// //     bg: "linear-gradient(145deg, #bfdbfe 0%, #93c5fd 50%, #60a5fa 100%)",
// //     glow1: [30, 64, 175], glow2: [8, 145, 178], accent: "#1e40af",
// //     particles: { color: [30, 58, 138], count: 55, type: "digital-grid", nebula: false, light: true },
// //   },
// // };

// // const DEFAULT = THEMES["dark-galaxy"];
// // export function getTheme(name) { return THEMES[name] || DEFAULT; }
// // export const THEME_NAMES = Object.keys(THEMES);

// // export function themeCssVars(name) {
// //   const t = getTheme(name);
// //   const [r1, g1, b1] = t.glow1;
// //   const [r2, g2, b2] = t.glow2;
// //   const isLight = String(name).startsWith("light-");
// //   return {
// //     "--theme-accent": t.accent,
// //     "--theme-glow-1": `rgb(${r1},${g1},${b1})`,
// //     "--theme-glow-2": `rgb(${r2},${g2},${b2})`,
// //     "--theme-glow-soft": `rgba(${r1},${g1},${b1},${isLight ? 0.25 : 0.18})`,
// //     "--gradient-start": t.accent,
// //     "--gradient-end": `rgb(${r2},${g2},${b2})`,
// //     "--glow-color": `rgba(${r1},${g1},${b1},${isLight ? 0.3 : 0.35})`,
// //   };
// // }

// // function ThemeBackground({ theme = "dark-galaxy" }) {
// //   const canvasRef = useRef(null);
// //   const cfg = getTheme(theme);
// //   const isLight = String(theme).startsWith("light-");

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;
// //     const ctx = canvas.getContext("2d", { alpha: true });
// //     const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
// //     const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
// //     let particles = [];
// //     let frame = 0;
// //     let running = true;
// //     let t0 = performance.now();

// //     const resize = () => {
// //       const dpr = Math.min(window.devicePixelRatio || 1, 2);
// //       const w = window.innerWidth, h = window.innerHeight;
// //       canvas.width = Math.floor(w * dpr);
// //       canvas.height = Math.floor(h * dpr);
// //       canvas.style.width = w + "px";
// //       canvas.style.height = h + "px";
// //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// //       particles = buildParticles(cfg, w, h, { reduced, isMobile, isLight });
// //     };
// //     resize();
// //     window.addEventListener("resize", resize);

// //     const tick = (now) => {
// //       if (!running) return;
// //       const w = window.innerWidth, h = window.innerHeight;
// //       const time = (now - t0) / 1000;
// //       ctx.clearRect(0, 0, w, h);
// //       if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, time, isLight);
// //       for (const p of particles) { update(p, w, h, time); draw(ctx, p, isLight); }
// //       frame = requestAnimationFrame(tick);
// //     };
// //     if (!reduced) frame = requestAnimationFrame(tick);
// //     else {
// //       const w = window.innerWidth, h = window.innerHeight;
// //       if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, 0, isLight);
// //       for (const p of particles) draw(ctx, p, isLight);
// //     }
// //     return () => { running = false; cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
// //   }, [theme]);

// //   const [r1, g1, b1] = cfg.glow1;
// //   const [r2, g2, b2] = cfg.glow2;
// //   const glowA = isLight ? 0.32 : 0.2;

// //   return (
// //     <>
// //       <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, background: cfg.bg, transition: "background 0.85s ease" }} />
// //       <div aria-hidden style={{
// //         position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
// //         background: `radial-gradient(ellipse at 18% 25%, rgba(${r1},${g1},${b1},${glowA}) 0%, transparent 50%), radial-gradient(ellipse at 82% 75%, rgba(${r2},${g2},${b2},${glowA * 0.9}) 0%, transparent 52%)`,
// //         animation: "tbGlowPulse 8s ease-in-out infinite alternate",
// //       }} />
// //       <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />
// //       <style>{`@keyframes tbGlowPulse { from { opacity: 0.55; } to { opacity: 1; } }`}</style>
// //     </>
// //   );
// // }

// // function drawMilkyWay(ctx, w, h, cfg, time, isLight) {
// //   const [r1, g1, b1] = cfg.glow1;
// //   const [r2, g2, b2] = cfg.glow2;
// //   ctx.save();
// //   ctx.translate(w * 0.5, h * 0.5);
// //   ctx.rotate(-0.4 + Math.sin(time * 0.05) * 0.02);
// //   const band = ctx.createLinearGradient(-w, 0, w, 0);
// //   const a = isLight ? 0.22 : 0.14;
// //   band.addColorStop(0, "transparent");
// //   band.addColorStop(0.25, `rgba(${r1},${g1},${b1},${a})`);
// //   band.addColorStop(0.5, `rgba(${r2},${g2},${b2},${a * 1.5})`);
// //   band.addColorStop(0.75, `rgba(${r1},${g1},${b1},${a})`);
// //   band.addColorStop(1, "transparent");
// //   ctx.fillStyle = band;
// //   ctx.fillRect(-w, -h * 0.09, w * 2, h * 0.18);
// //   ctx.restore();
// // }

// // function buildParticles(cfg, w, h, { reduced, isMobile, isLight }) {
// //   const { type, nebula, color } = cfg.particles;
// //   let count = cfg.particles.count;
// //   if (isMobile) count = Math.floor(count * 0.45);
// //   if (reduced) count = Math.floor(count * 0.25);
// //   const all = [];
// //   const alphaBoost = isLight ? 1.35 : 1;

// //   for (let i = 0; i < count; i++) {
// //     const p = {
// //       x: Math.random() * w, y: Math.random() * h,
// //       r: 0.5 + Math.random() * 1.8,
// //       alpha: (0.25 + Math.random() * 0.65) * alphaBoost,
// //       speed: 0.003 + Math.random() * 0.008,
// //       color, type, isNebula: false, phase: Math.random() * Math.PI * 2,
// //     };
// //     switch (type) {
// //       case "galaxy":
// //         p.x = w * (0.12 + Math.random() * 0.76);
// //         p.y = h * (0.18 + Math.random() * 0.64);
// //         p.r = Math.random() < 0.1 ? 2 + Math.random() * 2.5 : 0.35 + Math.random() * 1.3;
// //         p.twinkle = 0.008 + Math.random() * 0.02;
// //         p.depth = Math.random();
// //         break;
// //       case "gold-dust":
// //         p.r = 0.6 + Math.random() * 2.4; p.dy = -(0.1 + Math.random() * 0.4); p.dx = (Math.random() - 0.5) * 0.3; break;
// //       case "fireflies":
// //         p.r = 1.2 + Math.random() * 2.4; p.dx = (Math.random() - 0.5) * 0.4; p.dy = (Math.random() - 0.5) * 0.4;
// //         p.twinkle = 0.015 + Math.random() * 0.03; break;
// //       case "nature":
// //         p.r = 1.4 + Math.random() * 2.2; p.angle = Math.random() * Math.PI * 2;
// //         p.spin = (Math.random() - 0.5) * 0.035; p.dy = 0.2 + Math.random() * 0.4; p.dx = (Math.random() - 0.5) * 0.45; break;
// //       case "hearts":
// //         p.r = 2.2 + Math.random() * 3.5; p.dy = -(0.15 + Math.random() * 0.35); p.dx = (Math.random() - 0.5) * 0.25; break;
// //       case "metal-dust":
// //         p.r = 0.5 + Math.random() * 1.4; p.dx = (Math.random() - 0.5) * 0.18; p.dy = (Math.random() - 0.5) * 0.18; break;
// //       case "lava-sparks":
// //         p.r = 0.7 + Math.random() * 2.2; p.dy = -(0.5 + Math.random() * 1.4); p.dx = (Math.random() - 0.5) * 0.6; break;
// //       case "water-bubbles":
// //         p.r = 1.5 + Math.random() * 5; p.dy = -(0.25 + Math.random() * 0.7); p.wobble = 0.02 + Math.random() * 0.04; break;
// //       case "digital-grid":
// //         p.x = Math.floor(Math.random() * 32) * (w / 32);
// //         p.y = Math.floor(Math.random() * 20) * (h / 20);
// //         p.r = 1.2; p.pulse = Math.random() * Math.PI * 2; p.line = Math.random() > 0.65; break;
// //       default:
// //         p.dx = (Math.random() - 0.5) * 0.14; p.dy = (Math.random() - 0.5) * 0.14; break;
// //     }
// //     all.push(p);
// //   }

// //   if (nebula && !reduced) {
// //     const nCount = isMobile ? 10 : type === "galaxy" ? 24 : 14;
// //     for (let i = 0; i < nCount; i++) {
// //       all.push({
// //         isNebula: true, x: Math.random() * w, y: Math.random() * h,
// //         r: 60 + Math.random() * (type === "galaxy" ? 150 : 100),
// //         dx: (Math.random() - 0.5) * 0.04, dy: (Math.random() - 0.5) * 0.04,
// //         hue: Math.random() > 0.5 ? cfg.glow1 : cfg.glow2,
// //         alphaMul: isLight ? 0.16 : 0.09,
// //       });
// //     }
// //   }
// //   return all;
// // }

// // function update(p, w, h, time) {
// //   if (p.isNebula) {
// //     p.x += p.dx; p.y += p.dy;
// //     if (p.x < -p.r || p.x > w + p.r) p.dx *= -1;
// //     if (p.y < -p.r || p.y > h + p.r) p.dy *= -1;
// //     return;
// //   }
// //   p.phase = (p.phase || 0) + (p.twinkle || p.speed || 0.005);
// //   if (p.twinkle != null) p.alpha = 0.28 + (Math.sin(p.phase) + 1) * 0.4;
// //   else if (p.pulse != null) { p.pulse += 0.035; p.alpha = 0.22 + (Math.sin(p.pulse) + 1) * 0.32; }
// //   else { p.alpha += p.speed; if (p.alpha > 0.95 || p.alpha < 0.12) p.speed *= -1; }

// //   if (p.type === "galaxy" && p.depth != null) {
// //     p.x += Math.sin(time * 0.15 + p.phase) * 0.08 * p.depth;
// //     p.y += Math.cos(time * 0.12 + p.phase) * 0.05 * p.depth;
// //   }
// //   if (p.dx != null) p.x += p.dx;
// //   if (p.dy != null) p.y += p.dy;
// //   if (p.wobble) p.x += Math.sin(p.phase) * p.wobble * 10;
// //   if (p.spin != null) p.angle = (p.angle || 0) + p.spin;

// //   if (["lava-sparks", "gold-dust", "hearts"].includes(p.type)) {
// //     if (p.y < -15) { p.y = h + 10; p.x = Math.random() * w; }
// //   } else if (p.type === "water-bubbles") {
// //     if (p.y < -20) { p.y = h + 12; p.x = Math.random() * w; }
// //   } else if (p.type === "nature") {
// //     if (p.y > h + 20) { p.y = -12; p.x = Math.random() * w; }
// //   } else if (p.type !== "digital-grid") {
// //     if (p.x < -8) p.x = w + 8; if (p.x > w + 8) p.x = -8;
// //     if (p.y < -8) p.y = h + 8; if (p.y > h + 8) p.y = -8;
// //   }
// // }

// // function draw(ctx, p, isLight) {
// //   if (p.isNebula) {
// //     const [r, g, b] = p.hue;
// //     const a = p.alphaMul || (isLight ? 0.14 : 0.08);
// //     const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
// //     grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
// //     grad.addColorStop(1, "rgba(0,0,0,0)");
// //     ctx.fillStyle = grad;
// //     ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
// //     return;
// //   }
// //   const [r, g, b] = p.color;
// //   const a = Math.max(0, Math.min(1, p.alpha));

// //   if (p.type === "galaxy" || p.type === "gold-dust") {
// //     ctx.save(); ctx.translate(p.x, p.y);
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// //     ctx.beginPath();
// //     for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.lineTo(0, p.r * 2.4); ctx.lineTo(p.r * 0.32, p.r * 0.32); }
// //     ctx.closePath(); ctx.fill();
// //     ctx.beginPath(); ctx.arc(0, 0, p.r * 0.4, 0, Math.PI * 2);
// //     ctx.fillStyle = `rgba(255,255,255,${a * (isLight ? 0.3 : 0.55)})`; ctx.fill();
// //     ctx.restore(); return;
// //   }
// //   if (p.type === "hearts") {
// //     ctx.save(); ctx.translate(p.x, p.y); ctx.scale(p.r / 6, p.r / 6);
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// //     ctx.beginPath(); ctx.moveTo(0, 3);
// //     ctx.bezierCurveTo(-5, -2, -5, -6, 0, -4); ctx.bezierCurveTo(5, -6, 5, -2, 0, 3);
// //     ctx.fill(); ctx.restore(); return;
// //   }
// //   if (p.type === "nature") {
// //     ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle || 0);
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// //     ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.6, p.r * 0.95, 0, 0, Math.PI * 2); ctx.fill();
// //     ctx.restore(); return;
// //   }
// //   if (p.type === "digital-grid") {
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.75})`;
// //     ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
// //     if (p.line) {
// //       ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.22})`; ctx.lineWidth = 0.6;
// //       ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 48, p.y); ctx.stroke();
// //     }
// //     return;
// //   }
// //   if (p.type === "water-bubbles") {
// //     ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// //     ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.9})`; ctx.lineWidth = isLight ? 1.6 : 1.2; ctx.stroke();
// //     ctx.beginPath(); ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, p.r * 0.22, 0, Math.PI * 2);
// //     ctx.fillStyle = `rgba(255,255,255,${a * 0.45})`; ctx.fill(); return;
// //   }
// //   if (p.type === "fireflies" || p.type === "lava-sparks") {
// //     const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
// //     glow.addColorStop(0, `rgba(${r},${g},${b},${a})`);
// //     glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
// //     ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2); ctx.fill();
// //     ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
// //     ctx.fillStyle = `rgba(255,255,230,${a})`; ctx.fill(); return;
// //   }
// //   ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// //   ctx.fillStyle = `rgba(${r},${g},${b},${a})`; ctx.fill();
// // }

// // export default ThemeBackground;


// /**
//  * ThemeBackground.jsx
//  * Dark = intact | Light = fonds COLORÉS (plus de blanc plat) + particules contrastées
//  * Relief type "honeycomb soft" optionnel sur light pour donner de la profondeur
//  */
// // import { useEffect, useRef } from "react";

// // const THEMES = {
// //   // /* ===== GALAXY ===== */
// //   // "dark-galaxy": {
// //   //   bg: "radial-gradient(ellipse at 50% 0%, #1a0b3c 0%, #0b0520 40%, #03010a 100%)",
// //   //   glow1: [129, 140, 248], glow2: [192, 132, 252], accent: "#a78bfa",
// //   //   particles: { color: [220, 210, 255], count: 220, type: "galaxy", nebula: true },
// //   // },
// //   // "light-galaxy": {
// //   //   bg: "linear-gradient(160deg, #c7d2fe 0%, #a5b4fc 40%, #818cf8 70%, #6366f1 100%)",
// //   //   glow1: [67, 56, 202], glow2: [109, 40, 217], accent: "#4338ca",
// //   //   particles: { color: [30, 27, 75], count: 140, type: "galaxy", nebula: true, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🌌 GALAXY — PREMIUM
// //    Deep Space × Nebula × Starlight
// //    ========================================================= */

// //   "dark-galaxy": {

// //     /* Background cosmique */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 18% 18%,
// //         rgba(124, 58, 237, 0.24) 0%,
// //         transparent 32%
// //       ),
// //       radial-gradient(
// //         ellipse at 82% 28%,
// //         rgba(79, 70, 229, 0.20) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 85%,
// //         rgba(168, 85, 247, 0.14) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         155deg,
// //         #05020d 0%,
// //         #0b0520 38%,
// //         #13082d 68%,
// //         #1b0b3d 100%
// //       )
// //     `,

// //     /* Lumières cosmiques */
// //     glow1: [139, 92, 246],
// //     glow2: [99, 102, 241],

// //     /* Accent */
// //     accent: "#8b5cf6",

// //     /* Étoiles / particules */
// //     particles: {
// //       color: [224, 231, 255],
// //       count: 150,
// //       type: "galaxy",
// //       nebula: true,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-galaxy": {

// //     /* Galaxy claire */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 15%,
// //         rgba(196, 181, 253, 0.38) 0%,
// //         transparent 35%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 25%,
// //         rgba(165, 180, 252, 0.30) 0%,
// //         transparent 36%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 85%,
// //         rgba(221, 214, 254, 0.48) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         155deg,
// //         #faf9ff 0%,
// //         #f1efff 32%,
// //         #e6e2ff 65%,
// //         #d9d4ff 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [124, 58, 237],
// //     glow2: [79, 70, 229],

// //     /* Accent */
// //     accent: "#6d5ce7",

// //     /* Particules */
// //     particles: {
// //       color: [67, 56, 202],
// //       count: 70,
// //       type: "galaxy",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== SIMPLE ===== */
// //   // "dark-simple": {
// //   //   bg: "linear-gradient(145deg, #0a0f1e 0%, #0f172a 55%, #1e293b 100%)",
// //   //   glow1: [59, 130, 246], glow2: [96, 165, 250], accent: "#3b82f6",
// //   //   particles: { color: [148, 163, 184], count: 70, type: "floating-dots", nebula: true },
// //   // },
// //   // "light-simple": {
// //   //   bg: "linear-gradient(145deg, #93c5fd 0%, #60a5fa 45%, #3b82f6 100%)",
// //   //   glow1: [30, 64, 175], glow2: [29, 78, 216], accent: "#1e3a8a",
// //   //   particles: { color: [15, 23, 42], count: 70, type: "floating-dots", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🔵 SIMPLE — PREMIUM
// //    Clean SaaS × Neutral × Blue Accent
// //    ========================================================= */

// //   "dark-simple": {

// //     /* Fond neutre */
// //     bg: `
// //       radial-gradient(
// //         circle at 15% 10%,
// //         rgba(59, 130, 246, 0.10) 0%,
// //         transparent 32%
// //       ),
// //       radial-gradient(
// //         circle at 85% 85%,
// //         rgba(96, 165, 250, 0.06) 0%,
// //         transparent 34%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #080c14 0%,
// //         #0f172a 48%,
// //         #172033 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [59, 130, 246],
// //     glow2: [96, 165, 250],

// //     /* Accent */
// //     accent: "#3b82f6",

// //     /* Particules très discrètes */
// //     particles: {
// //       color: [148, 163, 184],
// //       count: 40,
// //       type: "floating-dots",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief léger */
// //     relief: true,
// //   },


// //   "light-simple": {

// //     /* Fond clair neutre */
// //     bg: `
// //       radial-gradient(
// //         circle at 15% 10%,
// //         rgba(147, 197, 253, 0.18) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         circle at 85% 85%,
// //         rgba(191, 219, 254, 0.20) 0%,
// //         transparent 36%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #f8fafc 0%,
// //         #f1f5f9 52%,
// //         #e8f0f8 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [37, 99, 235],
// //     glow2: [59, 130, 246],

// //     /* Accent */
// //     accent: "#2563eb",

// //     /* Particules très légères */
// //     particles: {
// //       color: [71, 85, 105],
// //       count: 28,
// //       type: "floating-dots",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== LUXURY ===== */
// //   // "dark-luxury": {
// //   //   bg: "linear-gradient(145deg, #0c0a04 0%, #1a1408 40%, #2a1f0a 100%)",
// //   //   glow1: [212, 175, 55], glow2: [245, 215, 110], accent: "#d4af37",
// //   //   particles: { color: [255, 220, 120], count: 100, type: "gold-dust", nebula: true },
// //   // },
// //   // "light-luxury": {
// //   //   bg: "linear-gradient(145deg, #f0d78c 0%, #e8c547 40%, #d4a017 75%, #b8860b 100%)",
// //   //   glow1: [120, 80, 10], glow2: [146, 100, 20], accent: "#78350f",
// //   //   particles: { color: [60, 40, 5], count: 90, type: "gold-dust", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    👑 LUXURY — PREMIUM
// //    Black × Champagne × Gold
// //    Elegant / Premium / Sophisticated
// //    ========================================================= */

// //   "dark-luxury": {

// //     /* Fond luxueux */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 18% 12%,
// //         rgba(212, 175, 55, 0.14) 0%,
// //         transparent 32%
// //       ),
// //       radial-gradient(
// //         ellipse at 82% 80%,
// //         rgba(245, 215, 110, 0.08) 0%,
// //         transparent 36%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #080704 0%,
// //         #12100a 42%,
// //         #1b160b 72%,
// //         #241c0c 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [212, 175, 55],
// //     glow2: [245, 215, 110],

// //     /* Accent */
// //     accent: "#d4af37",

// //     /* Poussière dorée */
// //     particles: {
// //       color: [245, 215, 110],
// //       count: 65,
// //       type: "gold-dust",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-luxury": {

// //     /* Fond ivoire / champagne */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 10%,
// //         rgba(245, 215, 110, 0.24) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 80%,
// //         rgba(212, 175, 55, 0.14) 0%,
// //         transparent 38%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #fffdf7 0%,
// //         #faf5e8 42%,
// //         #f4ead2 72%,
// //         #ecdfbd 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [180, 140, 45],
// //     glow2: [212, 175, 55],

// //     /* Accent */
// //     accent: "#9a7215",

// //     /* Poussière dorée très discrète */
// //     particles: {
// //       color: [120, 90, 25],
// //       count: 38,
// //       type: "gold-dust",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== EXOTIC ===== */
// //   // "dark-exotic": {
// //   //   bg: "linear-gradient(145deg, #1c0800 0%, #2d1200 50%, #3d1800 100%)",
// //   //   glow1: [249, 115, 22], glow2: [251, 146, 60], accent: "#f97316",
// //   //   particles: { color: [255, 200, 120], count: 90, type: "fireflies", nebula: true },
// //   // },
// //   // "light-exotic": {
// //   //   bg: "linear-gradient(145deg, #fdba74 0%, #fb923c 40%, #f97316 75%, #ea580c 100%)",
// //   //   glow1: [154, 52, 18], glow2: [194, 65, 12], accent: "#7c2d12",
// //   //   particles: { color: [67, 20, 7], count: 75, type: "fireflies", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🌴 EXOTIC — PREMIUM
// //    Sunset × Tropical × Amber × Coral
// //    Warm / Vibrant / Elegant
// //    ========================================================= */

// //   "dark-exotic": {

// //     /* Fond tropical profond */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 18% 15%,
// //         rgba(249, 115, 22, 0.18) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         ellipse at 82% 78%,
// //         rgba(251, 146, 60, 0.10) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(234, 88, 12, 0.12) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #120604 0%,
// //         #241008 40%,
// //         #3a160b 72%,
// //         #4a1c0c 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [249, 115, 22],
// //     glow2: [251, 146, 60],

// //     /* Accent */
// //     accent: "#f97316",

// //     /* Lucioles */
// //     particles: {
// //       color: [255, 214, 150],
// //       count: 60,
// //       type: "fireflies",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-exotic": {

// //     /* Fond clair chaud */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 12%,
// //         rgba(253, 186, 116, 0.30) 0%,
// //         transparent 35%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 80%,
// //         rgba(251, 146, 60, 0.16) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(254, 215, 170, 0.34) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #fffaf5 0%,
// //         #fff2e6 38%,
// //         #ffe5d0 70%,
// //         #fbd5bd 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [234, 88, 12],
// //     glow2: [249, 115, 22],

// //     /* Accent */
// //     accent: "#c2410c",

// //     /* Lucioles discrètes */
// //     particles: {
// //       color: [124, 45, 18],
// //       count: 32,
// //       type: "fireflies",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== VERDATRE ===== */
// //   // "dark-verdatre": {
// //   //   bg: "linear-gradient(145deg, #020f08 0%, #022c22 50%, #064e3b 100%)",
// //   //   glow1: [16, 185, 129], glow2: [52, 211, 153], accent: "#10b981",
// //   //   particles: { color: [110, 231, 183], count: 75, type: "nature", nebula: true },
// //   // },
// //   // "light-verdatre": {
// //   //   bg: "linear-gradient(145deg, #6ee7b7 0%, #34d399 40%, #10b981 75%, #059669 100%)",
// //   //   glow1: [6, 78, 59], glow2: [4, 120, 87], accent: "#064e3b",
// //   //   particles: { color: [6, 40, 30], count: 70, type: "nature", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🌿 VERDÂTRE — PREMIUM
// //    Emerald Forest × Nature × Fresh Green
// //    Organic / Calm / Modern
// //    ========================================================= */

// //   "dark-verdatre": {

// //     /* Forêt profonde */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 18% 12%,
// //         rgba(16, 185, 129, 0.16) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         ellipse at 82% 78%,
// //         rgba(52, 211, 153, 0.09) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(5, 150, 105, 0.12) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #020b07 0%,
// //         #052019 42%,
// //         #07382c 72%,
// //         #07533f 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [16, 185, 129],
// //     glow2: [52, 211, 153],

// //     /* Accent */
// //     accent: "#10b981",

// //     /* Particules naturelles */
// //     particles: {
// //       color: [110, 231, 183],
// //       count: 55,
// //       type: "nature",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-verdatre": {

// //     /* Fond eucalyptus / sauge */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 10%,
// //         rgba(167, 243, 208, 0.30) 0%,
// //         transparent 35%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 80%,
// //         rgba(110, 231, 183, 0.18) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(209, 250, 229, 0.38) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #f6fcf8 0%,
// //         #edf9f2 38%,
// //         #dff3e8 70%,
// //         #ccebdd 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [5, 150, 105],
// //     glow2: [16, 185, 129],

// //     /* Accent */
// //     accent: "#047857",

// //     /* Particules très discrètes */
// //     particles: {
// //       color: [6, 95, 70],
// //       count: 30,
// //       type: "nature",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== GLAMOUR ===== */
// //   // "dark-glamour": {
// //   //   bg: "linear-gradient(145deg, #1a0510 0%, #2d0a1e 50%, #3f0d2a 100%)",
// //   //   glow1: [219, 39, 119], glow2: [244, 114, 182], accent: "#db2777",
// //   //   particles: { color: [251, 180, 220], count: 100, type: "hearts", nebula: true },
// //   // },
// //   // "light-glamour": {
// //   //   bg: "linear-gradient(145deg, #f9a8d4 0%, #f472b6 40%, #ec4899 75%, #db2777 100%)",
// //   //   glow1: [131, 24, 67], glow2: [157, 23, 77], accent: "#831843",
// //   //   particles: { color: [80, 10, 40], count: 80, type: "hearts", nebula: false, light: true },
// //   //   relief: true,
// //   // },

// //   /* =========================================================
// //    💗 GLAMOUR — PREMIUM
// //    Velvet × Rose × Champagne × Magenta
// //    Elegant / Chic / Sophisticated
// //    ========================================================= */

// //   "dark-glamour": {

// //     /* Fond velours */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 18% 12%,
// //         rgba(219, 39, 119, 0.18) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         ellipse at 82% 78%,
// //         rgba(244, 114, 182, 0.10) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(190, 24, 93, 0.12) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #10030a 0%,
// //         #210713 40%,
// //         #330b1f 70%,
// //         #450d29 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [219, 39, 119],
// //     glow2: [244, 114, 182],

// //     /* Accent */
// //     accent: "#db2777",

// //     /* Particules */
// //     particles: {
// //       color: [251, 180, 220],
// //       count: 55,
// //       type: "hearts",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-glamour": {

// //     /* Rose poudré / champagne */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 10%,
// //         rgba(251, 207, 232, 0.34) 0%,
// //         transparent 35%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 78%,
// //         rgba(244, 114, 182, 0.14) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(253, 230, 240, 0.42) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #fffafd 0%,
// //         #fdf3f8 38%,
// //         #f9e5ef 70%,
// //         #f4d5e3 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [190, 24, 93],
// //     glow2: [219, 39, 119],

// //     /* Accent */
// //     accent: "#be185d",

// //     /* Particules discrètes */
// //     particles: {
// //       color: [131, 24, 67],
// //       count: 30,
// //       type: "hearts",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== GRAPHITE ===== */
// //   // "dark-graphite": {
// //   //   bg: "linear-gradient(180deg, #09090b 0%, #18181b 50%, #27272a 100%)",
// //   //   glow1: [113, 113, 122], glow2: [161, 161, 170], accent: "#a1a1aa",
// //   //   particles: { color: [180, 180, 190], count: 50, type: "metal-dust", nebula: false },
// //   // },
// //   // "light-graphite": {
// //   //   bg: "linear-gradient(180deg, #a1a1aa 0%, #71717a 45%, #52525b 100%)",
// //   //   glow1: [24, 24, 27], glow2: [39, 39, 42], accent: "#18181b",
// //   //   particles: { color: [9, 9, 11], count: 55, type: "metal-dust", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🩶 GRAPHITE — PREMIUM
// //    Carbon × Steel × Platinum
// //    Minimal / Industrial / Monochrome
// //    ========================================================= */

// //   "dark-graphite": {

// //     /* Carbone / métal sombre */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 18% 12%,
// //         rgba(161, 161, 170, 0.08) 0%,
// //         transparent 32%
// //       ),
// //       radial-gradient(
// //         ellipse at 82% 82%,
// //         rgba(113, 113, 122, 0.07) 0%,
// //         transparent 36%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #070709 0%,
// //         #111113 42%,
// //         #1b1b1f 72%,
// //         #25252a 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [161, 161, 170],
// //     glow2: [212, 212, 216],

// //     /* Accent */
// //     accent: "#a1a1aa",

// //     /* Poussière métallique */
// //     particles: {
// //       color: [190, 190, 198],
// //       count: 35,
// //       type: "metal-dust",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-graphite": {

// //     /* Argent / platine */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 10%,
// //         rgba(255, 255, 255, 0.65) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 80%,
// //         rgba(161, 161, 170, 0.14) 0%,
// //         transparent 38%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #ffffff 0%,
// //         #f4f4f5 38%,
// //         #e7e7e9 70%,
// //         #dcdcdf 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [82, 82, 91],
// //     glow2: [113, 113, 122],

// //     /* Accent */
// //     accent: "#3f3f46",

// //     /* Poussière métallique */
// //     particles: {
// //       color: [82, 82, 91],
// //       count: 25,
// //       type: "metal-dust",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== VOLCANIC ===== */
// //   // "dark-volcanic": {
// //   //   bg: "linear-gradient(160deg, #1a0000 0%, #3b0a0a 50%, #1a0500 100%)",
// //   //   glow1: [239, 68, 68], glow2: [249, 115, 22], accent: "#ef4444",
// //   //   particles: { color: [255, 160, 100], count: 100, type: "lava-sparks", nebula: true },
// //   // },
// //   // "light-volcanic": {
// //   //   bg: "linear-gradient(160deg, #fca5a5 0%, #f87171 35%, #ef4444 70%, #dc2626 100%)",
// //   //   glow1: [127, 29, 29], glow2: [153, 27, 27], accent: "#7f1d1d",
// //   //   particles: { color: [50, 8, 8], count: 80, type: "lava-sparks", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🌋 VOLCANIC — PREMIUM
// //    Obsidian × Magma × Ember
// //    Dramatic / Powerful / Fiery
// //    ========================================================= */

// //   "dark-volcanic": {

// //     /* Roche volcanique + magma */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 20% 18%,
// //         rgba(239, 68, 68, 0.18) 0%,
// //         transparent 32%
// //       ),
// //       radial-gradient(
// //         ellipse at 80% 72%,
// //         rgba(249, 115, 22, 0.16) 0%,
// //         transparent 36%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(220, 38, 38, 0.14) 0%,
// //         transparent 40%
// //       ),
// //       linear-gradient(
// //         160deg,
// //         #080303 0%,
// //         #1a0505 38%,
// //         #320907 70%,
// //         #451108 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [239, 68, 68],
// //     glow2: [249, 115, 22],

// //     /* Accent */
// //     accent: "#ef4444",

// //     /* Étincelles de lave */
// //     particles: {
// //       color: [255, 170, 100],
// //       count: 65,
// //       type: "lava-sparks",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-volcanic": {

// //     /* Roche chaude / pierre claire */
// //     bg: `
// //       radial-gradient(
// //         ellipse at 15% 10%,
// //         rgba(254, 202, 202, 0.34) 0%,
// //         transparent 35%
// //       ),
// //       radial-gradient(
// //         ellipse at 85% 78%,
// //         rgba(253, 186, 116, 0.18) 0%,
// //         transparent 38%
// //       ),
// //       radial-gradient(
// //         ellipse at 50% 100%,
// //         rgba(254, 215, 170, 0.30) 0%,
// //         transparent 42%
// //       ),
// //       linear-gradient(
// //         160deg,
// //         #fffafa 0%,
// //         #fff2ef 36%,
// //         #fbe3dc 68%,
// //         #f5d0c6 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [185, 28, 28],
// //     glow2: [220, 38, 38],

// //     /* Accent */
// //     accent: "#b91c1c",

// //     /* Étincelles discrètes */
// //     particles: {
// //       color: [127, 29, 29],
// //       count: 28,
// //       type: "lava-sparks",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== OCEANIC ===== */
// //   // "dark-oceanic": {
// //   //   bg: "linear-gradient(180deg, #020d1a 0%, #0c4a6e 55%, #0369a1 100%)",
// //   //   glow1: [14, 165, 233], glow2: [56, 189, 248], accent: "#0ea5e9",
// //   //   particles: { color: [125, 211, 252], count: 110, type: "water-bubbles", nebula: true },
// //   // },
// //   // "light-oceanic": {
// //   //   bg: "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 40%, #0ea5e9 75%, #0284c7 100%)",
// //   //   glow1: [12, 74, 110], glow2: [3, 105, 161], accent: "#0c4a6e",
// //   //   particles: { color: [8, 47, 73], count: 90, type: "water-bubbles", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    🌊 OCEANIC — PREMIUM
// //    Deep Ocean × Aqua × Glass
// //    ========================================================= */

// //   "dark-oceanic": {

// //     /* Background principal */
// //     bg: `
// //       radial-gradient(
// //         circle at 20% 15%,
// //         rgba(14, 116, 144, 0.28) 0%,
// //         transparent 35%
// //       ),
// //       radial-gradient(
// //         circle at 80% 70%,
// //         rgba(6, 182, 212, 0.16) 0%,
// //         transparent 40%
// //       ),
// //       linear-gradient(
// //         180deg,
// //         #020b14 0%,
// //         #041c2b 38%,
// //         #063b52 72%,
// //         #07556f 100%
// //       )
// //     `,

// //     /* Lumières atmosphériques */
// //     glow1: [34, 211, 238],
// //     glow2: [8, 145, 178],

// //     /* Accent */
// //     accent: "#0891b2",

// //     /* Particules */
// //     particles: {
// //       color: [103, 232, 249],
// //       count: 85,
// //       type: "water-bubbles",
// //       nebula: true,
// //       light: false
// //     },

// //     /* Profondeur */
// //     relief: true,
// //   },


// //   "light-oceanic": {

// //     /* Background principal */
// //     bg: `
// //       radial-gradient(
// //         circle at 15% 10%,
// //         rgba(103, 232, 249, 0.32) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         circle at 85% 75%,
// //         rgba(8, 145, 178, 0.12) 0%,
// //         transparent 40%
// //       ),
// //       linear-gradient(
// //         180deg,
// //         #f3fbfd 0%,
// //         #e1f5f8 35%,
// //         #c8eaf0 68%,
// //         #b3e0e8 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [6, 182, 212],
// //     glow2: [8, 145, 178],

// //     /* Accent */
// //     accent: "#0891b2",

// //     /* Particules */
// //     particles: {
// //       color: [8, 145, 178],
// //       count: 55,
// //       type: "water-bubbles",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// //   // /* ===== MODERN ===== */
// //   // "dark-modern": {
// //   //   bg: "linear-gradient(145deg, #010409 0%, #0d1117 50%, #161b22 100%)",
// //   //   glow1: [59, 130, 246], glow2: [34, 211, 238], accent: "#22d3ee",
// //   //   particles: { color: [34, 211, 238], count: 80, type: "digital-grid", nebula: false },
// //   // },
// //   // "light-modern": {
// //   //   bg: "linear-gradient(145deg, #93c5fd 0%, #60a5fa 40%, #3b82f6 75%, #2563eb 100%)",
// //   //   glow1: [30, 64, 175], glow2: [8, 145, 178], accent: "#1e3a8a",
// //   //   particles: { color: [15, 23, 42], count: 70, type: "digital-grid", nebula: false, light: true },
// //   //   relief: true,
// //   // },
// //   /* =========================================================
// //    ⚡ MODERN — PREMIUM
// //    Digital × Graphite × Electric Cyan
// //    Clean / Futuristic / SaaS
// //    ========================================================= */

// //   "dark-modern": {

// //     /* Fond digital */
// //     bg: `
// //       radial-gradient(
// //         circle at 18% 12%,
// //         rgba(59, 130, 246, 0.12) 0%,
// //         transparent 32%
// //       ),
// //       radial-gradient(
// //         circle at 82% 78%,
// //         rgba(34, 211, 238, 0.10) 0%,
// //         transparent 36%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #010409 0%,
// //         #0b1017 42%,
// //         #111923 72%,
// //         #17212c 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [59, 130, 246],
// //     glow2: [34, 211, 238],

// //     /* Accent */
// //     accent: "#22d3ee",

// //     /* Grille digitale */
// //     particles: {
// //       color: [34, 211, 238],
// //       count: 55,
// //       type: "digital-grid",
// //       nebula: false,
// //       light: false
// //     },

// //     /* Relief */
// //     relief: true,
// //   },


// //   "light-modern": {

// //     /* Fond clair technologique */
// //     bg: `
// //       radial-gradient(
// //         circle at 15% 10%,
// //         rgba(147, 197, 253, 0.22) 0%,
// //         transparent 34%
// //       ),
// //       radial-gradient(
// //         circle at 85% 78%,
// //         rgba(103, 232, 249, 0.16) 0%,
// //         transparent 38%
// //       ),
// //       linear-gradient(
// //         145deg,
// //         #fbfdff 0%,
// //         #f1f7fb 38%,
// //         #e7f2f8 70%,
// //         #dcecf4 100%
// //       )
// //     `,

// //     /* Lumières */
// //     glow1: [37, 99, 235],
// //     glow2: [8, 145, 178],

// //     /* Accent */
// //     accent: "#0369a1",

// //     /* Grille digitale */
// //     particles: {
// //       color: [30, 64, 175],
// //       count: 35,
// //       type: "digital-grid",
// //       nebula: false,
// //       light: true
// //     },

// //     /* Relief */
// //     relief: true,
// //   },

// // };

// // const DEFAULT = THEMES["dark-galaxy"];
// // export function getTheme(name) { return THEMES[name] || DEFAULT; }
// // export const THEME_NAMES = Object.keys(THEMES);

// // export function themeCssVars(name) {
// //   const t = getTheme(name);
// //   const [r1, g1, b1] = t.glow1;
// //   const [r2, g2, b2] = t.glow2;
// //   const isLight = String(name).startsWith("light-");
// //   return {
// //     "--theme-accent": t.accent,
// //     "--theme-glow-1": `rgb(${r1},${g1},${b1})`,
// //     "--theme-glow-2": `rgb(${r2},${g2},${b2})`,
// //     "--theme-glow-soft": `rgba(${r1},${g1},${b1},${isLight ? 0.28 : 0.18})`,
// //     "--gradient-start": t.accent,
// //     "--gradient-end": `rgb(${r2},${g2},${b2})`,
// //     "--glow-color": `rgba(${r1},${g1},${b1},${isLight ? 0.35 : 0.35})`,
// //   };
// // }

// // function ThemeBackground({ theme = "dark-galaxy" }) {
// //   const canvasRef = useRef(null);
// //   const cfg = getTheme(theme);
// //   const isLight = String(theme).startsWith("light-");

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;
// //     const ctx = canvas.getContext("2d", { alpha: true });
// //     const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
// //     const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
// //     let particles = [];
// //     let frame = 0;
// //     let running = true;
// //     let t0 = performance.now();

// //     const resize = () => {
// //       const dpr = Math.min(window.devicePixelRatio || 1, 2);
// //       const w = window.innerWidth, h = window.innerHeight;
// //       canvas.width = Math.floor(w * dpr);
// //       canvas.height = Math.floor(h * dpr);
// //       canvas.style.width = w + "px";
// //       canvas.style.height = h + "px";
// //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// //       particles = buildParticles(cfg, w, h, { reduced, isMobile, isLight });
// //     };
// //     resize();
// //     window.addEventListener("resize", resize);

// //     const tick = (now) => {
// //       if (!running) return;
// //       const w = window.innerWidth, h = window.innerHeight;
// //       const time = (now - t0) / 1000;
// //       ctx.clearRect(0, 0, w, h);
// //       if (cfg.relief && isLight) drawHoneyRelief(ctx, w, h, cfg, time);
// //       if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, time, isLight);
// //       for (const p of particles) { update(p, w, h, time); draw(ctx, p, isLight); }
// //       frame = requestAnimationFrame(tick);
// //     };
// //     if (!reduced) frame = requestAnimationFrame(tick);
// //     else {
// //       const w = window.innerWidth, h = window.innerHeight;
// //       if (cfg.relief && isLight) drawHoneyRelief(ctx, w, h, cfg, 0);
// //       if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, 0, isLight);
// //       for (const p of particles) draw(ctx, p, isLight);
// //     }
// //     return () => { running = false; cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
// //   }, [theme]);

// //   const [r1, g1, b1] = cfg.glow1;
// //   const [r2, g2, b2] = cfg.glow2;
// //   const glowA = isLight ? 0.22 : 0.2;

// //   return (
// //     <>
// //       <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, background: cfg.bg, transition: "background 0.85s ease" }} />
// //       <div aria-hidden style={{
// //         position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
// //         background: `radial-gradient(ellipse at 18% 25%, rgba(${r1},${g1},${b1},${glowA}) 0%, transparent 50%), radial-gradient(ellipse at 82% 75%, rgba(${r2},${g2},${b2},${glowA * 0.9}) 0%, transparent 52%)`,
// //         animation: "tbGlowPulse 8s ease-in-out infinite alternate",
// //       }} />
// //       <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />
// //       <style>{`@keyframes tbGlowPulse { from { opacity: 0.55; } to { opacity: 1; } }`}</style>
// //     </>
// //   );
// // }

// // /** Relief hex soft (inspiration image utilisateur) — uniquement light */
// // function drawHoneyRelief(ctx, w, h, cfg, time) {
// //   const [r, g, b] = cfg.glow1;
// //   const size = 48;
// //   const hHex = size * Math.sqrt(3);
// //   ctx.save();
// //   ctx.globalAlpha = 0.14;
// //   for (let row = -1; row < h / (hHex * 0.75) + 2; row++) {
// //     for (let col = -1; col < w / (size * 1.5) + 2; col++) {
// //       const x = col * size * 1.5 + (row % 2 ? size * 0.75 : 0);
// //       const y = row * hHex * 0.75;
// //       const pulse = 0.85 + 0.15 * Math.sin(time * 0.4 + row * 0.3 + col * 0.2);
// //       drawHex(ctx, x, y, size * 0.48 * pulse, r, g, b);
// //     }
// //   }
// //   ctx.restore();
// // }

// // function drawHex(ctx, cx, cy, r, R, G, B) {
// //   ctx.beginPath();
// //   for (let i = 0; i < 6; i++) {
// //     const a = (Math.PI / 3) * i + Math.PI / 6;
// //     const x = cx + r * Math.cos(a);
// //     const y = cy + r * Math.sin(a);
// //     if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
// //   }
// //   ctx.closePath();
// //   ctx.strokeStyle = `rgba(${R},${G},${B},0.55)`;
// //   ctx.lineWidth = 1.2;
// //   ctx.stroke();
// //   // ombre douce un côté
// //   ctx.beginPath();
// //   for (let i = 0; i < 4; i++) {
// //     const a = (Math.PI / 3) * i + Math.PI / 6;
// //     const x = cx + r * Math.cos(a);
// //     const y = cy + r * Math.sin(a);
// //     if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
// //   }
// //   ctx.strokeStyle = `rgba(255,255,255,0.25)`;
// //   ctx.lineWidth = 1;
// //   ctx.stroke();
// // }

// // function drawMilkyWay(ctx, w, h, cfg, time, isLight) {
// //   const [r1, g1, b1] = cfg.glow1;
// //   const [r2, g2, b2] = cfg.glow2;
// //   ctx.save();
// //   ctx.translate(w * 0.5, h * 0.5);
// //   ctx.rotate(-0.4 + Math.sin(time * 0.05) * 0.02);
// //   const band = ctx.createLinearGradient(-w, 0, w, 0);
// //   const a = isLight ? 0.2 : 0.14;
// //   band.addColorStop(0, "transparent");
// //   band.addColorStop(0.25, `rgba(${r1},${g1},${b1},${a})`);
// //   band.addColorStop(0.5, `rgba(${r2},${g2},${b2},${a * 1.4})`);
// //   band.addColorStop(0.75, `rgba(${r1},${g1},${b1},${a})`);
// //   band.addColorStop(1, "transparent");
// //   ctx.fillStyle = band;
// //   ctx.fillRect(-w, -h * 0.09, w * 2, h * 0.18);
// //   ctx.restore();
// // }

// // function buildParticles(cfg, w, h, { reduced, isMobile, isLight }) {
// //   const { type, nebula, color } = cfg.particles;
// //   let count = cfg.particles.count;
// //   if (isMobile) count = Math.floor(count * 0.45);
// //   if (reduced) count = Math.floor(count * 0.25);
// //   const all = [];
// //   const alphaBoost = isLight ? 1.45 : 1;

// //   for (let i = 0; i < count; i++) {
// //     const p = {
// //       x: Math.random() * w, y: Math.random() * h,
// //       r: 0.5 + Math.random() * 1.8,
// //       alpha: (0.3 + Math.random() * 0.65) * alphaBoost,
// //       speed: 0.003 + Math.random() * 0.008,
// //       color, type, isNebula: false, phase: Math.random() * Math.PI * 2,
// //     };
// //     switch (type) {
// //       case "galaxy":
// //         p.x = w * (0.12 + Math.random() * 0.76);
// //         p.y = h * (0.18 + Math.random() * 0.64);
// //         p.r = Math.random() < 0.1 ? 2 + Math.random() * 2.5 : 0.4 + Math.random() * 1.4;
// //         p.twinkle = 0.008 + Math.random() * 0.02;
// //         p.depth = Math.random();
// //         break;
// //       case "gold-dust":
// //         p.r = 0.7 + Math.random() * 2.5; p.dy = -(0.1 + Math.random() * 0.4); p.dx = (Math.random() - 0.5) * 0.3; break;
// //       case "fireflies":
// //         p.r = 1.3 + Math.random() * 2.5; p.dx = (Math.random() - 0.5) * 0.4; p.dy = (Math.random() - 0.5) * 0.4;
// //         p.twinkle = 0.015 + Math.random() * 0.03; break;
// //       case "nature":
// //         p.r = 1.5 + Math.random() * 2.3; p.angle = Math.random() * Math.PI * 2;
// //         p.spin = (Math.random() - 0.5) * 0.035; p.dy = 0.2 + Math.random() * 0.4; p.dx = (Math.random() - 0.5) * 0.45; break;
// //       case "hearts":
// //         p.r = 2.4 + Math.random() * 3.6; p.dy = -(0.15 + Math.random() * 0.35); p.dx = (Math.random() - 0.5) * 0.25; break;
// //       case "metal-dust":
// //         p.r = 0.6 + Math.random() * 1.5; p.dx = (Math.random() - 0.5) * 0.18; p.dy = (Math.random() - 0.5) * 0.18; break;
// //       case "lava-sparks":
// //         p.r = 0.8 + Math.random() * 2.3; p.dy = -(0.5 + Math.random() * 1.4); p.dx = (Math.random() - 0.5) * 0.6; break;
// //       case "water-bubbles":
// //         p.r = 1.6 + Math.random() * 5; p.dy = -(0.25 + Math.random() * 0.7); p.wobble = 0.02 + Math.random() * 0.04; break;
// //       case "digital-grid":
// //         p.x = Math.floor(Math.random() * 32) * (w / 32);
// //         p.y = Math.floor(Math.random() * 20) * (h / 20);
// //         p.r = 1.3; p.pulse = Math.random() * Math.PI * 2; p.line = Math.random() > 0.65; break;
// //       default:
// //         p.dx = (Math.random() - 0.5) * 0.14; p.dy = (Math.random() - 0.5) * 0.14; break;
// //     }
// //     all.push(p);
// //   }

// //   if (nebula && !reduced) {
// //     const nCount = isMobile ? 10 : type === "galaxy" ? 24 : 14;
// //     for (let i = 0; i < nCount; i++) {
// //       all.push({
// //         isNebula: true, x: Math.random() * w, y: Math.random() * h,
// //         r: 60 + Math.random() * (type === "galaxy" ? 150 : 100),
// //         dx: (Math.random() - 0.5) * 0.04, dy: (Math.random() - 0.5) * 0.04,
// //         hue: Math.random() > 0.5 ? cfg.glow1 : cfg.glow2,
// //         alphaMul: isLight ? 0.12 : 0.09,
// //       });
// //     }
// //   }
// //   return all;
// // }

// // function update(p, w, h, time) {
// //   if (p.isNebula) {
// //     p.x += p.dx; p.y += p.dy;
// //     if (p.x < -p.r || p.x > w + p.r) p.dx *= -1;
// //     if (p.y < -p.r || p.y > h + p.r) p.dy *= -1;
// //     return;
// //   }
// //   p.phase = (p.phase || 0) + (p.twinkle || p.speed || 0.005);
// //   if (p.twinkle != null) p.alpha = 0.35 + (Math.sin(p.phase) + 1) * 0.4;
// //   else if (p.pulse != null) { p.pulse += 0.035; p.alpha = 0.28 + (Math.sin(p.pulse) + 1) * 0.35; }
// //   else { p.alpha += p.speed; if (p.alpha > 0.95 || p.alpha < 0.15) p.speed *= -1; }

// //   if (p.type === "galaxy" && p.depth != null) {
// //     p.x += Math.sin(time * 0.15 + p.phase) * 0.08 * p.depth;
// //     p.y += Math.cos(time * 0.12 + p.phase) * 0.05 * p.depth;
// //   }
// //   if (p.dx != null) p.x += p.dx;
// //   if (p.dy != null) p.y += p.dy;
// //   if (p.wobble) p.x += Math.sin(p.phase) * p.wobble * 10;
// //   if (p.spin != null) p.angle = (p.angle || 0) + p.spin;

// //   if (["lava-sparks", "gold-dust", "hearts"].includes(p.type)) {
// //     if (p.y < -15) { p.y = h + 10; p.x = Math.random() * w; }
// //   } else if (p.type === "water-bubbles") {
// //     if (p.y < -20) { p.y = h + 12; p.x = Math.random() * w; }
// //   } else if (p.type === "nature") {
// //     if (p.y > h + 20) { p.y = -12; p.x = Math.random() * w; }
// //   } else if (p.type !== "digital-grid") {
// //     if (p.x < -8) p.x = w + 8; if (p.x > w + 8) p.x = -8;
// //     if (p.y < -8) p.y = h + 8; if (p.y > h + 8) p.y = -8;
// //   }
// // }

// // function draw(ctx, p, isLight) {
// //   if (p.isNebula) {
// //     const [r, g, b] = p.hue;
// //     const a = p.alphaMul || (isLight ? 0.12 : 0.08);
// //     const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
// //     grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
// //     grad.addColorStop(1, "rgba(0,0,0,0)");
// //     ctx.fillStyle = grad;
// //     ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
// //     return;
// //   }
// //   const [r, g, b] = p.color;
// //   const a = Math.max(0, Math.min(1, p.alpha));

// //   if (p.type === "galaxy" || p.type === "gold-dust") {
// //     ctx.save(); ctx.translate(p.x, p.y);
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// //     ctx.beginPath();
// //     for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.lineTo(0, p.r * 2.5); ctx.lineTo(p.r * 0.32, p.r * 0.32); }
// //     ctx.closePath(); ctx.fill();
// //     ctx.beginPath(); ctx.arc(0, 0, p.r * 0.4, 0, Math.PI * 2);
// //     ctx.fillStyle = `rgba(255,255,255,${a * (isLight ? 0.25 : 0.55)})`; ctx.fill();
// //     ctx.restore(); return;
// //   }
// //   if (p.type === "hearts") {
// //     ctx.save(); ctx.translate(p.x, p.y); ctx.scale(p.r / 6, p.r / 6);
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// //     ctx.beginPath(); ctx.moveTo(0, 3);
// //     ctx.bezierCurveTo(-5, -2, -5, -6, 0, -4); ctx.bezierCurveTo(5, -6, 5, -2, 0, 3);
// //     ctx.fill(); ctx.restore(); return;
// //   }
// //   if (p.type === "nature") {
// //     ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle || 0);
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// //     ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.6, p.r * 0.95, 0, 0, Math.PI * 2); ctx.fill();
// //     ctx.restore(); return;
// //   }
// //   if (p.type === "digital-grid") {
// //     ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.8})`;
// //     ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
// //     if (p.line) {
// //       ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.25})`; ctx.lineWidth = 0.7;
// //       ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 48, p.y); ctx.stroke();
// //     }
// //     return;
// //   }
// //   if (p.type === "water-bubbles") {
// //     ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// //     ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.95})`; ctx.lineWidth = isLight ? 1.8 : 1.2; ctx.stroke();
// //     ctx.beginPath(); ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, p.r * 0.22, 0, Math.PI * 2);
// //     ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`; ctx.fill(); return;
// //   }
// //   if (p.type === "fireflies" || p.type === "lava-sparks") {
// //     const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
// //     glow.addColorStop(0, `rgba(${r},${g},${b},${a})`);
// //     glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
// //     ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2); ctx.fill();
// //     ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
// //     ctx.fillStyle = `rgba(255,255,230,${a})`; ctx.fill(); return;
// //   }
// //   ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// //   ctx.fillStyle = `rgba(${r},${g},${b},${a})`; ctx.fill();
// // }

// // export default ThemeBackground;


// import { useEffect, useRef } from "react";

// const THEMES = {

//   /* =========================================================
//    🌌 GALAXY — PREMIUM
//    Deep Space × Nebula × Starlight
//    ========================================================= */

//   "dark-galaxy": {

//     /* Background cosmique */
//     bg: `
//       radial-gradient(
//         ellipse at 18% 18%,
//         rgba(124, 58, 237, 0.24) 0%,
//         transparent 32%
//       ),
//       radial-gradient(
//         ellipse at 82% 28%,
//         rgba(79, 70, 229, 0.20) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         ellipse at 50% 85%,
//         rgba(168, 85, 247, 0.14) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         155deg,
//         #05020d 0%,
//         #0b0520 38%,
//         #13082d 68%,
//         #1b0b3d 100%
//       )
//     `,

//     /* Lumières cosmiques */
//     glow1: [139, 92, 246],
//     glow2: [99, 102, 241],

//     /* Accent */
//     accent: "#8b5cf6",

//     /* Étoiles / particules */
//     particles: {
//       color: [224, 231, 255],
//       count: 150,
//       type: "galaxy",
//       nebula: true,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-galaxy": {

//     /* Galaxy claire */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 15%,
//         rgba(196, 181, 253, 0.38) 0%,
//         transparent 35%
//       ),
//       radial-gradient(
//         ellipse at 85% 25%,
//         rgba(165, 180, 252, 0.30) 0%,
//         transparent 36%
//       ),
//       radial-gradient(
//         ellipse at 50% 85%,
//         rgba(221, 214, 254, 0.48) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         155deg,
//         #faf9ff 0%,
//         #f1efff 32%,
//         #e6e2ff 65%,
//         #d9d4ff 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [124, 58, 237],
//     glow2: [79, 70, 229],

//     /* Accent */
//     accent: "#6d5ce7",

//     /* Particules */
//     particles: {
//       color: [67, 56, 202],
//       count: 70,
//       type: "galaxy",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

//   /* =========================================================
//    🔵 SIMPLE — PREMIUM
//    Clean SaaS × Neutral × Blue Accent
//    ========================================================= */

//   "dark-simple": {

//     /* Fond neutre */
//     bg: `
//       radial-gradient(
//         circle at 15% 10%,
//         rgba(59, 130, 246, 0.10) 0%,
//         transparent 32%
//       ),
//       radial-gradient(
//         circle at 85% 85%,
//         rgba(96, 165, 250, 0.06) 0%,
//         transparent 34%
//       ),
//       linear-gradient(
//         145deg,
//         #080c14 0%,
//         #0f172a 48%,
//         #172033 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [59, 130, 246],
//     glow2: [96, 165, 250],

//     /* Accent */
//     accent: "#3b82f6",

//     /* Particules très discrètes */
//     particles: {
//       color: [148, 163, 184],
//       count: 40,
//       type: "floating-dots",
//       nebula: false,
//       light: false
//     },

//     /* Relief léger */
//     relief: true,
//   },


//   "light-simple": {

//     /* Fond clair neutre */
//     bg: `
//       radial-gradient(
//         circle at 15% 10%,
//         rgba(147, 197, 253, 0.18) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         circle at 85% 85%,
//         rgba(191, 219, 254, 0.20) 0%,
//         transparent 36%
//       ),
//       linear-gradient(
//         145deg,
//         #f8fafc 0%,
//         #f1f5f9 52%,
//         #e8f0f8 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [37, 99, 235],
//     glow2: [59, 130, 246],

//     /* Accent */
//     accent: "#2563eb",

//     /* Particules très légères */
//     particles: {
//       color: [71, 85, 105],
//       count: 28,
//       type: "floating-dots",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

//   /* =========================================================
//    👑 LUXURY — PREMIUM
//    Black × Champagne × Gold
//    Elegant / Premium / Sophisticated
//    ========================================================= */

//   "dark-luxury": {

//     /* Fond luxueux */
//     bg: `
//       radial-gradient(
//         ellipse at 18% 12%,
//         rgba(212, 175, 55, 0.14) 0%,
//         transparent 32%
//       ),
//       radial-gradient(
//         ellipse at 82% 80%,
//         rgba(245, 215, 110, 0.08) 0%,
//         transparent 36%
//       ),
//       linear-gradient(
//         145deg,
//         #080704 0%,
//         #12100a 42%,
//         #1b160b 72%,
//         #241c0c 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [212, 175, 55],
//     glow2: [245, 215, 110],

//     /* Accent */
//     accent: "#d4af37",

//     /* Poussière dorée */
//     particles: {
//       color: [245, 215, 110],
//       count: 65,
//       type: "gold-dust",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-luxury": {

//     /* Fond ivoire / champagne */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 10%,
//         rgba(245, 215, 110, 0.24) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         ellipse at 85% 80%,
//         rgba(212, 175, 55, 0.14) 0%,
//         transparent 38%
//       ),
//       linear-gradient(
//         145deg,
//         #fffdf7 0%,
//         #faf5e8 42%,
//         #f4ead2 72%,
//         #ecdfbd 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [180, 140, 45],
//     glow2: [212, 175, 55],

//     /* Accent */
//     accent: "#9a7215",

//     /* Poussière dorée très discrète */
//     particles: {
//       color: [120, 90, 25],
//       count: 38,
//       type: "gold-dust",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

//   /* =========================================================
//    🌴 EXOTIC — PREMIUM
//    Sunset × Tropical × Amber × Coral
//    Warm / Vibrant / Elegant
//    ========================================================= */

//   "dark-exotic": {

//     /* Fond tropical profond */
//     bg: `
//       radial-gradient(
//         ellipse at 18% 15%,
//         rgba(249, 115, 22, 0.18) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         ellipse at 82% 78%,
//         rgba(251, 146, 60, 0.10) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(234, 88, 12, 0.12) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         145deg,
//         #120604 0%,
//         #241008 40%,
//         #3a160b 72%,
//         #4a1c0c 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [249, 115, 22],
//     glow2: [251, 146, 60],

//     /* Accent */
//     accent: "#f97316",

//     /* Lucioles */
//     particles: {
//       color: [255, 214, 150],
//       count: 60,
//       type: "fireflies",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-exotic": {

//     /* Fond clair chaud */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 12%,
//         rgba(253, 186, 116, 0.30) 0%,
//         transparent 35%
//       ),
//       radial-gradient(
//         ellipse at 85% 80%,
//         rgba(251, 146, 60, 0.16) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(254, 215, 170, 0.34) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         145deg,
//         #fffaf5 0%,
//         #fff2e6 38%,
//         #ffe5d0 70%,
//         #fbd5bd 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [234, 88, 12],
//     glow2: [249, 115, 22],

//     /* Accent */
//     accent: "#c2410c",

//     /* Lucioles discrètes */
//     particles: {
//       color: [124, 45, 18],
//       count: 32,
//       type: "fireflies",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

//   /* =========================================================
//    🌿 VERDÂTRE — PREMIUM
//    Emerald Forest × Nature × Fresh Green
//    Organic / Calm / Modern
//    ========================================================= */

//   "dark-verdatre": {

//     /* Forêt profonde */
//     bg: `
//       radial-gradient(
//         ellipse at 18% 12%,
//         rgba(16, 185, 129, 0.16) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         ellipse at 82% 78%,
//         rgba(52, 211, 153, 0.09) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(5, 150, 105, 0.12) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         145deg,
//         #020b07 0%,
//         #052019 42%,
//         #07382c 72%,
//         #07533f 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [16, 185, 129],
//     glow2: [52, 211, 153],

//     /* Accent */
//     accent: "#10b981",

//     /* Particules naturelles */
//     particles: {
//       color: [110, 231, 183],
//       count: 55,
//       type: "nature",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-verdatre": {

//     /* Fond eucalyptus / sauge */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 10%,
//         rgba(167, 243, 208, 0.30) 0%,
//         transparent 35%
//       ),
//       radial-gradient(
//         ellipse at 85% 80%,
//         rgba(110, 231, 183, 0.18) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(209, 250, 229, 0.38) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         145deg,
//         #f6fcf8 0%,
//         #edf9f2 38%,
//         #dff3e8 70%,
//         #ccebdd 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [5, 150, 105],
//     glow2: [16, 185, 129],

//     /* Accent */
//     accent: "#047857",

//     /* Particules très discrètes */
//     particles: {
//       color: [6, 95, 70],
//       count: 30,
//       type: "nature",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },


//   /* =========================================================
//    💗 GLAMOUR — PREMIUM
//    Velvet × Rose × Champagne × Magenta
//    Elegant / Chic / Sophisticated
//    ========================================================= */

//   "dark-glamour": {

//     /* Fond velours */
//     bg: `
//       radial-gradient(
//         ellipse at 18% 12%,
//         rgba(219, 39, 119, 0.18) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         ellipse at 82% 78%,
//         rgba(244, 114, 182, 0.10) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(190, 24, 93, 0.12) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         145deg,
//         #10030a 0%,
//         #210713 40%,
//         #330b1f 70%,
//         #450d29 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [219, 39, 119],
//     glow2: [244, 114, 182],

//     /* Accent */
//     accent: "#db2777",

//     /* Particules */
//     particles: {
//       color: [251, 180, 220],
//       count: 55,
//       type: "hearts",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-glamour": {

//     /* Rose poudré / champagne */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 10%,
//         rgba(251, 207, 232, 0.34) 0%,
//         transparent 35%
//       ),
//       radial-gradient(
//         ellipse at 85% 78%,
//         rgba(244, 114, 182, 0.14) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(253, 230, 240, 0.42) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         145deg,
//         #fffafd 0%,
//         #fdf3f8 38%,
//         #f9e5ef 70%,
//         #f4d5e3 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [190, 24, 93],
//     glow2: [219, 39, 119],

//     /* Accent */
//     accent: "#be185d",

//     /* Particules discrètes */
//     particles: {
//       color: [131, 24, 67],
//       count: 30,
//       type: "hearts",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },


//   /* =========================================================
//    🩶 GRAPHITE — PREMIUM
//    Carbon × Steel × Platinum
//    Minimal / Industrial / Monochrome
//    ========================================================= */

//   "dark-graphite": {

//     /* Carbone / métal sombre */
//     bg: `
//       radial-gradient(
//         ellipse at 18% 12%,
//         rgba(161, 161, 170, 0.08) 0%,
//         transparent 32%
//       ),
//       radial-gradient(
//         ellipse at 82% 82%,
//         rgba(113, 113, 122, 0.07) 0%,
//         transparent 36%
//       ),
//       linear-gradient(
//         145deg,
//         #070709 0%,
//         #111113 42%,
//         #1b1b1f 72%,
//         #25252a 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [161, 161, 170],
//     glow2: [212, 212, 216],

//     /* Accent */
//     accent: "#a1a1aa",

//     /* Poussière métallique */
//     particles: {
//       color: [190, 190, 198],
//       count: 35,
//       type: "metal-dust",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-graphite": {

//     /* Argent / platine */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 10%,
//         rgba(255, 255, 255, 0.65) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         ellipse at 85% 80%,
//         rgba(161, 161, 170, 0.14) 0%,
//         transparent 38%
//       ),
//       linear-gradient(
//         145deg,
//         #ffffff 0%,
//         #f4f4f5 38%,
//         #e7e7e9 70%,
//         #dcdcdf 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [82, 82, 91],
//     glow2: [113, 113, 122],

//     /* Accent */
//     accent: "#3f3f46",

//     /* Poussière métallique */
//     particles: {
//       color: [82, 82, 91],
//       count: 25,
//       type: "metal-dust",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },


//   /* =========================================================
//    🌋 VOLCANIC — PREMIUM
//    Obsidian × Magma × Ember
//    Dramatic / Powerful / Fiery
//    ========================================================= */

//   "dark-volcanic": {

//     /* Roche volcanique + magma */
//     bg: `
//       radial-gradient(
//         ellipse at 20% 18%,
//         rgba(239, 68, 68, 0.18) 0%,
//         transparent 32%
//       ),
//       radial-gradient(
//         ellipse at 80% 72%,
//         rgba(249, 115, 22, 0.16) 0%,
//         transparent 36%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(220, 38, 38, 0.14) 0%,
//         transparent 40%
//       ),
//       linear-gradient(
//         160deg,
//         #080303 0%,
//         #1a0505 38%,
//         #320907 70%,
//         #451108 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [239, 68, 68],
//     glow2: [249, 115, 22],

//     /* Accent */
//     accent: "#ef4444",

//     /* Étincelles de lave */
//     particles: {
//       color: [255, 170, 100],
//       count: 65,
//       type: "lava-sparks",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-volcanic": {

//     /* Roche chaude / pierre claire */
//     bg: `
//       radial-gradient(
//         ellipse at 15% 10%,
//         rgba(254, 202, 202, 0.34) 0%,
//         transparent 35%
//       ),
//       radial-gradient(
//         ellipse at 85% 78%,
//         rgba(253, 186, 116, 0.18) 0%,
//         transparent 38%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(254, 215, 170, 0.30) 0%,
//         transparent 42%
//       ),
//       linear-gradient(
//         160deg,
//         #fffafa 0%,
//         #fff2ef 36%,
//         #fbe3dc 68%,
//         #f5d0c6 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [185, 28, 28],
//     glow2: [220, 38, 38],

//     /* Accent */
//     accent: "#b91c1c",

//     /* Étincelles discrètes */
//     particles: {
//       color: [127, 29, 29],
//       count: 28,
//       type: "lava-sparks",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

//   /* =========================================================
//    🌊 OCEANIC — PREMIUM
//    Deep Ocean × Aqua × Glass
//    ========================================================= */

//   "dark-oceanic": {

//     /* Background principal */
//     bg: `
//       radial-gradient(
//         circle at 20% 15%,
//         rgba(14, 116, 144, 0.28) 0%,
//         transparent 35%
//       ),
//       radial-gradient(
//         circle at 80% 70%,
//         rgba(6, 182, 212, 0.16) 0%,
//         transparent 40%
//       ),
//       linear-gradient(
//         180deg,
//         #020b14 0%,
//         #041c2b 38%,
//         #063b52 72%,
//         #07556f 100%
//       )
//     `,

//     /* Lumières atmosphériques */
//     glow1: [34, 211, 238],
//     glow2: [8, 145, 178],

//     /* Accent */
//     accent: "#0891b2",

//     /* Particules */
//     particles: {
//       color: [103, 232, 249],
//       count: 85,
//       type: "water-bubbles",
//       nebula: true,
//       light: false
//     },

//     /* Profondeur */
//     relief: true,
//   },


//   "light-oceanic": {

//     /* Background principal */
//     bg: `
//       radial-gradient(
//         circle at 15% 10%,
//         rgba(103, 232, 249, 0.32) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         circle at 85% 75%,
//         rgba(8, 145, 178, 0.12) 0%,
//         transparent 40%
//       ),
//       linear-gradient(
//         180deg,
//         #f3fbfd 0%,
//         #e1f5f8 35%,
//         #c8eaf0 68%,
//         #b3e0e8 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [6, 182, 212],
//     glow2: [8, 145, 178],

//     /* Accent */
//     accent: "#0891b2",

//     /* Particules */
//     particles: {
//       color: [8, 145, 178],
//       count: 55,
//       type: "water-bubbles",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

//   // /* ===== MODERN ===== */

//   /* =========================================================
//    ⚡ MODERN — PREMIUM
//    Digital × Graphite × Electric Cyan
//    Clean / Futuristic / SaaS
//    ========================================================= */

//   "dark-modern": {

//     /* Fond digital */
//     bg: `
//       radial-gradient(
//         circle at 18% 12%,
//         rgba(59, 130, 246, 0.12) 0%,
//         transparent 32%
//       ),
//       radial-gradient(
//         circle at 82% 78%,
//         rgba(34, 211, 238, 0.10) 0%,
//         transparent 36%
//       ),
//       linear-gradient(
//         145deg,
//         #010409 0%,
//         #0b1017 42%,
//         #111923 72%,
//         #17212c 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [59, 130, 246],
//     glow2: [34, 211, 238],

//     /* Accent */
//     accent: "#22d3ee",

//     /* Grille digitale */
//     particles: {
//       color: [34, 211, 238],
//       count: 55,
//       type: "digital-grid",
//       nebula: false,
//       light: false
//     },

//     /* Relief */
//     relief: true,
//   },


//   "light-modern": {

//     /* Fond clair technologique */
//     bg: `
//       radial-gradient(
//         circle at 15% 10%,
//         rgba(147, 197, 253, 0.22) 0%,
//         transparent 34%
//       ),
//       radial-gradient(
//         circle at 85% 78%,
//         rgba(103, 232, 249, 0.16) 0%,
//         transparent 38%
//       ),
//       linear-gradient(
//         145deg,
//         #fbfdff 0%,
//         #f1f7fb 38%,
//         #e7f2f8 70%,
//         #dcecf4 100%
//       )
//     `,

//     /* Lumières */
//     glow1: [37, 99, 235],
//     glow2: [8, 145, 178],

//     /* Accent */
//     accent: "#0369a1",

//     /* Grille digitale */
//     particles: {
//       color: [30, 64, 175],
//       count: 35,
//       type: "digital-grid",
//       nebula: false,
//       light: true
//     },

//     /* Relief */
//     relief: true,
//   },

// };

// const DEFAULT = THEMES["dark-galaxy"];
// export function getTheme(name) { return THEMES[name] || DEFAULT; }
// export const THEME_NAMES = Object.keys(THEMES);

// export function themeCssVars(name) {
//   const t = getTheme(name);
//   const [r1, g1, b1] = t.glow1;
//   const [r2, g2, b2] = t.glow2;
//   const isLight = String(name).startsWith("light-");
//   return {
//     "--theme-accent": t.accent,
//     "--theme-glow-1": `rgb(${r1},${g1},${b1})`,
//     "--theme-glow-2": `rgb(${r2},${g2},${b2})`,
//     "--theme-glow-soft": `rgba(${r1},${g1},${b1},${isLight ? 0.28 : 0.18})`,
//     "--gradient-start": t.accent,
//     "--gradient-end": `rgb(${r2},${g2},${b2})`,
//     "--glow-color": `rgba(${r1},${g1},${b1},${isLight ? 0.35 : 0.35})`,
//   };
// }

// function ThemeBackground({ theme = "dark-galaxy" }) {
//   const canvasRef = useRef(null);
//   const cfg = getTheme(theme);
//   const isLight = String(theme).startsWith("light-");

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d", { alpha: true });
//     const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
//     const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
//     let particles = [];
//     let frame = 0;
//     let running = true;
//     let t0 = performance.now();

//     const resize = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       const w = window.innerWidth, h = window.innerHeight;
//       canvas.width = Math.floor(w * dpr);
//       canvas.height = Math.floor(h * dpr);
//       canvas.style.width = w + "px";
//       canvas.style.height = h + "px";
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       particles = buildParticles(cfg, w, h, { reduced, isMobile, isLight });
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     const tick = (now) => {
//       if (!running) return;
//       const w = window.innerWidth, h = window.innerHeight;
//       const time = (now - t0) / 1000;
//       ctx.clearRect(0, 0, w, h);
//       if (cfg.relief && isLight) drawHoneyRelief(ctx, w, h, cfg, time);
//       if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, time, isLight);
//       for (const p of particles) { update(p, w, h, time); draw(ctx, p, isLight); }
//       frame = requestAnimationFrame(tick);
//     };
//     if (!reduced) frame = requestAnimationFrame(tick);
//     else {
//       const w = window.innerWidth, h = window.innerHeight;
//       if (cfg.relief && isLight) drawHoneyRelief(ctx, w, h, cfg, 0);
//       if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, 0, isLight);
//       for (const p of particles) draw(ctx, p, isLight);
//     }
//     return () => { running = false; cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
//   }, [theme]);

//   const [r1, g1, b1] = cfg.glow1;
//   const [r2, g2, b2] = cfg.glow2;
//   const glowA = isLight ? 0.22 : 0.2;

//   return (
//     <>
//       <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, background: cfg.bg, transition: "background 0.85s ease" }} />
//       <div aria-hidden style={{
//         position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
//         background: `radial-gradient(ellipse at 18% 25%, rgba(${r1},${g1},${b1},${glowA}) 0%, transparent 50%), radial-gradient(ellipse at 82% 75%, rgba(${r2},${g2},${b2},${glowA * 0.9}) 0%, transparent 52%)`,
//         animation: "tbGlowPulse 8s ease-in-out infinite alternate",
//       }} />
//       <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />
//       <style>{`@keyframes tbGlowPulse { from { opacity: 0.55; } to { opacity: 1; } }`}</style>
//     </>
//   );
// }

// /** Relief hex soft (inspiration image utilisateur) — uniquement light */
// function drawHoneyRelief(ctx, w, h, cfg, time) {
//   const [r, g, b] = cfg.glow1;
//   const size = 48;
//   const hHex = size * Math.sqrt(3);
//   ctx.save();
//   ctx.globalAlpha = 0.14;
//   for (let row = -1; row < h / (hHex * 0.75) + 2; row++) {
//     for (let col = -1; col < w / (size * 1.5) + 2; col++) {
//       const x = col * size * 1.5 + (row % 2 ? size * 0.75 : 0);
//       const y = row * hHex * 0.75;
//       const pulse = 0.85 + 0.15 * Math.sin(time * 0.4 + row * 0.3 + col * 0.2);
//       drawHex(ctx, x, y, size * 0.48 * pulse, r, g, b);
//     }
//   }
//   ctx.restore();
// }

// function drawHex(ctx, cx, cy, r, R, G, B) {
//   ctx.beginPath();
//   for (let i = 0; i < 6; i++) {
//     const a = (Math.PI / 3) * i + Math.PI / 6;
//     const x = cx + r * Math.cos(a);
//     const y = cy + r * Math.sin(a);
//     if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
//   }
//   ctx.closePath();
//   ctx.strokeStyle = `rgba(${R},${G},${B},0.55)`;
//   ctx.lineWidth = 1.2;
//   ctx.stroke();
//   // ombre douce un côté
//   ctx.beginPath();
//   for (let i = 0; i < 4; i++) {
//     const a = (Math.PI / 3) * i + Math.PI / 6;
//     const x = cx + r * Math.cos(a);
//     const y = cy + r * Math.sin(a);
//     if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
//   }
//   ctx.strokeStyle = `rgba(255,255,255,0.25)`;
//   ctx.lineWidth = 1;
//   ctx.stroke();
// }

// function drawMilkyWay(ctx, w, h, cfg, time, isLight) {
//   const [r1, g1, b1] = cfg.glow1;
//   const [r2, g2, b2] = cfg.glow2;
//   ctx.save();
//   ctx.translate(w * 0.5, h * 0.5);
//   ctx.rotate(-0.4 + Math.sin(time * 0.05) * 0.02);
//   const band = ctx.createLinearGradient(-w, 0, w, 0);
//   const a = isLight ? 0.2 : 0.14;
//   band.addColorStop(0, "transparent");
//   band.addColorStop(0.25, `rgba(${r1},${g1},${b1},${a})`);
//   band.addColorStop(0.5, `rgba(${r2},${g2},${b2},${a * 1.4})`);
//   band.addColorStop(0.75, `rgba(${r1},${g1},${b1},${a})`);
//   band.addColorStop(1, "transparent");
//   ctx.fillStyle = band;
//   ctx.fillRect(-w, -h * 0.09, w * 2, h * 0.18);
//   ctx.restore();
// }

// function buildParticles(cfg, w, h, { reduced, isMobile, isLight }) {
//   const { type, nebula, color } = cfg.particles;
//   let count = cfg.particles.count;
//   if (isMobile) count = Math.floor(count * 0.45);
//   if (reduced) count = Math.floor(count * 0.25);
//   const all = [];
//   const alphaBoost = isLight ? 1.45 : 1;

//   for (let i = 0; i < count; i++) {
//     const p = {
//       x: Math.random() * w, y: Math.random() * h,
//       r: 0.5 + Math.random() * 1.8,
//       alpha: (0.3 + Math.random() * 0.65) * alphaBoost,
//       speed: 0.003 + Math.random() * 0.008,
//       color, type, isNebula: false, phase: Math.random() * Math.PI * 2,
//     };
//     switch (type) {
//       case "galaxy":
//         p.x = w * (0.12 + Math.random() * 0.76);
//         p.y = h * (0.18 + Math.random() * 0.64);
//         p.r = Math.random() < 0.1 ? 2 + Math.random() * 2.5 : 0.4 + Math.random() * 1.4;
//         p.twinkle = 0.008 + Math.random() * 0.02;
//         p.depth = Math.random();
//         break;
//       case "gold-dust":
//         p.r = 0.7 + Math.random() * 2.5; p.dy = -(0.1 + Math.random() * 0.4); p.dx = (Math.random() - 0.5) * 0.3; break;
//       case "fireflies":
//         p.r = 1.3 + Math.random() * 2.5; p.dx = (Math.random() - 0.5) * 0.4; p.dy = (Math.random() - 0.5) * 0.4;
//         p.twinkle = 0.015 + Math.random() * 0.03; break;
//       case "nature":
//         p.r = 1.5 + Math.random() * 2.3; p.angle = Math.random() * Math.PI * 2;
//         p.spin = (Math.random() - 0.5) * 0.035; p.dy = 0.2 + Math.random() * 0.4; p.dx = (Math.random() - 0.5) * 0.45; break;
//       case "hearts":
//         p.r = 2.4 + Math.random() * 3.6; p.dy = -(0.15 + Math.random() * 0.35); p.dx = (Math.random() - 0.5) * 0.25; break;
//       case "metal-dust":
//         p.r = 0.6 + Math.random() * 1.5; p.dx = (Math.random() - 0.5) * 0.18; p.dy = (Math.random() - 0.5) * 0.18; break;
//       case "lava-sparks":
//         p.r = 0.8 + Math.random() * 2.3; p.dy = -(0.5 + Math.random() * 1.4); p.dx = (Math.random() - 0.5) * 0.6; break;
//       case "water-bubbles":
//         p.r = 1.6 + Math.random() * 5; p.dy = -(0.25 + Math.random() * 0.7); p.wobble = 0.02 + Math.random() * 0.04; break;
//       case "digital-grid":
//         p.x = Math.floor(Math.random() * 32) * (w / 32);
//         p.y = Math.floor(Math.random() * 20) * (h / 20);
//         p.r = 1.3; p.pulse = Math.random() * Math.PI * 2; p.line = Math.random() > 0.65; break;
//       default:
//         p.dx = (Math.random() - 0.5) * 0.14; p.dy = (Math.random() - 0.5) * 0.14; break;
//     }
//     all.push(p);
//   }

//   if (nebula && !reduced) {
//     const nCount = isMobile ? 10 : type === "galaxy" ? 24 : 14;
//     for (let i = 0; i < nCount; i++) {
//       all.push({
//         isNebula: true, x: Math.random() * w, y: Math.random() * h,
//         r: 60 + Math.random() * (type === "galaxy" ? 150 : 100),
//         dx: (Math.random() - 0.5) * 0.04, dy: (Math.random() - 0.5) * 0.04,
//         hue: Math.random() > 0.5 ? cfg.glow1 : cfg.glow2,
//         alphaMul: isLight ? 0.12 : 0.09,
//       });
//     }
//   }
//   return all;
// }

// function update(p, w, h, time) {
//   if (p.isNebula) {
//     p.x += p.dx; p.y += p.dy;
//     if (p.x < -p.r || p.x > w + p.r) p.dx *= -1;
//     if (p.y < -p.r || p.y > h + p.r) p.dy *= -1;
//     return;
//   }
//   p.phase = (p.phase || 0) + (p.twinkle || p.speed || 0.005);
//   if (p.twinkle != null) p.alpha = 0.35 + (Math.sin(p.phase) + 1) * 0.4;
//   else if (p.pulse != null) { p.pulse += 0.035; p.alpha = 0.28 + (Math.sin(p.pulse) + 1) * 0.35; }
//   else { p.alpha += p.speed; if (p.alpha > 0.95 || p.alpha < 0.15) p.speed *= -1; }

//   if (p.type === "galaxy" && p.depth != null) {
//     p.x += Math.sin(time * 0.15 + p.phase) * 0.08 * p.depth;
//     p.y += Math.cos(time * 0.12 + p.phase) * 0.05 * p.depth;
//   }
//   if (p.dx != null) p.x += p.dx;
//   if (p.dy != null) p.y += p.dy;
//   if (p.wobble) p.x += Math.sin(p.phase) * p.wobble * 10;
//   if (p.spin != null) p.angle = (p.angle || 0) + p.spin;

//   if (["lava-sparks", "gold-dust", "hearts"].includes(p.type)) {
//     if (p.y < -15) { p.y = h + 10; p.x = Math.random() * w; }
//   } else if (p.type === "water-bubbles") {
//     if (p.y < -20) { p.y = h + 12; p.x = Math.random() * w; }
//   } else if (p.type === "nature") {
//     if (p.y > h + 20) { p.y = -12; p.x = Math.random() * w; }
//   } else if (p.type !== "digital-grid") {
//     if (p.x < -8) p.x = w + 8; if (p.x > w + 8) p.x = -8;
//     if (p.y < -8) p.y = h + 8; if (p.y > h + 8) p.y = -8;
//   }
// }

// function draw(ctx, p, isLight) {
//   if (p.isNebula) {
//     const [r, g, b] = p.hue;
//     const a = p.alphaMul || (isLight ? 0.12 : 0.08);
//     const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
//     grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
//     grad.addColorStop(1, "rgba(0,0,0,0)");
//     ctx.fillStyle = grad;
//     ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
//     return;
//   }
//   const [r, g, b] = p.color;
//   const a = Math.max(0, Math.min(1, p.alpha));

//   if (p.type === "galaxy" || p.type === "gold-dust") {
//     ctx.save(); ctx.translate(p.x, p.y);
//     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
//     ctx.beginPath();
//     for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.lineTo(0, p.r * 2.5); ctx.lineTo(p.r * 0.32, p.r * 0.32); }
//     ctx.closePath(); ctx.fill();
//     ctx.beginPath(); ctx.arc(0, 0, p.r * 0.4, 0, Math.PI * 2);
//     ctx.fillStyle = `rgba(255,255,255,${a * (isLight ? 0.25 : 0.55)})`; ctx.fill();
//     ctx.restore(); return;
//   }
//   if (p.type === "hearts") {
//     ctx.save(); ctx.translate(p.x, p.y); ctx.scale(p.r / 6, p.r / 6);
//     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
//     ctx.beginPath(); ctx.moveTo(0, 3);
//     ctx.bezierCurveTo(-5, -2, -5, -6, 0, -4); ctx.bezierCurveTo(5, -6, 5, -2, 0, 3);
//     ctx.fill(); ctx.restore(); return;
//   }
//   if (p.type === "nature") {
//     ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle || 0);
//     ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
//     ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.6, p.r * 0.95, 0, 0, Math.PI * 2); ctx.fill();
//     ctx.restore(); return;
//   }
//   if (p.type === "digital-grid") {
//     ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.8})`;
//     ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
//     if (p.line) {
//       ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.25})`; ctx.lineWidth = 0.7;
//       ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 48, p.y); ctx.stroke();
//     }
//     return;
//   }
//   if (p.type === "water-bubbles") {
//     ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//     ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.95})`; ctx.lineWidth = isLight ? 1.8 : 1.2; ctx.stroke();
//     ctx.beginPath(); ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, p.r * 0.22, 0, Math.PI * 2);
//     ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`; ctx.fill(); return;
//   }
//   if (p.type === "fireflies" || p.type === "lava-sparks") {
//     const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
//     glow.addColorStop(0, `rgba(${r},${g},${b},${a})`);
//     glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
//     ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2); ctx.fill();
//     ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
//     ctx.fillStyle = `rgba(255,255,230,${a})`; ctx.fill(); return;
//   }
//   ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//   ctx.fillStyle = `rgba(${r},${g},${b},${a})`; ctx.fill();
// }

// export default ThemeBackground;

import { useEffect, useRef } from "react";

const THEMES = {
  /* =========================================================
     🌌 GALAXY — PREMIUM
     ========================================================= */
  "dark-galaxy": {
    bg: `
radial-gradient(ellipse at 18% 18%, rgba(124, 58, 237, 0.24) 0%, transparent 32%),
radial-gradient(ellipse at 82% 28%, rgba(79, 70, 229, 0.20) 0%, transparent 34%),
radial-gradient(ellipse at 50% 85%, rgba(168, 85, 247, 0.14) 0%, transparent 42%),
linear-gradient(155deg, #05020d 0%, #0b0520 38%, #13082d 68%, #1b0b3d 100%)
`,
    glow1: [139, 92, 246],
    glow2: [99, 102, 241],
    accent: "#8b5cf6",
    particles: { color: [224, 231, 255], count: 150, type: "galaxy", nebula: true, light: false },
    relief: true,
  },
  "light-galaxy": {
    bg: `
radial-gradient(ellipse at 15% 15%, rgba(196, 181, 253, 0.38) 0%, transparent 35%),
radial-gradient(ellipse at 85% 25%, rgba(165, 180, 252, 0.30) 0%, transparent 36%),
radial-gradient(ellipse at 50% 85%, rgba(221, 214, 254, 0.48) 0%, transparent 42%),
linear-gradient(155deg, #faf9ff 0%, #f1efff 32%, #e6e2ff 65%, #d9d4ff 100%)
`,
    glow1: [124, 58, 237],
    glow2: [79, 70, 229],
    accent: "#6d5ce7",
    particles: { color: [67, 56, 202], count: 70, type: "galaxy", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     🔵 SIMPLE — PREMIUM
     ========================================================= */
  "dark-simple": {
    bg: `
radial-gradient(circle at 15% 10%, rgba(59, 130, 246, 0.10) 0%, transparent 32%),
radial-gradient(circle at 85% 85%, rgba(96, 165, 250, 0.06) 0%, transparent 34%),
linear-gradient(145deg, #080c14 0%, #0f172a 48%, #172033 100%)
`,
    glow1: [59, 130, 246],
    glow2: [96, 165, 250],
    accent: "#3b82f6",
    particles: { color: [148, 163, 184], count: 40, type: "floating-dots", nebula: false, light: false },
    relief: true,
  },
  "light-simple": {
    bg: `
radial-gradient(circle at 15% 10%, rgba(147, 197, 253, 0.18) 0%, transparent 34%),
radial-gradient(circle at 85% 85%, rgba(191, 219, 254, 0.20) 0%, transparent 36%),
linear-gradient(145deg, #f8fafc 0%, #f1f5f9 52%, #e8f0f8 100%)
`,
    glow1: [37, 99, 235],
    glow2: [59, 130, 246],
    accent: "#2563eb",
    particles: { color: [71, 85, 105], count: 28, type: "floating-dots", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     👑 LUXURY — PREMIUM
     ========================================================= */
  "dark-luxury": {
    bg: `
radial-gradient(ellipse at 18% 12%, rgba(212, 175, 55, 0.14) 0%, transparent 32%),
radial-gradient(ellipse at 82% 80%, rgba(245, 215, 110, 0.08) 0%, transparent 36%),
linear-gradient(145deg, #080704 0%, #12100a 42%, #1b160b 72%, #241c0c 100%)
`,
    glow1: [212, 175, 55],
    glow2: [245, 215, 110],
    accent: "#d4af37",
    particles: { color: [245, 215, 110], count: 65, type: "gold-dust", nebula: false, light: false },
    relief: true,
  },
  "light-luxury": {
    bg: `
radial-gradient(ellipse at 15% 10%, rgba(245, 215, 110, 0.24) 0%, transparent 34%),
radial-gradient(ellipse at 85% 80%, rgba(212, 175, 55, 0.14) 0%, transparent 38%),
linear-gradient(145deg, #fffdf7 0%, #faf5e8 42%, #f4ead2 72%, #ecdfbd 100%)
`,
    glow1: [180, 140, 45],
    glow2: [212, 175, 55],
    accent: "#9a7215",
    particles: { color: [120, 90, 25], count: 38, type: "gold-dust", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     🌴 EXOTIC — PREMIUM
     ========================================================= */
  "dark-exotic": {
    bg: `
radial-gradient(ellipse at 18% 15%, rgba(249, 115, 22, 0.18) 0%, transparent 34%),
radial-gradient(ellipse at 82% 78%, rgba(251, 146, 60, 0.10) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(234, 88, 12, 0.12) 0%, transparent 42%),
linear-gradient(145deg, #120604 0%, #241008 40%, #3a160b 72%, #4a1c0c 100%)
`,
    glow1: [249, 115, 22],
    glow2: [251, 146, 60],
    accent: "#f97316",
    particles: { color: [255, 214, 150], count: 60, type: "fireflies", nebula: false, light: false },
    relief: true,
  },
  "light-exotic": {
    bg: `
radial-gradient(ellipse at 15% 12%, rgba(253, 186, 116, 0.30) 0%, transparent 35%),
radial-gradient(ellipse at 85% 80%, rgba(251, 146, 60, 0.16) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(254, 215, 170, 0.34) 0%, transparent 42%),
linear-gradient(145deg, #fffaf5 0%, #fff2e6 38%, #ffe5d0 70%, #fbd5bd 100%)
`,
    glow1: [234, 88, 12],
    glow2: [249, 115, 22],
    accent: "#c2410c",
    particles: { color: [124, 45, 18], count: 32, type: "fireflies", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     🌿 VERDÂTRE — PREMIUM
     ========================================================= */
  "dark-verdatre": {
    bg: `
radial-gradient(ellipse at 18% 12%, rgba(16, 185, 129, 0.16) 0%, transparent 34%),
radial-gradient(ellipse at 82% 78%, rgba(52, 211, 153, 0.09) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(5, 150, 105, 0.12) 0%, transparent 42%),
linear-gradient(145deg, #020b07 0%, #052019 42%, #07382c 72%, #07533f 100%)
`,
    glow1: [16, 185, 129],
    glow2: [52, 211, 153],
    accent: "#10b981",
    particles: { color: [110, 231, 183], count: 55, type: "nature", nebula: false, light: false },
    relief: true,
  },
  "light-verdatre": {
    bg: `
radial-gradient(ellipse at 15% 10%, rgba(167, 243, 208, 0.30) 0%, transparent 35%),
radial-gradient(ellipse at 85% 80%, rgba(110, 231, 183, 0.18) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(209, 250, 229, 0.38) 0%, transparent 42%),
linear-gradient(145deg, #f6fcf8 0%, #edf9f2 38%, #dff3e8 70%, #ccebdd 100%)
`,
    glow1: [5, 150, 105],
    glow2: [16, 185, 129],
    accent: "#047857",
    particles: { color: [6, 95, 70], count: 30, type: "nature", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     💗 GLAMOUR — PREMIUM
     ========================================================= */
  "dark-glamour": {
    bg: `
radial-gradient(ellipse at 18% 12%, rgba(219, 39, 119, 0.18) 0%, transparent 34%),
radial-gradient(ellipse at 82% 78%, rgba(244, 114, 182, 0.10) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(190, 24, 93, 0.12) 0%, transparent 42%),
linear-gradient(145deg, #10030a 0%, #210713 40%, #330b1f 70%, #450d29 100%)
`,
    glow1: [219, 39, 119],
    glow2: [244, 114, 182],
    accent: "#db2777",
    particles: { color: [251, 180, 220], count: 55, type: "hearts", nebula: false, light: false },
    relief: true,
  },
  "light-glamour": {
    bg: `
radial-gradient(ellipse at 15% 10%, rgba(251, 207, 232, 0.34) 0%, transparent 35%),
radial-gradient(ellipse at 85% 78%, rgba(244, 114, 182, 0.14) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(253, 230, 240, 0.42) 0%, transparent 42%),
linear-gradient(145deg, #fffafd 0%, #fdf3f8 38%, #f9e5ef 70%, #f4d5e3 100%)
`,
    glow1: [190, 24, 93],
    glow2: [219, 39, 119],
    accent: "#be185d",
    particles: { color: [131, 24, 67], count: 30, type: "hearts", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     🩶 GRAPHITE — PREMIUM
     ========================================================= */
  "dark-graphite": {
    bg: `
radial-gradient(ellipse at 18% 12%, rgba(161, 161, 170, 0.08) 0%, transparent 32%),
radial-gradient(ellipse at 82% 82%, rgba(113, 113, 122, 0.07) 0%, transparent 36%),
linear-gradient(145deg, #070709 0%, #111113 42%, #1b1b1f 72%, #25252a 100%)
`,
    glow1: [161, 161, 170],
    glow2: [212, 212, 216],
    accent: "#a1a1aa",
    particles: { color: [190, 190, 198], count: 35, type: "metal-dust", nebula: false, light: false },
    relief: true,
  },
  "light-graphite": {
    bg: `
radial-gradient(ellipse at 15% 10%, rgba(255, 255, 255, 0.65) 0%, transparent 34%),
radial-gradient(ellipse at 85% 80%, rgba(161, 161, 170, 0.14) 0%, transparent 38%),
linear-gradient(145deg, #ffffff 0%, #f4f4f5 38%, #e7e7e9 70%, #dcdcdf 100%)
`,
    glow1: [82, 82, 91],
    glow2: [113, 113, 122],
    accent: "#3f3f46",
    particles: { color: [82, 82, 91], count: 25, type: "metal-dust", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     🌋 VOLCANIC — PREMIUM
     ========================================================= */
  "dark-volcanic": {
    bg: `
radial-gradient(ellipse at 20% 18%, rgba(239, 68, 68, 0.18) 0%, transparent 32%),
radial-gradient(ellipse at 80% 72%, rgba(249, 115, 22, 0.16) 0%, transparent 36%),
radial-gradient(ellipse at 50% 100%, rgba(220, 38, 38, 0.14) 0%, transparent 40%),
linear-gradient(160deg, #080303 0%, #1a0505 38%, #320907 70%, #451108 100%)
`,
    glow1: [239, 68, 68],
    glow2: [249, 115, 22],
    accent: "#ef4444",
    particles: { color: [255, 170, 100], count: 65, type: "lava-sparks", nebula: false, light: false },
    relief: true,
  },
  "light-volcanic": {
    bg: `
radial-gradient(ellipse at 15% 10%, rgba(254, 202, 202, 0.34) 0%, transparent 35%),
radial-gradient(ellipse at 85% 78%, rgba(253, 186, 116, 0.18) 0%, transparent 38%),
radial-gradient(ellipse at 50% 100%, rgba(254, 215, 170, 0.30) 0%, transparent 42%),
linear-gradient(160deg, #fffafa 0%, #fff2ef 36%, #fbe3dc 68%, #f5d0c6 100%)
`,
    glow1: [185, 28, 28],
    glow2: [220, 38, 38],
    accent: "#b91c1c",
    particles: { color: [127, 29, 29], count: 28, type: "lava-sparks", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     🌊 OCEANIC — PREMIUM
     ========================================================= */
  "dark-oceanic": {
    bg: `
radial-gradient(circle at 20% 15%, rgba(14, 116, 144, 0.28) 0%, transparent 35%),
radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.16) 0%, transparent 40%),
linear-gradient(180deg, #020b14 0%, #041c2b 38%, #063b52 72%, #07556f 100%)
`,
    glow1: [34, 211, 238],
    glow2: [8, 145, 178],
    accent: "#0891b2",
    particles: { color: [103, 232, 249], count: 85, type: "water-bubbles", nebula: true, light: false },
    relief: true,
  },
  "light-oceanic": {
    bg: `
radial-gradient(circle at 15% 10%, rgba(103, 232, 249, 0.32) 0%, transparent 34%),
radial-gradient(circle at 85% 75%, rgba(8, 145, 178, 0.12) 0%, transparent 40%),
linear-gradient(180deg, #f3fbfd 0%, #e1f5f8 35%, #c8eaf0 68%, #b3e0e8 100%)
`,
    glow1: [6, 182, 212],
    glow2: [8, 145, 178],
    accent: "#0891b2",
    particles: { color: [8, 145, 178], count: 55, type: "water-bubbles", nebula: false, light: true },
    relief: true,
  },

  /* =========================================================
     ⚡ MODERN — PREMIUM
     ========================================================= */
  "dark-modern": {
    bg: `
radial-gradient(circle at 18% 12%, rgba(59, 130, 246, 0.12) 0%, transparent 32%),
radial-gradient(circle at 82% 78%, rgba(34, 211, 238, 0.10) 0%, transparent 36%),
linear-gradient(145deg, #010409 0%, #0b1017 42%, #111923 72%, #17212c 100%)
`,
    glow1: [59, 130, 246],
    glow2: [34, 211, 238],
    accent: "#22d3ee",
    particles: { color: [34, 211, 238], count: 55, type: "digital-grid", nebula: false, light: false },
    relief: true,
  },
  "light-modern": {
    bg: `
radial-gradient(circle at 15% 10%, rgba(147, 197, 253, 0.22) 0%, transparent 34%),
radial-gradient(circle at 85% 78%, rgba(103, 232, 249, 0.16) 0%, transparent 38%),
linear-gradient(145deg, #fbfdff 0%, #f1f7fb 38%, #e7f2f8 70%, #dcecf4 100%)
`,
    glow1: [37, 99, 235],
    glow2: [8, 145, 178],
    accent: "#0369a1",
    particles: { color: [30, 64, 175], count: 35, type: "digital-grid", nebula: false, light: true },
    relief: true,
  },
};

const DEFAULT = THEMES["dark-galaxy"];

export function getTheme(name) {
  return THEMES[name] || DEFAULT;
}

export const THEME_NAMES = Object.keys(THEMES);

/** Fonction (comme dans ta version qui compile) — Accueil l’appelle themeCssVars(name) */
export function themeCssVars(name) {
  const t = getTheme(name);
  const [r1, g1, b1] = t.glow1;
  const [r2, g2, b2] = t.glow2;
  const isLight = String(name).startsWith("light-");
  return {
    "--theme-accent": t.accent,
    "--theme-glow-1": `rgb(${r1},${g1},${b1})`,
    "--theme-glow-2": `rgb(${r2},${g2},${b2})`,
    "--theme-glow-soft": `rgba(${r1},${g1},${b1},${isLight ? 0.32 : 0.18})`,
    "--gradient-start": t.accent,
    "--gradient-end": `rgb(${r2},${g2},${b2})`,
    "--glow-color": `rgba(${r1},${g1},${b1},${isLight ? 0.42 : 0.35})`,
    "--logo-glow": `rgba(${r1},${g1},${b1},${isLight ? 0.45 : 0.55})`,
    "--glass-bg": isLight
      ? `rgba(${r1},${g1},${b1},0.08)`
      : `rgba(${r1},${g1},${b1},0.10)`,
    "--glass-border": isLight
      ? `rgba(${r1},${g1},${b1},0.22)`
      : `rgba(255,255,255,0.12)`,
    "--card-bg": isLight ? "rgba(255,255,255,0.88)" : "rgba(10,10,20,0.85)",
  };
}

function ThemeBackground({ theme = "dark-galaxy" }) {
  const canvasRef = useRef(null);
  const cfg = getTheme(theme);
  const isLight = String(theme).startsWith("light-");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    let particles = [];
    let frame = 0;
    let running = true;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = buildParticles(cfg, w, h, { reduced, isMobile, isLight });
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = (now) => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const time = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      if (cfg.relief && isLight) drawHoneyRelief(ctx, w, h, cfg, time);
      if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, time, isLight);
      for (const p of particles) {
        update(p, w, h, time);
        draw(ctx, p, isLight);
      }
      frame = requestAnimationFrame(tick);
    };

    if (!reduced) frame = requestAnimationFrame(tick);
    else {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (cfg.relief && isLight) drawHoneyRelief(ctx, w, h, cfg, 0);
      if (cfg.particles.type === "galaxy") drawMilkyWay(ctx, w, h, cfg, 0, isLight);
      for (const p of particles) draw(ctx, p, isLight);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  const [r1, g1, b1] = cfg.glow1;
  const [r2, g2, b2] = cfg.glow2;
  const glowA = isLight ? 0.28 : 0.2;

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: cfg.bg,
          transition: "background 0.85s ease",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 18% 25%, rgba(${r1},${g1},${b1},${glowA}) 0%, transparent 50%), radial-gradient(ellipse at 82% 75%, rgba(${r2},${g2},${b2},${glowA * 0.9}) 0%, transparent 52%)`,
          animation: "tbGlowPulse 8s ease-in-out infinite alternate",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />
      <style>{`@keyframes tbGlowPulse { from { opacity: 0.55; } to { opacity: 1; } }`}</style>
    </>
  );
}

/* Relief hex soft — light only */
function drawHoneyRelief(ctx, w, h, cfg, time) {
  const [r, g, b] = cfg.glow1;
  const size = 48;
  const hHex = size * Math.sqrt(3);
  ctx.save();
  ctx.globalAlpha = 0.16;
  for (let row = -1; row < h / (hHex * 0.75) + 2; row++) {
    for (let col = -1; col < w / (size * 1.5) + 2; col++) {
      const x = col * size * 1.5 + (row % 2 ? size * 0.75 : 0);
      const y = row * hHex * 0.75;
      const pulse = 0.85 + 0.15 * Math.sin(time * 0.4 + row * 0.3 + col * 0.2);
      drawHex(ctx, x, y, size * 0.48 * pulse, r, g, b);
    }
  }
  ctx.restore();
}

function drawHex(ctx, cx, cy, r, R, G, B) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = `rgba(${R},${G},${B},0.55)`;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(255,255,255,0.25)`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawMilkyWay(ctx, w, h, cfg, time, isLight) {
  const [r1, g1, b1] = cfg.glow1;
  const [r2, g2, b2] = cfg.glow2;
  ctx.save();
  ctx.translate(w * 0.5, h * 0.5);
  ctx.rotate(-0.4 + Math.sin(time * 0.05) * 0.02);
  const band = ctx.createLinearGradient(-w, 0, w, 0);
  const a = isLight ? 0.24 : 0.14;
  band.addColorStop(0, "transparent");
  band.addColorStop(0.25, `rgba(${r1},${g1},${b1},${a})`);
  band.addColorStop(0.5, `rgba(${r2},${g2},${b2},${a * 1.4})`);
  band.addColorStop(0.75, `rgba(${r1},${g1},${b1},${a})`);
  band.addColorStop(1, "transparent");
  ctx.fillStyle = band;
  ctx.fillRect(-w, -h * 0.09, w * 2, h * 0.18);
  ctx.restore();
}

function buildParticles(cfg, w, h, { reduced, isMobile, isLight }) {
  const { type, nebula, color } = cfg.particles;
  let count = cfg.particles.count;
  if (isMobile) count = Math.floor(count * 0.45);
  if (reduced) count = Math.floor(count * 0.25);
  const all = [];
  /* LIGHT renforcé : opacité + taille */
  const alphaBoost = isLight ? 1.65 : 1;
  const sizeBoost = isLight ? 1.25 : 1;

  for (let i = 0; i < count; i++) {
    const p = {
      x: Math.random() * w,
      y: Math.random() * h,
      r: (0.5 + Math.random() * 1.8) * sizeBoost,
      alpha: (0.3 + Math.random() * 0.65) * alphaBoost,
      speed: 0.003 + Math.random() * 0.008,
      color,
      type,
      isNebula: false,
      phase: Math.random() * Math.PI * 2,
    };
    switch (type) {
      case "galaxy":
        p.x = w * (0.12 + Math.random() * 0.76);
        p.y = h * (0.18 + Math.random() * 0.64);
        p.r =
          (Math.random() < 0.1 ? 2 + Math.random() * 2.5 : 0.4 + Math.random() * 1.4) *
          sizeBoost;
        p.twinkle = 0.008 + Math.random() * 0.02;
        p.depth = Math.random();
        break;
      case "gold-dust":
        p.r = (0.7 + Math.random() * 2.5) * sizeBoost;
        p.dy = -(0.1 + Math.random() * 0.4);
        p.dx = (Math.random() - 0.5) * 0.3;
        break;
      case "fireflies":
        p.r = (1.3 + Math.random() * 2.5) * sizeBoost;
        p.dx = (Math.random() - 0.5) * 0.4;
        p.dy = (Math.random() - 0.5) * 0.4;
        p.twinkle = 0.015 + Math.random() * 0.03;
        break;
      case "nature":
        p.r = (1.5 + Math.random() * 2.3) * sizeBoost;
        p.angle = Math.random() * Math.PI * 2;
        p.spin = (Math.random() - 0.5) * 0.035;
        p.dy = 0.2 + Math.random() * 0.4;
        p.dx = (Math.random() - 0.5) * 0.45;
        break;
      case "hearts":
        p.r = (2.4 + Math.random() * 3.6) * sizeBoost;
        p.dy = -(0.15 + Math.random() * 0.35);
        p.dx = (Math.random() - 0.5) * 0.25;
        break;
      case "metal-dust":
        p.r = (0.6 + Math.random() * 1.5) * sizeBoost;
        p.dx = (Math.random() - 0.5) * 0.18;
        p.dy = (Math.random() - 0.5) * 0.18;
        break;
      case "lava-sparks":
        p.r = (0.8 + Math.random() * 2.3) * sizeBoost;
        p.dy = -(0.5 + Math.random() * 1.4);
        p.dx = (Math.random() - 0.5) * 0.6;
        break;
      case "water-bubbles":
        p.r = (1.6 + Math.random() * 5) * sizeBoost;
        p.dy = -(0.25 + Math.random() * 0.7);
        p.wobble = 0.02 + Math.random() * 0.04;
        break;
      case "digital-grid":
        p.x = Math.floor(Math.random() * 32) * (w / 32);
        p.y = Math.floor(Math.random() * 20) * (h / 20);
        p.r = 1.3 * sizeBoost;
        p.pulse = Math.random() * Math.PI * 2;
        p.line = Math.random() > 0.65;
        break;
      default:
        p.dx = (Math.random() - 0.5) * 0.14;
        p.dy = (Math.random() - 0.5) * 0.14;
        break;
    }
    all.push(p);
  }

  if (nebula && !reduced) {
    const nCount = isMobile ? 10 : type === "galaxy" ? 24 : 14;
    for (let i = 0; i < nCount; i++) {
      all.push({
        isNebula: true,
        x: Math.random() * w,
        y: Math.random() * h,
        r: 60 + Math.random() * (type === "galaxy" ? 150 : 100),
        dx: (Math.random() - 0.5) * 0.04,
        dy: (Math.random() - 0.5) * 0.04,
        hue: Math.random() > 0.5 ? cfg.glow1 : cfg.glow2,
        alphaMul: isLight ? 0.16 : 0.09,
      });
    }
  }
  return all;
}

function update(p, w, h, time) {
  if (p.isNebula) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < -p.r || p.x > w + p.r) p.dx *= -1;
    if (p.y < -p.r || p.y > h + p.r) p.dy *= -1;
    return;
  }
  p.phase = (p.phase || 0) + (p.twinkle || p.speed || 0.005);
  if (p.twinkle != null) p.alpha = 0.35 + (Math.sin(p.phase) + 1) * 0.4;
  else if (p.pulse != null) {
    p.pulse += 0.035;
    p.alpha = 0.28 + (Math.sin(p.pulse) + 1) * 0.35;
  } else {
    p.alpha += p.speed;
    if (p.alpha > 0.95 || p.alpha < 0.15) p.speed *= -1;
  }
  if (p.type === "galaxy" && p.depth != null) {
    p.x += Math.sin(time * 0.15 + p.phase) * 0.08 * p.depth;
    p.y += Math.cos(time * 0.12 + p.phase) * 0.05 * p.depth;
  }
  if (p.dx != null) p.x += p.dx;
  if (p.dy != null) p.y += p.dy;
  if (p.wobble) p.x += Math.sin(p.phase) * p.wobble * 10;
  if (p.spin != null) p.angle = (p.angle || 0) + p.spin;
  if (["lava-sparks", "gold-dust", "hearts"].includes(p.type)) {
    if (p.y < -15) {
      p.y = h + 10;
      p.x = Math.random() * w;
    }
  } else if (p.type === "water-bubbles") {
    if (p.y < -20) {
      p.y = h + 12;
      p.x = Math.random() * w;
    }
  } else if (p.type === "nature") {
    if (p.y > h + 20) {
      p.y = -12;
      p.x = Math.random() * w;
    }
  } else if (p.type !== "digital-grid") {
    if (p.x < -8) p.x = w + 8;
    if (p.x > w + 8) p.x = -8;
    if (p.y < -8) p.y = h + 8;
    if (p.y > h + 8) p.y = -8;
  }
}

function draw(ctx, p, isLight) {
  if (p.isNebula) {
    const [r, g, b] = p.hue;
    const a = p.alphaMul || (isLight ? 0.16 : 0.08);
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  const [r, g, b] = p.color;
  let a = Math.max(0, Math.min(1, p.alpha));
  if (isLight) a = Math.min(1, a * 1.15);

  /* Halo soft en light autour des points */
  if (isLight && !["digital-grid"].includes(p.type)) {
    const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
    halo.addColorStop(0, `rgba(${r},${g},${b},${a * 0.35})`);
    halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (p.type === "galaxy" || p.type === "gold-dust") {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.lineTo(0, p.r * 2.5);
      ctx.lineTo(p.r * 0.32, p.r * 0.32);
    }
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, p.r * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a * (isLight ? 0.35 : 0.55)})`;
    ctx.fill();
    ctx.restore();
    return;
  }

  if (p.type === "hearts") {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(p.r / 6, p.r / 6);
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.bezierCurveTo(-5, -2, -5, -6, 0, -4);
    ctx.bezierCurveTo(5, -6, 5, -2, 0, 3);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (p.type === "nature") {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle || 0);
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * 2.6, p.r * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (p.type === "digital-grid") {
    ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.8})`;
    ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
    if (p.line) {
      ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.25})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + 48, p.y);
      ctx.stroke();
    }
    return;
  }

  if (p.type === "water-bubbles") {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.95})`;
    ctx.lineWidth = isLight ? 2 : 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x - p.r * 0.28, p.y - p.r * 0.28, p.r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`;
    ctx.fill();
    return;
  }

  if (p.type === "fireflies" || p.type === "lava-sparks") {
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
    glow.addColorStop(0, `rgba(${r},${g},${b},${a})`);
    glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,230,${a})`;
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
  ctx.fill();
}

export default ThemeBackground;
