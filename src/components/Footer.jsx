// // import { Package } from "lucide-react";
// // function Footer() {
// //   return (
// //     <>
// //       <footer
// //         className="sf-footer"
// //         style={{
// //           position: "relative",
// //           overflow: "hidden",
// //           marginTop: "4rem",
// //           padding: "2rem",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           flexWrap: "wrap",
// //           gap: "1.5rem",
// //           background: "var(--card-bg)",
// //           backdropFilter: "blur(35px)",
// //           WebkitBackdropFilter: "blur(35px)",
// //           border: "1px solid var(--glass-border)",
// //           borderRadius: 26,
// //           boxShadow: `
// //             0 -12px 36px rgba(0,0,0,.10),
// //             0 4px 16px rgba(0,0,0,.06),
// //             inset 0 1px 0 var(--glass-border)
// //           `,
// //         }}
// //       >
// //         {/* Overlay gradient (visible dark + light) */}
// //         <div
// //           style={{
// //             position: "absolute",
// //             inset: 0,
// //             borderRadius: 26,
// //             background: `
// //               linear-gradient(
// //                 180deg,
// //                 color-mix(in srgb, var(--gradient-start) 10%, transparent),
// //                 transparent 50%
// //               )
// //             `,
// //             pointerEvents: "none",
// //           }}
// //         />
// //         <div className="footer-top-line" />
// //         <div className="footer-shine" />
// //         {/* Logo block */}
// //         <div
// //           className="footer-logo"
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "1rem",
// //             position: "relative",
// //             zIndex: 1,
// //           }}
// //         >
// //           <div
// //             className="footer-logo-icon"
// //             style={{
// //               width: 44,
// //               height: 44,
// //               borderRadius: 14,
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               background:
// //                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //               color: "#fff",
// //               fontWeight: 900,
// //               fontFamily: "Syne, sans-serif",
// //               boxShadow: "0 10px 25px var(--glow-color)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             SF
// //           </div>
// //           <div className="footer-divider" />
// //           <div>
// //             <div
// //               style={{
// //                 fontWeight: 900,
// //                 fontSize: "1.1rem",
// //                 fontFamily: "Syne, sans-serif",
// //                 background:
// //                   "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //                 WebkitBackgroundClip: "text",
// //                 WebkitTextFillColor: "transparent",
// //                 backgroundClip: "text",
// //               }}
// //             >
// //               StockFlow
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: 12,
// //                 letterSpacing: 1.5,
// //                 color: "var(--text-secondary)",
// //               }}
// //             >
// //               SMART INVENTORY
// //             </div>
// //           </div>
// //         </div>
// //         {/* Centre */}
// //         <div
// //           style={{
// //             textAlign: "center",
// //             position: "relative",
// //             zIndex: 1,
// //           }}
// //         >
// //           <div
// //             style={{
// //               fontWeight: 600,
// //               color: "var(--text)",
// //             }}
// //           >
// //             Inventory Management Platform
// //           </div>
// //           <div
// //             style={{
// //               marginTop: 4,
// //               fontSize: 13,
// //               color: "var(--text-secondary)",
// //             }}
// //           >
// //             © {new Date().getFullYear()} StockFlow. Tous droits réservés.
// //           </div>
// //           <div className="footer-powered">Powered by React & FastAPI</div>
// //         </div>
// //         {/* Droite */}
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "flex-end",
// //             gap: 8,
// //             position: "relative",
// //             zIndex: 1,
// //           }}
// //         >
// //           <div
// //             className="footer-version"
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 8,
// //               padding: "10px 16px",
// //               borderRadius: 999,
// //               background:
// //                 "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
// //               border: "1px solid var(--glass-border)",
// //               color: "var(--text)",
// //               fontSize: 13,
// //               fontWeight: 600,
// //             }}
// //           >
// //             <Package size={15} />
// //             v1.0.0
// //           </div>
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 8,
// //               fontSize: 13,
// //               color: "var(--text-secondary)",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: 8,
// //                 height: 8,
// //                 borderRadius: "50%",
// //                 background: "#22c55e",
// //                 boxShadow: "0 0 10px #22c55e",
// //               }}
// //             />
// //             System Online
// //           </div>
// //         </div>
// //         {/* Glow */}
// //         <div
// //           style={{
// //             position: "absolute",
// //             top: -100,
// //             left: "50%",
// //             transform: "translateX(-50%)",
// //             width: 500,
// //             height: 200,
// //             background:
// //               "radial-gradient(circle, var(--gradient-start), transparent 70%)",
// //             opacity: 0.1,
// //             filter: "blur(45px)",
// //             pointerEvents: "none",
// //           }}
// //         />
// //       </footer>
// //       <style>{`
// //         .footer-top-line {
// //           position: absolute;
// //           top: 0;
// //           left: 50%;
// //           transform: translateX(-50%);
// //           width: 80%;
// //           height: 2px;
// //           background: linear-gradient(
// //             90deg,
// //             transparent,
// //             var(--gradient-start),
// //             var(--gradient-end),
// //             transparent
// //           );
// //           opacity: 0.85;
// //           z-index: 1;
// //         }
// //         .footer-top-line::after {
// //           content: "";
// //           position: absolute;
// //           inset: 0;
// //           background: inherit;
// //           filter: blur(8px);
// //           opacity: 0.6;
// //         }
// //         .footer-shine {
// //           position: absolute;
// //           inset: 0;
// //           overflow: hidden;
// //           pointer-events: none;
// //           border-radius: 26px;
// //         }
// //         .footer-shine::before {
// //           content: "";
// //           position: absolute;
// //           top: 0;
// //           left: -35%;
// //           width: 25%;
// //           height: 100%;
// //           background: linear-gradient(
// //             110deg,
// //             transparent,
// //             color-mix(in srgb, var(--gradient-start) 30%, transparent),
// //             transparent
// //           );
// //           transform: skewX(-25deg);
// //           animation: footerShine 12s linear infinite;
// //         }
// //         .footer-powered {
// //           margin-top: 8px;
// //           display: inline-flex;
// //           align-items: center;
// //           padding: 6px 12px;
// //           border-radius: 999px;
// //           background: color-mix(in srgb, var(--gradient-start) 8%, transparent);
// //           border: 1px solid var(--glass-border);
// //           font-size: 12px;
// //           color: var(--text-secondary);
// //         }
// //         .footer-logo {
// //           transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
// //         }
// //         .footer-logo:hover {
// //           transform: translateY(-4px);
// //         }
// //         .footer-logo-icon {
// //           transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
// //         }
// //         .footer-logo:hover .footer-logo-icon {
// //           transform: rotate(-6deg) scale(1.08);
// //         }
// //         .footer-version {
// //           transition: 0.3s;
// //         }
// //         .footer-version:hover {
// //           background: color-mix(in srgb, var(--gradient-start) 14%, transparent) !important;
// //           transform: translateY(-2px);
// //         }
// //         .footer-divider {
// //           width: 1px;
// //           height: 42px;
// //           background: linear-gradient(
// //             transparent,
// //             var(--glass-border),
// //             transparent
// //           );
// //           flex-shrink: 0;
// //         }
// //         @keyframes footerShine {
// //           from { left: -35%; }
// //           to { left: 140%; }
// //         }
// //         @media (max-width: 768px) {
// //           .sf-footer {
// //             flex-direction: column !important;
// //             align-items: center !important;
// //             text-align: center;
// //             padding: 1.5rem !important;
// //           }
// //           .sf-footer > div {
// //             align-items: center !important;
// //           }
// //         }
// //       `}</style>
// //     </>
// //   );
// // }
// // export default Footer;


// /**
//  * Footer — structure conservée, thème via CSS vars, un peu plus d'air en mobile
//  */
// import { Package } from "lucide-react";

// function Footer() {
//   return (
//     <>
//       <footer
//         className="sf-footer"
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           marginTop: "4rem",
//           padding: "2rem",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: "1.75rem",
//           background: "var(--card-bg)",
//           backdropFilter: "blur(35px)",
//           WebkitBackdropFilter: "blur(35px)",
//           border: "1px solid var(--glass-border)",
//           borderRadius: 26,
//           boxShadow: `
//             0 -12px 36px rgba(0,0,0,.10),
//             0 4px 16px rgba(0,0,0,.06),
//             0 0 32px var(--glow-color),
//             inset 0 1px 0 var(--glass-border)
//           `,
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             borderRadius: 26,
//             background: `
//               linear-gradient(
//                 180deg,
//                 color-mix(in srgb, var(--gradient-start) 10%, transparent),
//                 transparent 50%
//               )
//             `,
//             pointerEvents: "none",
//           }}
//         />

//         <div className="footer-top-line" />
//         <div className="footer-shine" />

//         {/* Logo */}
//         <div
//           className="footer-logo footer-block"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "1rem",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <div
//             className="footer-logo-icon"
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 14,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               fontWeight: 900,
//               fontFamily: "Syne, sans-serif",
//               boxShadow: "0 10px 25px var(--glow-color)",
//               flexShrink: 0,
//             }}
//           >
//             SF
//           </div>
//           <div className="footer-divider" />
//           <div>
//             <div
//               style={{
//                 fontWeight: 900,
//                 fontSize: "1.1rem",
//                 fontFamily: "Syne, sans-serif",
//                 background:
//                   "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               StockFlow
//             </div>
//             <div
//               style={{
//                 fontSize: 12,
//                 letterSpacing: 1.5,
//                 color: "var(--text-secondary)",
//               }}
//             >
//               SMART INVENTORY
//             </div>
//           </div>
//         </div>

//         {/* Centre */}
//         <div
//           className="footer-block footer-center"
//           style={{
//             textAlign: "center",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <div style={{ fontWeight: 600, color: "var(--text)" }}>
//             Inventory Management Platform
//           </div>
//           <div
//             style={{
//               marginTop: 8,
//               fontSize: 13,
//               color: "var(--text-secondary)",
//               lineHeight: 1.5,
//             }}
//           >
//             © {new Date().getFullYear()} StockFlow. Tous droits réservés.
//           </div>
//           <div className="footer-powered">Powered by React & FastAPI</div>
//         </div>

//         {/* Droite */}
//         <div
//           className="footer-block footer-right"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//             gap: 12,
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <div
//             className="footer-version"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "10px 16px",
//               borderRadius: 999,
//               background:
//                 "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
//               border: "1px solid var(--glass-border)",
//               color: "var(--text)",
//               fontSize: 13,
//               fontWeight: 600,
//             }}
//           >
//             <Package size={15} />
//             v1.0.0
//           </div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               fontSize: 13,
//               color: "var(--text-secondary)",
//             }}
//           >
//             <div
//               style={{
//                 width: 8,
//                 height: 8,
//                 borderRadius: "50%",
//                 background: "#22c55e",
//                 boxShadow: "0 0 10px #22c55e",
//               }}
//             />
//             System Online
//           </div>
//         </div>

//         <div
//           style={{
//             position: "absolute",
//             top: -100,
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: 500,
//             height: 200,
//             background:
//               "radial-gradient(circle, var(--gradient-start), transparent 70%)",
//             opacity: 0.12,
//             filter: "blur(45px)",
//             pointerEvents: "none",
//           }}
//         />
//       </footer>

//       <style>{`
//         .footer-top-line {
//           position: absolute;
//           top: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 80%;
//           height: 2px;
//           background: linear-gradient(
//             90deg,
//             transparent,
//             var(--gradient-start),
//             var(--gradient-end),
//             transparent
//           );
//           opacity: 0.85;
//           z-index: 1;
//         }
//         .footer-top-line::after {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: inherit;
//           filter: blur(8px);
//           opacity: 0.6;
//         }
//         .footer-shine {
//           position: absolute;
//           inset: 0;
//           overflow: hidden;
//           pointer-events: none;
//           border-radius: 26px;
//         }
//         .footer-shine::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: -35%;
//           width: 25%;
//           height: 100%;
//           background: linear-gradient(
//             110deg,
//             transparent,
//             color-mix(in srgb, var(--gradient-start) 30%, transparent),
//             transparent
//           );
//           transform: skewX(-25deg);
//           animation: footerShine 12s linear infinite;
//         }
//         .footer-powered {
//           margin-top: 10px;
//           display: inline-flex;
//           align-items: center;
//           padding: 6px 12px;
//           border-radius: 999px;
//           background: color-mix(in srgb, var(--gradient-start) 8%, transparent);
//           border: 1px solid var(--glass-border);
//           font-size: 12px;
//           color: var(--text-secondary);
//         }
//         .footer-logo { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
//         .footer-logo:hover { transform: translateY(-4px); }
//         .footer-logo-icon { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
//         .footer-logo:hover .footer-logo-icon {
//           transform: rotate(-6deg) scale(1.08);
//         }
//         .footer-version { transition: 0.3s; }
//         .footer-version:hover {
//           background: color-mix(in srgb, var(--gradient-start) 14%, transparent) !important;
//           transform: translateY(-2px);
//         }
//         .footer-divider {
//           width: 1px;
//           height: 42px;
//           background: linear-gradient(transparent, var(--glass-border), transparent);
//           flex-shrink: 0;
//         }
//         @keyframes footerShine {
//           from { left: -35%; }
//           to { left: 140%; }
//         }
//         @media (max-width: 768px) {
//           .sf-footer {
//             flex-direction: column !important;
//             align-items: center !important;
//             text-align: center;
//             padding: 1.75rem 1.25rem !important;
//             gap: 1.85rem !important;
//             margin-top: 2.5rem !important;
//           }
//           .sf-footer .footer-block {
//             align-items: center !important;
//             width: 100%;
//           }
//           .sf-footer .footer-right {
//             align-items: center !important;
//           }
//           .footer-divider { display: none; }
//           .footer-powered { margin-top: 12px; }
//         }
//       `}</style>
//     </>
//   );
// }

// export default Footer;


/**
 * Footer — structure conservée, thème via CSS vars, un peu plus d'air en mobile
 */
import { Package } from "lucide-react";

function Footer() {
  return (
    <>
      <footer
        className="sf-footer"
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: "4rem",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.75rem",
          background: "var(--card-bg)",
          backdropFilter: "blur(35px)",
          WebkitBackdropFilter: "blur(35px)",
          border: "1px solid var(--glass-border)",
          borderRadius: 26,
          boxShadow: `
            0 -12px 36px rgba(0,0,0,.10),
            0 4px 16px rgba(0,0,0,.06),
            0 0 32px var(--glow-color),
            inset 0 1px 0 var(--glass-border)
          `,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 26,
            background: `
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--gradient-start) 10%, transparent),
                transparent 50%
              )
            `,
            pointerEvents: "none",
          }}
        />

        <div className="footer-top-line" />
        <div className="footer-shine" />

        {/* Logo */}
        <div
          className="footer-logo footer-block"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="footer-logo-icon"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(145deg, var(--gradient-start), var(--theme-accent, var(--gradient-end)), var(--gradient-end))",
              color: "#fff",
              fontWeight: 900,
              fontFamily: "Syne, sans-serif",
              boxShadow:
                "0 10px 25px var(--glow-color), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -6px 12px rgba(0,0,0,0.15)",
              border: "1.5px solid rgba(255,255,255,0.28)",
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 8,
                width: 18,
                height: 9,
                borderRadius: "50%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.55), transparent)",
                transform: "rotate(-20deg)",
                pointerEvents: "none",
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>SF</span>
          </div>
          <div className="footer-divider" />
          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: "1.1rem",
                fontFamily: "Syne, sans-serif",
                background:
                  "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              StockFlow
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 1.5,
                color: "var(--text-secondary)",
              }}
            >
              SMART INVENTORY
            </div>
          </div>
        </div>

        {/* Centre */}
        <div
          className="footer-block footer-center"
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--text)" }}>
            Inventory Management Platform
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            © {new Date().getFullYear()} StockFlow. Tous droits réservés.
          </div>
          <div className="footer-powered">Powered by React & FastAPI</div>
        </div>

        {/* Droite */}
        <div
          className="footer-block footer-right"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 12,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="footer-version"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 999,
              background:
                "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
              border: "1px solid var(--glass-border)",
              color: "var(--text)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <Package size={15} />
            v1.0.0
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--text-secondary)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
              }}
            />
            System Online
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 200,
            background:
              "radial-gradient(circle, var(--gradient-start), transparent 70%)",
            opacity: 0.12,
            filter: "blur(45px)",
            pointerEvents: "none",
          }}
        />
      </footer>

      <style>{`
        .footer-top-line {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--gradient-start),
            var(--gradient-end),
            transparent
          );
          opacity: 0.85;
          z-index: 1;
        }
        .footer-top-line::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(8px);
          opacity: 0.6;
        }
        .footer-shine {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          border-radius: 26px;
        }
        .footer-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -35%;
          width: 25%;
          height: 100%;
          background: linear-gradient(
            110deg,
            transparent,
            color-mix(in srgb, var(--gradient-start) 30%, transparent),
            transparent
          );
          transform: skewX(-25deg);
          animation: footerShine 12s linear infinite;
        }
        .footer-powered {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--gradient-start) 8%, transparent);
          border: 1px solid var(--glass-border);
          font-size: 12px;
          color: var(--text-secondary);
        }
        .footer-logo { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .footer-logo:hover { transform: translateY(-4px); }
        .footer-logo-icon { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .footer-logo:hover .footer-logo-icon {
          transform: rotate(-6deg) scale(1.08);
        }
        .footer-version { transition: 0.3s; }
        .footer-version:hover {
          background: color-mix(in srgb, var(--gradient-start) 14%, transparent) !important;
          transform: translateY(-2px);
        }
        .footer-divider {
          width: 1px;
          height: 42px;
          background: linear-gradient(transparent, var(--glass-border), transparent);
          flex-shrink: 0;
        }
        @keyframes footerShine {
          from { left: -35%; }
          to { left: 140%; }
        }
        @media (max-width: 768px) {
          .sf-footer {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            padding: 1.75rem 1.25rem !important;
            gap: 1.85rem !important;
            margin-top: 2.5rem !important;
          }
          .sf-footer .footer-block {
            align-items: center !important;
            width: 100%;
          }
          .sf-footer .footer-right {
            align-items: center !important;
          }
          .footer-divider { display: none; }
          .footer-powered { margin-top: 12px; }
        }
      `}</style>
    </>
  );
}

export default Footer;
