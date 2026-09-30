// /**
//  * Articles — style Categories/Entrepots/Dashboard
//  * Logique create/update/image/stocks inchangée
//  * Stock réel affiché via calculerStockTotal + convertirQuantite
//  */


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Package,
//   X,
//   Save,
//   AlertTriangle,
//   CheckCircle,
//   TrendingDown,
//   Image as ImageIcon,
//   Eye,
//   Warehouse,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import * as api from "../api/api";

// const {
//   getItems,
//   getCategories,
//   getUnites,
//   createItem,
//   updateItem,
//   deleteItem,
//   createStock
// } = api;

// const safeGet = (fn) =>
//   typeof fn === "function"
//     ? fn().catch(() => ({ data: [] }))
//     : Promise.resolve({ data: [] });

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

// function buildImageFileName(item) {
//   const parts = [item.name, item.mark, item.modele]
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
//   if (!base) return null;
//   return `/images/items/${base}.jpg`;
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

// const emptyForm = () => ({
//   name: "",
//   mark: "",
//   modele: "",
//   purchase_price: "",
//   sale_price_fc: "",
//   sale_price_devise: "",
//   minimal_stock: "1",
//   level: "1",
//   qty_by_card: "",
//   qty_by_box: "",
//   length: "",
//   width: "",
//   height: "",
//   cbm: "",
//   category_item: "",
//   unite_id: "",
//   code_barre: "",
//   description: "",
//   picture_path: "",
//   picture_hash: "",
//   imagePreview: null,
//   imageFile: null,
//   showAdvanced: false,
//   stocksInit: {},
// });

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = reader.result || "";
//       const base64 = String(result).includes(",")
//         ? String(result).split(",")[1]
//         : String(result);
//       resolve(base64);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// async function fileToSha256(file) {
//   const buffer = await file.arrayBuffer();
//   const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
//   return Array.from(new Uint8Array(hashBuffer))
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
// }

// function Articles() {
//   const navigate = useNavigate();
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [entrepots, setEntrepots] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [mouvementsRecents, setMouvementsRecents] = useState([]);
//   const [stockAjustments, setStockAjustments] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterCat, setFilterCat] = useState("");
//   const [filterStat, setFilterStat] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showPanel, setShowPanel] = useState(false);
//   const [editTarget, setEditTarget] = useState(null);
//   const [previewItem, setPreviewItem] = useState(null);
//   const [form, setForm] = useState(emptyForm());
//   const [saving, setSaving] = useState(false);

//   console.log("========== VERIFICATION AJUSTEMENTS ==========");

//   stockAjustments.forEach((aj) => {
//     const item = items.find(
//       (item) => Number(item.id) === Number(aj.item_id)
//     );

//     console.log({
//       ajustement_id: aj.id,
//       item_id_ajustement: aj.item_id,
//       article_trouve: item?.name,
//       item_id_article: item?.id,
//       category_item: item?.category_item,
//     });
//   });

//   const getStockTotal = (item) =>
//   calculerStockTotal(
//     item?.id,
//     stocks,
//     mouvementsRecents,
//     stockAjustments
//   );

//   useEffect(() => {
//     charger();
//   }, []);

//   useEffect(() => {

//     console.log("========== AJUSTEMENTS PAR ARTICLE ==========");

//     items.forEach((item) => {
//       const ajustementsArticle = stockAjustments.filter(
//         (aj) => Number(aj.item_id) === Number(item.id)
//       );

//       if (ajustementsArticle.length > 0) {
//         console.log("ARTICLE :", item.name);
//         console.log("ID :", item.id);
//         console.log("CATÉGORIE :", item.category_item);
//         console.log("AJUSTEMENTS :", ajustementsArticle);
//         console.log(
//           "TOTAL ENTRÉES :",
//           ajustementsArticle
//             .filter((aj) => aj.type === "Entrée")
//             .reduce((total, aj) => total + Number(aj.qty || 0), 0)
//         );
//         console.log(
//           "TOTAL SORTIES :",
//           ajustementsArticle
//             .filter((aj) => aj.type === "Sortie")
//             .reduce((total, aj) => total + Number(aj.qty || 0), 0)
//         );
//       }
//     });    


//     let result = [...items];
//     const q = search.toLowerCase();
//     if (q) {
//       result = result.filter(
//         (i) =>
//           (i.name || "").toLowerCase().includes(q) ||
//           (i.mark || "").toLowerCase().includes(q) ||
//           (i.modele || "").toLowerCase().includes(q) ||
//           (i.code_barre || "").toLowerCase().includes(q)
//       );
//     }
//     if (filterCat) {
//       result = result.filter((i) => String(i.category_item) === filterCat);
//     }
//     if (filterStat === "critique") {
//       result = result.filter((i) => getStockTotal(i) <= 0);
//     } else if (filterStat === "bas") {
//       result = result.filter((i) => {
//         const s = getStockTotal(i);
//         const min = Number(i.minimal_stock) || 1;
//         return s > 0 && s < min;
//       });
//     } else if (filterStat === "normal") {
//       result = result.filter((i) => {
//         const s = getStockTotal(i);
//         const min = Number(i.minimal_stock) || 1;
//         return s >= min;
//       });
//     }
//     setFiltered(result);
//   }, [
//     search,
//     filterCat,
//     filterStat,
//     items,
//     stocks,
//     mouvementsRecents,
//     stockAjustments,
//   ]);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const [resItems, resCat, resUnites, resEnt, resStocks, resMov, resAdj] =
//         await Promise.all([
//           getItems(),
//           getCategories(),
//           getUnites().catch(() => ({ data: [] })),
//           safeGet(api.getEntrepots),
//           safeGet(api.getStocks),
//           safeGet(api.getMouvementsRecents),
//           safeGet(api.getStockAjustments),
//         ]);
//       setItems(resItems.data || []);
//       setFiltered(resItems.data || []);
//       setCategories(resCat.data || []);
//       setUnites(resUnites.data || []);
//       setEntrepots(resEnt.data || []);
//       setStocks(resStocks.data || []);
//       setMouvementsRecents(resMov.data || []);
//       setStockAjustments(resAdj.data || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAdd = () => {
//     setEditTarget(null);
//     const stocksInit = {};
//     (entrepots || []).forEach((e) => {
//       stocksInit[e.id] = "0";
//     });
//     setForm({ ...emptyForm(), stocksInit });
//     setShowPanel(true);
//   };

//   const openEdit = (item) => {
//     setEditTarget(item);
//     const stocksInit = {};
//     (entrepots || []).forEach((e) => {
//       const row = (stocks || []).find(
//         (s) =>
//           Number(s.item_id) === Number(item.id) &&
//           Number(s.entrepot_id) === Number(e.id)
//       );
//       stocksInit[e.id] = String(row?.stock_actual ?? 0);
//     });
//     setForm({
//       name: item.name || "",
//       mark: item.mark || "",
//       modele: item.modele || "",
//       purchase_price: item.purchase_price ?? "",
//       sale_price_fc: item.sale_price_fc ?? "",
//       sale_price_devise: item.sale_price_devise ?? "",
//       minimal_stock: item.minimal_stock ?? "1",
//       level: String(item.level ?? "1"),
//       qty_by_card: item.qty_by_card ?? "",
//       qty_by_box: item.qty_by_box ?? "",
//       length: item.length ?? "",
//       width: item.width ?? "",
//       height: item.height ?? "",
//       cbm: item.cbm ?? "",
//       category_item: item.category_item ?? "",
//       unite_id: item.unite_id ??  "",
//       code_barre: item.code_barre || "",
//       description: item.description || "",
//       picture_path: item.picture_path || "",
//       picture_hash: item.picture_hash || "",
//       imagePreview: getArticleImageSrc(item),
//       imageFile: null,
//       showAdvanced: !!(item.length || item.width || item.height),
//       stocksInit,
//     });
//     setShowPanel(true);
//   };

//   const onPickImage = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       setForm((f) => ({
//         ...f,
//         imageFile: file,
//         imagePreview: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (saving) return;
//     setSaving(true);
//     try {
//       if (!String(form.name || "").trim()) {
//         alert("Le nom de l'article est obligatoire.");
//         setSaving(false);
//         return;
//       }

//       const baseName = buildImageFileName(form) || "article";
//       let filenameForServer = null;
//       if (form.imageFile) {
//         const rawExt = (
//           form.imageFile.name.split(".").pop() || "jpg"
//         ).toLowerCase();
//         const ext = ["jpg", "jpeg", "png", "webp", "gif"].includes(rawExt)
//           ? rawExt
//           : "jpg";
//         filenameForServer = `${baseName}.${ext}`;
//       }

//       const uniteId = form.unite_id ? parseInt(form.unite_id, 10) : null;
//       const level = parseInt(form.level, 10) || 1;
//       const qty_by_box =
//         level >= 2
//           ? form.qty_by_box !== ""
//             ? parseFloat(form.qty_by_box)
//             : 0
//           : null;
//       const qty_by_card =
//         level === 3
//           ? form.qty_by_card !== ""
//             ? parseFloat(form.qty_by_card)
//             : 0
//           : null;

//       const payload = {
//         name: String(form.name).trim(),
//         mark: form.mark ? String(form.mark).trim() : null,
//         modele: form.modele ? String(form.modele).trim() : null,
//         purchase_price: parseFloat(form.purchase_price) || 0,
//         sale_price_fc: parseFloat(form.sale_price_fc) || 0,
//         sale_price_devise: parseFloat(form.sale_price_devise) || 0,
//         minimal_stock: parseInt(form.minimal_stock, 10) || 1,
//         level,
//         qty_by_card,
//         qty_by_box,
//         length: form.length !== "" ? parseFloat(form.length) : null,
//         width: form.width !== "" ? parseFloat(form.width) : null,
//         height: form.height !== "" ? parseFloat(form.height) : null,
//         cbm: form.cbm !== "" ? parseFloat(form.cbm) : null,
//         category_item: form.category_item
//           ? parseInt(form.category_item, 10)
//           : null,
//         unite_id: Number.isFinite(uniteId) ? uniteId : null,
//         code_barre: form.code_barre
//           ? String(form.code_barre).trim()
//           : null,
//         synced: 0,
//       };

//       if (filenameForServer) {
//         payload.picture_path = filenameForServer;
//       } else if (editTarget && form.picture_path) {
//         payload.picture_path = String(form.picture_path)
//           .split(/[/\\]/)
//           .pop();
//       }

//       Object.keys(payload).forEach((k) => {
//         if (payload[k] === undefined) delete payload[k];
//       });

//       let savedId = null;
//       if (editTarget) {
//         await updateItem(editTarget.id, payload);
//         savedId = editTarget.id;
//       } else {
//         const res = await createItem(payload);
//         const data = res?.data ?? res;
//         savedId =
//           data?.id ?? data?.item_id ?? data?.data?.id ?? null;
//         if (savedId == null) {
//           console.warn("Réponse create sans id clair :", data);
//         }
//       }

//       if (form.imageFile && savedId != null) {
//         try {
//           const uploadFn = api.uploadItemImage;
//           if (typeof uploadFn === "function") {
//             const pictureData = await fileToBase64(form.imageFile);
//             const pictureHash = await fileToSha256(form.imageFile);
//             const filename = filenameForServer || form.imageFile.name;
//             const body = {
//               filename,
//               picture_data: pictureData,
//               picture_hash: pictureHash,
//             };
//             try {
//               await uploadFn(savedId, body);
//             } catch (e1) {
//               try {
//                 await uploadFn(savedId, filename, pictureData, pictureHash);
//               } catch (e2) {
//                 throw e2;
//               }
//             }
//           } else {
//             console.warn(
//               "uploadItemImage absent dans api.js — article OK, image non envoyée"
//             );
//           }
//         } catch (imgErr) {
//           console.error("IMAGE UPLOAD ERROR", imgErr?.response?.data || imgErr);
//           alert("Article enregistré, mais l'image n'a pas pu être envoyée.");
//         }
//       }

//       setShowPanel(false);
//       setEditTarget(null);
//       setForm(emptyForm());
//       await charger();
//     } catch (err) {
//       console.error(err);
//       console.error("Détail API :", err?.response?.data);
//       const detail = err?.response?.data?.detail ?? err?.response?.data;
//       alert(
//         detail
//           ? `Erreur ${err?.response?.status || ""} : ${
//               typeof detail === "string" ? detail : JSON.stringify(detail)
//             }`
//           : err?.message || "Erreur lors de l'opération."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Supprimer cet article ?")) return;
//     try {
//       await deleteItem(id);
//       charger();
//     } catch {
//       alert("Erreur lors de la suppression.");
//     }
//   };

//   const getCatName = (id) => {
//     const c = categories.find((x) => x.id === id);
//     return c ? c.name : "—";
//   };

//   const getStatut = (item) => {
//     const stock = getStockTotal(item);
//     const min = Number(item.minimal_stock) || 1;
//     if (stock <= 0)
//       return {
//         label: "Rupture",
//         color: "#f87171",
//         bg: "rgba(239,68,68,0.14)",
//       };
//     if (stock < min)
//       return {
//         label: "Stock bas",
//         color: "#fbbf24",
//         bg: "rgba(245,158,11,0.14)",
//       };
//     return {
//       label: "Normal",
//       color: "#4ade80",
//       bg: "rgba(74,222,128,0.14)",
//     };
//   };

//   const critique = items.filter((i) => getStockTotal(i) <= 0).length;
//   const bas = items.filter((i) => {
//     const s = getStockTotal(i);
//     const min = Number(i.minimal_stock) || 1;
//     return s > 0 && s < min;
//   }).length;
//   const normal = items.filter((i) => {
//     const s = getStockTotal(i);
//     const min = Number(i.minimal_stock) || 1;
//     return s >= min;
//   }).length;

//   return (
//     <div
//       className="articles-shell"
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
//         className="articles-page"
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
//             <Package size={30} />
//           </div>
//           <h1
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
//               fontWeight: 900,
//               margin: 0,
//               lineHeight: 1.15,
//               background:
//                 "linear-gradient(135deg, var(--text), var(--gradient-start))",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             Gestion des articles
//           </h1>
//         </div>

//         {/* INFO CARDS */}
//         <div
//           className="info-band"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
//             gap: "0.85rem",
//             marginBottom: "1.4rem",
//           }}
//         >
//           <InfoCard
//             label="TOTAL"
//             value={items.length}
//             color="var(--gradient-start)"
//             icon={<Package size={18} />}
//           />
//           <InfoCard
//             label="NORMAL"
//             value={normal}
//             color="#4ade80"
//             icon={<CheckCircle size={18} />}
//           />
//           <InfoCard
//             label="STOCK BAS"
//             value={bas}
//             color="#fbbf24"
//             icon={<TrendingDown size={18} />}
//           />
//           <InfoCard
//             label="RUPTURE"
//             value={critique}
//             color="#f87171"
//             icon={<AlertTriangle size={18} />}
//           />
//         </div>

//         {/* TOOLBAR */}
//         <div
//           className="articles-toolbar"
//           style={{
//             display: "flex",
//             gap: "0.75rem",
//             flexWrap: "wrap",
//             marginBottom: "1.5rem",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               flex: "1 1 220px",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "0.85rem 1.1rem",
//               borderRadius: 18,
//               background: "var(--card-bg)",
//               border: "1px solid var(--glass-border)",
//               maxWidth: 380,
//               minWidth: 0,
//             }}
//           >
//             <Search size={18} color="var(--gradient-start)" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Rechercher..."
//               style={{
//                 flex: 1,
//                 border: "none",
//                 outline: "none",
//                 background: "none",
//                 color: "var(--text)",
//                 minWidth: 0,
//               }}
//             />
//           </div>
//           <select
//             value={filterCat}
//             onChange={(e) => setFilterCat(e.target.value)}
//             style={selectStyle}
//           >
//             <option value="">Toutes catégories</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//           <select
//             value={filterStat}
//             onChange={(e) => setFilterStat(e.target.value)}
//             style={selectStyle}
//           >
//             <option value="">Tous statuts</option>
//             <option value="normal">Normal</option>
//             <option value="bas">Stock bas</option>
//             <option value="critique">Rupture</option>
//           </select>
//           <button type="button" onClick={openAdd} style={btnPrimary}>
//             <Plus size={18} /> Nouvel article
//           </button>
//         </div>

//         {loading ? (
//           <div
//             style={{
//               textAlign: "center",
//               color: "var(--text-secondary)",
//               padding: "3rem",
//             }}
//           >
//             Chargement...
//           </div>
//         ) : filtered.length === 0 ? (
//           <EmptyState onAdd={openAdd} />
//         ) : (
//           <div
//             className="articles-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//               gap: "1.15rem",
//             }}
//           >
//             {filtered.map((item) => (
//               <ArticleCard
//                 key={item.id}
//                 item={item}
//                 catName={getCatName(item.category_item)}
//                 statut={getStatut(item)}
//                 stockLabel={convertirQuantite(getStockTotal(item), item)}
//                 onEdit={() => openEdit(item)}
//                 onDelete={() => handleDelete(item.id)}
//                 onPreview={() => setPreviewItem(item)}
//                 onDetails={() => navigate(`/details/article/${item.id}`)}
//               />
//             ))}
//           </div>
//         )}

//         {previewItem && (
//           <ImagePreview
//             item={previewItem}
//             catName={getCatName(previewItem.category_item)}
//             statut={getStatut(previewItem)}
//             stockLabel={convertirQuantite(getStockTotal(previewItem), previewItem)}
//             onClose={() => setPreviewItem(null)}
//           />
//         )}

//         {showPanel && (
//           <ArticleFormModal
//             form={form}
//             setForm={setForm}
//             editTarget={editTarget}
//             saving={saving}
//             categories={categories}
//             unites={unites}
//             entrepots={entrepots}
//             onPickImage={onPickImage}
//             onClose={() => {
//               if (saving) return;
//               setShowPanel(false);
//               setEditTarget(null);
//               setForm(emptyForm());
//             }}
//             onSubmit={handleSubmit}
//           />
//         )}

//         <Footer />

//         <style>{`
//           @media (max-width: 900px) {
//             .info-band {
//               grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
//             }
//           }
//           @media (max-width: 768px) {
//             .articles-page { padding: 0 12px 1.5rem !important; }
//             .articles-grid {
//               grid-template-columns: 1fr !important;
//             }
//             .articles-toolbar button {
//               width: 100%;
//               justify-content: center;
//             }
//           }
//           @media (max-width: 400px) {
//             .info-band {
//               grid-template-columns: 1fr !important;
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// function ArticleFormModal({
//   form,
//   setForm,
//   editTarget,
//   saving,
//   categories,
//   unites,
//   entrepots,
//   onPickImage,
//   onClose,
//   onSubmit,
// }) {
//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 2000,
//         background: "rgba(0,0,0,.65)",
//         backdropFilter: "blur(8px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "1.25rem",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%",
//           maxWidth: 520,
//           maxHeight: "92vh",
//           borderRadius: 28,
//           background: "var(--card-bg)",
//           border: "1px solid var(--glass-border)",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           position: "relative",
//         }}
//       >
//         <button
//           type="button"
//           disabled={saving}
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: 12,
//             right: 12,
//             zIndex: 5,
//             width: 36,
//             height: 36,
//             borderRadius: "50%",
//             border: "1px solid var(--glass-border)",
//             background: "var(--card-bg)",
//             color: "var(--text)",
//             cursor: "pointer",
//           }}
//         >
//           <X size={16} />
//         </button>
//         <div
//           style={{
//             padding: "1.1rem 1.4rem 0.5rem",
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 800,
//             fontSize: "1.15rem",
//             color: "var(--text)",
//           }}
//         >
//           {editTarget ? "Modifier l'article" : "Nouvel article"}
//         </div>
//         <div
//           style={{
//             overflowY: "auto",
//             padding: "0.5rem 1.4rem 1.4rem",
//             flex: 1,
//           }}
//         >
//           <form onSubmit={onSubmit}>
//             <div style={{ marginBottom: "1.25rem" }}>
//               <label style={labelStyle}>Image</label>
//               <label
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: 140,
//                   borderRadius: 16,
//                   border: "2px dashed var(--glass-border)",
//                   background: "var(--glass-bg)",
//                   cursor: "pointer",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//               >
//                 {form.imagePreview ? (
//                   <img
//                     src={form.imagePreview}
//                     alt=""
//                     style={{
//                       position: "absolute",
//                       inset: 0,
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : (
//                   <>
//                     <ImageIcon size={28} color="var(--gradient-start)" />
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "var(--text-secondary)",
//                       }}
//                     >
//                       Importer une image
//                     </span>
//                   </>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={onPickImage}
//                   style={{ display: "none" }}
//                 />
//               </label>
//             </div>

//             <Field
//               label="Nom *"
//               value={form.name}
//               onChange={(v) => setForm({ ...form, name: v })}
//               required
//             />
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 8,
//                 marginBottom: 12,
//               }}
//             >
//               <Field
//                 label="Marque"
//                 value={form.mark}
//                 onChange={(v) => setForm({ ...form, mark: v })}
//               />
//               <Field
//                 label="Modèle"
//                 value={form.modele}
//                 onChange={(v) => setForm({ ...form, modele: v })}
//               />
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 8,
//                 marginBottom: 12,
//               }}
//             >
//               <Field
//                 label="Prix achat"
//                 type="number"
//                 value={form.purchase_price}
//                 onChange={(v) => setForm({ ...form, purchase_price: v })}
//               />
//               <Field
//                 label="Prix vente FC"
//                 type="number"
//                 value={form.sale_price_fc}
//                 onChange={(v) => setForm({ ...form, sale_price_fc: v })}
//               />
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 8,
//                 marginBottom: 12,
//               }}
//             >
//               <Field
//                 label="Stock minimal"
//                 type="number"
//                 value={form.minimal_stock}
//                 onChange={(v) => setForm({ ...form, minimal_stock: v })}
//               />
//               <div>
//                 <label style={labelStyle}>Niveau : {form.level}</label>
//                 <input
//                   type="range"
//                   min={1}
//                   max={3}
//                   value={Number(form.level) || 1}
//                   onChange={(e) =>
//                     setForm({ ...form, level: e.target.value })
//                   }
//                   style={{ width: "100%", accentColor: "var(--gradient-start)" }}
//                 />
//               </div>
//             </div>

//             <div style={{ marginBottom: 12 }}>
//               <label style={labelStyle}>Catégorie</label>
//               <select
//                 value={form.category_item}
//                 onChange={(e) =>
//                   setForm({ ...form, category_item: e.target.value })
//                 }
//                 style={{ ...inputStyle, cursor: "pointer" }}
//               >
//                 <option value="">Choisir…</option>
//                 {categories.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div style={{ marginBottom: 12 }}>
//               <label style={labelStyle}>Unité</label>
//               <select
//                 value={form.unite_id}
//                 onChange={(e) =>
//                   setForm({ ...form, unite_id: e.target.value })
//                 }
//                 style={{ ...inputStyle, cursor: "pointer" }}
//               >
//                 <option value="">Choisir…</option>
//                 {unites.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {[u.niveau_1, u.niveau_2, u.niveau_3]
//                       .filter(Boolean)
//                       .join(" / ") || `#${u.id}`}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {Number(form.level) >= 2 && (
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     Number(form.level) === 3 ? "1fr 1fr" : "1fr",
//                   gap: 8,
//                   marginBottom: 12,
//                 }}
//               >
//                 <Field
//                   label="Qté / boîte"
//                   type="number"
//                   value={form.qty_by_box}
//                   onChange={(v) => setForm({ ...form, qty_by_box: v })}
//                 />
//                 {Number(form.level) === 3 && (
//                   <Field
//                     label="Qté / carton"
//                     type="number"
//                     value={form.qty_by_card}
//                     onChange={(v) => setForm({ ...form, qty_by_card: v })}
//                   />
//                 )}
//               </div>
//             )}

//             <Field
//               label="Code-barres"
//               value={form.code_barre}
//               onChange={(v) => setForm({ ...form, code_barre: v })}
//             />

//             <div
//               style={{
//                 marginTop: 8,
//                 marginBottom: 16,
//                 padding: "0.9rem",
//                 borderRadius: 14,
//                 border: "1px solid var(--glass-border)",
//                 background: "var(--glass-bg)",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   marginBottom: 10,
//                   color: "var(--gradient-start)",
//                   fontWeight: 800,
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 <Warehouse size={16} />
//                 Stock initial par entrepôt
//               </div>
//               {entrepots.length === 0 ? (
//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: "0.8rem",
//                     color: "var(--text-secondary)",
//                   }}
//                 >
//                   Aucun entrepôt chargé.
//                 </p>
//               ) : (
//                 entrepots.map((ent) => (
//                   <div
//                     key={ent.id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 10,
//                       marginBottom: 8,
//                     }}
//                   >
//                     <span
//                       style={{
//                         flex: 1,
//                         fontSize: "0.85rem",
//                         color: "var(--text)",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {ent.reference || `Entrepôt #${ent.id}`}
//                     </span>
//                     <input
//                       type="number"
//                       min="0"
//                       step="any"
//                       value={form.stocksInit?.[ent.id] ?? "0"}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           stocksInit: {
//                             ...form.stocksInit,
//                             [ent.id]: e.target.value,
//                           },
//                         })
//                       }
//                       style={{ ...inputStyle, width: 110, marginBottom: 0 }}
//                     />
//                   </div>
//                 ))
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={saving}
//               style={{
//                 ...btnPrimary,
//                 width: "100%",
//                 justifyContent: "center",
//               }}
//             >
//               <Save size={18} />
//               {saving
//                 ? "Enregistrement…"
//                 : editTarget
//                   ? "Enregistrer"
//                   : "Ajouter l'article"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Field({ label, value, onChange, type = "text", required }) {
//   return (
//     <div style={{ marginBottom: 12 }}>
//       <label style={labelStyle}>{label}</label>
//       <input
//         type={type}
//         value={value}
//         required={required}
//         onChange={(e) => onChange(e.target.value)}
//         style={inputStyle}
//       />
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

// function ArticleCard({
//   item,
//   catName,
//   statut,
//   stockLabel,
//   onEdit,
//   onDelete,
//   onPreview,
//   onDetails,
// }) {
//   const [hover, setHover] = useState(false);
//   const [imgOk, setImgOk] = useState(true);
//   const imageUrl = getArticleImageSrc(item);

//   return (
//     <div
//       className="article-card"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: 26,
//         display: "flex",
//         flexDirection: "column",
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
//         transform: hover ? "translateY(-8px)" : "translateY(0)",
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
//           zIndex: 2,
//         }}
//       />

//       {/* Image */}
//       <div
//         onClick={onPreview}
//         style={{
//           width: "100%",
//           aspectRatio: "16 / 10",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "var(--glass-bg)",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {imageUrl && imgOk ? (
//           <img
//             src={imageUrl}
//             alt=""
//             onError={() => setImgOk(false)}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               display: "block",
//             }}
//           />
//         ) : (
//           <Package size={40} color="var(--gradient-start)" />
//         )}
//         <span
//           style={{
//             position: "absolute",
//             top: 10,
//             right: 10,
//             padding: "4px 10px",
//             borderRadius: 999,
//             background: statut.bg,
//             color: statut.color,
//             fontSize: "0.72rem",
//             fontWeight: 800,
//             border: `1px solid ${statut.color}44`,
//             backdropFilter: "blur(8px)",
//           }}
//         >
//           {statut.label}
//         </span>
//       </div>

//       <div
//         style={{
//           padding: "1rem 1.1rem 1.15rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: 8,
//           position: "relative",
//           zIndex: 1,
//           flex: 1,
//         }}
//       >
//         <div>
//           <div
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 800,
//               color: "var(--text)",
//               fontSize: "1rem",
//               lineHeight: 1.3,
//             }}
//           >
//             {item.name}
//           </div>
//           <div
//             style={{
//               fontSize: "0.78rem",
//               color: "var(--text-secondary)",
//               marginTop: 3,
//             }}
//           >
//             {[item.mark, item.modele].filter(Boolean).join(" · ") || "—"}
//           </div>
//         </div>

//         {catName !== "—" && (
//           <div
//             style={{
//               fontSize: "0.78rem",
//               color: "var(--text-secondary)",
//             }}
//           >
//             {catName}
//           </div>
//         )}

//         <div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 6,
//             alignSelf: "flex-start",
//             padding: "0.4rem 0.75rem",
//             borderRadius: 12,
//             background:
//               "color-mix(in srgb, var(--gradient-start) 12%, transparent)",
//             border: "1px solid var(--glass-border)",
//             fontSize: "0.8rem",
//             fontWeight: 700,
//             color: "var(--gradient-start)",
//             fontFamily: "Syne, sans-serif",
//           }}
//           title="Stock total (tous entrepôts + mouvements)"
//         >
//           <Package size={13} />
//           {stockLabel}
//         </div>

//         {/* Actions triangle */}
//         <div
//           style={{
//             marginTop: "auto",
//             paddingTop: "0.85rem",
//             borderTop: "1px solid var(--glass-border)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "0.5rem",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: 6,
//             }}
//           >
//             <button type="button" onClick={onDetails} style={btnGhost}>
//               <Eye size={12} /> Détails
//             </button>
//             <button type="button" onClick={onEdit} style={btnGhost}>
//               <Edit2 size={12} /> Modifier
//             </button>
//           </div>
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <button
//               type="button"
//               onClick={onDelete}
//               style={{
//                 ...btnGhost,
//                 border: "1px solid rgba(239,68,68,.3)",
//                 background: "rgba(239,68,68,.08)",
//                 color: "#f87171",
//               }}
//             >
//               <Trash2 size={12} /> Supprimer
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .article-card .neon-corner {
//           position: absolute;
//           width: 28px;
//           height: 28px;
//           opacity: 0;
//           transition: opacity .4s ease, transform .45s;
//           pointer-events: none;
//           z-index: 3;
//         }
//         .article-card:hover .neon-corner { opacity: 1; }
//         .article-card .neon-corner.top-left {
//           top: 0; left: 0;
//           border-top: 2px solid var(--gradient-start);
//           border-left: 2px solid var(--gradient-start);
//           border-top-left-radius: 26px;
//         }
//         .article-card .neon-corner.top-right {
//           top: 0; right: 0;
//           border-top: 2px solid var(--gradient-end);
//           border-right: 2px solid var(--gradient-end);
//           border-top-right-radius: 26px;
//         }
//         .article-card .neon-corner.bottom-left {
//           bottom: 0; left: 0;
//           border-bottom: 2px solid var(--gradient-end);
//           border-left: 2px solid var(--gradient-end);
//           border-bottom-left-radius: 26px;
//         }
//         .article-card .neon-corner.bottom-right {
//           bottom: 0; right: 0;
//           border-bottom: 2px solid var(--gradient-start);
//           border-right: 2px solid var(--gradient-start);
//           border-bottom-right-radius: 26px;
//         }
//         .article-card:hover .top-left { transform: translate(4px, 4px); }
//         .article-card:hover .top-right { transform: translate(-4px, 4px); }
//         .article-card:hover .bottom-left { transform: translate(4px, -4px); }
//         .article-card:hover .bottom-right { transform: translate(-4px, -4px); }
//       `}</style>
//     </div>
//   );
// }

// function ImagePreview({ item, onClose, catName, statut, stockLabel }) {
//   const imageUrl = getArticleImageSrc(item);
//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 2000,
//         background: "rgba(0,0,0,.65)",
//         backdropFilter: "blur(8px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 24,
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           maxWidth: 420,
//           width: "100%",
//           borderRadius: 24,
//           background: "var(--card-bg)",
//           border: "1px solid var(--glass-border)",
//           overflow: "hidden",
//           boxShadow: "0 24px 60px rgba(0,0,0,.35)",
//         }}
//       >
//         <div
//           style={{
//             aspectRatio: "1",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background: "var(--glass-bg)",
//           }}
//         >
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt=""
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           ) : (
//             <Package size={64} color="var(--gradient-start)" />
//           )}
//         </div>
//         <div style={{ padding: 16 }}>
//           <div
//             style={{
//               fontWeight: 800,
//               color: "var(--text)",
//               fontFamily: "Syne, sans-serif",
//             }}
//           >
//             {item.name}
//           </div>
//           <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
//             {[item.mark, item.modele].filter(Boolean).join(" · ")}
//           </div>
//           <div
//             style={{
//               marginTop: 10,
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 8,
//               alignItems: "center",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "3px 10px",
//                 borderRadius: 999,
//                 background: statut.bg,
//                 color: statut.color,
//                 fontSize: "0.72rem",
//                 fontWeight: 700,
//               }}
//             >
//               {statut.label}
//             </span>
//             <span
//               style={{
//                 fontSize: "0.85rem",
//                 fontWeight: 700,
//                 color: "var(--gradient-start)",
//                 fontFamily: "Syne, sans-serif",
//               }}
//             >
//               Stock : {stockLabel}
//             </span>
//           </div>
//           {catName !== "—" && (
//             <div style={{ marginTop: 8, color: "var(--text)" }}>{catName}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState({ onAdd }) {
//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "3rem",
//         borderRadius: 24,
//         background: "var(--card-bg)",
//         border: "1px solid var(--glass-border)",
//       }}
//     >
//       <Package size={36} color="var(--gradient-start)" />
//       <p style={{ color: "var(--text-secondary)" }}>Aucun article</p>
//       <button type="button" onClick={onAdd} style={btnPrimary}>
//         <Plus size={16} /> Ajouter
//       </button>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "0.75rem 1rem",
//   borderRadius: 12,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--text)",
//   fontSize: "0.9rem",
//   outline: "none",
//   boxSizing: "border-box",
// };

// const labelStyle = {
//   display: "block",
//   fontSize: "0.72rem",
//   fontWeight: 700,
//   color: "var(--text-secondary)",
//   textTransform: "uppercase",
//   letterSpacing: "0.05em",
//   marginBottom: "0.4rem",
// };

// const selectStyle = {
//   padding: "0.85rem 1rem",
//   borderRadius: 16,
//   background: "var(--card-bg)",
//   border: "1px solid var(--glass-border)",
//   color: "var(--text)",
//   fontSize: "0.88rem",
//   cursor: "pointer",
//   outline: "none",
// };

// const btnPrimary = {
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   padding: "0.9rem 1.3rem",
//   borderRadius: 18,
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
//   gap: 4,
//   padding: "7px 11px",
//   borderRadius: 999,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--gradient-start)",
//   cursor: "pointer",
//   fontSize: "0.74rem",
//   fontWeight: 600,
// };

// export default Articles;










/**
 * Articles — style Categories / Entrepôts / Dashboard
 * - tri alphabétique
 * - barre lumineuse image / contenu
 * - pastille couleur (détectée dans le nom)
 * - badge format P / M / G
 * - halo famille (même nom + marque, ≥ 2)
 * - stock minimal visible au hover
 * - zoom image au hover
 * - création stocks initiaux (createStock)
 * - logique stock réel : calculerStockTotal + convertirQuantite
 */

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Package,
  X,
  Save,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Image as ImageIcon,
  Eye,
  Warehouse,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const {
  getItems,
  getCategories,
  getUnites,
  createItem,
  updateItem,
  deleteItem,
  createStock,
} = api;

const safeGet = (fn) =>
  typeof fn === "function"
    ? fn().catch(() => ({ data: [] }))
    : Promise.resolve({ data: [] });

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

/* ========== IMAGE ========== */
function buildImageFileName(item) {
  const parts = [item.name, item.mark, item.modele]
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
  if (!base) return null;
  return `/images/items/${base}.jpg`;
}

/* ========== STOCK TOTAL ========== */
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

/* ========== COULEUR / FORMAT / FAMILLE ========== */
const COLOR_MAP = [
  { keys: ["rouge", "red", "cramoisi", "bordeaux"], hex: "#ef4444", label: "Rouge" },
  { keys: ["bleu", "blue", "azur", "cyan"], hex: "#3b82f6", label: "Bleu" },
  { keys: ["vert", "green", "emerald"], hex: "#22c55e", label: "Vert" },
  { keys: ["jaune", "yellow", "or ", " doré", "gold"], hex: "#eab308", label: "Jaune" },
  { keys: ["orange"], hex: "#f97316", label: "Orange" },
  { keys: ["violet", "pourpre", "purple", "mauve"], hex: "#a855f7", label: "Violet" },
  { keys: ["rose", "pink", "magenta"], hex: "#ec4899", label: "Rose" },
  { keys: ["noir", "black"], hex: "#1f2937", label: "Noir" },
  { keys: ["blanc", "white"], hex: "#f8fafc", label: "Blanc" },
  { keys: ["gris", "grey", "gray", "argent"], hex: "#94a3b8", label: "Gris" },
  { keys: ["marron", "brun", "brown", "chocolat"], hex: "#92400e", label: "Marron" },
];

function detectColor(item) {
  const text = [item?.name, item?.modele, item?.description, item?.mark]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  for (const c of COLOR_MAP) {
    if (c.keys.some((k) => text.includes(k.trim()))) return c;
  }
  return null;
}

function detectFormat(item) {
  const text = [item?.name, item?.modele, item?.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (/\b(grand|large|xl|g\b|format\s*g)/.test(text)) return { letter: "G", label: "Grand" };
  if (/\b(moyen|medium|md|m\b|format\s*m)/.test(text)) return { letter: "M", label: "Moyen" };
  if (/\b(petit|small|sm|p\b|format\s*p)/.test(text)) return { letter: "P", label: "Petit" };
  return null;
}

function familyKey(item) {
  const n = (item?.name || "").toString().trim().toLowerCase();
  const m = (item?.mark || "").toString().trim().toLowerCase();
  if (!n || !m) return null;
  return `${n}||${m}`;
}

const emptyForm = () => ({
  name: "",
  mark: "",
  modele: "",
  purchase_price: "",
  sale_price_fc: "",
  sale_price_devise: "",
  minimal_stock: "1",
  level: "1",
  qty_by_card: "",
  qty_by_box: "",
  length: "",
  width: "",
  height: "",
  cbm: "",
  category_item: "",
  unite_id: "",
  code_barre: "",
  description: "",
  picture_path: "",
  picture_hash: "",
  imagePreview: null,
  imageFile: null,
  showAdvanced: false,
  stocksInit: {},
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      const base64 = String(result).includes(",")
        ? String(result).split(",")[1]
        : String(result);
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fileToSha256(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function Articles() {
  const navigate = useNavigate();
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [unites, setUnites] = useState([]);
  const [entrepots, setEntrepots] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [mouvementsRecents, setMouvementsRecents] = useState([]);
  const [stockAjustments, setStockAjustments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStat, setFilterStat] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const getStockTotal = (item) =>
    calculerStockTotal(item?.id, stocks, mouvementsRecents, stockAjustments);

  /** Familles : clé → nombre d'articles (même nom + marque) */
  const familySizes = useMemo(() => {
    const map = {};
    (items || []).forEach((it) => {
      const k = familyKey(it);
      if (!k) return;
      map[k] = (map[k] || 0) + 1;
    });
    return map;
  }, [items]);

  useEffect(() => {
    charger();
  }, []);

  useEffect(() => {
    let result = [...items];
    const q = search.toLowerCase().trim();

    if (q) {
      result = result.filter(
        (i) =>
          (i.name || "").toLowerCase().includes(q) ||
          (i.mark || "").toLowerCase().includes(q) ||
          (i.modele || "").toLowerCase().includes(q) ||
          (i.code_barre || "").toLowerCase().includes(q)
      );
    }
    if (filterCat) {
      result = result.filter((i) => String(i.category_item) === filterCat);
    }
    if (filterStat === "critique") {
      result = result.filter((i) => getStockTotal(i) <= 0);
    } else if (filterStat === "bas") {
      result = result.filter((i) => {
        const s = getStockTotal(i);
        const min = Number(i.minimal_stock) || 1;
        return s > 0 && s < min;
      });
    } else if (filterStat === "normal") {
      result = result.filter((i) => {
        const s = getStockTotal(i);
        const min = Number(i.minimal_stock) || 1;
        return s >= min;
      });
    }

    // Tri alphabétique par nom
    result.sort((a, b) =>
      (a.name || "").localeCompare(b.name || "", "fr", { sensitivity: "base" })
    );

    setFiltered(result);
  }, [
    search,
    filterCat,
    filterStat,
    items,
    stocks,
    mouvementsRecents,
    stockAjustments,
  ]);

  const charger = async () => {
    setLoading(true);
    try {
      const [resItems, resCat, resUnites, resEnt, resStocks, resMov, resAdj] =
        await Promise.all([
          getItems(),
          getCategories(),
          getUnites().catch(() => ({ data: [] })),
          safeGet(api.getEntrepots),
          safeGet(api.getStocks),
          safeGet(api.getMouvementsRecents),
          safeGet(api.getStockAjustments),
        ]);
      const list = resItems.data || [];
      list.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", "fr", { sensitivity: "base" })
      );
      setItems(list);
      setFiltered(list);
      setCategories(resCat.data || []);
      setUnites(resUnites.data || []);
      setEntrepots(resEnt.data || []);
      setStocks(resStocks.data || []);
      setMouvementsRecents(resMov.data || []);
      setStockAjustments(resAdj.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    const stocksInit = {};
    (entrepots || []).forEach((e) => {
      stocksInit[e.id] = "0";
    });
    setForm({ ...emptyForm(), stocksInit });
    setShowPanel(true);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    const stocksInit = {};
    (entrepots || []).forEach((e) => {
      const row = (stocks || []).find(
        (s) =>
          Number(s.item_id) === Number(item.id) &&
          Number(s.entrepot_id) === Number(e.id)
      );
      stocksInit[e.id] = String(row?.stock_actual ?? 0);
    });
    setForm({
      name: item.name || "",
      mark: item.mark || "",
      modele: item.modele || "",
      purchase_price: item.purchase_price ?? "",
      sale_price_fc: item.sale_price_fc ?? "",
      sale_price_devise: item.sale_price_devise ?? "",
      minimal_stock: item.minimal_stock ?? "1",
      level: String(item.level ?? "1"),
      qty_by_card: item.qty_by_card ?? "",
      qty_by_box: item.qty_by_box ?? "",
      length: item.length ?? "",
      width: item.width ?? "",
      height: item.height ?? "",
      cbm: item.cbm ?? "",
      category_item: item.category_item ?? "",
      unite_id: item.unite_id ?? "",
      code_barre: item.code_barre || "",
      description: item.description || "",
      picture_path: item.picture_path || "",
      picture_hash: item.picture_hash || "",
      imagePreview: getArticleImageSrc(item),
      imageFile: null,
      showAdvanced: !!(item.length || item.width || item.height),
      stocksInit,
    });
    setShowPanel(true);
  };

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({
        ...f,
        imageFile: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      if (!String(form.name || "").trim()) {
        alert("Le nom de l'article est obligatoire.");
        setSaving(false);
        return;
      }

      const baseName = buildImageFileName(form) || "article";
      let filenameForServer = null;
      if (form.imageFile) {
        const rawExt = (form.imageFile.name.split(".").pop() || "jpg").toLowerCase();
        const ext = ["jpg", "jpeg", "png", "webp", "gif"].includes(rawExt)
          ? rawExt
          : "jpg";
        filenameForServer = `${baseName}.${ext}`;
      }

      const uniteId = form.unite_id ? parseInt(form.unite_id, 10) : null;
      const level = parseInt(form.level, 10) || 1;
      const qty_by_box =
        level >= 2
          ? form.qty_by_box !== ""
            ? parseFloat(form.qty_by_box)
            : 0
          : null;
      const qty_by_card =
        level === 3
          ? form.qty_by_card !== ""
            ? parseFloat(form.qty_by_card)
            : 0
          : null;

      const payload = {
        name: String(form.name).trim(),
        mark: form.mark ? String(form.mark).trim() : null,
        modele: form.modele ? String(form.modele).trim() : null,
        purchase_price: parseFloat(form.purchase_price) || 0,
        sale_price_fc: parseFloat(form.sale_price_fc) || 0,
        sale_price_devise: parseFloat(form.sale_price_devise) || 0,
        minimal_stock: parseInt(form.minimal_stock, 10) || 1,
        level,
        qty_by_card,
        qty_by_box,
        length: form.length !== "" ? parseFloat(form.length) : null,
        width: form.width !== "" ? parseFloat(form.width) : null,
        height: form.height !== "" ? parseFloat(form.height) : null,
        cbm: form.cbm !== "" ? parseFloat(form.cbm) : null,
        category_item: form.category_item
          ? parseInt(form.category_item, 10)
          : null,
        unite_id: Number.isFinite(uniteId) ? uniteId : null,
        code_barre: form.code_barre ? String(form.code_barre).trim() : null,
        synced: 0,
      };

      if (filenameForServer) {
        payload.picture_path = filenameForServer;
      } else if (editTarget && form.picture_path) {
        payload.picture_path = String(form.picture_path).split(/[/\\]/).pop();
      }

      Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined) delete payload[k];
      });

      let savedId = null;
      const isCreate = !editTarget;

      if (editTarget) {
        await updateItem(editTarget.id, payload);
        savedId = editTarget.id;
      } else {
        const res = await createItem(payload);
        const data = res?.data ?? res;
        savedId = data?.id ?? data?.item_id ?? data?.data?.id ?? null;
        if (savedId == null) {
          console.warn("Réponse create sans id clair :", data);
        }
      }

      // Image
      if (form.imageFile && savedId != null) {
        try {
          const uploadFn = api.uploadItemImage;
          if (typeof uploadFn === "function") {
            const pictureData = await fileToBase64(form.imageFile);
            const pictureHash = await fileToSha256(form.imageFile);
            const filename = filenameForServer || form.imageFile.name;
            const body = {
              filename,
              picture_data: pictureData,
              picture_hash: pictureHash,
            };
            try {
              await uploadFn(savedId, body);
            } catch {
              await uploadFn(savedId, filename, pictureData, pictureHash);
            }
          }
        } catch (imgErr) {
          console.error("IMAGE UPLOAD ERROR", imgErr?.response?.data || imgErr);
          alert("Article enregistré, mais l'image n'a pas pu être envoyée.");
        }
      }

      // Stocks initiaux (création uniquement)
      if (isCreate && savedId != null && typeof createStock === "function") {
        const entries = Object.entries(form.stocksInit || {});
        for (const [entId, qtyStr] of entries) {
          const qty = parseFloat(qtyStr);
          if (!Number.isFinite(Number(entId))) continue;
          try {
            await createStock({
              item_id: Number(savedId),
              entrepot_id: Number(entId),
              stock_actual: Number.isFinite(qty) ? qty : 0,
            });
          } catch (stErr) {
            console.error("STOCK INIT ERROR", entId, stErr?.response?.data || stErr);
          }
        }
      }

      setShowPanel(false);
      setEditTarget(null);
      setForm(emptyForm());
      await charger();
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail ?? err?.response?.data;
      alert(
        detail
          ? `Erreur ${err?.response?.status || ""} : ${
              typeof detail === "string" ? detail : JSON.stringify(detail)
            }`
          : err?.message || "Erreur lors de l'opération."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await deleteItem(id);
      charger();
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  const getCatName = (id) => {
    const c = categories.find((x) => x.id === id);
    return c ? c.name : "—";
  };

  const getStatut = (item) => {
    const stock = getStockTotal(item);
    const min = Number(item.minimal_stock) || 1;
    if (stock <= 0)
      return { label: "Rupture", color: "#f87171", bg: "rgba(239,68,68,0.14)" };
    if (stock < min)
      return { label: "Stock bas", color: "#fbbf24", bg: "rgba(245,158,11,0.14)" };
    return { label: "Normal", color: "#4ade80", bg: "rgba(74,222,128,0.14)" };
  };

  const totalCritique = items.filter((i) => getStockTotal(i) <= 0).length;
  const totalBas = items.filter((i) => {
    const s = getStockTotal(i);
    const min = Number(i.minimal_stock) || 1;
    return s > 0 && s < min;
  }).length;

  return (
    <div
      className="articles-shell"
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
        className="articles-page"
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
            <Package size={30} />
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
            <Package size={12} /> Catalogue
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
              Gestion des articles
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
              Catalogue, stocks réels, familles et alertes dans StockFlow.
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
            value={items.length}
            color="var(--gradient-start)"
            icon={<Package size={18} />}
          />
          <InfoCard
            label="RÉSULTATS"
            value={filtered.length}
            color="var(--gradient-end)"
            icon={<CheckCircle size={18} />}
          />
          <InfoCard
            label="RUPTURE"
            value={totalCritique}
            color="#f87171"
            icon={<AlertTriangle size={18} />}
          />
          <InfoCard
            label="STOCK BAS"
            value={totalBas}
            color="#fbbf24"
            icon={<TrendingDown size={18} />}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un article..."
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
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
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

          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            style={selectStyle}
          >
            <option value="">Toutes catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterStat}
            onChange={(e) => setFilterStat(e.target.value)}
            style={selectStyle}
          >
            <option value="">Tous statuts</option>
            <option value="normal">Normal</option>
            <option value="bas">Stock bas</option>
            <option value="critique">Rupture</option>
          </select>

          <button
            type="button"
            onClick={openAdd}
            className="btn-add"
            style={btnPrimary}
          >
            <Plus size={18} /> Nouvel article
          </button>
        </div>

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
        ) : filtered.length === 0 ? (
          <EmptyState onAdd={openAdd} />
        ) : (
          <div
            className="articles-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.15rem",
            }}
          >
            {filtered.map((item) => {
              const fk = familyKey(item);
              const inFamily = fk && (familySizes[fk] || 0) >= 2;
              return (
                <ArticleCard
                  key={item.id}
                  item={item}
                  catName={getCatName(item.category_item)}
                  statut={getStatut(item)}
                  stockLabel={convertirQuantite(getStockTotal(item), item)}
                  minLabel={convertirQuantite(
                    Number(item.minimal_stock) || 1,
                    item
                  )}
                  colorInfo={detectColor(item)}
                  formatInfo={detectFormat(item)}
                  inFamily={inFamily}
                  onEdit={() => openEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                  onPreview={() => setPreviewItem(item)}
                  onDetails={() => navigate(`/details/article/${item.id}`)}
                />
              );
            })}
          </div>
        )}

        {showPanel && (
          <ArticleFormPanel
            form={form}
            setForm={setForm}
            editTarget={editTarget}
            saving={saving}
            categories={categories}
            unites={unites}
            entrepots={entrepots}
            onClose={() => {
              setShowPanel(false);
              setEditTarget(null);
              setForm(emptyForm());
            }}
            onSubmit={handleSubmit}
            onPickImage={onPickImage}
          />
        )}

        {previewItem && (
          <ImagePreview
            item={previewItem}
            onClose={() => setPreviewItem(null)}
            catName={getCatName(previewItem.category_item)}
            statut={getStatut(previewItem)}
            stockLabel={convertirQuantite(getStockTotal(previewItem), previewItem)}
          />
        )}

        <Footer />

        <style>{`
@keyframes familyHalo {
  0%, 100% {
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--gradient-start) 45%, transparent),
                0 0 18px color-mix(in srgb, var(--gradient-start) 25%, transparent),
                0 0 32px color-mix(in srgb, var(--gradient-end) 15%, transparent);
  }
  50% {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gradient-end) 55%, transparent),
                0 0 26px color-mix(in srgb, var(--gradient-start) 40%, transparent),
                0 0 48px color-mix(in srgb, var(--gradient-end) 22%, transparent);
  }
}
@keyframes lightBar {
  0%, 100% { opacity: 0.55; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.35); }
}

@media (max-width: 1100px) {
  .info-band {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 768px) {
  .articles-page { padding: 0 12px 1.5rem !important; }
  .btn-add { width: 100%; justify-content: center; }
  .search-bar { flex: 1 1 100% !important; }
  .articles-grid {
    grid-template-columns: 1fr !important;
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

/* ========== CARD ========== */
function ArticleCard({
  item,
  catName,
  statut,
  stockLabel,
  minLabel,
  colorInfo,
  formatInfo,
  inFamily,
  onEdit,
  onDelete,
  onPreview,
  onDetails,
}) {
  const [hover, setHover] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const imageUrl = getArticleImageSrc(item);

  return (
    <div
      className={`article-card${inFamily ? " article-family" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        display: "flex",
        flexDirection: "column",
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
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        transition: "all .45s cubic-bezier(.16,1,.3,1)",
        minWidth: 0,
        animation: inFamily ? "familyHalo 3.2s ease-in-out infinite" : "none",
      }}
    >
      <div className="neon-corner top-left" />
      <div className="neon-corner top-right" />
      <div className="neon-corner bottom-left" />
      <div className="neon-corner bottom-right" />

      {/* Image */}
      <div
        onClick={onPreview}
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--glass-bg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {imageUrl && imgOk ? (
          <img
            src={imageUrl}
            alt=""
            onError={() => setImgOk(false)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hover ? "scale(1.08)" : "scale(1)",
              transition: "transform .5s cubic-bezier(.16,1,.3,1)",
            }}
          />
        ) : (
          <Package size={40} color="var(--gradient-start)" />
        )}

        {/* Statut */}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "4px 10px",
            borderRadius: 999,
            background: statut.bg,
            color: statut.color,
            fontSize: "0.72rem",
            fontWeight: 800,
            border: `1px solid ${statut.color}44`,
            backdropFilter: "blur(8px)",
            zIndex: 2,
          }}
        >
          {statut.label}
        </span>

        {/* Format P/M/G */}
        {formatInfo && (
          <span
            title={formatInfo.label}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              width: 28,
              height: 28,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: "0.78rem",
              color: "#fff",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              boxShadow: "0 4px 12px var(--glow-color)",
              border: "1px solid rgba(255,255,255,.3)",
              zIndex: 2,
            }}
          >
            {formatInfo.letter}
          </span>
        )}

        {/* Pastille couleur */}
        {colorInfo && (
          <span
            title={colorInfo.label}
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: colorInfo.hex,
              border: "2px solid rgba(255,255,255,.85)",
              boxShadow: `0 0 10px ${colorInfo.hex}99, 0 2px 8px rgba(0,0,0,.35)`,
              zIndex: 2,
            }}
          />
        )}
      </div>

      {/* Barre lumineuse séparatrice */}
      <div
        style={{
          height: 2,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
          animation: "lightBar 2.8s ease-in-out infinite",
          flexShrink: 0,
        }}
      />

      <div
        style={{
          padding: "1rem 1.1rem 1.15rem",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          position: "relative",
          zIndex: 1,
          flex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              color: "var(--text)",
              fontSize: "1rem",
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              marginTop: 3,
            }}
          >
            {[item.mark, item.modele].filter(Boolean).join(" · ") || "—"}
          </div>
        </div>

        {catName !== "—" && (
          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            {catName}
          </div>
        )}

        {/* Stock + min au hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "0.4rem 0.75rem",
            borderRadius: 12,
            background:
              "color-mix(in srgb, var(--gradient-start) 12%, transparent)",
            border: "1px solid var(--glass-border)",
            minHeight: 34,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--gradient-start)",
              fontFamily: "Syne, sans-serif",
            }}
            title="Stock total (tous entrepôts + mouvements)"
          >
            <Package size={13} />
            {stockLabel}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              opacity: hover ? 1 : 0,
              transform: hover ? "translateX(0)" : "translateX(8px)",
              transition: "opacity .3s, transform .3s",
              whiteSpace: "nowrap",
            }}
          >
            Min : {minLabel}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "0.85rem",
            borderTop: "1px solid var(--glass-border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <button type="button" onClick={onDetails} style={btnGhost}>
              <Eye size={12} /> Détails
            </button>
            <button type="button" onClick={onEdit} style={btnGhost}>
              <Edit2 size={12} /> Modifier
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={onDelete}
              style={{
                ...btnGhost,
                border: "1px solid rgba(239,68,68,.3)",
                background: "rgba(239,68,68,.08)",
                color: "#f87171",
              }}
            >
              <Trash2 size={12} /> Supprimer
            </button>
          </div>
        </div>
      </div>

      <style>{`
.article-card .neon-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  opacity: 0;
  transition: opacity .4s ease, transform .45s;
  pointer-events: none;
  z-index: 3;
}
.article-card:hover .neon-corner { opacity: 1; }
.article-card .neon-corner.top-left {
  top: 0; left: 0;
  border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start);
  border-top-left-radius: 26px;
}
.article-card .neon-corner.top-right {
  top: 0; right: 0;
  border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end);
  border-top-right-radius: 26px;
}
.article-card .neon-corner.bottom-left {
  bottom: 0; left: 0;
  border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end);
  border-bottom-left-radius: 26px;
}
.article-card .neon-corner.bottom-right {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start);
  border-bottom-right-radius: 26px;
}
.article-card:hover .top-left { transform: translate(4px, 4px); }
.article-card:hover .top-right { transform: translate(-4px, 4px); }
.article-card:hover .bottom-left { transform: translate(4px, -4px); }
.article-card:hover .bottom-right { transform: translate(-4px, -4px); }
`}</style>
    </div>
  );
}

/* ========== FORM PANEL (création / édition) ========== */
function ArticleFormPanel({
  form,
  setForm,
  editTarget,
  saving,
  categories,
  unites,
  entrepots,
  onClose,
  onSubmit,
  onPickImage,
}) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          maxHeight: "92vh",
          borderRadius: 28,
          background: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 30px 80px rgba(0,0,0,.4)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 5,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid var(--glass-border)",
            background: "var(--card-bg)",
            color: "var(--text)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={16} />
        </button>

        <form
          onSubmit={onSubmit}
          style={{
            padding: "1.25rem 1.35rem 1.5rem",
            overflowY: "auto",
            flex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              color: "var(--text)",
              marginBottom: "1rem",
            }}
          >
            {editTarget ? "Modifier l'article" : "Nouvel article"}
          </div>

          {/* Image */}
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 14,
              aspectRatio: "16/9",
              borderRadius: 16,
              border: "1px dashed var(--glass-border)",
              background: "var(--glass-bg)",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            {form.imagePreview ? (
              <img
                src={form.imagePreview}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <ImageIcon size={28} color="var(--gradient-start)" />
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Importer une image
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onPickImage}
              style={{ display: "none" }}
            />
          </label>

          <Field
            label="Nom *"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Field
              label="Marque"
              value={form.mark}
              onChange={(v) => setForm({ ...form, mark: v })}
            />
            <Field
              label="Modèle"
              value={form.modele}
              onChange={(v) => setForm({ ...form, modele: v })}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Field
              label="Prix achat"
              type="number"
              value={form.purchase_price}
              onChange={(v) => setForm({ ...form, purchase_price: v })}
            />
            <Field
              label="Prix vente FC"
              type="number"
              value={form.sale_price_fc}
              onChange={(v) => setForm({ ...form, sale_price_fc: v })}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Field
              label="Stock minimal"
              type="number"
              value={form.minimal_stock}
              onChange={(v) => setForm({ ...form, minimal_stock: v })}
            />
            <div>
              <label style={labelStyle}>Niveau : {form.level}</label>
              <input
                type="range"
                min={1}
                max={3}
                value={Number(form.level) || 1}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                style={{ width: "100%", accentColor: "var(--gradient-start)" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Catégorie</label>
            <select
              value={form.category_item}
              onChange={(e) =>
                setForm({ ...form, category_item: e.target.value })
              }
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="">Choisir…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Unité</label>
            <select
              value={form.unite_id}
              onChange={(e) => setForm({ ...form, unite_id: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="">Choisir…</option>
              {unites.map((u) => (
                <option key={u.id} value={u.id}>
                  {[u.niveau_1, u.niveau_2, u.niveau_3]
                    .filter(Boolean)
                    .join(" / ") || `#${u.id}`}
                </option>
              ))}
            </select>
          </div>

          {Number(form.level) >= 2 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  Number(form.level) === 3 ? "1fr 1fr" : "1fr",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Field
                label="Qté / boîte"
                type="number"
                value={form.qty_by_box}
                onChange={(v) => setForm({ ...form, qty_by_box: v })}
              />
              {Number(form.level) === 3 && (
                <Field
                  label="Qté / carton"
                  type="number"
                  value={form.qty_by_card}
                  onChange={(v) => setForm({ ...form, qty_by_card: v })}
                />
              )}
            </div>
          )}

          <Field
            label="Code-barres"
            value={form.code_barre}
            onChange={(v) => setForm({ ...form, code_barre: v })}
          />

          {/* Dimensions (volume capacité entrepôt) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Field
              label="Longueur"
              type="number"
              value={form.length}
              onChange={(v) => setForm({ ...form, length: v })}
            />
            <Field
              label="Largeur"
              type="number"
              value={form.width}
              onChange={(v) => setForm({ ...form, width: v })}
            />
            <Field
              label="Hauteur"
              type="number"
              value={form.height}
              onChange={(v) => setForm({ ...form, height: v })}
            />
          </div>

          {/* Stocks initiaux */}
          <div
            style={{
              marginTop: 8,
              marginBottom: 16,
              padding: "0.9rem",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
                color: "var(--gradient-start)",
                fontWeight: 800,
                fontSize: "0.8rem",
              }}
            >
              <Warehouse size={16} />
              Stock initial par entrepôt
              {editTarget && (
                <span
                  style={{
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    fontSize: "0.72rem",
                  }}
                >
                  (création uniquement)
                </span>
              )}
            </div>
            {entrepots.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                }}
              >
                Aucun entrepôt chargé.
              </p>
            ) : (
              entrepots.map((ent) => (
                <div
                  key={ent.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontSize: "0.85rem",
                      color: "var(--text)",
                      fontWeight: 600,
                    }}
                  >
                    {ent.reference || `Entrepôt #${ent.id}`}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    disabled={!!editTarget}
                    value={form.stocksInit?.[ent.id] ?? "0"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stocksInit: {
                          ...form.stocksInit,
                          [ent.id]: e.target.value,
                        },
                      })
                    }
                    style={{ ...inputStyle, width: 110, marginBottom: 0 }}
                  />
                </div>
              ))
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              ...btnPrimary,
              width: "100%",
              justifyContent: "center",
              opacity: saving ? 0.75 : 1,
            }}
          >
            <Save size={18} />
            {saving
              ? "Enregistrement…"
              : editTarget
              ? "Enregistrer"
              : "Ajouter l'article"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
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

function ImagePreview({ item, onClose, catName, statut, stockLabel }) {
  const imageUrl = getArticleImageSrc(item);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 24,
          background: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--glass-bg)",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Package size={64} color="var(--gradient-start)" />
          )}
        </div>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontWeight: 800,
              color: "var(--text)",
              fontFamily: "Syne, sans-serif",
            }}
          >
            {item.name}
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            {[item.mark, item.modele].filter(Boolean).join(" · ")}
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 999,
                background: statut.bg,
                color: statut.color,
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              {statut.label}
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--gradient-start)",
                fontFamily: "Syne, sans-serif",
              }}
            >
              Stock : {stockLabel}
            </span>
          </div>
          {catName !== "—" && (
            <div style={{ marginTop: 8, color: "var(--text)" }}>{catName}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem",
        borderRadius: 24,
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <Package size={36} color="var(--gradient-start)" />
      <p style={{ color: "var(--text-secondary)" }}>Aucun article</p>
      <button type="button" onClick={onAdd} style={btnPrimary}>
        <Plus size={16} /> Ajouter
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--text)",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "0.4rem",
};

const selectStyle = {
  padding: "0.85rem 1rem",
  borderRadius: 16,
  background: "var(--card-bg)",
  border: "1px solid var(--glass-border)",
  color: "var(--text)",
  fontSize: "0.88rem",
  cursor: "pointer",
  outline: "none",
};

const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "0.9rem 1.3rem",
  borderRadius: 18,
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
  gap: 4,
  padding: "7px 11px",
  borderRadius: 999,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--gradient-start)",
  cursor: "pointer",
  fontSize: "0.74rem",
  fontWeight: 600,
};

export default Articles;
export { calculerStockTotal, convertirQuantite, detectColor, detectFormat };
