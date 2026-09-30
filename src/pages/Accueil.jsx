// // // Accueil 
// // import { useNavigate } from "react-router-dom";
// // import { useState } from "react";
// // import { LogIn, UserPlus, Package, BarChart2, RefreshCw, Truck, Palette } from "lucide-react";
// // import ThemeBackground, { THEME_NAMES } from "../components/ThemeBackground";
// // import Logo from "../components/Logo";

// // const iconStyle = {
// //   color: "var(--icon-active)"
// // };

// // const features = [
// //   { icon: <Package   size={24} style={iconStyle} />, label: "Stock temps réel" },
// //   { icon: <BarChart2 size={24} style={iconStyle} />, label: "Analyses" },
// //   { icon: <RefreshCw size={24} style={iconStyle} />, label: "Mouvements" },
// //   { icon: <Truck     size={24} style={iconStyle} />, label: "Livraisons" },
// // ];
// // // Noms affichables propres
// // const THEME_LABELS = {
// //   "dark-galaxy"   : "🌌 Galaxy Dark",
// //   "light-galaxy"  : "🌌 Galaxy Light",
// //   "dark-simple"   : "💙 Simple Dark",
// //   "light-simple"  : "💙 Simple Light",
// //   "dark-luxury"   : "✨ Luxury Dark",
// //   "light-luxury"  : "✨ Luxury Light",
// //   "dark-exotic"   : "🔥 Exotic Dark",
// //   "light-exotic"  : "🔥 Exotic Light",
// //   "dark-verdatre" : "🌿 Verdâtre Dark",
// //   "light-verdatre": "🌿 Verdâtre Light",
// //   "dark-glamour"  : "💎 Glamour Dark",
// //   "light-glamour" : "💎 Glamour Light",
// //   "dark-graphite" : "🪨 Graphite Dark",
// //   "light-graphite": "🪨 Graphite Light",
// //   "dark-volcanic" : "🌋 Volcanic Dark",
// //   "light-volcanic": "🌋 Volcanic Light",
// //   "dark-oceanic"  : "🌊 Oceanic Dark",
// //   "light-oceanic" : "🌊 Oceanic Light",
// //   "dark-modern"   : "⚡ Modern Dark",
// //   "light-modern"  : "⚡ Modern Light",
// // };
// // function Accueil() {
// //   const navigate  = useNavigate();
// //   const [theme, setTheme]       = useState(
// //     sessionStorage.getItem("theme") || "dark-galaxy"
// //   );
  
// //   const [showMenu, setShowMenu] = useState(false);
// //   const changeTheme = (t) => {
// //     setTheme(t);
// //     sessionStorage.setItem("theme", t);
// //     document.documentElement.setAttribute("data-theme", t);
// //     setShowMenu(false);
// //   };
// //   const isLight = theme.startsWith("light");
// //   const textColor = isLight ? "var(--text)" : "var(--text)";
// //   const textSec   = isLight ? "var(--text-secondary)" : "var(--text-secondary)";
// //   return (
// //     <div style={{
// //       position: "relative", height: "100vh",
// //       overflow: "hidden", display: "flex",
// //       flexDirection: "column", alignItems: "center",
// //       justifyContent: "center",
// //     }}>
// //       {/* ===== FOND ANIMÉ ===== */}
// //       <ThemeBackground theme={theme} />
// //       {/* ===== BOUTON SWITCHER THÈME — coin supérieur droit ===== */}
// //       <div style={{
// //         position: "absolute", top: 20, right: 20,
// //         zIndex: 10,
// //       }}>
// //         <button
// //           onClick={() => setShowMenu(!showMenu)}
// //           style={{
// //             display: "flex", alignItems: "center", gap: "0.5rem",
// //             padding: "0.5rem 1rem",
// //             borderRadius: "999px",
// //             background: "var(--glass-bg)",
// //             backdropFilter: "blur(10px)",
// //             border: "1px solid var(--glass-border)",
// //             color: "var(--text)", cursor: "pointer",
// //             fontSize: "0.82rem", fontWeight: 600,
// //           }}
// //         >
// //           <Palette size={16} />
// //           {THEME_LABELS[theme] || theme}
// //         </button>
// //         {/* Menu déroulant */}
// //         {showMenu && (
// //           <div style={{
// //             position: "absolute", top: "110%", right: 0,
// //             background: "var(--card-bg)",
// //             backdropFilter: "blur(20px)",
// //             border: "1px solid var(--border)",
// //             borderRadius: 14,
// //             padding: "0.5rem",
// //             width: 200,
// //             maxHeight: 360,
// //             overflowY: "auto",
// //             boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
// //           }}>
// //             {THEME_NAMES.map(t => (
// //               <button
// //                 key={t}
// //                 onClick={() => changeTheme(t)}
// //                 style={{
// //                   display: "block", width: "100%",
// //                   padding: "0.5rem 0.8rem",
// //                   borderRadius: 8, border: "none",
// //                   background: t === theme
// //                     ? "var(--highlight)"
// //                     : "transparent",
// //                   color: textColor, cursor: "pointer",
// //                   fontSize: "0.8rem", textAlign: "left",
// //                   transition: "background 0.2s",
// //                 }}
// //                 onMouseEnter={e => {
// //                   if (t !== theme)
// // e.target.style.background = "var(--glass-hover)";
// //                 }}
// //                 onMouseLeave={e => {
// //                   if (t !== theme)
// // e.target.style.background = "transparent";
// //                 }}
// //               >
// //                 {THEME_LABELS[t]}
// //               </button>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //       {/* ===== CONTENU PRINCIPAL ===== */}
// //       <div style={{
// //         position: "relative", zIndex: 2,
// //         display: "flex", flexDirection: "column",
// //         alignItems: "center", textAlign: "center",
// //         animation: "fadeUp 1s ease",
// //         padding: "0 1rem",
// //       }}>
// //         {/* Cercle logo
// //         <div style={{ position: "relative", marginBottom: "2rem" }}>
// //           <div style={{
// //             position: "absolute", inset: -10,
// //             borderRadius: "50%",
// //             boxShadow: "0 0 40px rgba(99,102,241,0.6), 0 0 70px rgba(168,85,247,0.4)",
// //             animation: "pulseGlow 3s ease-in-out infinite",
// //           }} />
// //           <div style={{
// //             width: 130, height: 130, borderRadius: "50%",
// //             background: "linear-gradient(145deg, #6366f1, #a855f7)",
// //             display: "flex", alignItems: "center", justifyContent: "center",
// //             border: "2px solid rgba(255,255,255,0.15)",
// //             position: "relative",
// //           }}>
// //             <span style={{
// //               fontFamily: "Syne, sans-serif",
// //               fontWeight: 900, fontSize: "2.5rem",
// //               background: "linear-gradient(135deg, #fff, #a5b4fc)",
// //               WebkitBackgroundClip: "text",
// //               WebkitTextFillColor: "transparent",
// //             }}>SF</span>
// //           </div>
// //         </div> */}
        
// //         {/* Logo */}
// //         <div
// //           style={{
// //             position: "relative",
// //             marginBottom: "2rem",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             animation:"logoEnter 1s cubic-bezier(.16,1,.3,1)",
// //           }}
// //         >
// //           {/* Halo externe */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               width: 210,
// //               height: 210,
// //               borderRadius: "50%",
// //               background:`
// //                 radial-gradient(
// //                   circle at 35% 25%,
// //                   var(--glass-border),
// //                   transparent 35%
// //                 ),
// //                 radial-gradient(
// //                   circle,
// //                   var(--gradient-start),
// //                   var(--gradient-end),
// //                   var(--surface2),
// //                   transparent 70%
// //                 )
// //               `,

// //               filter: "blur(25px)",
// //               opacity: 0.85,
// //               animation: "pulseGlow 5s ease-in-out infinite",
// //             }}
// //           />

// //           {/* Anneau lumineux */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               width: 155,
// //               height: 155,
// //               borderRadius: "50%",
// //               border: "1px solid rgba(255,255,255,0.25)",
// //               background:
// //                 `conic-gradient(
// //                 var(--gradient-start),
// //                 transparent,
// //                 var(--gradient-end),
// //                 transparent,
// //                 var(--gradient-start)
// //                 )
// //                 )`,
// //               mask:
// //               "radial-gradient(circle, transparent 68%, black 70%)",

// //               WebkitMask:
// //               "radial-gradient(circle, transparent 68%, black 70%)",

// //               boxShadow:
// //               `
// //                 0 0 30px var(--logo-glow),
// //                 0 0 80px var(--accent2)
// //               `,

// //               animation:
// //               "rotateRing 15s linear infinite",
// //             }}
// //           />

// //           {/* Micro anneau */}
// //           <div
// //           style={{
// //           position:"absolute",

// //           width:170,
// //           height:170,

// //           borderRadius:"50%",

// //           border:
// //           "1px dashed rgba(255,255,255,.18)",

// //           animation:
// //           "rotateRing 30s linear infinite reverse",

// //           }}
// //           />

// //           {/* Cercle principal */}
// //           <div
// //             style={{
// //               position: "relative",
// //               width: 130,
// //               height: 130,
// //               borderRadius: "50%",
// //               background: `
// //                 linear-gradient(
// //                   145deg,
// //                   var(--gradient-start),
// //                   var(--accent),
// //                   var(--gradient-end),
// //                   var(--surface2)
// //                   )
// //               `,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               overflow: "hidden",
// //               border: "1px solid rgba(255,255,255,0.18)",
// //               backdropFilter: "blur(20px)",
// //               boxShadow: `
// //                   inset 0 0 25px rgba(255,255,255,0.25),
// //                   inset 0 -15px 30px rgba(0,0,0,0.35),
// //                   0 20px 50px var(--glow-color),
// //                   0 0 80px var(--glow-color)
// //                 `,
// //               transition: "all .4s ease",
// //               cursor: "pointer",
// //               animation: "floatLogo 4s ease-in-out infinite",
// //             }}
// //           >
// //             {/* Reflet */}
// //             <div
// //               style={{
// //                 position: "absolute",
// //                 top: 10,
// //                 left: 20,
// //                 width: 60,
// //                 height: 25,
// //                 borderRadius: "50%",
// //                 background: "var(--glass-border)",
// //                 transform: "rotate(-20deg)",
// //               }}
// //             />

// //             {/* Initiales */}
// //             <span
// //               style={{
// //                 position: "relative",
// //                 zIndex: 2,
// //                 fontFamily: "Syne, sans-serif",
// //                 fontWeight: 900,
// //                 fontSize: "3rem",
// //                 letterSpacing: "2px",
// //                 background:
// //                   "linear-gradient(180deg,#ffffff,#dbeafe,#a5b4fc)",
// //                 WebkitBackgroundClip: "text",
// //                 WebkitTextFillColor: "transparent",
// //                 textShadow: "0 4px 18px rgba(255,255,255,0.35)",
// //               }}
// //             >
// //               SF
// //             </span>
// //           </div>
// //         </div>

// //         {/* Titre */}
// //         <h1 style={{
// //           fontFamily: "Syne, sans-serif",
// //           fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
// //           fontWeight: 900, lineHeight: 1, marginBottom: "1rem",
// //         }}>
// //           <span style={{
// //             background: "linear-gradient(135deg, var(--gradient-start) 0%, var(--icon) 50%, var(--gradient-end) 100%)",
// //             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
// //           }}>Stock</span>
// //           <span style={{
// //             background: "linear-gradient(135deg, var(--sidebar-text), #c084fc)",
// //             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
// //           }}>Flow</span>
// //         </h1>
// //         <p style={{
// //           color: textSec, fontSize: "1.1rem",
// //           fontWeight: 300, letterSpacing: "0.1em",
// //           marginBottom: "3rem",
// //         }}>
// //           Gestion intelligente de votre stock
// //         </p>
// //         {/* Icônes */}
// //         <div style={{
// //           display: "flex", gap: "2rem",
// //           marginBottom: "3rem", flexWrap: "wrap",
// //           justifyContent: "center",
// //         }}>
// //           {features.map((f, i) => (
// //             <div key={i} style={{
// //               display: "flex", flexDirection: "column",
// //               alignItems: "center", gap: "0.5rem",
// //             }}>
// //               <div style={{
// //                 width: 56, height: 56, borderRadius: "50%",
// //                 background: "var(--glass-bg)",
// //                 border: "1px solid var(--glass-border)",
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 boxShadow: "0 0 15px var(--glow-color)",
// //               }}>
// //                 {f.icon}
// //               </div>
// //               <span style={{
// //                 color: textSec, fontSize: "0.72rem",
// //                 textAlign: "center",
// //               }}>{f.label}</span>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Boutons */}
// //         <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
// //           <button onClick={() => navigate("/login")} style={btnPrimary}>
// //             <LogIn size={18} /> Se connecter
// //           </button>
// //           <button onClick={() => navigate("/inscription")} style={btnOutline}>
// //             <UserPlus size={18} /> S'inscrire
// //           </button>
// //         </div>
// //       </div>

// //       {/* ===== STYLES ANIMATIONS ===== */}
// //       <style>{`
// //         @keyframes pulseGlow {
// //           0% {
// //             transform: scale(0.95);
// //             opacity: 0.6;
// //           }

// //           50% {
// //             transform: scale(1.08);
// //             opacity: 1;
// //           }

// //           100% {
// //             transform: scale(0.95);
// //             opacity: 0.6;
// //           }
// //         }

// //         @keyframes fadeUp {
// //           from { opacity: 0; transform: translateY(30px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }

// //         @keyframes rotateRing {
// //           from {
// //             transform: rotate(0deg);
// //           }
// //           to {
// //             transform: rotate(360deg);
// //           }
// //         }
// //         @keyframes logoEnter {
// //           from {
// //             opacity:0;
// //             transform:scale(.6) rotate(-20deg);
// //           }

// //           to {
// //             opacity:1;
// //             transform:scale(1) rotate(0);
// //           }
// //         }
// //         @keyframes floatLogo {
// //           0%,100% {
// //             transform: translateY(0);
// //           }

// //           50% {
// //             transform: translateY(-8px);
// //           }
// //         }

// //       `}</style>

// //     </div>

// //   );
// // }
// // const btnPrimary = {
// //   display: "flex", alignItems: "center", gap: "0.5rem",
// //   padding: "0.85rem 2.5rem", borderRadius: "50px", border: "none",
// //   background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //   color: "var(--button-text)", fontWeight: 700, fontSize: "1rem",
// //   cursor: "pointer", boxShadow: "0 10px 40px var(--glow-color)",
// //   transition: "all 0.3s",
// // };
// // const btnOutline = {
// //   display: "flex", alignItems: "center", gap: "0.5rem",
// //   padding: "0.85rem 2.5rem", borderRadius: "50px",
// //   border: "1px solid var(--glass-border)",
// //   background: "var(--glass-bg)",
// //   color: "var(--text)", fontWeight: 600, fontSize: "1rem",
// //   cursor: "pointer", backdropFilter: "blur(10px)",
// //   transition: "all 0.3s",
// // };


// // export default Accueil;



// /**
//  * Accueil.jsx — landing StockFlow (structure utilisateur + thèmes améliorés)
//  */
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   LogIn, UserPlus, Package, BarChart2, RefreshCw, Truck, Palette,
// } from "lucide-react";
// import ThemeBackground, { THEME_NAMES, themeCssVars } from "../components/ThemeBackground";

// const iconStyle = { color: "var(--icon-active, var(--theme-accent, #6366f1))" };

// const features = [
//   { icon: <Package size={24} style={iconStyle} />, label: "Stock temps réel" },
//   { icon: <BarChart2 size={24} style={iconStyle} />, label: "Analyses" },
//   { icon: <RefreshCw size={24} style={iconStyle} />, label: "Mouvements" },
//   { icon: <Truck size={24} style={iconStyle} />, label: "Livraisons" },
// ];

// const THEME_LABELS = {
//   "dark-galaxy": "Galaxy Dark",
//   "light-galaxy": "Galaxy Light",
//   "dark-simple": "Simple Dark",
//   "light-simple": "Simple Light",
//   "dark-luxury": "Luxury Dark",
//   "light-luxury": "Luxury Light",
//   "dark-exotic": "Exotic Dark",
//   "light-exotic": "Exotic Light",
//   "dark-verdatre": "Verdatre Dark",
//   "light-verdatre": "Verdatre Light",
//   "dark-glamour": "Glamour Dark",
//   "light-glamour": "Glamour Light",
//   "dark-graphite": "Graphite Dark",
//   "light-graphite": "Graphite Light",
//   "dark-volcanic": "Volcanic Dark",
//   "light-volcanic": "Volcanic Light",
//   "dark-oceanic": "Oceanic Dark",
//   "light-oceanic": "Oceanic Light",
//   "dark-modern": "Modern Dark",
//   "light-modern": "Modern Light",
// };

// function Accueil() {
//   const navigate = useNavigate();
//   const [theme, setTheme] = useState(
//     () => sessionStorage.getItem("theme") || "dark-galaxy"
//   );
//   const [showMenu, setShowMenu] = useState(false);
//   const isLight = theme.startsWith("light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     const vars = themeCssVars(theme);
//     Object.entries(vars).forEach(([k, v]) => {
//       document.documentElement.style.setProperty(k, v);
//     });
//   }, [theme]);

//   const changeTheme = (t) => {
//     setTheme(t);
//     sessionStorage.setItem("theme", t);
//     setShowMenu(false);
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         height: "100vh",
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         color: isLight ? "#0f172a" : "#f8fafc",
//         ...themeCssVars(theme),
//       }}
//     >
//       <ThemeBackground theme={theme} />

//       <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
//         <button
//           type="button"
//           onClick={() => setShowMenu((v) => !v)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             padding: "0.5rem 1rem",
//             borderRadius: "999px",
//             background: isLight ? "rgba(255,255,255,0.78)" : "var(--glass-bg, rgba(15,15,25,0.45))",
//             backdropFilter: "blur(12px)",
//             border: `1px solid ${isLight ? "rgba(15,23,42,0.12)" : "var(--glass-border, rgba(255,255,255,0.12))"}`,
//             color: isLight ? "#0f172a" : "var(--text, #f8fafc)",
//             cursor: "pointer",
//             fontSize: "0.82rem",
//             fontWeight: 600,
//             boxShadow: isLight ? "0 8px 24px rgba(0,0,0,0.08)" : "0 8px 24px rgba(0,0,0,0.35)",
//           }}
//         >
//           <Palette size={16} color="var(--theme-accent, var(--gradient-start))" />
//           {THEME_LABELS[theme] || theme}
//         </button>

//         {showMenu && (
//           <div
//             style={{
//               position: "absolute",
//               top: "110%",
//               right: 0,
//               background: isLight ? "rgba(255,255,255,0.94)" : "var(--card-bg, rgba(15,15,25,0.92))",
//               backdropFilter: "blur(20px)",
//               border: `1px solid ${isLight ? "rgba(15,23,42,0.1)" : "var(--border, rgba(255,255,255,0.1))"}`,
//               borderRadius: 14,
//               padding: "0.5rem",
//               width: 210,
//               maxHeight: 360,
//               overflowY: "auto",
//               boxShadow: isLight ? "0 16px 40px rgba(0,0,0,0.12)" : "0 20px 50px rgba(0,0,0,0.5)",
//               zIndex: 20,
//             }}
//           >
//             {THEME_NAMES.map((t) => {
//               const active = t === theme;
//               return (
//                 <button
//                   key={t}
//                   type="button"
//                   onClick={() => changeTheme(t)}
//                   style={{
//                     display: "block",
//                     width: "100%",
//                     padding: "0.5rem 0.8rem",
//                     borderRadius: 8,
//                     border: "none",
//                     background: active
//                       ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                       : "transparent",
//                     color: active ? "#fff" : isLight ? "#0f172a" : "var(--text, #e2e8f0)",
//                     cursor: "pointer",
//                     fontSize: "0.8rem",
//                     textAlign: "left",
//                     fontWeight: active ? 700 : 500,
//                   }}
//                 >
//                   {THEME_LABELS[t] || t}
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <div
//         style={{
//           position: "relative",
//           zIndex: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           animation: "fadeUp 1s ease",
//           padding: "0 1rem",
//         }}
//       >
//         <div
//           style={{
//             position: "relative",
//             marginBottom: "2rem",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             animation: "logoEnter 1s cubic-bezier(.16,1,.3,1)",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               width: 210,
//               height: 210,
//               borderRadius: "50%",
//               background: `radial-gradient(circle, var(--gradient-start), var(--gradient-end), transparent 70%)`,
//               filter: "blur(25px)",
//               opacity: isLight ? 0.5 : 0.85,
//               animation: "pulseGlow 5s ease-in-out infinite",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               width: 155,
//               height: 155,
//               borderRadius: "50%",
//               background: `conic-gradient(var(--gradient-start), transparent, var(--gradient-end), transparent, var(--gradient-start))`,
//               mask: "radial-gradient(circle, transparent 68%, black 70%)",
//               WebkitMask: "radial-gradient(circle, transparent 68%, black 70%)",
//               boxShadow: "0 0 30px var(--glow-color)",
//               animation: "rotateRing 15s linear infinite",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               width: 170,
//               height: 170,
//               borderRadius: "50%",
//               border: `1px dashed ${isLight ? "rgba(15,23,42,0.2)" : "rgba(255,255,255,.18)"}`,
//               animation: "rotateRing 30s linear infinite reverse",
//             }}
//           />
//           <div
//             style={{
//               position: "relative",
//               width: 130,
//               height: 130,
//               borderRadius: "50%",
//               background: "linear-gradient(145deg, var(--gradient-start), var(--theme-accent, #6366f1), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               overflow: "hidden",
//               border: `1px solid ${isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.18)"}`,
//               boxShadow: "inset 0 0 25px rgba(255,255,255,0.25), 0 20px 50px var(--glow-color)",
//               animation: "floatLogo 4s ease-in-out infinite",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 left: 20,
//                 width: 60,
//                 height: 25,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.35)",
//                 transform: "rotate(-20deg)",
//               }}
//             />
//             <span
//               style={{
//                 position: "relative",
//                 zIndex: 2,
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 900,
//                 fontSize: "3rem",
//                 letterSpacing: "2px",
//                 background: "linear-gradient(180deg,#ffffff,#e0e7ff,#c7d2fe)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               SF
//             </span>
//           </div>
//         </div>

//         <h1
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
//             fontWeight: 900,
//             lineHeight: 1,
//             marginBottom: "1rem",
//           }}
//         >
//           <span
//             style={{
//               background: "linear-gradient(135deg, var(--gradient-start) 0%, var(--theme-accent, #818cf8) 50%, var(--gradient-end) 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Stock
//           </span>
//           <span
//             style={{
//               background: isLight
//                 ? "linear-gradient(135deg, #1e1b4b, #5b21b6)"
//                 : "linear-gradient(135deg, #e2e8f0, #c084fc)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Flow
//           </span>
//         </h1>

//         <p
//           style={{
//             color: isLight ? "rgba(15,23,42,0.7)" : "var(--text-secondary, #94a3b8)",
//             fontSize: "1.1rem",
//             fontWeight: 300,
//             letterSpacing: "0.1em",
//             marginBottom: "3rem",
//           }}
//         >
//           Gestion intelligente de votre stock
//         </p>

//         <div
//           style={{
//             display: "flex",
//             gap: "2rem",
//             marginBottom: "3rem",
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//         >
//           {features.map((f, i) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: "0.5rem",
//               }}
//             >
//               <div
//                 style={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: "50%",
//                   background: isLight ? "rgba(255,255,255,0.75)" : "var(--glass-bg, rgba(255,255,255,0.06))",
//                   border: `1px solid ${isLight ? "rgba(15,23,42,0.1)" : "var(--glass-border, rgba(255,255,255,0.12))"}`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: "0 0 18px var(--glow-color)",
//                 }}
//               >
//                 {f.icon}
//               </div>
//               <span
//                 style={{
//                   color: isLight ? "rgba(15,23,42,0.65)" : "var(--text-secondary, #94a3b8)",
//                   fontSize: "0.72rem",
//                   fontWeight: 500,
//                 }}
//               >
//                 {f.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
//           <button type="button" onClick={() => navigate("/login")} style={btnPrimary}>
//             <LogIn size={18} /> Se connecter
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/inscription")}
//             style={{
//               ...btnOutline,
//               background: isLight ? "rgba(255,255,255,0.7)" : "var(--glass-bg, rgba(255,255,255,0.06))",
//               border: `1px solid ${isLight ? "rgba(15,23,42,0.15)" : "var(--glass-border, rgba(255,255,255,0.15))"}`,
//               color: isLight ? "#0f172a" : "var(--text, #f8fafc)",
//             }}
//           >
//             <UserPlus size={18} /> S&apos;inscrire
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes pulseGlow {
//           0% { transform: scale(0.95); opacity: 0.6; }
//           50% { transform: scale(1.08); opacity: 1; }
//           100% { transform: scale(0.95); opacity: 0.6; }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes rotateRing {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes logoEnter {
//           from { opacity: 0; transform: scale(.6) rotate(-20deg); }
//           to { opacity: 1; transform: scale(1) rotate(0); }
//         }
//         @keyframes floatLogo {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//         }
//       `}</style>
//     </div>
//   );
// }

// const btnPrimary = {
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   padding: "0.85rem 2.5rem",
//   borderRadius: "50px",
//   border: "none",
//   background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//   color: "var(--button-text, #fff)",
//   fontWeight: 700,
//   fontSize: "1rem",
//   cursor: "pointer",
//   boxShadow: "0 10px 40px var(--glow-color)",
// };

// const btnOutline = {
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   padding: "0.85rem 2.5rem",
//   borderRadius: "50px",
//   fontWeight: 600,
//   fontSize: "1rem",
//   cursor: "pointer",
//   backdropFilter: "blur(10px)",
// };

// export default Accueil;


/**
 * Accueil.jsx — landing StockFlow (structure utilisateur + thèmes améliorés)
 */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LogIn, UserPlus, Package, BarChart2, RefreshCw, Truck, Palette,
} from "lucide-react";
import ThemeBackground, { THEME_NAMES, themeCssVars } from "../components/ThemeBackground";

const iconStyle = { color: "var(--icon-active, var(--theme-accent, #6366f1))" };

const features = [
  { icon: <Package size={24} style={iconStyle} />, label: "Stock temps réel" },
  { icon: <BarChart2 size={24} style={iconStyle} />, label: "Analyses" },
  { icon: <RefreshCw size={24} style={iconStyle} />, label: "Mouvements" },
  { icon: <Truck size={24} style={iconStyle} />, label: "Livraisons" },
];

const THEME_LABELS = {
  "dark-galaxy": "Galaxy Dark",
  "light-galaxy": "Galaxy Light",
  "dark-simple": "Simple Dark",
  "light-simple": "Simple Light",
  "dark-luxury": "Luxury Dark",
  "light-luxury": "Luxury Light",
  "dark-exotic": "Exotic Dark",
  "light-exotic": "Exotic Light",
  "dark-verdatre": "Verdatre Dark",
  "light-verdatre": "Verdatre Light",
  "dark-glamour": "Glamour Dark",
  "light-glamour": "Glamour Light",
  "dark-graphite": "Graphite Dark",
  "light-graphite": "Graphite Light",
  "dark-volcanic": "Volcanic Dark",
  "light-volcanic": "Volcanic Light",
  "dark-oceanic": "Oceanic Dark",
  "light-oceanic": "Oceanic Light",
  "dark-modern": "Modern Dark",
  "light-modern": "Modern Light",
};

function Accueil() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => sessionStorage.getItem("theme") || "dark-galaxy"
  );
  const [showMenu, setShowMenu] = useState(false);
  const isLight = theme.startsWith("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const vars = themeCssVars(theme);
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }, [theme]);

  const changeTheme = (t) => {
    setTheme(t);
    sessionStorage.setItem("theme", t);
    setShowMenu(false);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        /* Light coloré = texte clair pour contraste sur dégradés saturés */
        color: "#f8fafc",
        ...themeCssVars(theme),
      }}
    >
      <ThemeBackground theme={theme} />

      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <button
          type="button"
          onClick={() => setShowMenu((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            background: "var(--glass-bg, rgba(15,15,25,0.35))",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "#f8fafc",
            cursor: "pointer",
            fontSize: "0.82rem",
            fontWeight: 600,
            boxShadow: isLight ? "0 8px 24px rgba(0,0,0,0.08)" : "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          <Palette size={16} color="var(--theme-accent, var(--gradient-start))" />
          {THEME_LABELS[theme] || theme}
        </button>

        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "rgba(15,15,25,0.88)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "0.5rem",
              width: 210,
              maxHeight: 360,
              overflowY: "auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
              zIndex: 20,
            }}
          >
            {THEME_NAMES.map((t) => {
              const active = t === theme;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => changeTheme(t)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem 0.8rem",
                    borderRadius: 8,
                    border: "none",
                    background: active
                      ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                      : "transparent",
                    color: active ? "#fff" : "#e2e8f0",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    textAlign: "left",
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {THEME_LABELS[t] || t}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          animation: "fadeUp 1s ease",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            position: "relative",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "logoEnter 1s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 210,
              height: 210,
              borderRadius: "50%",
              background: `radial-gradient(circle, var(--gradient-start), var(--gradient-end), transparent 70%)`,
              filter: "blur(25px)",
              opacity: isLight ? 0.5 : 0.85,
              animation: "pulseGlow 5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 155,
              height: 155,
              borderRadius: "50%",
              background: `conic-gradient(var(--gradient-start), transparent, var(--gradient-end), transparent, var(--gradient-start))`,
              mask: "radial-gradient(circle, transparent 68%, black 70%)",
              WebkitMask: "radial-gradient(circle, transparent 68%, black 70%)",
              boxShadow: "0 0 30px var(--glow-color)",
              animation: "rotateRing 15s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 170,
              height: 170,
              borderRadius: "50%",
              border: `1px dashed ${isLight ? "rgba(15,23,42,0.2)" : "rgba(255,255,255,.18)"}`,
              animation: "rotateRing 30s linear infinite reverse",
            }}
          />
          <div
            style={{
              position: "relative",
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "linear-gradient(145deg, var(--gradient-start), var(--theme-accent, #6366f1), var(--gradient-end))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: `1px solid ${isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.18)"}`,
              boxShadow: "inset 0 0 25px rgba(255,255,255,0.25), 0 20px 50px var(--glow-color)",
              animation: "floatLogo 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 20,
                width: 60,
                height: 25,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.35)",
                transform: "rotate(-20deg)",
              }}
            />
            <span
              style={{
                position: "relative",
                zIndex: 2,
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "3rem",
                letterSpacing: "2px",
                background: "linear-gradient(180deg,#ffffff,#e0e7ff,#c7d2fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SF
            </span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, var(--gradient-start) 0%, var(--theme-accent, #818cf8) 50%, var(--gradient-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stock
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #f8fafc, #e9d5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Flow
          </span>
        </h1>

        <p
          style={{
            color: "rgba(248,250,252,0.85)",
            fontSize: "1.1rem",
            fontWeight: 300,
            letterSpacing: "0.1em",
            marginBottom: "3rem",
          }}
        >
          Gestion intelligente de votre stock
        </p>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--glass-bg, rgba(255,255,255,0.12))",
                  border: "1px solid rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 18px var(--glow-color)",
                }}
              >
                {f.icon}
              </div>
              <span
                style={{
                  color: "rgba(248,250,252,0.8)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => navigate("/login")} style={btnPrimary}>
            <LogIn size={18} /> Se connecter
          </button>
          <button
            type="button"
            onClick={() => navigate("/inscription")}
            style={{
              ...btnOutline,
              background: "var(--glass-bg, rgba(255,255,255,0.12))",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#f8fafc",
            }}
          >
            <UserPlus size={18} /> S&apos;inscrire
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.6; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes logoEnter {
          from { opacity: 0; transform: scale(.6) rotate(-20deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

const btnPrimary = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.85rem 2.5rem",
  borderRadius: "50px",
  border: "none",
  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
  color: "var(--button-text, #fff)",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 10px 40px var(--glow-color)",
};

const btnOutline = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.85rem 2.5rem",
  borderRadius: "50px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
};

export default Accueil;
