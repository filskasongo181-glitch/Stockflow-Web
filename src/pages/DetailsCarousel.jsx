// // /**
// //  * DetailsCarousel — "Detail All"
// //  * Route : /details/:type/all
// //  *
// //  * Affiche les fiches une par une avec flèches précédent / suivant.
// //  * Fluide même avec des centaines d'éléments (pas de PDF massif d'un coup).
// //  */

// // import { useEffect, useMemo, useState, useCallback } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   ChevronUp,
// //   ChevronDown,
// //   Tag,
// //   Package,
// //   Warehouse,
// //   Users,
// //   ArrowLeftRight,
// //   Layers,
// //   ExternalLink,
// // } from "lucide-react";
// // import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// // import Footer from "../components/Footer";
// // import * as api from "../api/api";

// // const safeGet = (fn) =>
// //   typeof fn === "function"
// //     ? fn().catch(() => ({ data: [] }))
// //     : Promise.resolve({ data: [] });

// // const META = {
// //   categorie: { label: "Catégorie", icon: Tag, list: "getCategories", name: (r) => r.name },
// //   article: {
// //     label: "Article",
// //     icon: Package,
// //     list: "getItems",
// //     name: (r) => [r.name, r.mark, r.modele].filter(Boolean).join(" · "),
// //   },
// //   entrepot: {
// //     label: "Entrepôt",
// //     icon: Warehouse,
// //     list: "getEntrepots",
// //     name: (r) => r.reference || r.name || `#${r.id}`,
// //   },
// //   utilisateur: {
// //     label: "Utilisateur",
// //     icon: Users,
// //     list: "getUsers",
// //     name: (r) => `${r.first_name || ""} ${r.name || ""}`.trim() || r.email,
// //   },
// //   mouvement: {
// //     label: "Mouvement",
// //     icon: ArrowLeftRight,
// //     list: "getMouvementsRecents",
// //     name: (r) => `${r.type || "Mvt"} · ${String(r.date || "").slice(0, 10)} · qty ${r.qty ?? "—"}`,
// //   },
// // };

// // export default function DetailsCarousel() {
// //   const { type } = useParams();
// //   const navigate = useNavigate();
// //   const theme =
// //     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
// //     "dark-galaxy";

// //   const meta = META[type] || META.categorie;
// //   const Icon = meta.icon;

// //   const [items, setItems] = useState([]);
// //   const [index, setIndex] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     let cancelled = false;
// //     (async () => {
// //       setLoading(true);
// //       try {
// //         const fn = api[meta.list];
// //         const res = await safeGet(fn);
// //         const raw = res?.data ?? res ?? [];
// //         const list = (Array.isArray(raw) ? raw : []).filter(
// //           (x) => Number(x.deleted ?? 0) === 0
// //         );
// //         list.sort((a, b) =>
// //           String(meta.name(a) || "").localeCompare(String(meta.name(b) || ""), "fr")
// //         );
// //         if (!cancelled) {
// //           setItems(list);
// //           setIndex(0);
// //         }
// //       } finally {
// //         if (!cancelled) setLoading(false);
// //       }
// //     })();
// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [type, meta.list]);

// //   const current = items[index] || null;

// //   const prev = useCallback(() => {
// //     setIndex((i) => (i <= 0 ? Math.max(items.length - 1, 0) : i - 1));
// //   }, [items.length]);

// //   const next = useCallback(() => {
// //     setIndex((i) => (i >= items.length - 1 ? 0 : i + 1));
// //   }, [items.length]);

// //   useEffect(() => {
// //     const onKey = (e) => {
// //       if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
// //       if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, [prev, next]);

// //   const fields = useMemo(() => {
// //     if (!current) return [];
// //     const skip = new Set(["icon", "picture", "picture_path", "password", "hash"]);
// //     return Object.entries(current)
// //       .filter(([k, v]) => !skip.has(k) && v != null && String(v).length < 500)
// //       .slice(0, 24);
// //   }, [current]);

// //   const css = themeCssVars?.(theme) || {};

// //   return (
// //     <div style={{ minHeight: "100vh", position: "relative", ...css }}>
// //       <ThemeBackground theme={theme} />
// //       <div
// //         style={{
// //           position: "relative",
// //           zIndex: 1,
// //           maxWidth: 720,
// //           margin: "0 auto",
// //           padding: "1.25rem 1rem 3rem",
// //         }}
// //       >
// //         <button type="button" onClick={() => navigate(-1)} style={btnBack}>
// //           <ArrowLeft size={16} /> Retour
// //         </button>

// //         <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "1rem 0 1.25rem" }}>
// //           <div style={iconBox}>
// //             <Layers size={22} color="#fff" />
// //           </div>
// //           <div>
// //             <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
// //               Detail All · {meta.label}
// //             </div>
// //             <h1 style={{ margin: 0, fontSize: "1.35rem", color: "var(--text)" }}>
// //               {loading ? "Chargement…" : `${items.length} élément(s)`}
// //             </h1>
// //           </div>
// //         </div>

// //         {/* Flèche haut */}
// //         <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
// //           <button type="button" onClick={prev} disabled={!items.length} style={arrowBtn} title="Précédent (↑)">
// //             <ChevronUp size={28} />
// //           </button>
// //         </div>

// //         {/* Cadre central */}
// //         <div
// //           style={{
// //             borderRadius: 20,
// //             border: "1px solid var(--glass-border)",
// //             background: "var(--glass-bg)",
// //             backdropFilter: "blur(14px)",
// //             padding: "1.25rem 1.35rem",
// //             minHeight: 280,
// //             boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
// //           }}
// //         >
// //           {loading ? (
// //             <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>Chargement…</p>
// //           ) : !current ? (
// //             <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>Aucun élément.</p>
// //           ) : (
// //             <>
// //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
// //                 <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
// //                   <Icon size={22} style={{ color: "var(--gradient-start)" }} />
// //                   <div>
// //                     <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--text)" }}>
// //                       {meta.name(current)}
// //                     </div>
// //                     <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
// //                       {index + 1} / {items.length} · ID {current.id}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <button
// //                   type="button"
// //                   onClick={() => navigate(`/details/${type}/${current.id}`)}
// //                   style={btnGhost}
// //                 >
// //                   <ExternalLink size={14} /> Fiche complète
// //                 </button>
// //               </div>

// //               <div
// //                 style={{
// //                   display: "grid",
// //                   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //                   gap: "0.65rem 1rem",
// //                 }}
// //               >
// //                 {fields.map(([k, v]) => (
// //                   <div
// //                     key={k}
// //                     style={{
// //                       padding: "0.55rem 0.7rem",
// //                       borderRadius: 12,
// //                       border: "1px solid var(--glass-border)",
// //                       background: "rgba(255,255,255,0.03)",
// //                     }}
// //                   >
// //                     <div
// //                       style={{
// //                         fontSize: "0.68rem",
// //                         fontWeight: 700,
// //                         textTransform: "uppercase",
// //                         letterSpacing: "0.04em",
// //                         color: "var(--text-secondary)",
// //                         marginBottom: 4,
// //                       }}
// //                     >
// //                       {k}
// //                     </div>
// //                     <div style={{ color: "var(--text)", fontSize: "0.9rem", wordBreak: "break-word" }}>
// //                       {typeof v === "object" ? JSON.stringify(v) : String(v)}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </>
// //           )}
// //         </div>

// //         {/* Flèche bas */}
// //         <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
// //           <button type="button" onClick={next} disabled={!items.length} style={arrowBtn} title="Suivant (↓)">
// //             <ChevronDown size={28} />
// //           </button>
// //         </div>

// //         <p style={{ textAlign: "center", marginTop: 12, fontSize: "0.8rem", color: "var(--text-secondary)" }}>
// //           Flèches clavier ↑ ↓ ou boutons pour naviguer
// //         </p>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }

// // const iconBox = {
// //   width: 48,
// //   height: 48,
// //   borderRadius: 14,
// //   display: "grid",
// //   placeItems: "center",
// //   background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //   boxShadow: "0 8px 24px var(--glow-color)",
// // };

// // const btnBack = {
// //   display: "inline-flex",
// //   alignItems: "center",
// //   gap: 8,
// //   padding: "0.45rem 0.85rem",
// //   borderRadius: 12,
// //   border: "1px solid var(--glass-border)",
// //   background: "var(--glass-bg)",
// //   color: "var(--text)",
// //   cursor: "pointer",
// // };

// // const arrowBtn = {
// //   width: 52,
// //   height: 52,
// //   borderRadius: 16,
// //   border: "1px solid var(--glass-border)",
// //   background: "var(--glass-bg)",
// //   color: "var(--text)",
// //   cursor: "pointer",
// //   display: "grid",
// //   placeItems: "center",
// // };

// // const btnGhost = {
// //   display: "inline-flex",
// //   alignItems: "center",
// //   gap: 6,
// //   padding: "0.4rem 0.75rem",
// //   borderRadius: 10,
// //   border: "1px solid var(--glass-border)",
// //   background: "transparent",
// //   color: "var(--text)",
// //   fontSize: "0.8rem",
// //   fontWeight: 600,
// //   cursor: "pointer",
// // };


// /**
//  * DetailsCarousel — Detail All
//  * Route : /details/:type/all
//  *
//  * Même identité visuelle que Details.jsx :
//  * ThemeBackground, GlassCard, badges, icônes image catégorie/article,
//  * flèches ↑↓, fiche complète, export PDF simple de la fiche courante.
//  */

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   ChevronUp,
//   ChevronDown,
//   Package,
//   Tag,
//   Warehouse,
//   Users,
//   ArrowLeftRight,
//   Layers,
//   ExternalLink,
//   Download,
//   Image as ImageIcon,
//   Hash,
//   Info,
//   Boxes,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import * as api from "../api/api";

// const getItems = api.getItems;
// const getCategories = api.getCategories;
// const getEntrepots = api.getEntrepots;
// const getUsers = api.getUsers;
// const getStocks =
//   typeof api.getStocks === "function"
//     ? api.getStocks
//     : async () => ({ data: [] });
// const getMouvementsRecents =
//   typeof api.getMouvementsRecents === "function"
//     ? api.getMouvementsRecents
//     : async () => ({ data: [] });
// const getStockAjustments =
//   typeof api.getStockAjustments === "function"
//     ? api.getStockAjustments
//     : typeof api.getAjustements === "function"
//     ? api.getAjustements
//     : async () => ({ data: [] });

// const APP_NAME = "StockFlow";
// const COMPANY_NAME = "L'étoile du matin";

// /* ========== HELPERS (alignés Details.jsx) ========== */
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
//     let p = String(item.picture_path).replace(/\\/g, "/").replace(/^\/+/, "");
//     if (p.includes("/")) p = p.split("/").pop();
//     if (!p.startsWith("items/") && !p.startsWith("images/")) p = `items/${p}`;
//     if (p.startsWith("images/")) return `/${p}`;
//     return `/images/${p}`;
//   }
//   const base = buildImageFileName(item);
//   return base ? `/images/items/${base}.jpg` : null;
// }

// function toIconSrc(icon) {
//   if (!icon || typeof icon !== "string") return null;
//   let s = icon.trim();
//   if (!s) return null;
//   if (
//     s.startsWith("data:") ||
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("blob:")
//   )
//     return s;
//   if (s.startsWith("/") && s.length < 400) return s;
//   if (s.length <= 8) return null;
//   if (s.toLowerCase().startsWith("base64,")) s = s.slice(7);
//   const clean = s.replace(/\s/g, "");
//   if (clean.length < 16) return null;
//   const mime = clean.startsWith("/9j/")
//     ? "image/jpeg"
//     : clean.startsWith("R0lGOD")
//     ? "image/gif"
//     : "image/png";
//   return `data:${mime};base64,${clean}`;
// }

// function designation(item) {
//   if (!item) return "—";
//   return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
// }

// function parseCategoryName(cat) {
//   const raw = cat?.name || "";
//   const parts = raw.split(" ");
//   const firstIsEmoji = parts[0] && parts[0].length <= 2;
//   return {
//     emoji: firstIsEmoji ? parts[0] : null,
//     name: firstIsEmoji ? parts.slice(1).join(" ") || raw : raw,
//   };
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

// const calculerStockTotal = (itemId, stocks, mouvements, stock_ajustments) => {
//   const itemIdNum = Number(itemId);
//   const entrepots = new Set();
//   (stocks || [])
//     .filter((s) => Number(s.item_id) === itemIdNum && Number(s.deleted ?? 0) === 0)
//     .forEach((s) => entrepots.add(Number(s.entrepot_id)));
//   (mouvements || [])
//     .filter((m) => Number(m.item_id) === itemIdNum && Number(m.deleted ?? 0) === 0)
//     .forEach((m) => entrepots.add(Number(m.entrepot_id)));
//   (stock_ajustments || [])
//     .filter((a) => Number(a.item_id) === itemIdNum && Number(a.deleted ?? 0) === 0)
//     .forEach((a) => entrepots.add(Number(a.entrepot_id)));

//   let total = 0;
//   entrepots.forEach((entrepotId) => {
//     const stock = (stocks || []).find(
//       (s) =>
//         Number(s.item_id) === itemIdNum &&
//         Number(s.entrepot_id) === entrepotId &&
//         Number(s.deleted ?? 0) === 0
//     );
//     let q = Number(stock?.stock_actual ?? 0);
//     (mouvements || [])
//       .filter(
//         (m) =>
//           Number(m.item_id) === itemIdNum &&
//           Number(m.entrepot_id) === entrepotId &&
//           Number(m.deleted ?? 0) === 0
//       )
//       .forEach((m) => {
//         const qty = Number(m.qty ?? 0);
//         if (m.type === "Entrée") q += qty;
//         else if (m.type === "Sortie") q -= qty;
//       });
//     (stock_ajustments || [])
//       .filter(
//         (a) =>
//           Number(a.item_id) === itemIdNum &&
//           Number(a.entrepot_id) === entrepotId &&
//           Number(a.deleted ?? 0) === 0
//       )
//       .forEach((a) => {
//         const qty = Number(a.qty ?? 0);
//         if (a.type === "Entrée") q += qty;
//         else if (a.type === "Sortie") q -= qty;
//       });
//     total += q;
//   });
//   return total;
// };

// function loadScript(src) {
//   return new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${src}"]`)) {
//       resolve();
//       return;
//     }
//     const s = document.createElement("script");
//     s.src = src;
//     s.async = true;
//     s.onload = () => resolve();
//     s.onerror = reject;
//     document.head.appendChild(s);
//   });
// }

// async function loadJsPDF() {
//   if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
//   await loadScript(
//     "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
//   );
//   if (!window.jspdf?.jsPDF) throw new Error("jsPDF non chargé");
//   return window.jspdf.jsPDF;
// }

// const TYPE_META = {
//   categorie: { label: "Catégorie", icon: Tag, color: "#60a5fa", badge: "CATÉGORIE" },
//   article: { label: "Article", icon: Package, color: "var(--gradient-start)", badge: "ARTICLE" },
//   entrepot: { label: "Entrepôt", icon: Warehouse, color: "#a78bfa", badge: "ENTREPÔT" },
//   utilisateur: { label: "Utilisateur", icon: Users, color: "#fbbf24", badge: "UTILISATEUR" },
//   mouvement: { label: "Mouvement", icon: ArrowLeftRight, color: "#34d399", badge: "MOUVEMENT" },
// };

// /* ========== PAGE ========== */
// export default function DetailsCarousel() {
//   const { type } = useParams();
//   const navigate = useNavigate();
//   const theme =
//     (typeof sessionStorage !== "undefined" &&
//       sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const meta = TYPE_META[type] || {
//     label: type || "Élément",
//     icon: Info,
//     color: "var(--gradient-start)",
//     badge: "DÉTAIL",
//   };
//   const MetaIcon = meta.icon;

//   const [items, setItems] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [ctx, setCtx] = useState({ stocks: [], mouvements: [], ajustements: [], categories: [] });
//   const [pdfBusy, setPdfBusy] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const [stocksRes, mvtRes, ajRes] = await Promise.all([
//           getStocks().catch(() => ({ data: [] })),
//           getMouvementsRecents().catch(() => ({ data: [] })),
//           getStockAjustments().catch(() => ({ data: [] })),
//         ]);
//         const stocks = stocksRes.data || [];
//         const mouvements = mvtRes.data || [];
//         const ajustements = ajRes.data || [];

//         let list = [];
//         let categories = [];

//         if (type === "categorie") {
//           const [cr, ir] = await Promise.all([
//             getCategories(),
//             getItems().catch(() => ({ data: [] })),
//           ]);
//           categories = (cr.data || []).filter((c) => Number(c.deleted ?? 0) === 0);
//           const allItems = (ir.data || []).filter((i) => Number(i.deleted ?? 0) === 0);
//           list = categories
//             .map((c) => ({
//               ...c,
//               _articles: allItems.filter(
//                 (i) => Number(i.category_item) === Number(c.id)
//               ),
//             }))
//             .sort((a, b) =>
//               parseCategoryName(a).name.localeCompare(
//                 parseCategoryName(b).name,
//                 "fr",
//                 { sensitivity: "base" }
//               )
//             );
//         } else if (type === "article") {
//           const [ir, cr] = await Promise.all([
//             getItems(),
//             getCategories().catch(() => ({ data: [] })),
//           ]);
//           categories = cr.data || [];
//           list = (ir.data || [])
//             .filter((i) => Number(i.deleted ?? 0) === 0)
//             .map((i) => ({
//               ...i,
//               stockReel: calculerStockTotal(i.id, stocks, mouvements, ajustements),
//               _catName:
//                 (categories.find((c) => Number(c.id) === Number(i.category_item)) || {})
//                   .name || "—",
//             }))
//             .sort((a, b) =>
//               String(a.name || "").localeCompare(String(b.name || ""), "fr")
//             );
//         } else if (type === "entrepot") {
//           const er = await getEntrepots();
//           list = (er.data || [])
//             .filter((e) => Number(e.deleted ?? 0) === 0)
//             .sort((a, b) =>
//               String(a.name || a.reference || "").localeCompare(
//                 String(b.name || b.reference || ""),
//                 "fr"
//               )
//             );
//         } else if (type === "utilisateur") {
//           const ur = await getUsers();
//           list = (ur.data || [])
//             .filter((u) => Number(u.deleted ?? 0) === 0)
//             .sort((a, b) =>
//               String(a.name || "").localeCompare(String(b.name || ""), "fr")
//             );
//         } else if (type === "mouvement") {
//           list = (mouvements || [])
//             .filter((m) => Number(m.deleted ?? 0) === 0)
//             .sort((a, b) =>
//               String(b.date || b.created_at || "").localeCompare(
//                 String(a.date || a.created_at || "")
//               )
//             );
//         } else {
//           throw new Error(`Type non supporté : ${type}`);
//         }

//         if (!cancelled) {
//           setItems(list);
//           setIndex(0);
//           setCtx({ stocks, mouvements, ajustements, categories });
//         }
//       } catch (e) {
//         if (!cancelled) setError(e.message || "Erreur de chargement");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [type]);

//   const current = items[index] || null;

//   const prev = useCallback(() => {
//     setIndex((i) => (i <= 0 ? Math.max(items.length - 1, 0) : i - 1));
//   }, [items.length]);

//   const next = useCallback(() => {
//     setIndex((i) => (i >= items.length - 1 ? 0 : i + 1));
//   }, [items.length]);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
//       if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [prev, next]);

//   const titleOf = useCallback(
//     (row) => {
//       if (!row) return "—";
//       if (type === "categorie") return parseCategoryName(row).name;
//       if (type === "article") return designation(row);
//       if (type === "entrepot") return row.name || row.reference || `#${row.id}`;
//       if (type === "utilisateur")
//         return `${row.first_name || ""} ${row.name || ""}`.trim() || row.email;
//       if (type === "mouvement")
//         return `${row.type || "Mvt"} · ${String(row.date || "").slice(0, 10)}`;
//       return `#${row.id}`;
//     },
//     [type]
//   );

//   const handlePdf = useCallback(async () => {
//     if (!current || pdfBusy) return;
//     setPdfBusy(true);
//     try {
//       const JsPDF = await loadJsPDF();
//       const doc = new JsPDF({ unit: "mm", format: "a4" });
//       const pageW = doc.internal.pageSize.getWidth();
//       const margin = 14;
//       let y = 30;

//       doc.setFillColor(79, 70, 229);
//       doc.rect(0, 0, pageW, 22, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFontSize(14);
//       doc.text(`${APP_NAME} · ${COMPANY_NAME}`, margin, 14);
//       doc.setFontSize(10);
//       doc.text(`Detail All · ${meta.label}`, pageW - margin, 14, { align: "right" });

//       doc.setTextColor(30, 41, 59);
//       doc.setFontSize(16);
//       doc.text(String(titleOf(current)).slice(0, 80), margin, y);
//       y += 10;
//       doc.setFontSize(10);
//       doc.setTextColor(100, 116, 139);
//       doc.text(`ID #${current.id} · ${index + 1}/${items.length}`, margin, y);
//       y += 12;

//       const lines = [];
//       if (type === "categorie") {
//         lines.push(`Nom : ${parseCategoryName(current).name}`);
//         lines.push(`Description : ${current.description || "—"}`);
//         lines.push(`Articles liés : ${(current._articles || []).length}`);
//       } else if (type === "article") {
//         lines.push(`Désignation : ${designation(current)}`);
//         lines.push(`Catégorie : ${current._catName || "—"}`);
//         lines.push(`Stock : ${convertirQuantite(current.stockReel, current)}`);
//         lines.push(`Prix vente : ${current.sale_price_fc ?? "—"} FC`);
//       } else if (type === "entrepot") {
//         lines.push(`Nom : ${current.name || current.reference || "—"}`);
//         lines.push(`Localisation : ${current.location || current.localisation || "—"}`);
//         lines.push(`Capacité : ${current.capacity ?? "—"}`);
//       } else if (type === "utilisateur") {
//         lines.push(`Nom : ${titleOf(current)}`);
//         lines.push(`Email : ${current.email || "—"}`);
//         lines.push(`Rôle : ${current.role || "—"}`);
//       } else if (type === "mouvement") {
//         lines.push(`Type : ${current.type || "—"}`);
//         lines.push(`Qté : ${current.qty ?? "—"}`);
//         lines.push(`Date : ${String(current.date || current.created_at || "—").slice(0, 16)}`);
//       }

//       doc.setTextColor(30, 41, 59);
//       doc.setFontSize(11);
//       lines.forEach((line) => {
//         doc.text(line, margin, y);
//         y += 7;
//       });

//       doc.setFontSize(8);
//       doc.setTextColor(148, 163, 184);
//       doc.text(`Généré le ${new Date().toLocaleString("fr-FR")}`, margin, 287);

//       doc.save(
//         `StockFlow_${type}_${current.id}_${index + 1}.pdf`
//       );
//     } catch (e) {
//       console.error(e);
//       alert("Export PDF impossible.");
//     } finally {
//       setPdfBusy(false);
//     }
//   }, [current, pdfBusy, type, meta.label, titleOf, index, items.length]);

//   const css =
//     typeof themeCssVars === "function" ? themeCssVars(theme) : {};

//   return (
//     <div
//       style={{
//         position: "relative",
//         minHeight: "100%",
//         width: "100%",
//         ...css,
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
//         <ThemeBackground theme={theme} />
//       </div>

//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           maxWidth: 920,
//           margin: "0 auto",
//           padding: "0 16px 2.5rem",
//         }}
//       >
//         {/* TOP BAR */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 10,
//             flexWrap: "wrap",
//             marginTop: "0.5rem",
//             marginBottom: "1.25rem",
//           }}
//         >
//           <button type="button" onClick={() => navigate(-1)} style={topBtn}>
//             <ArrowLeft size={16} /> Retour
//           </button>
//           <button
//             type="button"
//             onClick={handlePdf}
//             disabled={!current || pdfBusy}
//             style={{
//               ...topBtn,
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               border: "none",
//               boxShadow: "0 8px 22px var(--glow-color)",
//               opacity: !current || pdfBusy ? 0.7 : 1,
//             }}
//           >
//             <Download size={16} />
//             {pdfBusy ? "Export…" : "Exporter PDF"}
//           </button>
//         </div>

//         {/* HEADER */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//             marginBottom: "1.25rem",
//             gap: "0.65rem",
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
//               background: `linear-gradient(145deg, ${meta.color}, var(--gradient-end))`,
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
//             <MetaIcon size={30} />
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
//               color: meta.color,
//               fontSize: "0.7rem",
//               fontWeight: 700,
//               letterSpacing: ".08em",
//               textTransform: "uppercase",
//             }}
//           >
//             <Layers size={12} /> Detail All · {meta.badge}
//           </div>
//           <h1
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontSize: "clamp(1.45rem, 3.2vw, 2rem)",
//               fontWeight: 900,
//               margin: 0,
//               background:
//                 "linear-gradient(135deg, var(--text), var(--gradient-start))",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             {meta.label}
//             {loading ? "" : ` · ${items.length}`}
//           </h1>
//           <p
//             style={{
//               margin: 0,
//               color: "var(--text-secondary)",
//               fontSize: "0.9rem",
//               maxWidth: 480,
//             }}
//           >
//             Parcourez toutes les fiches une par une. Flèches ↑ ↓ ou boutons.
//           </p>
//         </div>

//         {/* ARROW UP */}
//         <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
//           <button
//             type="button"
//             onClick={prev}
//             disabled={!items.length}
//             style={arrowBtn}
//             title="Précédent"
//           >
//             <ChevronUp size={28} />
//           </button>
//         </div>

//         {/* CONTENT */}
//         {loading ? (
//           <GlassCard>
//             <div
//               style={{
//                 padding: "3rem",
//                 textAlign: "center",
//                 color: "var(--text-secondary)",
//               }}
//             >
//               Chargement…
//             </div>
//           </GlassCard>
//         ) : error ? (
//           <GlassCard>
//             <div
//               style={{
//                 padding: "2rem",
//                 textAlign: "center",
//                 color: "#f87171",
//               }}
//             >
//               ⚠ {error}
//             </div>
//           </GlassCard>
//         ) : !current ? (
//           <GlassCard>
//             <div
//               style={{
//                 padding: "2rem",
//                 textAlign: "center",
//                 color: "var(--text-secondary)",
//               }}
//             >
//               Aucun élément.
//             </div>
//           </GlassCard>
//         ) : (
//           <>
//             <div
//               style={{
//                 textAlign: "center",
//                 marginBottom: 10,
//                 fontSize: "0.82rem",
//                 color: "var(--text-secondary)",
//                 fontWeight: 600,
//               }}
//             >
//               {index + 1} / {items.length}
//             </div>

//             {type === "categorie" && (
//               <CategorieSlide
//                 cat={current}
//                 navigate={navigate}
//                 onOpen={() => navigate(`/details/categorie/${current.id}`)}
//               />
//             )}
//             {type === "article" && (
//               <ArticleSlide
//                 item={current}
//                 navigate={navigate}
//                 onOpen={() => navigate(`/details/article/${current.id}`)}
//               />
//             )}
//             {type === "entrepot" && (
//               <EntrepotSlide
//                 ent={current}
//                 onOpen={() => navigate(`/details/entrepot/${current.id}`)}
//               />
//             )}
//             {type === "utilisateur" && (
//               <UserSlide
//                 user={current}
//                 onOpen={() => navigate(`/details/utilisateur/${current.id}`)}
//               />
//             )}
//             {type === "mouvement" && (
//               <MouvementSlide
//                 m={current}
//                 onOpen={() => navigate(`/details/mouvement/${current.id}`)}
//               />
//             )}
//           </>
//         )}

//         {/* ARROW DOWN */}
//         <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
//           <button
//             type="button"
//             onClick={next}
//             disabled={!items.length}
//             style={arrowBtn}
//             title="Suivant"
//           >
//             <ChevronDown size={28} />
//           </button>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

// /* ========== SLIDES ========== */
// function CategorieSlide({ cat, navigate, onOpen }) {
//   const { emoji, name } = parseCategoryName(cat);
//   const imgSrc = toIconSrc(cat.icon);
//   const short =
//     cat.icon && String(cat.icon).trim().length <= 8
//       ? String(cat.icon).trim()
//       : null;
//   const articles = cat._articles || [];

//   return (
//     <>
//       <GlassCard>
//         <div
//           style={{
//             display: "flex",
//             gap: "1.25rem",
//             padding: "1.5rem",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <div
//             style={{
//               width: 100,
//               height: 100,
//               borderRadius: 22,
//               flexShrink: 0,
//               overflow: "hidden",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 10px 28px var(--glow-color)",
//               position: "relative",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 8,
//                 left: 12,
//                 width: 22,
//                 height: 10,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.4)",
//                 transform: "rotate(-20deg)",
//               }}
//             />
//             {imgSrc ? (
//               <img
//                 src={imgSrc}
//                 alt=""
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                 }}
//               />
//             ) : (
//               <span style={{ fontSize: "2.4rem", lineHeight: 1 }}>
//                 {short || emoji || "📂"}
//               </span>
//             )}
//           </div>
//           <div style={{ flex: 1, minWidth: 160 }}>
//             <div
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 900,
//                 fontSize: "1.45rem",
//                 color: "var(--text)",
//               }}
//             >
//               {name}
//             </div>
//             <div
//               style={{
//                 marginTop: 10,
//                 display: "flex",
//                 gap: 8,
//                 flexWrap: "wrap",
//               }}
//             >
//               <Badge color="#60a5fa">ID #{cat.id}</Badge>
//               <Badge color="#4ade80">
//                 {articles.length} article{articles.length > 1 ? "s" : ""}
//               </Badge>
//             </div>
//             {cat.description && (
//               <p
//                 style={{
//                   marginTop: 12,
//                   color: "var(--text-secondary)",
//                   fontSize: "0.9rem",
//                   lineHeight: 1.45,
//                 }}
//               >
//                 {cat.description}
//               </p>
//             )}
//             <button type="button" onClick={onOpen} style={btnOpen}>
//               <ExternalLink size={14} /> Fiche complète
//             </button>
//           </div>
//         </div>
//       </GlassCard>

//       <SectionTitle icon={<Package size={16} />} title="Articles de cette catégorie" />
//       <GlassCard>
//         <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
//           {articles.length === 0 ? (
//             <EmptyLine text="Aucun article dans cette catégorie." />
//           ) : (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th style={thStyle}></th>
//                   <th style={thStyle}>Article</th>
//                   <th style={thStyle}>Marque / modèle</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {articles.slice(0, 12).map((it) => {
//                   const im = getArticleImageSrc(it);
//                   return (
//                     <tr
//                       key={it.id}
//                       style={{ cursor: "pointer" }}
//                       onClick={() => navigate(`/details/article/${it.id}`)}
//                     >
//                       <td style={tdStyle}>
//                         {im ? (
//                           <img
//                             src={im}
//                             alt=""
//                             style={{
//                               width: 40,
//                               height: 40,
//                               objectFit: "cover",
//                               borderRadius: 8,
//                             }}
//                             onError={(e) => {
//                               e.currentTarget.style.display = "none";
//                             }}
//                           />
//                         ) : (
//                           <Package size={18} color="var(--gradient-start)" />
//                         )}
//                       </td>
//                       <td style={{ ...tdStyle, fontWeight: 700 }}>{it.name}</td>
//                       <td style={tdStyle}>
//                         {[it.mark, it.modele].filter(Boolean).join(" · ") || "—"}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//           {articles.length > 12 && (
//             <p
//               style={{
//                 margin: "0.75rem 0 0",
//                 fontSize: "0.8rem",
//                 color: "var(--text-secondary)",
//                 textAlign: "center",
//               }}
//             >
//               + {articles.length - 12} autres — ouvrir la fiche complète
//             </p>
//           )}
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// function ArticleSlide({ item, onOpen }) {
//   const im = getArticleImageSrc(item);
//   return (
//     <GlassCard>
//       <div
//         style={{
//           display: "flex",
//           gap: "1.25rem",
//           padding: "1.5rem",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             width: 120,
//             height: 120,
//             borderRadius: 22,
//             overflow: "hidden",
//             flexShrink: 0,
//             background: "var(--glass-bg)",
//             border: "1px solid var(--glass-border)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 10px 28px rgba(0,0,0,.12)",
//           }}
//         >
//           {im ? (
//             <img
//               src={im}
//               alt=""
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               onError={(e) => {
//                 e.currentTarget.style.display = "none";
//               }}
//             />
//           ) : (
//             <ImageIcon size={36} color="var(--gradient-start)" />
//           )}
//         </div>
//         <div style={{ flex: 1, minWidth: 180 }}>
//           <div
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 900,
//               fontSize: "1.35rem",
//               color: "var(--text)",
//             }}
//           >
//             {designation(item)}
//           </div>
//           <div
//             style={{
//               marginTop: 10,
//               display: "flex",
//               gap: 8,
//               flexWrap: "wrap",
//             }}
//           >
//             <Badge color="var(--gradient-start)">ID #{item.id}</Badge>
//             <Badge color="#60a5fa">{item._catName || "—"}</Badge>
//             <Badge color="#4ade80">
//               <Boxes size={12} style={{ marginRight: 4 }} />
//               {convertirQuantite(item.stockReel, item)}
//             </Badge>
//           </div>
//           <InfoGrid
//             rows={[
//               { icon: Hash, label: "Prix vente", value: `${item.sale_price_fc ?? "—"} FC` },
//               { icon: Tag, label: "Catégorie", value: item._catName || "—" },
//               { icon: Info, label: "Niveau", value: item.level ?? "—" },
//             ]}
//           />
//           <button type="button" onClick={onOpen} style={btnOpen}>
//             <ExternalLink size={14} /> Fiche complète
//           </button>
//         </div>
//       </div>
//     </GlassCard>
//   );
// }

// function EntrepotSlide({ ent, onOpen }) {
//   return (
//     <GlassCard>
//       <div style={{ padding: "1.5rem" }}>
//         <div
//           style={{
//             display: "flex",
//             gap: 14,
//             alignItems: "center",
//             marginBottom: 12,
//           }}
//         >
//           <div
//             style={{
//               width: 72,
//               height: 72,
//               borderRadius: 18,
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 8px 22px var(--glow-color)",
//             }}
//           >
//             <Warehouse size={32} color="#fff" />
//           </div>
//           <div>
//             <div
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 900,
//                 fontSize: "1.3rem",
//                 color: "var(--text)",
//               }}
//             >
//               {ent.name || ent.reference || `Entrepôt #${ent.id}`}
//             </div>
//             <Badge color="#a78bfa">ID #{ent.id}</Badge>
//           </div>
//         </div>
//         <InfoGrid
//           rows={[
//             {
//               icon: Warehouse,
//               label: "Localisation",
//               value: ent.location || ent.localisation || ent.adresse || "—",
//             },
//             { icon: Hash, label: "Référence", value: ent.reference || "—" },
//             { icon: Boxes, label: "Capacité", value: ent.capacity ?? "—" },
//             { icon: Info, label: "Description", value: ent.description || "—" },
//           ]}
//         />
//         <button type="button" onClick={onOpen} style={btnOpen}>
//           <ExternalLink size={14} /> Fiche complète
//         </button>
//       </div>
//     </GlassCard>
//   );
// }

// function UserSlide({ user, onOpen }) {
//   const initials =
//     ((user.first_name || "")[0] || "") + ((user.name || "")[0] || "");
//   return (
//     <GlassCard>
//       <div
//         style={{
//           display: "flex",
//           gap: "1.2rem",
//           padding: "1.5rem",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: "50%",
//             background:
//               "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 900,
//             fontSize: "1.4rem",
//             color: "#fff",
//             boxShadow: "0 0 22px var(--glow-color)",
//           }}
//         >
//           {initials || "?"}
//         </div>
//         <div>
//           <div
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 900,
//               fontSize: "1.3rem",
//               color: "var(--text)",
//             }}
//           >
//             {user.first_name} {user.name}
//           </div>
//           <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: 4 }}>
//             {user.role || "Utilisateur"} · {user.email || "—"}
//           </div>
//           <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
//             <Badge color="#fbbf24">ID #{user.id}</Badge>
//           </div>
//           <button type="button" onClick={onOpen} style={btnOpen}>
//             <ExternalLink size={14} /> Fiche complète
//           </button>
//         </div>
//       </div>
//     </GlassCard>
//   );
// }

// function MouvementSlide({ m, onOpen }) {
//   return (
//     <GlassCard>
//       <div style={{ padding: "1.5rem" }}>
//         <div
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 900,
//             fontSize: "1.25rem",
//             color: "var(--text)",
//             marginBottom: 10,
//           }}
//         >
//           {m.type || "Mouvement"} · {String(m.date || m.created_at || "").slice(0, 10)}
//         </div>
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
//           <Badge color="#34d399">{m.type || "—"}</Badge>
//           <Badge color="#60a5fa">Qté {m.qty ?? "—"}</Badge>
//           <Badge color="var(--text-secondary)">Article #{m.item_id}</Badge>
//         </div>
//         <InfoGrid
//           rows={[
//             { icon: Package, label: "Article ID", value: m.item_id ?? "—" },
//             { icon: Warehouse, label: "Entrepôt", value: m.entrepot_id ?? "—" },
//             { icon: Info, label: "Nature", value: m.nature || "—" },
//           ]}
//         />
//         <button type="button" onClick={onOpen} style={btnOpen}>
//           <ExternalLink size={14} /> Fiche complète
//         </button>
//       </div>
//     </GlassCard>
//   );
// }

// /* ========== UI ATOMS (comme Details) ========== */
// function GlassCard({ children }) {
//   return (
//     <div
//       style={{
//         position: "relative",
//         borderRadius: 24,
//         background: "var(--card-bg)",
//         backdropFilter: "blur(35px)",
//         border: "1px solid var(--glass-border)",
//         overflow: "hidden",
//         boxShadow: "0 16px 40px rgba(0,0,0,.14)",
//         marginBottom: "1rem",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// function SectionTitle({ icon, title }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//         margin: "1.1rem 0 0.65rem",
//         color: "var(--gradient-start)",
//         fontFamily: "Syne, sans-serif",
//         fontWeight: 800,
//         fontSize: "0.95rem",
//       }}
//     >
//       {icon}
//       {title}
//     </div>
//   );
// }

// function Badge({ children, color }) {
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         padding: "0.28rem 0.7rem",
//         borderRadius: 999,
//         fontSize: "0.72rem",
//         fontWeight: 700,
//         color,
//         background: `color-mix(in srgb, ${color} 14%, transparent)`,
//         border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
//       }}
//     >
//       {children}
//     </span>
//   );
// }

// function InfoGrid({ rows }) {
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
//         gap: "0.75rem",
//         marginTop: 14,
//       }}
//     >
//       {rows.map((r, i) => {
//         const Icon = r.icon;
//         return (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               gap: 10,
//               padding: "0.7rem 0.8rem",
//               borderRadius: 14,
//               background: "var(--glass-bg)",
//               border: "1px solid var(--glass-border)",
//             }}
//           >
//             <div
//               style={{
//                 width: 34,
//                 height: 34,
//                 borderRadius: 10,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background:
//                   "linear-gradient(145deg, color-mix(in srgb, var(--gradient-start) 55%, #fff 5%), color-mix(in srgb, var(--gradient-start) 25%, transparent))",
//                 color: "#fff",
//                 flexShrink: 0,
//                 boxShadow: "0 4px 12px var(--glow-color)",
//               }}
//             >
//               <Icon size={14} />
//             </div>
//             <div style={{ minWidth: 0 }}>
//               <div
//                 style={{
//                   fontSize: "0.68rem",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   color: "var(--text-secondary)",
//                 }}
//               >
//                 {r.label}
//               </div>
//               <div
//                 style={{
//                   fontSize: "0.88rem",
//                   fontWeight: 600,
//                   color: "var(--text)",
//                   marginTop: 2,
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {r.value}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function EmptyLine({ text }) {
//   return (
//     <div
//       style={{
//         padding: "1.2rem",
//         textAlign: "center",
//         color: "var(--text-secondary)",
//         fontSize: "0.88rem",
//       }}
//     >
//       {text}
//     </div>
//   );
// }

// const topBtn = {
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 6,
//   padding: "0.45rem 0.85rem",
//   borderRadius: 12,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--text-secondary)",
//   fontSize: "0.8rem",
//   fontWeight: 600,
//   cursor: "pointer",
//   backdropFilter: "blur(12px)",
// };

// const arrowBtn = {
//   width: 52,
//   height: 52,
//   borderRadius: 16,
//   border: "1px solid var(--glass-border)",
//   background: "var(--card-bg)",
//   color: "var(--text)",
//   cursor: "pointer",
//   display: "grid",
//   placeItems: "center",
//   boxShadow: "0 8px 24px rgba(0,0,0,.1)",
// };

// const btnOpen = {
//   marginTop: 14,
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   padding: "0.55rem 1rem",
//   borderRadius: 12,
//   border: "none",
//   background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//   color: "#fff",
//   fontWeight: 700,
//   fontSize: "0.85rem",
//   cursor: "pointer",
//   boxShadow: "0 8px 22px var(--glow-color)",
// };

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   fontSize: "0.88rem",
// };

// const thStyle = {
//   textAlign: "left",
//   padding: "0.55rem 0.6rem",
//   borderBottom: "1px solid var(--glass-border)",
//   color: "var(--text-secondary)",
//   fontSize: "0.72rem",
//   fontWeight: 700,
//   textTransform: "uppercase",
//   letterSpacing: "0.04em",
// };

// const tdStyle = {
//   padding: "0.65rem 0.6rem",
//   borderBottom: "1px solid var(--glass-border)",
//   color: "var(--text)",
//   verticalAlign: "middle",
// };









/**
 * DetailsCarousel — Detail All
 * Route : /details/:type/all
 *
 * Même identité visuelle que Details.jsx :
 * ThemeBackground, GlassCard, badges, icônes image catégorie/article,
 * flèches ↑↓, fiche complète, export PDF simple de la fiche courante.
 */

import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Package,
  Tag,
  Warehouse,
  Users,
  ArrowLeftRight,
  Layers,
  ExternalLink,
  Download,
  Image as ImageIcon,
  Hash,
  Info,
  Boxes,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const getItems = api.getItems;
const getCategories = api.getCategories;
const getEntrepots = api.getEntrepots;
const getUsers = api.getUsers;
const getStocks =
  typeof api.getStocks === "function"
    ? api.getStocks
    : async () => ({ data: [] });
const getMouvementsRecents =
  typeof api.getMouvementsRecents === "function"
    ? api.getMouvementsRecents
    : async () => ({ data: [] });
const getStockAjustments =
  typeof api.getStockAjustments === "function"
    ? api.getStockAjustments
    : typeof api.getAjustements === "function"
    ? api.getAjustements
    : async () => ({ data: [] });

const APP_NAME = "StockFlow";
const COMPANY_NAME = "L'étoile du matin";

/* ========== HELPERS (alignés Details.jsx) ========== */
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
    let p = String(item.picture_path).replace(/\\/g, "/").replace(/^\/+/, "");
    if (p.includes("/")) p = p.split("/").pop();
    if (!p.startsWith("items/") && !p.startsWith("images/")) p = `items/${p}`;
    if (p.startsWith("images/")) return `/${p}`;
    return `/images/${p}`;
  }
  const base = buildImageFileName(item);
  return base ? `/images/items/${base}.jpg` : null;
}

function toIconSrc(icon) {
  if (!icon || typeof icon !== "string") return null;
  let s = icon.trim();
  if (!s) return null;
  if (
    s.startsWith("data:") ||
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("blob:")
  )
    return s;
  if (s.startsWith("/") && s.length < 400) return s;
  if (s.length <= 8) return null;
  if (s.toLowerCase().startsWith("base64,")) s = s.slice(7);
  const clean = s.replace(/\s/g, "");
  if (clean.length < 16) return null;
  const mime = clean.startsWith("/9j/")
    ? "image/jpeg"
    : clean.startsWith("R0lGOD")
    ? "image/gif"
    : "image/png";
  return `data:${mime};base64,${clean}`;
}

function designation(item) {
  if (!item) return "—";
  return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
}

function parseCategoryName(cat) {
  const raw = cat?.name || "";
  const parts = raw.split(" ");
  const firstIsEmoji = parts[0] && parts[0].length <= 2;
  return {
    emoji: firstIsEmoji ? parts[0] : null,
    name: firstIsEmoji ? parts.slice(1).join(" ") || raw : raw,
  };
}

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

const calculerStockTotal = (itemId, stocks, mouvements, stock_ajustments) => {
  const itemIdNum = Number(itemId);
  const entrepots = new Set();
  (stocks || [])
    .filter((s) => Number(s.item_id) === itemIdNum && Number(s.deleted ?? 0) === 0)
    .forEach((s) => entrepots.add(Number(s.entrepot_id)));
  (mouvements || [])
    .filter((m) => Number(m.item_id) === itemIdNum && Number(m.deleted ?? 0) === 0)
    .forEach((m) => entrepots.add(Number(m.entrepot_id)));
  (stock_ajustments || [])
    .filter((a) => Number(a.item_id) === itemIdNum && Number(a.deleted ?? 0) === 0)
    .forEach((a) => entrepots.add(Number(a.entrepot_id)));

  let total = 0;
  entrepots.forEach((entrepotId) => {
    const stock = (stocks || []).find(
      (s) =>
        Number(s.item_id) === itemIdNum &&
        Number(s.entrepot_id) === entrepotId &&
        Number(s.deleted ?? 0) === 0
    );
    let q = Number(stock?.stock_actual ?? 0);
    (mouvements || [])
      .filter(
        (m) =>
          Number(m.item_id) === itemIdNum &&
          Number(m.entrepot_id) === entrepotId &&
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
          Number(a.entrepot_id) === entrepotId &&
          Number(a.deleted ?? 0) === 0
      )
      .forEach((a) => {
        const qty = Number(a.qty ?? 0);
        if (a.type === "Entrée") q += qty;
        else if (a.type === "Sortie") q -= qty;
      });
    total += q;
  });
  return total;
};

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function loadJsPDF() {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
  );
  if (!window.jspdf?.jsPDF) throw new Error("jsPDF non chargé");
  return window.jspdf.jsPDF;
}

/** Charge une image (URL relative/absolue/data) en dataURL pour jsPDF */
function loadImageAsDataUrl(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    if (String(src).startsWith("data:")) {
      resolve(src);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const max = 320;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > max || h > max) {
          const r = Math.min(max / w, max / h);
          w = Math.round(w * r);
          h = Math.round(h * r);
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    try {
      img.src = new URL(src, window.location.origin).href;
    } catch {
      img.src = src;
    }
  });
}

const TYPE_META = {
  categorie: { label: "Catégorie", icon: Tag, color: "#60a5fa", badge: "CATÉGORIE" },
  article: { label: "Article", icon: Package, color: "var(--gradient-start)", badge: "ARTICLE" },
  entrepot: { label: "Entrepôt", icon: Warehouse, color: "#a78bfa", badge: "ENTREPÔT" },
  utilisateur: { label: "Utilisateur", icon: Users, color: "#fbbf24", badge: "UTILISATEUR" },
  mouvement: { label: "Mouvement", icon: ArrowLeftRight, color: "#34d399", badge: "MOUVEMENT" },
};

/* ========== PAGE ========== */
export default function DetailsCarousel() {
  const { type } = useParams();
  const navigate = useNavigate();
  const theme =
    (typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const meta = TYPE_META[type] || {
    label: type || "Élément",
    icon: Info,
    color: "var(--gradient-start)",
    badge: "DÉTAIL",
  };
  const MetaIcon = meta.icon;

  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ctx, setCtx] = useState({ stocks: [], mouvements: [], ajustements: [], categories: [] });
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [stocksRes, mvtRes, ajRes] = await Promise.all([
          getStocks().catch(() => ({ data: [] })),
          getMouvementsRecents().catch(() => ({ data: [] })),
          getStockAjustments().catch(() => ({ data: [] })),
        ]);
        const stocks = stocksRes.data || [];
        const mouvements = mvtRes.data || [];
        const ajustements = ajRes.data || [];

        let list = [];
        let categories = [];

        if (type === "categorie") {
          const [cr, ir] = await Promise.all([
            getCategories(),
            getItems().catch(() => ({ data: [] })),
          ]);
          categories = (cr.data || []).filter((c) => Number(c.deleted ?? 0) === 0);
          const allItems = (ir.data || []).filter((i) => Number(i.deleted ?? 0) === 0);
          list = categories
            .map((c) => ({
              ...c,
              _articles: allItems.filter(
                (i) => Number(i.category_item) === Number(c.id)
              ),
            }))
            .sort((a, b) =>
              parseCategoryName(a).name.localeCompare(
                parseCategoryName(b).name,
                "fr",
                { sensitivity: "base" }
              )
            );
        } else if (type === "article") {
          const [ir, cr] = await Promise.all([
            getItems(),
            getCategories().catch(() => ({ data: [] })),
          ]);
          categories = cr.data || [];
          list = (ir.data || [])
            .filter((i) => Number(i.deleted ?? 0) === 0)
            .map((i) => ({
              ...i,
              stockReel: calculerStockTotal(i.id, stocks, mouvements, ajustements),
              _catName:
                (categories.find((c) => Number(c.id) === Number(i.category_item)) || {})
                  .name || "—",
            }))
            .sort((a, b) =>
              String(a.name || "").localeCompare(String(b.name || ""), "fr")
            );
        } else if (type === "entrepot") {
          const er = await getEntrepots();
          list = (er.data || [])
            .filter((e) => Number(e.deleted ?? 0) === 0)
            .sort((a, b) =>
              String(a.name || a.reference || "").localeCompare(
                String(b.name || b.reference || ""),
                "fr"
              )
            );
        } else if (type === "utilisateur") {
          const ur = await getUsers();
          list = (ur.data || [])
            .filter((u) => Number(u.deleted ?? 0) === 0)
            .sort((a, b) =>
              String(a.name || "").localeCompare(String(b.name || ""), "fr")
            );
        } else if (type === "mouvement") {
          list = (mouvements || [])
            .filter((m) => Number(m.deleted ?? 0) === 0)
            .sort((a, b) =>
              String(b.date || b.created_at || "").localeCompare(
                String(a.date || a.created_at || "")
              )
            );
        } else {
          throw new Error(`Type non supporté : ${type}`);
        }

        if (!cancelled) {
          setItems(list);
          setIndex(0);
          setCtx({ stocks, mouvements, ajustements, categories });
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type]);

  const current = items[index] || null;

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? Math.max(items.length - 1, 0) : i - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((i) => (i >= items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const titleOf = useCallback(
    (row) => {
      if (!row) return "—";
      if (type === "categorie") return parseCategoryName(row).name;
      if (type === "article") return designation(row);
      if (type === "entrepot") return row.name || row.reference || `#${row.id}`;
      if (type === "utilisateur")
        return `${row.first_name || ""} ${row.name || ""}`.trim() || row.email;
      if (type === "mouvement")
        return `${row.type || "Mvt"} · ${String(row.date || "").slice(0, 10)}`;
      return `#${row.id}`;
    },
    [type]
  );

  const handlePdf = useCallback(async () => {
    if (!items.length || pdfBusy) return;
    setPdfBusy(true);
    try {
      const JsPDF = await loadJsPDF();
      const doc = new JsPDF({ unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 14;
      const indigo = [79, 70, 229];
      const slate = [51, 65, 85];
      const muted = [100, 116, 139];

      const ensure = (need = 12) => {
        if (y + need > pageH - 16) {
          doc.addPage();
          y = margin;
        }
      };

      // —— En-tête global ——
      doc.setFillColor(...indigo);
      doc.rect(0, 0, pageW, 26, "F");
      doc.setFillColor(165, 180, 252);
      doc.rect(0, 26, pageW, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text(`${APP_NAME} · ${COMPANY_NAME}`, margin, 12);
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(
        `Detail All · ${meta.label} · ${items.length} élément(s)`,
        margin,
        20
      );
      doc.text(
        new Date().toLocaleString("fr-FR"),
        pageW - margin,
        20,
        { align: "right" }
      );

      let y = 36;

      for (let i = 0; i < items.length; i++) {
        const row = items[i];
        ensure(42);

        // Bandeau fiche
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(margin, y - 4, pageW - margin * 2, 8, 2, 2, "F");
        doc.setTextColor(...indigo);
        doc.setFontSize(11);
        doc.setFont(undefined, "bold");
        doc.text(`${i + 1}/${items.length} · ${String(titleOf(row)).slice(0, 60)}`, margin + 2, y + 2);
        y += 12;

        // Image selon type
        let imgSrc = null;
        if (type === "categorie") imgSrc = toIconSrc(row.icon);
        if (type === "article") imgSrc = getArticleImageSrc(row);
        if (imgSrc) {
          const dataUrl = await loadImageAsDataUrl(imgSrc);
          if (dataUrl) {
            ensure(32);
            try {
              const fmt = dataUrl.includes("png") ? "PNG" : "JPEG";
              doc.addImage(dataUrl, fmt, margin, y, 22, 22);
            } catch {
              /* ignore image errors */
            }
          }
        }

        const textX = imgSrc ? margin + 28 : margin;
        doc.setTextColor(...slate);
        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc.text(String(titleOf(row)).slice(0, 70), textX, y + 6);
        doc.setFont(undefined, "normal");
        doc.setFontSize(9);
        doc.setTextColor(...muted);

        const lines = [];
        if (type === "categorie") {
          lines.push(`ID #${row.id}`);
          lines.push(`Description : ${(row.description || "—").toString().slice(0, 90)}`);
          lines.push(`Articles liés : ${(row._articles || []).length}`);
        } else if (type === "article") {
          lines.push(`ID #${row.id} · Catégorie : ${row._catName || "—"}`);
          lines.push(`Stock : ${convertirQuantite(row.stockReel, row)}`);
          lines.push(`Prix vente : ${row.sale_price_fc ?? "—"} FC`);
        } else if (type === "entrepot") {
          lines.push(`ID #${row.id}`);
          lines.push(`Localisation : ${row.location || row.localisation || row.adresse || "—"}`);
          lines.push(`Référence : ${row.reference || "—"} · Capacité : ${row.capacity ?? "—"}`);
        } else if (type === "utilisateur") {
          lines.push(`ID #${row.id}`);
          lines.push(`Email : ${row.email || "—"}`);
          lines.push(`Rôle : ${row.role || "—"}`);
        } else if (type === "mouvement") {
          lines.push(`ID #${row.id} · Article #${row.item_id ?? "—"}`);
          lines.push(`Type : ${row.type || "—"} · Qté : ${row.qty ?? "—"}`);
          lines.push(`Date : ${String(row.date || row.created_at || "—").slice(0, 16)}`);
          lines.push(`Nature : ${row.nature || "—"}`);
        }

        let ty = y + 12;
        lines.forEach((line) => {
          ensure(7);
          if (ty > pageH - 16) {
            doc.addPage();
            ty = margin;
          }
          doc.text(String(line).slice(0, 95), textX, ty);
          ty += 5.5;
        });

        y = Math.max(ty, y + (imgSrc ? 28 : 8)) + 6;

        // Ligne séparatrice
        ensure(4);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageW - margin, y);
        y += 8;
      }

      // Pied de page sur dernière page
      const total = doc.internal.getNumberOfPages();
      for (let p = 1; p <= total; p++) {
        doc.setPage(p);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `${APP_NAME} — Detail All ${meta.label} — page ${p}/${total}`,
          margin,
          pageH - 8
        );
      }

      doc.save(`StockFlow_DetailAll_${type}_${items.length}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Export PDF impossible.");
    } finally {
      setPdfBusy(false);
    }
  }, [items, pdfBusy, type, meta.label, titleOf]);


  const css =
    typeof themeCssVars === "function" ? themeCssVars(theme) : {};

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100%",
        width: "100%",
        ...css,
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
        <ThemeBackground theme={theme} />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 920,
          margin: "0 auto",
          padding: "0 16px 2.5rem",
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginTop: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <button type="button" onClick={() => navigate(-1)} style={topBtn}>
            <ArrowLeft size={16} /> Retour
          </button>
          <button
            type="button"
            onClick={handlePdf}
            disabled={!current || pdfBusy}
            style={{
              ...topBtn,
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              border: "none",
              boxShadow: "0 8px 22px var(--glow-color)",
              opacity: !current || pdfBusy ? 0.7 : 1,
            }}
          >
            <Download size={16} />
            {pdfBusy ? "Export…" : `Exporter tout (${items.length || 0})`}
          </button>
        </div>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1.25rem",
            gap: "0.65rem",
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
              background: `linear-gradient(145deg, ${meta.color}, var(--gradient-end))`,
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
            <MetaIcon size={30} />
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
              color: meta.color,
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            <Layers size={12} /> Detail All · {meta.badge}
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.45rem, 3.2vw, 2rem)",
              fontWeight: 900,
              margin: 0,
              background:
                "linear-gradient(135deg, var(--text), var(--gradient-start))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {meta.label}
            {loading ? "" : ` · ${items.length}`}
          </h1>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              maxWidth: 480,
            }}
          >
            Parcourez toutes les fiches une par une. Flèches ↑ ↓ ou boutons.
          </p>
        </div>

        {/* ARROW UP */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <button
            type="button"
            onClick={prev}
            disabled={!items.length}
            style={arrowBtn}
            title="Précédent"
          >
            <ChevronUp size={28} />
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <GlassCard>
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              Chargement…
            </div>
          </GlassCard>
        ) : error ? (
          <GlassCard>
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#f87171",
              }}
            >
              ⚠ {error}
            </div>
          </GlassCard>
        ) : !current ? (
          <GlassCard>
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              Aucun élément.
            </div>
          </GlassCard>
        ) : (
          <>
            <div
              style={{
                textAlign: "center",
                marginBottom: 10,
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                fontWeight: 600,
              }}
            >
              {index + 1} / {items.length}
            </div>

            {type === "categorie" && (
              <CategorieSlide
                cat={current}
                navigate={navigate}
                onOpen={() => navigate(`/details/categorie/${current.id}`)}
              />
            )}
            {type === "article" && (
              <ArticleSlide
                item={current}
                navigate={navigate}
                onOpen={() => navigate(`/details/article/${current.id}`)}
              />
            )}
            {type === "entrepot" && (
              <EntrepotSlide
                ent={current}
                onOpen={() => navigate(`/details/entrepot/${current.id}`)}
              />
            )}
            {type === "utilisateur" && (
              <UserSlide
                user={current}
                onOpen={() => navigate(`/details/utilisateur/${current.id}`)}
              />
            )}
            {type === "mouvement" && (
              <MouvementSlide
                m={current}
                onOpen={() => navigate(`/details/mouvement/${current.id}`)}
              />
            )}
          </>
        )}

        {/* ARROW DOWN */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <button
            type="button"
            onClick={next}
            disabled={!items.length}
            style={arrowBtn}
            title="Suivant"
          >
            <ChevronDown size={28} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

/* ========== SLIDES ========== */
function CategorieSlide({ cat, navigate, onOpen }) {
  const { emoji, name } = parseCategoryName(cat);
  const imgSrc = toIconSrc(cat.icon);
  const short =
    cat.icon && String(cat.icon).trim().length <= 8
      ? String(cat.icon).trim()
      : null;
  const articles = cat._articles || [];

  return (
    <>
      <GlassCard>
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            padding: "1.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 22,
              flexShrink: 0,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 28px var(--glow-color)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 12,
                width: 22,
                height: 10,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.4)",
                transform: "rotate(-20deg)",
              }}
            />
            {imgSrc ? (
              <img
                src={imgSrc}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span style={{ fontSize: "2.4rem", lineHeight: 1 }}>
                {short || emoji || "📂"}
              </span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "1.45rem",
                color: "var(--text)",
              }}
            >
              {name}
            </div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Badge color="#60a5fa">ID #{cat.id}</Badge>
              <Badge color="#4ade80">
                {articles.length} article{articles.length > 1 ? "s" : ""}
              </Badge>
            </div>
            {cat.description && (
              <p
                style={{
                  marginTop: 12,
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.45,
                }}
              >
                {cat.description}
              </p>
            )}
            <button type="button" onClick={onOpen} style={btnOpen}>
              <ExternalLink size={14} /> Fiche complète
            </button>
          </div>
        </div>
      </GlassCard>

      <SectionTitle icon={<Package size={16} />} title="Articles de cette catégorie" />
      <GlassCard>
        <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
          {articles.length === 0 ? (
            <EmptyLine text="Aucun article dans cette catégorie." />
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}></th>
                  <th style={thStyle}>Article</th>
                  <th style={thStyle}>Marque / modèle</th>
                </tr>
              </thead>
              <tbody>
                {articles.slice(0, 12).map((it) => {
                  const im = getArticleImageSrc(it);
                  return (
                    <tr
                      key={it.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/details/article/${it.id}`)}
                    >
                      <td style={tdStyle}>
                        {im ? (
                          <img
                            src={im}
                            alt=""
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <Package size={18} color="var(--gradient-start)" />
                        )}
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>{it.name}</td>
                      <td style={tdStyle}>
                        {[it.mark, it.modele].filter(Boolean).join(" · ") || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {articles.length > 12 && (
            <p
              style={{
                margin: "0.75rem 0 0",
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                textAlign: "center",
              }}
            >
              + {articles.length - 12} autres — ouvrir la fiche complète
            </p>
          )}
        </div>
      </GlassCard>
    </>
  );
}

function ArticleSlide({ item, onOpen }) {
  const im = getArticleImageSrc(item);
  return (
    <GlassCard>
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          padding: "1.5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 22,
            overflow: "hidden",
            flexShrink: 0,
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 28px rgba(0,0,0,.12)",
          }}
        >
          {im ? (
            <img
              src={im}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <ImageIcon size={36} color="var(--gradient-start)" />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: "1.35rem",
              color: "var(--text)",
            }}
          >
            {designation(item)}
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <Badge color="var(--gradient-start)">ID #{item.id}</Badge>
            <Badge color="#60a5fa">{item._catName || "—"}</Badge>
            <Badge color="#4ade80">
              <Boxes size={12} style={{ marginRight: 4 }} />
              {convertirQuantite(item.stockReel, item)}
            </Badge>
          </div>
          <InfoGrid
            rows={[
              { icon: Hash, label: "Prix vente", value: `${item.sale_price_fc ?? "—"} FC` },
              { icon: Tag, label: "Catégorie", value: item._catName || "—" },
              { icon: Info, label: "Niveau", value: item.level ?? "—" },
            ]}
          />
          <button type="button" onClick={onOpen} style={btnOpen}>
            <ExternalLink size={14} /> Fiche complète
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

function EntrepotSlide({ ent, onOpen }) {
  return (
    <GlassCard>
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 22px var(--glow-color)",
            }}
          >
            <Warehouse size={32} color="#fff" />
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "1.3rem",
                color: "var(--text)",
              }}
            >
              {ent.name || ent.reference || `Entrepôt #${ent.id}`}
            </div>
            <Badge color="#a78bfa">ID #{ent.id}</Badge>
          </div>
        </div>
        <InfoGrid
          rows={[
            {
              icon: Warehouse,
              label: "Localisation",
              value: ent.location || ent.localisation || ent.adresse || "—",
            },
            { icon: Hash, label: "Référence", value: ent.reference || "—" },
            { icon: Boxes, label: "Capacité", value: ent.capacity ?? "—" },
            { icon: Info, label: "Description", value: ent.description || "—" },
          ]}
        />
        <button type="button" onClick={onOpen} style={btnOpen}>
          <ExternalLink size={14} /> Fiche complète
        </button>
      </div>
    </GlassCard>
  );
}

function UserSlide({ user, onOpen }) {
  const initials =
    ((user.first_name || "")[0] || "") + ((user.name || "")[0] || "");
  return (
    <GlassCard>
      <div
        style={{
          display: "flex",
          gap: "1.2rem",
          padding: "1.5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: "1.4rem",
            color: "#fff",
            boxShadow: "0 0 22px var(--glow-color)",
          }}
        >
          {initials || "?"}
        </div>
        <div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: "1.3rem",
              color: "var(--text)",
            }}
          >
            {user.first_name} {user.name}
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: 4 }}>
            {user.role || "Utilisateur"} · {user.email || "—"}
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <Badge color="#fbbf24">ID #{user.id}</Badge>
          </div>
          <button type="button" onClick={onOpen} style={btnOpen}>
            <ExternalLink size={14} /> Fiche complète
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

function MouvementSlide({ m, onOpen }) {
  return (
    <GlassCard>
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: "1.25rem",
            color: "var(--text)",
            marginBottom: 10,
          }}
        >
          {m.type || "Mouvement"} · {String(m.date || m.created_at || "").slice(0, 10)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <Badge color="#34d399">{m.type || "—"}</Badge>
          <Badge color="#60a5fa">Qté {m.qty ?? "—"}</Badge>
          <Badge color="var(--text-secondary)">Article #{m.item_id}</Badge>
        </div>
        <InfoGrid
          rows={[
            { icon: Package, label: "Article ID", value: m.item_id ?? "—" },
            { icon: Warehouse, label: "Entrepôt", value: m.entrepot_id ?? "—" },
            { icon: Info, label: "Nature", value: m.nature || "—" },
          ]}
        />
        <button type="button" onClick={onOpen} style={btnOpen}>
          <ExternalLink size={14} /> Fiche complète
        </button>
      </div>
    </GlassCard>
  );
}

/* ========== UI ATOMS (comme Details) ========== */
function GlassCard({ children }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 24,
        background: "var(--card-bg)",
        backdropFilter: "blur(35px)",
        border: "1px solid var(--glass-border)",
        overflow: "hidden",
        boxShadow: "0 16px 40px rgba(0,0,0,.14)",
        marginBottom: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "1.1rem 0 0.65rem",
        color: "var(--gradient-start)",
        fontFamily: "Syne, sans-serif",
        fontWeight: 800,
        fontSize: "0.95rem",
      }}
    >
      {icon}
      {title}
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.28rem 0.7rem",
        borderRadius: 999,
        fontSize: "0.72rem",
        fontWeight: 700,
        color,
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

function InfoGrid({ rows }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "0.75rem",
        marginTop: 14,
      }}
    >
      {rows.map((r, i) => {
        const Icon = r.icon;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "0.7rem 0.8rem",
              borderRadius: 14,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(145deg, color-mix(in srgb, var(--gradient-start) 55%, #fff 5%), color-mix(in srgb, var(--gradient-start) 25%, transparent))",
                color: "#fff",
                flexShrink: 0,
                boxShadow: "0 4px 12px var(--glow-color)",
              }}
            >
              <Icon size={14} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginTop: 2,
                  wordBreak: "break-word",
                }}
              >
                {r.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyLine({ text }) {
  return (
    <div
      style={{
        padding: "1.2rem",
        textAlign: "center",
        color: "var(--text-secondary)",
        fontSize: "0.88rem",
      }}
    >
      {text}
    </div>
  );
}

const topBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "0.45rem 0.85rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--text-secondary)",
  fontSize: "0.8rem",
  fontWeight: 600,
  cursor: "pointer",
  backdropFilter: "blur(12px)",
};

const arrowBtn = {
  width: 52,
  height: 52,
  borderRadius: 16,
  border: "1px solid var(--glass-border)",
  background: "var(--card-bg)",
  color: "var(--text)",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,.1)",
};

const btnOpen = {
  marginTop: 14,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "0.55rem 1rem",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer",
  boxShadow: "0 8px 22px var(--glow-color)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.88rem",
};

const thStyle = {
  textAlign: "left",
  padding: "0.55rem 0.6rem",
  borderBottom: "1px solid var(--glass-border)",
  color: "var(--text-secondary)",
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const tdStyle = {
  padding: "0.65rem 0.6rem",
  borderBottom: "1px solid var(--glass-border)",
  color: "var(--text)",
  verticalAlign: "middle",
};
