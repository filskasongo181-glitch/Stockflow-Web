// /**
//  * Dashboard — logique données conservée + convertirQuantite
//  * - moins d'espace sous navbar
//  * - pas de reflet sur l'icône page
//  * - stocks critiques : tous + nom/marque/modèle/seuil/qty lisible
//  * - responsive renforcé
//  */
// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import {
//   LayoutDashboard,
//   Package,
//   FolderOpen,
//   DollarSign,
//   ArrowLeftRight,
//   AlertTriangle,
//   CheckCircle,
//   TrendingUp,
//   Warehouse,
//   Activity,
//   Sparkles,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import {
//   getCategories,
//   getEntrepots,
//   getItems,
//   getStocks,
//   getMouvementsRecents,
// } from "../api/api";
// import Footer from "../components/Footer";

// /* ============================================================
//    CONVERSION QUANTITÉS (logique desktop)
//    ============================================================ */
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

// const calculerStockTotal = (
//   itemId,
//   stocks,
//   mouvements,
//   stock_ajustments
// ) => {
//   const itemIdNum = Number(itemId);

//   // ============================================================
//   // 1. Récupérer tous les entrepôts concernés par cet article
//   // ============================================================

//   const entrepots = new Set();

//   // Stocks
//   (stocks || [])
//     .filter(
//       (s) =>
//         Number(s.item_id) === itemIdNum &&
//         Number(s.deleted ?? 0) === 0
//     )
//     .forEach((s) => {
//       entrepots.add(Number(s.entrepot_id));
//     });

//   // Mouvements
//   (mouvements || [])
//     .filter(
//       (m) =>
//         Number(m.item_id) === itemIdNum &&
//         Number(m.deleted ?? 0) === 0
//     )
//     .forEach((m) => {
//       entrepots.add(Number(m.entrepot_id));
//     });

//   // Ajustements
//   (stock_ajustments || [])
//     .filter(
//       (a) =>
//         Number(a.item_id) === itemIdNum &&
//         Number(a.deleted ?? 0) === 0
//     )
//     .forEach((a) => {
//       entrepots.add(Number(a.entrepot_id));
//     });

//   // ============================================================
//   // 2. Calculer le stock entrepôt par entrepôt
//   // ============================================================

//   let total = 0;

//   entrepots.forEach((entrepotId) => {
//     // ----------------------------------------------------------
//     // STOCK DE BASE
//     // ----------------------------------------------------------

//     const stock = (stocks || []).find(
//       (s) =>
//         Number(s.item_id) === itemIdNum &&
//         Number(s.entrepot_id) === entrepotId &&
//         Number(s.deleted ?? 0) === 0
//     );

//     let q = Number(stock?.stock_actual ?? 0);

//     // ----------------------------------------------------------
//     // MOUVEMENTS
//     // ----------------------------------------------------------

//     (mouvements || [])
//       .filter(
//         (m) =>
//           Number(m.item_id) === itemIdNum &&
//           Number(m.entrepot_id) === entrepotId &&
//           Number(m.deleted ?? 0) === 0
//       )
//       .forEach((m) => {
//         const qty = Number(m.qty ?? 0);

//         if (m.type === "Entrée") {
//           q += qty;
//         } else if (m.type === "Sortie") {
//           q -= qty;
//         }
//       });

//     // ----------------------------------------------------------
//     // AJUSTEMENTS
//     // ----------------------------------------------------------

//     (stock_ajustments || [])
//       .filter(
//         (a) =>
//           Number(a.item_id) === itemIdNum &&
//           Number(a.entrepot_id) === entrepotId &&
//           Number(a.deleted ?? 0) === 0
//       )
//       .forEach((a) => {
//         const qty = Number(a.qty ?? 0);

//         if (a.type === "Entrée") {
//           q += qty;
//         } else if (a.type === "Sortie") {
//           q -= qty;
//         }
//       });

//     console.log("STOCK ENTREPÔT", {
//       itemId: itemIdNum,
//       entrepotId,
//       stockInitial: stock?.stock_actual ?? 0,
//       stockCalcule: q,
//     });

//     total += q;
//   });

//   return total;
// };

// function designation(item) {
//   if (!item) return "—";
//   return [item.name, item.mark, item.modele]
//     .map((x) => (x || "").toString().trim())
//     .filter(Boolean)
//     .join(" · ") || "—";
// }

// function Dashboard() {
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [stats, setStats] = useState({
//     totalArticles: 0,
//     totalCategories: 0,
//     totalEntrepots: 0,
//     valeurStock: 0,
//     totalMouvements: 0,
//   });
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [stockCritique, setStockCritique] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     chargerDonnees();
//   }, []);

//   const chargerDonnees = async () => {
//     setLoading(true);
//     try {
//       const [resCategories, resEntrepots, resItems, resStocks, resMvts] =
//         await Promise.all([
//           getCategories(),
//           getEntrepots(),
//           getItems(),
//           getStocks(),
//           getMouvementsRecents(),
//         ]);

//       const items = resItems.data || [];
//       const categories = resCategories.data || [];
//       const entrepots = resEntrepots.data || [];
//       const stocks = resStocks.data || [];
//       const mouvements = resMvts.data || [];

//       const mouvementsActifs = (mouvements || []).filter(
//         (m) => Number(m.deleted ?? 0) === 0
//       );

//       const valeurTotale = stocks.reduce((sum, s) => {
//         const item = items.find((i) => i.id === s.item_id);
//         const prix = item ? item.purchase_price || 0 : 0;
//         return sum + prix * (s.stock_actual || 0);
//       }, 0);

//       setStats({
//         totalArticles: items.length,
//         totalCategories: categories.length,
//         totalEntrepots: entrepots.length,
//         valeurStock: valeurTotale,
//         totalMouvements: mouvements.length,
//       });

//       const compteParCategorie = categories.map((cat) => {
//         const count = items.filter((i) => i.category_item === cat.id).length;
//         const parts = (cat.name || "").split(" ");
//         const name =
//           parts[0]?.length <= 2
//             ? parts.slice(1).join(" ") || cat.name
//             : cat.name;
//         return {
//           name: name.length > 14 ? name.slice(0, 12) + "…" : name,
//           total: count,
//         };
//       });

//       setCategoriesData(
//         compteParCategorie.sort((a, b) => b.total - a.total).slice(0, 6)
//       );

//       // Tous les articles sous seuil (pas de limite 6)
//       const critiques = items
//         .map((item) => {
//           const qty = calculerStockTotal(item.id, stocks, mouvementsActifs);
//           const seuil = Number(item.minimal_stock ?? 0);
//           return {
//             id: item.id,
//             nom: item.name || "Inconnu",
//             mark: item.mark || "",
//             modele: item.modele || "",
//             designation: designation(item),
//             qty,
//             seuil,
//             qtyLabel: convertirQuantite(qty, item),
//             seuilLabel: convertirQuantite(seuil, item),
//             item,
//           };
//         })
//         .filter((row) => row.qty <= row.seuil)
//         .sort((a, b) => a.qty - b.qty);

//       setStockCritique(critiques);
//     } catch (err) {
//       console.error("Erreur chargement dashboard :", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           position: "relative",
//           minHeight: "50vh",
//           ...(typeof themeCssVars === "function"
//             ? themeCssVars(currentTheme)
//             : {}),
//         }}
//       >
//         <div
//           aria-hidden
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 0,
//             pointerEvents: "none",
//           }}
//         >
//           <ThemeBackground theme={currentTheme} />
//         </div>
//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             width: "100%",
//             maxWidth: 1320,
//             margin: "0 auto",
//             padding: "3rem 20px",
//             textAlign: "center",
//             color: "var(--text-secondary)",
//           }}
//         >
//           <div
//             style={{
//               width: 48,
//               height: 48,
//               margin: "0 auto 1rem",
//               borderRadius: 16,
//               border: "2px solid var(--glass-border)",
//               borderTopColor: "var(--gradient-start)",
//               animation: "dashSpin 0.9s linear infinite",
//             }}
//           />
//           Chargement du tableau de bord...
//           <style>{`@keyframes dashSpin { to { transform: rotate(360deg); } }`}</style>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="dashboard-shell"
//       style={{
//         position: "relative",
//         minHeight: "100%",
//         maxWidth: 1320,
//         width: "100%",
//         padding: "0 20px 2rem",
//         boxSizing: "border-box",
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
//         className="dashboard-page"
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
//         {/* ===== HEADER — espace réduit, icône sans reflet ===== */}
//         <div
//           style={{
//             display: "flex",
//             position: "relative",
//             zIndex: 1,
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
//             <LayoutDashboard size={30} />
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
//             <Activity size={12} />
//             Vue d&apos;ensemble
//             <Sparkles size={11} style={{ opacity: 0.85 }} />
//           </div>

//           <div>
//             <h1
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
//                 fontWeight: 900,
//                 margin: 0,
//                 lineHeight: 1.15,
//                 background:
//                   "linear-gradient(135deg, var(--text), var(--gradient-start))",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               Tableau de bord
//             </h1>
//             <p
//               style={{
//                 marginTop: "0.5rem",
//                 color: "var(--text-secondary)",
//                 fontSize: "0.92rem",
//                 maxWidth: 520,
//                 lineHeight: 1.55,
//                 marginLeft: "auto",
//                 marginRight: "auto",
//               }}
//             >
//               Suivez en un coup d&apos;œil vos stocks, catégories, valeur et
//               alertes critiques.
//             </p>
//           </div>
//         </div>

//         {/* ===== STAT CARDS ===== */}
//         <div
//           className="stats-grid"
//           style={{
//             position: "relative",
//             zIndex: 1,
//             display: "grid",
//             gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
//             gap: "0.85rem",
//             marginBottom: "1.4rem",
//           }}
//         >
//           <StatCard
//             label="Articles"
//             value={stats.totalArticles}
//             icon={<Package size={18} />}
//             color="var(--gradient-start)"
//           />
//           <StatCard
//             label="Catégories"
//             value={stats.totalCategories}
//             icon={<FolderOpen size={18} />}
//             color="var(--gradient-end)"
//           />
//           <StatCard
//             label="Entrepôts"
//             value={stats.totalEntrepots}
//             icon={<Warehouse size={18} />}
//             color="#38bdf8"
//           />
//           <StatCard
//             label="Valeur stock"
//             value={`${Number(stats.valeurStock).toFixed(2)} $`}
//             icon={<DollarSign size={18} />}
//             color="#fbbf24"
//           />
//           <StatCard
//             label="Mouvements"
//             value={stats.totalMouvements}
//             icon={<ArrowLeftRight size={18} />}
//             color="#a78bfa"
//           />
//         </div>

//         {/* ===== PANELS ===== */}
//         <div
//           className="dashboard-panels"
//           style={{
//             position: "relative",
//             zIndex: 1,
//             display: "grid",
//             gridTemplateColumns: "1.45fr 1fr",
//             gap: "1.1rem",
//             marginBottom: "1.35rem",
//           }}
//         >
//           <Panel
//             title="Catégories les plus fournies"
//             subtitle="Top par nombre d'articles"
//             icon={<TrendingUp size={16} />}
//           >
//             {categoriesData.length === 0 ? (
//               <EmptyHint text="Aucune catégorie à afficher." />
//             ) : (
//               <div style={{ width: "100%", height: 260 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={categoriesData}
//                     margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="var(--glass-border)"
//                       vertical={false}
//                     />
//                     <XAxis
//                       dataKey="name"
//                       stroke="var(--text-secondary)"
//                       fontSize={11}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <YAxis
//                       stroke="var(--text-secondary)"
//                       fontSize={11}
//                       tickLine={false}
//                       axisLine={false}
//                       allowDecimals={false}
//                     />
//                     <Tooltip
//                       cursor={{
//                         fill: "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
//                       }}
//                       contentStyle={{
//                         background: "var(--card-bg)",
//                         border: "1px solid var(--glass-border)",
//                         borderRadius: 12,
//                         color: "var(--text)",
//                         boxShadow: "0 12px 32px rgba(0,0,0,.2)",
//                         fontSize: 13,
//                       }}
//                     />
//                     <defs>
//                       <linearGradient
//                         id="barGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="0%"
//                           stopColor="var(--gradient-start)"
//                         />
//                         <stop
//                           offset="100%"
//                           stopColor="var(--gradient-end)"
//                         />
//                       </linearGradient>
//                     </defs>
//                     <Bar
//                       dataKey="total"
//                       fill="url(#barGradient)"
//                       radius={[10, 10, 4, 4]}
//                       maxBarSize={48}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </Panel>

//           <Panel
//             title="Stocks critiques"
//             subtitle={
//               stockCritique.length === 0
//                 ? "Sous le seuil minimal"
//                 : `${stockCritique.length} article${stockCritique.length > 1 ? "s" : ""} sous seuil`
//             }
//             icon={<AlertTriangle size={16} />}
//           >
//             {stockCritique.length === 0 ? (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "0.75rem",
//                   padding: "2rem 1rem",
//                   textAlign: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 16,
//                     background: "rgba(74,222,128,.12)",
//                     border: "1px solid rgba(74,222,128,.25)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#4ade80",
//                   }}
//                 >
//                   <CheckCircle size={24} />
//                 </div>
//                 <div
//                   style={{
//                     fontWeight: 700,
//                     color: "var(--text)",
//                     fontSize: "0.95rem",
//                   }}
//                 >
//                   Aucun produit critique
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "0.82rem",
//                     color: "var(--text-secondary)",
//                   }}
//                 >
//                   Tous vos stocks sont au-dessus du seuil.
//                 </div>
//               </div>
//             ) : (
//               <div
//                 className="critiques-scroll"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 8,
//                   maxHeight: 320,
//                   overflowY: "auto",
//                   paddingRight: 4,
//                 }}
//               >
//                 {stockCritique.map((p) => (
//                   <div
//                     key={p.id}
//                     style={{
//                       display: "flex",
//                       alignItems: "flex-start",
//                       justifyContent: "space-between",
//                       gap: 10,
//                       padding: "0.75rem 0.85rem",
//                       borderRadius: 14,
//                       background: "var(--glass-bg)",
//                       border: "1px solid var(--glass-border)",
//                     }}
//                   >
//                     <div style={{ minWidth: 0, flex: 1 }}>
//                       <div
//                         style={{
//                           fontWeight: 700,
//                           fontSize: "0.88rem",
//                           color: "var(--text)",
//                           lineHeight: 1.35,
//                           wordBreak: "break-word",
//                         }}
//                       >
//                         {p.nom}
//                         {(p.mark || p.modele) && (
//                           <span
//                             style={{
//                               fontWeight: 500,
//                               color: "var(--text-secondary)",
//                               fontSize: "0.8rem",
//                             }}
//                           >
//                             {" "}
//                             · {[p.mark, p.modele].filter(Boolean).join(" · ")}
//                           </span>
//                         )}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "0.72rem",
//                           color: "var(--text-secondary)",
//                           marginTop: 4,
//                         }}
//                       >
//                         Seuil : {p.seuilLabel}
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         padding: "0.35rem 0.65rem",
//                         borderRadius: 999,
//                         background:
//                           p.qty === 0
//                             ? "rgba(239,68,68,.14)"
//                             : "rgba(245,158,11,.14)",
//                         color: p.qty === 0 ? "#f87171" : "#fbbf24",
//                         fontWeight: 800,
//                         fontSize: "0.75rem",
//                         fontFamily: "Syne, sans-serif",
//                         flexShrink: 0,
//                         maxWidth: "46%",
//                         textAlign: "right",
//                         lineHeight: 1.3,
//                       }}
//                       title={p.qtyLabel}
//                     >
//                       {p.qtyLabel}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Panel>
//         </div>

//         {/* ===== BANDE RÉSUMÉ ===== */}
//         <div
//           className="summary-band"
//           style={{
//             position: "relative",
//             zIndex: 1,
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//             gap: "1.1rem",
//             padding: "1.25rem 1.15rem",
//             borderRadius: 26,
//             background: "var(--card-bg)",
//             border: "1px solid var(--glass-border)",
//             boxShadow: `
//               0 16px 42px rgba(0,0,0,.16),
//               0 0 48px var(--glow-color),
//               inset 0 1px 0 rgba(255,255,255,0.12)
//             `,
//             overflow: "hidden",
//             marginBottom: "1rem",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: "80%",
//               height: 2,
//               background: `
//                 linear-gradient(
//                   90deg,
//                   transparent,
//                   var(--gradient-start),
//                   var(--gradient-end),
//                   transparent
//                 )
//               `,
//               opacity: 0.9,
//               pointerEvents: "none",
//             }}
//           />
//           <SummaryItem
//             icon={<Package size={16} />}
//             label="Catalogue"
//             text={`${stats.totalArticles} article${stats.totalArticles > 1 ? "s" : ""} · ${stats.totalCategories} catégorie${stats.totalCategories > 1 ? "s" : ""}`}
//           />
//           <SummaryItem
//             icon={<Warehouse size={16} />}
//             label="Logistique"
//             text={`${stats.totalEntrepots} entrepôt${stats.totalEntrepots > 1 ? "s" : ""} actifs`}
//           />
//           <SummaryItem
//             icon={<AlertTriangle size={16} />}
//             label="Alertes"
//             text={
//               stockCritique.length === 0
//                 ? "Aucune alerte stock"
//                 : `${stockCritique.length} sous seuil`
//             }
//             accent={stockCritique.length > 0 ? "#f87171" : "#4ade80"}
//           />
//           <SummaryItem
//             icon={<ArrowLeftRight size={16} />}
//             label="Activité"
//             text={`${stats.totalMouvements} mouvement${stats.totalMouvements > 1 ? "s" : ""}`}
//           />
//         </div>

//         <Footer />

//         <style>{`
//           .dashboard-page .stat-card {
//             transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
//             min-width: 0;
//           }
//           .dashboard-page .stat-card:hover {
//             transform: translateY(-3px);
//             box-shadow: 0 16px 36px rgba(0,0,0,.14), 0 0 24px var(--glow-color);
//           }
//           .critiques-scroll::-webkit-scrollbar { width: 5px; }
//           .critiques-scroll::-webkit-scrollbar-thumb {
//             background: var(--glass-border);
//             border-radius: 8px;
//           }
//           .panel-title-text {
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//           }
//           @media (max-width: 1100px) {
//             .stats-grid {
//               grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
//             }
//           }
//           @media (max-width: 900px) {
//             .dashboard-panels {
//               grid-template-columns: 1fr !important;
//             }
//           }
//           @media (max-width: 720px) {
//             .stats-grid {
//               grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
//               gap: 0.65rem !important;
//             }
//             .dashboard-page {
//               padding: 0 12px 1.5rem !important;
//             }
//           }
//           @media (max-width: 400px) {
//             .stats-grid {
//               grid-template-columns: 1fr !important;
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
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

// function Panel({ title, subtitle, icon, children }) {
//   return (
//     <div
//       style={{
//         borderRadius: 24,
//         background: "var(--card-bg)",
//         border: "1px solid var(--glass-border)",
//         padding: "1.15rem 1.15rem",
//         boxShadow:
//           "0 16px 42px rgba(0,0,0,.18), 0 0 36px var(--glow-color), inset 0 1px 0 rgba(255,255,255,0.1)",
//         position: "relative",
//         overflow: "hidden",
//         minHeight: 300,
//         display: "flex",
//         flexDirection: "column",
//         backdropFilter: "blur(16px)",
//         minWidth: 0,
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "70%",
//           height: 2,
//           background: `
//             linear-gradient(
//               90deg,
//               transparent,
//               var(--gradient-start),
//               var(--gradient-end),
//               transparent
//             )
//           `,
//           opacity: 0.85,
//           pointerEvents: "none",
//         }}
//       />
//       <div
//         style={{
//           display: "flex",
//           alignItems: "flex-start",
//           gap: "0.65rem",
//           marginBottom: "1rem",
//           minWidth: 0,
//         }}
//       >
//         <div
//           style={{
//             width: 34,
//             height: 34,
//             borderRadius: 11,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background:
//               "color-mix(in srgb, var(--gradient-start) 14%, transparent)",
//             border: "1px solid var(--glass-border)",
//             color: "var(--gradient-start)",
//             flexShrink: 0,
//           }}
//         >
//           {icon}
//         </div>
//         <div style={{ minWidth: 0, flex: 1 }}>
//           <div
//             className="panel-title-text"
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 800,
//               fontSize: "0.98rem",
//               color: "var(--text)",
//             }}
//             title={title}
//           >
//             {title}
//           </div>
//           {subtitle && (
//             <div
//               style={{
//                 fontSize: "0.75rem",
//                 color: "var(--text-secondary)",
//                 marginTop: 2,
//                 lineHeight: 1.35,
//               }}
//             >
//               {subtitle}
//             </div>
//           )}
//         </div>
//       </div>
//       <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
//     </div>
//   );
// }

// function EmptyHint({ text }) {
//   return (
//     <p
//       style={{
//         color: "var(--text-secondary)",
//         fontSize: "0.88rem",
//         textAlign: "center",
//         padding: "2.5rem 1rem",
//       }}
//     >
//       {text}
//     </p>
//   );
// }

// function SummaryItem({ icon, label, text, accent }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "0.7rem",
//         alignItems: "flex-start",
//         position: "relative",
//         zIndex: 1,
//         minWidth: 0,
//       }}
//     >
//       <div
//         style={{
//           width: 34,
//           height: 34,
//           borderRadius: 11,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background:
//             "color-mix(in srgb, var(--gradient-start) 12%, transparent)",
//           border: "1px solid var(--glass-border)",
//           color: accent || "var(--gradient-start)",
//           flexShrink: 0,
//         }}
//       >
//         {icon}
//       </div>
//       <div style={{ minWidth: 0 }}>
//         <div
//           style={{
//             fontSize: "0.68rem",
//             fontWeight: 700,
//             letterSpacing: ".08em",
//             color: "var(--text-secondary)",
//             textTransform: "uppercase",
//           }}
//         >
//           {label}
//         </div>
//         <div
//           style={{
//             fontSize: "0.86rem",
//             color: "var(--text)",
//             marginTop: 3,
//             lineHeight: 1.4,
//           }}
//         >
//           {text}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// // quantitesVersDecimal exporté pour réutilisation éventuelle
// export { convertirQuantite, quantitesVersDecimal, calculerStockTotal };






/**
 * Dashboard — logique données conservée + convertirQuantite
 * - valeur stock = prix de vente (sale_price_fc) selon level
 * - icônes unifiées (style StatCard / reflet)
 * - bande résumé : colonnes empilées en mobile
 * - moins d'espace sous navbar, pas de reflet sur l'icône page
 * - stocks critiques : tous + nom/marque/modèle/seuil/qty lisible
 */

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  DollarSign,
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Warehouse,
  Activity,
  Sparkles,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import {
  getCategories,
  getEntrepots,
  getItems,
  getStocks,
  getMouvementsRecents,
} from "../api/api";
import Footer from "../components/Footer";

/* ============================================================
   CONVERSION QUANTITÉS (logique desktop)
============================================================ */

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

function quantitesVersDecimal(level, { carton = 0, boite = 0, piece = 0 }, cap_boite, cap_unit) {
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

/** Valeur stock au prix de vente selon le niveau (pièce / boîte / carton) */
function calculerValeurStock(item, stockTotal) {
  const niveau = Number(item?.level) || 1;
  const prix1 = Number(item?.sale_price_fc) || 0;
  const capBoite = Number(item?.qty_by_box) || 1;
  const capCarton = Number(item?.qty_by_card) || 1;

  let prixUnitaire;
  if (niveau === 1) {
    prixUnitaire = prix1;
  } else if (niveau === 2) {
    prixUnitaire = prix1 * capBoite;
  } else if (niveau === 3) {
    prixUnitaire = prix1 * capBoite * capCarton;
  } else {
    prixUnitaire = prix1;
  }

  return Number(stockTotal) * prixUnitaire;
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

function designation(item) {
  if (!item) return "—";
  return (
    [item.name, item.mark, item.modele]
      .map((x) => (x || "").toString().trim())
      .filter(Boolean)
      .join(" · ") || "—"
  );
}

/* ============================================================
   ICÔNE UNIFIÉE (même style que StatCard)
============================================================ */

function GlowIcon({ icon, color = "var(--gradient-start)", size = 42 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
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
          width: Math.round(size * 0.33),
          height: Math.round(size * 0.17),
          borderRadius: "50%",
          background: "rgba(255,255,255,0.5)",
          transform: "rotate(-20deg)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1, display: "flex" }}>{icon}</span>
    </div>
  );
}

function Dashboard() {
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [stats, setStats] = useState({
    totalArticles: 0,
    totalCategories: 0,
    totalEntrepots: 0,
    valeurStock: 0,
    totalMouvements: 0,
  });
  const [categoriesData, setCategoriesData] = useState([]);
  const [stockCritique, setStockCritique] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    setLoading(true);
    try {
      const [resCategories, resEntrepots, resItems, resStocks, resMvts] =
        await Promise.all([
          getCategories(),
          getEntrepots(),
          getItems(),
          getStocks(),
          getMouvementsRecents(),
        ]);

      const items = resItems.data || [];
      const categories = resCategories.data || [];
      const entrepots = resEntrepots.data || [];
      const stocks = resStocks.data || [];
      const mouvements = resMvts.data || [];
      const mouvementsActifs = (mouvements || []).filter(
        (m) => Number(m.deleted ?? 0) === 0
      );

      // Valeur stock au PRIX DE VENTE (sale_price_fc) selon level
      const valeurTotale = items.reduce((sum, item) => {
        const qty = calculerStockTotal(item.id, stocks, mouvementsActifs, []);
        return sum + calculerValeurStock(item, qty);
      }, 0);

      setStats({
        totalArticles: items.length,
        totalCategories: categories.length,
        totalEntrepots: entrepots.length,
        valeurStock: valeurTotale,
        totalMouvements: mouvements.length,
      });

      const compteParCategorie = categories.map((cat) => {
        const count = items.filter((i) => i.category_item === cat.id).length;
        const parts = (cat.name || "").split(" ");
        const name =
          parts[0]?.length <= 2
            ? parts.slice(1).join(" ") || cat.name
            : cat.name;
        return {
          name: name.length > 14 ? name.slice(0, 12) + "…" : name,
          total: count,
        };
      });
      setCategoriesData(
        compteParCategorie.sort((a, b) => b.total - a.total).slice(0, 6)
      );

      const critiques = items
        .map((item) => {
          const qty = calculerStockTotal(item.id, stocks, mouvementsActifs, []);
          const seuil = Number(item.minimal_stock ?? 0);
          return {
            id: item.id,
            nom: item.name || "Inconnu",
            mark: item.mark || "",
            modele: item.modele || "",
            designation: designation(item),
            qty,
            seuil,
            qtyLabel: convertirQuantite(qty, item),
            seuilLabel: convertirQuantite(seuil, item),
            item,
          };
        })
        .filter((row) => row.qty <= row.seuil)
        .sort((a, b) => a.qty - b.qty);

      setStockCritique(critiques);
    } catch (err) {
      console.error("Erreur chargement dashboard :", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "50vh",
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
            padding: "3rem 20px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto 1rem",
              borderRadius: 16,
              border: "2px solid var(--glass-border)",
              borderTopColor: "var(--gradient-start)",
              animation: "dashSpin 0.9s linear infinite",
            }}
          />
          Chargement du tableau de bord...
          <style>{`@keyframes dashSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      className="dashboard-shell"
      style={{
        position: "relative",
        minHeight: "100%",
        maxWidth: 1320,
        width: "100%",
        padding: "0 20px 2rem",
        boxSizing: "border-box",
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
        className="dashboard-page"
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
        {/* ===== HEADER — espace réduit, icône page SANS reflet ===== */}
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
            <LayoutDashboard size={30} />
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
            <Activity size={12} />
            Vue d&apos;ensemble
            <Sparkles size={11} style={{ opacity: 0.85 }} />
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
              Tableau de bord
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                color: "var(--text-secondary)",
                fontSize: "0.92rem",
                maxWidth: 520,
                lineHeight: 1.55,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Suivez en un coup d&apos;œil vos stocks, catégories, valeur et
              alertes critiques.
            </p>
          </div>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div
          className="stats-grid"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.4rem",
          }}
        >
          <StatCard
            label="Articles"
            value={stats.totalArticles}
            icon={<Package size={18} />}
            color="var(--gradient-start)"
          />
          <StatCard
            label="Catégories"
            value={stats.totalCategories}
            icon={<FolderOpen size={18} />}
            color="var(--gradient-end)"
          />
          <StatCard
            label="Entrepôts"
            value={stats.totalEntrepots}
            icon={<Warehouse size={18} />}
            color="#38bdf8"
          />
          <StatCard
            label="Valeur stock"
            value={`${Number(stats.valeurStock).toFixed(2)} $`}
            icon={<DollarSign size={18} />}
            color="#fbbf24"
          />
          <StatCard
            label="Mouvements"
            value={stats.totalMouvements}
            icon={<ArrowLeftRight size={18} />}
            color="#a78bfa"
          />
        </div>

        {/* ===== PANELS ===== */}
        <div
          className="dashboard-panels"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: "1.1rem",
            marginBottom: "1.35rem",
          }}
        >
          <Panel
            title="Catégories les plus fournies"
            subtitle="Top par nombre d'articles"
            icon={<TrendingUp size={16} />}
            iconColor="var(--gradient-start)"
          >
            {categoriesData.length === 0 ? (
              <EmptyHint text="Aucune catégorie à afficher." />
            ) : (
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoriesData}
                    margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--glass-border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="var(--text-secondary)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="var(--text-secondary)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{
                        fill: "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
                      }}
                      contentStyle={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--glass-border)",
                        borderRadius: 12,
                        color: "var(--text)",
                        boxShadow: "0 12px 32px rgba(0,0,0,.2)",
                        fontSize: 13,
                      }}
                    />
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--gradient-start)"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--gradient-end)"
                        />
                      </linearGradient>
                    </defs>
                    <Bar
                      dataKey="total"
                      fill="url(#barGradient)"
                      radius={[10, 10, 4, 4]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Panel>

          <Panel
            title="Stocks critiques"
            subtitle={
              stockCritique.length === 0
                ? "Sous le seuil minimal"
                : `${stockCritique.length} article${
                    stockCritique.length > 1 ? "s" : ""
                  } sous seuil`
            }
            icon={<AlertTriangle size={16} />}
            iconColor="#fbbf24"
          >
            {stockCritique.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "2rem 1rem",
                  textAlign: "center",
                }}
              >
                <GlowIcon
                  icon={<CheckCircle size={22} />}
                  color="#4ade80"
                  size={52}
                />
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                  }}
                >
                  Aucun produit critique
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Tous vos stocks sont au-dessus du seuil.
                </div>
              </div>
            ) : (
              <div
                className="critiques-scroll"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  maxHeight: 320,
                  overflowY: "auto",
                  paddingRight: 4,
                }}
              >
                {stockCritique.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "0.75rem 0.85rem",
                      borderRadius: 14,
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: "var(--text)",
                          lineHeight: 1.35,
                          wordBreak: "break-word",
                        }}
                      >
                        {p.nom}
                        {(p.mark || p.modele) && (
                          <span
                            style={{
                              fontWeight: 500,
                              color: "var(--text-secondary)",
                              fontSize: "0.8rem",
                            }}
                          >
                            {" "}
                            · {[p.mark, p.modele].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-secondary)",
                          marginTop: 4,
                        }}
                      >
                        Seuil : {p.seuilLabel}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "0.35rem 0.65rem",
                        borderRadius: 999,
                        background:
                          p.qty === 0
                            ? "rgba(239,68,68,.14)"
                            : "rgba(245,158,11,.14)",
                        color: p.qty === 0 ? "#f87171" : "#fbbf24",
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        fontFamily: "Syne, sans-serif",
                        flexShrink: 0,
                        maxWidth: "46%",
                        textAlign: "right",
                        lineHeight: 1.3,
                      }}
                      title={p.qtyLabel}
                    >
                      {p.qtyLabel}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* ===== BANDE RÉSUMÉ — 1 colonne par item en mobile ===== */}
        <div
          className="summary-band"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "1.1rem",
            padding: "1.25rem 1.15rem",
            borderRadius: 26,
            background: "var(--card-bg)",
            border: "1px solid var(--glass-border)",
            boxShadow: `
              0 16px 42px rgba(0,0,0,.16),
              0 0 48px var(--glow-color),
              inset 0 1px 0 rgba(255,255,255,0.12)
            `,
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: 2,
              background: `
                linear-gradient(
                  90deg,
                  transparent,
                  var(--gradient-start),
                  var(--gradient-end),
                  transparent
                )
              `,
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />
          <SummaryItem
            icon={<Package size={16} />}
            label="Catalogue"
            text={`${stats.totalArticles} article${
              stats.totalArticles > 1 ? "s" : ""
            } · ${stats.totalCategories} catégorie${
              stats.totalCategories > 1 ? "s" : ""
            }`}
            color="var(--gradient-start)"
          />
          <SummaryItem
            icon={<Warehouse size={16} />}
            label="Logistique"
            text={`${stats.totalEntrepots} entrepôt${
              stats.totalEntrepots > 1 ? "s" : ""
            } actifs`}
            color="#38bdf8"
          />
          <SummaryItem
            icon={<AlertTriangle size={16} />}
            label="Alertes"
            text={
              stockCritique.length === 0
                ? "Aucune alerte stock"
                : `${stockCritique.length} sous seuil`
            }
            color={stockCritique.length > 0 ? "#f87171" : "#4ade80"}
          />
          <SummaryItem
            icon={<ArrowLeftRight size={16} />}
            label="Activité"
            text={`${stats.totalMouvements} mouvement${
              stats.totalMouvements > 1 ? "s" : ""
            }`}
            color="#a78bfa"
          />
        </div>

        <Footer />

        <style>{`
.dashboard-page .stat-card {
  transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
  min-width: 0;
}
.dashboard-page .stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(0,0,0,.14), 0 0 24px var(--glow-color);
}
.critiques-scroll::-webkit-scrollbar { width: 5px; }
.critiques-scroll::-webkit-scrollbar-thumb {
  background: var(--glass-border);
  border-radius: 8px;
}
.panel-title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  .summary-band {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 900px) {
  .dashboard-panels {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.65rem !important;
  }
  .summary-band {
    grid-template-columns: 1fr !important;
    gap: 0.85rem !important;
  }
  .dashboard-page {
    padding: 0 12px 1.5rem !important;
  }
}

@media (max-width: 400px) {
  .stats-grid {
    grid-template-columns: 1fr !important;
  }
}
`}</style>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
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
      <GlowIcon icon={icon} color={color} size={42} />
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

function Panel({ title, subtitle, icon, iconColor, children }) {
  return (
    <div
      style={{
        borderRadius: 24,
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        padding: "1.15rem 1.15rem",
        boxShadow:
          "0 16px 42px rgba(0,0,0,.18), 0 0 36px var(--glow-color), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(16px)",
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
          height: 2,
          background: `
            linear-gradient(
              90deg,
              transparent,
              var(--gradient-start),
              var(--gradient-end),
              transparent
            )
          `,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.65rem",
          marginBottom: "1rem",
          minWidth: 0,
        }}
      >
        <GlowIcon
          icon={icon}
          color={iconColor || "var(--gradient-start)"}
          size={34}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            className="panel-title-text"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "0.98rem",
              color: "var(--text)",
            }}
            title={title}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                marginTop: 2,
                lineHeight: 1.35,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

function EmptyHint({ text }) {
  return (
    <p
      style={{
        color: "var(--text-secondary)",
        fontSize: "0.88rem",
        textAlign: "center",
        padding: "2.5rem 1rem",
      }}
    >
      {text}
    </p>
  );
}

function SummaryItem({ icon, label, text, color }) {
  return (
    <div
      className="summary-item"
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        minWidth: 0,
        width: "100%",
        padding: "0.35rem 0",
        boxSizing: "border-box",
      }}
    >
      <GlowIcon
        icon={icon}
        color={color || "var(--gradient-start)"}
        size={34}
      />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: ".08em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "0.86rem",
            color: "var(--text)",
            marginTop: 3,
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

export {
  convertirQuantite,
  quantitesVersDecimal,
  calculerStockTotal,
  calculerValeurStock,
};
