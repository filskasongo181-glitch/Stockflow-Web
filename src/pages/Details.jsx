// /**
//  * Details — /details/:type/:id
//  * Style unifié + stocks réels + tableaux liés + export PDF
//  * Entreprise : L'étoile du matin · App : StockFlow
//  */
// import { useEffect, useState, useMemo, useCallback } from "react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Package,
//   Tag,
//   Warehouse,
//   Users,
//   ArrowLeftRight,
//   BarChart3,
//   Image as ImageIcon,
//   Calendar,
//   Hash,
//   DollarSign,
//   Boxes,
//   AlertTriangle,
//   CheckCircle,
//   TrendingUp,
//   TrendingDown,
//   Activity,
//   Mail,
//   Shield,
//   Clock,
//   Info,
//   Download,
//   Layers,
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
//       ? api.getAjustements
//       : async () => ({ data: [] });

// const APP_NAME = "StockFlow";
// const COMPANY_NAME = "L'étoile du matin";

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
//       ? "image/gif"
//       : "image/png";
//   return `data:${mime};base64,${clean}`;
// }

// function formatDateFr(iso) {
//   if (!iso || iso === "—") return "—";
//   const s = String(iso).slice(0, 10);
//   const parts = s.split("-");
//   if (parts.length !== 3) return s;
//   const [y, m, d] = parts;
//   const mois = [
//     "janvier",
//     "février",
//     "mars",
//     "avril",
//     "mai",
//     "juin",
//     "juillet",
//     "août",
//     "septembre",
//     "octobre",
//     "novembre",
//     "décembre",
//   ];
//   const mi = parseInt(m, 10) - 1;
//   if (mi < 0 || mi > 11) return s;
//   return `${parseInt(d, 10)} ${mois[mi]} ${y}`;
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

// const calculerStockTotal = (itemId, stocks, mouvements, stock_ajustments) => {
//   const itemIdNum = Number(itemId);
//   const entrepots = new Set();
//   (stocks || [])
//     .filter(
//       (s) =>
//         Number(s.item_id) === itemIdNum && Number(s.deleted ?? 0) === 0
//     )
//     .forEach((s) => entrepots.add(Number(s.entrepot_id)));
//   (mouvements || [])
//     .filter(
//       (m) =>
//         Number(m.item_id) === itemIdNum && Number(m.deleted ?? 0) === 0
//     )
//     .forEach((m) => entrepots.add(Number(m.entrepot_id)));
//   (stock_ajustments || [])
//     .filter(
//       (a) =>
//         Number(a.item_id) === itemIdNum && Number(a.deleted ?? 0) === 0
//     )
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

// /** Stock réel d'un article dans UN entrepôt */
// function stockReelEntrepot(itemId, entrepotId, stocks, mouvements, ajustements) {
//   const stock = (stocks || []).find(
//     (s) =>
//       Number(s.item_id) === Number(itemId) &&
//       Number(s.entrepot_id) === Number(entrepotId) &&
//       Number(s.deleted ?? 0) === 0
//   );
//   let q = Number(stock?.stock_actual ?? 0);
//   [...(mouvements || []), ...(ajustements || [])]
//     .filter(
//       (m) =>
//         Number(m.item_id) === Number(itemId) &&
//         Number(m.entrepot_id) === Number(entrepotId) &&
//         Number(m.deleted ?? 0) === 0
//     )
//     .forEach((m) => {
//       const qty = Number(m.qty ?? 0);
//       if (m.type === "Entrée") q += qty;
//       else if (m.type === "Sortie") q -= qty;
//     });
//   return q;
// }

// const TYPE_META = {
//   jour: { label: "Mouvements du jour", icon: Calendar, badge: "JOUR", color: "var(--gradient-start)" },
//   article: { label: "Article", icon: Package, badge: "ARTICLE", color: "var(--gradient-start)" },
//   categorie: { label: "Catégorie", icon: Tag, badge: "CATÉGORIE", color: "#60a5fa" },
//   entrepot: { label: "Entrepôt", icon: Warehouse, badge: "ENTREPÔT", color: "#a78bfa" },
//   mouvement: { label: "Mouvement", icon: ArrowLeftRight, badge: "MOUVEMENT", color: "#34d399" },
//   utilisateur: { label: "Utilisateur", icon: Users, badge: "UTILISATEUR", color: "#fbbf24" },
// };

// function Details() {
//   const { type, id } = useParams();
//   const [searchParams] = useSearchParams();
//   const kind = searchParams.get("kind") || "recent";
//   const navigate = useNavigate();
//   const theme =
//     (typeof sessionStorage !== "undefined" &&
//       sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [data, setData] = useState(null);
//   const [related, setRelated] = useState({});

//   const meta = TYPE_META[type] || {
//     label: type || "Détail",
//     icon: Info,
//     badge: "DÉTAIL",
//     color: "var(--gradient-start)",
//   };
//   const MetaIcon = meta.icon;

//   useEffect(() => {
//     let cancelled = false;
//     async function load() {
//       setLoading(true);
//       setError("");
//       setData(null);
//       try {
//         if (type !== "jour") {
//           const entityId = Number(id);
//           if (!entityId) throw new Error("Identifiant invalide");
//         }
//         const entityId = type === "jour" ? id : Number(id);

//         const [stocksRes, mvtRes, ajRes] = await Promise.all([
//           getStocks().catch(() => ({ data: [] })),
//           getMouvementsRecents().catch(() => ({ data: [] })),
//           getStockAjustments().catch(() => ({ data: [] })),
//         ]);
//         const stocks = stocksRes.data || [];
//         const mouvements = mvtRes.data || [];
//         const ajustements = ajRes.data || [];

//         if (type === "article") {
//           const [itemsRes, catsRes, entRes] = await Promise.all([
//             getItems(),
//             getCategories().catch(() => ({ data: [] })),
//             getEntrepots().catch(() => ({ data: [] })),
//           ]);
//           const item = (itemsRes.data || []).find(
//             (i) => Number(i.id) === entityId
//           );
//           if (!item) throw new Error("Article introuvable");
//           const cat = (catsRes.data || []).find(
//             (c) => Number(c.id) === Number(item.category_item)
//           );
//           const stock = calculerStockTotal(
//             item.id,
//             stocks,
//             mouvements,
//             ajustements
//           );
//           const mvtItem = [
//             ...mouvements
//               .filter(
//                 (m) =>
//                   Number(m.item_id) === entityId &&
//                   Number(m.deleted ?? 0) === 0
//               )
//               .map((m) => ({ ...m, _src: "recent" })),
//             ...ajustements
//               .filter(
//                 (m) =>
//                   Number(m.item_id) === entityId &&
//                   Number(m.deleted ?? 0) === 0
//               )
//               .map((m) => ({ ...m, _src: "ajustment" })),
//           ].sort((a, b) => {
//             const da = (a.date || a.created_at || "").toString();
//             const db = (b.date || b.created_at || "").toString();
//             return db.localeCompare(da);
//           });
//           if (!cancelled) {
//             setData({ ...item, stockReel: stock });
//             setRelated({
//               categorie: cat,
//               mouvements: mvtItem,
//               entrepots: entRes.data || [],
//               stocks,
//               mouvementsAll: mouvements,
//               ajustements,
//             });
//           }
//         } else if (type === "categorie") {
//           const [catsRes, itemsRes] = await Promise.all([
//             getCategories(),
//             getItems().catch(() => ({ data: [] })),
//           ]);
//           const cat = (catsRes.data || []).find(
//             (c) => Number(c.id) === entityId
//           );
//           if (!cat) throw new Error("Catégorie introuvable");
//           const items = (itemsRes.data || [])
//             .filter((i) => Number(i.category_item) === entityId)
//             .map((i) => ({
//               ...i,
//               stockReel: calculerStockTotal(
//                 i.id,
//                 stocks,
//                 mouvements,
//                 ajustements
//               ),
//             }));
//           if (!cancelled) {
//             setData(cat);
//             setRelated({ items, count: items.length });
//           }
//         } else if (type === "entrepot") {
//           const [entRes, itemsRes] = await Promise.all([
//             getEntrepots(),
//             getItems().catch(() => ({ data: [] })),
//           ]);
//           const ent = (entRes.data || []).find(
//             (e) => Number(e.id) === entityId
//           );
//           if (!ent) throw new Error("Entrepôt introuvable");
//           const itemIds = new Set();
//           stocks.forEach((s) => {
//             if (
//               Number(s.entrepot_id) === entityId &&
//               Number(s.deleted ?? 0) === 0
//             )
//               itemIds.add(Number(s.item_id));
//           });
//           mouvements.forEach((m) => {
//             if (
//               Number(m.entrepot_id) === entityId &&
//               Number(m.deleted ?? 0) === 0
//             )
//               itemIds.add(Number(m.item_id));
//           });
//           ajustements.forEach((a) => {
//             if (
//               Number(a.entrepot_id) === entityId &&
//               Number(a.deleted ?? 0) === 0
//             )
//               itemIds.add(Number(a.item_id));
//           });
//           const items = (itemsRes.data || [])
//             .filter((i) => itemIds.has(Number(i.id)))
//             .map((i) => ({
//               ...i,
//               stockEntrepot: stockReelEntrepot(
//                 i.id,
//                 entityId,
//                 stocks,
//                 mouvements,
//                 ajustements
//               ),
//             }));
//           if (!cancelled) {
//             setData(ent);
//             setRelated({ items, count: items.length });
//           }
//         } else if (type === "utilisateur") {
//           const res = await getUsers();
//           const u = (res.data || []).find((x) => Number(x.id) === entityId);
//           if (!u) throw new Error("Utilisateur introuvable");
//           if (!cancelled) setData(u);
//         } else if (type === "mouvement") {
//           let list = [];
//           if (kind === "regularisation" || kind === "depreciation" || kind === "ajustment") {
//             list = ajustements;
//           } else {
//             list = mouvements;
//           }
//           const m = list.find((x) => Number(x.id) === entityId);
//           if (!m) throw new Error("Mouvement introuvable");
//           const itemsRes = await getItems().catch(() => ({ data: [] }));
//           const it = (itemsRes.data || []).find(
//             (i) => Number(i.id) === Number(m.item_id)
//           );
//           if (!cancelled) {
//             setData(m);
//             setRelated({ kind, item: it });
//           }
//         } else if (type === "jour") {
//           const dateKey = decodeURIComponent(String(id || ""));
//           const itemsRes = await getItems().catch(() => ({ data: [] }));
//           const all = [
//             ...mouvements.map((x) => ({ ...x, _src: "recent" })),
//             ...ajustements.map((x) => ({ ...x, _src: "ajustment" })),
//           ].filter((row) => {
//             const d = (row.date || row.created_at || row.update_at || "")
//               .toString()
//               .slice(0, 10);
//             return d === dateKey && Number(row.deleted ?? 0) === 0;
//           });
//           if (!cancelled) {
//             setData({ date: dateKey, rows: all });
//             setRelated({ items: itemsRes.data || [] });
//           }
//         } else {
//           throw new Error(`Type inconnu : ${type}`);
//         }
//       } catch (e) {
//         if (!cancelled) setError(e.message || "Erreur de chargement");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }
//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, [type, id, kind]);

//   const handleDownloadPdf = useCallback(() => {
//     const printRoot = document.getElementById("details-print-area");
//     if (!printRoot) {
//       window.print();
//       return;
//     }
//     const w = window.open("", "_blank", "noopener,noreferrer");
//     if (!w) {
//       window.print();
//       return;
//     }
//     const styles = `
//       <style>
//         * { box-sizing: border-box; }
//         body { font-family: system-ui, sans-serif; color: #0f172a; padding: 24px; }
//         .pdf-header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #6366f1; padding-bottom:12px; margin-bottom:20px; }
//         .pdf-header h1 { margin:0; font-size:22px; color:#4f46e5; }
//         .pdf-header .company { font-size:13px; color:#64748b; }
//         .pdf-meta { font-size:12px; color:#64748b; margin-bottom:16px; }
//         table { width:100%; border-collapse:collapse; font-size:12px; margin-top:12px; }
//         th, td { border:1px solid #e2e8f0; padding:8px; text-align:left; }
//         th { background:#f1f5f9; }
//         img.thumb { width:48px; height:48px; object-fit:cover; border-radius:8px; }
//         h2 { font-size:16px; margin:18px 0 8px; }
//         .badge { display:inline-block; padding:2px 8px; border-radius:999px; background:#eef2ff; color:#4f46e5; font-size:11px; font-weight:700; }
//       </style>
//     `;
//     w.document.write(`
//       <!DOCTYPE html><html><head><title>${APP_NAME} — ${COMPANY_NAME}</title>${styles}</head>
//       <body>
//         <div class="pdf-header">
//           <div>
//             <h1>${APP_NAME}</h1>
//             <div class="company">${COMPANY_NAME}</div>
//           </div>
//           <div class="pdf-meta">Export · ${new Date().toLocaleString("fr-FR")}</div>
//         </div>
//         ${printRoot.innerHTML}
//         <script>window.onload=function(){window.print();}</script>
//       </body></html>
//     `);
//     w.document.close();
//   }, []);

//   return (
//     <div
//       className="details-shell"
//       style={{
//         position: "relative",
//         minHeight: "100%",
//         width: "100%",
//         ...(typeof themeCssVars === "function" ? themeCssVars(theme) : {}),
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
//           width: "100%",
//           maxWidth: 1100,
//           margin: "0 auto",
//           minHeight: "70vh",
//           padding: "1rem 16px 2rem",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* HEADER */}
//         <div
//           style={{
//             position: "relative",
//             marginBottom: "1.4rem",
//             textAlign: "center",
//             paddingTop: "0.3rem",
//           }}
//         >
//           {/* HEADER */}
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       textAlign: "center",
//                       marginTop: "0.35rem",
//                       marginBottom: "1.35rem",
//                       gap: "0.75rem",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: 68,
//                         height: 68,
//                         borderRadius: 20,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         background:
//                           "linear-gradient(145deg, var(--gradient-start), var(--gradient-end))",
//                         color: "#fff",
//                         boxShadow: "0 12px 32px var(--glow-color)",
//                         border: "1px solid rgba(255,255,255,0.22)",
//                       }}
//                     >
//                       <Info size={28} />
//                     </div>
//                   </div>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             style={topBtn}
//           >
//             <ArrowLeft size={15} /> Retour
//           </button>
//           <button
//             type="button"
//             onClick={handleDownloadPdf}
//             style={{ ...topBtn, left: "auto", right: 0 }}
//           >
//             <Download size={15} /> Télécharger
//           </button>

//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "0.5rem",
//               padding: "0.45rem 1.1rem",
//               borderRadius: 999,
//               background: "var(--glass-bg)",
//               border: "1px solid var(--glass-border)",
//               color: meta.color,
//               fontSize: "0.72rem",
//               fontWeight: 800,
//               letterSpacing: "0.12em",
//               marginBottom: "0.85rem",
//             }}
//           >
//             <MetaIcon size={12} /> {meta.badge}
//           </div>
//           <h1
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontSize: "clamp(1.5rem, 4vw, 2rem)",
//               fontWeight: 900,
//               margin: 0,
//               background:
//                 "linear-gradient(135deg, var(--text), var(--gradient-start))",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             Fiche détail
//           </h1>
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               fontSize: "0.88rem",
//               marginTop: "0.4rem",
//             }}
//           >
//             {APP_NAME} · {COMPANY_NAME}
//           </p>
//         </div>

//         <div id="details-print-area">
//           {loading && (
//             <GlassCard>
//               <div
//                 style={{
//                   padding: "3rem",
//                   textAlign: "center",
//                   color: "var(--text-secondary)",
//                 }}
//               >
//                 Chargement…
//               </div>
//             </GlassCard>
//           )}

//           {!loading && error && (
//             <GlassCard>
//               <div
//                 style={{
//                   padding: "2.5rem 1.5rem",
//                   textAlign: "center",
//                   color: "#f87171",
//                 }}
//               >
//                 <AlertTriangle size={32} style={{ marginBottom: 12 }} />
//                 <div style={{ fontWeight: 700 }}>{error}</div>
//               </div>
//             </GlassCard>
//           )}

//           {!loading && !error && data && type === "article" && (
//             <ArticleDetail
//               item={data}
//               categorie={related.categorie}
//               mouvements={related.mouvements || []}
//               stocksCtx={related}
//             />
//           )}
//           {!loading && !error && data && type === "categorie" && (
//             <CategorieDetail
//               cat={data}
//               items={related.items || []}
//               count={related.count || 0}
//               navigate={navigate}
//             />
//           )}
//           {!loading && !error && data && type === "entrepot" && (
//             <EntrepotDetail
//               ent={data}
//               items={related.items || []}
//               navigate={navigate}
//             />
//           )}
//           {!loading && !error && data && type === "utilisateur" && (
//             <UserDetail user={data} />
//           )}
//           {!loading && !error && data && type === "mouvement" && (
//             <MouvementDetail
//               m={data}
//               kind={related.kind || kind}
//               item={related.item}
//             />
//           )}
//           {!loading && !error && data && type === "jour" && (
//             <JourDetail
//               date={data.date}
//               rows={data.rows || []}
//               items={related.items || []}
//               navigate={navigate}
//             />
//           )}
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

// /* ========== ARTICLE ========== */
// function ArticleDetail({ item, categorie, mouvements }) {
//   const [imgOk, setImgOk] = useState(true);
//   const src = getArticleImageSrc(item);
//   const stock = Number(item.stockReel ?? 0);
//   const min = Number(item.minimal_stock || 1);
//   const statut =
//     stock <= 0
//       ? { label: "Rupture", color: "#f87171", ok: false }
//       : stock <= min
//         ? { label: "Stock bas", color: "#fbbf24", ok: false }
//         : { label: "Normal", color: "#4ade80", ok: true };

//   const qtyLabel = convertirQuantite(stock, item);

//   // Group movements by date
//   const byDate = useMemo(() => {
//     const map = {};
//     (mouvements || []).forEach((m) => {
//       const d = (m.date || m.created_at || "").toString().slice(0, 10) || "—";
//       if (!map[d]) map[d] = [];
//       map[d].push(m);
//     });
//     return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
//   }, [mouvements]);

//   return (
//     <>
//       <GlassCard>
//         <div
//           className="detail-hero"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "minmax(160px, 260px) 1fr",
//             gap: "1.5rem",
//             padding: "1.5rem",
//           }}
//         >
//           <div
//             style={{
//               borderRadius: 20,
//               overflow: "hidden",
//               aspectRatio: "1",
//               background:
//                 "linear-gradient(145deg, color-mix(in srgb, var(--gradient-start) 25%, transparent), var(--glass-bg))",
//               border: "1px solid var(--glass-border)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {src && imgOk ? (
//               <img
//                 src={src}
//                 alt={item.name}
//                 onError={() => setImgOk(false)}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               <Package size={48} color="var(--gradient-start)" />
//             )}
//           </div>
//           <div style={{ minWidth: 0 }}>
//             <div
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 900,
//                 fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
//                 color: "var(--text)",
//               }}
//             >
//               {item.name}
//             </div>
//             <div
//               style={{
//                 color: "var(--text-secondary)",
//                 fontSize: "0.9rem",
//                 marginBottom: "0.85rem",
//               }}
//             >
//               {[item.mark, item.modele].filter(Boolean).join(" · ") || "—"}
//             </div>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
//               <Badge color={statut.color}>{statut.label}</Badge>
//               <Badge color="var(--gradient-start)">Stock {qtyLabel}</Badge>
//               <Badge color="var(--text-secondary)">ID #{item.id}</Badge>
//               {categorie && (
//                 <Badge color="#60a5fa">{categorie.name}</Badge>
//               )}
//             </div>
//             <InfoGrid
//               rows={[
//                 {
//                   icon: DollarSign,
//                   label: "Prix achat",
//                   value:
//                     item.purchase_price != null
//                       ? `$${Number(item.purchase_price).toLocaleString()}`
//                       : "—",
//                 },
//                 {
//                   icon: DollarSign,
//                   label: "Prix vente",
//                   value:
//                     item.sale_price != null
//                       ? `$${Number(item.sale_price).toLocaleString()}`
//                       : "—",
//                 },
//                 {
//                   icon: Layers,
//                   label: "Niveau",
//                   value: item.level ?? "—",
//                 },
//                 {
//                   icon: Boxes,
//                   label: "Stock min.",
//                   value: item.minimal_stock ?? "—",
//                 },
//               ]}
//             />
//           </div>
//         </div>
//       </GlassCard>

//       <SectionTitle icon={<Calendar size={16} />} title="Historique des mouvements" />
//       <GlassCard>
//         <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
//           {byDate.length === 0 ? (
//             <EmptyLine text="Aucun mouvement pour cet article." />
//           ) : (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th style={thStyle}>Date</th>
//                   <th style={thStyle}>Type</th>
//                   <th style={thStyle}>Nature</th>
//                   <th style={thStyle}>Quantité</th>
//                   <th style={thStyle}>Raison</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {byDate.flatMap(([date, rows]) =>
//                   rows.map((m, i) => (
//                     <tr key={`${date}-${i}`}>
//                       <td style={tdStyle}>
//                         {i === 0 ? formatDateFr(date) : ""}
//                       </td>
//                       <td style={tdStyle}>{m.type || "—"}</td>
//                       <td style={tdStyle}>{m.nature || m._src || "—"}</td>
//                       <td style={tdStyle}>
//                         {convertirQuantite(m.qty, item)}
//                       </td>
//                       <td style={tdStyle}>{m.raison || "—"}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </GlassCard>
//       <style>{`
//         @media (max-width: 700px) {
//           .detail-hero { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//     </>
//   );
// }

// /* ========== CATÉGORIE ========== */
// function CategorieDetail({ cat, items, count, navigate }) {
//   const iconSrc = toIconSrc(cat.icon);
//   const [imgOk, setImgOk] = useState(true);

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
//               overflow: "hidden",
//               flexShrink: 0,
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 10px 28px var(--glow-color)",
//               fontSize: "2rem",
//             }}
//           >
//             {iconSrc && imgOk ? (
//               <img
//                 src={iconSrc}
//                 alt=""
//                 onError={() => setImgOk(false)}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               <Tag size={36} color="#fff" />
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
//               {cat.name}
//             </div>
//             <div
//               style={{
//                 color: "var(--text-secondary)",
//                 fontSize: "0.88rem",
//                 marginTop: 4,
//               }}
//             >
//               {cat.description || "Aucune description"}
//             </div>
//             <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
//               <Badge color="#60a5fa">ID #{cat.id}</Badge>
//               <Badge color="#4ade80">
//                 {count} article{count > 1 ? "s" : ""}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </GlassCard>

//       <SectionTitle
//         icon={<Package size={16} />}
//         title="Articles de la catégorie"
//       />
//       <GlassCard>
//         <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
//           {items.length === 0 ? (
//             <EmptyLine text="Aucun article dans cette catégorie." />
//           ) : (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th style={thStyle}></th>
//                   <th style={thStyle}>Article</th>
//                   <th style={thStyle}>Marque / modèle</th>
//                   <th style={thStyle}>Stock total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((it) => {
//                   const img = getArticleImageSrc(it);
//                   return (
//                     <tr
//                       key={it.id}
//                       style={{ cursor: "pointer" }}
//                       onClick={() => navigate(`/details/article/${it.id}`)}
//                     >
//                       <td style={tdStyle}>
//                         {img ? (
//                           <img
//                             src={img}
//                             alt=""
//                             className="thumb"
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
//                         {[it.mark, it.modele].filter(Boolean).join(" · ") ||
//                           "—"}
//                       </td>
//                       <td style={tdStyle}>
//                         {convertirQuantite(it.stockReel, it)}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// /* ========== ENTREPÔT ========== */
// function EntrepotDetail({ ent, items, navigate }) {
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
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 10px 28px var(--glow-color)",
//             }}
//           >
//             <Warehouse size={40} color="#fff" />
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
//               {ent.name || ent.reference || `Entrepôt #${ent.id}`}
//             </div>
//             <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
//               <Badge color="#a78bfa">ID #{ent.id}</Badge>
//               <Badge color="#4ade80">
//                 {items.length} article{items.length > 1 ? "s" : ""}
//               </Badge>
//               {ent.capacity != null && (
//                 <Badge color="#38bdf8">Capacité {ent.capacity}</Badge>
//               )}
//             </div>
//             <div style={{ marginTop: 14 }}>
//               <InfoGrid
//                 rows={[
//                   {
//                     icon: Warehouse,
//                     label: "Localisation",
//                     value: ent.location || ent.adresse || ent.city || "—",
//                   },
//                   {
//                     icon: Hash,
//                     label: "Référence",
//                     value: ent.reference || ent.code || "—",
//                   },
//                   {
//                     icon: Info,
//                     label: "Description",
//                     value: ent.description || "—",
//                   },
//                 ]}
//               />
//             </div>
//           </div>
//         </div>
//       </GlassCard>

//       <SectionTitle
//         icon={<Package size={16} />}
//         title="Articles présents dans cet entrepôt"
//       />
//       <GlassCard>
//         <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
//           {items.length === 0 ? (
//             <EmptyLine text="Aucun article dans cet entrepôt." />
//           ) : (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th style={thStyle}></th>
//                   <th style={thStyle}>Article</th>
//                   <th style={thStyle}>Marque / modèle</th>
//                   <th style={thStyle}>Stock (cet entrepôt)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((it) => {
//                   const img = getArticleImageSrc(it);
//                   return (
//                     <tr
//                       key={it.id}
//                       style={{ cursor: "pointer" }}
//                       onClick={() => navigate(`/details/article/${it.id}`)}
//                     >
//                       <td style={tdStyle}>
//                         {img ? (
//                           <img
//                             src={img}
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
//                         {[it.mark, it.modele].filter(Boolean).join(" · ") ||
//                           "—"}
//                       </td>
//                       <td style={tdStyle}>
//                         {convertirQuantite(it.stockEntrepot, it)}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// /* ========== USER ========== */
// function UserDetail({ user }) {
//   const initials =
//     ((user.first_name || "")[0] || "") + ((user.name || "")[0] || "");
//   return (
//     <>
//       <GlassCard>
//         <div
//           style={{
//             display: "flex",
//             gap: "1.2rem",
//             padding: "1.5rem",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <div
//             style={{
//               width: 80,
//               height: 80,
//               borderRadius: "50%",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 900,
//               fontSize: "1.4rem",
//               color: "#fff",
//               boxShadow: "0 0 22px var(--glow-color)",
//             }}
//           >
//             {initials || "?"}
//           </div>
//           <div>
//             <div
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 900,
//                 fontSize: "1.35rem",
//                 color: "var(--text)",
//               }}
//             >
//               {user.first_name} {user.name}
//               {user.middle_name ? ` ${user.middle_name}` : ""}
//             </div>
//             <div
//               style={{
//                 color: "var(--text-secondary)",
//                 fontSize: "0.88rem",
//                 marginTop: 4,
//               }}
//             >
//               {user.role || "Utilisateur"} · {user.email || "—"}
//             </div>
//             <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
//               <Badge color="#fbbf24">ID #{user.id}</Badge>
//               {user.genre && (
//                 <Badge color="var(--text-secondary)">{user.genre}</Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </GlassCard>
//       <SectionTitle icon={<Shield size={16} />} title="Compte" />
//       <GlassCard>
//         <div style={{ padding: "1.25rem 1.5rem" }}>
//           <InfoGrid
//             rows={[
//               { icon: Mail, label: "Email", value: user.email || "—" },
//               { icon: Shield, label: "Rôle", value: user.role || "—" },
//               {
//                 icon: CheckCircle,
//                 label: "Statut",
//                 value: user.deleted ? "Désactivé" : "Actif",
//               },
//               {
//                 icon: Clock,
//                 label: "Dernière maj.",
//                 value: user.update_at || user.updated_at || "—",
//               },
//             ]}
//           />
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// /* ========== MOUVEMENT ========== */
// function MouvementDetail({ m, kind, item }) {
//   const kindLabel =
//     kind === "regularisation"
//       ? "Régularisation"
//       : kind === "depreciation"
//         ? "Dépréciation"
//         : "Mouvement récent";
//   const img = item ? getArticleImageSrc(item) : null;
//   const qty = item ? convertirQuantite(m.qty, item) : m.qty ?? "—";

//   return (
//     <>
//       <GlassCard>
//         <div
//           style={{
//             display: "flex",
//             gap: 14,
//             padding: "1.5rem",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <div
//             style={{
//               width: 72,
//               height: 72,
//               borderRadius: 16,
//               overflow: "hidden",
//               background: "var(--glass-bg)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             {img ? (
//               <img
//                 src={img}
//                 alt=""
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               <Package size={28} color="var(--gradient-start)" />
//             )}
//           </div>
//           <div>
//             <div
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontWeight: 900,
//                 fontSize: "1.25rem",
//                 color: "var(--text)",
//               }}
//             >
//               {item ? designation(item) : `Article #${m.item_id}`}
//             </div>
//             <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
//               <Badge color="#34d399">{kindLabel}</Badge>
//               {m.type && <Badge color="var(--gradient-start)">{m.type}</Badge>}
//               <Badge color="#60a5fa">{qty}</Badge>
//             </div>
//           </div>
//         </div>
//       </GlassCard>
//       <SectionTitle icon={<ArrowLeftRight size={16} />} title="Détail" />
//       <GlassCard>
//         <div style={{ padding: "1.25rem 1.5rem" }}>
//           <InfoGrid
//             rows={[
//               {
//                 icon: Package,
//                 label: "Article",
//                 value: item ? designation(item) : `Article #${m.item_id}`,
//               },
//               {
//                 icon: Warehouse,
//                 label: "Entrepôt",
//                 value: m.entrepot_id ? `Entrepôt #${m.entrepot_id}` : "—",
//               },
//               { icon: Boxes, label: "Quantité", value: qty },
//               {
//                 icon: Calendar,
//                 label: "Date",
//                 value: formatDateFr(m.date || m.created_at),
//               },
//               {
//                 icon: Info,
//                 label: "Raison",
//                 value: m.raison || m.motif || m.note || "—",
//               },
//               {
//                 icon: Layers,
//                 label: "Nature",
//                 value: m.nature || kindLabel,
//               },
//             ]}
//           />
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// /* ========== JOUR ========== */
// function JourDetail({ date, rows, items, navigate }) {
//   const byId = Object.fromEntries((items || []).map((i) => [i.id, i]));
//   return (
//     <GlassCard>
//       <div style={{ padding: "1.25rem 1.35rem" }}>
//         <h2
//           style={{
//             fontFamily: "Syne, sans-serif",
//             margin: "0 0 0.35rem",
//             color: "var(--text)",
//             fontSize: "1.25rem",
//           }}
//         >
//           {formatDateFr(date)}
//         </h2>
//         <p
//           style={{
//             color: "var(--text-secondary)",
//             margin: "0 0 1rem",
//             fontSize: "0.88rem",
//           }}
//         >
//           {rows.length} mouvement{rows.length > 1 ? "s" : ""} · {date}
//         </p>
//         <div style={{ overflowX: "auto" }}>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}></th>
//                 <th style={thStyle}>Article</th>
//                 <th style={thStyle}>Type</th>
//                 <th style={thStyle}>Quantité</th>
//                 <th style={thStyle}>Nature</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((m, idx) => {
//                 const it = byId[m.item_id];
//                 const img = it ? getArticleImageSrc(it) : null;
//                 const title = it ? designation(it) : `Article #${m.item_id}`;
//                 const qty = it
//                   ? convertirQuantite(m.qty, it)
//                   : m.qty ?? "—";
//                 return (
//                   <tr key={idx}>
//                     <td style={tdStyle}>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           it?.id && navigate(`/details/article/${it.id}`)
//                         }
//                         style={{
//                           width: 44,
//                           height: 44,
//                           borderRadius: 10,
//                           overflow: "hidden",
//                           border: "none",
//                           padding: 0,
//                           cursor: it?.id ? "pointer" : "default",
//                           background: "var(--card-bg)",
//                         }}
//                       >
//                         {img ? (
//                           <img
//                             src={img}
//                             alt=""
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                             }}
//                           />
//                         ) : (
//                           <Package size={18} color="var(--gradient-start)" />
//                         )}
//                       </button>
//                     </td>
//                     <td style={{ ...tdStyle, fontWeight: 700 }}>{title}</td>
//                     <td style={tdStyle}>{m.type || "—"}</td>
//                     <td style={tdStyle}>{qty}</td>
//                     <td style={tdStyle}>{m.nature || m._src || "—"}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         {rows.length === 0 && (
//           <EmptyLine text="Aucune ligne pour ce jour." />
//         )}
//       </div>
//     </GlassCard>
//   );
// }

// /* ========== UI ATOMS ========== */
// function GlassCard({ children }) {
//   return (
//     <div
//       style={{
//         position: "relative",
//         borderRadius: 24,
//         background:
//           "linear-gradient(180deg, color-mix(in srgb, var(--card-bg) 92%, var(--text) 3%), var(--card-bg))",
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
//         gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//         gap: "0.75rem",
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
//                 background: "var(--card-bg)",
//                 color: "var(--gradient-start)",
//                 flexShrink: 0,
//               }}
//             >
//               <Icon size={15} />
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
//   position: "absolute",
//   left: 0,
//   top: 8,
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

// export default Details;

/**
 * Details — /details/:type/:id
 * Style unifié + stocks réels + tableaux liés
 * Export PDF : prévisualisation puis téléchargement (jsPDF + images)
 * Entreprise : L'étoile du matin · App : StockFlow
 */

import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Tag,
  Warehouse,
  Users,
  ArrowLeftRight,
  Image as ImageIcon,
  Calendar,
  Hash,
  DollarSign,
  Boxes,
  AlertTriangle,
  CheckCircle,
  Mail,
  Shield,
  Clock,
  Info,
  Download,
  Layers,
  X,
  FileText,
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

/* ========== HELPERS ========== */
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

function designation(item) {
  if (!item) return "—";
  return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
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

function stockReelEntrepot(itemId, entrepotId, stocks, mouvements, ajustements) {
  const stock = (stocks || []).find(
    (s) =>
      Number(s.item_id) === Number(itemId) &&
      Number(s.entrepot_id) === Number(entrepotId) &&
      Number(s.deleted ?? 0) === 0
  );
  let q = Number(stock?.stock_actual ?? 0);
  [...(mouvements || []), ...(ajustements || [])]
    .filter(
      (m) =>
        Number(m.item_id) === Number(itemId) &&
        Number(m.entrepot_id) === Number(entrepotId) &&
        Number(m.deleted ?? 0) === 0
    )
    .forEach((m) => {
      const qty = Number(m.qty ?? 0);
      if (m.type === "Entrée") q += qty;
      else if (m.type === "Sortie") q -= qty;
    });
  return q;
}

/* ========== PDF ========== */
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
    // déjà data URL
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
    // relative → absolute
    try {
      const url = new URL(src, window.location.origin).href;
      img.src = url;
    } catch {
      img.src = src;
    }
  });
}

const TYPE_META = {
  jour: {
    label: "Mouvements du jour",
    icon: Calendar,
    badge: "JOUR",
    color: "var(--gradient-start)",
  },
  article: {
    label: "Article",
    icon: Package,
    badge: "ARTICLE",
    color: "var(--gradient-start)",
  },
  categorie: {
    label: "Catégorie",
    icon: Tag,
    badge: "CATÉGORIE",
    color: "#60a5fa",
  },
  entrepot: {
    label: "Entrepôt",
    icon: Warehouse,
    badge: "ENTREPÔT",
    color: "#a78bfa",
  },
  mouvement: {
    label: "Mouvement",
    icon: ArrowLeftRight,
    badge: "MOUVEMENT",
    color: "#34d399",
  },
  utilisateur: {
    label: "Utilisateur",
    icon: Users,
    badge: "UTILISATEUR",
    color: "#fbbf24",
  },
};

/* ========== PAGE ========== */
function Details() {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const kind = searchParams.get("kind") || "recent";
  const navigate = useNavigate();
  const theme =
    (typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [related, setRelated] = useState({});
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  const meta = TYPE_META[type] || {
    label: type || "Détail",
    icon: Info,
    badge: "DÉTAIL",
    color: "var(--gradient-start)",
  };
  const MetaIcon = meta.icon;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      setData(null);
      try {
        if (type !== "jour") {
          const entityId = Number(id);
          if (!entityId) throw new Error("Identifiant invalide");
        }
        const entityId = type === "jour" ? id : Number(id);

        const [stocksRes, mvtRes, ajRes] = await Promise.all([
          getStocks().catch(() => ({ data: [] })),
          getMouvementsRecents().catch(() => ({ data: [] })),
          getStockAjustments().catch(() => ({ data: [] })),
        ]);
        const stocks = stocksRes.data || [];
        const mouvements = mvtRes.data || [];
        const ajustements = ajRes.data || [];

        if (type === "article") {
          const [itemsRes, catsRes, entRes] = await Promise.all([
            getItems(),
            getCategories().catch(() => ({ data: [] })),
            getEntrepots().catch(() => ({ data: [] })),
          ]);
          const item = (itemsRes.data || []).find(
            (i) => Number(i.id) === entityId
          );
          if (!item) throw new Error("Article introuvable");
          const cat = (catsRes.data || []).find(
            (c) => Number(c.id) === Number(item.category_item)
          );
          const stock = calculerStockTotal(
            item.id,
            stocks,
            mouvements,
            ajustements
          );
          const stocksByEnt = (entRes.data || []).map((e) => ({
            ...e,
            stock: stockReelEntrepot(
              item.id,
              e.id,
              stocks,
              mouvements,
              ajustements
            ),
          }));
          const mvtItem = [
            ...mouvements
              .filter(
                (m) =>
                  Number(m.item_id) === entityId &&
                  Number(m.deleted ?? 0) === 0
              )
              .map((m) => ({ ...m, _src: "recent" })),
            ...ajustements
              .filter(
                (m) =>
                  Number(m.item_id) === entityId &&
                  Number(m.deleted ?? 0) === 0
              )
              .map((m) => ({ ...m, _src: "ajustment" })),
          ].sort((a, b) => {
            const da = (a.date || a.created_at || "").toString();
            const db = (b.date || b.created_at || "").toString();
            return db.localeCompare(da);
          });
          if (!cancelled) {
            setData({ ...item, stockReel: stock });
            setRelated({
              categorie: cat,
              mouvements: mvtItem,
              entrepots: entRes.data || [],
              stocksByEnt,
              stocks,
              mouvementsAll: mouvements,
              ajustements,
            });
          }
        } else if (type === "categorie") {
          const [catsRes, itemsRes] = await Promise.all([
            getCategories(),
            getItems().catch(() => ({ data: [] })),
          ]);
          const cat = (catsRes.data || []).find(
            (c) => Number(c.id) === entityId
          );
          if (!cat) throw new Error("Catégorie introuvable");
          const items = (itemsRes.data || [])
            .filter((i) => Number(i.category_item) === entityId)
            .map((i) => ({
              ...i,
              stockReel: calculerStockTotal(
                i.id,
                stocks,
                mouvements,
                ajustements
              ),
            }));
          if (!cancelled) {
            setData(cat);
            setRelated({ items, count: items.length });
          }
        } else if (type === "entrepot") {
          const [entRes, itemsRes] = await Promise.all([
            getEntrepots(),
            getItems().catch(() => ({ data: [] })),
          ]);
          const ent = (entRes.data || []).find(
            (e) => Number(e.id) === entityId
          );
          if (!ent) throw new Error("Entrepôt introuvable");
          const itemIds = new Set();
          stocks.forEach((s) => {
            if (
              Number(s.entrepot_id) === entityId &&
              Number(s.deleted ?? 0) === 0
            )
              itemIds.add(Number(s.item_id));
          });
          mouvements.forEach((m) => {
            if (
              Number(m.entrepot_id) === entityId &&
              Number(m.deleted ?? 0) === 0
            )
              itemIds.add(Number(m.item_id));
          });
          ajustements.forEach((a) => {
            if (
              Number(a.entrepot_id) === entityId &&
              Number(a.deleted ?? 0) === 0
            )
              itemIds.add(Number(a.item_id));
          });
          const items = (itemsRes.data || [])
            .filter((i) => itemIds.has(Number(i.id)))
            .map((i) => ({
              ...i,
              stockEntrepot: stockReelEntrepot(
                i.id,
                entityId,
                stocks,
                mouvements,
                ajustements
              ),
            }));
          if (!cancelled) {
            setData(ent);
            setRelated({ items, count: items.length });
          }
        } else if (type === "utilisateur") {
          const res = await getUsers();
          const u = (res.data || []).find((x) => Number(x.id) === entityId);
          if (!u) throw new Error("Utilisateur introuvable");
          if (!cancelled) setData(u);
        } else if (type === "mouvement") {
          let list = [];
          if (
            kind === "regularisation" ||
            kind === "depreciation" ||
            kind === "ajustment"
          ) {
            list = ajustements;
          } else {
            list = mouvements;
          }
          const m = list.find((x) => Number(x.id) === entityId);
          if (!m) throw new Error("Mouvement introuvable");
          const itemsRes = await getItems().catch(() => ({ data: [] }));
          const it = (itemsRes.data || []).find(
            (i) => Number(i.id) === Number(m.item_id)
          );
          if (!cancelled) {
            setData(m);
            setRelated({ kind, item: it });
          }
        } else if (type === "jour") {
          const dateKey = decodeURIComponent(String(id || ""));
          const itemsRes = await getItems().catch(() => ({ data: [] }));
          const all = [
            ...mouvements.map((x) => ({ ...x, _src: "recent" })),
            ...ajustements.map((x) => ({ ...x, _src: "ajustment" })),
          ].filter((row) => {
            const d = (row.date || row.created_at || row.update_at || "")
              .toString()
              .slice(0, 10);
            return d === dateKey && Number(row.deleted ?? 0) === 0;
          });
          if (!cancelled) {
            setData({ date: dateKey, rows: all });
            setRelated({ items: itemsRes.data || [] });
          }
        } else {
          throw new Error(`Type inconnu : ${type}`);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [type, id, kind]);

  const pdfPreviewLines = useMemo(() => {
    if (!data) return [];
    if (type === "article") {
      return [
        `Article : ${designation(data)}`,
        `Stock total : ${convertirQuantite(data.stockReel, data)}`,
        `Catégorie : ${related.categorie?.name || "—"}`,
        `Mouvements : ${(related.mouvements || []).length}`,
        `Prix vente : ${data.sale_price_fc ?? "—"} FC`,
      ];
    }
    if (type === "categorie") {
      return [
        `Catégorie : ${data.name}`,
        `Articles : ${related.count ?? 0}`,
        data.description || "Sans description",
      ];
    }
    if (type === "entrepot") {
      return [
        `Entrepôt : ${data.name || data.reference || `#${data.id}`}`,
        `Articles présents : ${related.count ?? 0}`,
        `Capacité : ${data.capacity ?? "—"}`,
      ];
    }
    if (type === "utilisateur") {
      return [
        `${data.first_name || ""} ${data.name || ""}`.trim(),
        `Rôle : ${data.role || "—"}`,
        `Email : ${data.email || "—"}`,
      ];
    }
    if (type === "mouvement") {
      return [
        related.item ? designation(related.item) : `Article #${data.item_id}`,
        `Type : ${data.type || "—"} · ${data.nature || related.kind || "—"}`,
        `Qty : ${
          related.item
            ? convertirQuantite(data.qty, related.item)
            : data.qty
        }`,
        `Date : ${formatDateFr(data.date || data.created_at)}`,
      ];
    }
    if (type === "jour") {
      return [
        `Jour : ${formatDateFr(data.date)}`,
        `${(data.rows || []).length} mouvement(s)`,
      ];
    }
    return ["Export détail StockFlow"];
  }, [data, related, type]);

  const handleDownloadPdf = useCallback(async () => {
    if (!data || pdfBusy) return;
    setPdfBusy(true);
    try {
      const JsPDF = await loadJsPDF();
      const doc = new JsPDF({ unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 14;
      let y = margin;

      const indigo = [79, 70, 229];
      const slate = [51, 65, 85];
      const muted = [100, 116, 139];
      const green = [22, 163, 74];
      const red = [220, 38, 38];
      const amber = [217, 119, 6];
      const violet = [124, 58, 237];

      const ensure = (need = 12) => {
        if (y + need > pageH - 14) {
          doc.addPage();
          y = margin;
        }
      };

      // Header bandeau
      doc.setFillColor(...indigo);
      doc.rect(0, 0, pageW, 26, "F");
      // accent lumineux
      doc.setFillColor(165, 180, 252);
      doc.rect(0, 26, pageW, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(APP_NAME, margin, 11);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(COMPANY_NAME, margin, 18);
      doc.text(
        new Date().toLocaleString("fr-FR"),
        pageW - margin,
        14,
        { align: "right" }
      );
      y = 34;

      const title = (t, color = indigo) => {
        ensure(12);
        doc.setFillColor(...color);
        doc.roundedRect(margin, y, pageW - margin * 2, 8, 1.5, 1.5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(t, margin + 3, y + 5.5);
        y += 12;
        doc.setTextColor(...slate);
      };

      const kv = (label, value, c = slate) => {
        ensure(7);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(...muted);
        doc.text(String(label), margin, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...c);
        const val = String(value ?? "—");
        doc.text(val.length > 70 ? val.slice(0, 67) + "…" : val, pageW - margin, y, {
          align: "right",
        });
        y += 6.2;
      };

      const addThumb = async (src, size = 22) => {
        const dataUrl = await loadImageAsDataUrl(src);
        if (!dataUrl) return false;
        ensure(size + 4);
        try {
          doc.addImage(dataUrl, "JPEG", margin, y, size, size);
          return true;
        } catch {
          return false;
        }
      };

      if (type === "article") {
        title("Fiche article", indigo);
        const imgSrc = getArticleImageSrc(data);
        const hasImg = await addThumb(imgSrc, 28);
        if (hasImg) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(13);
          doc.setTextColor(...slate);
          doc.text(designation(data), margin + 32, y + 10);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(...muted);
          doc.text(`ID #${data.id}`, margin + 32, y + 16);
          y += 32;
        } else {
          kv("Article", designation(data));
        }
        kv("Catégorie", related.categorie?.name || "—", violet);
        kv("Stock total", convertirQuantite(data.stockReel, data), green);
        kv("Stock minimal", data.minimal_stock ?? "—", amber);
        kv("Prix achat", `${data.purchase_price ?? "—"}`);
        kv("Prix vente FC", `${data.sale_price_fc ?? "—"}`);
        kv("Niveau", data.level ?? "—");
        kv("Code-barres", data.code_barre || "—");
        if (related.stocksByEnt?.length) {
          title("Stock par entrepôt", violet);
          for (const e of related.stocksByEnt) {
            kv(
              e.reference || e.name || `Entrepôt ${e.id}`,
              convertirQuantite(e.stock, data)
            );
          }
        }
        if (related.mouvements?.length) {
          title("Historique mouvements", amber);
          for (const m of related.mouvements.slice(0, 40)) {
            ensure(7);
            doc.setFontSize(8.5);
            doc.setTextColor(...muted);
            doc.text(
              `${formatDateFr(m.date || m.created_at)} · ${m.type || ""} · ${
                m.nature || m._src || ""
              } · ${convertirQuantite(m.qty, data)}`,
              margin,
              y
            );
            y += 5.5;
          }
        }
      } else if (type === "categorie") {
        title("Fiche catégorie", [37, 99, 235]);
        const icon = toIconSrc(data.icon);
        const hasImg = await addThumb(icon, 24);
        if (hasImg) y += 28;
        kv("Nom", data.name);
        kv("Description", data.description || "—");
        kv("Articles", related.count ?? 0, green);
        if (related.items?.length) {
          title("Articles liés", violet);
          for (const it of related.items) {
            ensure(16);
            const src = getArticleImageSrc(it);
            const ok = await addThumb(src, 12);
            const xOff = ok ? 16 : 0;
            if (ok) {
              /* image already at y */
            }
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...slate);
            doc.text(it.name || "—", margin + xOff, y + (ok ? 5 : 0));
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(...muted);
            doc.text(
              `${[it.mark, it.modele].filter(Boolean).join(" · ") || "—"} · ${convertirQuantite(it.stockReel, it)}`,
              margin + xOff,
              y + (ok ? 10 : 5)
            );
            y += ok ? 16 : 12;
          }
        }
      } else if (type === "entrepot") {
        title("Fiche entrepôt", violet);
        kv("Nom", data.name || data.reference || `#${data.id}`);
        kv("Référence", data.reference || data.code || "—");
        kv("Localisation", data.location || data.adresse || data.city || "—");
        kv("Capacité", data.capacity ?? "—");
        kv("Articles présents", related.count ?? 0, green);
        if (related.items?.length) {
          title("Articles & stocks", indigo);
          for (const it of related.items) {
            ensure(16);
            const src = getArticleImageSrc(it);
            const ok = await addThumb(src, 12);
            const xOff = ok ? 16 : 0;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...slate);
            doc.text(it.name || "—", margin + xOff, y + (ok ? 5 : 0));
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(...muted);
            doc.text(
              `Stock : ${convertirQuantite(it.stockEntrepot, it)}`,
              margin + xOff,
              y + (ok ? 10 : 5)
            );
            y += ok ? 16 : 11;
          }
        }
      } else if (type === "utilisateur") {
        title("Fiche utilisateur", amber);
        kv("Nom", `${data.first_name || ""} ${data.name || ""}`.trim());
        kv("Post-nom", data.middle_name || "—");
        kv("Email", data.email || "—");
        kv("Rôle", data.role || "—", indigo);
        kv("Genre", data.genre || "—");
        kv("Statut", data.deleted ? "Désactivé" : "Actif", data.deleted ? red : green);
      } else if (type === "mouvement") {
        title("Fiche mouvement", green);
        if (related.item) {
          const src = getArticleImageSrc(related.item);
          const ok = await addThumb(src, 24);
          if (ok) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(...slate);
            doc.text(designation(related.item), margin + 28, y + 10);
            y += 28;
          }
        }
        kv(
          "Article",
          related.item ? designation(related.item) : `#${data.item_id}`
        );
        kv("Type", data.type || "—", data.type === "Entrée" ? green : red);
        kv("Nature", data.nature || related.kind || "—");
        kv(
          "Quantité",
          related.item
            ? convertirQuantite(data.qty, related.item)
            : data.qty
        );
        kv("Date", formatDateFr(data.date || data.created_at));
        kv("Raison", data.raison || data.motif || "—");
        kv("Entrepôt", data.entrepot_id ? `#${data.entrepot_id}` : "—");
      } else if (type === "jour") {
        title(`Mouvements — ${formatDateFr(data.date)}`, indigo);
        kv("Date ISO", data.date);
        kv("Nombre", (data.rows || []).length);
        const byId = Object.fromEntries(
          (related.items || []).map((i) => [i.id, i])
        );
        for (const m of data.rows || []) {
          const it = byId[m.item_id];
          ensure(16);
          const src = it ? getArticleImageSrc(it) : null;
          const ok = await addThumb(src, 11);
          const xOff = ok ? 14 : 0;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(...slate);
          doc.text(
            it ? designation(it) : `Article #${m.item_id}`,
            margin + xOff,
            y + (ok ? 4 : 0)
          );
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(...muted);
          doc.text(
            `${m.type || "—"} · ${
              it ? convertirQuantite(m.qty, it) : m.qty
            } · ${m.nature || m._src || ""}`,
            margin + xOff,
            y + (ok ? 9 : 5)
          );
          y += ok ? 15 : 11;
        }
      }

      // Footer pages
      const pages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setDrawColor(199, 210, 254);
        doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
        doc.setFontSize(8);
        doc.setTextColor(...muted);
        doc.text(
          `${APP_NAME} · ${COMPANY_NAME} · page ${i}/${pages}`,
          pageW / 2,
          pageH - 7,
          { align: "center" }
        );
      }

      const stamp = new Date().toISOString().slice(0, 10);
      doc.save(`${APP_NAME}_Detail_${type}_${stamp}.pdf`);
    } catch (e) {
      console.error(e);
      alert(
        "Impossible de générer le PDF. Vérifiez la connexion (CDN jsPDF) puis réessayez."
      );
    } finally {
      setPdfBusy(false);
    }
  }, [data, related, type, pdfBusy]);

  return (
    <div
      className="details-shell"
      style={{
        position: "relative",
        minHeight: "100%",
        width: "100%",
        ...(typeof themeCssVars === "function" ? themeCssVars(theme) : {}),
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
        className="details-page"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          minHeight: "70vh",
          padding: "1rem 16px 2rem",
          boxSizing: "border-box",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginBottom: "1.1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={topBtn}
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <button
            type="button"
            onClick={() => setPdfOpen(true)}
            disabled={loading || !!error || !data}
            style={{
              ...topBtn,
              position: "relative",
              left: "auto",
              top: "auto",
              marginLeft: "auto",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              border: "1px solid transparent",
              boxShadow: "0 8px 22px var(--glow-color)",
              opacity: loading || error || !data ? 0.5 : 1,
            }}
          >
            <FileText size={15} /> Exporter PDF
          </button>
        </div>

        {/* Header */}
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
            <MetaIcon size={28} style={{ position: "relative", zIndex: 1 }} />
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: meta.color,
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: ".08em",
            }}
          >
            {meta.badge}
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
          </h1>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              padding: "3rem",
            }}
          >
            Chargement des détails…
          </div>
        )}
        {error && (
          <GlassCard>
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#f87171",
              }}
            >
              <AlertTriangle size={28} style={{ marginBottom: 8 }} />
              <div>{error}</div>
            </div>
          </GlassCard>
        )}

        {!loading && !error && data && type === "article" && (
          <ArticleDetail
            item={data}
            categorie={related.categorie}
            mouvements={related.mouvements || []}
            stocksByEnt={related.stocksByEnt || []}
            navigate={navigate}
          />
        )}
        {!loading && !error && data && type === "categorie" && (
          <CategorieDetail
            cat={data}
            items={related.items || []}
            count={related.count || 0}
            navigate={navigate}
          />
        )}
        {!loading && !error && data && type === "entrepot" && (
          <EntrepotDetail
            ent={data}
            items={related.items || []}
            navigate={navigate}
          />
        )}
        {!loading && !error && data && type === "utilisateur" && (
          <UserDetail user={data} />
        )}
        {!loading && !error && data && type === "mouvement" && (
          <MouvementDetail
            m={data}
            kind={related.kind || kind}
            item={related.item}
          />
        )}
        {!loading && !error && data && type === "jour" && (
          <JourDetail
            date={data.date}
            rows={data.rows || []}
            items={related.items || []}
            navigate={navigate}
          />
        )}

        {/* PDF PREVIEW */}
        {pdfOpen && (
          <div
            onClick={() => !pdfBusy && setPdfOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 3000,
              background: "rgba(0,0,0,.6)",
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
                maxWidth: 480,
                maxHeight: "90vh",
                overflow: "auto",
                borderRadius: 24,
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 28px 70px rgba(0,0,0,.4)",
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "var(--text)",
                    }}
                  >
                    Prévisualisation PDF
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {APP_NAME} · {COMPANY_NAME} · images incluses
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPdfOpen(false)}
                  disabled={pdfBusy}
                  style={{
                    border: "1px solid var(--glass-border)",
                    background: "var(--glass-bg)",
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                {pdfPreviewLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "0.65rem 0.85rem",
                      borderRadius: 12,
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      fontSize: "0.85rem",
                      color: "var(--text)",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <button
                type="button"
                disabled={pdfBusy}
                onClick={handleDownloadPdf}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "0.9rem",
                  borderRadius: 14,
                  border: "none",
                  background:
                    "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  color: "#fff",
                  fontWeight: 800,
                  cursor: pdfBusy ? "wait" : "pointer",
                  opacity: pdfBusy ? 0.75 : 1,
                  boxShadow: "0 8px 24px var(--glow-color)",
                }}
              >
                <Download size={18} />
                {pdfBusy ? "Génération…" : "Télécharger le PDF"}
              </button>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                }}
              >
                Téléchargement direct · couleurs & miniatures d&apos;images
              </p>
            </div>
          </div>
        )}

        <Footer />

        <style>{`
@media (max-width: 700px) {
  .detail-hero { grid-template-columns: 1fr !important; }
  .details-page { padding: 0.75rem 12px 1.5rem !important; }
}
`}</style>
      </div>
    </div>
  );
}

/* ========== ARTICLE ========== */
function ArticleDetail({ item, categorie, mouvements, stocksByEnt, navigate }) {
  const [imgOk, setImgOk] = useState(true);
  const img = getArticleImageSrc(item);
  const min = Number(item.minimal_stock) || 1;
  const stock = Number(item.stockReel) || 0;
  const statut =
    stock <= 0
      ? { label: "Rupture", color: "#f87171" }
      : stock < min
      ? { label: "Stock bas", color: "#fbbf24" }
      : { label: "Normal", color: "#4ade80" };

  const byDate = useMemo(() => {
    const map = {};
    (mouvements || []).forEach((m) => {
      const d = (m.date || m.created_at || "").toString().slice(0, 10) || "—";
      if (!map[d]) map[d] = [];
      map[d].push(m);
    });
    return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [mouvements]);

  return (
    <>
      <GlassCard>
        <div
          className="detail-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "1.25rem",
            padding: "1.35rem",
            alignItems: "start",
          }}
        >
          <div
            style={{
              aspectRatio: "1",
              borderRadius: 20,
              overflow: "hidden",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {img && imgOk ? (
              <img
                src={img}
                alt=""
                onError={() => setImgOk(false)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Package size={48} color="var(--gradient-start)" />
            )}
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "1.4rem",
                color: "var(--text)",
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                marginTop: 4,
              }}
            >
              {[item.mark, item.modele].filter(Boolean).join(" · ") || "—"}
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Badge color={statut.color}>{statut.label}</Badge>
              <Badge color="var(--gradient-start)">
                {convertirQuantite(stock, item)}
              </Badge>
              {categorie && (
                <Badge color="#60a5fa">{categorie.name}</Badge>
              )}
              <Badge color="var(--text-secondary)">ID #{item.id}</Badge>
            </div>
            <div style={{ marginTop: 16 }}>
              <InfoGrid
                rows={[
                  {
                    icon: Boxes,
                    label: "Stock total",
                    value: convertirQuantite(stock, item),
                  },
                  {
                    icon: AlertTriangle,
                    label: "Stock minimal",
                    value: String(min),
                  },
                  {
                    icon: DollarSign,
                    label: "Prix vente FC",
                    value: item.sale_price_fc ?? "—",
                  },
                  {
                    icon: DollarSign,
                    label: "Prix achat",
                    value: item.purchase_price ?? "—",
                  },
                  {
                    icon: Layers,
                    label: "Niveau",
                    value: item.level ?? "—",
                  },
                  {
                    icon: Hash,
                    label: "Code-barres",
                    value: item.code_barre || "—",
                  },
                  {
                    icon: Tag,
                    label: "Catégorie",
                    value: categorie?.name || "—",
                  },
                  {
                    icon: Info,
                    label: "Description",
                    value: item.description || "—",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {stocksByEnt?.length > 0 && (
        <>
          <SectionTitle
            icon={<Warehouse size={16} />}
            title="Stock par entrepôt"
          />
          <GlassCard>
            <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Entrepôt</th>
                    <th style={thStyle}>Stock réel</th>
                  </tr>
                </thead>
                <tbody>
                  {stocksByEnt.map((e) => (
                    <tr key={e.id}>
                      <td style={tdStyle}>
                        {e.reference || e.name || `#${e.id}`}
                      </td>
                      <td style={tdStyle}>
                        {convertirQuantite(e.stock, item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      )}

      <SectionTitle
        icon={<ArrowLeftRight size={16} />}
        title="Historique des mouvements"
      />
      <GlassCard>
        <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
          {byDate.length === 0 ? (
            <EmptyLine text="Aucun mouvement pour cet article." />
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Nature</th>
                  <th style={thStyle}>Quantité</th>
                  <th style={thStyle}>Raison</th>
                </tr>
              </thead>
              <tbody>
                {byDate.flatMap(([date, rows]) =>
                  rows.map((m, i) => (
                    <tr key={`${date}-${i}`}>
                      <td style={tdStyle}>
                        {i === 0 ? formatDateFr(date) : ""}
                      </td>
                      <td style={tdStyle}>{m.type || "—"}</td>
                      <td style={tdStyle}>{m.nature || m._src || "—"}</td>
                      <td style={tdStyle}>
                        {convertirQuantite(m.qty, item)}
                      </td>
                      <td style={tdStyle}>{m.raison || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </>
  );
}

/* ========== CATÉGORIE ========== */
function CategorieDetail({ cat, items, count, navigate }) {
  const iconSrc = toIconSrc(cat.icon);
  const [imgOk, setImgOk] = useState(true);
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
              overflow: "hidden",
              flexShrink: 0,
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
            {iconSrc && imgOk ? (
              <img
                src={iconSrc}
                alt=""
                onError={() => setImgOk(false)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Tag size={36} color="#fff" />
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
              {cat.name}
            </div>
            <div
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.88rem",
                marginTop: 4,
              }}
            >
              {cat.description || "Aucune description"}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              <Badge color="#60a5fa">ID #{cat.id}</Badge>
              <Badge color="#4ade80">
                {count} article{count > 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </div>
      </GlassCard>

      <SectionTitle icon={<Package size={16} />} title="Articles de la catégorie" />
      <GlassCard>
        <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
          {items.length === 0 ? (
            <EmptyLine text="Aucun article dans cette catégorie." />
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}></th>
                  <th style={thStyle}>Article</th>
                  <th style={thStyle}>Marque / modèle</th>
                  <th style={thStyle}>Stock total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => {
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
                        {[it.mark, it.modele].filter(Boolean).join(" · ") ||
                          "—"}
                      </td>
                      <td style={tdStyle}>
                        {convertirQuantite(it.stockReel, it)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </>
  );
}

/* ========== ENTREPÔT ========== */
function EntrepotDetail({ ent, items, navigate }) {
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
            <Warehouse size={40} color="#fff" />
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
              {ent.name || ent.reference || `Entrepôt #${ent.id}`}
            </div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Badge color="#a78bfa">ID #{ent.id}</Badge>
              <Badge color="#4ade80">
                {items.length} article{items.length > 1 ? "s" : ""}
              </Badge>
              {ent.capacity != null && (
                <Badge color="#38bdf8">Capacité {ent.capacity}</Badge>
              )}
            </div>
            <div style={{ marginTop: 14 }}>
              <InfoGrid
                rows={[
                  {
                    icon: Warehouse,
                    label: "Localisation",
                    value: ent.location || ent.adresse || ent.city || "—",
                  },
                  {
                    icon: Hash,
                    label: "Référence",
                    value: ent.reference || ent.code || "—",
                  },
                  {
                    icon: Info,
                    label: "Description",
                    value: ent.description || "—",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <SectionTitle
        icon={<Package size={16} />}
        title="Articles présents dans cet entrepôt"
      />
      <GlassCard>
        <div style={{ padding: "1rem 1.25rem", overflowX: "auto" }}>
          {items.length === 0 ? (
            <EmptyLine text="Aucun article dans cet entrepôt." />
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}></th>
                  <th style={thStyle}>Article</th>
                  <th style={thStyle}>Marque / modèle</th>
                  <th style={thStyle}>Stock (cet entrepôt)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => {
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
                        {[it.mark, it.modele].filter(Boolean).join(" · ") ||
                          "—"}
                      </td>
                      <td style={tdStyle}>
                        {convertirQuantite(it.stockEntrepot, it)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </>
  );
}

/* ========== USER ========== */
function UserDetail({ user }) {
  const initials =
    ((user.first_name || "")[0] || "") + ((user.name || "")[0] || "");
  return (
    <>
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
              border: "1.5px solid rgba(255,255,255,0.28)",
            }}
          >
            {initials || "?"}
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "1.35rem",
                color: "var(--text)",
              }}
            >
              {user.first_name} {user.name}
              {user.middle_name ? ` ${user.middle_name}` : ""}
            </div>
            <div
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.88rem",
                marginTop: 4,
              }}
            >
              {user.role || "Utilisateur"} · {user.email || "—"}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              <Badge color="#fbbf24">ID #{user.id}</Badge>
              {user.genre && (
                <Badge color="var(--text-secondary)">{user.genre}</Badge>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
      <SectionTitle icon={<Shield size={16} />} title="Compte" />
      <GlassCard>
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <InfoGrid
            rows={[
              { icon: Mail, label: "Email", value: user.email || "—" },
              { icon: Shield, label: "Rôle", value: user.role || "—" },
              {
                icon: CheckCircle,
                label: "Statut",
                value: user.deleted ? "Désactivé" : "Actif",
              },
              {
                icon: Clock,
                label: "Dernière maj.",
                value: user.update_at || user.updated_at || "—",
              },
            ]}
          />
        </div>
      </GlassCard>
    </>
  );
}

/* ========== MOUVEMENT ========== */
function MouvementDetail({ m, kind, item }) {
  const kindLabel =
    kind === "regularisation"
      ? "Régularisation"
      : kind === "depreciation"
      ? "Dépréciation"
      : "Mouvement récent";
  const img = item ? getArticleImageSrc(item) : null;
  const qty = item ? convertirQuantite(m.qty, item) : m.qty ?? "—";
  return (
    <>
      <GlassCard>
        <div
          style={{
            display: "flex",
            gap: 14,
            padding: "1.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--glass-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {img ? (
              <img
                src={img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Package size={28} color="var(--gradient-start)" />
            )}
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "1.25rem",
                color: "var(--text)",
              }}
            >
              {item ? designation(item) : `Article #${m.item_id}`}
            </div>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Badge color="#34d399">{kindLabel}</Badge>
              {m.type && (
                <Badge color="var(--gradient-start)">{m.type}</Badge>
              )}
              <Badge color="#60a5fa">{qty}</Badge>
            </div>
          </div>
        </div>
      </GlassCard>
      <SectionTitle icon={<ArrowLeftRight size={16} />} title="Détail" />
      <GlassCard>
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <InfoGrid
            rows={[
              {
                icon: Package,
                label: "Article",
                value: item ? designation(item) : `Article #${m.item_id}`,
              },
              {
                icon: Warehouse,
                label: "Entrepôt",
                value: m.entrepot_id ? `Entrepôt #${m.entrepot_id}` : "—",
              },
              { icon: Boxes, label: "Quantité", value: qty },
              {
                icon: Calendar,
                label: "Date",
                value: formatDateFr(m.date || m.created_at),
              },
              {
                icon: Info,
                label: "Raison",
                value: m.raison || m.motif || m.note || "—",
              },
              {
                icon: Layers,
                label: "Nature",
                value: m.nature || kindLabel,
              },
            ]}
          />
        </div>
      </GlassCard>
    </>
  );
}

/* ========== JOUR ========== */
function JourDetail({ date, rows, items, navigate }) {
  const byId = Object.fromEntries((items || []).map((i) => [i.id, i]));
  return (
    <GlassCard>
      <div style={{ padding: "1.25rem 1.35rem" }}>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            margin: "0 0 0.35rem",
            color: "var(--text)",
            fontSize: "1.25rem",
          }}
        >
          {formatDateFr(date)}
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            margin: "0 0 1rem",
            fontSize: "0.88rem",
          }}
        >
          {rows.length} mouvement{rows.length > 1 ? "s" : ""} · {date}
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}></th>
                <th style={thStyle}>Article</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Quantité</th>
                <th style={thStyle}>Nature</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, idx) => {
                const it = byId[m.item_id];
                const im = it ? getArticleImageSrc(it) : null;
                const title = it ? designation(it) : `Article #${m.item_id}`;
                const qty = it ? convertirQuantite(m.qty, it) : m.qty ?? "—";
                return (
                  <tr key={idx}>
                    <td style={tdStyle}>
                      <button
                        type="button"
                        onClick={() =>
                          it?.id && navigate(`/details/article/${it.id}`)
                        }
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "none",
                          padding: 0,
                          cursor: it?.id ? "pointer" : "default",
                          background: "var(--card-bg)",
                        }}
                      >
                        {im ? (
                          <img
                            src={im}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Package size={18} color="var(--gradient-start)" />
                        )}
                      </button>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>{title}</td>
                    <td style={tdStyle}>{m.type || "—"}</td>
                    <td style={tdStyle}>{qty}</td>
                    <td style={tdStyle}>{m.nature || m._src || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <EmptyLine text="Aucune ligne pour ce jour." />}
      </div>
    </GlassCard>
  );
}

/* ========== UI ATOMS ========== */
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
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "0.75rem",
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
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: 5,
                  width: 10,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.45)",
                  transform: "rotate(-20deg)",
                }}
              />
              <Icon size={14} style={{ position: "relative", zIndex: 1 }} />
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

export default Details;
export { calculerStockTotal, stockReelEntrepot, convertirQuantite };
