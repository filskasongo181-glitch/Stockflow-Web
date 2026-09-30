// /**
//  * Entrepots — même identité que Categories / Dashboard
//  * Badge = nb d'articles distincts présents dans l'entrepôt (via getStocks)
//  * Actions : Détails | Modifier puis Supprimer centré
//  * Modal formulaire style Catégories
//  */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Warehouse,
//   X,
//   Save,
//   MapPin,
//   Package,
//   Layers,
//   CheckCircle,
//   Eye,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import {
//   getEntrepots,
//   getStocks,
//   createEntrepot,
//   updateEntrepot,
//   deleteEntrepot,
// } from "../api/api";

// const emptyForm = () => ({
//   reference: "",
//   description: "",
//   localisation: "",
//   capacity: "",
// });

// function Entrepots() {
//   const navigate = useNavigate();
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [entrepots, setEntrepots] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editTarget, setEditTarget] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState(emptyForm());

//   useEffect(() => {
//     charger();
//   }, []);

//   useEffect(() => {
//     const q = search.toLowerCase();
//     setFiltered(
//       entrepots.filter(
//         (e) =>
//           (e.reference || "").toLowerCase().includes(q) ||
//           (e.description || "").toLowerCase().includes(q) ||
//           (e.localisation || "").toLowerCase().includes(q)
//       )
//     );
//   }, [search, entrepots]);

//   /**
//    * Nombre d'articles distincts présents dans un entrepôt
//    * (lignes stocks avec cet entrepot_id → item_id uniques)
//    */
//   const countArticlesInEntrepot = (entrepotId) => {
//     const ids = new Set();
//     (stocks || []).forEach((s) => {
//       if (Number(s.entrepot_id) === Number(entrepotId) && s.item_id != null) {
//         ids.add(Number(s.item_id));
//       }
//     });
//     return ids.size;
//   };

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const [resEnt, resStocks] = await Promise.all([
//         getEntrepots(),
//         typeof getStocks === "function"
//           ? getStocks().catch(() => ({ data: [] }))
//           : Promise.resolve({ data: [] }),
//       ]);
//       const data = Array.isArray(resEnt.data)
//         ? resEnt.data
//         : resEnt.data?.data || [];
//       const stockData = Array.isArray(resStocks.data)
//         ? resStocks.data
//         : resStocks.data?.data || [];
//       setEntrepots(data);
//       setFiltered(data);
//       setStocks(stockData);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAdd = () => {
//     setEditTarget(null);
//     setForm(emptyForm());
//     setShowForm(true);
//   };

//   const openEdit = (ent) => {
//     setEditTarget(ent);
//     setForm({
//       reference: ent.reference || "",
//       description: ent.description || "",
//       localisation: ent.localisation || "",
//       capacity: ent.capacity ?? "",
//     });
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setEditTarget(null);
//     setForm(emptyForm());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.reference.trim()) return;
//     setSaving(true);
//     try {
//       const payload = {
//         reference: form.reference.trim(),
//         description: (form.description || "").trim(),
//         localisation: (form.localisation || "").trim(),
//         capacity: form.capacity !== "" ? parseInt(form.capacity, 10) : null,
//       };
//       if (editTarget) {
//         await updateEntrepot(editTarget.id, payload);
//       } else {
//         await createEntrepot(payload);
//       }
//       closeForm();
//       await charger();
//     } catch (err) {
//       console.error(err);
//       alert("Erreur lors de l'opération.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Supprimer cet entrepôt ?")) return;
//     try {
//       await deleteEntrepot(id);
//       charger();
//     } catch {
//       alert("Erreur lors de la suppression.");
//     }
//   };

//   const totalCapacity = entrepots.reduce((s, e) => s + (e.capacity || 0), 0);
//   const actifs = entrepots.filter((e) => !e.deleted || e.deleted === 0).length;
//   const localisations = [
//     ...new Set(entrepots.map((e) => e.localisation).filter(Boolean)),
//   ].length;

//   return (
//     <div
//       className="entrepots-shell"
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
//         className="entrepots-page"
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
//             <Warehouse size={30} />
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
//             <Warehouse size={12} /> Gestion logistique
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
//               Gestion des entrepôts
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
//               Organisez et suivez tous vos entrepôts, capacités et localisations
//               dans StockFlow.
//             </p>
//           </div>
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
//             value={entrepots.length}
//             color="var(--gradient-start)"
//             icon={<Warehouse size={18} />}
//           />
//           <InfoCard
//             label="CAPACITÉ"
//             value={totalCapacity > 0 ? totalCapacity.toLocaleString() : "—"}
//             color="var(--gradient-end)"
//             icon={<Layers size={18} />}
//           />
//           <InfoCard
//             label="ACTIFS"
//             value={actifs}
//             color="#22c55e"
//             icon={<CheckCircle size={18} />}
//           />
//           <InfoCard
//             label="LIEUX"
//             value={localisations}
//             color="#38bdf8"
//             icon={<MapPin size={18} />}
//           />
//         </div>

//         {/* TOOLBAR */}
//         <div
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
//               placeholder="Rechercher un entrepôt..."
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
//               <button
//                 type="button"
//                 onClick={() => setSearch("")}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                   color: "var(--text-secondary)",
//                   display: "flex",
//                   padding: 0,
//                 }}
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={openAdd}
//             className="btn-add"
//             style={btnPrimary}
//           >
//             <Plus size={18} /> Nouvel entrepôt
//           </button>
//         </div>

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
//           <EmptyState onAdd={openAdd} />
//         ) : (
//           <div
//             className="entrepots-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//               gap: "1.15rem",
//             }}
//           >
//             {filtered.map((ent) => (
//               <EntrepotCard
//                 key={ent.id}
//                 ent={ent}
//                 articleCount={countArticlesInEntrepot(ent.id)}
//                 onEdit={() => openEdit(ent)}
//                 onDelete={() => handleDelete(ent.id)}
//                 onDetails={() => navigate(`/details/entrepot/${ent.id}`)}
//               />
//             ))}
//           </div>
//         )}

//         {showForm && (
//           <EntrepotFormModal
//             form={form}
//             setForm={setForm}
//             editTarget={editTarget}
//             saving={saving}
//             onClose={closeForm}
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
//             .entrepots-page { padding: 0 12px 1.5rem !important; }
//             .btn-add { width: 100%; justify-content: center; }
//             .search-bar { flex: 1 1 100% !important; }
//             .entrepots-grid {
//               grid-template-columns: 1fr !important;
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

// function EntrepotFormModal({ form, setForm, editTarget, saving, onClose, onSubmit }) {
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

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
//           }}
//         >
//           <X size={16} />
//         </button>

//         <div
//           style={{
//             width: "100%",
//             maxHeight: 200,
//             aspectRatio: "1.2",
//             background:
//               "linear-gradient(160deg, color-mix(in srgb, var(--gradient-start) 25%, var(--card-bg)), color-mix(in srgb, var(--gradient-end) 18%, var(--card-bg)))",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <div
//             style={{
//               width: 88,
//               height: 88,
//               borderRadius: 24,
//               background:
//                 "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 12px 36px var(--glow-color)",
//             }}
//           >
//             <Warehouse size={40} color="#fff" />
//           </div>
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
//             {editTarget ? "Modifier l'entrepôt" : "Nouvel entrepôt"}
//           </div>

//           <div style={{ marginBottom: "0.9rem" }}>
//             <label style={labelStyle}>Référence</label>
//             <input
//               value={form.reference}
//               onChange={(e) => setForm({ ...form, reference: e.target.value })}
//               required
//               placeholder="Ex: Entrepôt A — Zone Nord"
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ marginBottom: "0.9rem" }}>
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
//           <div style={{ marginBottom: "0.9rem" }}>
//             <label style={labelStyle}>Localisation</label>
//             <input
//               value={form.localisation}
//               onChange={(e) =>
//                 setForm({ ...form, localisation: e.target.value })
//               }
//               placeholder="Ex: Kinshasa"
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ marginBottom: "1.2rem" }}>
//             <label style={labelStyle}>Capacité maximale</label>
//             <input
//               type="number"
//               value={form.capacity}
//               onChange={(e) => setForm({ ...form, capacity: e.target.value })}
//               placeholder="Ex: 500"
//               min={1}
//               style={inputStyle}
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
//               cursor: saving ? "wait" : "pointer",
//               opacity: saving ? 0.75 : 1,
//               boxShadow: "0 8px 24px var(--glow-color)",
//             }}
//           >
//             <Save size={18} />
//             {saving
//               ? "Enregistrement..."
//               : editTarget
//                 ? "Enregistrer"
//                 : "Ajouter l'entrepôt"}
//           </button>
//         </form>
//       </div>
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
//         alignItems: "center",
//         gap: "0.75rem",
//         minHeight: 92,
//         position: "relative",
//         overflow: "hidden",
//         boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
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

// function EntrepotCard({ ent, articleCount, onEdit, onDelete, onDetails }) {
//   const [hover, setHover] = useState(false);
//   const capacite = ent.capacity || 0;

//   return (
//     <div
//       className="entrepot-card"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: 26,
//         padding: "1.4rem",
//         display: "flex",
//         flexDirection: "column",
//         gap: "1.1rem",
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
//           background:
//             "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
//           opacity: hover ? 0.9 : 0.5,
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
//           background:
//             "radial-gradient(circle, var(--gradient-start), transparent 70%)",
//           opacity: hover ? 0.22 : 0.07,
//           filter: "blur(20px)",
//           pointerEvents: "none",
//         }}
//       />

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
//             flexShrink: 0,
//             background: hover
//               ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//               : "var(--glass-bg)",
//             border: "1px solid var(--glass-border)",
//             color: hover ? "#fff" : "var(--gradient-start)",
//             boxShadow: hover
//               ? "0 15px 40px var(--glow-color)"
//               : "0 8px 20px rgba(0,0,0,.08)",
//             transform: hover ? "rotate(-8deg) scale(1.06)" : "none",
//             transition: "all .45s",
//           }}
//         >
//           <Warehouse size={26} />
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
//             {ent.reference}
//           </div>
//           {ent.localisation && (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4,
//                 marginTop: 5,
//                 fontSize: 12,
//                 color: "var(--text-secondary)",
//               }}
//             >
//               <MapPin size={11} /> {ent.localisation}
//             </div>
//           )}
//           <div
//             style={{
//               marginTop: 4,
//               fontSize: 11,
//               color: "var(--text-secondary)",
//             }}
//           >
//             ENTREPÔT #{ent.id}
//           </div>
//         </div>

//         {/* Badge articles distincts */}
//         <div
//           title={`${articleCount} article${articleCount > 1 ? "s" : ""} dans cet entrepôt`}
//           style={{
//             width: 36,
//             height: 36,
//             borderRadius: "50%",
//             flexShrink: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 900,
//             fontSize: articleCount > 99 ? "0.7rem" : "0.85rem",
//             color: "#fff",
//             background:
//               "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//             boxShadow: "0 6px 16px var(--glow-color)",
//             border: "1px solid rgba(255,255,255,0.25)",
//           }}
//         >
//           {articleCount}
//         </div>
//       </div>

//       {ent.description && (
//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             padding: "10px 12px",
//             borderRadius: 14,
//             background: "var(--glass-bg)",
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
//           {ent.description}
//         </div>
//       )}

//       {capacite > 0 && (
//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             padding: "0.55rem 0.9rem",
//             borderRadius: 12,
//             background:
//               "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
//             border: "1px solid var(--glass-border)",
//           }}
//         >
//           <Package size={14} color="var(--gradient-start)" />
//           <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
//             Capacité :
//           </span>
//           <span
//             style={{
//               fontSize: "0.84rem",
//               fontWeight: 700,
//               color: "var(--gradient-start)",
//             }}
//           >
//             {capacite.toLocaleString()}
//           </span>
//         </div>
//       )}

//       {/* Actions triangle */}
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
//             <Eye size={13} /> Détails
//           </button>
//           <button type="button" onClick={onEdit} style={btnGhost}>
//             <Edit2 size={13} /> Modifier
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
//             <Trash2 size={13} /> Supprimer
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .entrepot-card .neon-corner {
//           position: absolute;
//           width: 28px;
//           height: 28px;
//           opacity: 0;
//           transition: opacity .4s ease, transform .45s;
//           pointer-events: none;
//           z-index: 2;
//         }
//         .entrepot-card:hover .neon-corner { opacity: 1; }
//         .entrepot-card .neon-corner.top-left {
//           top: 0; left: 0;
//           border-top: 2px solid var(--gradient-start);
//           border-left: 2px solid var(--gradient-start);
//           border-top-left-radius: 26px;
//         }
//         .entrepot-card .neon-corner.top-right {
//           top: 0; right: 0;
//           border-top: 2px solid var(--gradient-end);
//           border-right: 2px solid var(--gradient-end);
//           border-top-right-radius: 26px;
//         }
//         .entrepot-card .neon-corner.bottom-left {
//           bottom: 0; left: 0;
//           border-bottom: 2px solid var(--gradient-end);
//           border-left: 2px solid var(--gradient-end);
//           border-bottom-left-radius: 26px;
//         }
//         .entrepot-card .neon-corner.bottom-right {
//           bottom: 0; right: 0;
//           border-bottom: 2px solid var(--gradient-start);
//           border-right: 2px solid var(--gradient-start);
//           border-bottom-right-radius: 26px;
//         }
//         .entrepot-card:hover .top-left { transform: translate(4px, 4px); }
//         .entrepot-card:hover .top-right { transform: translate(-4px, 4px); }
//         .entrepot-card:hover .bottom-left { transform: translate(4px, -4px); }
//         .entrepot-card:hover .bottom-right { transform: translate(-4px, -4px); }
//       `}</style>
//     </div>
//   );
// }

// function EmptyState({ onAdd }) {
//   return (
//     <div
//       style={{
//         borderRadius: 26,
//         background: "var(--card-bg)",
//         border: "1px solid var(--glass-border)",
//         padding: "4rem 2rem",
//         textAlign: "center",
//       }}
//     >
//       <div
//         style={{
//           width: 80,
//           height: 80,
//           borderRadius: 22,
//           background:
//             "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "0 auto 1.5rem",
//           boxShadow: "0 12px 32px var(--glow-color)",
//         }}
//       >
//         <Warehouse size={36} color="#fff" />
//       </div>
//       <h3
//         style={{
//           fontFamily: "Syne, sans-serif",
//           fontSize: "1.15rem",
//           fontWeight: 800,
//           color: "var(--text)",
//           marginBottom: "0.5rem",
//         }}
//       >
//         Aucun entrepôt trouvé
//       </h3>
//       <p
//         style={{
//           color: "var(--text-secondary)",
//           fontSize: "0.9rem",
//           marginBottom: "1.5rem",
//         }}
//       >
//         Commencez par créer un entrepôt.
//       </p>
//       <button type="button" onClick={onAdd} style={btnPrimary}>
//         <Plus size={18} /> Créer un entrepôt
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
//   marginBottom: "0.45rem",
// };

// const btnGhost = {
//   padding: "8px 12px",
//   borderRadius: 999,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--gradient-start)",
//   display: "flex",
//   gap: 6,
//   alignItems: "center",
//   cursor: "pointer",
//   fontSize: "0.78rem",
//   fontWeight: 600,
// };

// const btnPrimary = {
//   display: "inline-flex",
//   alignItems: "center",
//   gap: "0.65rem",
//   padding: "0.95rem 1.4rem",
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

// export default Entrepots;





/**
 * Entrepots — même identité que Categories / Dashboard
 * - tri alphabétique par référence
 * - badge articles : flamme (max) / givre (0)
 * - jauge capacité occupée (vert / orange / rouge) + animation fill + shine au hover
 * - calculerCapaciteOccupee (volume L×W×H × stock_actual)
 */

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Warehouse,
  X,
  Save,
  MapPin,
  Package,
  Layers,
  CheckCircle,
  Eye,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import {
  getEntrepots,
  getStocks,
  getItems,
  createEntrepot,
  updateEntrepot,
  deleteEntrepot,
} from "../api/api";

const emptyForm = () => ({
  reference: "",
  description: "",
  localisation: "",
  capacity: "",
});

/** Volume occupé = Σ (L × W × H × stock_actual) pour l'entrepôt */
function calculerCapaciteOccupee(entrepotId, stocks, items) {
  let capaciteOccupee = 0;
  const stocksEntrepot = (stocks || []).filter(
    (s) => Number(s.entrepot_id) === Number(entrepotId)
  );

  stocksEntrepot.forEach((stock) => {
    const item = (items || []).find(
      (i) => Number(i.id) === Number(stock.item_id)
    );
    if (!item) return;

    const length = Number(item.length);
    const width = Number(item.width);
    const height = Number(item.height);

    if (
      item.length == null ||
      item.length === "" ||
      length === 0 ||
      item.width == null ||
      item.width === "" ||
      width === 0 ||
      item.height == null ||
      item.height === "" ||
      height === 0
    ) {
      return;
    }

    const volumeUnitaire = length * width * height;
    const quantite = Number(stock.stock_actual) || 0;
    capaciteOccupee += volumeUnitaire * quantite;
  });

  return capaciteOccupee;
}

function Entrepots() {
  const navigate = useNavigate();
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [entrepots, setEntrepots] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    charger();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    let list = [...entrepots];

    if (q) {
      list = list.filter(
        (e) =>
          (e.reference || "").toLowerCase().includes(q) ||
          (e.description || "").toLowerCase().includes(q) ||
          (e.localisation || "").toLowerCase().includes(q)
      );
    }

    // Tri alphabétique par référence
    list.sort((a, b) =>
      (a.reference || "").localeCompare(b.reference || "", "fr", {
        sensitivity: "base",
      })
    );

    setFiltered(list);
  }, [search, entrepots]);

  const countArticlesInEntrepot = (entrepotId) => {
    const ids = new Set();
    (stocks || []).forEach((s) => {
      if (Number(s.entrepot_id) === Number(entrepotId) && s.item_id != null) {
        ids.add(Number(s.item_id));
      }
    });
    return ids.size;
  };

  const maxArticleCount = useMemo(() => {
    if (!entrepots.length) return 0;
    return Math.max(0, ...entrepots.map((e) => countArticlesInEntrepot(e.id)));
  }, [entrepots, stocks]);

  const charger = async () => {
    setLoading(true);
    try {
      const [resEnt, resStocks, resItems] = await Promise.all([
        getEntrepots(),
        typeof getStocks === "function"
          ? getStocks().catch(() => ({ data: [] }))
          : Promise.resolve({ data: [] }),
        typeof getItems === "function"
          ? getItems().catch(() => ({ data: [] }))
          : Promise.resolve({ data: [] }),
      ]);

      const data = Array.isArray(resEnt.data)
        ? resEnt.data
        : resEnt.data?.data || [];
      const stockData = Array.isArray(resStocks.data)
        ? resStocks.data
        : resStocks.data?.data || [];
      const itemData = Array.isArray(resItems.data)
        ? resItems.data
        : resItems.data?.data || [];

      data.sort((a, b) =>
        (a.reference || "").localeCompare(b.reference || "", "fr", {
          sensitivity: "base",
        })
      );

      setEntrepots(data);
      setFiltered(data);
      setStocks(stockData);
      setItems(itemData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = (ent) => {
    setEditTarget(ent);
    setForm({
      reference: ent.reference || "",
      description: ent.description || "",
      localisation: ent.localisation || "",
      capacity: ent.capacity ?? "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
    setForm(emptyForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reference.trim()) return;
    setSaving(true);
    try {
      const payload = {
        reference: form.reference.trim(),
        description: (form.description || "").trim(),
        localisation: (form.localisation || "").trim(),
        capacity: form.capacity !== "" ? parseInt(form.capacity, 10) : null,
      };
      if (editTarget) {
        await updateEntrepot(editTarget.id, payload);
      } else {
        await createEntrepot(payload);
      }
      closeForm();
      await charger();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'opération.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet entrepôt ?")) return;
    try {
      await deleteEntrepot(id);
      charger();
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  const totalCapacity = entrepots.reduce((s, e) => s + (e.capacity || 0), 0);
  const actifs = entrepots.filter((e) => !e.deleted || e.deleted === 0).length;
  const localisations = [
    ...new Set(entrepots.map((e) => e.localisation).filter(Boolean)),
  ].length;

  return (
    <div
      className="entrepots-shell"
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
        className="entrepots-page"
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
            <Warehouse size={30} />
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
            <Warehouse size={12} /> Gestion logistique
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
              Gestion des entrepôts
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
              Organisez et suivez tous vos entrepôts, capacités et localisations
              dans StockFlow.
            </p>
          </div>
        </div>

        {/* INFO CARDS */}
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
            value={entrepots.length}
            color="var(--gradient-start)"
            icon={<Warehouse size={18} />}
          />
          <InfoCard
            label="CAPACITÉ"
            value={totalCapacity > 0 ? totalCapacity.toLocaleString() : "—"}
            color="var(--gradient-end)"
            icon={<Layers size={18} />}
          />
          <InfoCard
            label="ACTIFS"
            value={actifs}
            color="#22c55e"
            icon={<CheckCircle size={18} />}
          />
          <InfoCard
            label="LIEUX"
            value={localisations}
            color="#38bdf8"
            icon={<MapPin size={18} />}
          />
        </div>

        {/* TOOLBAR */}
        <div
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
              placeholder="Rechercher un entrepôt..."
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
                  display: "flex",
                  padding: 0,
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
            <Plus size={18} /> Nouvel entrepôt
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
            className="entrepots-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.15rem",
            }}
          >
            {filtered.map((ent) => {
              const occupee = calculerCapaciteOccupee(ent.id, stocks, items);
              const capacite = Number(ent.capacity) || 0;
              return (
                <EntrepotCard
                  key={ent.id}
                  ent={ent}
                  articleCount={countArticlesInEntrepot(ent.id)}
                  maxCount={maxArticleCount}
                  capaciteOccupee={occupee}
                  capaciteMax={capacite}
                  onEdit={() => openEdit(ent)}
                  onDelete={() => handleDelete(ent.id)}
                  onDetails={() => navigate(`/details/entrepot/${ent.id}`)}
                />
              );
            })}
          </div>
        )}

        {showForm && (
          <EntrepotFormModal
            form={form}
            setForm={setForm}
            editTarget={editTarget}
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
@keyframes capacityFill {
  from { width: 0%; }
  to { width: var(--fill-pct); }
}
@keyframes energyShine {
  0% { transform: translateX(-120%); opacity: 0; }
  15% { opacity: 0.85; }
  50% { opacity: 0.55; }
  100% { transform: translateX(220%); opacity: 0; }
}

@media (max-width: 1100px) {
  .info-band {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 768px) {
  .entrepots-page { padding: 0 12px 1.5rem !important; }
  .btn-add { width: 100%; justify-content: center; }
  .search-bar { flex: 1 1 100% !important; }
  .entrepots-grid {
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

function EntrepotFormModal({ form, setForm, editTarget, saving, onClose, onSubmit }) {
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
          }}
        >
          <X size={16} />
        </button>

        <div
          style={{
            width: "100%",
            maxHeight: 200,
            aspectRatio: "1.2",
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--gradient-start) 25%, var(--card-bg)), color-mix(in srgb, var(--gradient-end) 18%, var(--card-bg)))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 36px var(--glow-color)",
            }}
          >
            <Warehouse size={40} color="#fff" />
          </div>
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
            {editTarget ? "Modifier l'entrepôt" : "Nouvel entrepôt"}
          </div>

          <div style={{ marginBottom: "0.9rem" }}>
            <label style={labelStyle}>Référence</label>
            <input
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
              required
              placeholder="Ex: Entrepôt A — Zone Nord"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "0.9rem" }}>
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
          <div style={{ marginBottom: "0.9rem" }}>
            <label style={labelStyle}>Localisation</label>
            <input
              value={form.localisation}
              onChange={(e) =>
                setForm({ ...form, localisation: e.target.value })
              }
              placeholder="Ex: Kinshasa"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>Capacité maximale</label>
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              placeholder="Ex: 500"
              min={1}
              style={inputStyle}
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
              cursor: saving ? "wait" : "pointer",
              opacity: saving ? 0.75 : 1,
              boxShadow: "0 8px 24px var(--glow-color)",
            }}
          >
            <Save size={18} />
            {saving
              ? "Enregistrement..."
              : editTarget
              ? "Enregistrer"
              : "Ajouter l'entrepôt"}
          </button>
        </form>
      </div>
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
        alignItems: "center",
        gap: "0.75rem",
        minHeight: 92,
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 12px 28px rgba(0,0,0,.14), 0 0 22px color-mix(in srgb, ${color} 28%, transparent)`,
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

/** Jauge capacité avec fill animé + shine au hover */
function CapacityBar({ occupee, capaciteMax, hover }) {
  const max = Number(capaciteMax) || 0;
  const occ = Number(occupee) || 0;

  if (max <= 0) {
    return (
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0.55rem 0.9rem",
          borderRadius: 12,
          background:
            "color-mix(in srgb, var(--gradient-start) 8%, transparent)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <Package size={14} color="var(--gradient-start)" />
        <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          Capacité non définie
        </span>
      </div>
    );
  }

  const ratio = Math.min(1, occ / max);
  const pct = Math.round(ratio * 100);

  // Vert < 60% · Orange 60–85% · Rouge > 85%
  let fillColor;
  let trackGlow;
  if (ratio < 0.6) {
    fillColor = "linear-gradient(90deg, #22c55e, #4ade80)";
    trackGlow = "rgba(34,197,94,.35)";
  } else if (ratio < 0.85) {
    fillColor = "linear-gradient(90deg, #f59e0b, #fbbf24)";
    trackGlow = "rgba(245,158,11,.35)";
  } else {
    fillColor = "linear-gradient(90deg, #ef4444, #f87171)";
    trackGlow = "rgba(239,68,68,.4)";
  }

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        padding: "0.65rem 0.9rem",
        borderRadius: 12,
        background:
          "color-mix(in srgb, var(--gradient-start) 6%, transparent)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Package size={14} color="var(--gradient-start)" />
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            Capacité
          </span>
        </div>
        <span
          style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--text)",
            fontFamily: "Syne, sans-serif",
          }}
        >
          {pct}%
          <span
            style={{
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginLeft: 6,
              fontSize: "0.72rem",
            }}
          >
            · {Math.round(occ).toLocaleString()} / {max.toLocaleString()}
          </span>
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          position: "relative",
          height: 10,
          borderRadius: 999,
          background: "rgba(255,255,255,.08)",
          border: "1px solid var(--glass-border)",
          overflow: "hidden",
        }}
      >
        {/* Fill animé */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${pct}%`,
            borderRadius: 999,
            background: fillColor,
            boxShadow: `0 0 12px ${trackGlow}`,
            animation: "capacityFill 1.1s cubic-bezier(.16,1,.3,1) forwards",
            ["--fill-pct"]: `${pct}%`,
            overflow: "hidden",
          }}
        >
          {/* Lueur énergie au hover — gauche → droite */}
          {hover && pct > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "40%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)",
                animation: "energyShine 1.4s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function EntrepotCard({
  ent,
  articleCount,
  maxCount,
  capaciteOccupee,
  capaciteMax,
  onEdit,
  onDelete,
  onDetails,
}) {
  const [hover, setHover] = useState(false);

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
      className="entrepot-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        padding: "1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
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
          background:
            "linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)",
          opacity: hover ? 0.9 : 0.5,
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
          background:
            "radial-gradient(circle, var(--gradient-start), transparent 70%)",
          opacity: hover ? 0.22 : 0.07,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

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
            flexShrink: 0,
            background: hover
              ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
              : "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: hover ? "#fff" : "var(--gradient-start)",
            boxShadow: hover
              ? "0 15px 40px var(--glow-color)"
              : "0 8px 20px rgba(0,0,0,.08)",
            transform: hover ? "rotate(-8deg) scale(1.06)" : "none",
            transition: "all .45s",
          }}
        >
          <Warehouse size={26} />
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
            {ent.reference}
          </div>
          {ent.localisation && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 5,
                fontSize: 12,
                color: "var(--text-secondary)",
              }}
            >
              <MapPin size={11} /> {ent.localisation}
            </div>
          )}
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              color: "var(--text-secondary)",
            }}
          >
            ENTREPÔT #{ent.id}
          </div>
        </div>

        {/* Badge flamme / givre */}
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

      {ent.description && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "10px 12px",
            borderRadius: 14,
            background: "var(--glass-bg)",
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
          {ent.description}
        </div>
      )}

      {/* Jauge capacité */}
      <CapacityBar
        occupee={capaciteOccupee}
        capaciteMax={capaciteMax}
        hover={hover}
      />

      {/* Actions */}
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
            <Eye size={13} /> Détails
          </button>
          <button type="button" onClick={onEdit} style={btnGhost}>
            <Edit2 size={13} /> Modifier
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
            <Trash2 size={13} /> Supprimer
          </button>
        </div>
      </div>

      <style>{`
.entrepot-card .neon-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  opacity: 0;
  transition: opacity .4s ease, transform .45s;
  pointer-events: none;
  z-index: 2;
}
.entrepot-card:hover .neon-corner { opacity: 1; }
.entrepot-card .neon-corner.top-left {
  top: 0; left: 0;
  border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start);
  border-top-left-radius: 26px;
}
.entrepot-card .neon-corner.top-right {
  top: 0; right: 0;
  border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end);
  border-top-right-radius: 26px;
}
.entrepot-card .neon-corner.bottom-left {
  bottom: 0; left: 0;
  border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end);
  border-bottom-left-radius: 26px;
}
.entrepot-card .neon-corner.bottom-right {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start);
  border-bottom-right-radius: 26px;
}
.entrepot-card:hover .top-left { transform: translate(4px, 4px); }
.entrepot-card:hover .top-right { transform: translate(-4px, 4px); }
.entrepot-card:hover .bottom-left { transform: translate(4px, -4px); }
.entrepot-card:hover .bottom-right { transform: translate(-4px, -4px); }
`}</style>
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div
      style={{
        borderRadius: 26,
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background:
            "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
          boxShadow: "0 12px 32px var(--glow-color)",
        }}
      >
        <Warehouse size={36} color="#fff" />
      </div>
      <h3
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "1.15rem",
          fontWeight: 800,
          color: "var(--text)",
          marginBottom: "0.5rem",
        }}
      >
        Aucun entrepôt trouvé
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          marginBottom: "1.5rem",
        }}
      >
        Commencez par créer un entrepôt.
      </p>
      <button type="button" onClick={onAdd} style={btnPrimary}>
        <Plus size={18} /> Créer un entrepôt
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
  marginBottom: "0.45rem",
};

const btnGhost = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--gradient-start)",
  display: "flex",
  gap: 6,
  alignItems: "center",
  cursor: "pointer",
  fontSize: "0.78rem",
  fontWeight: 600,
};

const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.65rem",
  padding: "0.95rem 1.4rem",
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

export default Entrepots;

export { calculerCapaciteOccupee };
