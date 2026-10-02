// /**
//  * Archives mouvements — même identité que Mouvements / Journal d'audit
//  * Regroupement par date · Visualiser · Détail / Détail All
//  * Lecture seule
//  */

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Archive,
//   Eye,
//   ExternalLink,
//   Calendar,
//   X,
//   Package,
//   ArrowDownToLine,
//   ArrowUpFromLine,
//   Layers,
//   Warehouse,
// } from "lucide-react";
// import ThemeBackground from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import * as api from "../api/api";

// const {
//   getMouvementsArchives,
//   getItems,
//   getEntrepots,
// } = api;

// const safeGet = (fn) =>
//   typeof fn === "function"
//     ? fn().catch(() => ({ data: [] }))
//     : Promise.resolve({ data: [] });

// function dateKey(row) {
//   return (
//     (row.date || row.created_at || row.update_at || "")
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

// function designation(item) {
//   if (!item) return "—";
//   return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
// }

// function buildImageFileName(item) {
//   const parts = [item?.name, item?.mark, item?.modele]
//     .map((p) => (p || "").toString().trim())
//     .filter(Boolean)
//     .map((p) =>
//       p
//         .replace(/[^\w\u00C0-\u024F\-]+/gi, "_")
//         .replace(/_+/g, "_")
//         .replace(/^_|_$/g, "")
//     );
//   return parts.length ? parts.join("_") : null;
// }

// function getArticleImageSrc(item) {
//   if (!item) return null;
//   if (item.picture_path) {
//     let p = String(item.picture_path)
//       .split(/[/\\]/)
//       .pop()
//       .replace(/^\/+/, "");
//     if (!p.startsWith("items/") && !p.startsWith("images/")) p = `items/${p}`;
//     if (p.startsWith("images/")) return `/${p}`;
//     return `/images/${p}`;
//   }
//   const base = buildImageFileName(item);
//   return base ? `/images/items/${base}.jpg` : null;
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
//           width: 42,
//           height: 42,
//           borderRadius: 12,
//           flexShrink: 0,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: `linear-gradient(145deg, color-mix(in srgb, ${color} 55%, #fff 5%), color-mix(in srgb, ${color} 25%, transparent))`,
//           color: "#fff",
//           zIndex: 1,
//         }}
//       >
//         {icon}
//       </div>
//       <div style={{ minWidth: 0 }}>
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
//   let nIn = 0;
//   let nOut = 0;
//   rows.forEach((r) => {
//     if (String(r.type || "").toLowerCase().includes("entr")) nIn += 1;
//     else nOut += 1;
//   });

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
//           linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
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
//       }}
//     >
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
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
//               boxShadow: hover ? "0 10px 28px var(--glow-color)" : "none",
//             }}
//           >
//             <Archive size={22} />
//           </div>
//           <div>
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
//                 fontSize: "0.8rem",
//                 color: "var(--text-secondary)",
//                 marginTop: 4,
//               }}
//             >
//               {rows.length} mvt ·{" "}
//               <span style={{ color: "#4ade80" }}>{nIn} entr.</span>
//               {" · "}
//               <span style={{ color: "#f87171" }}>{nOut} sort.</span>
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
//     </div>
//   );
// }

// function Thumb({ item, size = 48 }) {
//   const src = getArticleImageSrc(item);
//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: 12,
//         overflow: "hidden",
//         flexShrink: 0,
//         background: "var(--glass-bg)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {src ? (
//         <img
//           src={src}
//           alt=""
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           onError={(e) => {
//             e.currentTarget.style.display = "none";
//           }}
//         />
//       ) : (
//         <Package size={18} color="var(--gradient-start)" />
//       )}
//     </div>
//   );
// }

// export default function ArchivesMouvements() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [items, setItems] = useState([]);
//   const [entrepots, setEntrepots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchDate, setSearchDate] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [detailsDate, setDetailsDate] = useState(null);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const [a, i, e] = await Promise.all([
//         safeGet(getMouvementsArchives),
//         safeGet(getItems),
//         safeGet(getEntrepots),
//       ]);
//       setRows((a.data || []).filter((x) => Number(x.deleted ?? 0) === 0));
//       setItems(i.data || []);
//       setEntrepots(e.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     charger();
//   }, []);

//   const itemMap = useMemo(() => {
//     const m = {};
//     (items || []).forEach((it) => {
//       m[it.id] = it;
//     });
//     return m;
//   }, [items]);

//   const entrepotMap = useMemo(() => {
//     const m = {};
//     (entrepots || []).forEach((e) => {
//       m[e.id] = e.reference || e.name || `#${e.id}`;
//     });
//     return m;
//   }, [entrepots]);

//   const enriched = useMemo(() => {
//     return rows.map((r) => ({
//       ...r,
//       _item: itemMap[r.item_id],
//       _entrepot: entrepotMap[r.entrepot_id] || "—",
//     }));
//   }, [rows, itemMap, entrepotMap]);

//   const filtered = useMemo(() => {
//     const q = searchText.toLowerCase().trim();
//     if (!q) return enriched;
//     return enriched.filter((r) => {
//       const des = designation(r._item).toLowerCase();
//       return (
//         des.includes(q) ||
//         String(r.type || "").toLowerCase().includes(q) ||
//         String(r.nature || "").toLowerCase().includes(q) ||
//         String(r._entrepot || "").toLowerCase().includes(q)
//       );
//     });
//   }, [enriched, searchText]);

//   const groupes = useMemo(() => groupByDate(filtered), [filtered]);

//   const groupesFiltres = useMemo(() => {
//     const q = searchDate.toLowerCase().trim();
//     if (!q) return groupes;
//     return groupes.filter(([date]) => {
//       return (
//         date.toLowerCase().includes(q) ||
//         formatDateFr(date).toLowerCase().includes(q)
//       );
//     });
//   }, [groupes, searchDate]);

//   const detailsRows = useMemo(() => {
//     if (!detailsDate) return [];
//     return filtered.filter((r) => dateKey(r) === detailsDate);
//   }, [filtered, detailsDate]);

//   const totalIn = filtered.filter((r) =>
//     String(r.type || "").toLowerCase().includes("entr")
//   ).length;
//   const totalOut = filtered.length - totalIn;

//   const goDetailDate = (date) => {
//     navigate(`/details/archives/${encodeURIComponent(date)}`);
//   };

//   const goDetailAll = () => {
//     navigate("/details-carousel/archives/all");
//   };

//   return (
//     <div style={{ minHeight: "100vh", position: "relative" }}>
//       <ThemeBackground />
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           maxWidth: 1200,
//           margin: "0 auto",
//           padding: "1.5rem 20px 2rem",
//         }}
//       >
//         <div style={{ marginBottom: "1.25rem" }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 10,
//               padding: "0.4rem 0.85rem",
//               borderRadius: 999,
//               background: "var(--glass-bg)",
//               border: "1px solid var(--glass-border)",
//               color: "var(--gradient-start)",
//               fontSize: "0.75rem",
//               fontWeight: 700,
//               marginBottom: 10,
//             }}
//           >
//             <Archive size={14} /> Archives
//           </div>
//           <h1
//             style={{
//               margin: 0,
//               fontFamily: "Syne, sans-serif",
//               fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
//               fontWeight: 900,
//               color: "var(--text)",
//             }}
//           >
//             Mouvements archivés
//           </h1>
//           <p
//             style={{
//               margin: "6px 0 0",
//               color: "var(--text-secondary)",
//               fontSize: "0.95rem",
//             }}
//           >
//             Historique consolidé — consultation uniquement
//           </p>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 10,
//             marginBottom: "1.25rem",
//           }}
//         >
//           <div
//             style={{
//               flex: "1 1 220px",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "0.65rem 1rem",
//               borderRadius: 14,
//               border: "1px solid var(--glass-border)",
//               background: "var(--glass-bg)",
//             }}
//           >
//             <Search size={16} color="var(--text-secondary)" />
//             <input
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               placeholder="Article, type, entrepôt…"
//               style={{
//                 flex: 1,
//                 border: "none",
//                 outline: "none",
//                 background: "transparent",
//                 color: "var(--text)",
//               }}
//             />
//           </div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "0.65rem 1rem",
//               borderRadius: 14,
//               border: "1px solid var(--glass-border)",
//               background: "var(--glass-bg)",
//               minWidth: 180,
//             }}
//           >
//             <Calendar size={16} color="var(--text-secondary)" />
//             <input
//               value={searchDate}
//               onChange={(e) => setSearchDate(e.target.value)}
//               placeholder="Filtrer date…"
//               style={{
//                 flex: 1,
//                 border: "none",
//                 outline: "none",
//                 background: "transparent",
//                 color: "var(--text)",
//               }}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={goDetailAll}
//             style={{
//               ...btnGhost,
//               border: "1px solid transparent",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               boxShadow: "0 8px 22px var(--glow-color)",
//               padding: "0.75rem 1.1rem",
//             }}
//           >
//             <Layers size={16} /> Détail all
//           </button>
//         </div>

//         <div
//           className="info-band"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gap: 12,
//             marginBottom: "1.25rem",
//           }}
//         >
//           <InfoCard
//             label="Archivés"
//             value={filtered.length}
//             color="#8b5cf6"
//             icon={<Archive size={18} />}
//           />
//           <InfoCard
//             label="Entrées"
//             value={totalIn}
//             color="#22c55e"
//             icon={<ArrowDownToLine size={18} />}
//           />
//           <InfoCard
//             label="Sorties"
//             value={totalOut}
//             color="#ef4444"
//             icon={<ArrowUpFromLine size={18} />}
//           />
//         </div>

//         {loading ? (
//           <p style={{ color: "var(--text-secondary)" }}>Chargement…</p>
//         ) : groupesFiltres.length === 0 ? (
//           <p style={{ color: "var(--text-secondary)" }}>
//             Aucune archive pour ces filtres.
//           </p>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//             {groupesFiltres.map(([date, list]) => (
//               <DateCard
//                 key={date}
//                 date={date}
//                 dateLabel={formatDateFr(date)}
//                 rows={list}
//                 onVisualiser={() => setDetailsDate(date)}
//                 onDetails={() => goDetailDate(date)}
//               />
//             ))}
//           </div>
//         )}

//         {detailsDate && (
//           <div
//             onClick={() => setDetailsDate(null)}
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 2000,
//               background: "rgba(0,0,0,.55)",
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
//                 maxWidth: 520,
//                 maxHeight: "88vh",
//                 overflow: "auto",
//                 borderRadius: 24,
//                 background: "var(--card-bg)",
//                 border: "1px solid var(--glass-border)",
//                 padding: "1.2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginBottom: 12,
//                 }}
//               >
//                 <div>
//                   <h3
//                     style={{
//                       margin: 0,
//                       fontFamily: "Syne, sans-serif",
//                       color: "var(--text)",
//                     }}
//                   >
//                     {formatDateFr(detailsDate)}
//                   </h3>
//                   <div
//                     style={{
//                       fontSize: "0.75rem",
//                       color: "var(--text-secondary)",
//                     }}
//                   >
//                     {detailsRows.length} mouvement
//                     {detailsRows.length > 1 ? "s" : ""} archivé
//                     {detailsRows.length > 1 ? "s" : ""}
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setDetailsDate(null)}
//                   style={{
//                     border: "none",
//                     background: "none",
//                     cursor: "pointer",
//                     color: "var(--text)",
//                   }}
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               {detailsRows.map((r, i) => (
//                 <div
//                   key={r.id || i}
//                   style={{
//                     display: "flex",
//                     gap: 10,
//                     alignItems: "center",
//                     padding: "0.7rem 0",
//                     borderBottom: "1px solid var(--glass-border)",
//                   }}
//                 >
//                   <Thumb item={r._item} />
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div
//                       style={{
//                         fontWeight: 700,
//                         fontSize: "0.88rem",
//                         color: "var(--text)",
//                       }}
//                     >
//                       {designation(r._item)}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "0.72rem",
//                         color: "var(--text-secondary)",
//                         marginTop: 2,
//                       }}
//                     >
//                       {r.type} · qty {r.qty} · {r._entrepot}
//                       {r.nature ? ` · ${r.nature}` : ""}
//                     </div>
//                   </div>
//                   <Warehouse size={14} color="var(--text-secondary)" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <Footer />

//         <style>{`
// @media (max-width: 900px) {
//   .info-band { grid-template-columns: 1fr 1fr !important; }
// }
// @media (max-width: 520px) {
//   .info-band { grid-template-columns: 1fr !important; }
// }
// `}</style>
//       </div>
//     </div>
//   );
// }



/**
 * ArchivesMouvements — Mouvements archivés
 * Style EXACT Mouvements (header, InfoCards, DateCards, thèmes dynamiques)
 * Lecture seule + Visualiser + Détails + Détail All + Retour
 * API : getMouvementsArchives / getArchived / GET /mouvements/archived
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Archive,
  Eye,
  ExternalLink,
  Calendar,
  ArrowLeft,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  Layers,
  Warehouse,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const safeGet = (fn) =>
  typeof fn === "function"
    ? fn().catch(() => ({ data: [] }))
    : Promise.resolve({ data: [] });

/* ========== IMAGE (même logique Mouvements) ========== */
function buildImageFileName(item) {
  const parts = [item?.name, item?.mark, item?.modele]
    .map((p) => (p || "").toString().trim())
    .filter(Boolean)
    .map((p) =>
      p
        .replace(/[^\w\u00C0-\u024F\-]+/gi, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
    );
  return parts.length ? parts.join("_") : null;
}

function getArticleImageSrc(item) {
  if (!item) return null;
  if (item.picture_path) {
    let p = String(item.picture_path)
      .split(/[/\\]/)
      .pop()
      .replace(/^\/+/, "");
    if (!p.startsWith("items/") && !p.startsWith("images/")) p = `items/${p}`;
    if (p.startsWith("images/")) return `/${p}`;
    return `/images/${p}`;
  }
  const base = buildImageFileName(item);
  return base ? `/images/items/${base}.jpg` : null;
}

function designation(item) {
  if (!item) return "—";
  return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
}

/* ========== DATES ========== */
function dateKey(row) {
  return (
    (row.date || row.created_at || row.update_at || "")
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

function Thumb({ item, size = 48 }) {
  const src = getArticleImageSrc(item);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        overflow: "hidden",
        flexShrink: 0,
        background:
          "linear-gradient(160deg, color-mix(in srgb, var(--gradient-start) 18%, var(--card-bg)), var(--card-bg))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <Package size={Math.max(14, size * 0.35)} color="var(--gradient-start)" />
      )}
    </div>
  );
}

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
  let nIn = 0;
  let nOut = 0;
  rows.forEach((r) => {
    if (String(r.type || "").toLowerCase().includes("entr")) nIn += 1;
    else nOut += 1;
  });

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
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
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
              {rows.length} mouvement{rows.length > 1 ? "s" : ""} ·{" "}
              <span style={{ color: "#4ade80" }}>
                {nIn} entrée{nIn > 1 ? "s" : ""}
              </span>
              {" · "}
              <span style={{ color: "#f87171" }}>
                {nOut} sortie{nOut > 1 ? "s" : ""}
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
  position: absolute;
  width: 28px;
  height: 28px;
  opacity: 0;
  transition: opacity .4s ease, transform .45s;
  pointer-events: none;
  z-index: 2;
}
.mvt-date-card:hover .neon-corner { opacity: 1; }
.mvt-date-card .neon-corner.top-left {
  top: 0; left: 0;
  border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start);
  border-top-left-radius: 26px;
}
.mvt-date-card .neon-corner.top-right {
  top: 0; right: 0;
  border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end);
  border-top-right-radius: 26px;
}
.mvt-date-card .neon-corner.bottom-left {
  bottom: 0; left: 0;
  border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end);
  border-bottom-left-radius: 26px;
}
.mvt-date-card .neon-corner.bottom-right {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start);
  border-bottom-right-radius: 26px;
}
.mvt-date-card:hover .top-left { transform: translate(4px, 4px); }
.mvt-date-card:hover .top-right { transform: translate(-4px, 4px); }
.mvt-date-card:hover .bottom-left { transform: translate(4px, -4px); }
.mvt-date-card:hover .bottom-right { transform: translate(-4px, -4px); }
`}</style>
    </div>
  );
}

export default function ArchivesMouvements() {
  const navigate = useNavigate();
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [archives, setArchives] = useState([]);
  const [items, setItems] = useState([]);
  const [entrepots, setEntrepots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [detailsDate, setDetailsDate] = useState(null);

  const charger = async () => {
    setLoading(true);
    try {
      // Priorité : getMouvementsArchives → getArchived → fallback sync très ancien
      let archFn =
        api.getMouvementsArchives ||
        api.getArchived ||
        api.getMouvementsArchived ||
        null;

      const [archRes, itemsRes, entRes] = await Promise.all([
        archFn
          ? safeGet(archFn)
          : typeof api.get === "function"
          ? api.get("/mouvements/archived").catch(() => ({ data: [] }))
          : Promise.resolve({ data: [] }),
        safeGet(api.getItems),
        safeGet(api.getEntrepots),
      ]);

      setArchives(archRes.data || []);
      setItems(itemsRes.data || []);
      setEntrepots(entRes.data || []);
    } catch (e) {
      console.error(e);
      setArchives([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const itemMap = useMemo(() => {
    const m = {};
    (items || []).forEach((it) => {
      m[Number(it.id)] = it;
    });
    return m;
  }, [items]);

  const entrepotMap = useMemo(() => {
    const m = {};
    (entrepots || []).forEach((e) => {
      m[Number(e.id)] = e;
    });
    return m;
  }, [entrepots]);

  const filtered = useMemo(() => {
    let rows = (archives || []).filter((r) => Number(r.deleted ?? 0) === 0);
    if (searchDate) {
      rows = rows.filter((r) => dateKey(r) === searchDate);
    }
    const q = search.toLowerCase().trim();
    if (q) {
      rows = rows.filter((r) => {
        const it = itemMap[Number(r.item_id)];
        const en = entrepotMap[Number(r.entrepot_id)];
        const blob = [
          designation(it),
          en?.name,
          r.type,
          r.nature,
          r.raison,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return blob.includes(q);
      });
    }
    return rows;
  }, [archives, search, searchDate, itemMap, entrepotMap]);

  const groupes = useMemo(() => groupByDate(filtered), [filtered]);

  const detailsRows = useMemo(() => {
    if (!detailsDate) return [];
    return filtered.filter((r) => dateKey(r) === detailsDate);
  }, [filtered, detailsDate]);

  const totalIn = filtered.filter((r) =>
    String(r.type || "").toLowerCase().includes("entr")
  ).length;
  const totalOut = filtered.length - totalIn;
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
        {/* RETOUR */}
        <div style={{ marginTop: "0.5rem", marginBottom: "0.35rem" }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              ...btnGhost,
              padding: "0.5rem 0.9rem",
            }}
          >
            <ArrowLeft size={16} /> Retour
          </button>
        </div>

        {/* HEADER — style Mouvements */}
        <div
          style={{
            display: "flex",
            position: "relative",
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
            <Archive size={30} />
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
            <Archive size={12} /> Archives
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
            Archives mouvements
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
            Historique consolidé des mouvements archivés — regroupé par date.
            Lecture seule.
          </p>
        </div>

        {/* ACTIONS */}
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
                state: { type: "archive", key: "all" },
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

        {/* INFO CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.25rem",
          }}
          className="arch-info-band"
        >
          <InfoCard
            label="ARCHIVÉS"
            value={loading ? "…" : filtered.length}
            color="var(--gradient-start)"
            icon={<Layers size={18} />}
          />
          <InfoCard
            label="ENTRÉES"
            value={loading ? "…" : totalIn}
            color="#4ade80"
            icon={<ArrowDownToLine size={18} />}
          />
          <InfoCard
            label="SORTIES"
            value={loading ? "…" : totalOut}
            color="#f87171"
            icon={<ArrowUpFromLine size={18} />}
          />
        </div>

        {/* FILTRES */}
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
              placeholder="Rechercher article, entrepôt, type…"
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
          {searchDate && (
            <button
              type="button"
              onClick={() => setSearchDate("")}
              style={btnGhost}
            >
              Effacer date
            </button>
          )}
        </div>

        {/* LISTE */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "var(--text-secondary)",
            }}
          >
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
            Aucune archive pour ces filtres.
            <div style={{ marginTop: 8, fontSize: "0.82rem" }}>
              Vérifie la route <code>GET /mouvements/archived</code> côté API.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {groupes.map(([date, rows]) => (
              <DateCard
                key={date}
                date={date}
                dateLabel={formatDateFr(date)}
                rows={rows}
                onVisualiser={() => setDetailsDate(date)}
                onDetails={() =>
                  navigate("/details-carousel", {
                    state: { type: "archive", key: date },
                  })
                }
              />
            ))}
          </div>
        )}

        <Footer />

        {/* MODAL VISUALISER */}
        {detailsDate && (
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
                maxWidth: 780,
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
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {detailsRows.length} mouvement
                    {detailsRows.length > 1 ? "s" : ""} archivé
                    {detailsRows.length > 1 ? "s" : ""}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailsDate(null)}
                  style={btnGhost}
                >
                  Fermer
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {detailsRows.map((r, idx) => {
                  const it = itemMap[Number(r.item_id)];
                  const en = entrepotMap[Number(r.entrepot_id)];
                  const isIn = String(r.type || "")
                    .toLowerCase()
                    .includes("entr");
                  return (
                    <div
                      key={r.id ?? idx}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        padding: "0.85rem 1rem",
                        borderRadius: 14,
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <Thumb item={it} size={48} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--text)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {designation(it)}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                            marginTop: 2,
                          }}
                        >
                          <Warehouse
                            size={12}
                            style={{
                              display: "inline",
                              verticalAlign: "middle",
                              marginRight: 4,
                            }}
                          />
                          {en?.name || `Entrepôt #${r.entrepot_id}`} · qty{" "}
                          {r.qty}
                          {r.nature ? ` · ${r.nature}` : ""}
                          {r.raison ? ` · ${r.raison}` : ""}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "0.35rem 0.7rem",
                          borderRadius: 999,
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          background: isIn
                            ? "rgba(74,222,128,.15)"
                            : "rgba(248,113,113,.15)",
                          color: isIn ? "#4ade80" : "#f87171",
                          border: `1px solid ${
                            isIn
                              ? "rgba(74,222,128,.35)"
                              : "rgba(248,113,113,.35)"
                          }`,
                          flexShrink: 0,
                        }}
                      >
                        {r.type || "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <style>{`
@media (max-width: 640px) {
  .arch-info-band {
    grid-template-columns: 1fr !important;
  }
}
`}</style>
      </div>
    </div>
  );
}
