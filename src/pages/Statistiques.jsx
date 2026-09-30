// /**
//  * Statistiques — style unifié + calculerStockTotal
//  * Entrepôts : graphique capacité + graphique nb d'articles distincts présents
//  */
// import { useEffect, useState } from "react";
// import {
//   BarChart2,
//   TrendingDown,
//   Package,
//   FolderOpen,
//   Warehouse,
//   RefreshCw,
//   Award,
//   Activity,
//   PieChart,
//   Users,
//   Crown,
//   UserCog,
//   UserCheck,
//   ArrowUpCircle,
//   ArrowDownCircle,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart as RePie,
//   Pie,
//   Cell,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import * as api from "../api/api";

// const {
//   getCategories,
//   getEntrepots,
//   getItems,
//   getStocks,
//   getMouvementsRecents,
//   getAjustements,
//   getStockAjustments,
//   getUsers,
// } = api;

// const safeGet = (fn) =>
//   typeof fn === "function"
//     ? fn().catch(() => ({ data: [] }))
//     : Promise.resolve({ data: [] });

// const CHART_COLORS = [
//   "#6366f1",
//   "#a855f7",
//   "#ec4899",
//   "#f97316",
//   "#10b981",
//   "#14b8a6",
//   "#3b82f6",
//   "#f59e0b",
// ];

// /** Stock total réel d'un article (tous entrepôts) */
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

// /** Nombre d'articles distincts présents dans un entrepôt (au moins une ligne stock ou mvt) */
// function countArticlesInEntrepot(entrepotId, stocks, mouvements, ajustements) {
//   const ids = new Set();
//   const eid = Number(entrepotId);
//   (stocks || []).forEach((s) => {
//     if (
//       Number(s.entrepot_id) === eid &&
//       Number(s.deleted ?? 0) === 0 &&
//       s.item_id != null
//     ) {
//       ids.add(Number(s.item_id));
//     }
//   });
//   (mouvements || []).forEach((m) => {
//     if (
//       Number(m.entrepot_id) === eid &&
//       Number(m.deleted ?? 0) === 0 &&
//       m.item_id != null
//     ) {
//       ids.add(Number(m.item_id));
//     }
//   });
//   (ajustements || []).forEach((a) => {
//     if (
//       Number(a.entrepot_id) === eid &&
//       Number(a.deleted ?? 0) === 0 &&
//       a.item_id != null
//     ) {
//       ids.add(Number(a.item_id));
//     }
//   });
//   return ids.size;
// }

// function InfoCard({ label, value, icon, color }) {
//   return (
//     <div
//       className="stat-card"
//       style={{
//         padding: "1rem 1rem",
//         borderRadius: 18,
//         background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
//         border: "1px solid var(--glass-border)",
//         display: "flex",
//         alignItems: "center",
//         gap: "0.75rem",
//         boxShadow: `0 12px 32px rgba(0,0,0,.16), 0 0 28px color-mix(in srgb, ${color} 32%, transparent), inset 0 1px 0 rgba(255,255,255,0.12)`,
//         position: "relative",
//         overflow: "hidden",
//         minHeight: 92,
//         zIndex: 1,
//         backdropFilter: "blur(18px)",
//         boxSizing: "border-box",
//         width: "100%",
//         minWidth: 0,
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: `radial-gradient(ellipse at 0% 50%, color-mix(in srgb, ${color} 24%, transparent), transparent 55%)`,
//           pointerEvents: "none",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           left: 0,
//           top: "15%",
//           bottom: "15%",
//           width: 4,
//           borderRadius: 4,
//           background: color,
//           boxShadow: `0 0 14px ${color}`,
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
//       <div style={{ minWidth: 0, position: "relative", zIndex: 1, flex: 1 }}>
//         <div
//           style={{
//             fontSize: "0.65rem",
//             fontWeight: 800,
//             letterSpacing: ".08em",
//             color: "var(--text-secondary)",
//             textTransform: "uppercase",
//           }}
//         >
//           {label}
//         </div>
//         <div
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)",
//             fontWeight: 900,
//             color: "var(--text)",
//             lineHeight: 1.15,
//             marginTop: 2,
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {value}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Statistiques() {
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" &&
//       sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [section, setSection] = useState("general");

//   useEffect(() => {
//     charger();
//   }, []);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const [resCat, resEnt, resItems, resStocks, resMvt, resAjust, resUsers] =
//         await Promise.all([
//           getCategories(),
//           getEntrepots(),
//           getItems(),
//           safeGet(getStocks),
//           getMouvementsRecents(),
//           safeGet(getAjustements || getStockAjustments),
//           getUsers().catch(() => ({ data: [] })),
//         ]);

//       const categories = resCat.data || [];
//       const entrepots = resEnt.data || [];
//       const items = resItems.data || [];
//       const stocks = resStocks.data || [];
//       const mouvements = resMvt.data || [];
//       const ajustements = resAjust.data || [];
//       const users = resUsers.data || [];

//       // Catégories
//       const articlesByCategory = categories
//         .map((cat) => {
//           const parts = (cat.name || "").split(" ");
//           const name =
//             parts[0]?.length <= 2
//               ? parts.slice(1).join(" ") || cat.name
//               : cat.name;
//           return {
//             name: name?.length > 16 ? name.slice(0, 14) + "…" : name,
//             total: items.filter((i) => i.category_item === cat.id).length,
//             id: cat.id,
//           };
//         })
//         .sort((a, b) => b.total - a.total);

//       const catLaPlusDotee = articlesByCategory[0] || null;
//       const catLaMoins =
//         [...articlesByCategory].sort((a, b) => a.total - b.total)[0] || null;
//       const catSansArticles = articlesByCategory.filter(
//         (c) => c.total === 0
//       ).length;

//       // Entrepôts — capacité
//       const entrepotCapacite = entrepots
//         .map((e) => ({
//           name: e.reference || e.name || `E${e.id}`,
//           capacite: Number(e.capacity || 0),
//         }))
//         .sort((a, b) => b.capacite - a.capacite);

//       const totalCapacite = entrepots.reduce(
//         (s, e) => s + (Number(e.capacity) || 0),
//         0
//       );
//       const entrepotTop = entrepotCapacite[0] || null;

//       // Entrepôts — nb d'articles distincts présents
//       const entrepotArticles = entrepots
//         .map((e) => ({
//           name: e.reference || e.name || `E${e.id}`,
//           articles: countArticlesInEntrepot(
//             e.id,
//             stocks,
//             mouvements,
//             ajustements
//           ),
//         }))
//         .sort((a, b) => b.articles - a.articles);

//       const totalPresences = entrepotArticles.reduce(
//         (s, e) => s + e.articles,
//         0
//       );
//       const entrepotPlusArticles = entrepotArticles[0] || null;

//       // Articles — stock réel via calculerStockTotal
//       const itemsWithStock = items.map((i) => {
//         const stock = calculerStockTotal(
//           i.id,
//           stocks,
//           mouvements,
//           ajustements
//         );
//         const min = Number(i.minimal_stock ?? 1);
//         let status = "normal";
//         if (stock <= 0) status = "rupture";
//         else if (stock <= min) status = "bas";
//         return { ...i, stockReel: stock, status };
//       });

//       const critique = itemsWithStock.filter((i) => i.status === "rupture");
//       const stockBas = itemsWithStock.filter((i) => i.status === "bas");
//       const normal = itemsWithStock.filter((i) => i.status === "normal");

//       const valeurTotale = itemsWithStock.reduce(
//         (s, i) => s + (Number(i.purchase_price) || 0) * (i.stockReel || 0),
//         0
//       );
//       const prixMoyen =
//         items.length > 0
//           ? items.reduce((s, i) => s + (Number(i.purchase_price) || 0), 0) /
//             items.length
//           : 0;
//       const articleLePlusCher =
//         [...items].sort(
//           (a, b) =>
//             (Number(b.purchase_price) || 0) - (Number(a.purchase_price) || 0)
//         )[0] || null;

//       const statutPieData = [
//         { name: "Normal", value: normal.length, color: "#4ade80" },
//         { name: "Stock bas", value: stockBas.length, color: "#fbbf24" },
//         { name: "Rupture", value: critique.length, color: "#f87171" },
//       ].filter((d) => d.value > 0);

//       // Mouvements
//       const entrees = mouvements.filter((m) => m.type === "Entrée");
//       const sorties = mouvements.filter((m) => m.type === "Sortie");
//       const regul = ajustements.filter((a) => {
//         const n = String(a.nature || a.type || "").toLowerCase();
//         return n.includes("regular");
//       });
//       const deprec = ajustements.filter((a) => {
//         const n = String(a.nature || a.type || "").toLowerCase();
//         return (
//           n === "usage" ||
//           n === "perte" ||
//           n.includes("deprec")
//         );
//       });

//       const qtyEntrees = entrees.reduce((s, m) => s + (Number(m.qty) || 0), 0);
//       const qtySorties = sorties.reduce((s, m) => s + (Number(m.qty) || 0), 0);
//       const qtyRegul = regul.reduce((s, m) => s + (Number(m.qty) || 0), 0);
//       const qtyDeprec = deprec.reduce((s, m) => s + (Number(m.qty) || 0), 0);

//       const mvtByItem = items
//         .map((item) => ({
//           name:
//             (item.name || "").length > 14
//               ? item.name.slice(0, 12) + "…"
//               : item.name,
//           entrees: mouvements.filter(
//             (m) => Number(m.item_id) === Number(item.id) && m.type === "Entrée"
//           ).length,
//           sorties: mouvements.filter(
//             (m) => Number(m.item_id) === Number(item.id) && m.type === "Sortie"
//           ).length,
//         }))
//         .filter((i) => i.entrees + i.sorties > 0)
//         .sort((a, b) => b.entrees + b.sorties - (a.entrees + a.sorties))
//         .slice(0, 5);

//       // Users
//       const admins = users.filter((u) => u.role === "Admin");
//       const gestionnaires = users.filter((u) => u.role === "Gestionnaire");
//       const operateurs = users.filter((u) => u.role === "Opérateur");
//       const rolePieData = [
//         { name: "Admin", value: admins.length, color: "#fbbf24" },
//         { name: "Gestionnaire", value: gestionnaires.length, color: "#60a5fa" },
//         { name: "Opérateur", value: operateurs.length, color: "#4ade80" },
//       ].filter((d) => d.value > 0);
//       const genreM = users.filter((u) => u.genre === "M").length;
//       const genreF = users.filter((u) => u.genre === "F").length;
//       const genreAutre = users.filter(
//         (u) => u.genre && u.genre !== "M" && u.genre !== "F"
//       ).length;

//       setData({
//         categories,
//         entrepots,
//         items,
//         stocks,
//         mouvements,
//         ajustements,
//         users,
//         articlesByCategory: articlesByCategory.slice(0, 8),
//         catLaPlusDotee,
//         catLaMoins,
//         catSansArticles,
//         entrepotCapacite: entrepotCapacite.slice(0, 8),
//         entrepotArticles: entrepotArticles.slice(0, 8),
//         totalCapacite,
//         totalPresences,
//         entrepotTop,
//         entrepotPlusArticles,
//         critique,
//         stockBas,
//         normal,
//         valeurTotale,
//         prixMoyen,
//         articleLePlusCher,
//         statutPieData,
//         entrees,
//         sorties,
//         regul,
//         deprec,
//         qtyEntrees,
//         qtySorties,
//         qtyRegul,
//         qtyDeprec,
//         mvtByItem,
//         admins,
//         gestionnaires,
//         operateurs,
//         rolePieData,
//         genreM,
//         genreF,
//         genreAutre,
//       });
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const SECTIONS = [
//     { key: "general", label: "Vue générale", icon: <Activity size={16} /> },
//     { key: "categories", label: "Catégories", icon: <FolderOpen size={16} /> },
//     { key: "entrepots", label: "Entrepôts", icon: <Warehouse size={16} /> },
//     { key: "articles", label: "Articles", icon: <Package size={16} /> },
//     { key: "mouvements", label: "Mouvements", icon: <RefreshCw size={16} /> },
//     { key: "users", label: "Utilisateurs", icon: <Users size={16} /> },
//   ];

//   if (loading) {
//     return (
//       <div
//         style={{
//           position: "relative",
//           minHeight: "60vh",
//           ...(typeof themeCssVars === "function"
//             ? themeCssVars(currentTheme)
//             : {}),
//         }}
//       >
//         <ThemeBackground theme={currentTheme} />
//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             padding: "4rem 20px",
//             textAlign: "center",
//             color: "var(--text-secondary)",
//           }}
//         >
//           <BarChart2
//             size={40}
//             style={{ margin: "0 auto 1rem", opacity: 0.4, display: "block" }}
//           />
//           Calcul des statistiques...
//         </div>
//       </div>
//     );
//   }

//   if (!data) return null;

//   return (
//     <div
//       className="stats-shell"
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
//         className="stats-page"
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
//             <BarChart2 size={30} />
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
//             <Activity size={12} /> Analytics
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
//             Tableau analytique
//           </h1>
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               margin: 0,
//               fontSize: "0.92rem",
//               maxWidth: 520,
//             }}
//           >
//             Vue d&apos;ensemble et indicateurs clés de votre stock et de votre
//             équipe.
//           </p>
//         </div>

//         {/* TABS */}
//         <div
//           className="stats-tabs"
//           style={{
//             display: "flex",
//             gap: "0.35rem",
//             marginBottom: "1.5rem",
//             padding: "0.4rem",
//             background: "var(--card-bg)",
//             border: "1px solid var(--glass-border)",
//             borderRadius: 16,
//             maxWidth: "100%",
//             flexWrap: "wrap",
//           }}
//         >
//           {SECTIONS.map((s) => (
//             <button
//               key={s.key}
//               type="button"
//               onClick={() => setSection(s.key)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.4rem",
//                 padding: "0.5rem 0.95rem",
//                 borderRadius: 12,
//                 border: "none",
//                 background:
//                   section === s.key
//                     ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                     : "transparent",
//                 color: section === s.key ? "#fff" : "var(--text-secondary)",
//                 fontWeight: section === s.key ? 700 : 400,
//                 fontSize: "0.82rem",
//                 cursor: "pointer",
//                 boxShadow:
//                   section === s.key ? "0 4px 12px var(--glow-color)" : "none",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {s.icon} {s.label}
//             </button>
//           ))}
//         </div>

//         {/* ========== GÉNÉRAL ========== */}
//         {section === "general" && (
//           <div>
//             <div
//               className="kpi-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//                 gap: "0.85rem",
//                 marginBottom: "1.4rem",
//               }}
//             >
//               <InfoCard
//                 label="Articles"
//                 value={data.items.length}
//                 icon={<Package size={18} />}
//                 color="var(--gradient-start)"
//               />
//               <InfoCard
//                 label="Catégories"
//                 value={data.categories.length}
//                 icon={<FolderOpen size={18} />}
//                 color="#a855f7"
//               />
//               <InfoCard
//                 label="Entrepôts"
//                 value={data.entrepots.length}
//                 icon={<Warehouse size={18} />}
//                 color="#10b981"
//               />
//               <InfoCard
//                 label="Mouvements"
//                 value={data.mouvements.length + data.ajustements.length}
//                 icon={<RefreshCw size={18} />}
//                 color="#f97316"
//               />
//               <InfoCard
//                 label="Ruptures"
//                 value={data.critique.length}
//                 icon={<TrendingDown size={18} />}
//                 color="#f87171"
//               />
//               <InfoCard
//                 label="Utilisateurs"
//                 value={data.users.length}
//                 icon={<Users size={18} />}
//                 color="#60a5fa"
//               />
//             </div>
//           </div>
//         )}

//         {/* ========== CATÉGORIES ========== */}
//         {section === "categories" && (
//           <div>
//             <div
//               className="kpi-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                 gap: "0.85rem",
//                 marginBottom: "1.4rem",
//               }}
//             >
//               <InfoCard
//                 label="Total"
//                 value={data.categories.length}
//                 icon={<FolderOpen size={18} />}
//                 color="#a855f7"
//               />
//               <InfoCard
//                 label="Plus fournie"
//                 value={data.catLaPlusDotee?.name || "—"}
//                 icon={<Award size={18} />}
//                 color="#fbbf24"
//               />
//               <InfoCard
//                 label="Moins fournie"
//                 value={data.catLaMoins?.name || "—"}
//                 icon={<TrendingDown size={18} />}
//                 color="#f87171"
//               />
//               <InfoCard
//                 label="Sans article"
//                 value={data.catSansArticles}
//                 icon={<Package size={18} />}
//                 color="#94a3b8"
//               />
//             </div>
//             <ChartCard title="Articles par catégorie" icon={<BarChart2 size={16} />}>
//               <ResponsiveContainer width="100%" height={260}>
//                 <BarChart data={data.articlesByCategory} barSize={22}>
//                   <XAxis
//                     dataKey="name"
//                     stroke="var(--text-secondary)"
//                     fontSize={11}
//                     tick={{ fill: "var(--text-secondary)" }}
//                   />
//                   <YAxis
//                     stroke="var(--text-secondary)"
//                     fontSize={11}
//                     tick={{ fill: "var(--text-secondary)" }}
//                     allowDecimals={false}
//                   />
//                   <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
//                   <Tooltip contentStyle={tooltipStyle} />
//                   <Bar dataKey="total" name="Articles" fill="#a855f7" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </div>
//         )}

//         {/* ========== ENTREPÔTS ========== */}
//         {section === "entrepots" && (
//           <div>
//             <div
//               className="kpi-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                 gap: "0.85rem",
//                 marginBottom: "1.4rem",
//               }}
//             >
//               <InfoCard
//                 label="Entrepôts"
//                 value={data.entrepots.length}
//                 icon={<Warehouse size={18} />}
//                 color="#10b981"
//               />
//               <InfoCard
//                 label="Capacité totale"
//                 value={data.totalCapacite.toLocaleString()}
//                 icon={<Package size={18} />}
//                 color="#38bdf8"
//               />
//               <InfoCard
//                 label="Top capacité"
//                 value={data.entrepotTop?.name || "—"}
//                 icon={<Award size={18} />}
//                 color="#fbbf24"
//               />
//               <InfoCard
//                 label="Top articles"
//                 value={data.entrepotPlusArticles?.name || "—"}
//                 icon={<Package size={18} />}
//                 color="#a855f7"
//               />
//             </div>

//             <div
//               className="charts-row"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "1.2rem",
//               }}
//             >
//               <ChartCard title="Capacité par entrepôt" icon={<Warehouse size={16} />}>
//                 <ResponsiveContainer width="100%" height={260}>
//                   <BarChart data={data.entrepotCapacite} barSize={22}>
//                     <XAxis
//                       dataKey="name"
//                       stroke="var(--text-secondary)"
//                       fontSize={11}
//                       tick={{ fill: "var(--text-secondary)" }}
//                     />
//                     <YAxis
//                       stroke="var(--text-secondary)"
//                       fontSize={11}
//                       tick={{ fill: "var(--text-secondary)" }}
//                     />
//                     <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
//                     <Tooltip contentStyle={tooltipStyle} />
//                     <Bar
//                       dataKey="capacite"
//                       name="Capacité"
//                       fill="#10b981"
//                       radius={[4, 4, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>

//               <ChartCard
//                 title="Articles distincts par entrepôt"
//                 icon={<Package size={16} />}
//               >
//                 <ResponsiveContainer width="100%" height={260}>
//                   <BarChart data={data.entrepotArticles} barSize={22}>
//                     <XAxis
//                       dataKey="name"
//                       stroke="var(--text-secondary)"
//                       fontSize={11}
//                       tick={{ fill: "var(--text-secondary)" }}
//                     />
//                     <YAxis
//                       stroke="var(--text-secondary)"
//                       fontSize={11}
//                       tick={{ fill: "var(--text-secondary)" }}
//                       allowDecimals={false}
//                     />
//                     <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
//                     <Tooltip contentStyle={tooltipStyle} />
//                     <Bar
//                       dataKey="articles"
//                       name="Articles présents"
//                       fill="#a855f7"
//                       radius={[4, 4, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//                 <p
//                   style={{
//                     margin: "0.5rem 0 0",
//                     fontSize: "0.75rem",
//                     color: "var(--text-secondary)",
//                     textAlign: "center",
//                   }}
//                 >
//                   1 article compté une fois s&apos;il est présent dans
//                   l&apos;entrepôt (stock ou mouvement).
//                 </p>
//               </ChartCard>
//             </div>
//           </div>
//         )}

//         {/* ========== ARTICLES ========== */}
//         {section === "articles" && (
//           <div>
//             <div
//               className="kpi-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                 gap: "0.85rem",
//                 marginBottom: "1.4rem",
//               }}
//             >
//               <InfoCard
//                 label="Total"
//                 value={data.items.length}
//                 icon={<Package size={18} />}
//                 color="var(--gradient-start)"
//               />
//               <InfoCard
//                 label="Normal"
//                 value={data.normal.length}
//                 icon={<Package size={18} />}
//                 color="#4ade80"
//               />
//               <InfoCard
//                 label="Stock bas"
//                 value={data.stockBas.length}
//                 icon={<TrendingDown size={18} />}
//                 color="#fbbf24"
//               />
//               <InfoCard
//                 label="Rupture"
//                 value={data.critique.length}
//                 icon={<TrendingDown size={18} />}
//                 color="#f87171"
//               />
//               <InfoCard
//                 label="Valeur stock"
//                 value={`$${roundSmart(data.valeurTotale)}`}
//                 icon={<BarChart2 size={18} />}
//                 color="#38bdf8"
//               />
//               <InfoCard
//                 label="Prix moyen"
//                 value={`$${data.prixMoyen.toFixed(2)}`}
//                 icon={<Award size={18} />}
//                 color="#a855f7"
//               />
//             </div>
//             <div
//               className="charts-row"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "1.2rem",
//               }}
//             >
//               <ChartCard title="Répartition des statuts" icon={<PieChart size={16} />}>
//                 {data.statutPieData.length === 0 ? (
//                   <EmptyChart />
//                 ) : (
//                   <>
//                     <ResponsiveContainer width="100%" height={220}>
//                       <RePie>
//                         <Pie
//                           data={data.statutPieData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={55}
//                           outerRadius={85}
//                           paddingAngle={4}
//                           dataKey="value"
//                         >
//                           {data.statutPieData.map((entry, i) => (
//                             <Cell key={i} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip contentStyle={tooltipStyle} />
//                       </RePie>
//                     </ResponsiveContainer>
//                     <LegendDots
//                       items={data.statutPieData.map((d) => ({
//                         ...d,
//                         name: `${d.name} (${d.value})`,
//                       }))}
//                     />
//                   </>
//                 )}
//               </ChartCard>
//               <ChartCard title="Indicateurs" icon={<Award size={16} />}>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                   {[
//                     {
//                       label: "Article le plus cher",
//                       value: data.articleLePlusCher?.name || "—",
//                       sub: `$${data.articleLePlusCher?.purchase_price || 0}`,
//                       color: "#fbbf24",
//                     },
//                     {
//                       label: "Ruptures",
//                       value: `${data.critique.length} / ${data.items.length}`,
//                       sub: "stock réel ≤ 0",
//                       color: "#f87171",
//                     },
//                     {
//                       label: "Disponibilité",
//                       value: `${
//                         data.items.length
//                           ? Math.round(
//                               (data.normal.length / data.items.length) * 100
//                             )
//                           : 0
//                       }%`,
//                       sub: "stock normal",
//                       color: "#4ade80",
//                     },
//                   ].map((ind, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         padding: "0.7rem 0.9rem",
//                         borderRadius: 12,
//                         background: "var(--glass-bg)",
//                         border: "1px solid var(--glass-border)",
//                         gap: 10,
//                       }}
//                     >
//                       <div>
//                         <div
//                           style={{
//                             fontSize: "0.7rem",
//                             color: "var(--text-secondary)",
//                             fontWeight: 600,
//                             textTransform: "uppercase",
//                           }}
//                         >
//                           {ind.label}
//                         </div>
//                         <div
//                           style={{
//                             fontSize: "0.72rem",
//                             color: "var(--text-secondary)",
//                           }}
//                         >
//                           {ind.sub}
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           fontFamily: "Syne, sans-serif",
//                           fontWeight: 800,
//                           fontSize: "0.9rem",
//                           color: ind.color,
//                           textAlign: "right",
//                         }}
//                       >
//                         {ind.value}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </ChartCard>
//             </div>
//           </div>
//         )}

//         {/* ========== MOUVEMENTS ========== */}
//         {section === "mouvements" && (
//           <div>
//             <div
//               className="kpi-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
//                 gap: "0.85rem",
//                 marginBottom: "1.4rem",
//               }}
//             >
//               <InfoCard
//                 label="Total mvt"
//                 value={data.mouvements.length}
//                 icon={<RefreshCw size={18} />}
//                 color="var(--gradient-start)"
//               />
//               <InfoCard
//                 label="Entrées"
//                 value={data.entrees.length}
//                 icon={<ArrowUpCircle size={18} />}
//                 color="#4ade80"
//               />
//               <InfoCard
//                 label="Sorties"
//                 value={data.sorties.length}
//                 icon={<ArrowDownCircle size={18} />}
//                 color="#f87171"
//               />
//               <InfoCard
//                 label="Régularisation"
//                 value={data.regul.length}
//                 icon={<BarChart2 size={18} />}
//                 color="#60a5fa"
//               />
//               <InfoCard
//                 label="Dépréciation"
//                 value={data.deprec.length}
//                 icon={<TrendingDown size={18} />}
//                 color="#fbbf24"
//               />
//             </div>
//             <ChartCard title="Top 5 articles actifs" icon={<Activity size={16} />}>
//               <ResponsiveContainer width="100%" height={260}>
//                 <BarChart data={data.mvtByItem} barSize={22}>
//                   <XAxis
//                     dataKey="name"
//                     stroke="var(--text-secondary)"
//                     fontSize={11}
//                     tick={{ fill: "var(--text-secondary)" }}
//                   />
//                   <YAxis
//                     stroke="var(--text-secondary)"
//                     fontSize={11}
//                     tick={{ fill: "var(--text-secondary)" }}
//                     allowDecimals={false}
//                   />
//                   <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
//                   <Tooltip contentStyle={tooltipStyle} />
//                   <Legend />
//                   <Bar dataKey="entrees" name="Entrées" fill="#4ade80" radius={[4, 4, 0, 0]} />
//                   <Bar dataKey="sorties" name="Sorties" fill="#f87171" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </div>
//         )}

//         {/* ========== USERS ========== */}
//         {section === "users" && (
//           <div>
//             <div
//               className="kpi-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                 gap: "0.85rem",
//                 marginBottom: "1.4rem",
//               }}
//             >
//               <InfoCard
//                 label="Total"
//                 value={data.users.length}
//                 icon={<Users size={18} />}
//                 color="var(--gradient-start)"
//               />
//               <InfoCard
//                 label="Admins"
//                 value={data.admins.length}
//                 icon={<Crown size={18} />}
//                 color="#fbbf24"
//               />
//               <InfoCard
//                 label="Gestionnaires"
//                 value={data.gestionnaires.length}
//                 icon={<UserCog size={18} />}
//                 color="#60a5fa"
//               />
//               <InfoCard
//                 label="Opérateurs"
//                 value={data.operateurs.length}
//                 icon={<UserCheck size={18} />}
//                 color="#4ade80"
//               />
//             </div>
//             <div
//               className="charts-row"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "1.2rem",
//               }}
//             >
//               <ChartCard title="Répartition par rôle" icon={<PieChart size={16} />}>
//                 {data.rolePieData.length === 0 ? (
//                   <EmptyChart />
//                 ) : (
//                   <>
//                     <ResponsiveContainer width="100%" height={220}>
//                       <RePie>
//                         <Pie
//                           data={data.rolePieData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={50}
//                           outerRadius={85}
//                           paddingAngle={3}
//                           dataKey="value"
//                         >
//                           {data.rolePieData.map((entry, i) => (
//                             <Cell key={i} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip contentStyle={tooltipStyle} />
//                       </RePie>
//                     </ResponsiveContainer>
//                     <LegendDots
//                       items={data.rolePieData.map((d) => ({
//                         ...d,
//                         name: `${d.name} (${d.value})`,
//                       }))}
//                     />
//                   </>
//                 )}
//               </ChartCard>
//               <ChartCard title="Répartition par genre" icon={<Users size={16} />}>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//                   {[
//                     { label: "Masculin", value: data.genreM, color: "#60a5fa" },
//                     { label: "Féminin", value: data.genreF, color: "#ec4899" },
//                     {
//                       label: "Autre",
//                       value: data.genreAutre,
//                       color: "#a855f7",
//                     },
//                   ].map((g, i) => {
//                     const max = Math.max(data.users.length, 1);
//                     return (
//                       <div key={i}>
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             marginBottom: 4,
//                           }}
//                         >
//                           <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>
//                             {g.label}
//                           </span>
//                           <span style={{ fontWeight: 700, color: g.color }}>
//                             {g.value}
//                           </span>
//                         </div>
//                         <div
//                           style={{
//                             height: 8,
//                             borderRadius: 999,
//                             background: "var(--glass-bg)",
//                             overflow: "hidden",
//                           }}
//                         >
//                           <div
//                             style={{
//                               height: "100%",
//                               width: `${(g.value / max) * 100}%`,
//                               background: g.color,
//                               borderRadius: 999,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </ChartCard>
//             </div>
//           </div>
//         )}

//         <Footer />

//         <style>{`
//           @media (max-width: 900px) {
//             .charts-row { grid-template-columns: 1fr !important; }
//           }
//           @media (max-width: 768px) {
//             .stats-page { padding: 0 12px 1.5rem !important; }
//             .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
//           }
//           @media (max-width: 420px) {
//             .kpi-grid { grid-template-columns: 1fr !important; }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, icon, children }) {
//   return (
//     <div
//       style={{
//         borderRadius: 22,
//         background: "var(--card-bg)",
//         border: "1px solid var(--glass-border)",
//         overflow: "hidden",
//         boxShadow: "0 10px 32px rgba(0,0,0,.08)",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "70%",
//           height: 1,
//           background:
//             "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
//           opacity: 0.7,
//         }}
//       />
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "0.5rem",
//           padding: "1rem 1.25rem",
//           borderBottom: "1px solid var(--glass-border)",
//           color: "var(--gradient-start)",
//         }}
//       >
//         {icon}
//         <span
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 700,
//             fontSize: "0.92rem",
//             color: "var(--text)",
//           }}
//         >
//           {title}
//         </span>
//       </div>
//       <div style={{ padding: "1.15rem" }}>{children}</div>
//     </div>
//   );
// }

// function LegendDots({ items }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         gap: "1rem",
//         flexWrap: "wrap",
//         marginTop: 4,
//       }}
//     >
//       {items.map((d, i) => (
//         <div
//           key={i}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "0.35rem",
//             fontSize: "0.75rem",
//             color: "var(--text-secondary)",
//           }}
//         >
//           <div
//             style={{
//               width: 10,
//               height: 10,
//               borderRadius: "50%",
//               background: d.color,
//             }}
//           />
//           {d.name}
//         </div>
//       ))}
//     </div>
//   );
// }

// function EmptyChart({ text = "Aucune donnée" }) {
//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "2.5rem",
//         color: "var(--text-secondary)",
//         fontSize: "0.9rem",
//       }}
//     >
//       {text}
//     </div>
//   );
// }

// function roundSmart(n) {
//   const x = Number(n) || 0;
//   return Math.abs(x - Math.round(x)) < 1e-9
//     ? Math.round(x)
//     : Number(x.toFixed(2));
// }

// const tooltipStyle = {
//   background: "var(--card-bg)",
//   border: "1px solid var(--glass-border)",
//   borderRadius: 12,
//   color: "var(--text)",
//   boxShadow: "0 12px 32px rgba(0,0,0,.2)",
//   fontSize: 13,
// };

// export default Statistiques;












/**
 * Statistiques — style unifié + calculerStockTotal
 * Onglets centrés, responsive mobile, icônes ChartCard style InfoCard
 * Export PDF : prévisualisation dans la page puis téléchargement (jsPDF CDN)
 */

import { useEffect, useState } from "react";
import {
  BarChart2,
  TrendingDown,
  Package,
  FolderOpen,
  Warehouse,
  RefreshCw,
  Award,
  Activity,
  PieChart,
  Users,
  Crown,
  UserCog,
  UserCheck,
  ArrowUpCircle,
  ArrowDownCircle,
  Download,
  X,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePie,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const {
  getCategories,
  getEntrepots,
  getItems,
  getStocks,
  getMouvementsRecents,
  getAjustements,
  getStockAjustments,
  getUsers,
} = api;

const safeGet = (fn) =>
  typeof fn === "function"
    ? fn().catch(() => ({ data: [] }))
    : Promise.resolve({ data: [] });

const CHART_COLORS = [
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#10b981",
  "#14b8a6",
  "#3b82f6",
  "#f59e0b",
];

/* ========== STOCK RÉEL ========== */
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

function countArticlesInEntrepot(entrepotId, stocks, mouvements, ajustements) {
  const ids = new Set();
  const eid = Number(entrepotId);
  (stocks || []).forEach((s) => {
    if (
      Number(s.entrepot_id) === eid &&
      Number(s.deleted ?? 0) === 0 &&
      s.item_id != null
    )
      ids.add(Number(s.item_id));
  });
  (mouvements || []).forEach((m) => {
    if (
      Number(m.entrepot_id) === eid &&
      Number(m.deleted ?? 0) === 0 &&
      m.item_id != null
    )
      ids.add(Number(m.item_id));
  });
  (ajustements || []).forEach((a) => {
    if (
      Number(a.entrepot_id) === eid &&
      Number(a.deleted ?? 0) === 0 &&
      a.item_id != null
    )
      ids.add(Number(a.item_id));
  });
  return ids.size;
}

function roundSmart(n) {
  const x = Number(n) || 0;
  return Math.abs(x - Math.round(x)) < 1e-9
    ? Math.round(x)
    : Number(x.toFixed(2));
}

/* ========== PDF helpers ========== */
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

/**
 * Génère un PDF coloré de toutes les sections (sans fenêtre d'impression).
 */
async function buildStatsPdf(data) {
  const JsPDF = await loadJsPDF();
  const doc = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = margin;

  const primary = [99, 102, 241]; // indigo
  const muted = [100, 116, 139];
  const dark = [15, 23, 42];
  const green = [34, 197, 94];
  const red = [239, 68, 68];
  const amber = [245, 158, 11];

  const ensureSpace = (need = 12) => {
    if (y + need > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const title = (text) => {
    ensureSpace(14);
    doc.setFillColor(...primary);
    doc.roundedRect(margin, y, pageW - margin * 2, 9, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(text, margin + 3, y + 6.2);
    y += 13;
    doc.setTextColor(...dark);
  };

  const kv = (label, value, color = dark) => {
    ensureSpace(7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text(String(label), margin, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(String(value), pageW - margin, y, { align: "right" });
    y += 6.5;
  };

  const subtitle = (text) => {
    ensureSpace(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primary);
    doc.text(text, margin, y);
    y += 6;
    doc.setTextColor(...dark);
  };

  const line = () => {
    ensureSpace(4);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  };

  // Header
  doc.setFillColor(...primary);
  doc.rect(0, 0, pageW, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("StockFlow — Rapport statistique", margin, 12);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const now = new Date();
  doc.text(
    `Généré le ${now.toLocaleDateString("fr-FR")} à ${now.toLocaleTimeString("fr-FR")}`,
    margin,
    20
  );
  y = 36;

  // ===== GÉNÉRAL =====
  title("1. Vue générale");
  kv("Articles", data.items.length);
  kv("Catégories", data.categories.length);
  kv("Entrepôts", data.entrepots.length);
  kv("Mouvements + ajustements", data.mouvements.length + data.ajustements.length);
  kv("Ruptures", data.critique.length, red);
  kv("Stock bas", data.stockBas.length, amber);
  kv("Utilisateurs", data.users.length);
  line();

  // ===== CATÉGORIES =====
  title("2. Catégories");
  kv("Total", data.categories.length);
  kv("Plus fournie", data.catLaPlusDotee?.name || "—");
  kv("Moins fournie", data.catLaMoins?.name || "—");
  kv("Sans article", data.catSansArticles);
  if (data.articlesByCategory?.length) {
    subtitle("Articles par catégorie");
    data.articlesByCategory.forEach((c) => {
      kv(c.name, c.total);
    });
  }
  line();

  // ===== ENTREPÔTS =====
  title("3. Entrepôts");
  kv("Nombre", data.entrepots.length);
  kv("Capacité totale", data.totalCapacite.toLocaleString());
  kv("Top capacité", data.entrepotTop?.name || "—");
  kv("Top articles distincts", data.entrepotPlusArticles?.name || "—");
  if (data.entrepotCapacite?.length) {
    subtitle("Capacité");
    data.entrepotCapacite.forEach((e) => kv(e.name, e.capacite));
  }
  if (data.entrepotArticles?.length) {
    subtitle("Articles distincts présents");
    data.entrepotArticles.forEach((e) => kv(e.name, e.articles));
  }
  line();

  // ===== ARTICLES =====
  title("4. Articles");
  kv("Total", data.items.length);
  kv("Normal", data.normal.length, green);
  kv("Stock bas", data.stockBas.length, amber);
  kv("Rupture", data.critique.length, red);
  kv("Valeur stock (achat)", `$${roundSmart(data.valeurTotale)}`);
  kv("Prix moyen", `$${data.prixMoyen.toFixed(2)}`);
  kv(
    "Article le plus cher",
    data.articleLePlusCher
      ? `${data.articleLePlusCher.name} ($${data.articleLePlusCher.purchase_price || 0})`
      : "—"
  );
  const dispo = data.items.length
    ? Math.round((data.normal.length / data.items.length) * 100)
    : 0;
  kv("Disponibilité", `${dispo}%`);
  line();

  // ===== MOUVEMENTS =====
  title("5. Mouvements");
  kv("Mouvements récents", data.mouvements.length);
  kv("Entrées (nb)", data.entrees.length, green);
  kv("Sorties (nb)", data.sorties.length, red);
  kv("Régularisations", data.regul.length);
  kv("Dépréciations", data.deprec.length, amber);
  kv("Qty entrées", roundSmart(data.qtyEntrees));
  kv("Qty sorties", roundSmart(data.qtySorties));
  if (data.mvtByItem?.length) {
    subtitle("Top articles actifs");
    data.mvtByItem.forEach((m) =>
      kv(m.name, `E:${m.entrees} / S:${m.sorties}`)
    );
  }
  line();

  // ===== USERS =====
  title("6. Utilisateurs");
  kv("Total", data.users.length);
  kv("Admins", data.admins.length);
  kv("Gestionnaires", data.gestionnaires.length);
  kv("Opérateurs", data.operateurs.length);
  kv("Genre M", data.genreM);
  kv("Genre F", data.genreF);
  kv("Autre", data.genreAutre);

  // Footer pages
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(
      `StockFlow · page ${i}/${pages}`,
      pageW / 2,
      pageH - 8,
      { align: "center" }
    );
  }

  return doc;
}

/* ========== UI COMPONENTS ========== */
function GlowIcon({ color, children }) {
  return (
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
        boxShadow: `0 6px 16px color-mix(in srgb, ${color} 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.4)`,
        position: "relative",
        overflow: "hidden",
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
        {children}
      </span>
    </div>
  );
}

function InfoCard({ label, value, icon, color }) {
  return (
    <div
      className="stat-card"
      style={{
        padding: "1rem 1rem",
        borderRadius: 18,
        background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
        border: "1px solid var(--glass-border)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        boxShadow: `0 12px 32px rgba(0,0,0,.16), 0 0 28px color-mix(in srgb, ${color} 32%, transparent), inset 0 1px 0 rgba(255,255,255,0.12)`,
        position: "relative",
        overflow: "hidden",
        minHeight: 92,
        zIndex: 1,
        backdropFilter: "blur(18px)",
        boxSizing: "border-box",
        width: "100%",
        minWidth: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 0% 50%, color-mix(in srgb, ${color} 24%, transparent), transparent 55%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 4,
          borderRadius: 4,
          background: color,
          boxShadow: `0 0 14px ${color}`,
        }}
      />
      <div style={{ marginLeft: 4, zIndex: 1 }}>
        <GlowIcon color={color}>{icon}</GlowIcon>
      </div>
      <div style={{ minWidth: 0, position: "relative", zIndex: 1, flex: 1 }}>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: ".08em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)",
            fontWeight: 900,
            color: "var(--text)",
            lineHeight: 1.15,
            marginTop: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, icon, color = "var(--gradient-start)", children }) {
  return (
    <div
      className="chart-card"
      style={{
        borderRadius: 22,
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        overflow: "hidden",
        boxShadow: "0 10px 32px rgba(0,0,0,.08)",
        position: "relative",
        minWidth: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.95rem 1.15rem",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <GlowIcon color={color}>{icon}</GlowIcon>
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "0.92rem",
            color: "var(--text)",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ padding: "1.15rem", minWidth: 0, overflowX: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function LegendDots({ items }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
        marginTop: 4,
      }}
    >
      {items.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: d.color,
            }}
          />
          {d.name}
        </div>
      ))}
    </div>
  );
}

function EmptyChart({ text = "Aucune donnée" }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2.5rem",
        color: "var(--text-secondary)",
        fontSize: "0.9rem",
      }}
    >
      {text}
    </div>
  );
}

const tooltipStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--glass-border)",
  borderRadius: 12,
  color: "var(--text)",
  boxShadow: "0 12px 32px rgba(0,0,0,.2)",
  fontSize: 13,
};

/* ========== PAGE ========== */
function Statistiques() {
  const currentTheme =
    (typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("general");
  const [pdfPreview, setPdfPreview] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    charger();
  }, []);

  const charger = async () => {
    setLoading(true);
    try {
      const [resCat, resEnt, resItems, resStocks, resMvt, resAjust, resUsers] =
        await Promise.all([
          getCategories(),
          getEntrepots(),
          getItems(),
          safeGet(getStocks),
          getMouvementsRecents(),
          safeGet(getAjustements || getStockAjustments),
          getUsers().catch(() => ({ data: [] })),
        ]);

      const categories = resCat.data || [];
      const entrepots = resEnt.data || [];
      const items = resItems.data || [];
      const stocks = resStocks.data || [];
      const mouvements = resMvt.data || [];
      const ajustements = resAjust.data || [];
      const users = resUsers.data || [];

      const articlesByCategory = categories
        .map((cat) => {
          const parts = (cat.name || "").split(" ");
          const name =
            parts[0]?.length <= 2
              ? parts.slice(1).join(" ") || cat.name
              : cat.name;
          return {
            name: name?.length > 16 ? name.slice(0, 14) + "…" : name,
            total: items.filter((i) => i.category_item === cat.id).length,
            id: cat.id,
          };
        })
        .sort((a, b) => b.total - a.total);

      const catLaPlusDotee = articlesByCategory[0] || null;
      const catLaMoins =
        [...articlesByCategory].sort((a, b) => a.total - b.total)[0] || null;
      const catSansArticles = articlesByCategory.filter(
        (c) => c.total === 0
      ).length;

      const entrepotCapacite = entrepots
        .map((e) => ({
          name: e.reference || e.name || `E${e.id}`,
          capacite: Number(e.capacity || 0),
        }))
        .sort((a, b) => b.capacite - a.capacite);

      const totalCapacite = entrepots.reduce(
        (s, e) => s + (Number(e.capacity) || 0),
        0
      );
      const entrepotTop = entrepotCapacite[0] || null;

      const entrepotArticles = entrepots
        .map((e) => ({
          name: e.reference || e.name || `E${e.id}`,
          articles: countArticlesInEntrepot(
            e.id,
            stocks,
            mouvements,
            ajustements
          ),
        }))
        .sort((a, b) => b.articles - a.articles);

      const totalPresences = entrepotArticles.reduce(
        (s, e) => s + e.articles,
        0
      );
      const entrepotPlusArticles = entrepotArticles[0] || null;

      const itemsWithStock = items.map((i) => {
        const stock = calculerStockTotal(
          i.id,
          stocks,
          mouvements,
          ajustements
        );
        const min = Number(i.minimal_stock ?? 1);
        let status = "normal";
        if (stock <= 0) status = "rupture";
        else if (stock <= min) status = "bas";
        return { ...i, stockReel: stock, status };
      });

      const critique = itemsWithStock.filter((i) => i.status === "rupture");
      const stockBas = itemsWithStock.filter((i) => i.status === "bas");
      const normal = itemsWithStock.filter((i) => i.status === "normal");

      const valeurTotale = itemsWithStock.reduce(
        (s, i) => s + (Number(i.purchase_price) || 0) * (i.stockReel || 0),
        0
      );
      const prixMoyen =
        items.length > 0
          ? items.reduce((s, i) => s + (Number(i.purchase_price) || 0), 0) /
            items.length
          : 0;
      const articleLePlusCher =
        [...items].sort(
          (a, b) =>
            (Number(b.purchase_price) || 0) - (Number(a.purchase_price) || 0)
        )[0] || null;

      const statutPieData = [
        { name: "Normal", value: normal.length, color: "#4ade80" },
        { name: "Stock bas", value: stockBas.length, color: "#fbbf24" },
        { name: "Rupture", value: critique.length, color: "#f87171" },
      ].filter((d) => d.value > 0);

      const entrees = mouvements.filter((m) => m.type === "Entrée");
      const sorties = mouvements.filter((m) => m.type === "Sortie");
      const regul = ajustements.filter((a) => {
        const n = String(a.nature || a.type || "").toLowerCase();
        return n.includes("regular");
      });
      const deprec = ajustements.filter((a) => {
        const n = String(a.nature || a.type || "").toLowerCase();
        return n === "usage" || n === "perte" || n.includes("deprec");
      });

      const qtyEntrees = entrees.reduce((s, m) => s + (Number(m.qty) || 0), 0);
      const qtySorties = sorties.reduce((s, m) => s + (Number(m.qty) || 0), 0);
      const qtyRegul = regul.reduce((s, m) => s + (Number(m.qty) || 0), 0);
      const qtyDeprec = deprec.reduce((s, m) => s + (Number(m.qty) || 0), 0);

      const mvtByItem = items
        .map((item) => ({
          name:
            (item.name || "").length > 14
              ? item.name.slice(0, 12) + "…"
              : item.name,
          entrees: mouvements.filter(
            (m) =>
              Number(m.item_id) === Number(item.id) && m.type === "Entrée"
          ).length,
          sorties: mouvements.filter(
            (m) =>
              Number(m.item_id) === Number(item.id) && m.type === "Sortie"
          ).length,
        }))
        .filter((i) => i.entrees + i.sorties > 0)
        .sort((a, b) => b.entrees + b.sorties - (a.entrees + a.sorties))
        .slice(0, 5);

      const admins = users.filter((u) => u.role === "Admin");
      const gestionnaires = users.filter((u) => u.role === "Gestionnaire");
      const operateurs = users.filter((u) => u.role === "Opérateur");

      const rolePieData = [
        { name: "Admin", value: admins.length, color: "#fbbf24" },
        { name: "Gestionnaire", value: gestionnaires.length, color: "#60a5fa" },
        { name: "Opérateur", value: operateurs.length, color: "#4ade80" },
      ].filter((d) => d.value > 0);

      const genreM = users.filter((u) => u.genre === "M").length;
      const genreF = users.filter((u) => u.genre === "F").length;
      const genreAutre = users.filter(
        (u) => u.genre && u.genre !== "M" && u.genre !== "F"
      ).length;

      setData({
        categories,
        entrepots,
        items,
        stocks,
        mouvements,
        ajustements,
        users,
        articlesByCategory: articlesByCategory.slice(0, 8),
        catLaPlusDotee,
        catLaMoins,
        catSansArticles,
        entrepotCapacite: entrepotCapacite.slice(0, 8),
        entrepotArticles: entrepotArticles.slice(0, 8),
        totalCapacite,
        totalPresences,
        entrepotTop,
        entrepotPlusArticles,
        critique,
        stockBas,
        normal,
        valeurTotale,
        prixMoyen,
        articleLePlusCher,
        statutPieData,
        entrees,
        sorties,
        regul,
        deprec,
        qtyEntrees,
        qtySorties,
        qtyRegul,
        qtyDeprec,
        mvtByItem,
        admins,
        gestionnaires,
        operateurs,
        rolePieData,
        genreM,
        genreF,
        genreAutre,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!data || pdfBusy) return;
    setPdfBusy(true);
    try {
      const doc = await buildStatsPdf(data);
      const stamp = new Date().toISOString().slice(0, 10);
      doc.save(`StockFlow_Statistiques_${stamp}.pdf`);
    } catch (e) {
      console.error(e);
      alert(
        "Impossible de générer le PDF. Vérifiez la connexion (CDN jsPDF) puis réessayez."
      );
    } finally {
      setPdfBusy(false);
    }
  };

  const SECTIONS = [
    { key: "general", label: "Vue générale", icon: <Activity size={16} /> },
    { key: "categories", label: "Catégories", icon: <FolderOpen size={16} /> },
    { key: "entrepots", label: "Entrepôts", icon: <Warehouse size={16} /> },
    { key: "articles", label: "Articles", icon: <Package size={16} /> },
    { key: "mouvements", label: "Mouvements", icon: <RefreshCw size={16} /> },
    { key: "users", label: "Utilisateurs", icon: <Users size={16} /> },
  ];

  if (loading) {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "60vh",
          ...(typeof themeCssVars === "function"
            ? themeCssVars(currentTheme)
            : {}),
        }}
      >
        <ThemeBackground theme={currentTheme} />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "4rem 20px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <BarChart2
            size={40}
            style={{ margin: "0 auto 1rem", opacity: 0.4, display: "block" }}
          />
          Calcul des statistiques...
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      className="stats-shell"
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
        className="stats-page"
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
            marginBottom: "1.1rem",
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
            <BarChart2 size={30} />
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
              color: "var(--gradient-start)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            <Activity size={12} /> Analytics
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
            Tableau analytique
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              margin: 0,
              fontSize: "0.92rem",
              maxWidth: 520,
            }}
          >
            Vue d&apos;ensemble et indicateurs clés de votre stock et de votre
            équipe.
          </p>

          {/* Bouton export PDF */}
          <button
            type="button"
            onClick={() => setPdfPreview(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 4,
              padding: "0.7rem 1.2rem",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: "0 8px 22px var(--glow-color)",
            }}
          >
            <FileText size={16} />
            Exporter PDF
          </button>
        </div>

        {/* TABS — centrés */}
        <div
          className="stats-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.35rem",
            marginBottom: "1.5rem",
            padding: "0.4rem",
            background: "var(--card-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: 16,
            maxWidth: "100%",
            flexWrap: "wrap",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSection(s.key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "0.55rem 0.9rem",
                borderRadius: 12,
                border: "none",
                background:
                  section === s.key
                    ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                    : "transparent",
                color: section === s.key ? "#fff" : "var(--text-secondary)",
                fontWeight: section === s.key ? 700 : 500,
                fontSize: "0.82rem",
                cursor: "pointer",
                boxShadow:
                  section === s.key ? "0 4px 12px var(--glow-color)" : "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* ========== GÉNÉRAL ========== */}
        {section === "general" && (
          <div>
            <div
              className="kpi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.4rem",
              }}
            >
              <InfoCard
                label="Articles"
                value={data.items.length}
                icon={<Package size={18} />}
                color="var(--gradient-start)"
              />
              <InfoCard
                label="Catégories"
                value={data.categories.length}
                icon={<FolderOpen size={18} />}
                color="#a855f7"
              />
              <InfoCard
                label="Entrepôts"
                value={data.entrepots.length}
                icon={<Warehouse size={18} />}
                color="#10b981"
              />
              <InfoCard
                label="Mouvements"
                value={data.mouvements.length + data.ajustements.length}
                icon={<RefreshCw size={18} />}
                color="#f97316"
              />
              <InfoCard
                label="Ruptures"
                value={data.critique.length}
                icon={<TrendingDown size={18} />}
                color="#f87171"
              />
              <InfoCard
                label="Utilisateurs"
                value={data.users.length}
                icon={<Users size={18} />}
                color="#60a5fa"
              />
            </div>
          </div>
        )}

        {/* ========== CATÉGORIES ========== */}
        {section === "categories" && (
          <div>
            <div
              className="kpi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.4rem",
              }}
            >
              <InfoCard
                label="Total"
                value={data.categories.length}
                icon={<FolderOpen size={18} />}
                color="#a855f7"
              />
              <InfoCard
                label="Plus fournie"
                value={data.catLaPlusDotee?.name || "—"}
                icon={<Award size={18} />}
                color="#fbbf24"
              />
              <InfoCard
                label="Moins fournie"
                value={data.catLaMoins?.name || "—"}
                icon={<TrendingDown size={18} />}
                color="#f87171"
              />
              <InfoCard
                label="Sans article"
                value={data.catSansArticles}
                icon={<Package size={18} />}
                color="#94a3b8"
              />
            </div>
            <ChartCard
              title="Articles par catégorie"
              icon={<BarChart2 size={16} />}
              color="#a855f7"
            >
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data.articlesByCategory} barSize={22}>
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--text-secondary)" }}
                  />
                  <YAxis
                    stroke="var(--text-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--text-secondary)" }}
                    allowDecimals={false}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--glass-border)"
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="total"
                    name="Articles"
                    fill="#a855f7"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* ========== ENTREPÔTS ========== */}
        {section === "entrepots" && (
          <div>
            <div
              className="kpi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.4rem",
              }}
            >
              <InfoCard
                label="Entrepôts"
                value={data.entrepots.length}
                icon={<Warehouse size={18} />}
                color="#10b981"
              />
              <InfoCard
                label="Capacité totale"
                value={data.totalCapacite.toLocaleString()}
                icon={<Package size={18} />}
                color="#38bdf8"
              />
              <InfoCard
                label="Top capacité"
                value={data.entrepotTop?.name || "—"}
                icon={<Award size={18} />}
                color="#fbbf24"
              />
              <InfoCard
                label="Top articles"
                value={data.entrepotPlusArticles?.name || "—"}
                icon={<Package size={18} />}
                color="#a855f7"
              />
            </div>
            <div
              className="charts-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
              }}
            >
              <ChartCard
                title="Capacité par entrepôt"
                icon={<Warehouse size={16} />}
                color="#10b981"
              >
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data.entrepotCapacite} barSize={22}>
                    <XAxis
                      dataKey="name"
                      stroke="var(--text-secondary)"
                      fontSize={11}
                      tick={{ fill: "var(--text-secondary)" }}
                    />
                    <YAxis
                      stroke="var(--text-secondary)"
                      fontSize={11}
                      tick={{ fill: "var(--text-secondary)" }}
                    />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--glass-border)"
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar
                      dataKey="capacite"
                      name="Capacité"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard
                title="Articles distincts par entrepôt"
                icon={<Package size={16} />}
                color="#a855f7"
              >
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data.entrepotArticles} barSize={22}>
                    <XAxis
                      dataKey="name"
                      stroke="var(--text-secondary)"
                      fontSize={11}
                      tick={{ fill: "var(--text-secondary)" }}
                    />
                    <YAxis
                      stroke="var(--text-secondary)"
                      fontSize={11}
                      tick={{ fill: "var(--text-secondary)" }}
                      allowDecimals={false}
                    />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--glass-border)"
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar
                      dataKey="articles"
                      name="Articles présents"
                      fill="#a855f7"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    textAlign: "center",
                  }}
                >
                  1 article compté une fois s&apos;il est présent dans
                  l&apos;entrepôt (stock ou mouvement).
                </p>
              </ChartCard>
            </div>
          </div>
        )}

        {/* ========== ARTICLES ========== */}
        {section === "articles" && (
          <div>
            <div
              className="kpi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.4rem",
              }}
            >
              <InfoCard
                label="Total"
                value={data.items.length}
                icon={<Package size={18} />}
                color="var(--gradient-start)"
              />
              <InfoCard
                label="Normal"
                value={data.normal.length}
                icon={<Package size={18} />}
                color="#4ade80"
              />
              <InfoCard
                label="Stock bas"
                value={data.stockBas.length}
                icon={<TrendingDown size={18} />}
                color="#fbbf24"
              />
              <InfoCard
                label="Rupture"
                value={data.critique.length}
                icon={<TrendingDown size={18} />}
                color="#f87171"
              />
              <InfoCard
                label="Valeur stock"
                value={`$${roundSmart(data.valeurTotale)}`}
                icon={<BarChart2 size={18} />}
                color="#38bdf8"
              />
              <InfoCard
                label="Prix moyen"
                value={`$${data.prixMoyen.toFixed(2)}`}
                icon={<Award size={18} />}
                color="#a855f7"
              />
            </div>
            <div
              className="charts-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
              }}
            >
              <ChartCard
                title="Répartition des statuts"
                icon={<PieChart size={16} />}
                color="#6366f1"
              >
                {data.statutPieData.length === 0 ? (
                  <EmptyChart />
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={220}>
                      <RePie>
                        <Pie
                          data={data.statutPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {data.statutPieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </RePie>
                    </ResponsiveContainer>
                    <LegendDots
                      items={data.statutPieData.map((d) => ({
                        ...d,
                        name: `${d.name} (${d.value})`,
                      }))}
                    />
                  </>
                )}
              </ChartCard>
              <ChartCard
                title="Indicateurs"
                icon={<Award size={16} />}
                color="#fbbf24"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    {
                      label: "Article le plus cher",
                      value: data.articleLePlusCher?.name || "—",
                      sub: `$${data.articleLePlusCher?.purchase_price || 0}`,
                      color: "#fbbf24",
                    },
                    {
                      label: "Ruptures",
                      value: `${data.critique.length} / ${data.items.length}`,
                      sub: "stock réel ≤ 0",
                      color: "#f87171",
                    },
                    {
                      label: "Disponibilité",
                      value: `${
                        data.items.length
                          ? Math.round(
                              (data.normal.length / data.items.length) * 100
                            )
                          : 0
                      }%`,
                      sub: "stock normal",
                      color: "#4ade80",
                    },
                  ].map((ind, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.7rem 0.9rem",
                        borderRadius: 12,
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        gap: 10,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          {ind.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {ind.sub}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          color: ind.color,
                          textAlign: "right",
                        }}
                      >
                        {ind.value}
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {/* ========== MOUVEMENTS ========== */}
        {section === "mouvements" && (
          <div>
            <div
              className="kpi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.4rem",
              }}
            >
              <InfoCard
                label="Total mvt"
                value={data.mouvements.length}
                icon={<RefreshCw size={18} />}
                color="var(--gradient-start)"
              />
              <InfoCard
                label="Entrées"
                value={data.entrees.length}
                icon={<ArrowUpCircle size={18} />}
                color="#4ade80"
              />
              <InfoCard
                label="Sorties"
                value={data.sorties.length}
                icon={<ArrowDownCircle size={18} />}
                color="#f87171"
              />
              <InfoCard
                label="Régularisation"
                value={data.regul.length}
                icon={<BarChart2 size={18} />}
                color="#60a5fa"
              />
              <InfoCard
                label="Dépréciation"
                value={data.deprec.length}
                icon={<TrendingDown size={18} />}
                color="#fbbf24"
              />
            </div>
            <ChartCard
              title="Top 5 articles actifs"
              icon={<Activity size={16} />}
              color="#f97316"
            >
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data.mvtByItem} barSize={22}>
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--text-secondary)" }}
                  />
                  <YAxis
                    stroke="var(--text-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--text-secondary)" }}
                    allowDecimals={false}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--glass-border)"
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Bar
                    dataKey="entrees"
                    name="Entrées"
                    fill="#4ade80"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="sorties"
                    name="Sorties"
                    fill="#f87171"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* ========== USERS ========== */}
        {section === "users" && (
          <div>
            <div
              className="kpi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.4rem",
              }}
            >
              <InfoCard
                label="Total"
                value={data.users.length}
                icon={<Users size={18} />}
                color="var(--gradient-start)"
              />
              <InfoCard
                label="Admins"
                value={data.admins.length}
                icon={<Crown size={18} />}
                color="#fbbf24"
              />
              <InfoCard
                label="Gestionnaires"
                value={data.gestionnaires.length}
                icon={<UserCog size={18} />}
                color="#60a5fa"
              />
              <InfoCard
                label="Opérateurs"
                value={data.operateurs.length}
                icon={<UserCheck size={18} />}
                color="#4ade80"
              />
            </div>
            <div
              className="charts-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
              }}
            >
              <ChartCard
                title="Répartition par rôle"
                icon={<PieChart size={16} />}
                color="#fbbf24"
              >
                {data.rolePieData.length === 0 ? (
                  <EmptyChart />
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={220}>
                      <RePie>
                        <Pie
                          data={data.rolePieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {data.rolePieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </RePie>
                    </ResponsiveContainer>
                    <LegendDots
                      items={data.rolePieData.map((d) => ({
                        ...d,
                        name: `${d.name} (${d.value})`,
                      }))}
                    />
                  </>
                )}
              </ChartCard>
              <ChartCard
                title="Répartition par genre"
                icon={<Users size={16} />}
                color="#ec4899"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Masculin", value: data.genreM, color: "#60a5fa" },
                    { label: "Féminin", value: data.genreF, color: "#ec4899" },
                    {
                      label: "Autre",
                      value: data.genreAutre,
                      color: "#a855f7",
                    },
                  ].map((g, i) => {
                    const max = Math.max(data.users.length, 1);
                    return (
                      <div key={i}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 4,
                          }}
                        >
                          <span
                            style={{ fontSize: "0.85rem", color: "var(--text)" }}
                          >
                            {g.label}
                          </span>
                          <span style={{ fontWeight: 700, color: g.color }}>
                            {g.value}
                          </span>
                        </div>
                        <div
                          style={{
                            height: 8,
                            borderRadius: 999,
                            background: "var(--glass-bg)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${(g.value / max) * 100}%`,
                              background: g.color,
                              borderRadius: 999,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {/* ========== PREVIEW PDF ========== */}
        {pdfPreview && (
          <div
            onClick={() => !pdfBusy && setPdfPreview(false)}
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
                maxWidth: 520,
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
                  alignItems: "flex-start",
                  marginBottom: 14,
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
                    Prévisualisation PDF
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      marginTop: 4,
                    }}
                  >
                    Rapport complet · toutes les sections · couleur
                  </div>
                </div>
                <button
                  type="button"
                  disabled={pdfBusy}
                  onClick={() => setPdfPreview(false)}
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
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    t: "Vue générale",
                    d: `${data.items.length} articles · ${data.critique.length} ruptures · ${data.users.length} users`,
                  },
                  {
                    t: "Catégories",
                    d: `${data.categories.length} · top : ${data.catLaPlusDotee?.name || "—"}`,
                  },
                  {
                    t: "Entrepôts",
                    d: `${data.entrepots.length} · capacité ${data.totalCapacite.toLocaleString()}`,
                  },
                  {
                    t: "Articles",
                    d: `Normal ${data.normal.length} · bas ${data.stockBas.length} · rupture ${data.critique.length}`,
                  },
                  {
                    t: "Mouvements",
                    d: `E ${data.entrees.length} · S ${data.sorties.length} · régul. ${data.regul.length}`,
                  },
                  {
                    t: "Utilisateurs",
                    d: `Admin ${data.admins.length} · Gest. ${data.gestionnaires.length} · Op. ${data.operateurs.length}`,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "0.75rem 0.9rem",
                      borderRadius: 14,
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--gradient-start)",
                        fontSize: "0.82rem",
                      }}
                    >
                      {i + 1}. {row.t}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {row.d}
                    </div>
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
                Téléchargement direct (pas d&apos;impression) · mobile & desktop
              </p>
            </div>
          </div>
        )}

        <Footer />

        <style>{`
@media (max-width: 900px) {
  .charts-row { grid-template-columns: 1fr !important; }
}
@media (max-width: 768px) {
  .stats-page { padding: 0 12px 1.5rem !important; }
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .stats-tabs { justify-content: flex-start !important; }
}
@media (max-width: 420px) {
  .kpi-grid { grid-template-columns: 1fr !important; }
}
`}</style>
      </div>
    </div>
  );
}

export default Statistiques;
export { calculerStockTotal, countArticlesInEntrepot };
