// /**
//  * Mouvements — même identité visuelle que Categories / Articles / Dashboard
//  * Logique métier conservée (groupement date, panier, régularisation, etc.)
//  */
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Package,
//   X,
//   ShoppingCart,
//   Eye,
//   ExternalLink,
//   ArrowDownToLine,
//   ArrowUpFromLine,
//   Calendar,
//   Warehouse,
//   Scale,
//   AlertTriangle,
//   ArrowLeftRight,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import * as api from "../api/api";

// const {
//   getItems,
//   getEntrepots,
//   getStocks,
//   getMouvementsRecents,
//   getStockAjustments,
//   createMouvementRecent,
//   createAjustement,
// } = api;

// const safeGet = (fn) =>
//   typeof fn === "function"
//     ? fn().catch(() => ({ data: [] }))
//     : Promise.resolve({ data: [] });

// const safePost = (fn, payload) =>
//   typeof fn === "function"
//     ? fn(payload)
//     : Promise.reject(new Error("API manquante"));

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

// function designation(item) {
//   if (!item) return "—";
//   return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
// }

// function convertirQuantite(qte, stock) {
//   const level = Number(stock?.level) || 1;
//   const qty_card = Number(stock?.qty_by_card) || 0;
//   const qty_box = Number(stock?.qty_by_box) || 0;
//   const nom_carton = stock?.niveau_3 || "Carton";
//   const nom_boite = stock?.niveau_2 || "Boîte";
//   const nom_piece = stock?.niveau_1 || "Pièce";
//   qte = Number(qte) || 0;
//   if (level === 1) return `${Math.round(qte)} ${nom_piece}`;
//   if (level === 2) {
//     const capacite = qty_box || 1;
//     const cartons = Math.trunc(qte);
//     const pieces = Math.round((qte - cartons) * capacite);
//     const texte = [];
//     if (cartons > 0) texte.push(`${cartons} ${nom_carton}`);
//     if (pieces > 0) texte.push(`${pieces} ${nom_piece}`);
//     return texte.join(" • ") || `0 ${nom_piece}`;
//   }
//   if (level === 3) {
//     const boites_par_carton = qty_card || 1;
//     const pieces_par_boite = qty_box || 1;
//     const cartons = Math.trunc(qte);
//     const total_boites = (qte - cartons) * boites_par_carton;
//     const boites = Math.trunc(total_boites);
//     const pieces = Math.round((total_boites - boites) * pieces_par_boite);
//     const texte = [];
//     if (cartons > 0) texte.push(`${cartons} ${nom_carton}`);
//     if (boites > 0) texte.push(`${boites} ${nom_boite}`);
//     if (pieces > 0) texte.push(`${pieces} ${nom_piece}`);
//     return texte.join(" • ") || `0 ${nom_piece}`;
//   }
//   return `${qte}`;
// }

// function quantitesVersDecimal(level, { carton = 0, boite = 0, piece = 0 }, cap_boite, cap_unit) {
//   level = Number(level) || 1;
//   carton = Number(carton) || 0;
//   boite = Number(boite) || 0;
//   piece = Number(piece) || 0;
//   const cBoite = Number(cap_boite) || 0;
//   const cUnit = Number(cap_unit) || 0;
//   if (level === 1) return piece;
//   if (level === 2) return carton + piece / (cBoite || 1);
//   const ppc = (cBoite || 1) * (cUnit || 1) || 1;
//   return (carton * ppc + boite * (cUnit || 1) + piece) / ppc;
// }

// function dateKey(row) {
//   return (
//     (row.date || row.created_at || row.update_at || "").toString().slice(0, 10) ||
//     "—"
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

// function todayISO() {

//   const d = new Date();
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
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

// const lbl = {
//   display: "block",
//   fontSize: "0.72rem",
//   fontWeight: 700,
//   color: "var(--text-secondary)",
//   textTransform: "uppercase",
//   letterSpacing: "0.05em",
//   marginBottom: "0.4rem",
// };

// const inp = {
//   width: "100%",
//   padding: "0.7rem 0.9rem",
//   borderRadius: 12,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--text)",
//   fontSize: "0.9rem",
//   outline: "none",
//   boxSizing: "border-box",
// };

// const btnPrimary = {
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   padding: "0.85rem 1.25rem",
//   borderRadius: 16,
//   border: "none",
//   background:
//     "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//   color: "#fff",
//   fontWeight: 800,
//   cursor: "pointer",
//   boxShadow: "0 8px 24px var(--glow-color)",
// };

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

// function Thumb({ item, size = 56, onClick, clickable = false }) {
//   const src = getArticleImageSrc(item);
//   return (
//     <div
//       onClick={clickable && item?.id && onClick ? onClick : undefined}
//       role={clickable && item?.id ? "button" : undefined}
//       style={{
//         cursor: clickable && item?.id ? "pointer" : undefined,
//         width: size,
//         height: size,
//         borderRadius: 12,
//         overflow: "hidden",
//         flexShrink: 0,
//         background:
//           "linear-gradient(160deg, color-mix(in srgb, var(--gradient-start) 18%, var(--card-bg)), var(--card-bg))",
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
//         <Package size={Math.max(16, size * 0.35)} color="var(--gradient-start)" />
//       )}
//     </div>
//   );
// }

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
//               {rows.length} mouvement{rows.length > 1 ? "s" : ""} ·{" "}
//               <span style={{ color: "#4ade80" }}>{nIn} entrée{nIn > 1 ? "s" : ""}</span>
//               {" · "}
//               <span style={{ color: "#f87171" }}>{nOut} sortie{nOut > 1 ? "s" : ""}</span>
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
//         .mvt-date-card .neon-corner {
//           position: absolute;
//           width: 28px;
//           height: 28px;
//           opacity: 0;
//           transition: opacity .4s ease, transform .45s;
//           pointer-events: none;
//           z-index: 2;
//         }
//         .mvt-date-card:hover .neon-corner { opacity: 1; }
//         .mvt-date-card .neon-corner.top-left {
//           top: 0; left: 0;
//           border-top: 2px solid var(--gradient-start);
//           border-left: 2px solid var(--gradient-start);
//           border-top-left-radius: 26px;
//         }
//         .mvt-date-card .neon-corner.top-right {
//           top: 0; right: 0;
//           border-top: 2px solid var(--gradient-end);
//           border-right: 2px solid var(--gradient-end);
//           border-top-right-radius: 26px;
//         }
//         .mvt-date-card .neon-corner.bottom-left {
//           bottom: 0; left: 0;
//           border-bottom: 2px solid var(--gradient-end);
//           border-left: 2px solid var(--gradient-end);
//           border-bottom-left-radius: 26px;
//         }
//         .mvt-date-card .neon-corner.bottom-right {
//           bottom: 0; right: 0;
//           border-bottom: 2px solid var(--gradient-start);
//           border-right: 2px solid var(--gradient-start);
//           border-bottom-right-radius: 26px;
//         }
//         .mvt-date-card:hover .top-left { transform: translate(4px, 4px); }
//         .mvt-date-card:hover .top-right { transform: translate(-4px, 4px); }
//         .mvt-date-card:hover .bottom-left { transform: translate(4px, -4px); }
//         .mvt-date-card:hover .bottom-right { transform: translate(-4px, -4px); }
//       `}</style>
//     </div>
//   );
// }

// export default function Mouvements() {
//   const navigate = useNavigate();
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [items, setItems] = useState([]);
//   const [entrepots, setEntrepots] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [mouvements, setMouvements] = useState([]);
//   const [ajustments, setAjustments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [detailsDate, setDetailsDate] = useState(null);
//   const [addOpen, setAddOpen] = useState(false);
//   const [tab, setTab] = useState("courant");
//   const [search, setSearch] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [typeMvt, setTypeMvt] = useState("Sortie");
//   const [entrepotId, setEntrepotId] = useState("");
//   const [raison, setRaison] = useState("");
//   const [nature, setNature] = useState("usage");
//   const [qty, setQty] = useState({ carton: 0, boite: 0, piece: 0 });
//   const [regTargets, setRegTargets] = useState({});
//   const [cart, setCart] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartDate, setCartDate] = useState(() => todayISO());
//   const [searchDate, setSearchDate] = useState("");
//   const [saving, setSaving] = useState(false);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const [i, e, s, m, a] = await Promise.all([
//         getItems(),
//         safeGet(getEntrepots),
//         safeGet(getStocks),
//         safeGet(getMouvementsRecents),
//         safeGet(getStockAjustments),
//       ]);
//       setItems(i.data || []);
//       setEntrepots(e.data || []);
//       setStocks(s.data || []);
//       setMouvements(m.data || []);
//       setAjustments(a.data || []);
//       if ((e.data || []).length) setEntrepotId(String(e.data[0].id));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     charger();
//   }, []);

//   const allRows = useMemo(() => {
//     return [
//       ...(mouvements || []).map((m) => ({ ...m, _src: "recent" })),
//       ...(ajustments || []).map((m) => ({ ...m, _src: "ajustment" })),
//     ].filter((m) => Number(m.deleted ?? 0) === 0);
//   }, [mouvements, ajustments]);

//   const groupes = useMemo(() => groupByDate(allRows), [allRows]);

//   const detailsRows = useMemo(() => {
//     if (!detailsDate) return [];
//     return allRows.filter((r) => dateKey(r) === detailsDate);
//   }, [allRows, detailsDate]);

//   const filteredItems = useMemo(() => {
//     const q = search.toLowerCase().trim();
//     if (!q) return items;
//     return items.filter(
//       (it) =>
//         (it.name || "").toLowerCase().includes(q) ||
//         (it.mark || "").toLowerCase().includes(q) ||
//         (it.modele || "").toLowerCase().includes(q)
//     );
//   }, [items, search]);

//   const unitMeta = (item) => ({
//     level: Number(item?.level) || 1,
//     qty_by_card: item?.qty_by_card,
//     qty_by_box: item?.qty_by_box,
//     niveau_1: "Pièce",
//     niveau_2: "Boîte",
//     niveau_3: "Carton",
//   });

//   const totalIn = allRows.filter((r) =>
//     String(r.type || "").toLowerCase().includes("entr")
//   ).length;
//   const totalOut = allRows.length - totalIn;

//   const totalReg = allRows.filter((r) => {
//     const n = String(r.nature || "").toLowerCase();
//     return n.includes("regular") || n.includes("régular");
//   }).length;
//   const totalDep = allRows.filter((r) => {
//     const n = String(r.nature || "").toLowerCase();
//     return n === "usage" || n === "perte" || n.includes("deprec");
//   }).length;

//   const groupesFiltres = useMemo(() => {
//     const q = searchDate.toLowerCase().trim();
//     if (!q) return groupes;
//     return groupes.filter(([date]) => {
//       const iso = date.toLowerCase();
//       const fr = formatDateFr(date).toLowerCase();
//       return iso.includes(q) || fr.includes(q);
//     });
//   }, [groupes, searchDate]);

//   const openAdd = () => {
//     setTab("courant");
//     setSearch("");
//     setSelectedItem(null);
//     setTypeMvt("Sortie");
//     setRaison("Activité courante");
//     setNature("usage");
//     setQty({ carton: 0, boite: 0, piece: 0 });
//     setAddOpen(true);
//   };

//   const selectItem = (item) => {
//     setSelectedItem(item);
//     setQty({ carton: 0, boite: 0, piece: 0 });
//     if (tab === "regularisation") {
//       const targets = {};
//       entrepots.forEach((ent) => {
//         const st = stocks.find(
//           (s) =>
//             Number(s.item_id) === Number(item.id) &&
//             Number(s.entrepot_id) === Number(ent.id)
//         );
//         targets[ent.id] = Number(st?.stock_actual ?? 0);
//       });
//       setRegTargets(targets);
//       setRaison("Régularisation stock");
//     } else if (tab === "depreciation") {
//       setRaison("Usage interne");
//       setNature("usage");
//     } else {
//       setRaison("Activité courante");
//     }
//   };

//   const addToCart = () => {
//     if (!selectedItem) return;
//     if (tab === "regularisation") {
//       const rows = [];
//       const cap_boite = selectedItem.qty_by_box || 0;
//       const cap_unit = selectedItem.qty_by_card || 0;
//       for (const ent of entrepots) {
//         const actuel = Number(
//           stocks.find(
//             (s) =>
//               Number(s.item_id) === Number(selectedItem.id) &&
//               Number(s.entrepot_id) === Number(ent.id)
//           )?.stock_actual ?? 0
//         );
//         const nouveau = Number(regTargets[ent.id] ?? actuel);
//         const delta = nouveau - actuel;
//         if (delta === 0) continue;
//         rows.push({
//           item_id: selectedItem.id,
//           item: selectedItem,
//           designation: designation(selectedItem),
//           entrepot_id: ent.id,
//           entrepot: ent.reference || ent.name || `Entrepôt ${ent.id}`,
//           stock_avant: actuel,
//           stock_apres: nouveau,
//           qty: Math.abs(delta),
//           type: delta > 0 ? "Entrée" : "Sortie",
//           nature: "Regularisation",
//           raison: raison || "Régularisation stock",
//           carton: 0,
//           boite: 0,
//           piece: Math.abs(delta),
//           cap_boite,
//           cap_unit,
//           level: 1,
//           _flux: "ajustment",
//         });
//       }
//       if (!rows.length) {
//         alert("Aucune différence de stock.");
//         return;
//       }
//       setCart((c) => [...c, ...rows]);
//       return;
//     }

//     const level = Number(selectedItem.level) || 1;
//     if (
//       (Number(qty.carton) || 0) <= 0 &&
//       (Number(qty.boite) || 0) <= 0 &&
//       (Number(qty.piece) || 0) <= 0
//     ) {
//       alert("Entrez au moins une quantité.");
//       return;
//     }
//     if (!entrepotId) {
//       alert("Choisissez un entrepôt.");
//       return;
//     }
//     const ent = entrepots.find((e) => String(e.id) === String(entrepotId));
//     const cap_boite = selectedItem.qty_by_box || 0;
//     const cap_unit = selectedItem.qty_by_card || 0;
//     const qtyDecimal = quantitesVersDecimal(level, qty, cap_boite, cap_unit);
//     setCart((c) => [
//       ...c,
//       {
//         item_id: selectedItem.id,
//         item: selectedItem,
//         designation: designation(selectedItem),
//         type: tab === "depreciation" ? "Sortie" : typeMvt,
//         nature:
//           tab === "depreciation"
//             ? nature === "perte"
//               ? "perte"
//               : "usage"
//             : "courant",
//         raison: raison || "Activité courante",
//         depreciation_pct:
//           tab === "depreciation" && nature === "perte" ? 50 : 0,
//         entrepot: ent?.reference || ent?.name || "",
//         entrepot_id: Number(entrepotId),
//         carton: qty.carton || 0,
//         boite: qty.boite || 0,
//         piece: qty.piece || 0,
//         qty: qtyDecimal,
//         cap_boite,
//         cap_unit,
//         level,
//         _flux: tab === "courant" ? "recent" : "ajustment",
//       },
//     ]);
//     setQty({ carton: 0, boite: 0, piece: 0 });
//   };

//   const saveCart = async () => {
//     if (!cart.length) return;
//     setSaving(true);
//     try {
//       for (const row of cart) {
//         const payload = {
//           item_id: row.item_id,
//           entrepot_id: row.entrepot_id,
//           type: row.type,
//           qty: row.qty,
//           nature: row.nature,
//           raison: row.raison,
//           deleted: 0,
//           level: row.level,
//           carton: row.carton,
//           boite: row.boite,
//           piece: row.piece,
//           depreciation_pct: row.depreciation_pct || 0,
//           date: cartDate || todayISO(),
//         };
//         if (row._flux === "recent") await safePost(createMouvementRecent, payload);
//         else await safePost(createAjustement, payload);
//       }
//       setCart([]);
//       setCartDate(todayISO());
//       setCartOpen(false);
//       setAddOpen(false);
//       setSelectedItem(null);
//       await charger();
//       alert("Mouvements enregistrés.");
//     } catch (e) {
//       console.error(e);
//       alert(
//         e?.response?.data?.detail
//           ? JSON.stringify(e.response.data.detail)
//           : "Erreur enregistrement."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const level = Number(selectedItem?.level) || 1;

//   return (
//     <div
//       className="mouvements-shell"
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
//         className="mouvements-page"
//         style={{
//           position: "relative",
//           zIndex: 1,
//           width: "100%",
//           maxWidth: 1100,
//           margin: "0 auto",
//           padding: "0 16px 2rem",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* HEADER */}
//         <div
//           style={{
//             display: "flex",
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
//             }}
//           >
//             <ArrowLeftRight size={28} />
//           </div>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 6,
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
//             <Calendar size={12} /> Stock
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
//             Mouvements
//           </h1>
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               margin: 0,
//               fontSize: "0.9rem",
//             }}
//           >
//             Regroupés par date — détails à la demande
//           </p>
//         </div>

//         {/* INFO + ACTIONS */}
//         <div
//           className="info-band"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
//             gap: "0.75rem",
//             marginBottom: "1.2rem",
//           }}
//         >
//           <InfoCard
//             label="TOTAL"
//             value={allRows.length}
//             color="var(--gradient-start)"
//             icon={<ArrowLeftRight size={18} />}
//           />
//           <InfoCard
//             label="ENTRÉES"
//             value={totalIn}
//             color="#4ade80"
//             icon={<ArrowDownToLine size={18} />}
//           />
//           <InfoCard
//             label="SORTIES"
//             value={totalOut}
//             color="#f87171"
//             icon={<ArrowUpFromLine size={18} />}
//           />
//           <InfoCard
//             label="RÉGULARISATION"
//             value={totalReg}
//             color="#38bdf8"
//             icon={<Scale size={18} />}
//           />
//           <InfoCard
//             label="DÉPRÉCIATION"
//             value={totalDep}
//             color="#a78bfa"
//             icon={<AlertTriangle size={18} />}
//           />
//         </div>

//         {/* Recherche par date */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             padding: "0.85rem 1.1rem",
//             borderRadius: 18,
//             background: "var(--card-bg)",
//             border: "1px solid var(--glass-border)",
//             marginBottom: "1.2rem",
//             boxShadow: "0 8px 24px rgba(0,0,0,.08)",
//           }}
//         >
//           <Search size={18} color="var(--gradient-start)" />
//           <input
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//             placeholder="Rechercher une date (ex: août, 2026, 23)…"
//             style={{
//               flex: 1,
//               border: "none",
//               outline: "none",
//               background: "none",
//               color: "var(--text)",
//               fontSize: "0.95rem",
//               minWidth: 0,
//             }}
//           />
//           {searchDate && (
//             <button
//               type="button"
//               onClick={() => setSearchDate("")}
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 color: "var(--text-secondary)",
//                 display: "flex",
//                 padding: 0,
//               }}
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: 10,
//             alignItems: "center",
//             justifyContent: "flex-end",
//             flexWrap: "wrap",
//             marginBottom: "1.35rem",
//           }}
//         >
//           <button
//             type="button"
//             onClick={() => setCartOpen(true)}
//             style={{
//               position: "relative",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "0.7rem 1rem",
//               borderRadius: 14,
//               border: "1px solid var(--glass-border)",
//               background: "var(--card-bg)",
//               color: "var(--text)",
//               fontWeight: 700,
//               cursor: "pointer",
//             }}
//           >
//             <ShoppingCart size={17} color="var(--gradient-start)" />
//             Panier
//             {cart.length > 0 && (
//               <span
//                 style={{
//                   position: "absolute",
//                   top: -6,
//                   right: -6,
//                   minWidth: 18,
//                   height: 18,
//                   borderRadius: 999,
//                   background: "#ef4444",
//                   color: "#fff",
//                   fontSize: 10,
//                   fontWeight: 800,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   padding: "0 4px",
//                 }}
//               >
//                 {cart.length}
//               </span>
//             )}
//           </button>
//           <button type="button" onClick={openAdd} style={btnPrimary}>
//             <Plus size={18} /> Ajouter
//           </button>
//         </div>

//         {/* LISTE PAR DATE */}
//         {loading ? (
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               textAlign: "center",
//               padding: "3rem",
//             }}
//           >
//             Chargement…
//           </p>
//         ) : groupesFiltres.length === 0 ? (
//           <div
//             style={{
//               borderRadius: 22,
//               border: "1px solid var(--glass-border)",
//               background: "var(--card-bg)",
//               padding: "3rem 1.5rem",
//               textAlign: "center",
//             }}
//           >
//             <Package
//               size={40}
//               color="var(--gradient-start)"
//               style={{ opacity: 0.7, marginBottom: 12 }}
//             />
//             <p style={{ color: "var(--text-secondary)", margin: 0 }}>
//               Aucun mouvement enregistré.
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {groupesFiltres.map(([date, rows]) => (
//               <DateCard
//                 key={date}
//                 date={date}
//                 dateLabel={formatDateFr(date)}
//                 rows={rows}
//                 onVisualiser={() => setDetailsDate(date)}
//                 onDetails={() =>
//                   navigate(`/details/jour/${encodeURIComponent(date)}`)
//                 }
//               />
//             ))}
//           </div>
//         )}

//         {/* MODAL DÉTAILS DATE */}
//         {detailsDate && (
//           <div
//             onClick={() => setDetailsDate(null)}
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 2000,
//               background: "rgba(0,0,0,.55)",
//               backdropFilter: "blur(6px)",
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
//                 maxWidth: 560,
//                 maxHeight: "88vh",
//                 overflow: "auto",
//                 borderRadius: 24,
//                 background: "var(--card-bg)",
//                 border: "1px solid var(--glass-border)",
//                 padding: "1.2rem",
//                 boxShadow: "0 24px 60px rgba(0,0,0,.35)",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: 14,
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
//                       marginTop: 2,
//                     }}
//                   >
//                     {detailsDate}
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setDetailsDate(null)}
//                   style={{
//                     border: "1px solid var(--glass-border)",
//                     background: "var(--card-bg)",
//                     borderRadius: "50%",
//                     width: 34,
//                     height: 34,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     color: "var(--text)",
//                   }}
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                 {detailsRows.map((m, idx) => {
//                   const it = items.find(
//                     (x) => Number(x.id) === Number(m.item_id)
//                   );
//                   const labelQty = it
//                     ? convertirQuantite(m.qty, unitMeta(it))
//                     : m.qty;
//                   return (
//                     <div
//                       key={idx}
//                       style={{
//                         display: "flex",
//                         gap: 10,
//                         alignItems: "center",
//                         padding: "0.7rem 0.85rem",
//                         borderRadius: 14,
//                         background: "var(--glass-bg)",
//                         border: "1px solid var(--glass-border)",
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       <Thumb
//                         item={it}
//                         size={48}
//                         clickable
//                         onClick={() =>
//                           it?.id && navigate(`/details/article/${it.id}`)
//                         }
//                       />
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div
//                           style={{
//                             fontWeight: 700,
//                             fontSize: "0.88rem",
//                             color: "var(--text)",
//                           }}
//                         >
//                           {it ? designation(it) : `Article #${m.item_id}`}
//                         </div>
//                         <div
//                           style={{
//                             fontSize: "0.72rem",
//                             color: "var(--text-secondary)",
//                           }}
//                         >
//                           {m.type} · {m.nature || m._src} · {labelQty}
//                           {m.raison ? ` · ${m.raison}` : ""}
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 8,
//                           flexShrink: 0,
//                         }}
//                       >
//                         {String(m.type || "").includes("Entr") ? (
//                           <ArrowDownToLine size={16} color="#4ade80" />
//                         ) : (
//                           <ArrowUpFromLine size={16} color="#f87171" />
//                         )}
//                         {it?.id && (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               navigate(`/details/article/${it.id}`)
//                             }
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 4,
//                               padding: "6px 10px",
//                               borderRadius: 999,
//                               border: "1px solid var(--glass-border)",
//                               background: "var(--card-bg)",
//                               color: "var(--gradient-start)",
//                               fontSize: "0.72rem",
//                               fontWeight: 700,
//                               cursor: "pointer",
//                             }}
//                           >
//                             <ExternalLink size={12} />
//                             Détails
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MODAL AJOUTER */}
//         {addOpen && (
//           <div
//             onClick={() => !selectedItem && setAddOpen(false)}
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 2000,
//               background: "rgba(0,0,0,.55)",
//               backdropFilter: "blur(6px)",
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
//                 maxWidth: 560,
//                 maxHeight: "92vh",
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
//                   alignItems: "center",
//                   marginBottom: 12,
//                 }}
//               >
//                 <h3
//                   style={{
//                     margin: 0,
//                     fontFamily: "Syne, sans-serif",
//                     color: "var(--text)",
//                   }}
//                 >
//                   {selectedItem ? "Paramètres" : "Choisir un article"}
//                 </h3>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   {cart.length > 0 && (
//                     <button
//                       type="button"
//                       onClick={() => setCartOpen(true)}
//                       style={{
//                         position: "relative",
//                         border: "1px solid var(--glass-border)",
//                         background: "var(--glass-bg)",
//                         borderRadius: 10,
//                         padding: "6px 10px",
//                         cursor: "pointer",
//                         color: "var(--text)",
//                       }}
//                     >
//                       <ShoppingCart size={16} />
//                       <span
//                         style={{
//                           position: "absolute",
//                           top: -4,
//                           right: -4,
//                           minWidth: 16,
//                           height: 16,
//                           borderRadius: 999,
//                           background: "#ef4444",
//                           color: "#fff",
//                           fontSize: 10,
//                           fontWeight: 800,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         {cart.length}
//                       </span>
//                     </button>
//                   )}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAddOpen(false);
//                       setSelectedItem(null);
//                     }}
//                     style={{
//                       border: "1px solid var(--glass-border)",
//                       background: "var(--card-bg)",
//                       borderRadius: "50%",
//                       width: 34,
//                       height: 34,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       color: "var(--text)",
//                     }}
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   gap: 6,
//                   marginBottom: 12,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 {[
//                   { id: "courant", label: "Courant" },
//                   { id: "regularisation", label: "Régularisation" },
//                   { id: "depreciation", label: "Usage / Perte" },
//                 ].map((t) => (
//                   <button
//                     key={t.id}
//                     type="button"
//                     onClick={() => {
//                       setTab(t.id);
//                       setSelectedItem(null);
//                     }}
//                     style={{
//                       padding: "0.45rem 0.85rem",
//                       borderRadius: 10,
//                       fontSize: "0.78rem",
//                       fontWeight: 700,
//                       cursor: "pointer",
//                       border:
//                         tab === t.id
//                           ? "1px solid transparent"
//                           : "1px solid var(--glass-border)",
//                       background:
//                         tab === t.id
//                           ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                           : "var(--glass-bg)",
//                       color: tab === t.id ? "#fff" : "var(--text)",
//                     }}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//               </div>

//               {!selectedItem ? (
//                 <>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 8,
//                       padding: "0.7rem 0.9rem",
//                       borderRadius: 12,
//                       border: "1px solid var(--glass-border)",
//                       background: "var(--glass-bg)",
//                       marginBottom: 12,
//                     }}
//                   >
//                     <Search size={16} color="var(--gradient-start)" />
//                     <input
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       placeholder="Nom, marque, modèle…"
//                       style={{
//                         flex: 1,
//                         border: "none",
//                         outline: "none",
//                         background: "transparent",
//                         color: "var(--text)",
//                       }}
//                     />
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 8,
//                       maxHeight: 360,
//                       overflowY: "auto",
//                     }}
//                   >
//                     {filteredItems.map((item) => (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => selectItem(item)}
//                         style={{
//                           display: "flex",
//                           gap: 10,
//                           alignItems: "center",
//                           textAlign: "left",
//                           padding: 10,
//                           borderRadius: 14,
//                           border: "1px solid var(--glass-border)",
//                           background: "var(--glass-bg)",
//                           cursor: "pointer",
//                           color: "var(--text)",
//                         }}
//                       >
//                         <Thumb item={item} size={48} />
//                         <div style={{ minWidth: 0 }}>
//                           <div
//                             style={{ fontWeight: 700, fontSize: "0.88rem" }}
//                           >
//                             {item.name}
//                           </div>
//                           <div
//                             style={{
//                               fontSize: "0.72rem",
//                               color: "var(--text-secondary)",
//                             }}
//                           >
//                             {[item.mark, item.modele]
//                               .filter(Boolean)
//                               .join(" · ") || "—"}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedItem(null)}
//                     style={{
//                       border: "none",
//                       background: "none",
//                       color: "var(--gradient-start)",
//                       fontSize: "0.8rem",
//                       fontWeight: 700,
//                       cursor: "pointer",
//                       marginBottom: 10,
//                       padding: 0,
//                     }}
//                   >
//                     ← Changer d&apos;article
//                   </button>
//                   <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
//                     <Thumb item={selectedItem} size={72} />
//                     <div>
//                       <div
//                         style={{ fontWeight: 800, color: "var(--text)" }}
//                       >
//                         {selectedItem.name}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "0.8rem",
//                           color: "var(--text-secondary)",
//                         }}
//                       >
//                         {[selectedItem.mark, selectedItem.modele]
//                           .filter(Boolean)
//                           .join(" · ") || "—"}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "0.72rem",
//                           color: "var(--gradient-start)",
//                           fontWeight: 700,
//                           marginTop: 4,
//                         }}
//                       >
//                         Niveau {level}
//                       </div>
//                     </div>
//                   </div>

//                   {tab === "courant" && (
//                     <div style={{ marginBottom: 10 }}>
//                       <label style={lbl}>Type</label>
//                       <div style={{ display: "flex", gap: 8 }}>
//                         {["Entrée", "Sortie"].map((t) => (
//                           <button
//                             key={t}
//                             type="button"
//                             onClick={() => setTypeMvt(t)}
//                             style={{
//                               flex: 1,
//                               padding: "0.55rem",
//                               borderRadius: 10,
//                               fontWeight: 700,
//                               cursor: "pointer",
//                               border:
//                                 typeMvt === t
//                                   ? "1px solid transparent"
//                                   : "1px solid var(--glass-border)",
//                               background:
//                                 typeMvt === t
//                                   ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                                   : "var(--glass-bg)",
//                               color: typeMvt === t ? "#fff" : "var(--text)",
//                             }}
//                           >
//                             {t}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {tab === "depreciation" && (
//                     <div style={{ marginBottom: 10 }}>
//                       <label style={lbl}>Nature</label>
//                       <div style={{ display: "flex", gap: 8 }}>
//                         {[
//                           { id: "usage", label: "Usage" },
//                           { id: "perte", label: "Perte (−50%)" },
//                         ].map((n) => (
//                           <button
//                             key={n.id}
//                             type="button"
//                             onClick={() => {
//                               setNature(n.id);
//                               setRaison(
//                                 n.id === "perte"
//                                   ? "Perte — dépréciation 50 %"
//                                   : "Usage interne"
//                               );
//                             }}
//                             style={{
//                               flex: 1,
//                               padding: "0.55rem",
//                               borderRadius: 10,
//                               fontWeight: 700,
//                               cursor: "pointer",
//                               border:
//                                 nature === n.id
//                                   ? "1px solid transparent"
//                                   : "1px solid var(--glass-border)",
//                               background:
//                                 nature === n.id
//                                   ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                                   : "var(--glass-bg)",
//                               color: nature === n.id ? "#fff" : "var(--text)",
//                             }}
//                           >
//                             {n.label}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {tab !== "regularisation" && (
//                     <div style={{ marginBottom: 10 }}>
//                       <label style={lbl}>Entrepôt</label>
//                       <select
//                         value={entrepotId}
//                         onChange={(e) => setEntrepotId(e.target.value)}
//                         style={inp}
//                       >
//                         {entrepots.map((e) => (
//                           <option key={e.id} value={e.id}>
//                             {e.reference || e.name || `Entrepôt ${e.id}`}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   {tab === "regularisation" ? (
//                     <div style={{ marginBottom: 10 }}>
//                       <label style={lbl}>Stock cible / entrepôt</label>
//                       {entrepots.map((ent) => {
//                         const actuel = Number(
//                           stocks.find(
//                             (s) =>
//                               Number(s.item_id) === Number(selectedItem.id) &&
//                               Number(s.entrepot_id) === Number(ent.id)
//                           )?.stock_actual ?? 0
//                         );
//                         return (
//                           <div
//                             key={ent.id}
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 8,
//                               marginBottom: 6,
//                               padding: "0.45rem 0.6rem",
//                               borderRadius: 10,
//                               background: "var(--glass-bg)",
//                               border: "1px solid var(--glass-border)",
//                             }}
//                           >
//                             <div style={{ flex: 1, fontSize: "0.8rem" }}>
//                               <strong>
//                                 {ent.reference || ent.name}
//                               </strong>
//                               <div
//                                 style={{
//                                   fontSize: "0.7rem",
//                                   color: "var(--text-secondary)",
//                                 }}
//                               >
//                                 Actuel : {actuel}
//                               </div>
//                             </div>
//                             <input
//                               type="number"
//                               min={0}
//                               value={regTargets[ent.id] ?? actuel}
//                               onChange={(e) =>
//                                 setRegTargets((t) => ({
//                                   ...t,
//                                   [ent.id]: e.target.value,
//                                 }))
//                               }
//                               style={{
//                                 ...inp,
//                                 width: 90,
//                                 margin: 0,
//                                 padding: "0.45rem 0.5rem",
//                               }}
//                             />
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ) : (
//                     <div style={{ marginBottom: 10 }}>
//                       <label style={lbl}>Quantités</label>
//                       {level >= 2 && (
//                         <div style={{ marginBottom: 6 }}>
//                           <span
//                             style={{
//                               fontSize: "0.72rem",
//                               color: "var(--text-secondary)",
//                             }}
//                           >
//                             Carton
//                           </span>
//                           <input
//                             type="number"
//                             min={0}
//                             value={qty.carton}
//                             onChange={(e) =>
//                               setQty((q) => ({ ...q, carton: e.target.value }))
//                             }
//                             style={inp}
//                           />
//                         </div>
//                       )}
//                       {level === 3 && (
//                         <div style={{ marginBottom: 6 }}>
//                           <span
//                             style={{
//                               fontSize: "0.72rem",
//                               color: "var(--text-secondary)",
//                             }}
//                           >
//                             Boîte
//                           </span>
//                           <input
//                             type="number"
//                             min={0}
//                             value={qty.boite}
//                             onChange={(e) =>
//                               setQty((q) => ({ ...q, boite: e.target.value }))
//                             }
//                             style={inp}
//                           />
//                         </div>
//                       )}
//                       <div>
//                         <span
//                           style={{
//                             fontSize: "0.72rem",
//                             color: "var(--text-secondary)",
//                           }}
//                         >
//                           Pièce
//                         </span>
//                         <input
//                           type="number"
//                           min={0}
//                           value={qty.piece}
//                           onChange={(e) =>
//                             setQty((q) => ({ ...q, piece: e.target.value }))
//                           }
//                           style={inp}
//                         />
//                       </div>
//                     </div>
//                   )}

//                   <div style={{ marginBottom: 12 }}>
//                     <label style={lbl}>Raison</label>
//                     <input
//                       value={raison}
//                       onChange={(e) => setRaison(e.target.value)}
//                       style={inp}
//                     />
//                   </div>

//                   <button
//                     type="button"
//                     onClick={addToCart}
//                     style={{
//                       width: "100%",
//                       padding: "0.85rem",
//                       borderRadius: 12,
//                       border: "none",
//                       background:
//                         "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//                       color: "#fff",
//                       fontWeight: 800,
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Plus
//                       size={16}
//                       style={{ verticalAlign: "middle", marginRight: 6 }}
//                     />
//                     Ajouter au panier
//                   </button>
//                   <p
//                     style={{
//                       textAlign: "center",
//                       fontSize: "0.7rem",
//                       color: "var(--text-secondary)",
//                       marginTop: 8,
//                     }}
//                   >
//                     Reste ouvert pour enchaîner · utilisez le panier pour
//                     enregistrer
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* PANIER */}
//         {cartOpen && (
//           <div
//             onClick={() => setCartOpen(false)}
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 2100,
//               background: "rgba(0,0,0,.6)",
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
//                 maxWidth: 480,
//                 maxHeight: "90vh",
//                 overflow: "auto",
//                 borderRadius: 24,
//                 background: "var(--card-bg)",
//                 border: "1px solid var(--glass-border)",
//                 padding: "1.15rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginBottom: 12,
//                 }}
//               >
//                 <h3
//                   style={{
//                     margin: 0,
//                     fontFamily: "Syne, sans-serif",
//                     color: "var(--text)",
//                   }}
//                 >
//                   Panier ({cart.length})
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => setCartOpen(false)}
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

//               <div
//                 style={{
//                   marginBottom: 14,
//                   padding: "0.75rem 0.9rem",
//                   borderRadius: 14,
//                   border: "1px solid var(--glass-border)",
//                   background: "var(--glass-bg)",
//                 }}
//               >
//                 <label style={lbl}>Date du mouvement</label>
//                 <input
//                   type="date"
//                   value={cartDate}
//                   onChange={(e) =>
//                     setCartDate(e.target.value || todayISO())
//                   }
//                   style={{
//                     width: "100%",
//                     padding: "0.65rem 0.8rem",
//                     borderRadius: 10,
//                     border: "1px solid var(--glass-border)",
//                     background: "var(--card-bg)",
//                     color: "var(--text)",
//                     fontSize: "0.95rem",
//                     fontWeight: 600,
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 <p
//                   style={{
//                     margin: "6px 0 0",
//                     fontSize: "0.72rem",
//                     color: "var(--text-secondary)",
//                   }}
//                 >
//                   Par défaut aujourd&apos;hui — modifiable pour un mouvement
//                   passé.
//                 </p>
//               </div>

//               {cart.length === 0 ? (
//                 <p style={{ color: "var(--text-secondary)" }}>Vide.</p>
//               ) : (
//                 cart.map((row, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       display: "flex",
//                       gap: 10,
//                       alignItems: "center",
//                       padding: "0.6rem 0",
//                       borderBottom: "1px solid var(--glass-border)",
//                     }}
//                   >
//                     <Thumb item={row.item} size={48} />
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div
//                         style={{ fontWeight: 700, fontSize: "0.85rem" }}
//                       >
//                         {row.designation}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "0.7rem",
//                           color: "var(--text-secondary)",
//                         }}
//                       >
//                         {row.type} · {row.nature} ·{" "}
//                         {convertirQuantite(row.qty, unitMeta(row.item))} ·{" "}
//                         {row.entrepot}
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setCart((c) => c.filter((_, i) => i !== idx))
//                       }
//                       style={{
//                         border: "none",
//                         background: "rgba(239,68,68,.1)",
//                         color: "#f87171",
//                         borderRadius: 8,
//                         padding: "4px 8px",
//                         cursor: "pointer",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Retirer
//                     </button>
//                   </div>
//                 ))
//               )}

//               {cart.length > 0 && (
//                 <button
//                   type="button"
//                   disabled={saving}
//                   onClick={saveCart}
//                   style={{
//                     width: "100%",
//                     marginTop: 12,
//                     padding: "0.85rem",
//                     borderRadius: 12,
//                     border: "none",
//                     background:
//                       "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//                     color: "#fff",
//                     fontWeight: 800,
//                     cursor: saving ? "wait" : "pointer",
//                   }}
//                 >
//                   {saving ? "Enregistrement…" : "Enregistrer le panier"}
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         <Footer />

//         <style>{`
//           @media (max-width: 1100px) {
//             .info-band {
//               grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
//             }
//           }
//           @media (max-width: 720px) {
//             .info-band {
//               grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
//             }
//             .mouvements-page {
//               padding: 0 12px 1.5rem !important;
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }








/**
 * Mouvements — même identité visuelle que Categories / Articles / Dashboard
 * Logique métier conservée (groupement date, panier, régularisation, etc.)
 * Stock réel par entrepôt = stock_actual + mouvements + ajustements (deleted=0)
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Package,
  X,
  ShoppingCart,
  Eye,
  ExternalLink,
  ArrowDownToLine,
  ArrowUpFromLine,
  Calendar,
  Warehouse,
  Scale,
  AlertTriangle,
  ArrowLeftRight,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const {
  getItems,
  getEntrepots,
  getStocks,
  getMouvementsRecents,
  getStockAjustments,
  createMouvementRecent,
  createAjustement,
} = api;

const safeGet = (fn) =>
  typeof fn === "function"
    ? fn().catch(() => ({ data: [] }))
    : Promise.resolve({ data: [] });

const safePost = (fn, payload) =>
  typeof fn === "function"
    ? fn(payload)
    : Promise.reject(new Error("API manquante"));

/* ========== IMAGE ========== */
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

/* ========== QUANTITÉS ========== */
function convertirQuantite(qte, stock) {
  const level = Number(stock?.level) || 1;
  const qty_card = Number(stock?.qty_by_card) || 0;
  const qty_box = Number(stock?.qty_by_box) || 0;
  const nom_carton = stock?.niveau_3 || "Carton";
  const nom_boite = stock?.niveau_2 || "Boîte";
  const nom_piece = stock?.niveau_1 || "Pièce";
  qte = Number(qte) || 0;

  if (level === 1) return `${Math.round(qte)} ${nom_piece}`;
  if (level === 2) {
    const capacite = qty_box || 1;
    const cartons = Math.trunc(qte);
    const pieces = Math.round((qte - cartons) * capacite);
    const texte = [];
    if (cartons > 0) texte.push(`${cartons} ${nom_carton}`);
    if (pieces > 0) texte.push(`${pieces} ${nom_piece}`);
    return texte.join(" • ") || `0 ${nom_piece}`;
  }
  if (level === 3) {
    const boites_par_carton = qty_card || 1;
    const pieces_par_boite = qty_box || 1;
    const cartons = Math.trunc(qte);
    const total_boites = (qte - cartons) * boites_par_carton;
    const boites = Math.trunc(total_boites);
    const pieces = Math.round((total_boites - boites) * pieces_par_boite);
    const texte = [];
    if (cartons > 0) texte.push(`${cartons} ${nom_carton}`);
    if (boites > 0) texte.push(`${boites} ${nom_boite}`);
    if (pieces > 0) texte.push(`${pieces} ${nom_piece}`);
    return texte.join(" • ") || `0 ${nom_piece}`;
  }
  return `${qte}`;
}

function quantitesVersDecimal(
  level,
  { carton = 0, boite = 0, piece = 0 },
  cap_boite,
  cap_unit
) {
  level = Number(level) || 1;
  carton = Number(carton) || 0;
  boite = Number(boite) || 0;
  piece = Number(piece) || 0;
  const cBoite = Number(cap_boite) || 0;
  const cUnit = Number(cap_unit) || 0;
  if (level === 1) return piece;
  if (level === 2) return carton + piece / (cBoite || 1);
  const ppc = (cBoite || 1) * (cUnit || 1) || 1;
  return (carton * ppc + boite * (cUnit || 1) + piece) / ppc;
}

/* ========== STOCK RÉEL (même logique Articles) ========== */
/**
 * Stock d'UN entrepôt pour UN article :
 * stock_actual + Entrées − Sorties (mouvements récents + ajustements, deleted = 0)
 */
function calculerStockEntrepot(
  itemId,
  entrepotId,
  stocks,
  mouvements,
  stock_ajustments
) {
  const itemIdNum = Number(itemId);
  const entrepotIdNum = Number(entrepotId);

  const stock = (stocks || []).find(
    (s) =>
      Number(s.item_id) === itemIdNum &&
      Number(s.entrepot_id) === entrepotIdNum &&
      Number(s.deleted ?? 0) === 0
  );
  let q = Number(stock?.stock_actual ?? 0);

  (mouvements || [])
    .filter(
      (m) =>
        Number(m.item_id) === itemIdNum &&
        Number(m.entrepot_id) === entrepotIdNum &&
        Number(m.deleted ?? 0) === 0
    )
    .forEach((m) => {
      const qty = Number(m.qty ?? 0);
      if (m.type === "Entrée") q += qty;
      else if (m.type === "Sortie") q -= qty;
    });

  (stock_ajustments || [])
    .filter(
      (a) =>
        Number(a.item_id) === itemIdNum &&
        Number(a.entrepot_id) === entrepotIdNum &&
        Number(a.deleted ?? 0) === 0
    )
    .forEach((a) => {
      const qty = Number(a.qty ?? 0);
      if (a.type === "Entrée") q += qty;
      else if (a.type === "Sortie") q -= qty;
    });

  return q;
}

/** Stock total tous entrepôts (cohérent avec Articles) */
function calculerStockTotal(itemId, stocks, mouvements, stock_ajustments) {
  const entrepots = new Set();
  const itemIdNum = Number(itemId);

  (stocks || [])
    .filter(
      (s) => Number(s.item_id) === itemIdNum && Number(s.deleted ?? 0) === 0
    )
    .forEach((s) => entrepots.add(Number(s.entrepot_id)));
  (mouvements || [])
    .filter(
      (m) => Number(m.item_id) === itemIdNum && Number(m.deleted ?? 0) === 0
    )
    .forEach((m) => entrepots.add(Number(m.entrepot_id)));
  (stock_ajustments || [])
    .filter(
      (a) => Number(a.item_id) === itemIdNum && Number(a.deleted ?? 0) === 0
    )
    .forEach((a) => entrepots.add(Number(a.entrepot_id)));

  let total = 0;
  entrepots.forEach((eid) => {
    total += calculerStockEntrepot(
      itemIdNum,
      eid,
      stocks,
      mouvements,
      stock_ajustments
    );
  });
  return total;
}

/* ========== DATES ========== */
function dateKey(row) {
  return (
    (row.date || row.created_at || row.update_at || "").toString().slice(0, 10) ||
    "—"
  );
}

function formatDateFr(iso) {
  if (!iso || iso === "—") return "—";
  const s = String(iso).slice(0, 10);
  const parts = s.split("-");
  if (parts.length !== 3) return s;
  const [y, m, d] = parts;
  const mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const mi = parseInt(m, 10) - 1;
  if (mi < 0 || mi > 11) return s;
  return `${parseInt(d, 10)} ${mois[mi]} ${y}`;
}

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
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

/* ========== STYLES ========== */
const lbl = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "0.4rem",
};

const inp = {
  width: "100%",
  padding: "0.7rem 0.9rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--text)",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};

const btnPrimary = {
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
};

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

function Thumb({ item, size = 56, onClick, clickable = false }) {
  const src = getArticleImageSrc(item);
  return (
    <div
      onClick={clickable && item?.id && onClick ? onClick : undefined}
      role={clickable && item?.id ? "button" : undefined}
      style={{
        cursor: clickable && item?.id ? "pointer" : undefined,
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
        <Package size={Math.max(16, size * 0.35)} color="var(--gradient-start)" />
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

export default function Mouvements() {
  const navigate = useNavigate();
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [items, setItems] = useState([]);
  const [entrepots, setEntrepots] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [mouvements, setMouvements] = useState([]);
  const [ajustments, setAjustments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [detailsDate, setDetailsDate] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [tab, setTab] = useState("courant");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [typeMvt, setTypeMvt] = useState("Sortie");
  const [entrepotId, setEntrepotId] = useState("");
  const [raison, setRaison] = useState("");
  const [nature, setNature] = useState("usage");
  const [qty, setQty] = useState({ carton: 0, boite: 0, piece: 0 });
  const [regTargets, setRegTargets] = useState({});
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartDate, setCartDate] = useState(() => todayISO());
  const [searchDate, setSearchDate] = useState("");
  const [saving, setSaving] = useState(false);

  const charger = async () => {
    setLoading(true);
    try {
      const [i, e, s, m, a] = await Promise.all([
        getItems(),
        safeGet(getEntrepots),
        safeGet(getStocks),
        safeGet(getMouvementsRecents),
        safeGet(getStockAjustments),
      ]);
      setItems(i.data || []);
      setEntrepots(e.data || []);
      setStocks(s.data || []);
      setMouvements(m.data || []);
      setAjustments(a.data || []);
      if ((e.data || []).length) setEntrepotId(String(e.data[0].id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const allRows = useMemo(() => {
    return [
      ...(mouvements || []).map((m) => ({ ...m, _src: "recent" })),
      ...(ajustments || []).map((m) => ({ ...m, _src: "ajustment" })),
    ].filter((m) => Number(m.deleted ?? 0) === 0);
  }, [mouvements, ajustments]);

  const groupes = useMemo(() => groupByDate(allRows), [allRows]);

  const detailsRows = useMemo(() => {
    if (!detailsDate) return [];
    return allRows.filter((r) => dateKey(r) === detailsDate);
  }, [allRows, detailsDate]);

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (it) =>
        (it.name || "").toLowerCase().includes(q) ||
        (it.mark || "").toLowerCase().includes(q) ||
        (it.modele || "").toLowerCase().includes(q)
    );
  }, [items, search]);

  const unitMeta = (item) => ({
    level: Number(item?.level) || 1,
    qty_by_card: item?.qty_by_card,
    qty_by_box: item?.qty_by_box,
    niveau_1: "Pièce",
    niveau_2: "Boîte",
    niveau_3: "Carton",
  });

  /** Stock réel pour un article dans un entrepôt (utilisé partout en régularisation) */
  const stockReelEntrepot = (itemId, entrepotId) =>
    calculerStockEntrepot(
      itemId,
      entrepotId,
      stocks,
      mouvements,
      ajustments
    );

  const totalIn = allRows.filter((r) =>
    String(r.type || "").toLowerCase().includes("entr")
  ).length;
  const totalOut = allRows.length - totalIn;

  const totalReg = allRows.filter((r) => {
    const n = String(r.nature || "").toLowerCase();
    return n.includes("regular") || n.includes("régular");
  }).length;
  const totalDep = allRows.filter((r) => {
    const n = String(r.nature || "").toLowerCase();
    return n === "usage" || n === "perte" || n.includes("deprec");
  }).length;

  const groupesFiltres = useMemo(() => {
    const q = searchDate.toLowerCase().trim();
    if (!q) return groupes;
    return groupes.filter(([date]) => {
      const iso = date.toLowerCase();
      const fr = formatDateFr(date).toLowerCase();
      return iso.includes(q) || fr.includes(q);
    });
  }, [groupes, searchDate]);

  const openAdd = () => {
    setTab("courant");
    setSearch("");
    setSelectedItem(null);
    setTypeMvt("Sortie");
    setRaison("Activité courante");
    setNature("usage");
    setQty({ carton: 0, boite: 0, piece: 0 });
    setAddOpen(true);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setQty({ carton: 0, boite: 0, piece: 0 });
    if (tab === "regularisation") {
      const targets = {};
      entrepots.forEach((ent) => {
        // Stock RÉEL (base + mouvements + ajustements)
        targets[ent.id] = stockReelEntrepot(item.id, ent.id);
      });
      setRegTargets(targets);
      setRaison("Régularisation stock");
    } else if (tab === "depreciation") {
      setRaison("Usage interne");
      setNature("usage");
    } else {
      setRaison("Activité courante");
    }
  };

  const addToCart = () => {
    if (!selectedItem) return;

    if (tab === "regularisation") {
      const rows = [];
      const cap_boite = selectedItem.qty_by_box || 0;
      const cap_unit = selectedItem.qty_by_card || 0;
      for (const ent of entrepots) {
        const actuel = stockReelEntrepot(selectedItem.id, ent.id);
        const nouveau = Number(regTargets[ent.id] ?? actuel);
        const delta = nouveau - actuel;
        if (delta === 0) continue;
        rows.push({
          item_id: selectedItem.id,
          item: selectedItem,
          designation: designation(selectedItem),
          entrepot_id: ent.id,
          entrepot: ent.reference || ent.name || `Entrepôt ${ent.id}`,
          stock_avant: actuel,
          stock_apres: nouveau,
          qty: Math.abs(delta),
          type: delta > 0 ? "Entrée" : "Sortie",
          nature: "Regularisation",
          raison: raison || "Régularisation stock",
          carton: 0,
          boite: 0,
          piece: Math.abs(delta),
          cap_boite,
          cap_unit,
          level: 1,
          _flux: "ajustment",
        });
      }
      if (!rows.length) {
        alert("Aucune différence de stock.");
        return;
      }
      setCart((c) => [...c, ...rows]);
      return;
    }

    const level = Number(selectedItem.level) || 1;
    if (
      (Number(qty.carton) || 0) <= 0 &&
      (Number(qty.boite) || 0) <= 0 &&
      (Number(qty.piece) || 0) <= 0
    ) {
      alert("Entrez au moins une quantité.");
      return;
    }
    if (!entrepotId) {
      alert("Choisissez un entrepôt.");
      return;
    }
    const ent = entrepots.find((e) => String(e.id) === String(entrepotId));
    const cap_boite = selectedItem.qty_by_box || 0;
    const cap_unit = selectedItem.qty_by_card || 0;
    const qtyDecimal = quantitesVersDecimal(level, qty, cap_boite, cap_unit);
    setCart((c) => [
      ...c,
      {
        item_id: selectedItem.id,
        item: selectedItem,
        designation: designation(selectedItem),
        type: tab === "depreciation" ? "Sortie" : typeMvt,
        nature:
          tab === "depreciation"
            ? nature === "perte"
              ? "perte"
              : "usage"
            : "courant",
        raison: raison || "Activité courante",
        depreciation_pct:
          tab === "depreciation" && nature === "perte" ? 50 : 0,
        entrepot: ent?.reference || ent?.name || "",
        entrepot_id: Number(entrepotId),
        carton: qty.carton || 0,
        boite: qty.boite || 0,
        piece: qty.piece || 0,
        qty: qtyDecimal,
        cap_boite,
        cap_unit,
        level,
        _flux: tab === "courant" ? "recent" : "ajustment",
      },
    ]);
    setQty({ carton: 0, boite: 0, piece: 0 });
  };

  const saveCart = async () => {
    if (!cart.length) return;
    setSaving(true);
    try {
      for (const row of cart) {
        const payload = {
          item_id: row.item_id,
          entrepot_id: row.entrepot_id,
          type: row.type,
          qty: row.qty,
          nature: row.nature,
          raison: row.raison,
          deleted: 0,
          level: row.level,
          carton: row.carton,
          boite: row.boite,
          piece: row.piece,
          depreciation_pct: row.depreciation_pct || 0,
          date: cartDate || todayISO(),
        };
        if (row._flux === "recent") await safePost(createMouvementRecent, payload);
        else await safePost(createAjustement, payload);
      }
      setCart([]);
      setCartDate(todayISO());
      setCartOpen(false);
      setAddOpen(false);
      setSelectedItem(null);
      await charger();
      alert("Mouvements enregistrés.");
    } catch (e) {
      console.error(e);
      alert(
        e?.response?.data?.detail
          ? JSON.stringify(e.response.data.detail)
          : "Erreur enregistrement."
      );
    } finally {
      setSaving(false);
    }
  };

  const level = Number(selectedItem?.level) || 1;

  return (
    <div
      className="mouvements-shell"
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
        className="mouvements-page"
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
        {/* HEADER */}
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
            <ArrowLeftRight size={30} />
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
            <Warehouse size={12} /> Flux stock
          </div>
          <div>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
                fontWeight: 900,
                margin: 0,
                lineHeight: 1.15,
                background:
                  "linear-gradient(135deg, var(--text), var(--gradient-start))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mouvements
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                color: "var(--text-secondary)",
                fontSize: "0.92rem",
                maxWidth: 520,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.55,
              }}
            >
              Entrées, sorties, régularisations et dépréciations — groupés par
              date.
            </p>
          </div>
        </div>

        {/* INFO BAND */}
        <div
          className="info-band"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.4rem",
          }}
        >
          <InfoCard
            label="TOTAL"
            value={allRows.length}
            color="var(--gradient-start)"
            icon={<Package size={18} />}
          />
          <InfoCard
            label="ENTRÉES"
            value={totalIn}
            color="#4ade80"
            icon={<ArrowDownToLine size={18} />}
          />
          <InfoCard
            label="SORTIES"
            value={totalOut}
            color="#f87171"
            icon={<ArrowUpFromLine size={18} />}
          />
          <InfoCard
            label="RÉGUL. / DÉPREC."
            value={totalReg + totalDep}
            color="#fbbf24"
            icon={<Scale size={18} />}
          />
        </div>

        {/* TOOLBAR */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            alignItems: "center",
          }}
        >
          <div
            className="search-bar"
            style={{
              flex: "1 1 220px",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.85rem 1.1rem",
              borderRadius: 18,
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              minWidth: 0,
            }}
          >
            <Search size={18} color="var(--gradient-start)" />
            <input
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Rechercher une date (ex. août, 2026-09)…"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontSize: "0.95rem",
                minWidth: 0,
              }}
            />
            {searchDate && (
              <button
                type="button"
                onClick={() => setSearchDate("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="btn-add"
            style={btnPrimary}
          >
            <Plus size={18} /> Ajouter mouvement
          </button>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              style={{
                ...btnGhost,
                position: "relative",
                padding: "0.75rem 1rem",
              }}
            >
              <ShoppingCart size={18} />
              Panier
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 999,
                  background: "#ef4444",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                }}
              >
                {cart.length}
              </span>
            </button>
          )}
        </div>

        {/* LISTE GROUPÉE PAR DATE */}
        {loading ? (
          <div
            style={{
              color: "var(--text-secondary)",
              padding: "3rem",
              textAlign: "center",
            }}
          >
            Chargement...
          </div>
        ) : groupesFiltres.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              borderRadius: 24,
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <AlertTriangle size={32} color="var(--gradient-start)" />
            <p style={{ color: "var(--text-secondary)" }}>
              Aucun mouvement pour le moment.
            </p>
            <button type="button" onClick={openAdd} style={btnPrimary}>
              <Plus size={16} /> Premier mouvement
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {groupesFiltres.map(([date, rows]) => (
              <DateCard
                key={date}
                date={date}
                dateLabel={formatDateFr(date)}
                rows={rows}
                onVisualiser={() => setDetailsDate(date)}
                onDetails={() =>
                  navigate(`/details/jour/${encodeURIComponent(date)}`)
                }
              />
            ))}
          </div>
        )}

        {/* MODAL DÉTAILS DATE */}
        {detailsDate && (
          <div
            onClick={() => setDetailsDate(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(0,0,0,.55)",
              backdropFilter: "blur(6px)",
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
                maxWidth: 560,
                maxHeight: "88vh",
                overflow: "auto",
                borderRadius: 24,
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                padding: "1.2rem",
                boxShadow: "0 24px 60px rgba(0,0,0,.35)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text)",
                    }}
                  >
                    {formatDateFr(detailsDate)}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      marginTop: 2,
                    }}
                  >
                    {detailsDate}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailsDate(null)}
                  style={{
                    border: "1px solid var(--glass-border)",
                    background: "var(--card-bg)",
                    borderRadius: "50%",
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--text)",
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {detailsRows.map((m, idx) => {
                  const it = items.find(
                    (x) => Number(x.id) === Number(m.item_id)
                  );
                  const labelQty = it
                    ? convertirQuantite(m.qty, unitMeta(it))
                    : m.qty;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        padding: "0.7rem 0.85rem",
                        borderRadius: 14,
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        flexWrap: "wrap",
                      }}
                    >
                      <Thumb
                        item={it}
                        size={48}
                        clickable
                        onClick={() =>
                          it?.id && navigate(`/details/article/${it.id}`)
                        }
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "0.88rem",
                            color: "var(--text)",
                          }}
                        >
                          {it ? designation(it) : `Article #${m.item_id}`}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {m.type} · {m.nature || m._src} · {labelQty}
                          {m.raison ? ` · ${m.raison}` : ""}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexShrink: 0,
                        }}
                      >
                        {String(m.type || "").includes("Entr") ? (
                          <ArrowDownToLine size={16} color="#4ade80" />
                        ) : (
                          <ArrowUpFromLine size={16} color="#f87171" />
                        )}
                        {it?.id && (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/details/article/${it.id}`)
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "6px 10px",
                              borderRadius: 999,
                              border: "1px solid var(--glass-border)",
                              background: "var(--card-bg)",
                              color: "var(--gradient-start)",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            <ExternalLink size={12} />
                            Détails
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODAL AJOUTER */}
        {addOpen && (
          <div
            onClick={() => !selectedItem && setAddOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(0,0,0,.55)",
              backdropFilter: "blur(6px)",
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
                maxWidth: 560,
                maxHeight: "92vh",
                overflow: "auto",
                borderRadius: 24,
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                padding: "1.2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "Syne, sans-serif",
                    color: "var(--text)",
                  }}
                >
                  {selectedItem ? "Paramètres" : "Choisir un article"}
                </h3>
                <div style={{ display: "flex", gap: 8 }}>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCartOpen(true)}
                      style={{
                        position: "relative",
                        border: "1px solid var(--glass-border)",
                        background: "var(--glass-bg)",
                        borderRadius: 10,
                        padding: "6px 10px",
                        cursor: "pointer",
                        color: "var(--text)",
                      }}
                    >
                      <ShoppingCart size={16} />
                      <span
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          minWidth: 16,
                          height: 16,
                          borderRadius: 999,
                          background: "#ef4444",
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {cart.length}
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setAddOpen(false);
                      setSelectedItem(null);
                    }}
                    style={{
                      border: "1px solid var(--glass-border)",
                      background: "var(--card-bg)",
                      borderRadius: "50%",
                      width: 34,
                      height: 34,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--text)",
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                {[
                  { id: "courant", label: "Courant" },
                  { id: "regularisation", label: "Régularisation" },
                  { id: "depreciation", label: "Usage / Perte" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTab(t.id);
                      setSelectedItem(null);
                    }}
                    style={{
                      padding: "0.45rem 0.85rem",
                      borderRadius: 10,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border:
                        tab === t.id
                          ? "1px solid transparent"
                          : "1px solid var(--glass-border)",
                      background:
                        tab === t.id
                          ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                          : "var(--glass-bg)",
                      color: tab === t.id ? "#fff" : "var(--text)",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {!selectedItem ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0.7rem 0.9rem",
                      borderRadius: 12,
                      border: "1px solid var(--glass-border)",
                      background: "var(--glass-bg)",
                      marginBottom: 12,
                    }}
                  >
                    <Search size={16} color="var(--gradient-start)" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Nom, marque, modèle…"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: "var(--text)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      maxHeight: 360,
                      overflowY: "auto",
                    }}
                  >
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectItem(item)}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          textAlign: "left",
                          padding: 10,
                          borderRadius: 14,
                          border: "1px solid var(--glass-border)",
                          background: "var(--glass-bg)",
                          cursor: "pointer",
                          color: "var(--text)",
                        }}
                      >
                        <Thumb item={item} size={48} />
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{ fontWeight: 700, fontSize: "0.88rem" }}
                          >
                            {item.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {[item.mark, item.modele]
                              .filter(Boolean)
                              .join(" · ") || "—"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "var(--gradient-start)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      marginBottom: 10,
                      padding: 0,
                    }}
                  >
                    ← Changer d&apos;article
                  </button>

                  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <Thumb item={selectedItem} size={72} />
                    <div>
                      <div
                        style={{ fontWeight: 800, color: "var(--text)" }}
                      >
                        {selectedItem.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {[selectedItem.mark, selectedItem.modele]
                          .filter(Boolean)
                          .join(" · ") || "—"}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--gradient-start)",
                          fontWeight: 700,
                          marginTop: 4,
                        }}
                      >
                        Niveau {level} · Stock total :{" "}
                        {convertirQuantite(
                          calculerStockTotal(
                            selectedItem.id,
                            stocks,
                            mouvements,
                            ajustments
                          ),
                          unitMeta(selectedItem)
                        )}
                      </div>
                    </div>
                  </div>

                  {tab === "courant" && (
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>Type</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["Entrée", "Sortie"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTypeMvt(t)}
                            style={{
                              flex: 1,
                              padding: "0.55rem",
                              borderRadius: 10,
                              fontWeight: 700,
                              cursor: "pointer",
                              border:
                                typeMvt === t
                                  ? "1px solid transparent"
                                  : "1px solid var(--glass-border)",
                              background:
                                typeMvt === t
                                  ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                                  : "var(--glass-bg)",
                              color: typeMvt === t ? "#fff" : "var(--text)",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "depreciation" && (
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>Nature</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[
                          { id: "usage", label: "Usage" },
                          { id: "perte", label: "Perte (−50%)" },
                        ].map((n) => (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => {
                              setNature(n.id);
                              setRaison(
                                n.id === "perte"
                                  ? "Perte — dépréciation 50 %"
                                  : "Usage interne"
                              );
                            }}
                            style={{
                              flex: 1,
                              padding: "0.55rem",
                              borderRadius: 10,
                              fontWeight: 700,
                              cursor: "pointer",
                              border:
                                nature === n.id
                                  ? "1px solid transparent"
                                  : "1px solid var(--glass-border)",
                              background:
                                nature === n.id
                                  ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                                  : "var(--glass-bg)",
                              color: nature === n.id ? "#fff" : "var(--text)",
                            }}
                          >
                            {n.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab !== "regularisation" && (
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>Entrepôt</label>
                      <select
                        value={entrepotId}
                        onChange={(e) => setEntrepotId(e.target.value)}
                        style={inp}
                      >
                        {entrepots.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.reference || e.name || `Entrepôt ${e.id}`}
                            {" — stock : "}
                            {convertirQuantite(
                              stockReelEntrepot(selectedItem.id, e.id),
                              unitMeta(selectedItem)
                            )}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {tab === "regularisation" ? (
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>
                        Stock cible / entrepôt (stock réel)
                      </label>
                      {entrepots.map((ent) => {
                        const actuel = stockReelEntrepot(
                          selectedItem.id,
                          ent.id
                        );
                        return (
                          <div
                            key={ent.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 6,
                              padding: "0.45rem 0.6rem",
                              borderRadius: 10,
                              background: "var(--glass-bg)",
                              border: "1px solid var(--glass-border)",
                            }}
                          >
                            <div style={{ flex: 1, fontSize: "0.8rem" }}>
                              <strong>
                                {ent.reference || ent.name}
                              </strong>
                              <div
                                style={{
                                  fontSize: "0.7rem",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                Actuel (réel) :{" "}
                                {convertirQuantite(
                                  actuel,
                                  unitMeta(selectedItem)
                                )}
                              </div>
                            </div>
                            <input
                              type="number"
                              min={0}
                              step="any"
                              value={regTargets[ent.id] ?? actuel}
                              onChange={(e) =>
                                setRegTargets((t) => ({
                                  ...t,
                                  [ent.id]: e.target.value,
                                }))
                              }
                              style={{
                                ...inp,
                                width: 90,
                                margin: 0,
                                padding: "0.45rem 0.5rem",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>Quantités</label>
                      {level >= 2 && (
                        <div style={{ marginBottom: 6 }}>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Carton
                          </span>
                          <input
                            type="number"
                            min={0}
                            value={qty.carton}
                            onChange={(e) =>
                              setQty((q) => ({ ...q, carton: e.target.value }))
                            }
                            style={inp}
                          />
                        </div>
                      )}
                      {level === 3 && (
                        <div style={{ marginBottom: 6 }}>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            Boîte
                          </span>
                          <input
                            type="number"
                            min={0}
                            value={qty.boite}
                            onChange={(e) =>
                              setQty((q) => ({ ...q, boite: e.target.value }))
                            }
                            style={inp}
                          />
                        </div>
                      )}
                      <div>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Pièce
                        </span>
                        <input
                          type="number"
                          min={0}
                          value={qty.piece}
                          onChange={(e) =>
                            setQty((q) => ({ ...q, piece: e.target.value }))
                          }
                          style={inp}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ marginBottom: 12 }}>
                    <label style={lbl}>Raison</label>
                    <input
                      value={raison}
                      onChange={(e) => setRaison(e.target.value)}
                      style={inp}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addToCart}
                    style={{
                      width: "100%",
                      padding: "0.85rem",
                      borderRadius: 12,
                      border: "none",
                      background:
                        "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      color: "#fff",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    <Plus
                      size={16}
                      style={{ verticalAlign: "middle", marginRight: 6 }}
                    />
                    Ajouter au panier
                  </button>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.7rem",
                      color: "var(--text-secondary)",
                      marginTop: 8,
                    }}
                  >
                    Reste ouvert pour enchaîner · utilisez le panier pour
                    enregistrer
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* PANIER */}
        {cartOpen && (
          <div
            onClick={() => setCartOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2100,
              background: "rgba(0,0,0,.6)",
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
                maxWidth: 480,
                maxHeight: "90vh",
                overflow: "auto",
                borderRadius: 24,
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                padding: "1.15rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "Syne, sans-serif",
                    color: "var(--text)",
                  }}
                >
                  Panier ({cart.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "var(--text)",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                style={{
                  marginBottom: 14,
                  padding: "0.75rem 0.9rem",
                  borderRadius: 14,
                  border: "1px solid var(--glass-border)",
                  background: "var(--glass-bg)",
                }}
              >
                <label style={lbl}>Date du mouvement</label>
                <input
                  type="date"
                  value={cartDate}
                  onChange={(e) =>
                    setCartDate(e.target.value || todayISO())
                  }
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.8rem",
                    borderRadius: 10,
                    border: "1px solid var(--glass-border)",
                    background: "var(--card-bg)",
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Par défaut aujourd&apos;hui — modifiable pour un mouvement
                  passé.
                </p>
              </div>

              {cart.length === 0 ? (
                <p style={{ color: "var(--text-secondary)" }}>Vide.</p>
              ) : (
                cart.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      padding: "0.6rem 0",
                      borderBottom: "1px solid var(--glass-border)",
                    }}
                  >
                    <Thumb item={row.item} size={48} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{ fontWeight: 700, fontSize: "0.85rem" }}
                      >
                        {row.designation}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {row.type} · {row.nature} ·{" "}
                        {convertirQuantite(row.qty, unitMeta(row.item))} ·{" "}
                        {row.entrepot}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setCart((c) => c.filter((_, i) => i !== idx))
                      }
                      style={{
                        border: "none",
                        background: "rgba(239,68,68,.1)",
                        color: "#f87171",
                        borderRadius: 8,
                        padding: "4px 8px",
                        cursor: "pointer",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                ))
              )}

              {cart.length > 0 && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={saveCart}
                  style={{
                    width: "100%",
                    marginTop: 12,
                    padding: "0.85rem",
                    borderRadius: 12,
                    border: "none",
                    background:
                      "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                    color: "#fff",
                    fontWeight: 800,
                    cursor: saving ? "wait" : "pointer",
                  }}
                >
                  {saving ? "Enregistrement…" : "Enregistrer le panier"}
                </button>
              )}
            </div>
          </div>
        )}

        <Footer />

        <style>{`
@media (max-width: 1100px) {
  .info-band {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 720px) {
  .info-band {
    grid-template-columns: 1fr 1fr !important;
  }
  .mouvements-page {
    padding: 0 12px 1.5rem !important;
  }
  .btn-add {
    width: 100%;
    justify-content: center;
  }
  .search-bar {
    flex: 1 1 100% !important;
  }
}
@media (max-width: 400px) {
  .info-band {
    grid-template-columns: 1fr !important;
  }
}
`}</style>
      </div>
    </div>
  );
}

export { calculerStockEntrepot, calculerStockTotal, convertirQuantite };
