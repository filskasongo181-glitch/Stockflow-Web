// // /**
// //  * Categories — aligné Dashboard (ThemeBackground, header compact)
// //  * + nombre d'articles par catégorie
// //  * + actions : Détails | Modifier (ligne) puis Supprimer centré
// //  * + hover / coins néon conservés
// //  * + formulaire modal conservé
// //  */
// // import { useEffect, useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Search,
// //   Plus,
// //   Edit2,
// //   Trash2,
// //   Tag,
// //   X,
// //   Save,
// //   FolderOpen,
// //   Filter,
// //   CheckCircle,
// //   Activity,
// //   Eye,
// //   ImagePlus,
// // } from "lucide-react";
// // import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// // import {
// //   getCategories,
// //   getItems,
// //   createCategorie,
// //   deleteCategorie,
// //   updateCategorie,
// // } from "../api/api";
// // import Footer from "../components/Footer";

// // const CATEGORY_ICONS = [
// //   "📦", "🖊️", "💻", "🍎", "🔧", "📚",
// //   "👔", "🏠", "⚡", "🎨", "🚗", "💊",
// //   "🌿", "🔑", "📱", "🎵", "🍕", "🏋️",
// // ];

// // function toIconSrc(icon) {
// //   if (icon == null || typeof icon !== "string") return null;
// //   let s = icon.trim();
// //   if (!s) return null;
// //   if (
// //     s.startsWith("data:") ||
// //     s.startsWith("http://") ||
// //     s.startsWith("https://") ||
// //     s.startsWith("blob:")
// //   )
// //     return s;
// //   if (s.startsWith("/") && s.length < 400) return s;
// //   if (s.length <= 8) return null;
// //   if (s.toLowerCase().startsWith("base64,")) s = s.slice(7);
// //   const clean = s.replace(/\s/g, "");
// //   if (clean.length < 16) return null;
// //   const mime = clean.startsWith("/9j/")
// //     ? "image/jpeg"
// //     : clean.startsWith("R0lGOD")
// //       ? "image/gif"
// //       : clean.startsWith("UklGR")
// //         ? "image/webp"
// //         : "image/png";
// //   return `data:${mime};base64,${clean}`;
// // }

// // function parseCategoryName(cat) {
// //   const raw = cat.name || "";
// //   const parts = raw.split(" ");
// //   const firstIsEmoji = parts[0] && parts[0].length <= 2;
// //   return {
// //     emoji: firstIsEmoji ? parts[0] : null,
// //     name: firstIsEmoji ? parts.slice(1).join(" ") || raw : raw,
// //   };
// // }

// // function fileToBase64(file) {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const result = String(reader.result || "");
// //       const i = result.indexOf(",");
// //       resolve(i >= 0 ? result.slice(i + 1) : result);
// //     };
// //     reader.onerror = reject;
// //     reader.readAsDataURL(file);
// //   });
// // }

// // const emptyForm = () => ({
// //   name: "",
// //   description: "",
// //   iconEmoji: "📦",
// //   iconBase64: null,
// //   iconPreview: null,
// // });

// // function Categories() {
// //   const navigate = useNavigate();
// //   const currentTheme =
// //     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
// //     "dark-galaxy";

// //   const [categories, setCategories] = useState([]);
// //   const [items, setItems] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [saving, setSaving] = useState(false);
// //   const [form, setForm] = useState(emptyForm());

// //   useEffect(() => {
// //     charger();
// //   }, []);

// //   useEffect(() => {
// //     const q = search.toLowerCase();
// //     setFiltered(
// //       categories.filter(
// //         (c) =>
// //           (c.name || "").toLowerCase().includes(q) ||
// //           (c.description || "").toLowerCase().includes(q)
// //       )
// //     );
// //   }, [search, categories]);

// //   const countArticles = (catId) =>
// //     items.filter((i) => Number(i.category_item) === Number(catId)).length;

// //   const charger = async () => {
// //     setLoading(true);
// //     try {
// //       const [resCat, resItems] = await Promise.all([
// //         getCategories(),
// //         typeof getItems === "function"
// //           ? getItems().catch(() => ({ data: [] }))
// //           : Promise.resolve({ data: [] }),
// //       ]);
// //       const data = Array.isArray(resCat.data)
// //         ? resCat.data
// //         : resCat.data?.data || [];
// //       const itemData = Array.isArray(resItems.data)
// //         ? resItems.data
// //         : resItems.data?.data || [];
// //       setCategories(data);
// //       setFiltered(data);
// //       setItems(itemData);
// //     } catch (e) {
// //       console.error(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const openCreate = () => {
// //     setEditingId(null);
// //     setForm(emptyForm());
// //     setShowForm(true);
// //   };

// //   const openEdit = (cat) => {
// //     const { emoji, name } = parseCategoryName(cat);
// //     const imgSrc = toIconSrc(cat.icon);
// //     let base64 = null;
// //     if (cat.icon && typeof cat.icon === "string" && cat.icon.length > 16) {
// //       let s = cat.icon.trim();
// //       if (s.startsWith("data:")) {
// //         const i = s.indexOf(",");
// //         s = i >= 0 ? s.slice(i + 1) : s;
// //       }
// //       base64 = s;
// //     }
// //     setEditingId(cat.id);
// //     setForm({
// //       name: name || cat.name || "",
// //       description: cat.description || "",
// //       iconEmoji:
// //         emoji ||
// //         (cat.icon && String(cat.icon).length <= 8 ? cat.icon : "📦"),
// //       iconBase64: base64,
// //       iconPreview: imgSrc,
// //     });
// //     setShowForm(true);
// //   };

// //   const closeForm = () => {
// //     setShowForm(false);
// //     setEditingId(null);
// //     setForm(emptyForm());
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!form.name.trim()) return;
// //     setSaving(true);
// //     try {
// //       const payload = {
// //         name: form.name.trim(),
// //         description: (form.description || "").trim(),
// //         icon: form.iconBase64 || form.iconEmoji || "📦",
// //       };
// //       if (editingId && typeof updateCategorie === "function") {
// //         await updateCategorie(editingId, payload);
// //       } else {
// //         await createCategorie(payload);
// //       }
// //       closeForm();
// //       await charger();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Erreur lors de l'enregistrement.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Supprimer cette catégorie ?")) return;
// //     try {
// //       await deleteCategorie(id);
// //       charger();
// //     } catch {
// //       alert("Erreur lors de la suppression.");
// //     }
// //   };

// //   return (
// //     <div
// //       className="categories-shell"
// //       style={{
// //         position: "relative",
// //         minHeight: "100%",
// //         width: "100%",
// //         ...(typeof themeCssVars === "function"
// //           ? themeCssVars(currentTheme)
// //           : {}),
// //       }}
// //     >
// //       <div
// //         aria-hidden
// //         style={{
// //           position: "fixed",
// //           inset: 0,
// //           zIndex: 0,
// //           pointerEvents: "none",
// //         }}
// //       >
// //         <ThemeBackground theme={currentTheme} />
// //       </div>

// //       <div
// //         className="categories-page"
// //         style={{
// //           position: "relative",
// //           zIndex: 1,
// //           width: "100%",
// //           maxWidth: 1320,
// //           margin: "0 auto",
// //           padding: "0 16px 2rem",
// //           boxSizing: "border-box",
// //         }}
// //       >
// //         {/* HEADER — comme Dashboard */}
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             textAlign: "center",
// //             marginTop: "0.35rem",
// //             marginBottom: "1.35rem",
// //             gap: "0.75rem",
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: 68,
// //               height: 68,
// //               borderRadius: 20,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               background:
// //                 "linear-gradient(145deg, var(--gradient-start), var(--gradient-end))",
// //               color: "#fff",
// //               boxShadow: "0 12px 32px var(--glow-color)",
// //               border: "1px solid rgba(255,255,255,0.22)",
// //             }}
// //           >
// //             <Tag size={30} />
// //           </div>
// //           <div
// //             style={{
// //               display: "inline-flex",
// //               alignItems: "center",
// //               gap: "0.45rem",
// //               padding: "5px 12px",
// //               borderRadius: 999,
// //               background: "var(--glass-bg)",
// //               border: "1px solid var(--glass-border)",
// //               color: "var(--gradient-start)",
// //               fontSize: "0.7rem",
// //               fontWeight: 700,
// //               letterSpacing: ".08em",
// //               textTransform: "uppercase",
// //             }}
// //           >
// //             <Tag size={12} /> Gestion intelligente
// //           </div>
// //           <div>
// //             <h1
// //               style={{
// //                 fontFamily: "Syne, sans-serif",
// //                 fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
// //                 fontWeight: 900,
// //                 margin: 0,
// //                 lineHeight: 1.15,
// //                 background:
// //                   "linear-gradient(135deg, var(--text), var(--gradient-start))",
// //                 WebkitBackgroundClip: "text",
// //                 WebkitTextFillColor: "transparent",
// //                 backgroundClip: "text",
// //               }}
// //             >
// //               Gestion des catégories
// //             </h1>
// //             <p
// //               style={{
// //                 marginTop: "0.5rem",
// //                 color: "var(--text-secondary)",
// //                 fontSize: "0.92rem",
// //                 maxWidth: 520,
// //                 marginLeft: "auto",
// //                 marginRight: "auto",
// //                 lineHeight: 1.55,
// //               }}
// //             >
// //               Organisez et gérez efficacement toutes les catégories de votre
// //               inventaire StockFlow.
// //             </p>
// //           </div>
// //         </div>

// //         {/* INFO BAND — style Dashboard StatCard */}
// //         <div
// //           className="info-band"
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
// //             gap: "0.85rem",
// //             marginBottom: "1.4rem",
// //           }}
// //         >
// //           <InfoCard
// //             label="TOTAL"
// //             value={categories.length}
// //             color="var(--gradient-start)"
// //             icon={<FolderOpen size={18} />}
// //           />
// //           <InfoCard
// //             label="RÉSULTATS"
// //             value={filtered.length}
// //             color="var(--gradient-end)"
// //             icon={<Filter size={18} />}
// //           />
// //           <InfoCard
// //             label="ARTICLES"
// //             value={items.length}
// //             color="#38bdf8"
// //             icon={<CheckCircle size={18} />}
// //           />
// //           <InfoCard
// //             label="STATUT"
// //             value="ONLINE"
// //             color="#22c55e"
// //             icon={<Activity size={18} />}
// //           />
// //         </div>

// //         {/* SEARCH + ADD */}
// //         <div
// //           className="cat-toolbar"
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             gap: "0.85rem",
// //             flexWrap: "wrap",
// //             marginBottom: "1.5rem",
// //           }}
// //         >
// //           <div
// //             className="search-bar"
// //             style={{
// //               flex: "1 1 280px",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "0.8rem",
// //               padding: "0.85rem 1.1rem",
// //               borderRadius: 18,
// //               background: "var(--card-bg)",
// //               border: "1px solid var(--glass-border)",
// //               boxShadow: "0 8px 24px rgba(0,0,0,.08)",
// //               minWidth: 0,
// //             }}
// //           >
// //             <Search size={18} color="var(--gradient-start)" />
// //             <input
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Rechercher une catégorie..."
// //               style={{
// //                 flex: 1,
// //                 background: "none",
// //                 border: "none",
// //                 outline: "none",
// //                 color: "var(--text)",
// //                 fontSize: "0.95rem",
// //                 minWidth: 0,
// //               }}
// //             />
// //             {search && (
// //               <button
// //                 type="button"
// //                 onClick={() => setSearch("")}
// //                 style={iconBtn}
// //               >
// //                 <X size={16} />
// //               </button>
// //             )}
// //           </div>
// //           <button
// //             type="button"
// //             onClick={openCreate}
// //             className="btn-add-category"
// //             style={btnPrimary}
// //           >
// //             <Plus size={18} /> Nouvelle catégorie
// //           </button>
// //         </div>

// //         {/* GRID */}
// //         {loading ? (
// //           <div
// //             style={{
// //               color: "var(--text-secondary)",
// //               padding: "3rem",
// //               textAlign: "center",
// //             }}
// //           >
// //             Chargement...
// //           </div>
// //         ) : filtered.length === 0 ? (
// //           <div
// //             style={{
// //               textAlign: "center",
// //               padding: "4rem 2rem",
// //               color: "var(--text-secondary)",
// //             }}
// //           >
// //             <Tag size={40} style={{ opacity: 0.3, marginBottom: "1rem" }} />
// //             <p>Aucune catégorie trouvée.</p>
// //           </div>
// //         ) : (
// //           <div
// //             className="categories-grid"
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// //               gap: "1.15rem",
// //             }}
// //           >
// //             {filtered.map((cat) => (
// //               <CategoryCard
// //                 key={cat.id}
// //                 cat={cat}
// //                 articleCount={countArticles(cat.id)}
// //                 onDelete={() => handleDelete(cat.id)}
// //                 onEdit={() => openEdit(cat)}
// //                 onDetails={() => navigate(`/details/categorie/${cat.id}`)}
// //               />
// //             ))}
// //           </div>
// //         )}

// //         {showForm && (
// //           <CategoryFormModal
// //             form={form}
// //             setForm={setForm}
// //             editingId={editingId}
// //             saving={saving}
// //             onClose={closeForm}
// //             onSubmit={handleSubmit}
// //           />
// //         )}

// //         <Footer />

// //         <style>{`
// //           @media (max-width: 900px) {
// //             .info-band {
// //               grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
// //             }
// //           }
// //           @media (max-width: 768px) {
// //             .categories-page { padding: 0 12px 1.5rem !important; }
// //             .btn-add-category { width: 100%; justify-content: center; }
// //             .search-bar { flex: 1 1 100% !important; }
// //             .categories-grid {
// //               grid-template-columns: 1fr !important;
// //             }
// //           }
// //           @media (max-width: 400px) {
// //             .info-band {
// //               grid-template-columns: 1fr !important;
// //             }
// //           }
// //         `}</style>
// //         <style>{`
// //           .dashboard-page .stat-card {
// //             transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
// //             min-width: 0;
// //           }
// //           .dashboard-page .stat-card:hover {
// //             transform: translateY(-3px);
// //             box-shadow: 0 16px 36px rgba(0,0,0,.14), 0 0 24px var(--glow-color);
// //           }
// //           .critiques-scroll::-webkit-scrollbar { width: 5px; }
// //           .critiques-scroll::-webkit-scrollbar-thumb {
// //             background: var(--glass-border);
// //             border-radius: 8px;
// //           }
// //           .panel-title-text {
// //             overflow: hidden;
// //             text-overflow: ellipsis;
// //             white-space: nowrap;
// //           }
// //           @media (max-width: 1100px) {
// //             .stats-grid {
// //               grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
// //             }
// //           }
// //           @media (max-width: 900px) {
// //             .dashboard-panels {
// //               grid-template-columns: 1fr !important;
// //             }
// //           }
// //           @media (max-width: 720px) {
// //             .stats-grid {
// //               grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
// //               gap: 0.65rem !important;
// //             }
// //             .dashboard-page {
// //               padding: 0 12px 1.5rem !important;
// //             }
// //           }
// //           @media (max-width: 400px) {
// //             .stats-grid {
// //               grid-template-columns: 1fr !important;
// //             }
// //           }
// //         `}</style>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ============================================================
// //    MODAL — conservé
// //    ============================================================ */
// // function CategoryFormModal({ form, setForm, editingId, saving, onClose, onSubmit }) {
// //   const fileRef = useRef(null);

// //   useEffect(() => {
// //     const onKey = (e) => {
// //       if (e.key === "Escape") onClose();
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, [onClose]);

// //   const onPickFile = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file || !file.type.startsWith("image/")) return;
// //     try {
// //       const b64 = await fileToBase64(file);
// //       setForm((f) => ({
// //         ...f,
// //         iconBase64: b64,
// //         iconPreview: `data:${file.type};base64,${b64}`,
// //       }));
// //     } catch {
// //       alert("Impossible de lire l'image.");
// //     }
// //   };

// //   return (
// //     <div
// //       onClick={onClose}
// //       style={{
// //         position: "fixed",
// //         inset: 0,
// //         zIndex: 2000,
// //         background: "rgba(0,0,0,.65)",
// //         backdropFilter: "blur(8px)",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         padding: "1.5rem",
// //       }}
// //     >
// //       <div
// //         onClick={(e) => e.stopPropagation()}
// //         style={{
// //           width: "100%",
// //           maxWidth: 440,
// //           borderRadius: 28,
// //           background: "var(--card-bg)",
// //           border: "1px solid var(--glass-border)",
// //           boxShadow: "0 30px 80px rgba(0,0,0,.4)",
// //           overflow: "hidden",
// //           position: "relative",
// //           maxHeight: "90vh",
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <button
// //           type="button"
// //           onClick={onClose}
// //           style={{
// //             position: "absolute",
// //             top: 12,
// //             right: 12,
// //             zIndex: 5,
// //             width: 36,
// //             height: 36,
// //             borderRadius: "50%",
// //             border: "1px solid var(--glass-border)",
// //             background: "var(--card-bg)",
// //             color: "var(--text)",
// //             cursor: "pointer",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             boxShadow: "0 4px 16px rgba(0,0,0,.2)",
// //           }}
// //         >
// //           <X size={16} />
// //         </button>

// //         <div
// //           style={{
// //             width: "100%",
// //             aspectRatio: "1.15",
// //             maxHeight: 260,
// //             background: `
// //               linear-gradient(
// //                 160deg,
// //                 color-mix(in srgb, var(--gradient-start) 25%, var(--card-bg)),
// //                 color-mix(in srgb, var(--gradient-end) 18%, var(--card-bg))
// //               )
// //             `,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             position: "relative",
// //             flexShrink: 0,
// //           }}
// //         >
// //           {form.iconPreview ? (
// //             <img
// //               src={form.iconPreview}
// //               alt=""
// //               style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //             />
// //           ) : (
// //             <span style={{ fontSize: "4.5rem", lineHeight: 1 }}>
// //               {form.iconEmoji}
// //             </span>
// //           )}
// //           <input
// //             ref={fileRef}
// //             type="file"
// //             accept="image/*"
// //             style={{ display: "none" }}
// //             onChange={onPickFile}
// //           />
// //           <button
// //             type="button"
// //             onClick={() => fileRef.current?.click()}
// //             style={{
// //               position: "absolute",
// //               bottom: 14,
// //               left: "50%",
// //               transform: "translateX(-50%)",
// //               display: "inline-flex",
// //               alignItems: "center",
// //               gap: 8,
// //               padding: "0.55rem 1rem",
// //               borderRadius: 999,
// //               border: "1px solid var(--glass-border)",
// //               background: "var(--card-bg)",
// //               color: "var(--text)",
// //               cursor: "pointer",
// //               fontSize: "0.82rem",
// //               fontWeight: 700,
// //               boxShadow: "0 6px 20px rgba(0,0,0,.25)",
// //             }}
// //           >
// //             <ImagePlus size={16} />
// //             {form.iconPreview ? "Changer l'image" : "Importer une image"}
// //           </button>
// //           <div
// //             style={{
// //               position: "absolute",
// //               bottom: 0,
// //               left: "50%",
// //               transform: "translateX(-50%)",
// //               width: "70%",
// //               height: 2,
// //               background: `linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)`,
// //               opacity: 0.8,
// //             }}
// //           />
// //         </div>

// //         <form
// //           onSubmit={onSubmit}
// //           style={{
// //             padding: "1.25rem 1.4rem 1.5rem",
// //             overflowY: "auto",
// //             flex: 1,
// //           }}
// //         >
// //           <div
// //             style={{
// //               fontFamily: "Syne, sans-serif",
// //               fontWeight: 800,
// //               fontSize: "1.15rem",
// //               color: "var(--text)",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             {editingId ? "Modifier la catégorie" : "Nouvelle catégorie"}
// //           </div>

// //           <div style={{ marginBottom: "0.9rem" }}>
// //             <label style={labelStyle}>Ou choisir un emoji</label>
// //             <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
// //               {CATEGORY_ICONS.map((ico) => (
// //                 <button
// //                   key={ico}
// //                   type="button"
// //                   onClick={() =>
// //                     setForm((f) => ({
// //                       ...f,
// //                       iconEmoji: ico,
// //                       iconBase64: null,
// //                       iconPreview: null,
// //                     }))
// //                   }
// //                   style={{
// //                     width: 34,
// //                     height: 34,
// //                     borderRadius: 10,
// //                     border: "2px solid",
// //                     borderColor:
// //                       !form.iconBase64 && form.iconEmoji === ico
// //                         ? "var(--gradient-start)"
// //                         : "var(--glass-border)",
// //                     background:
// //                       !form.iconBase64 && form.iconEmoji === ico
// //                         ? "var(--glass-bg)"
// //                         : "transparent",
// //                     fontSize: "1.05rem",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   {ico}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           <div style={{ marginBottom: "0.9rem" }}>
// //             <label style={labelStyle}>Nom</label>
// //             <input
// //               value={form.name}
// //               onChange={(e) => setForm({ ...form, name: e.target.value })}
// //               required
// //               placeholder="Ex: Fournitures Bureau"
// //               style={inputStyle}
// //             />
// //           </div>

// //           <div style={{ marginBottom: "1.2rem" }}>
// //             <label style={labelStyle}>Description</label>
// //             <textarea
// //               value={form.description}
// //               onChange={(e) =>
// //                 setForm({ ...form, description: e.target.value })
// //               }
// //               placeholder="Description..."
// //               rows={3}
// //               style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={saving}
// //             style={{
// //               width: "100%",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               gap: 8,
// //               padding: "0.9rem",
// //               borderRadius: 14,
// //               border: "none",
// //               background:
// //                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //               color: "#fff",
// //               fontWeight: 800,
// //               fontSize: "0.95rem",
// //               cursor: saving ? "wait" : "pointer",
// //               opacity: saving ? 0.75 : 1,
// //               boxShadow: "0 8px 24px var(--glow-color)",
// //             }}
// //           >
// //             <Save size={18} />
// //             {saving
// //               ? "Enregistrement..."
// //               : editingId
// //                 ? "Enregistrer"
// //                 : "Ajouter la catégorie"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // function CategoryCard({ cat, articleCount, onDelete, onEdit, onDetails }) {
// //   const [hover, setHover] = useState(false);
// //   const { emoji: emojiFromName, name } = parseCategoryName(cat);
// //   const imgSrc = toIconSrc(cat.icon);
// //   const shortIcon =
// //     cat.icon && typeof cat.icon === "string" && cat.icon.trim().length <= 8
// //       ? cat.icon.trim()
// //       : null;
// //   const emojiFallback = shortIcon || emojiFromName || "📂";
// //   const [imgOk, setImgOk] = useState(true);

// //   return (
// //     <div
// //       className="category-card"
// //       onMouseEnter={() => setHover(true)}
// //       onMouseLeave={() => setHover(false)}
// //       style={{
// //         position: "relative",
// //         overflow: "hidden",
// //         borderRadius: 26,
// //         padding: "1.4rem",
// //         display: "flex",
// //         flexDirection: "column",
// //         gap: "1.15rem",
// //         background: `
// //           linear-gradient(
// //             145deg,
// //             rgba(255,255,255,.08),
// //             rgba(255,255,255,.02)
// //           ),
// //           var(--card-bg)
// //         `,
// //         backdropFilter: "blur(35px)",
// //         border: hover
// //           ? "1px solid rgba(255,255,255,.25)"
// //           : "1px solid var(--glass-border)",
// //         boxShadow: hover
// //           ? `0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)`
// //           : `0 8px 25px rgba(0,0,0,.10)`,
// //         transform: hover ? "translateY(-10px)" : "translateY(0)",
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
// //           position: "absolute",
// //           top: 0,
// //           left: "50%",
// //           transform: "translateX(-50%)",
// //           width: hover ? "85%" : "60%",
// //           height: 1,
// //           background: `
// //             linear-gradient(
// //               90deg,
// //               transparent,
// //               var(--gradient-start),
// //               var(--gradient-end),
// //               transparent
// //             )
// //           `,
// //           opacity: hover ? 0.9 : 0.5,
// //           transition: "all .5s",
// //           pointerEvents: "none",
// //         }}
// //       />

// //       <div
// //         style={{
// //           position: "absolute",
// //           width: 220,
// //           height: 220,
// //           top: -110,
// //           right: -110,
// //           borderRadius: "50%",
// //           background: `radial-gradient(circle, var(--gradient-start), transparent 70%)`,
// //           opacity: hover ? 0.22 : 0.07,
// //           filter: "blur(20px)",
// //           transition: "all .5s",
// //           pointerEvents: "none",
// //         }}
// //       />

// //       {/* HEADER */}
// //       <div
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           gap: "0.9rem",
// //           position: "relative",
// //           zIndex: 1,
// //           minWidth: 0,
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: 64,
// //             height: 64,
// //             borderRadius: 20,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             overflow: "hidden",
// //             flexShrink: 0,
// //             background: hover
// //               ? `linear-gradient(135deg, var(--gradient-start), var(--gradient-end))`
// //               : `linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.03))`,
// //             border: "1px solid rgba(255,255,255,.15)",
// //             boxShadow: hover
// //               ? "0 15px 40px var(--glow-color)"
// //               : "0 10px 25px rgba(0,0,0,.12)",
// //             transform: hover ? "rotate(-8deg) scale(1.06)" : "rotate(0)",
// //             transition: "all .45s cubic-bezier(.16,1,.3,1)",
// //           }}
// //         >
// //           {imgSrc && imgOk ? (
// //             <img
// //               src={imgSrc}
// //               alt=""
// //               onError={() => setImgOk(false)}
// //               style={{
// //                 width: "100%",
// //                 height: "100%",
// //                 objectFit: "cover",
// //                 display: "block",
// //               }}
// //             />
// //           ) : (
// //             <span style={{ fontSize: "1.7rem", lineHeight: 1 }}>
// //               {emojiFallback}
// //             </span>
// //           )}
// //         </div>

// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           <div
// //             style={{
// //               fontFamily: "Syne, sans-serif",
// //               fontWeight: 800,
// //               fontSize: "1rem",
// //               color: "var(--text)",
// //               whiteSpace: "nowrap",
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //             }}
// //           >
// //             {name}
// //           </div>
// //           <div
// //             style={{
// //               marginTop: 5,
// //               fontSize: 12,
// //               color: "var(--text-secondary)",
// //               letterSpacing: "0.04em",
// //             }}
// //           >
// //             CATEGORY #{cat.id}
// //           </div>
// //         </div>

// //         {/* Badge nb articles */}
// //         <div
// //           title={`${articleCount} article${articleCount > 1 ? "s" : ""}`}
// //           style={{
// //             width: 36,
// //             height: 36,
// //             borderRadius: "50%",
// //             flexShrink: 0,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontFamily: "Syne, sans-serif",
// //             fontWeight: 900,
// //             fontSize: articleCount > 99 ? "0.7rem" : "0.85rem",
// //             color: "#fff",
// //             background:
// //               "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //             boxShadow: "0 6px 16px var(--glow-color)",
// //             border: "1px solid rgba(255,255,255,0.25)",
// //           }}
// //         >
// //           {articleCount}
// //         </div>
// //       </div>

// //       {cat.description && (
// //         <div
// //           style={{
// //             position: "relative",
// //             zIndex: 1,
// //             padding: "10px 12px",
// //             borderRadius: 14,
// //             background: "rgba(255,255,255,.04)",
// //             border: "1px solid var(--glass-border)",
// //             color: "var(--text-secondary)",
// //             fontSize: 13,
// //             lineHeight: 1.45,
// //             display: "-webkit-box",
// //             WebkitLineClamp: 2,
// //             WebkitBoxOrient: "vertical",
// //             overflow: "hidden",
// //           }}
// //         >
// //           {cat.description}
// //         </div>
// //       )}

// //       {/* ACTIONS — triangle : Détails | Modifier, puis Supprimer centré */}
// //       <div
// //         style={{
// //           position: "relative",
// //           zIndex: 1,
// //           paddingTop: "0.95rem",
// //           borderTop: "1px solid var(--glass-border)",
// //           display: "flex",
// //           flexDirection: "column",
// //           gap: "0.55rem",
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             gap: "0.5rem",
// //           }}
// //         >
// //           <button type="button" onClick={onDetails} style={btnGhost}>
// //             <Eye size={13} />
// //             Détails
// //           </button>
// //           <button type="button" onClick={onEdit} style={btnGhost}>
// //             <Edit2 size={13} />
// //             Modifier
// //           </button>
// //         </div>
// //         <div style={{ display: "flex", justifyContent: "center" }}>
// //           <button
// //             type="button"
// //             onClick={onDelete}
// //             style={{
// //               ...btnGhost,
// //               border: "1px solid rgba(239,68,68,.3)",
// //               background: "rgba(239,68,68,.08)",
// //               color: "#f87171",
// //             }}
// //           >
// //             <Trash2 size={13} />
// //             Supprimer
// //           </button>
// //         </div>
// //       </div>

// //       <style>{`
// //         .category-card .neon-corner {
// //           position: absolute;
// //           width: 28px;
// //           height: 28px;
// //           opacity: 0;
// //           pointer-events: none;
// //           transition: opacity .4s ease, transform .4s ease;
// //           z-index: 2;
// //         }
// //         .category-card:hover .neon-corner {
// //           opacity: 1;
// //           animation: neonPulse 2.5s ease-in-out infinite;
// //           filter: drop-shadow(0 0 8px var(--gradient-start));
// //         }
// //         .category-card .neon-corner.top-left {
// //           top: 0; left: 0;
// //           border-top: 2px solid var(--gradient-start);
// //           border-left: 2px solid var(--gradient-start);
// //           border-radius: 24px 0 0 0;
// //         }
// //         .category-card .neon-corner.top-right {
// //           top: 0; right: 0;
// //           border-top: 2px solid var(--gradient-end);
// //           border-right: 2px solid var(--gradient-end);
// //           border-radius: 0 24px 0 0;
// //         }
// //         .category-card .neon-corner.bottom-left {
// //           bottom: 0; left: 0;
// //           border-bottom: 2px solid var(--gradient-end);
// //           border-left: 2px solid var(--gradient-end);
// //           border-radius: 0 0 0 24px;
// //         }
// //         .category-card .neon-corner.bottom-right {
// //           bottom: 0; right: 0;
// //           border-bottom: 2px solid var(--gradient-start);
// //           border-right: 2px solid var(--gradient-start);
// //           border-radius: 0 0 24px 0;
// //         }
// //         .category-card:hover .top-left { transform: translate(5px, 5px); }
// //         .category-card:hover .top-right { transform: translate(-5px, 5px); }
// //         .category-card:hover .bottom-left { transform: translate(5px, -5px); }
// //         .category-card:hover .bottom-right { transform: translate(-5px, -5px); }
// //         @keyframes neonPulse {
// //           0%, 100% {
// //             filter: drop-shadow(0 0 5px var(--gradient-start));
// //             opacity: 0.75;
// //           }
// //           50% {
// //             filter: drop-shadow(0 0 16px var(--gradient-end));
// //             opacity: 1;
// //           }
// //         }
// //         .category-card .top-left { animation-delay: 0s; }
// //         .category-card .top-right { animation-delay: 0.4s; }
// //         .category-card .bottom-right { animation-delay: 0.8s; }
// //         .category-card .bottom-left { animation-delay: 1.2s; }
// //       `}</style>
// //     </div>
// //   );
// // }

// // function InfoCard({ label, value, color, icon }) {
// //   return (
// //     <div
// //       className="info-card"
// //       style={{
// //         padding: "1rem",
// //         borderRadius: 18,
// //         background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
// //         border: "1px solid var(--glass-border)",
// //         display: "flex",
// //         alignItems: "center",
// //         gap: "0.75rem",
// //         minHeight: 92,
// //         position: "relative",
// //         overflow: "hidden",
// //         boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
// //         zIndex: 1,
// //         minWidth: 0,
// //         boxSizing: "border-box",
// //         width: "100%",
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
// //           top: "15%",
// //           bottom: "15%",
// //           width: 4,
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
// //           boxShadow: `0 6px 16px color-mix(in srgb, ${color} 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.4)`,
// //           position: "relative",
// //           overflow: "hidden",
// //           zIndex: 1,
// //         }}
// //       >
// //         <div
// //           style={{
// //             position: "absolute",
// //             top: 4,
// //             left: 6,
// //             width: 14,
// //             height: 7,
// //             borderRadius: "50%",
// //             background: "rgba(255,255,255,0.5)",
// //             transform: "rotate(-20deg)",
// //             pointerEvents: "none",
// //           }}
// //         />
// //         <span style={{ position: "relative", zIndex: 1, display: "flex" }}>
// //           {icon}
// //         </span>
// //       </div>
// //       <div style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
// //         <div
// //           style={{
// //             fontSize: ".68rem",
// //             fontWeight: 700,
// //             letterSpacing: ".1em",
// //             color: "var(--text-secondary)",
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
// //             lineHeight: 1.15,
// //             marginTop: 2,
// //             whiteSpace: "nowrap",
// //             overflow: "hidden",
// //             textOverflow: "ellipsis",
// //           }}
// //         >
// //           {value}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const labelStyle = {
// //   display: "block",
// //   marginBottom: "0.4rem",
// //   fontSize: "0.72rem",
// //   fontWeight: 700,
// //   color: "var(--text-secondary)",
// //   textTransform: "uppercase",
// //   letterSpacing: "0.04em",
// // };

// // const inputStyle = {
// //   width: "100%",
// //   padding: "0.75rem 1rem",
// //   borderRadius: 12,
// //   border: "1px solid var(--glass-border)",
// //   background: "var(--glass-bg)",
// //   color: "var(--text)",
// //   fontSize: "0.92rem",
// //   outline: "none",
// //   boxSizing: "border-box",
// // };

// // const btnGhost = {
// //   padding: "8px 12px",
// //   borderRadius: 999,
// //   border: "1px solid var(--glass-border)",
// //   background: "rgba(255,255,255,.05)",
// //   color: "var(--gradient-start)",
// //   display: "flex",
// //   gap: 6,
// //   alignItems: "center",
// //   cursor: "pointer",
// //   fontSize: "0.78rem",
// //   fontWeight: 600,
// // };

// // const btnPrimary = {
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.65rem",
// //   padding: "0.9rem 1.3rem",
// //   borderRadius: 18,
// //   border: "none",
// //   background:
// //     "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
// //   color: "#fff",
// //   fontWeight: 800,
// //   fontSize: "0.92rem",
// //   cursor: "pointer",
// //   boxShadow: "0 12px 28px var(--glow-color)",
// //   whiteSpace: "nowrap",
// // };

// // const iconBtn = {
// //   background: "none",
// //   border: "none",
// //   cursor: "pointer",
// //   color: "var(--text-secondary)",
// //   display: "flex",
// //   padding: 0,
// // };

// // export default Categories;











// /**
//  * Categories — aligné Dashboard
//  * - tri alphabétique par nom
//  * - badge articles type Duolingo : flamme (max) / givre (0 ou min)
//  * - InfoCards + responsive colonnes
//  * - actions Détails | Modifier puis Supprimer
//  * - modal + coins néon conservés
//  */

// import { useEffect, useState, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Tag,
//   X,
//   Save,
//   FolderOpen,
//   Filter,
//   CheckCircle,
//   Activity,
//   Eye,
//   ImagePlus,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import {
//   getCategories,
//   getItems,
//   createCategorie,
//   deleteCategorie,
//   updateCategorie,
// } from "../api/api";
// import Footer from "../components/Footer";

// const CATEGORY_ICONS = [
//   "📦", "🖊️", "💻", "🍎", "🔧", "📚",
//   "👔", "🏠", "⚡", "🎨", "🚗", "💊",
//   "🌿", "🔑", "📱", "🎵", "🍕", "🏋️",
// ];

// function toIconSrc(icon) {
//   if (icon == null || typeof icon !== "string") return null;
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
//     : clean.startsWith("UklGR")
//     ? "image/webp"
//     : "image/png";
//   return `data:${mime};base64,${clean}`;
// }

// function parseCategoryName(cat) {
//   const raw = cat.name || "";
//   const parts = raw.split(" ");
//   const firstIsEmoji = parts[0] && parts[0].length <= 2;
//   return {
//     emoji: firstIsEmoji ? parts[0] : null,
//     name: firstIsEmoji ? parts.slice(1).join(" ") || raw : raw,
//   };
// }

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = String(reader.result || "");
//       const i = result.indexOf(",");
//       resolve(i >= 0 ? result.slice(i + 1) : result);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// const emptyForm = () => ({
//   name: "",
//   description: "",
//   iconEmoji: "📦",
//   iconBase64: null,
//   iconPreview: null,
// });

// /** Style badge compteur type Duolingo */
// function badgeStyle(count, maxCount) {
//   const isTop = maxCount > 0 && count === maxCount;
//   const isFrost = count === 0 || (maxCount > 0 && count === Math.min(...[count].filter(() => true)) && count < maxCount && count <= Math.max(1, Math.floor(maxCount * 0.15)));

//   // Flamme : catégorie la plus fournie
//   if (isTop && count > 0) {
//     return {
//       background: "linear-gradient(145deg, #ff6b35 0%, #f7931e 40%, #ffcc00 100%)",
//       boxShadow:
//         "0 0 18px rgba(255,120,40,.65), 0 0 32px rgba(255,80,0,.35), inset 0 1px 0 rgba(255,255,255,.45)",
//       border: "1px solid rgba(255,220,120,.55)",
//       color: "#fff",
//       animation: "flamePulse 1.8s ease-in-out infinite",
//       className: "badge-flame",
//     };
//   }

//   // Givre : 0 article ou très peu
//   if (count === 0) {
//     return {
//       background: "linear-gradient(145deg, #e8f4fc 0%, #a8d4f0 45%, #7eb8e0 100%)",
//       boxShadow:
//         "0 0 14px rgba(140,200,240,.45), inset 0 1px 0 rgba(255,255,255,.7), inset 0 -2px 6px rgba(100,160,210,.25)",
//       border: "1px solid rgba(180,220,255,.7)",
//       color: "#1e4a6e",
//       animation: "frostShimmer 3s ease-in-out infinite",
//       className: "badge-frost",
//     };
//   }

//   // Intermédiaire
//   return {
//     background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//     boxShadow: "0 6px 16px var(--glow-color)",
//     border: "1px solid rgba(255,255,255,0.25)",
//     color: "#fff",
//     animation: "none",
//     className: "",
//   };
// }

// function Categories() {
//   const navigate = useNavigate();
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState(emptyForm());

//   useEffect(() => {
//     charger();
//   }, []);

//   useEffect(() => {
//     const q = search.toLowerCase().trim();
//     let list = [...categories];

//     // Filtre recherche
//     if (q) {
//       list = list.filter(
//         (c) =>
//           (c.name || "").toLowerCase().includes(q) ||
//           (c.description || "").toLowerCase().includes(q)
//       );
//     }

//     // Tri alphabétique par nom affiché (sans emoji préfixe)
//     list.sort((a, b) => {
//       const na = parseCategoryName(a).name.toLowerCase();
//       const nb = parseCategoryName(b).name.toLowerCase();
//       return na.localeCompare(nb, "fr", { sensitivity: "base" });
//     });

//     setFiltered(list);
//   }, [search, categories]);

//   const countArticles = (catId) =>
//     items.filter((i) => Number(i.category_item) === Number(catId)).length;

//   const maxArticleCount = useMemo(() => {
//     if (!categories.length) return 0;
//     return Math.max(0, ...categories.map((c) => countArticles(c.id)));
//   }, [categories, items]);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const [resCat, resItems] = await Promise.all([
//         getCategories(),
//         typeof getItems === "function"
//           ? getItems().catch(() => ({ data: [] }))
//           : Promise.resolve({ data: [] }),
//       ]);
//       const data = Array.isArray(resCat.data)
//         ? resCat.data
//         : resCat.data?.data || [];
//       const itemData = Array.isArray(resItems.data)
//         ? resItems.data
//         : resItems.data?.data || [];

//       // Tri alphabétique dès le chargement
//       data.sort((a, b) => {
//         const na = parseCategoryName(a).name.toLowerCase();
//         const nb = parseCategoryName(b).name.toLowerCase();
//         return na.localeCompare(nb, "fr", { sensitivity: "base" });
//       });

//       setCategories(data);
//       setFiltered(data);
//       setItems(itemData);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openCreate = () => {
//     setEditingId(null);
//     setForm(emptyForm());
//     setShowForm(true);
//   };

//   const openEdit = (cat) => {
//     const { emoji, name } = parseCategoryName(cat);
//     const imgSrc = toIconSrc(cat.icon);
//     let base64 = null;
//     if (cat.icon && typeof cat.icon === "string" && cat.icon.length > 16) {
//       let s = cat.icon.trim();
//       if (s.startsWith("data:")) {
//         const i = s.indexOf(",");
//         s = i >= 0 ? s.slice(i + 1) : s;
//       }
//       base64 = s;
//     }
//     setEditingId(cat.id);
//     setForm({
//       name: name || cat.name || "",
//       description: cat.description || "",
//       iconEmoji:
//         emoji ||
//         (cat.icon && String(cat.icon).length <= 8 ? cat.icon : "📦"),
//       iconBase64: base64,
//       iconPreview: imgSrc,
//     });
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setForm(emptyForm());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name.trim()) return;
//     setSaving(true);
//     try {
//       const payload = {
//         name: form.name.trim(),
//         description: (form.description || "").trim(),
//         icon: form.iconBase64 || form.iconEmoji || "📦",
//       };
//       if (editingId && typeof updateCategorie === "function") {
//         await updateCategorie(editingId, payload);
//       } else {
//         await createCategorie(payload);
//       }
//       closeForm();
//       await charger();
//     } catch (err) {
//       console.error(err);
//       alert("Erreur lors de l'enregistrement.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Supprimer cette catégorie ?")) return;
//     try {
//       await deleteCategorie(id);
//       charger();
//     } catch {
//       alert("Erreur lors de la suppression.");
//     }
//   };

//   return (
//     <div
//       className="categories-shell"
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
//         className="categories-page"
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
//             <Tag size={30} />
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
//             <Tag size={12} /> Gestion intelligente
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
//               Gestion des catégories
//             </h1>
//             <p
//               style={{
//                 marginTop: "0.5rem",
//                 color: "var(--text-secondary)",
//                 fontSize: "0.92rem",
//                 maxWidth: 520,
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 lineHeight: 1.55,
//               }}
//             >
//               Organisez et gérez efficacement toutes les catégories de votre
//               inventaire StockFlow.
//             </p>
//           </div>
//         </div>

//         {/* INFO BAND */}
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
//             value={categories.length}
//             color="var(--gradient-start)"
//             icon={<FolderOpen size={18} />}
//           />
//           <InfoCard
//             label="RÉSULTATS"
//             value={filtered.length}
//             color="var(--gradient-end)"
//             icon={<Filter size={18} />}
//           />
//           <InfoCard
//             label="ARTICLES"
//             value={items.length}
//             color="#38bdf8"
//             icon={<CheckCircle size={18} />}
//           />
//           <InfoCard
//             label="STATUT"
//             value="ONLINE"
//             color="#22c55e"
//             icon={<Activity size={18} />}
//           />
//         </div>

//         {/* SEARCH + ADD */}
//         <div
//           className="cat-toolbar"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "0.85rem",
//             flexWrap: "wrap",
//             marginBottom: "1.5rem",
//           }}
//         >
//           <div
//             className="search-bar"
//             style={{
//               flex: "1 1 280px",
//               display: "flex",
//               alignItems: "center",
//               gap: "0.8rem",
//               padding: "0.85rem 1.1rem",
//               borderRadius: 18,
//               background: "var(--card-bg)",
//               border: "1px solid var(--glass-border)",
//               boxShadow: "0 8px 24px rgba(0,0,0,.08)",
//               minWidth: 0,
//             }}
//           >
//             <Search size={18} color="var(--gradient-start)" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Rechercher une catégorie..."
//               style={{
//                 flex: 1,
//                 background: "none",
//                 border: "none",
//                 outline: "none",
//                 color: "var(--text)",
//                 fontSize: "0.95rem",
//                 minWidth: 0,
//               }}
//             />
//             {search && (
//               <button type="button" onClick={() => setSearch("")} style={iconBtn}>
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={openCreate}
//             className="btn-add-category"
//             style={btnPrimary}
//           >
//             <Plus size={18} /> Nouvelle catégorie
//           </button>
//         </div>

//         {/* GRID — triée alphabétiquement */}
//         {loading ? (
//           <div
//             style={{
//               color: "var(--text-secondary)",
//               padding: "3rem",
//               textAlign: "center",
//             }}
//           >
//             Chargement...
//           </div>
//         ) : filtered.length === 0 ? (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "4rem 2rem",
//               color: "var(--text-secondary)",
//             }}
//           >
//             <Tag size={40} style={{ opacity: 0.3, marginBottom: "1rem" }} />
//             <p>Aucune catégorie trouvée.</p>
//           </div>
//         ) : (
//           <div
//             className="categories-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//               gap: "1.15rem",
//             }}
//           >
//             {filtered.map((cat) => (
//               <CategoryCard
//                 key={cat.id}
//                 cat={cat}
//                 articleCount={countArticles(cat.id)}
//                 maxCount={maxArticleCount}
//                 onDelete={() => handleDelete(cat.id)}
//                 onEdit={() => openEdit(cat)}
//                 onDetails={() => navigate(`/details/categorie/${cat.id}`)}
//               />
//             ))}
//           </div>
//         )}

//         {showForm && (
//           <CategoryFormModal
//             form={form}
//             setForm={setForm}
//             editingId={editingId}
//             saving={saving}
//             onClose={closeForm}
//             onSubmit={handleSubmit}
//           />
//         )}

//         <Footer />

//         <style>{`
// @keyframes flamePulse {
//   0%, 100% {
//     box-shadow: 0 0 14px rgba(255,120,40,.55), 0 0 28px rgba(255,80,0,.3), inset 0 1px 0 rgba(255,255,255,.45);
//     transform: scale(1);
//   }
//   50% {
//     box-shadow: 0 0 22px rgba(255,140,50,.85), 0 0 40px rgba(255,100,0,.45), inset 0 1px 0 rgba(255,255,255,.55);
//     transform: scale(1.06);
//   }
// }
// @keyframes frostShimmer {
//   0%, 100% {
//     box-shadow: 0 0 12px rgba(140,200,240,.4), inset 0 1px 0 rgba(255,255,255,.7);
//   }
//   50% {
//     box-shadow: 0 0 20px rgba(160,220,255,.65), inset 0 1px 0 rgba(255,255,255,.9);
//   }
// }

// @media (max-width: 1100px) {
//   .info-band {
//     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
//   }
// }
// @media (max-width: 768px) {
//   .categories-page { padding: 0 12px 1.5rem !important; }
//   .btn-add-category { width: 100%; justify-content: center; }
//   .search-bar { flex: 1 1 100% !important; }
//   .categories-grid {
//     grid-template-columns: 1fr !important;
//   }
// }
// @media (max-width: 400px) {
//   .info-band {
//     grid-template-columns: 1fr !important;
//   }
// }
// `}</style>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    MODAL
// ============================================================ */

// function CategoryFormModal({ form, setForm, editingId, saving, onClose, onSubmit }) {
//   const fileRef = useRef(null);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   const onPickFile = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;
//     try {
//       const b64 = await fileToBase64(file);
//       setForm((f) => ({
//         ...f,
//         iconBase64: b64,
//         iconPreview: `data:${file.type};base64,${b64}`,
//       }));
//     } catch {
//       alert("Impossible de lire l'image.");
//     }
//   };

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
//         padding: "1.5rem",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%",
//           maxWidth: 440,
//           borderRadius: 28,
//           background: "var(--card-bg)",
//           border: "1px solid var(--glass-border)",
//           boxShadow: "0 30px 80px rgba(0,0,0,.4)",
//           overflow: "hidden",
//           position: "relative",
//           maxHeight: "90vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <button
//           type="button"
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
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 4px 16px rgba(0,0,0,.2)",
//           }}
//         >
//           <X size={16} />
//         </button>

//         <div
//           style={{
//             width: "100%",
//             aspectRatio: "1.15",
//             maxHeight: 260,
//             background: `
//               linear-gradient(
//                 160deg,
//                 color-mix(in srgb, var(--gradient-start) 25%, var(--card-bg)),
//                 color-mix(in srgb, var(--gradient-end) 18%, var(--card-bg))
//               )
//             `,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             flexShrink: 0,
//           }}
//         >
//           {form.iconPreview ? (
//             <img
//               src={form.iconPreview}
//               alt=""
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           ) : (
//             <span style={{ fontSize: "4.5rem", lineHeight: 1 }}>
//               {form.iconEmoji}
//             </span>
//           )}
//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={onPickFile}
//           />
//           <button
//             type="button"
//             onClick={() => fileRef.current?.click()}
//             style={{
//               position: "absolute",
//               bottom: 14,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "0.55rem 1rem",
//               borderRadius: 999,
//               border: "1px solid var(--glass-border)",
//               background: "var(--card-bg)",
//               color: "var(--text)",
//               cursor: "pointer",
//               fontSize: "0.82rem",
//               fontWeight: 700,
//               boxShadow: "0 6px 20px rgba(0,0,0,.25)",
//             }}
//           >
//             <ImagePlus size={16} />
//             {form.iconPreview ? "Changer l'image" : "Importer une image"}
//           </button>
//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: "70%",
//               height: 2,
//               background: `linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)`,
//               opacity: 0.8,
//             }}
//           />
//         </div>

//         <form
//           onSubmit={onSubmit}
//           style={{
//             padding: "1.25rem 1.4rem 1.5rem",
//             overflowY: "auto",
//             flex: 1,
//           }}
//         >
//           <div
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 800,
//               fontSize: "1.15rem",
//               color: "var(--text)",
//               marginBottom: "1rem",
//             }}
//           >
//             {editingId ? "Modifier la catégorie" : "Nouvelle catégorie"}
//           </div>

//           <div style={{ marginBottom: "0.9rem" }}>
//             <label style={labelStyle}>Ou choisir un emoji</label>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//               {CATEGORY_ICONS.map((ico) => (
//                 <button
//                   key={ico}
//                   type="button"
//                   onClick={() =>
//                     setForm((f) => ({
//                       ...f,
//                       iconEmoji: ico,
//                       iconBase64: null,
//                       iconPreview: null,
//                     }))
//                   }
//                   style={{
//                     width: 34,
//                     height: 34,
//                     borderRadius: 10,
//                     border: "2px solid",
//                     borderColor:
//                       !form.iconBase64 && form.iconEmoji === ico
//                         ? "var(--gradient-start)"
//                         : "var(--glass-border)",
//                     background:
//                       !form.iconBase64 && form.iconEmoji === ico
//                         ? "var(--glass-bg)"
//                         : "transparent",
//                     fontSize: "1.05rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {ico}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div style={{ marginBottom: "0.9rem" }}>
//             <label style={labelStyle}>Nom</label>
//             <input
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//               placeholder="Ex: Fournitures Bureau"
//               style={inputStyle}
//             />
//           </div>

//           <div style={{ marginBottom: "1.2rem" }}>
//             <label style={labelStyle}>Description</label>
//             <textarea
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               placeholder="Description..."
//               rows={3}
//               style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={saving}
//             style={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 8,
//               padding: "0.9rem",
//               borderRadius: 14,
//               border: "none",
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               color: "#fff",
//               fontWeight: 800,
//               fontSize: "0.95rem",
//               cursor: saving ? "wait" : "pointer",
//               opacity: saving ? 0.75 : 1,
//               boxShadow: "0 8px 24px var(--glow-color)",
//             }}
//           >
//             <Save size={18} />
//             {saving
//               ? "Enregistrement..."
//               : editingId
//               ? "Enregistrer"
//               : "Ajouter la catégorie"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    CARD
// ============================================================ */

// function CategoryCard({
//   cat,
//   articleCount,
//   maxCount,
//   onDelete,
//   onEdit,
//   onDetails,
// }) {
//   const [hover, setHover] = useState(false);
//   const { emoji: emojiFromName, name } = parseCategoryName(cat);
//   const imgSrc = toIconSrc(cat.icon);
//   const shortIcon =
//     cat.icon && typeof cat.icon === "string" && cat.icon.trim().length <= 8
//       ? cat.icon.trim()
//       : null;
//   const emojiFallback = shortIcon || emojiFromName || "📂";
//   const [imgOk, setImgOk] = useState(true);

//   const isTop = maxCount > 0 && articleCount === maxCount && articleCount > 0;
//   const isFrost = articleCount === 0;

//   const badge = isTop
//     ? {
//         background:
//           "linear-gradient(145deg, #ff6b35 0%, #f7931e 40%, #ffcc00 100%)",
//         boxShadow:
//           "0 0 18px rgba(255,120,40,.65), 0 0 32px rgba(255,80,0,.35), inset 0 1px 0 rgba(255,255,255,.45)",
//         border: "1px solid rgba(255,220,120,.55)",
//         color: "#fff",
//         animation: "flamePulse 1.8s ease-in-out infinite",
//       }
//     : isFrost
//     ? {
//         background:
//           "linear-gradient(145deg, #e8f4fc 0%, #a8d4f0 45%, #7eb8e0 100%)",
//         boxShadow:
//           "0 0 14px rgba(140,200,240,.45), inset 0 1px 0 rgba(255,255,255,.7), inset 0 -2px 6px rgba(100,160,210,.25)",
//         border: "1px solid rgba(180,220,255,.7)",
//         color: "#1e4a6e",
//         animation: "frostShimmer 3s ease-in-out infinite",
//       }
//     : {
//         background:
//           "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//         boxShadow: "0 6px 16px var(--glow-color)",
//         border: "1px solid rgba(255,255,255,0.25)",
//         color: "#fff",
//         animation: "none",
//       };

//   return (
//     <div
//       className="category-card"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: 26,
//         padding: "1.4rem",
//         display: "flex",
//         flexDirection: "column",
//         gap: "1.15rem",
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
//           ? `0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)`
//           : `0 8px 25px rgba(0,0,0,.10)`,
//         transform: hover ? "translateY(-10px)" : "translateY(0)",
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
//           background: `
//             linear-gradient(
//               90deg,
//               transparent,
//               var(--gradient-start),
//               var(--gradient-end),
//               transparent
//             )
//           `,
//           opacity: hover ? 0.9 : 0.5,
//           transition: "all .5s",
//           pointerEvents: "none",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           width: 220,
//           height: 220,
//           top: -110,
//           right: -110,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, var(--gradient-start), transparent 70%)`,
//           opacity: hover ? 0.22 : 0.07,
//           filter: "blur(20px)",
//           transition: "all .5s",
//           pointerEvents: "none",
//         }}
//       />

//       {/* HEADER */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "0.9rem",
//           position: "relative",
//           zIndex: 1,
//           minWidth: 0,
//         }}
//       >
//         <div
//           style={{
//             width: 64,
//             height: 64,
//             borderRadius: 20,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             overflow: "hidden",
//             flexShrink: 0,
//             background: hover
//               ? `linear-gradient(135deg, var(--gradient-start), var(--gradient-end))`
//               : `linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.03))`,
//             border: "1px solid rgba(255,255,255,.15)",
//             boxShadow: hover
//               ? "0 15px 40px var(--glow-color)"
//               : "0 10px 25px rgba(0,0,0,.12)",
//             transform: hover ? "rotate(-8deg) scale(1.06)" : "rotate(0)",
//             transition: "all .45s cubic-bezier(.16,1,.3,1)",
//           }}
//         >
//           {imgSrc && imgOk ? (
//             <img
//               src={imgSrc}
//               alt=""
//               onError={() => setImgOk(false)}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: "block",
//               }}
//             />
//           ) : (
//             <span style={{ fontSize: "1.7rem", lineHeight: 1 }}>
//               {emojiFallback}
//             </span>
//           )}
//         </div>

//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div
//             style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 800,
//               fontSize: "1rem",
//               color: "var(--text)",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {name}
//           </div>
//           <div
//             style={{
//               marginTop: 5,
//               fontSize: 12,
//               color: "var(--text-secondary)",
//               letterSpacing: "0.04em",
//             }}
//           >
//             CATEGORY #{cat.id}
//           </div>
//         </div>

//         {/* Badge articles — flamme / givre / normal */}
//         <div
//           title={
//             isTop
//               ? `🔥 Top · ${articleCount} article${articleCount > 1 ? "s" : ""}`
//               : isFrost
//               ? "❄ Aucun article"
//               : `${articleCount} article${articleCount > 1 ? "s" : ""}`
//           }
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: "50%",
//             flexShrink: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 900,
//             fontSize: articleCount > 99 ? "0.68rem" : "0.85rem",
//             position: "relative",
//             ...badge,
//           }}
//         >
//           {isTop && (
//             <span
//               aria-hidden
//               style={{
//                 position: "absolute",
//                 top: -6,
//                 right: -4,
//                 fontSize: 14,
//                 lineHeight: 1,
//                 filter: "drop-shadow(0 0 4px rgba(255,120,0,.8))",
//               }}
//             >
//               🔥
//             </span>
//           )}
//           {isFrost && (
//             <span
//               aria-hidden
//               style={{
//                 position: "absolute",
//                 top: -5,
//                 right: -3,
//                 fontSize: 12,
//                 lineHeight: 1,
//                 opacity: 0.9,
//               }}
//             >
//               ❄
//             </span>
//           )}
//           {articleCount}
//         </div>
//       </div>

//       {cat.description && (
//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             padding: "10px 12px",
//             borderRadius: 14,
//             background: "rgba(255,255,255,.04)",
//             border: "1px solid var(--glass-border)",
//             color: "var(--text-secondary)",
//             fontSize: 13,
//             lineHeight: 1.45,
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {cat.description}
//         </div>
//       )}

//       {/* ACTIONS */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           paddingTop: "0.95rem",
//           borderTop: "1px solid var(--glass-border)",
//           display: "flex",
//           flexDirection: "column",
//           gap: "0.55rem",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "0.5rem",
//           }}
//         >
//           <button type="button" onClick={onDetails} style={btnGhost}>
//             <Eye size={13} />
//             Détails
//           </button>
//           <button type="button" onClick={onEdit} style={btnGhost}>
//             <Edit2 size={13} />
//             Modifier
//           </button>
//         </div>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <button
//             type="button"
//             onClick={onDelete}
//             style={{
//               ...btnGhost,
//               border: "1px solid rgba(239,68,68,.3)",
//               background: "rgba(239,68,68,.08)",
//               color: "#f87171",
//             }}
//           >
//             <Trash2 size={13} />
//             Supprimer
//           </button>
//         </div>
//       </div>

//       <style>{`
// .category-card .neon-corner {
//   position: absolute;
//   width: 28px;
//   height: 28px;
//   opacity: 0;
//   pointer-events: none;
//   transition: opacity .4s ease, transform .4s ease;
//   z-index: 2;
// }
// .category-card:hover .neon-corner {
//   opacity: 1;
//   animation: neonPulse 2.5s ease-in-out infinite;
//   filter: drop-shadow(0 0 8px var(--gradient-start));
// }
// .category-card .neon-corner.top-left {
//   top: 0; left: 0;
//   border-top: 2px solid var(--gradient-start);
//   border-left: 2px solid var(--gradient-start);
//   border-radius: 24px 0 0 0;
// }
// .category-card .neon-corner.top-right {
//   top: 0; right: 0;
//   border-top: 2px solid var(--gradient-end);
//   border-right: 2px solid var(--gradient-end);
//   border-radius: 0 24px 0 0;
// }
// .category-card .neon-corner.bottom-left {
//   bottom: 0; left: 0;
//   border-bottom: 2px solid var(--gradient-end);
//   border-left: 2px solid var(--gradient-end);
//   border-radius: 0 0 0 24px;
// }
// .category-card .neon-corner.bottom-right {
//   bottom: 0; right: 0;
//   border-bottom: 2px solid var(--gradient-start);
//   border-right: 2px solid var(--gradient-start);
//   border-radius: 0 0 24px 0;
// }
// .category-card:hover .top-left { transform: translate(5px, 5px); }
// .category-card:hover .top-right { transform: translate(-5px, 5px); }
// .category-card:hover .bottom-left { transform: translate(5px, -5px); }
// .category-card:hover .bottom-right { transform: translate(-5px, -5px); }
// @keyframes neonPulse {
//   0%, 100% {
//     filter: drop-shadow(0 0 5px var(--gradient-start));
//     opacity: 0.75;
//   }
//   50% {
//     filter: drop-shadow(0 0 16px var(--gradient-end));
//     opacity: 1;
//   }
// }
// .category-card .top-left { animation-delay: 0s; }
// .category-card .top-right { animation-delay: 0.4s; }
// .category-card .bottom-right { animation-delay: 0.8s; }
// .category-card .bottom-left { animation-delay: 1.2s; }
// `}</style>
//     </div>
//   );
// }

// function InfoCard({ label, value, color, icon }) {
//   return (
//     <div
//       className="info-card"
//       style={{
//         padding: "1rem",
//         borderRadius: 18,
//         background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
//         border: "1px solid var(--glass-border)",
//         display: "flex",
//         alignItems: "center",
//         gap: "0.75rem",
//         minHeight: 92,
//         position: "relative",
//         overflow: "hidden",
//         boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
//         zIndex: 1,
//         minWidth: 0,
//         boxSizing: "border-box",
//         width: "100%",
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
//           top: "15%",
//           bottom: "15%",
//           width: 4,
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
//             fontSize: ".68rem",
//             fontWeight: 700,
//             letterSpacing: ".1em",
//             color: "var(--text-secondary)",
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

// const labelStyle = {
//   display: "block",
//   marginBottom: "0.4rem",
//   fontSize: "0.72rem",
//   fontWeight: 700,
//   color: "var(--text-secondary)",
//   textTransform: "uppercase",
//   letterSpacing: "0.04em",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "0.75rem 1rem",
//   borderRadius: 12,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--text)",
//   fontSize: "0.92rem",
//   outline: "none",
//   boxSizing: "border-box",
// };

// const btnGhost = {
//   padding: "8px 12px",
//   borderRadius: 999,
//   border: "1px solid var(--glass-border)",
//   background: "rgba(255,255,255,.05)",
//   color: "var(--gradient-start)",
//   display: "flex",
//   gap: 6,
//   alignItems: "center",
//   cursor: "pointer",
//   fontSize: "0.78rem",
//   fontWeight: 600,
// };

// const btnPrimary = {
//   display: "flex",
//   alignItems: "center",
//   gap: "0.65rem",
//   padding: "0.9rem 1.3rem",
//   borderRadius: 18,
//   border: "none",
//   background:
//     "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//   color: "#fff",
//   fontWeight: 800,
//   fontSize: "0.92rem",
//   cursor: "pointer",
//   boxShadow: "0 12px 28px var(--glow-color)",
//   whiteSpace: "nowrap",
// };

// const iconBtn = {
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   color: "var(--text-secondary)",
//   display: "flex",
//   padding: 0,
// };

// export default Categories;



/**
 * Categories — aligné Dashboard
 * - tri alphabétique par nom
 * - badge articles type Duolingo : flamme (max) / givre (0 ou min)
 * - InfoCards + responsive colonnes
 * - actions Détails | Modifier puis Supprimer
 * - modal + coins néon conservés
 * - messages (MessageBox) + audit logs + bouton Detail All
 */

import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Tag,
  X,
  Save,
  FolderOpen,
  Filter,
  CheckCircle,
  Activity,
  Eye,
  ImagePlus,
  Layers,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import {
  getCategories,
  getItems,
  createCategorie,
  deleteCategorie,
  updateCategorie,
} from "../api/api";
import Footer from "../components/Footer";
import { useMessageBox } from "../components/MessageBox";
import { audit } from "../utils/auditLog";

const CATEGORY_ICONS = [
  "📦", "🖊️", "💻", "🍎", "🔧", "📚",
  "👔", "🏠", "⚡", "🎨", "🚗", "💊",
  "🌿", "🔑", "📱", "🎵", "🍕", "🏋️",
];

function toIconSrc(icon) {
  if (icon == null || typeof icon !== "string") return null;
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
    : clean.startsWith("UklGR")
    ? "image/webp"
    : "image/png";
  return `data:${mime};base64,${clean}`;
}

function parseCategoryName(cat) {
  const raw = cat.name || "";
  const parts = raw.split(" ");
  const firstIsEmoji = parts[0] && parts[0].length <= 2;
  return {
    emoji: firstIsEmoji ? parts[0] : null,
    name: firstIsEmoji ? parts.slice(1).join(" ") || raw : raw,
  };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const i = result.indexOf(",");
      resolve(i >= 0 ? result.slice(i + 1) : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const emptyForm = () => ({
  name: "",
  description: "",
  iconEmoji: "📦",
  iconBase64: null,
  iconPreview: null,
});

/** Style badge compteur type Duolingo */
function badgeStyle(count, maxCount) {
  const isTop = maxCount > 0 && count === maxCount;
  const isFrost = count === 0 || (maxCount > 0 && count === Math.min(...[count].filter(() => true)) && count < maxCount && count <= Math.max(1, Math.floor(maxCount * 0.15)));

  // Flamme : catégorie la plus fournie
  if (isTop && count > 0) {
    return {
      background: "linear-gradient(145deg, #ff6b35 0%, #f7931e 40%, #ffcc00 100%)",
      boxShadow:
        "0 0 18px rgba(255,120,40,.65), 0 0 32px rgba(255,80,0,.35), inset 0 1px 0 rgba(255,255,255,.45)",
      border: "1px solid rgba(255,220,120,.55)",
      color: "#fff",
      animation: "flamePulse 1.8s ease-in-out infinite",
      className: "badge-flame",
    };
  }

  // Givre : 0 article ou très peu
  if (count === 0) {
    return {
      background: "linear-gradient(145deg, #e8f4fc 0%, #a8d4f0 45%, #7eb8e0 100%)",
      boxShadow:
        "0 0 14px rgba(140,200,240,.45), inset 0 1px 0 rgba(255,255,255,.7), inset 0 -2px 6px rgba(100,160,210,.25)",
      border: "1px solid rgba(180,220,255,.7)",
      color: "#1e4a6e",
      animation: "frostShimmer 3s ease-in-out infinite",
      className: "badge-frost",
    };
  }

  // Intermédiaire
  return {
    background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
    boxShadow: "0 6px 16px var(--glow-color)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    animation: "none",
    className: "",
  };
}

function Categories() {
  const navigate = useNavigate();
  const msg = useMessageBox();
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    charger();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    let list = [...categories];

    // Filtre recherche
    if (q) {
      list = list.filter(
        (c) =>
          (c.name || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q)
      );
    }

    // Tri alphabétique par nom affiché (sans emoji préfixe)
    list.sort((a, b) => {
      const na = parseCategoryName(a).name.toLowerCase();
      const nb = parseCategoryName(b).name.toLowerCase();
      return na.localeCompare(nb, "fr", { sensitivity: "base" });
    });

    setFiltered(list);
  }, [search, categories]);

  const countArticles = (catId) =>
    items.filter((i) => Number(i.category_item) === Number(catId)).length;

  const maxArticleCount = useMemo(() => {
    if (!categories.length) return 0;
    return Math.max(0, ...categories.map((c) => countArticles(c.id)));
  }, [categories, items]);

  const charger = async () => {
    setLoading(true);
    try {
      const [resCat, resItems] = await Promise.all([
        getCategories(),
        typeof getItems === "function"
          ? getItems().catch(() => ({ data: [] }))
          : Promise.resolve({ data: [] }),
      ]);
      const data = Array.isArray(resCat.data)
        ? resCat.data
        : resCat.data?.data || [];
      const itemData = Array.isArray(resItems.data)
        ? resItems.data
        : resItems.data?.data || [];

      // Tri alphabétique dès le chargement
      data.sort((a, b) => {
        const na = parseCategoryName(a).name.toLowerCase();
        const nb = parseCategoryName(b).name.toLowerCase();
        return na.localeCompare(nb, "fr", { sensitivity: "base" });
      });

      setCategories(data);
      setFiltered(data);
      setItems(itemData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = (cat) => {
    const { emoji, name } = parseCategoryName(cat);
    const imgSrc = toIconSrc(cat.icon);
    let base64 = null;
    if (cat.icon && typeof cat.icon === "string" && cat.icon.length > 16) {
      let s = cat.icon.trim();
      if (s.startsWith("data:")) {
        const i = s.indexOf(",");
        s = i >= 0 ? s.slice(i + 1) : s;
      }
      base64 = s;
    }
    setEditingId(cat.id);
    setForm({
      name: name || cat.name || "",
      description: cat.description || "",
      iconEmoji:
        emoji ||
        (cat.icon && String(cat.icon).length <= 8 ? cat.icon : "📦"),
      iconBase64: base64,
      iconPreview: imgSrc,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    const name = form.name.trim();
    try {
      const payload = {
        name,
        description: (form.description || "").trim(),
        icon: form.iconBase64 || form.iconEmoji || "📦",
      };
      if (editingId && typeof updateCategorie === "function") {
        await updateCategorie(editingId, payload);
        await audit.update("CATEGORY", name);
        msg.success(
          "Catégorie modifiée",
          `« ${name} » a été mise à jour avec succès.`
        );
      } else {
        await createCategorie(payload);
        await audit.create("CATEGORY", name);
        msg.success(
          "Catégorie créée",
          `« ${name} » a été enregistrée avec succès.`
        );
      }
      closeForm();
      await charger();
    } catch (err) {
      console.error(err);
      msg.error("Échec", "Impossible d'enregistrer la catégorie.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name = "") => {
    const label = name || `#${id}`;
    const ok = await msg.confirm(
      "Supprimer cette catégorie ?",
      `« ${label} » sera supprimée. Cette action est irréversible.`
    );
    if (!ok) return;
    try {
      await deleteCategorie(id);
      await audit.remove("CATEGORY", label);
      msg.success("Catégorie supprimée", `« ${label} » a été supprimée.`);
      charger();
    } catch {
      msg.error("Échec", "Suppression impossible.");
    }
  };

  return (
    <div
      className="categories-shell"
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
        className="categories-page"
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
            <Tag size={30} />
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
            <Tag size={12} /> Gestion intelligente
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
              Gestion des catégories
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
              Organisez et gérez efficacement toutes les catégories de votre
              inventaire StockFlow.
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
            value={categories.length}
            color="var(--gradient-start)"
            icon={<FolderOpen size={18} />}
          />
          <InfoCard
            label="RÉSULTATS"
            value={filtered.length}
            color="var(--gradient-end)"
            icon={<Filter size={18} />}
          />
          <InfoCard
            label="ARTICLES"
            value={items.length}
            color="#38bdf8"
            icon={<CheckCircle size={18} />}
          />
          <InfoCard
            label="STATUT"
            value="ONLINE"
            color="#22c55e"
            icon={<Activity size={18} />}
          />
        </div>

        {/* SEARCH + ADD */}
        <div
          className="cat-toolbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.85rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          <div
            className="search-bar"
            style={{
              flex: "1 1 280px",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.85rem 1.1rem",
              borderRadius: 18,
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              minWidth: 0,
            }}
          >
            <Search size={18} color="var(--gradient-start)" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une catégorie..."
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
              <button type="button" onClick={() => setSearch("")} style={iconBtn}>
                <X size={16} />
              </button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.65rem",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/details/categorie/all")}
              style={{
                ...btnPrimary,
                background: "var(--card-bg)",
                color: "var(--text)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <Layers size={18} /> Detail All
            </button>
            <button
              type="button"
              onClick={openCreate}
              className="btn-add-category"
              style={btnPrimary}
            >
              <Plus size={18} /> Nouvelle catégorie
            </button>
          </div>
        </div>

        {/* GRID — triée alphabétiquement */}
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
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "var(--text-secondary)",
            }}
          >
            <Tag size={40} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <p>Aucune catégorie trouvée.</p>
          </div>
        ) : (
          <div
            className="categories-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.15rem",
            }}
          >
            {filtered.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                articleCount={countArticles(cat.id)}
                maxCount={maxArticleCount}
                onDelete={() =>
                  handleDelete(cat.id, parseCategoryName(cat).name || cat.name)
                }
                onEdit={() => openEdit(cat)}
                onDetails={() => navigate(`/details/categorie/${cat.id}`)}
              />
            ))}
          </div>
        )}

        {showForm && (
          <CategoryFormModal
            form={form}
            setForm={setForm}
            editingId={editingId}
            saving={saving}
            onClose={closeForm}
            onSubmit={handleSubmit}
          />
        )}

        <Footer />

        <style>{`
@keyframes flamePulse {
  0%, 100% {
    box-shadow: 0 0 14px rgba(255,120,40,.55), 0 0 28px rgba(255,80,0,.3), inset 0 1px 0 rgba(255,255,255,.45);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 22px rgba(255,140,50,.85), 0 0 40px rgba(255,100,0,.45), inset 0 1px 0 rgba(255,255,255,.55);
    transform: scale(1.06);
  }
}
@keyframes frostShimmer {
  0%, 100% {
    box-shadow: 0 0 12px rgba(140,200,240,.4), inset 0 1px 0 rgba(255,255,255,.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(160,220,255,.65), inset 0 1px 0 rgba(255,255,255,.9);
  }
}

@media (max-width: 1100px) {
  .info-band {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 768px) {
  .categories-page { padding: 0 12px 1.5rem !important; }
  .btn-add-category { width: 100%; justify-content: center; }
  .search-bar { flex: 1 1 100% !important; }
  .categories-grid {
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

/* ============================================================
   MODAL
============================================================ */

function CategoryFormModal({ form, setForm, editingId, saving, onClose, onSubmit }) {
  const fileRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    try {
      const b64 = await fileToBase64(file);
      setForm((f) => ({
        ...f,
        iconBase64: b64,
        iconPreview: `data:${file.type};base64,${b64}`,
      }));
    } catch {
      alert("Impossible de lire l'image.");
    }
  };

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
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 28,
          background: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 30px 80px rgba(0,0,0,.4)",
          overflow: "hidden",
          position: "relative",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
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
            boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          }}
        >
          <X size={16} />
        </button>

        <div
          style={{
            width: "100%",
            aspectRatio: "1.15",
            maxHeight: 260,
            background: `
              linear-gradient(
                160deg,
                color-mix(in srgb, var(--gradient-start) 25%, var(--card-bg)),
                color-mix(in srgb, var(--gradient-end) 18%, var(--card-bg))
              )
            `,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {form.iconPreview ? (
            <img
              src={form.iconPreview}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "4.5rem", lineHeight: 1 }}>
              {form.iconEmoji}
            </span>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onPickFile}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              position: "absolute",
              bottom: 14,
              left: "50%",
              transform: "translateX(-50%)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.55rem 1rem",
              borderRadius: 999,
              border: "1px solid var(--glass-border)",
              background: "var(--card-bg)",
              color: "var(--text)",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 700,
              boxShadow: "0 6px 20px rgba(0,0,0,.25)",
            }}
          >
            <ImagePlus size={16} />
            {form.iconPreview ? "Changer l'image" : "Importer une image"}
          </button>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: 2,
              background: `linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)`,
              opacity: 0.8,
            }}
          />
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            padding: "1.25rem 1.4rem 1.5rem",
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
            {editingId ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </div>

          <div style={{ marginBottom: "0.9rem" }}>
            <label style={labelStyle}>Ou choisir un emoji</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CATEGORY_ICONS.map((ico) => (
                <button
                  key={ico}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      iconEmoji: ico,
                      iconBase64: null,
                      iconPreview: null,
                    }))
                  }
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "2px solid",
                    borderColor:
                      !form.iconBase64 && form.iconEmoji === ico
                        ? "var(--gradient-start)"
                        : "var(--glass-border)",
                    background:
                      !form.iconBase64 && form.iconEmoji === ico
                        ? "var(--glass-bg)"
                        : "transparent",
                    fontSize: "1.05rem",
                    cursor: "pointer",
                  }}
                >
                  {ico}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "0.9rem" }}>
            <label style={labelStyle}>Nom</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Ex: Fournitures Bureau"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
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
              fontSize: "0.95rem",
              cursor: saving ? "wait" : "pointer",
              opacity: saving ? 0.75 : 1,
              boxShadow: "0 8px 24px var(--glow-color)",
            }}
          >
            <Save size={18} />
            {saving
              ? "Enregistrement..."
              : editingId
              ? "Enregistrer"
              : "Ajouter la catégorie"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   CARD
============================================================ */

function CategoryCard({
  cat,
  articleCount,
  maxCount,
  onDelete,
  onEdit,
  onDetails,
}) {
  const [hover, setHover] = useState(false);
  const { emoji: emojiFromName, name } = parseCategoryName(cat);
  const imgSrc = toIconSrc(cat.icon);
  const shortIcon =
    cat.icon && typeof cat.icon === "string" && cat.icon.trim().length <= 8
      ? cat.icon.trim()
      : null;
  const emojiFallback = shortIcon || emojiFromName || "📂";
  const [imgOk, setImgOk] = useState(true);

  const isTop = maxCount > 0 && articleCount === maxCount && articleCount > 0;
  const isFrost = articleCount === 0;

  const badge = isTop
    ? {
        background:
          "linear-gradient(145deg, #ff6b35 0%, #f7931e 40%, #ffcc00 100%)",
        boxShadow:
          "0 0 18px rgba(255,120,40,.65), 0 0 32px rgba(255,80,0,.35), inset 0 1px 0 rgba(255,255,255,.45)",
        border: "1px solid rgba(255,220,120,.55)",
        color: "#fff",
        animation: "flamePulse 1.8s ease-in-out infinite",
      }
    : isFrost
    ? {
        background:
          "linear-gradient(145deg, #e8f4fc 0%, #a8d4f0 45%, #7eb8e0 100%)",
        boxShadow:
          "0 0 14px rgba(140,200,240,.45), inset 0 1px 0 rgba(255,255,255,.7), inset 0 -2px 6px rgba(100,160,210,.25)",
        border: "1px solid rgba(180,220,255,.7)",
        color: "#1e4a6e",
        animation: "frostShimmer 3s ease-in-out infinite",
      }
    : {
        background:
          "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
        boxShadow: "0 6px 16px var(--glow-color)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
        animation: "none",
      };

  return (
    <div
      className="category-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        padding: "1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.15rem",
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
          ? `0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)`
          : `0 8px 25px rgba(0,0,0,.10)`,
        transform: hover ? "translateY(-10px)" : "translateY(0)",
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
          background: `
            linear-gradient(
              90deg,
              transparent,
              var(--gradient-start),
              var(--gradient-end),
              transparent
            )
          `,
          opacity: hover ? 0.9 : 0.5,
          transition: "all .5s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          top: -110,
          right: -110,
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--gradient-start), transparent 70%)`,
          opacity: hover ? 0.22 : 0.07,
          filter: "blur(20px)",
          transition: "all .5s",
          pointerEvents: "none",
        }}
      />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",
          position: "relative",
          zIndex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
            background: hover
              ? `linear-gradient(135deg, var(--gradient-start), var(--gradient-end))`
              : `linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.03))`,
            border: "1px solid rgba(255,255,255,.15)",
            boxShadow: hover
              ? "0 15px 40px var(--glow-color)"
              : "0 10px 25px rgba(0,0,0,.12)",
            transform: hover ? "rotate(-8deg) scale(1.06)" : "rotate(0)",
            transition: "all .45s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {imgSrc && imgOk ? (
            <img
              src={imgSrc}
              alt=""
              onError={() => setImgOk(false)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <span style={{ fontSize: "1.7rem", lineHeight: 1 }}>
              {emojiFallback}
            </span>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              color: "var(--text)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 5,
              fontSize: 12,
              color: "var(--text-secondary)",
              letterSpacing: "0.04em",
            }}
          >
            CATEGORY #{cat.id}
          </div>
        </div>

        {/* Badge articles — flamme / givre / normal */}
        <div
          title={
            isTop
              ? `🔥 Top · ${articleCount} article${articleCount > 1 ? "s" : ""}`
              : isFrost
              ? "❄ Aucun article"
              : `${articleCount} article${articleCount > 1 ? "s" : ""}`
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: articleCount > 99 ? "0.68rem" : "0.85rem",
            position: "relative",
            ...badge,
          }}
        >
          {isTop && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: -6,
                right: -4,
                fontSize: 14,
                lineHeight: 1,
                filter: "drop-shadow(0 0 4px rgba(255,120,0,.8))",
              }}
            >
              🔥
            </span>
          )}
          {isFrost && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: -5,
                right: -3,
                fontSize: 12,
                lineHeight: 1,
                opacity: 0.9,
              }}
            >
              ❄
            </span>
          )}
          {articleCount}
        </div>
      </div>

      {cat.description && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255,255,255,.04)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-secondary)",
            fontSize: 13,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {cat.description}
        </div>
      )}

      {/* ACTIONS */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "0.95rem",
          borderTop: "1px solid var(--glass-border)",
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <button type="button" onClick={onDetails} style={btnGhost}>
            <Eye size={13} />
            Détails
          </button>
          <button type="button" onClick={onEdit} style={btnGhost}>
            <Edit2 size={13} />
            Modifier
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
            <Trash2 size={13} />
            Supprimer
          </button>
        </div>
      </div>

      <style>{`
.category-card .neon-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s ease, transform .4s ease;
  z-index: 2;
}
.category-card:hover .neon-corner {
  opacity: 1;
  animation: neonPulse 2.5s ease-in-out infinite;
  filter: drop-shadow(0 0 8px var(--gradient-start));
}
.category-card .neon-corner.top-left {
  top: 0; left: 0;
  border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start);
  border-radius: 24px 0 0 0;
}
.category-card .neon-corner.top-right {
  top: 0; right: 0;
  border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end);
  border-radius: 0 24px 0 0;
}
.category-card .neon-corner.bottom-left {
  bottom: 0; left: 0;
  border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end);
  border-radius: 0 0 0 24px;
}
.category-card .neon-corner.bottom-right {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start);
  border-radius: 0 0 24px 0;
}
.category-card:hover .top-left { transform: translate(5px, 5px); }
.category-card:hover .top-right { transform: translate(-5px, 5px); }
.category-card:hover .bottom-left { transform: translate(5px, -5px); }
.category-card:hover .bottom-right { transform: translate(-5px, -5px); }
@keyframes neonPulse {
  0%, 100% {
    filter: drop-shadow(0 0 5px var(--gradient-start));
    opacity: 0.75;
  }
  50% {
    filter: drop-shadow(0 0 16px var(--gradient-end));
    opacity: 1;
  }
}
.category-card .top-left { animation-delay: 0s; }
.category-card .top-right { animation-delay: 0.4s; }
.category-card .bottom-right { animation-delay: 0.8s; }
.category-card .bottom-left { animation-delay: 1.2s; }
`}</style>
    </div>
  );
}

function InfoCard({ label, value, color, icon }) {
  return (
    <div
      className="info-card"
      style={{
        padding: "1rem",
        borderRadius: 18,
        background: `linear-gradient(155deg, color-mix(in srgb, var(--card-bg) 85%, ${color} 15%), var(--card-bg))`,
        border: "1px solid var(--glass-border)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        minHeight: 92,
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
        zIndex: 1,
        minWidth: 0,
        boxSizing: "border-box",
        width: "100%",
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
          top: "15%",
          bottom: "15%",
          width: 4,
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
            fontSize: ".68rem",
            fontWeight: 700,
            letterSpacing: ".1em",
            color: "var(--text-secondary)",
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

const labelStyle = {
  display: "block",
  marginBottom: "0.4rem",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--text)",
  fontSize: "0.92rem",
  outline: "none",
  boxSizing: "border-box",
};

const btnGhost = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--glass-border)",
  background: "rgba(255,255,255,.05)",
  color: "var(--gradient-start)",
  display: "flex",
  gap: 6,
  alignItems: "center",
  cursor: "pointer",
  fontSize: "0.78rem",
  fontWeight: 600,
};

const btnPrimary = {
  display: "flex",
  alignItems: "center",
  gap: "0.65rem",
  padding: "0.9rem 1.3rem",
  borderRadius: 18,
  border: "none",
  background:
    "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
  color: "#fff",
  fontWeight: 800,
  fontSize: "0.92rem",
  cursor: "pointer",
  boxShadow: "0 12px 28px var(--glow-color)",
  whiteSpace: "nowrap",
};

const iconBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "var(--text-secondary)",
  display: "flex",
  padding: 0,
};

export default Categories;
