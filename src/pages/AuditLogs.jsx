// // /**
// //  * Journal d'audit (logs) — même identité que Mouvements
// //  * Regroupement par date · Visualiser · Détail / Détail All
// //  * Lecture seule (pas d'ajout / modification / suppression)
// //  */

// // import { useEffect, useMemo, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Search,
// //   ScrollText,
// //   Eye,
// //   ExternalLink,
// //   Calendar,
// //   X,
// //   User,
// //   Activity,
// //   Layers,
// // } from "lucide-react";
// // import ThemeBackground from "../components/ThemeBackground";
// // import Footer from "../components/Footer";
// // import * as api from "../api/api";

// // const { getAuditLogs, getUsers } = api;

// // const safeGet = (fn) =>
// //   typeof fn === "function"
// //     ? fn().catch(() => ({ data: [] }))
// //     : Promise.resolve({ data: [] });

// // /* ========== DATES ========== */
// // function dateKey(row) {
// //   return (
// //     (row.created_at || row.date || row.update_at || "")
// //       .toString()
// //       .slice(0, 10) || "—"
// //   );
// // }

// // function formatDateFr(iso) {
// //   if (!iso || iso === "—") return "—";
// //   const s = String(iso).slice(0, 10);
// //   const parts = s.split("-");
// //   if (parts.length !== 3) return s;
// //   const [y, m, d] = parts;
// //   const mois = [
// //     "janvier", "février", "mars", "avril", "mai", "juin",
// //     "juillet", "août", "septembre", "octobre", "novembre", "décembre",
// //   ];
// //   const mi = parseInt(m, 10) - 1;
// //   if (mi < 0 || mi > 11) return s;
// //   return `${parseInt(d, 10)} ${mois[mi]} ${y}`;
// // }

// // function groupByDate(rows) {
// //   const map = {};
// //   for (const r of rows) {
// //     const d = dateKey(r);
// //     if (!map[d]) map[d] = [];
// //     map[d].push(r);
// //   }
// //   return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
// // }

// // /* ========== STYLES ========== */
// // const btnGhost = {
// //   display: "flex",
// //   alignItems: "center",
// //   gap: 6,
// //   padding: "0.55rem 0.95rem",
// //   borderRadius: 12,
// //   border: "1px solid var(--glass-border)",
// //   background: "var(--glass-bg)",
// //   color: "var(--gradient-start)",
// //   fontWeight: 700,
// //   fontSize: "0.8rem",
// //   cursor: "pointer",
// // };

// // function InfoCard({ label, value, color, icon }) {
// //   return (
// //     <div
// //       style={{
// //         padding: "1rem",
// //         borderRadius: 18,
// //         background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
// //         border: "1px solid var(--glass-border)",
// //         display: "flex",
// //         gap: 12,
// //         alignItems: "center",
// //         minHeight: 92,
// //         position: "relative",
// //         overflow: "hidden",
// //         boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
// //         minWidth: 0,
// //         width: "100%",
// //         boxSizing: "border-box",
// //       }}
// //     >
// //       <div
// //         style={{
// //           position: "absolute",
// //           inset: 0,
// //           background: `radial-gradient(ellipse at 0% 50%, color-mix(in srgb, ${color} 22%, transparent), transparent 55%)`,
// //           pointerEvents: "none",
// //         }}
// //       />
// //       <div
// //         style={{
// //           position: "absolute",
// //           left: 0,
// //           top: "18%",
// //           bottom: "18%",
// //           width: 3,
// //           borderRadius: 4,
// //           background: color,
// //           boxShadow: `0 0 10px ${color}`,
// //         }}
// //       />
// //       <div
// //         style={{
// //           width: 42,
// //           height: 42,
// //           borderRadius: 12,
// //           flexShrink: 0,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           background: `linear-gradient(145deg, color-mix(in srgb, ${color} 55%, #fff 5%), color-mix(in srgb, ${color} 25%, transparent))`,
// //           border: `1px solid color-mix(in srgb, ${color} 55%, transparent)`,
// //           color: "#fff",
// //           marginLeft: 4,
// //           boxShadow: `0 6px 16px color-mix(in srgb, ${color} 40%, transparent)`,
// //           position: "relative",
// //           zIndex: 1,
// //         }}
// //       >
// //         {icon}
// //       </div>
// //       <div style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
// //         <div
// //           style={{
// //             fontSize: "0.68rem",
// //             color: "var(--text-secondary)",
// //             fontWeight: 700,
// //             letterSpacing: ".08em",
// //           }}
// //         >
// //           {label}
// //         </div>
// //         <div
// //           style={{
// //             fontFamily: "Syne, sans-serif",
// //             fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
// //             fontWeight: 900,
// //             color: "var(--text)",
// //           }}
// //         >
// //           {value}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function DateCard({ date, dateLabel, rows, onVisualiser, onDetails }) {
// //   const [hover, setHover] = useState(false);
// //   return (
// //     <div
// //       className="mvt-date-card"
// //       onMouseEnter={() => setHover(true)}
// //       onMouseLeave={() => setHover(false)}
// //       style={{
// //         position: "relative",
// //         overflow: "hidden",
// //         borderRadius: 26,
// //         padding: "1.25rem 1.3rem",
// //         background: `
// //           linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
// //           var(--card-bg)
// //         `,
// //         backdropFilter: "blur(35px)",
// //         border: hover
// //           ? "1px solid rgba(255,255,255,.25)"
// //           : "1px solid var(--glass-border)",
// //         boxShadow: hover
// //           ? "0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)"
// //           : "0 8px 25px rgba(0,0,0,.10)",
// //         transform: hover ? "translateY(-6px)" : "translateY(0)",
// //         transition: "all .45s cubic-bezier(.16,1,.3,1)",
// //         minWidth: 0,
// //       }}
// //     >
// //       <div className="neon-corner top-left" />
// //       <div className="neon-corner top-right" />
// //       <div className="neon-corner bottom-left" />
// //       <div className="neon-corner bottom-right" />

// //       <div
// //         style={{
// //           display: "flex",
// //           flexWrap: "wrap",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           gap: "1rem",
// //           position: "relative",
// //           zIndex: 1,
// //         }}
// //       >
// //         <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
// //           <div
// //             style={{
// //               width: 52,
// //               height: 52,
// //               borderRadius: 16,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               background: hover
// //                 ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
// //                 : "var(--glass-bg)",
// //               color: hover ? "#fff" : "var(--gradient-start)",
// //               border: "1px solid var(--glass-border)",
// //               flexShrink: 0,
// //               boxShadow: hover ? "0 10px 28px var(--glow-color)" : "none",
// //               transition: "all .35s",
// //             }}
// //           >
// //             <Calendar size={22} />
// //           </div>
// //           <div style={{ minWidth: 0 }}>
// //             <div
// //               style={{
// //                 fontFamily: "Syne, sans-serif",
// //                 fontWeight: 800,
// //                 fontSize: "1.05rem",
// //                 color: "var(--text)",
// //               }}
// //             >
// //               {dateLabel || formatDateFr(date)}
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: "0.7rem",
// //                 color: "var(--text-secondary)",
// //                 marginTop: 2,
// //               }}
// //             >
// //               {date}
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: "0.8rem",
// //                 color: "var(--text-secondary)",
// //                 marginTop: 4,
// //               }}
// //             >
// //               {rows.length} événement{rows.length > 1 ? "s" : ""}
// //             </div>
// //           </div>
// //         </div>

// //         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //           <button type="button" onClick={onVisualiser} style={btnGhost}>
// //             <Eye size={15} /> Visualiser
// //           </button>
// //           <button
// //             type="button"
// //             onClick={onDetails}
// //             style={{
// //               ...btnGhost,
// //               border: "1px solid transparent",
// //               background:
// //                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //               color: "#fff",
// //               boxShadow: "0 6px 18px var(--glow-color)",
// //             }}
// //           >
// //             <ExternalLink size={14} /> Détails
// //           </button>
// //         </div>
// //       </div>

// //       <style>{`
// // .mvt-date-card .neon-corner {
// //   position: absolute; width: 28px; height: 28px;
// //   opacity: 0; transition: opacity .4s ease, transform .45s;
// //   pointer-events: none; z-index: 2;
// // }
// // .mvt-date-card:hover .neon-corner { opacity: 1; }
// // .mvt-date-card .neon-corner.top-left {
// //   top: 0; left: 0;
// //   border-top: 2px solid var(--gradient-start);
// //   border-left: 2px solid var(--gradient-start);
// //   border-top-left-radius: 26px;
// // }
// // .mvt-date-card .neon-corner.top-right {
// //   top: 0; right: 0;
// //   border-top: 2px solid var(--gradient-end);
// //   border-right: 2px solid var(--gradient-end);
// //   border-top-right-radius: 26px;
// // }
// // .mvt-date-card .neon-corner.bottom-left {
// //   bottom: 0; left: 0;
// //   border-bottom: 2px solid var(--gradient-end);
// //   border-left: 2px solid var(--gradient-end);
// //   border-bottom-left-radius: 26px;
// // }
// // .mvt-date-card .neon-corner.bottom-right {
// //   bottom: 0; right: 0;
// //   border-bottom: 2px solid var(--gradient-start);
// //   border-right: 2px solid var(--gradient-start);
// //   border-bottom-right-radius: 26px;
// // }
// // .mvt-date-card:hover .top-left { transform: translate(4px, 4px); }
// // .mvt-date-card:hover .top-right { transform: translate(-4px, 4px); }
// // .mvt-date-card:hover .bottom-left { transform: translate(4px, -4px); }
// // .mvt-date-card:hover .bottom-right { transform: translate(-4px, -4px); }
// // `}</style>
// //     </div>
// //   );
// // }

// // export default function AuditLogs() {
// //   const navigate = useNavigate();
// //   const [logs, setLogs] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchDate, setSearchDate] = useState("");
// //   const [searchText, setSearchText] = useState("");
// //   const [detailsDate, setDetailsDate] = useState(null);

// //   const charger = async () => {
// //     setLoading(true);
// //     try {
// //       const [l, u] = await Promise.all([
// //         safeGet(getAuditLogs),
// //         safeGet(getUsers),
// //       ]);
// //       setLogs((l.data || []).filter((x) => Number(x.deleted ?? 0) === 0));
// //       setUsers(u.data || []);
// //     } catch (e) {
// //       console.error(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     charger();
// //   }, []);

// //   const userMap = useMemo(() => {
// //     const m = {};
// //     (users || []).forEach((u) => {
// //       m[u.id] = [u.first_name, u.name].filter(Boolean).join(" ") || u.email || `#${u.id}`;
// //     });
// //     return m;
// //   }, [users]);

// //   const filtered = useMemo(() => {
// //     const q = searchText.toLowerCase().trim();
// //     if (!q) return logs;
// //     return logs.filter((r) => {
// //       const user = (userMap[r.user_id] || "").toLowerCase();
// //       return (
// //         String(r.action || "").toLowerCase().includes(q) ||
// //         String(r.details || "").toLowerCase().includes(q) ||
// //         user.includes(q) ||
// //         String(r.user_id || "").includes(q)
// //       );
// //     });
// //   }, [logs, searchText, userMap]);

// //   const groupes = useMemo(() => groupByDate(filtered), [filtered]);

// //   const groupesFiltres = useMemo(() => {
// //     const q = searchDate.toLowerCase().trim();
// //     if (!q) return groupes;
// //     return groupes.filter(([date]) => {
// //       const iso = date.toLowerCase();
// //       const fr = formatDateFr(date).toLowerCase();
// //       return iso.includes(q) || fr.includes(q);
// //     });
// //   }, [groupes, searchDate]);

// //   const detailsRows = useMemo(() => {
// //     if (!detailsDate) return [];
// //     return filtered.filter((r) => dateKey(r) === detailsDate);
// //   }, [filtered, detailsDate]);

// //   const goDetailDate = (date) => {
// //     // clé date pour la page détails (à brancher demain)
// //     navigate(`/details/audit/${encodeURIComponent(date)}`);
// //   };

// //   const goDetailAll = () => {
// //     navigate("/details-carousel/audit/all");
// //   };

// //   return (
// //     <div style={{ minHeight: "100vh", position: "relative" }}>
// //       <ThemeBackground />
// //       <div
// //         className="mouvements-page"
// //         style={{
// //           position: "relative",
// //           zIndex: 1,
// //           maxWidth: 1200,
// //           margin: "0 auto",
// //           padding: "1.5rem 20px 2rem",
// //         }}
// //       >
// //         {/* HEADER */}
// //         <div style={{ marginBottom: "1.25rem" }}>
// //           <div
// //             style={{
// //               display: "inline-flex",
// //               alignItems: "center",
// //               gap: 10,
// //               padding: "0.4rem 0.85rem",
// //               borderRadius: 999,
// //               background: "var(--glass-bg)",
// //               border: "1px solid var(--glass-border)",
// //               color: "var(--gradient-start)",
// //               fontSize: "0.75rem",
// //               fontWeight: 700,
// //               marginBottom: 10,
// //             }}
// //           >
// //             <ScrollText size={14} /> Journal d&apos;audit
// //           </div>
// //           <h1
// //             style={{
// //               margin: 0,
// //               fontFamily: "Syne, sans-serif",
// //               fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
// //               fontWeight: 900,
// //               color: "var(--text)",
// //             }}
// //           >
// //             Journal d&apos;appel
// //           </h1>
// //           <p
// //             style={{
// //               margin: "6px 0 0",
// //               color: "var(--text-secondary)",
// //               fontSize: "0.95rem",
// //             }}
// //           >
// //             Traçabilité des actions — regroupées par date (lecture seule)
// //           </p>
// //         </div>

// //         {/* ACTIONS */}
// //         <div
// //           style={{
// //             display: "flex",
// //             flexWrap: "wrap",
// //             gap: 10,
// //             marginBottom: "1.25rem",
// //             alignItems: "center",
// //           }}
// //         >
// //           <div
// //             className="search-bar"
// //             style={{
// //               flex: "1 1 220px",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 8,
// //               padding: "0.65rem 1rem",
// //               borderRadius: 14,
// //               border: "1px solid var(--glass-border)",
// //               background: "var(--glass-bg)",
// //             }}
// //           >
// //             <Search size={16} color="var(--text-secondary)" />
// //             <input
// //               value={searchText}
// //               onChange={(e) => setSearchText(e.target.value)}
// //               placeholder="Action, détail, utilisateur…"
// //               style={{
// //                 flex: 1,
// //                 border: "none",
// //                 outline: "none",
// //                 background: "transparent",
// //                 color: "var(--text)",
// //                 fontSize: "0.9rem",
// //               }}
// //             />
// //           </div>
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 8,
// //               padding: "0.65rem 1rem",
// //               borderRadius: 14,
// //               border: "1px solid var(--glass-border)",
// //               background: "var(--glass-bg)",
// //               minWidth: 180,
// //             }}
// //           >
// //             <Calendar size={16} color="var(--text-secondary)" />
// //             <input
// //               value={searchDate}
// //               onChange={(e) => setSearchDate(e.target.value)}
// //               placeholder="Filtrer date…"
// //               style={{
// //                 flex: 1,
// //                 border: "none",
// //                 outline: "none",
// //                 background: "transparent",
// //                 color: "var(--text)",
// //                 fontSize: "0.9rem",
// //               }}
// //             />
// //           </div>
// //           <button
// //             type="button"
// //             className="btn-detail-all"
// //             onClick={goDetailAll}
// //             style={{
// //               ...btnGhost,
// //               border: "1px solid transparent",
// //               background:
// //                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //               color: "#fff",
// //               boxShadow: "0 8px 22px var(--glow-color)",
// //               padding: "0.75rem 1.1rem",
// //             }}
// //           >
// //             <Layers size={16} /> Détail all
// //           </button>
// //         </div>

// //         {/* KPI */}
// //         <div
// //           className="info-band"
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
// //             gap: 12,
// //             marginBottom: "1.25rem",
// //           }}
// //         >
// //           <InfoCard
// //             label="Événements"
// //             value={filtered.length}
// //             color="#6366f1"
// //             icon={<Activity size={18} />}
// //           />
// //           <InfoCard
// //             label="Jours"
// //             value={groupesFiltres.length}
// //             color="#22c55e"
// //             icon={<Calendar size={18} />}
// //           />
// //           <InfoCard
// //             label="Utilisateurs"
// //             value={new Set(filtered.map((r) => r.user_id)).size}
// //             color="#f59e0b"
// //             icon={<User size={18} />}
// //           />
// //         </div>

// //         {/* LISTE PAR DATE */}
// //         {loading ? (
// //           <p style={{ color: "var(--text-secondary)" }}>Chargement…</p>
// //         ) : groupesFiltres.length === 0 ? (
// //           <p style={{ color: "var(--text-secondary)" }}>
// //             Aucun journal pour ces filtres.
// //           </p>
// //         ) : (
// //           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
// //             {groupesFiltres.map(([date, rows]) => (
// //               <DateCard
// //                 key={date}
// //                 date={date}
// //                 dateLabel={formatDateFr(date)}
// //                 rows={rows}
// //                 onVisualiser={() => setDetailsDate(date)}
// //                 onDetails={() => goDetailDate(date)}
// //               />
// //             ))}
// //           </div>
// //         )}

// //         {/* FRAME VISUALISER */}
// //         {detailsDate && (
// //           <div
// //             onClick={() => setDetailsDate(null)}
// //             style={{
// //               position: "fixed",
// //               inset: 0,
// //               zIndex: 2000,
// //               background: "rgba(0,0,0,.55)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               padding: 16,
// //             }}
// //           >
// //             <div
// //               onClick={(e) => e.stopPropagation()}
// //               style={{
// //                 width: "100%",
// //                 maxWidth: 560,
// //                 maxHeight: "88vh",
// //                 overflow: "auto",
// //                 borderRadius: 24,
// //                 background: "var(--card-bg)",
// //                 border: "1px solid var(--glass-border)",
// //                 padding: "1.2rem",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   marginBottom: 12,
// //                 }}
// //               >
// //                 <div>
// //                   <h3
// //                     style={{
// //                       margin: 0,
// //                       fontFamily: "Syne, sans-serif",
// //                       color: "var(--text)",
// //                     }}
// //                   >
// //                     {formatDateFr(detailsDate)}
// //                   </h3>
// //                   <div
// //                     style={{
// //                       fontSize: "0.75rem",
// //                       color: "var(--text-secondary)",
// //                     }}
// //                   >
// //                     {detailsRows.length} événement
// //                     {detailsRows.length > 1 ? "s" : ""}
// //                   </div>
// //                 </div>
// //                 <button
// //                   type="button"
// //                   onClick={() => setDetailsDate(null)}
// //                   style={{
// //                     border: "none",
// //                     background: "none",
// //                     cursor: "pointer",
// //                     color: "var(--text)",
// //                   }}
// //                 >
// //                   <X size={18} />
// //                 </button>
// //               </div>

// //               {detailsRows.map((r, i) => (
// //                 <div
// //                   key={r.id || i}
// //                   style={{
// //                     padding: "0.75rem 0",
// //                     borderBottom: "1px solid var(--glass-border)",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       gap: 8,
// //                       flexWrap: "wrap",
// //                     }}
// //                   >
// //                     <strong style={{ color: "var(--text)", fontSize: "0.9rem" }}>
// //                       {r.action || "—"}
// //                     </strong>
// //                     <span
// //                       style={{
// //                         fontSize: "0.72rem",
// //                         color: "var(--text-secondary)",
// //                       }}
// //                     >
// //                       {(r.created_at || "").toString().slice(11, 19)}
// //                     </span>
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "0.78rem",
// //                       color: "var(--text-secondary)",
// //                       marginTop: 4,
// //                     }}
// //                   >
// //                     {userMap[r.user_id] || `User #${r.user_id || "?"}`}
// //                   </div>
// //                   {r.details && (
// //                     <div
// //                       style={{
// //                         fontSize: "0.82rem",
// //                         color: "var(--text)",
// //                         marginTop: 6,
// //                         lineHeight: 1.4,
// //                       }}
// //                     >
// //                       {r.details}
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         <Footer />

// //         <style>{`
// // @media (max-width: 900px) {
// //   .info-band { grid-template-columns: 1fr 1fr !important; }
// // }
// // @media (max-width: 520px) {
// //   .info-band { grid-template-columns: 1fr !important; }
// //   .btn-detail-all { width: 100%; justify-content: center; }
// // }
// // `}</style>
// //       </div>
// //     </div>
// //   );
// // }










// /**
//  * AuditLogs — Journal d'audit
//  * Style EXACT Mouvements (header, InfoCards, DateCards, thèmes dynamiques)
//  * Lecture seule + Visualiser + Détails + Détail All + Retour
//  */

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   ScrollText,
//   Eye,
//   ExternalLink,
//   Calendar,
//   ArrowLeft,
//   User,
//   Shield,
//   Activity,
//   Layers,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import * as api from "../api/api";

// const safeGet = (fn) =>
//   typeof fn === "function"
//     ? fn().catch(() => ({ data: [] }))
//     : Promise.resolve({ data: [] });

// /* ========== DATES (identiques Mouvements) ========== */
// function dateKey(row) {
//   return (
//     (row.created_at || row.date || row.update_at || "")
//       .toString()
//       .slice(0, 10) || "—"
//   );
// }

// function formatDateFr(iso) {
//   if (!iso || iso === "—") return "—";
//   const s = String(iso).slice(0, 10);
//   const parts = s.split("-");
//   if (parts.length !== 3) return s;
//   const [y, m, d] = parts;
//   const mois = [
//     "janvier", "février", "mars", "avril", "mai", "juin",
//     "juillet", "août", "septembre", "octobre", "novembre", "décembre",
//   ];
//   const mi = parseInt(m, 10) - 1;
//   if (mi < 0 || mi > 11) return s;
//   return `${parseInt(d, 10)} ${mois[mi]} ${y}`;
// }

// function groupByDate(rows) {
//   const map = {};
//   for (const r of rows) {
//     const d = dateKey(r);
//     if (!map[d]) map[d] = [];
//     map[d].push(r);
//   }
//   return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
// }

// const btnGhost = {
//   display: "flex",
//   alignItems: "center",
//   gap: 6,
//   padding: "0.55rem 0.95rem",
//   borderRadius: 12,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--gradient-start)",
//   fontWeight: 700,
//   fontSize: "0.8rem",
//   cursor: "pointer",
// };

// function InfoCard({ label, value, color, icon }) {
//   return (
//     <div
//       style={{
//         padding: "1rem",
//         borderRadius: 18,
//         background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
//         border: "1px solid var(--glass-border)",
//         display: "flex",
//         gap: 12,
//         alignItems: "center",
//         minHeight: 92,
//         position: "relative",
//         overflow: "hidden",
//         boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
//         minWidth: 0,
//         width: "100%",
//         boxSizing: "border-box",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: `radial-gradient(ellipse at 0% 50%, color-mix(in srgb, ${color} 22%, transparent), transparent 55%)`,
//           pointerEvents: "none",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           left: 0,
//           top: "18%",
//           bottom: "18%",
//           width: 3,
//           borderRadius: 4,
//           background: color,
//           boxShadow: `0 0 10px ${color}`,
//         }}
//       />
//       <div
//         style={{
//           width: 42,
//           height: 42,
//           borderRadius: 12,
//           flexShrink: 0,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: `linear-gradient(145deg, color-mix(in srgb, ${color} 55%, #fff 5%), color-mix(in srgb, ${color} 25%, transparent))`,
//           border: `1px solid color-mix(in srgb, ${color} 55%, transparent)`,
//           color: "#fff",
//           marginLeft: 4,
//           boxShadow: `0 6px 16px color-mix(in srgb, ${color} 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.4)`,
//           position: "relative",
//           overflow: "hidden",
//           zIndex: 1,
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 4,
//             left: 6,
//             width: 14,
//             height: 7,
//             borderRadius: "50%",
//             background: "rgba(255,255,255,0.5)",
//             transform: "rotate(-20deg)",
//             pointerEvents: "none",
//           }}
//         />
//         <span style={{ position: "relative", zIndex: 1, display: "flex" }}>
//           {icon}
//         </span>
//       </div>
//       <div style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
//         <div
//           style={{
//             fontSize: "0.68rem",
//             color: "var(--text-secondary)",
//             fontWeight: 700,
//             letterSpacing: ".08em",
//           }}
//         >
//           {label}
//         </div>
//         <div
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
//             fontWeight: 900,
//             color: "var(--text)",
//           }}
//         >
//           {value}
//         </div>
//       </div>
//     </div>
//   );
// }

// function DateCard({ date, dateLabel, rows, onVisualiser, onDetails }) {
//   const [hover, setHover] = useState(false);
//   const nUsers = new Set(rows.map((r) => r.user_id ?? r.userId).filter(Boolean)).size;

//   return (
//     <div
//       className="mvt-date-card"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: 26,
//         padding: "1.25rem 1.3rem",
//         background: `
//           linear-gradient(
//             145deg,
//             rgba(255,255,255,.08),
//             rgba(255,255,255,.02)
//           ),
//           var(--card-bg)
//         `,
//         backdropFilter: "blur(35px)",
//         border: hover
//           ? "1px solid rgba(255,255,255,.25)"
//           : "1px solid var(--glass-border)",
//         boxShadow: hover
//           ? "0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)"
//           : "0 8px 25px rgba(0,0,0,.10)",
//         transform: hover ? "translateY(-6px)" : "translateY(0)",
//         transition: "all .45s cubic-bezier(.16,1,.3,1)",
//         minWidth: 0,
//       }}
//     >
//       <div className="neon-corner top-left" />
//       <div className="neon-corner top-right" />
//       <div className="neon-corner bottom-left" />
//       <div className="neon-corner bottom-right" />

//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: hover ? "85%" : "60%",
//           height: 1,
//           background:
//             "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
//           opacity: hover ? 0.9 : 0.5,
//           pointerEvents: "none",
//         }}
//       />

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "1rem",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
//           <div
//             style={{
//               width: 52,
//               height: 52,
//               borderRadius: 16,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: hover
//                 ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                 : "var(--glass-bg)",
//               color: hover ? "#fff" : "var(--gradient-start)",
//               border: "1px solid var(--glass-border)",
//               flexShrink: 0,
//               boxShadow: hover ? "0 10px 28px var(--glow-color)" : "none",
//               transition: "all .35s",
//             }}
//           >
//             <Calendar size={22} />
//           </div>
//           <div style={{ minWidth: 0 }}>
//             <div
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 800,
//                 fontSize: "1.05rem",
//                 color: "var(--text)",
//               }}
//             >
//               {dateLabel || formatDateFr(date)}
//             </div>
//             <div
//               style={{
//                 fontSize: "0.7rem",
//                 color: "var(--text-secondary)",
//                 marginTop: 2,
//                 letterSpacing: "0.04em",
//               }}
//             >
//               {date}
//             </div>
//             <div
//               style={{
//                 fontSize: "0.8rem",
//                 color: "var(--text-secondary)",
//                 marginTop: 4,
//               }}
//             >
//               {rows.length} action{rows.length > 1 ? "s" : ""} ·{" "}
//               <span style={{ color: "var(--gradient-start)" }}>
//                 {nUsers} utilisateur{nUsers > 1 ? "s" : ""}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//           <button type="button" onClick={onVisualiser} style={btnGhost}>
//             <Eye size={15} /> Visualiser
//           </button>
//           <button
//             type="button"
//             onClick={onDetails}
//             style={{
//               ...btnGhost,
//               border: "1px solid transparent",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               boxShadow: "0 6px 18px var(--glow-color)",
//             }}
//           >
//             <ExternalLink size={14} /> Détails
//           </button>
//         </div>
//       </div>

//       <style>{`
// .mvt-date-card .neon-corner {
//   position: absolute;
//   width: 28px;
//   height: 28px;
//   opacity: 0;
//   transition: opacity .4s ease, transform .45s;
//   pointer-events: none;
//   z-index: 2;
// }
// .mvt-date-card:hover .neon-corner { opacity: 1; }
// .mvt-date-card .neon-corner.top-left {
//   top: 0; left: 0;
//   border-top: 2px solid var(--gradient-start);
//   border-left: 2px solid var(--gradient-start);
//   border-top-left-radius: 26px;
// }
// .mvt-date-card .neon-corner.top-right {
//   top: 0; right: 0;
//   border-top: 2px solid var(--gradient-end);
//   border-right: 2px solid var(--gradient-end);
//   border-top-right-radius: 26px;
// }
// .mvt-date-card .neon-corner.bottom-left {
//   bottom: 0; left: 0;
//   border-bottom: 2px solid var(--gradient-end);
//   border-left: 2px solid var(--gradient-end);
//   border-bottom-left-radius: 26px;
// }
// .mvt-date-card .neon-corner.bottom-right {
//   bottom: 0; right: 0;
//   border-bottom: 2px solid var(--gradient-start);
//   border-right: 2px solid var(--gradient-start);
//   border-bottom-right-radius: 26px;
// }
// .mvt-date-card:hover .top-left { transform: translate(4px, 4px); }
// .mvt-date-card:hover .top-right { transform: translate(-4px, 4px); }
// .mvt-date-card:hover .bottom-left { transform: translate(4px, -4px); }
// .mvt-date-card:hover .bottom-right { transform: translate(-4px, -4px); }
// `}</style>
//     </div>
//   );
// }

// export default function AuditLogs() {
//   const navigate = useNavigate();
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [searchDate, setSearchDate] = useState("");
//   const [detailsDate, setDetailsDate] = useState(null);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const getFn =
//         api.getAuditLogs ||
//         api.getLogs ||
//         api.fetchAuditLogs ||
//         (() => Promise.resolve({ data: [] }));
//       const res = await safeGet(getFn);
//       setLogs(res.data || []);
//     } catch (e) {
//       console.error(e);
//       setLogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     charger();
//   }, []);

//   const filtered = useMemo(() => {
//     let rows = (logs || []).filter((r) => Number(r.deleted ?? 0) === 0);
//     if (searchDate) {
//       rows = rows.filter((r) => dateKey(r) === searchDate);
//     }
//     const q = search.toLowerCase().trim();
//     if (q) {
//       rows = rows.filter((r) => {
//         const blob = [
//           r.action,
//           r.entity,
//           r.entity_type,
//           r.details,
//           r.message,
//           r.user_name,
//           String(r.user_id ?? ""),
//         ]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase();
//         return blob.includes(q);
//       });
//     }
//     return rows;
//   }, [logs, search, searchDate]);

//   const groupes = useMemo(() => groupByDate(filtered), [filtered]);

//   const detailsRows = useMemo(() => {
//     if (!detailsDate) return [];
//     return filtered.filter((r) => dateKey(r) === detailsDate);
//   }, [filtered, detailsDate]);

//   const nActions = filtered.length;
//   const nUsers = new Set(filtered.map((r) => r.user_id).filter(Boolean)).size;
//   const nDays = groupes.length;

//   return (
//     <div
//       style={{
//         position: "relative",
//         minHeight: "100%",
//         width: "100%",
//         ...(typeof themeCssVars === "function"
//           ? themeCssVars(currentTheme)
//           : {}),
//       }}
//     >
//       <div
//         aria-hidden
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 0,
//           pointerEvents: "none",
//         }}
//       >
//         <ThemeBackground theme={currentTheme} />
//       </div>

//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           width: "100%",
//           maxWidth: 1320,
//           margin: "0 auto",
//           padding: "0 16px 2rem",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* RETOUR */}
//         <div style={{ marginTop: "0.5rem", marginBottom: "0.35rem" }}>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             style={{
//               ...btnGhost,
//               padding: "0.5rem 0.9rem",
//             }}
//           >
//             <ArrowLeft size={16} /> Retour
//           </button>
//         </div>

//         {/* HEADER — style Mouvements */}
//         <div
//           style={{
//             display: "flex",
//             position: "relative",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//             marginTop: "0.35rem",
//             marginBottom: "1.35rem",
//             gap: "0.75rem",
//           }}
//         >
//           <div
//             style={{
//               width: 68,
//               height: 68,
//               borderRadius: 20,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background:
//                 "linear-gradient(145deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               boxShadow: "0 12px 32px var(--glow-color)",
//               border: "1px solid rgba(255,255,255,0.22)",
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 6,
//                 left: 10,
//                 width: 18,
//                 height: 9,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.45)",
//                 transform: "rotate(-20deg)",
//               }}
//             />
//             <ScrollText size={30} />
//           </div>

//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "0.45rem",
//               padding: "5px 12px",
//               borderRadius: 999,
//               background: "var(--glass-bg)",
//               border: "1px solid var(--glass-border)",
//               color: "var(--gradient-start)",
//               fontSize: "0.7rem",
//               fontWeight: 700,
//               letterSpacing: ".08em",
//               textTransform: "uppercase",
//             }}
//           >
//             <Shield size={12} /> Journal d&apos;audit
//           </div>

//           <h1
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
//               fontWeight: 900,
//               margin: 0,
//               background:
//                 "linear-gradient(135deg, var(--text), var(--gradient-start))",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             Journal d&apos;audit
//           </h1>
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               fontSize: "0.92rem",
//               margin: 0,
//               maxWidth: 520,
//               lineHeight: 1.55,
//             }}
//           >
//             Qui a fait quoi, et quand — regroupé par date. Lecture seule.
//           </p>
//         </div>

//         {/* ACTIONS */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "0.65rem",
//             justifyContent: "center",
//             marginBottom: "1.25rem",
//           }}
//         >
//           <button
//             type="button"
//             onClick={() =>
//               navigate("/details-carousel", {
//                 state: { type: "audit", key: "all" },
//               })
//             }
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "0.85rem 1.25rem",
//               borderRadius: 16,
//               border: "none",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               fontWeight: 800,
//               cursor: "pointer",
//               boxShadow: "0 8px 24px var(--glow-color)",
//             }}
//           >
//             <ExternalLink size={16} /> Détail All
//           </button>
//         </div>

//         {/* INFO CARDS */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gap: "0.85rem",
//             marginBottom: "1.25rem",
//           }}
//           className="audit-info-band"
//         >
//           <InfoCard
//             label="ACTIONS"
//             value={loading ? "…" : nActions}
//             color="var(--gradient-start)"
//             icon={<Activity size={18} />}
//           />
//           <InfoCard
//             label="JOURS"
//             value={loading ? "…" : nDays}
//             color="#a855f7"
//             icon={<Calendar size={18} />}
//           />
//           <InfoCard
//             label="UTILISATEURS"
//             value={loading ? "…" : nUsers}
//             color="#fbbf24"
//             icon={<User size={18} />}
//           />
//         </div>

//         {/* FILTRES */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "0.65rem",
//             marginBottom: "1.25rem",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ position: "relative", flex: "1 1 220px" }}>
//             <Search
//               size={16}
//               style={{
//                 position: "absolute",
//                 left: 14,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "var(--text-secondary)",
//               }}
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Rechercher action, entité, utilisateur…"
//               style={{
//                 width: "100%",
//                 padding: "0.75rem 1rem 0.75rem 2.5rem",
//                 borderRadius: 14,
//                 border: "1px solid var(--glass-border)",
//                 background: "var(--glass-bg)",
//                 color: "var(--text)",
//                 fontSize: "0.9rem",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>
//           <input
//             type="date"
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//             style={{
//               padding: "0.75rem 1rem",
//               borderRadius: 14,
//               border: "1px solid var(--glass-border)",
//               background: "var(--glass-bg)",
//               color: "var(--text)",
//               fontSize: "0.9rem",
//               outline: "none",
//             }}
//           />
//           {searchDate && (
//             <button
//               type="button"
//               onClick={() => setSearchDate("")}
//               style={btnGhost}
//             >
//               Effacer date
//             </button>
//           )}
//         </div>

//         {/* LISTE PAR DATE */}
//         {loading ? (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "3rem",
//               color: "var(--text-secondary)",
//             }}
//           >
//             Chargement…
//           </div>
//         ) : groupes.length === 0 ? (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "3rem 1rem",
//               color: "var(--text-secondary)",
//               borderRadius: 20,
//               border: "1px dashed var(--glass-border)",
//               background: "var(--card-bg)",
//             }}
//           >
//             Aucun journal pour ces filtres.
//           </div>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem",
//             }}
//           >
//             {groupes.map(([date, rows]) => (
//               <DateCard
//                 key={date}
//                 date={date}
//                 dateLabel={formatDateFr(date)}
//                 rows={rows}
//                 onVisualiser={() => setDetailsDate(date)}
//                 onDetails={() =>
//                   navigate("/details-carousel", {
//                     state: { type: "audit", key: date },
//                   })
//                 }
//               />
//             ))}
//           </div>
//         )}

//         <Footer />

//         {/* MODAL VISUALISER */}
//         {detailsDate && (
//           <div
//             onClick={() => setDetailsDate(null)}
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 1000,
//               background: "rgba(0,0,0,.55)",
//               backdropFilter: "blur(8px)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 16,
//             }}
//           >
//             <div
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 width: "100%",
//                 maxWidth: 720,
//                 maxHeight: "85vh",
//                 overflow: "auto",
//                 borderRadius: 24,
//                 background: "var(--card-bg)",
//                 border: "1px solid var(--glass-border)",
//                 boxShadow: "0 30px 80px rgba(0,0,0,.35)",
//                 padding: "1.25rem 1.35rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   gap: 12,
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{
//                       fontFamily: "Syne, sans-serif",
//                       fontWeight: 800,
//                       fontSize: "1.15rem",
//                       color: "var(--text)",
//                     }}
//                   >
//                     {formatDateFr(detailsDate)}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.8rem",
//                       color: "var(--text-secondary)",
//                     }}
//                   >
//                     {detailsRows.length} action
//                     {detailsRows.length > 1 ? "s" : ""}
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setDetailsDate(null)}
//                   style={btnGhost}
//                 >
//                   Fermer
//                 </button>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {detailsRows.map((r, idx) => (
//                   <div
//                     key={r.id ?? idx}
//                     style={{
//                       padding: "0.85rem 1rem",
//                       borderRadius: 14,
//                       background: "var(--glass-bg)",
//                       border: "1px solid var(--glass-border)",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontWeight: 700,
//                         color: "var(--text)",
//                         marginBottom: 4,
//                       }}
//                     >
//                       {r.action || "—"}{" "}
//                       <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
//                         · {r.entity || r.entity_type || ""}
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "0.82rem",
//                         color: "var(--text-secondary)",
//                         lineHeight: 1.45,
//                       }}
//                     >
//                       {r.details || r.message || "—"}
//                     </div>
//                     <div
//                       style={{
//                         marginTop: 6,
//                         fontSize: "0.72rem",
//                         color: "var(--text-secondary)",
//                       }}
//                     >
//                       User #{r.user_id ?? "—"} ·{" "}
//                       {(r.created_at || "").toString().slice(11, 19) || "—"}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         <style>{`
// @media (max-width: 640px) {
//   .audit-info-band {
//     grid-template-columns: 1fr !important;
//   }
// }
// `}</style>
//       </div>
//     </div>
//   );
// }




/**
 * AuditLogs — Journal d'audit
 * Style EXACT Mouvements
 * API : uniquement api.getAuditLogs (déclaré dans api.js)
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ScrollText,
  Eye,
  ExternalLink,
  Calendar,
  ArrowLeft,
  User,
  Shield,
  Activity,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

/* ========== DATES ========== */
function dateKey(row) {
  return (
    (row.created_at || row.date || row.update_at || "")
      .toString()
      .slice(0, 10) || "—"
  );
}

function formatDateFr(iso) {
  if (!iso || iso === "—") return "—";
  const s = String(iso).slice(0, 10);
  const parts = s.split("-");
  if (parts.length !== 3) return s;
  const [y, m, d] = parts;
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const mi = parseInt(m, 10) - 1;
  if (mi < 0 || mi > 11) return s;
  return `${parseInt(d, 10)} ${mois[mi]} ${y}`;
}

function groupByDate(rows) {
  const map = {};
  for (const r of rows) {
    const d = dateKey(r);
    if (!map[d]) map[d] = [];
    map[d].push(r);
  }
  return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

const btnGhost = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "0.55rem 0.95rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--gradient-start)",
  fontWeight: 700,
  fontSize: "0.8rem",
  cursor: "pointer",
};

function InfoCard({ label, value, color, icon }) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: 18,
        background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
        border: "1px solid var(--glass-border)",
        display: "flex",
        gap: 12,
        alignItems: "center",
        minHeight: 92,
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
        minWidth: 0,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 0% 50%, color-mix(in srgb, ${color} 22%, transparent), transparent 55%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "18%",
          bottom: "18%",
          width: 3,
          borderRadius: 4,
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(145deg, color-mix(in srgb, ${color} 55%, #fff 5%), color-mix(in srgb, ${color} 25%, transparent))`,
          border: `1px solid color-mix(in srgb, ${color} 55%, transparent)`,
          color: "#fff",
          marginLeft: 4,
          boxShadow: `0 6px 16px color-mix(in srgb, ${color} 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.4)`,
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 6,
            width: 14,
            height: 7,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            transform: "rotate(-20deg)",
            pointerEvents: "none",
          }}
        />
        <span style={{ position: "relative", zIndex: 1, display: "flex" }}>
          {icon}
        </span>
      </div>
      <div style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: "0.68rem",
            color: "var(--text-secondary)",
            fontWeight: 700,
            letterSpacing: ".08em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontWeight: 900,
            color: "var(--text)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function DateCard({ date, dateLabel, rows, onVisualiser, onDetails }) {
  const [hover, setHover] = useState(false);
  const nUsers = new Set(
    rows.map((r) => r.user_id ?? r.userId).filter(Boolean)
  ).size;

  return (
    <div
      className="mvt-date-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        padding: "1.25rem 1.3rem",
        background: `
          linear-gradient(
            145deg,
            rgba(255,255,255,.08),
            rgba(255,255,255,.02)
          ),
          var(--card-bg)
        `,
        backdropFilter: "blur(35px)",
        border: hover
          ? "1px solid rgba(255,255,255,.25)"
          : "1px solid var(--glass-border)",
        boxShadow: hover
          ? "0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)"
          : "0 8px 25px rgba(0,0,0,.10)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "all .45s cubic-bezier(.16,1,.3,1)",
        minWidth: 0,
      }}
    >
      <div className="neon-corner top-left" />
      <div className="neon-corner top-right" />
      <div className="neon-corner bottom-left" />
      <div className="neon-corner bottom-right" />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: hover ? "85%" : "60%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
          opacity: hover ? 0.9 : 0.5,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hover
                ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                : "var(--glass-bg)",
              color: hover ? "#fff" : "var(--gradient-start)",
              border: "1px solid var(--glass-border)",
              flexShrink: 0,
              boxShadow: hover ? "0 10px 28px var(--glow-color)" : "none",
              transition: "all .35s",
            }}
          >
            <Calendar size={22} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "var(--text)",
              }}
            >
              {dateLabel || formatDateFr(date)}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                marginTop: 2,
                letterSpacing: "0.04em",
              }}
            >
              {date}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: 4,
              }}
            >
              {rows.length} action{rows.length > 1 ? "s" : ""} ·{" "}
              <span style={{ color: "var(--gradient-start)" }}>
                {nUsers} utilisateur{nUsers > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={onVisualiser} style={btnGhost}>
            <Eye size={15} /> Visualiser
          </button>
          <button
            type="button"
            onClick={onDetails}
            style={{
              ...btnGhost,
              border: "1px solid transparent",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              boxShadow: "0 6px 18px var(--glow-color)",
            }}
          >
            <ExternalLink size={14} /> Détails
          </button>
        </div>
      </div>

      <style>{`
.mvt-date-card .neon-corner {
  position: absolute; width: 28px; height: 28px; opacity: 0;
  transition: opacity .4s ease, transform .45s; pointer-events: none; z-index: 2;
}
.mvt-date-card:hover .neon-corner { opacity: 1; }
.mvt-date-card .neon-corner.top-left {
  top: 0; left: 0; border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start); border-top-left-radius: 26px;
}
.mvt-date-card .neon-corner.top-right {
  top: 0; right: 0; border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end); border-top-right-radius: 26px;
}
.mvt-date-card .neon-corner.bottom-left {
  bottom: 0; left: 0; border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end); border-bottom-left-radius: 26px;
}
.mvt-date-card .neon-corner.bottom-right {
  bottom: 0; right: 0; border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start); border-bottom-right-radius: 26px;
}
.mvt-date-card:hover .top-left { transform: translate(4px, 4px); }
.mvt-date-card:hover .top-right { transform: translate(-4px, 4px); }
.mvt-date-card:hover .bottom-left { transform: translate(4px, -4px); }
.mvt-date-card:hover .bottom-right { transform: translate(-4px, -4px); }
`}</style>
    </div>
  );
}

export default function AuditLogs() {
  const navigate = useNavigate();
  const currentTheme =
    (typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [detailsDate, setDetailsDate] = useState(null);

  const charger = async () => {
    setLoading(true);
    try {
      // UNIQUEMENT getAuditLogs — doit exister dans api.js
      const res = await api.getAuditLogs();
      const data = res?.data ?? res ?? [];
      setLogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const filtered = useMemo(() => {
    let rows = (logs || []).filter((r) => Number(r.deleted ?? 0) === 0);
    if (searchDate) {
      rows = rows.filter((r) => dateKey(r) === searchDate);
    }
    const q = search.toLowerCase().trim();
    if (q) {
      rows = rows.filter((r) => {
        const blob = [
          r.action,
          r.entity,
          r.entity_type,
          r.details,
          r.message,
          r.user_name,
          String(r.user_id ?? ""),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return blob.includes(q);
      });
    }
    return rows;
  }, [logs, search, searchDate]);

  const groupes = useMemo(() => groupByDate(filtered), [filtered]);

  const detailsRows = useMemo(() => {
    if (!detailsDate) return [];
    return filtered.filter((r) => dateKey(r) === detailsDate);
  }, [filtered, detailsDate]);

  const nActions = filtered.length;
  const nUsers = new Set(filtered.map((r) => r.user_id).filter(Boolean)).size;
  const nDays = groupes.length;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100%",
        width: "100%",
        ...(typeof themeCssVars === "function"
          ? themeCssVars(currentTheme)
          : {}),
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <ThemeBackground theme={currentTheme} />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 16px 2rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginTop: "0.5rem", marginBottom: "0.35rem" }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ ...btnGhost, padding: "0.5rem 0.9rem" }}
          >
            <ArrowLeft size={16} /> Retour
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginTop: "0.35rem",
            marginBottom: "1.35rem",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(145deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              boxShadow: "0 12px 32px var(--glow-color)",
              border: "1px solid rgba(255,255,255,0.22)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 10,
                width: 18,
                height: 9,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.45)",
                transform: "rotate(-20deg)",
              }}
            />
            <ScrollText size={30} />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "5px 12px",
              borderRadius: 999,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--gradient-start)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            <Shield size={12} /> Journal d&apos;audit
          </div>

          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
              fontWeight: 900,
              margin: 0,
              background:
                "linear-gradient(135deg, var(--text), var(--gradient-start))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Journal d&apos;audit
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
              margin: 0,
              maxWidth: 520,
              lineHeight: 1.55,
            }}
          >
            Qui a fait quoi, et quand — regroupé par date. Lecture seule.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.65rem",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <button
            type="button"
            onClick={() =>
              navigate("/details-carousel", {
                state: { type: "audit", key: "all" },
              })
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.85rem 1.25rem",
              borderRadius: 16,
              border: "none",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 24px var(--glow-color)",
            }}
          >
            <ExternalLink size={16} /> Détail All
          </button>
        </div>

        <div
          className="audit-info-band"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.25rem",
          }}
        >
          <InfoCard
            label="ACTIONS"
            value={loading ? "…" : nActions}
            color="var(--gradient-start)"
            icon={<Activity size={18} />}
          />
          <InfoCard
            label="JOURS"
            value={loading ? "…" : nDays}
            color="#a855f7"
            icon={<Calendar size={18} />}
          />
          <InfoCard
            label="UTILISATEURS"
            value={loading ? "…" : nUsers}
            color="#fbbf24"
            icon={<User size={18} />}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.65rem",
            marginBottom: "1.25rem",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-secondary)",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher action, entité, utilisateur…"
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.5rem",
                borderRadius: 14,
                border: "1px solid var(--glass-border)",
                background: "var(--glass-bg)",
                color: "var(--text)",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              color: "var(--text)",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
          {searchDate ? (
            <button type="button" onClick={() => setSearchDate("")} style={btnGhost}>
              Effacer date
            </button>
          ) : null}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>
            Chargement…
          </div>
        ) : groupes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "var(--text-secondary)",
              borderRadius: 20,
              border: "1px dashed var(--glass-border)",
              background: "var(--card-bg)",
            }}
          >
            Aucun journal pour ces filtres.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {groupes.map(([date, rows]) => (
              <DateCard
                key={date}
                date={date}
                dateLabel={formatDateFr(date)}
                rows={rows}
                onVisualiser={() => setDetailsDate(date)}
                onDetails={() =>
                  navigate("/details-carousel", {
                    state: { type: "audit", key: date },
                  })
                }
              />
            ))}
          </div>
        )}

        <Footer />

        {detailsDate ? (
          <div
            onClick={() => setDetailsDate(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,.55)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 720,
                maxHeight: "85vh",
                overflow: "auto",
                borderRadius: 24,
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 30px 80px rgba(0,0,0,.35)",
                padding: "1.25rem 1.35rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      color: "var(--text)",
                    }}
                  >
                    {formatDateFr(detailsDate)}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    {detailsRows.length} action{detailsRows.length > 1 ? "s" : ""}
                  </div>
                </div>
                <button type="button" onClick={() => setDetailsDate(null)} style={btnGhost}>
                  Fermer
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {detailsRows.map((r, idx) => (
                  <div
                    key={r.id ?? idx}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: 14,
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                      {r.action || "—"}{" "}
                      <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                        · {r.entity || r.entity_type || ""}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.45,
                      }}
                    >
                      {r.details || r.message || "—"}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      User #{r.user_id ?? "—"} ·{" "}
                      {(r.created_at || "").toString().slice(11, 19) || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <style>{`
@media (max-width: 640px) {
  .audit-info-band { grid-template-columns: 1fr !important; }
}
`}</style>
      </div>
    </div>
  );
}
