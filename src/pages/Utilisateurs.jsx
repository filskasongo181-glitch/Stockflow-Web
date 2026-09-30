// /**
//  * Users — style unifié (ThemeBackground, cartes, hover)
//  * Rôles : Admin / Gestionnaire / Opérateur (conservés)
//  * Sécurité : mot de passe modifiable uniquement pour son propre compte
//  */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Users,
//   X,
//   Save,
//   Mail,
//   Shield,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   Crown,
//   UserCheck,
//   UserCog,
//   ExternalLink,
// } from "lucide-react";
// import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
// import Footer from "../components/Footer";
// import { getUsers, createUser, updateUser, deleteUser } from "../api/api";

// const ROLES = [
//   {
//     value: "Admin",
//     label: "Administrateur",
//     icon: <Crown size={14} />,
//     color: "#fbbf24",
//   },
//   {
//     value: "Gestionnaire",
//     label: "Gestionnaire",
//     icon: <UserCog size={14} />,
//     color: "#60a5fa",
//   },
//   {
//     value: "Opérateur",
//     label: "Opérateur",
//     icon: <UserCheck size={14} />,
//     color: "#4ade80",
//   },
// ];

// const GENRES = [
//   { value: "M", label: "Masculin" },
//   { value: "F", label: "Féminin" },
//   { value: "Autre", label: "Autre" },
// ];

// function UsersPage() {
//   const navigate = useNavigate();
//   const currentTheme =
//     (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
//     "dark-galaxy";

//   const [users, setUsers] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterRole, setFilterRole] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showPanel, setShowPanel] = useState(false);
//   const [editTarget, setEditTarget] = useState(null);
//   const [showPw, setShowPw] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     first_name: "",
//     middle_name: "",
//     genre: "",
//     email: "",
//     role: "Opérateur",
//     password: "",
//   });

//   const currentUser = JSON.parse(
//     (typeof sessionStorage !== "undefined" &&
//       sessionStorage.getItem("user")) ||
//       "{}"
//   );

//   /** Mot de passe : seulement création OU modification de SON propre compte */
//   const canEditPassword =
//     !editTarget || Number(editTarget.id) === Number(currentUser.id);

//   useEffect(() => {
//     charger();
//   }, []);

//   useEffect(() => {
//     let result = [...users];
//     const q = search.toLowerCase();
//     if (q) {
//       result = result.filter(
//         (u) =>
//           (u.name || "").toLowerCase().includes(q) ||
//           (u.first_name || "").toLowerCase().includes(q) ||
//           (u.email || "").toLowerCase().includes(q)
//       );
//     }
//     if (filterRole) {
//       result = result.filter((u) => u.role === filterRole);
//     }
//     setFiltered(result);
//   }, [search, filterRole, users]);

//   const charger = async () => {
//     setLoading(true);
//     try {
//       const res = await getUsers();
//       setUsers(res.data || []);
//       setFiltered(res.data || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAdd = () => {
//     setEditTarget(null);
//     setForm({
//       name: "",
//       first_name: "",
//       middle_name: "",
//       genre: "",
//       email: "",
//       role: "Opérateur",
//       password: "",
//     });
//     setShowPw(false);
//     setShowPanel(true);
//   };

//   const openEdit = (user) => {
//     setEditTarget(user);
//     setForm({
//       name: user.name || "",
//       first_name: user.first_name || "",
//       middle_name: user.middle_name || "",
//       genre: user.genre || "",
//       email: user.email || "",
//       role: user.role || "Opérateur",
//       password: "",
//     });
//     setShowPw(false);
//     setShowPanel(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         name: form.name,
//         first_name: form.first_name,
//         middle_name: form.middle_name || form.name,
//         genre: form.genre || "M",
//         email: form.email,
//         role: form.role,
//       };

//       // Sécurité : password uniquement à la création ou pour soi-même
//       if (!editTarget) {
//         if (!form.password) {
//           alert("Le mot de passe est obligatoire pour un nouvel utilisateur.");
//           return;
//         }
//         payload.password = form.password;
//       } else if (
//         canEditPassword &&
//         form.password &&
//         form.password.trim()
//       ) {
//         payload.password = form.password;
//       }

//       if (editTarget) {
//         await updateUser(editTarget.id, payload);
//       } else {
//         await createUser(payload);
//       }
//       setShowPanel(false);
//       charger();
//     } catch (e) {
//       alert("Erreur lors de l'opération.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (Number(id) === Number(currentUser.id)) {
//       alert("Vous ne pouvez pas supprimer votre propre compte.");
//       return;
//     }
//     if (!window.confirm("Supprimer cet utilisateur ?")) return;
//     try {
//       await deleteUser(id);
//       charger();
//     } catch (e) {
//       alert("Erreur lors de la suppression.");
//     }
//   };

//   const getRoleConfig = (role) =>
//     ROLES.find((r) => r.value === role) || ROLES[2];

//   const admins = users.filter((u) => u.role === "Admin").length;
//   const gestionnaires = users.filter((u) => u.role === "Gestionnaire").length;
//   const operateurs = users.filter((u) => u.role === "Opérateur").length;

//   return (
//     <div
//       className="users-shell"
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
//         className="users-page"
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
//             <Users size={30} />
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
//             <Shield size={12} /> Accès & permissions
//           </div>
//           <div>
//             <h1
//               style={{
//                 fontFamily: "Syne, sans-serif",
//                 fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)",
//                 fontWeight: 900,
//                 margin: 0,
//                 background:
//                   "linear-gradient(135deg, var(--text), var(--gradient-start))",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               Gestion des utilisateurs
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
//               Créez et gérez les comptes, rôles et accès de votre équipe
//               StockFlow.
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
//             value={users.length}
//             color="var(--gradient-start)"
//             icon={<Users size={18} />}
//           />
//           <InfoCard
//             label="ADMINS"
//             value={admins}
//             color="#fbbf24"
//             icon={<Crown size={18} />}
//           />
//           <InfoCard
//             label="GESTIONNAIRES"
//             value={gestionnaires}
//             color="#60a5fa"
//             icon={<UserCog size={18} />}
//           />
//           <InfoCard
//             label="OPÉRATEURS"
//             value={operateurs}
//             color="#4ade80"
//             icon={<UserCheck size={18} />}
//           />
//         </div>

//         {/* TOOLBAR */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "0.8rem",
//             flexWrap: "wrap",
//             marginBottom: "1.5rem",
//           }}
//         >
//           <div
//             className="search-bar"
//             style={{
//               flex: "1 1 240px",
//               display: "flex",
//               alignItems: "center",
//               gap: "0.8rem",
//               padding: "0.85rem 1.1rem",
//               borderRadius: 18,
//               background: "var(--card-bg)",
//               border: "1px solid var(--glass-border)",
//               boxShadow: "0 6px 24px rgba(0,0,0,.08)",
//               minWidth: 0,
//               maxWidth: 380,
//             }}
//           >
//             <Search size={18} color="var(--gradient-start)" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Rechercher un utilisateur..."
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
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//             style={{
//               padding: "0.85rem 1rem",
//               borderRadius: 16,
//               background: "var(--card-bg)",
//               border: "1px solid var(--glass-border)",
//               color: "var(--text)",
//               fontSize: "0.88rem",
//               cursor: "pointer",
//               outline: "none",
//             }}
//           >
//             <option value="">Tous les rôles</option>
//             {ROLES.map((r) => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>
//           <button type="button" onClick={openAdd} className="btn-add" style={btnPrimary}>
//             <Plus size={18} /> Nouvel utilisateur
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
//             className="users-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//               gap: "1.15rem",
//             }}
//           >
//             {filtered.map((user) => (
//               <UserCard
//                 key={user.id}
//                 user={user}
//                 roleConfig={getRoleConfig(user.role)}
//                 isSelf={Number(user.id) === Number(currentUser.id)}
//                 onEdit={() => openEdit(user)}
//                 onDelete={() => handleDelete(user.id)}
//                 onDetails={() => navigate(`/details/utilisateur/${user.id}`)}
//               />
//             ))}
//           </div>
//         )}

//         {showPanel && (
//           <UserFormModal
//             form={form}
//             setForm={setForm}
//             editTarget={editTarget}
//             showPw={showPw}
//             setShowPw={setShowPw}
//             canEditPassword={canEditPassword}
//             onClose={() => setShowPanel(false)}
//             onSubmit={handleSubmit}
//             getRoleColor={getRoleColor}
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
//             .users-page { padding: 0 12px 1.5rem !important; }
//             .btn-add { width: 100%; justify-content: center; }
//             .search-bar { flex: 1 1 100% !important; max-width: none !important; }
//             .users-grid { grid-template-columns: 1fr !important; }
//           }
//           @media (max-width: 400px) {
//             .info-band { grid-template-columns: 1fr !important; }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// function UserFormModal({
//   form,
//   setForm,
//   editTarget,
//   showPw,
//   setShowPw,
//   canEditPassword,
//   onClose,
//   onSubmit,
//   getRoleColor,
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
//           maxWidth: 480,
//           maxHeight: "92vh",
//           borderRadius: 28,
//           background: "var(--card-bg)",
//           border: "1px solid var(--glass-border)",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           position: "relative",
//           boxShadow: "0 30px 80px rgba(0,0,0,.4)",
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
//             padding: "1.15rem 1.4rem 0.5rem",
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 800,
//             fontSize: "1.15rem",
//             color: "var(--text)",
//           }}
//         >
//           {editTarget ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
//         </div>

//         <form
//           onSubmit={onSubmit}
//           style={{
//             overflowY: "auto",
//             padding: "0.5rem 1.4rem 1.4rem",
//             flex: 1,
//           }}
//         >
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "0.8rem",
//               marginBottom: "1rem",
//             }}
//           >
//             <div>
//               <label style={labelStyle}>Nom *</label>
//               <input
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 placeholder="Ex: Kasongo"
//                 style={inputStyle}
//               />
//             </div>
//             <div>
//               <label style={labelStyle}>Prénom *</label>
//               <input
//                 value={form.first_name}
//                 onChange={(e) =>
//                   setForm({ ...form, first_name: e.target.value })
//                 }
//                 required
//                 placeholder="Ex: Fils"
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "0.8rem",
//               marginBottom: "1rem",
//             }}
//           >
//             <div>
//               <label style={labelStyle}>Post-nom</label>
//               <input
//                 value={form.middle_name}
//                 onChange={(e) =>
//                   setForm({ ...form, middle_name: e.target.value })
//                 }
//                 placeholder="Ex: Azarias"
//                 style={inputStyle}
//               />
//             </div>
//             <div>
//               <label style={labelStyle}>Genre</label>
//               <select
//                 value={form.genre}
//                 onChange={(e) => setForm({ ...form, genre: e.target.value })}
//                 style={{ ...inputStyle, cursor: "pointer" }}
//               >
//                 <option value="">Choisir...</option>
//                 {GENRES.map((g) => (
//                   <option key={g.value} value={g.value}>
//                     {g.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div style={{ marginBottom: "1rem" }}>
//             <label style={labelStyle}>
//               <Mail size={11} style={{ display: "inline" }} /> Email *
//             </label>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               placeholder="Ex: fils@stockflow.com"
//               style={inputStyle}
//             />
//           </div>

//           <div style={{ marginBottom: "1rem" }}>
//             <label style={labelStyle}>
//               <Shield size={11} style={{ display: "inline" }} /> Rôle *
//             </label>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
//             >
//               {ROLES.map((r) => (
//                 <button
//                   key={r.value}
//                   type="button"
//                   onClick={() => setForm({ ...form, role: r.value })}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     padding: "0.7rem 0.9rem",
//                     borderRadius: 10,
//                     cursor: "pointer",
//                     border: `2px solid ${
//                       form.role === r.value ? r.color : "var(--glass-border)"
//                     }`,
//                     background:
//                       form.role === r.value
//                         ? `${r.color}18`
//                         : "var(--glass-bg)",
//                     color:
//                       form.role === r.value ? r.color : "var(--text-secondary)",
//                     fontWeight: form.role === r.value ? 700 : 400,
//                     fontSize: "0.88rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                     }}
//                   >
//                     {r.icon} {r.label}
//                   </div>
//                   {form.role === r.value && <CheckCircle size={15} />}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Mot de passe — création ou soi uniquement */}
//           {canEditPassword ? (
//             <div style={{ marginBottom: "1.25rem" }}>
//               <label style={labelStyle}>
//                 {editTarget
//                   ? "Nouveau mot de passe (laisser vide pour ne pas changer)"
//                   : "Mot de passe *"}
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   type={showPw ? "text" : "password"}
//                   value={form.password}
//                   onChange={(e) =>
//                     setForm({ ...form, password: e.target.value })
//                   }
//                   required={!editTarget}
//                   placeholder="••••••••"
//                   style={{ ...inputStyle, paddingRight: "2.8rem" }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPw(!showPw)}
//                   style={{
//                     position: "absolute",
//                     right: 12,
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "var(--text-secondary)",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div
//               style={{
//                 marginBottom: "1.25rem",
//                 padding: "0.85rem 1rem",
//                 borderRadius: 12,
//                 background: "rgba(251,191,36,.1)",
//                 border: "1px solid rgba(251,191,36,.35)",
//                 fontSize: "0.82rem",
//                 color: "var(--text-secondary)",
//                 lineHeight: 1.45,
//               }}
//             >
//               <strong style={{ color: "#fbbf24" }}>Sécurité</strong>
//               <br />
//               Vous ne pouvez pas modifier le mot de passe d&apos;un autre
//               utilisateur. Seul le titulaire du compte peut le changer.
//             </div>
//           )}

//           <div
//             style={{
//               padding: "1rem",
//               borderRadius: 12,
//               background: "var(--glass-bg)",
//               border: "1px solid var(--glass-border)",
//               marginBottom: "1.25rem",
//             }}
//           >
//             <div
//               style={{
//                 fontSize: "0.72rem",
//                 color: "var(--text-secondary)",
//                 marginBottom: "0.6rem",
//                 fontWeight: 600,
//                 textTransform: "uppercase",
//               }}
//             >
//               Aperçu
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
//               <Avatar
//                 name={form.name}
//                 firstName={form.first_name}
//                 size={46}
//               />
//               <div>
//                 <div
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "0.95rem",
//                     color: "var(--text)",
//                   }}
//                 >
//                   {form.first_name || "Prénom"} {form.name || "Nom"}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "0.78rem",
//                     color: "var(--text-secondary)",
//                   }}
//                 >
//                   {form.email || "email@exemple.com"}
//                 </div>
//                 {form.role && (
//                   <div
//                     style={{
//                       fontSize: "0.72rem",
//                       fontWeight: 700,
//                       color: getRoleColor(form.role),
//                       marginTop: "0.2rem",
//                     }}
//                   >
//                     {form.role}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button type="submit" style={{ ...btnPrimary, width: "100%", justifyContent: "center" }}>
//             <Save size={18} />
//             {editTarget ? "Enregistrer les modifications" : "Créer l'utilisateur"}
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
//           }}
//         >
//           {value}
//         </div>
//       </div>
//     </div>
//   );
// }

// function UserCard({ user, roleConfig, isSelf, onEdit, onDelete, onDetails }) {
//   const [hover, setHover] = useState(false);

//   return (
//     <div
//       className="user-card"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: 26,
//         padding: "1.4rem",
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//         background: `
//           linear-gradient(
//             145deg,
//             rgba(255,255,255,.08),
//             rgba(255,255,255,.02)
//           ),
//           var(--card-bg)
//         `,
//         backdropFilter: "blur(35px)",
//         border: isSelf
//           ? "1px solid color-mix(in srgb, var(--gradient-start) 50%, var(--glass-border))"
//           : hover
//             ? "1px solid rgba(255,255,255,.25)"
//             : "1px solid var(--glass-border)",
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
//           width: 200,
//           height: 200,
//           top: -100,
//           right: -100,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, ${roleConfig.color}, transparent 70%)`,
//           opacity: hover ? 0.18 : 0.06,
//           filter: "blur(20px)",
//           pointerEvents: "none",
//         }}
//       />

//       {isSelf && (
//         <div
//           style={{
//             position: "absolute",
//             top: 14,
//             right: 14,
//             padding: "0.25rem 0.65rem",
//             borderRadius: 999,
//             background:
//               "color-mix(in srgb, var(--gradient-start) 15%, transparent)",
//             border: "1px solid var(--gradient-start)",
//             color: "var(--gradient-start)",
//             fontSize: "0.65rem",
//             fontWeight: 800,
//             letterSpacing: "0.06em",
//             zIndex: 2,
//           }}
//         >
//           VOUS
//         </div>
//       )}

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "1rem",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <Avatar name={user.name} firstName={user.first_name} size={56} />
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
//             {user.first_name} {user.name}
//           </div>
//           {user.email && (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.3rem",
//                 fontSize: "0.78rem",
//                 color: "var(--text-secondary)",
//                 marginTop: 4,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               <Mail size={11} /> {user.email}
//             </div>
//           )}
//         </div>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "0.5rem",
//           padding: "0.55rem 0.85rem",
//           borderRadius: 12,
//           background: `${roleConfig.color}15`,
//           border: `1px solid ${roleConfig.color}33`,
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <span style={{ color: roleConfig.color }}>{roleConfig.icon}</span>
//         <span
//           style={{
//             fontSize: "0.82rem",
//             fontWeight: 700,
//             color: roleConfig.color,
//           }}
//         >
//           {roleConfig.label}
//         </span>
//       </div>

//       {(user.genre || user.middle_name) && (
//         <div
//           style={{
//             display: "flex",
//             gap: "0.45rem",
//             flexWrap: "wrap",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           {user.genre && (
//             <span
//               style={{
//                 padding: "0.25rem 0.65rem",
//                 borderRadius: 999,
//                 background: "var(--glass-bg)",
//                 border: "1px solid var(--glass-border)",
//                 fontSize: "0.72rem",
//                 color: "var(--text-secondary)",
//               }}
//             >
//               {user.genre === "M"
//                 ? "Masculin"
//                 : user.genre === "F"
//                   ? "Féminin"
//                   : user.genre}
//             </span>
//           )}
//           {user.middle_name && (
//             <span
//               style={{
//                 padding: "0.25rem 0.65rem",
//                 borderRadius: 999,
//                 background: "var(--glass-bg)",
//                 border: "1px solid var(--glass-border)",
//                 fontSize: "0.72rem",
//                 color: "var(--text-secondary)",
//               }}
//             >
//               {user.middle_name}
//             </span>
//           )}
//         </div>
//       )}

//       {/* Actions triangle */}
//       <div
//         style={{
//           paddingTop: "0.9rem",
//           borderTop: "1px solid var(--glass-border)",
//           display: "flex",
//           flexDirection: "column",
//           gap: "0.5rem",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 6,
//           }}
//         >
//           <button type="button" onClick={onDetails} style={btnGhost}>
//             <ExternalLink size={12} /> Détails
//           </button>
//           <button type="button" onClick={onEdit} style={btnGhost}>
//             <Edit2 size={12} /> Modifier
//           </button>
//         </div>
//         {!isSelf && (
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
//         )}
//       </div>

//       <style>{`
//         .user-card .neon-corner {
//           position: absolute;
//           width: 28px;
//           height: 28px;
//           opacity: 0;
//           transition: opacity .4s ease, transform .45s;
//           pointer-events: none;
//           z-index: 2;
//         }
//         .user-card:hover .neon-corner { opacity: 1; }
//         .user-card .neon-corner.top-left {
//           top: 0; left: 0;
//           border-top: 2px solid var(--gradient-start);
//           border-left: 2px solid var(--gradient-start);
//           border-top-left-radius: 26px;
//         }
//         .user-card .neon-corner.top-right {
//           top: 0; right: 0;
//           border-top: 2px solid var(--gradient-end);
//           border-right: 2px solid var(--gradient-end);
//           border-top-right-radius: 26px;
//         }
//         .user-card .neon-corner.bottom-left {
//           bottom: 0; left: 0;
//           border-bottom: 2px solid var(--gradient-end);
//           border-left: 2px solid var(--gradient-end);
//           border-bottom-left-radius: 26px;
//         }
//         .user-card .neon-corner.bottom-right {
//           bottom: 0; right: 0;
//           border-bottom: 2px solid var(--gradient-start);
//           border-right: 2px solid var(--gradient-start);
//           border-bottom-right-radius: 26px;
//         }
//         .user-card:hover .top-left { transform: translate(4px, 4px); }
//         .user-card:hover .top-right { transform: translate(-4px, 4px); }
//         .user-card:hover .bottom-left { transform: translate(4px, -4px); }
//         .user-card:hover .bottom-right { transform: translate(-4px, -4px); }
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
//         <Users size={36} color="#fff" />
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
//         Aucun utilisateur trouvé
//       </h3>
//       <p
//         style={{
//           color: "var(--text-secondary)",
//           fontSize: "0.9rem",
//           marginBottom: "1.5rem",
//         }}
//       >
//         Créez le premier utilisateur pour gérer les accès.
//       </p>
//       <button type="button" onClick={onAdd} style={btnPrimary}>
//         <Plus size={18} /> Créer un utilisateur
//       </button>
//     </div>
//   );
// }

// function Avatar({ name, firstName, size = 40 }) {
//   const initials =
//     `${firstName?.[0] || ""}${name?.[0] || ""}`.toUpperCase() || "?";
//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         flexShrink: 0,
//         background:
//           "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: size * 0.32,
//         fontWeight: 800,
//         color: "#fff",
//         fontFamily: "Syne, sans-serif",
//         boxShadow: "0 4px 12px var(--glow-color)",
//         border: "1.5px solid rgba(255,255,255,0.28)",
//       }}
//     >
//       {initials}
//     </div>
//   );
// }

// function getRoleColor(role) {
//   return ROLES.find((r) => r.value === role)?.color || "var(--text-secondary)";
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

// const btnPrimary = {
//   display: "inline-flex",
//   alignItems: "center",
//   gap: "0.65rem",
//   padding: "0.9rem 1.35rem",
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

// const btnGhost = {
//   display: "flex",
//   alignItems: "center",
//   gap: 5,
//   padding: "7px 12px",
//   borderRadius: 999,
//   border: "1px solid var(--glass-border)",
//   background: "var(--glass-bg)",
//   color: "var(--gradient-start)",
//   cursor: "pointer",
//   fontSize: "0.75rem",
//   fontWeight: 600,
// };

// export default UsersPage;





/**
 * Users — style unifié (ThemeBackground, cartes, hover)
 * Rôles : Admin / Gestionnaire / Opérateur
 * Sécurité :
 *  - Mot de passe : uniquement création ou son propre compte
 *  - Modifier :
 *      • Admin principal (1er Admin) : peut modifier TOUS les autres (modal)
 *        et pour LUI-MÊME → page Paramètres
 *      • Autres utilisateurs : uniquement leur carte → page Paramètres
 *        (pas de bouton Modifier sur les autres cartes)
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  X,
  Save,
  Mail,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Crown,
  UserCheck,
  UserCog,
  ExternalLink,
} from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";
import Footer from "../components/Footer";
import { getUsers, createUser, updateUser, deleteUser } from "../api/api";

const ROLES = [
  {
    value: "Admin",
    label: "Administrateur",
    icon: <Crown size={14} />,
    color: "#fbbf24",
  },
  {
    value: "Gestionnaire",
    label: "Gestionnaire",
    icon: <UserCog size={14} />,
    color: "#60a5fa",
  },
  {
    value: "Opérateur",
    label: "Opérateur",
    icon: <UserCheck size={14} />,
    color: "#4ade80",
  },
];

const GENRES = [
  { value: "M", label: "Masculin" },
  { value: "F", label: "Féminin" },
  { value: "Autre", label: "Autre" },
];

function getRoleColor(role) {
  return ROLES.find((r) => r.value === role)?.color || "var(--text-secondary)";
}

function UsersPage() {
  const navigate = useNavigate();
  const currentTheme =
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    name: "",
    first_name: "",
    middle_name: "",
    genre: "",
    email: "",
    role: "Opérateur",
    password: "",
  });

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(
        (typeof sessionStorage !== "undefined" &&
          sessionStorage.getItem("user")) ||
          "{}"
      );
    } catch {
      return {};
    }
  }, []);

  /** Premier Admin créé = administrateur StockFlow principal */
  const mainAdminId = useMemo(() => {
    const admins = (users || [])
      .filter((u) => u.role === "Admin")
      .sort((a, b) => Number(a.id) - Number(b.id));
    return admins[0]?.id ?? null;
  }, [users]);

  const isMainAdmin =
    mainAdminId != null && Number(currentUser?.id) === Number(mainAdminId);

  /** Mot de passe : création OU modification de SON propre compte */
  const canEditPassword =
    !editTarget || Number(editTarget.id) === Number(currentUser?.id);

  useEffect(() => {
    charger();
  }, []);

  useEffect(() => {
    let result = [...users];
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.first_name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q) ||
          (u.middle_name || "").toLowerCase().includes(q)
      );
    }
    if (filterRole) {
      result = result.filter((u) => u.role === filterRole);
    }
    // Tri alphabétique prénom + nom
    result.sort((a, b) => {
      const na = `${a.first_name || ""} ${a.name || ""}`.trim();
      const nb = `${b.first_name || ""} ${b.name || ""}`.trim();
      return na.localeCompare(nb, "fr", { sensitivity: "base" });
    });
    setFiltered(result);
  }, [search, filterRole, users]);

  const charger = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data || []);
      setFiltered(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setForm({
      name: "",
      first_name: "",
      middle_name: "",
      genre: "",
      email: "",
      role: "Opérateur",
      password: "",
    });
    setShowPw(false);
    setShowPanel(true);
  };

  const openEdit = (user) => {
    setEditTarget(user);
    setForm({
      name: user.name || "",
      first_name: user.first_name || "",
      middle_name: user.middle_name || "",
      genre: user.genre || "",
      email: user.email || "",
      role: user.role || "Opérateur",
      password: "",
    });
    setShowPw(false);
    setShowPanel(true);
  };

  /**
   * Clic Modifier :
   * - soi-même → page Paramètres
   * - autre + admin principal → modal d'édition
   */
  const handleModifyClick = (user) => {
    const isSelf = Number(user.id) === Number(currentUser?.id);
    if (isSelf) {
      navigate("/parametres");
      return;
    }
    if (isMainAdmin) {
      openEdit(user);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        first_name: form.first_name,
        middle_name: form.middle_name || form.name,
        genre: form.genre || "M",
        email: form.email,
        role: form.role,
      };

      if (!editTarget) {
        if (!form.password) {
          alert("Le mot de passe est obligatoire pour un nouvel utilisateur.");
          return;
        }
        payload.password = form.password;
      } else if (canEditPassword && form.password && form.password.trim()) {
        payload.password = form.password;
      }

      // Sécurité serveur côté client : non-admin ne peut pas éditer un autre
      if (editTarget && !isMainAdmin) {
        alert("Vous n'avez pas le droit de modifier cet utilisateur.");
        return;
      }

      if (editTarget) {
        await updateUser(editTarget.id, payload);
      } else {
        await createUser(payload);
      }
      setShowPanel(false);
      charger();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'opération.");
    }
  };

  const handleDelete = async (id) => {
    if (Number(id) === Number(currentUser?.id)) {
      alert("Vous ne pouvez pas supprimer votre propre compte.");
      return;
    }
    if (!isMainAdmin) {
      alert("Seul l'administrateur principal peut supprimer un compte.");
      return;
    }
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      charger();
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  const getRoleConfig = (role) =>
    ROLES.find((r) => r.value === role) || ROLES[2];

  const admins = users.filter((u) => u.role === "Admin").length;
  const gestionnaires = users.filter((u) => u.role === "Gestionnaire").length;
  const operateurs = users.filter((u) => u.role === "Opérateur").length;

  return (
    <div
      className="users-shell"
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
        className="users-page"
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
            <Users size={30} />
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
            <Shield size={12} /> Accès & permissions
          </div>
          <div>
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
              Gestion des utilisateurs
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
              Créez et gérez les comptes, rôles et accès de votre équipe
              StockFlow.
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
            value={users.length}
            color="var(--gradient-start)"
            icon={<Users size={18} />}
          />
          <InfoCard
            label="ADMINS"
            value={admins}
            color="#fbbf24"
            icon={<Crown size={18} />}
          />
          <InfoCard
            label="GESTIONNAIRES"
            value={gestionnaires}
            color="#60a5fa"
            icon={<UserCog size={18} />}
          />
          <InfoCard
            label="OPÉRATEURS"
            value={operateurs}
            color="#4ade80"
            icon={<UserCheck size={18} />}
          />
        </div>

        {/* TOOLBAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.8rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          <div
            className="search-bar"
            style={{
              flex: "1 1 240px",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.85rem 1.1rem",
              borderRadius: 18,
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              boxShadow: "0 6px 24px rgba(0,0,0,.08)",
              minWidth: 0,
              maxWidth: 380,
            }}
          >
            <Search size={18} color="var(--gradient-start)" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un utilisateur..."
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

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: "0.85rem 1rem",
              borderRadius: 16,
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text)",
              fontSize: "0.88rem",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="">Tous les rôles</option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          {/* Création : admin principal (ou tout Admin si aucun encore) */}
          {(isMainAdmin || currentUser?.role === "Admin") && (
            <button
              type="button"
              onClick={openAdd}
              className="btn-add"
              style={btnPrimary}
            >
              <Plus size={18} /> Nouvel utilisateur
            </button>
          )}
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
          <EmptyState
            onAdd={
              isMainAdmin || currentUser?.role === "Admin" ? openAdd : null
            }
          />
        ) : (
          <div
            className="users-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.15rem",
            }}
          >
            {filtered.map((user) => {
              const isSelf = Number(user.id) === Number(currentUser?.id);
              // Admin principal : modifier tout le monde
              // Autres : uniquement soi (→ paramètres)
              const showModify = isMainAdmin || isSelf;
              // Suppression : uniquement admin principal, jamais soi
              const showDelete = isMainAdmin && !isSelf;

              return (
                <UserCard
                  key={user.id}
                  user={user}
                  roleConfig={getRoleConfig(user.role)}
                  isSelf={isSelf}
                  showModify={showModify}
                  showDelete={showDelete}
                  onEdit={() => handleModifyClick(user)}
                  onDelete={() => handleDelete(user.id)}
                  onDetails={() =>
                    navigate(`/details/utilisateur/${user.id}`)
                  }
                />
              );
            })}
          </div>
        )}

        {showPanel && (
          <UserFormModal
            form={form}
            setForm={setForm}
            editTarget={editTarget}
            showPw={showPw}
            setShowPw={setShowPw}
            canEditPassword={canEditPassword}
            onClose={() => setShowPanel(false)}
            onSubmit={handleSubmit}
            getRoleColor={getRoleColor}
          />
        )}

        <Footer />

        <style>{`
@media (max-width: 900px) {
  .info-band {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 768px) {
  .users-page { padding: 0 12px 1.5rem !important; }
  .btn-add { width: 100%; justify-content: center; }
  .search-bar { flex: 1 1 100% !important; max-width: none !important; }
  .users-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 400px) {
  .info-band { grid-template-columns: 1fr !important; }
}
`}</style>
      </div>
    </div>
  );
}

function UserFormModal({
  form,
  setForm,
  editTarget,
  showPw,
  setShowPw,
  canEditPassword,
  onClose,
  onSubmit,
  getRoleColor,
}) {
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
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 30px 80px rgba(0,0,0,.4)",
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
            padding: "1.15rem 1.4rem 0.5rem",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "var(--text)",
          }}
        >
          {editTarget ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            overflowY: "auto",
            padding: "0.5rem 1.4rem 1.4rem",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Nom *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Ex: Kasongo"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Prénom *</label>
              <input
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                required
                placeholder="Ex: Fils"
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Post-nom</label>
              <input
                value={form.middle_name}
                onChange={(e) =>
                  setForm({ ...form, middle_name: e.target.value })
                }
                placeholder="Ex: Azarias"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Genre</label>
              <select
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Choisir...</option>
                {GENRES.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>
              <Mail size={11} style={{ display: "inline" }} /> Email *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="Ex: fils@stockflow.com"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>
              <Shield size={11} style={{ display: "inline" }} /> Rôle *
            </label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.value })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.7rem 0.9rem",
                    borderRadius: 10,
                    cursor: "pointer",
                    border: `2px solid ${
                      form.role === r.value ? r.color : "var(--glass-border)"
                    }`,
                    background:
                      form.role === r.value
                        ? `${r.color}18`
                        : "var(--glass-bg)",
                    color:
                      form.role === r.value ? r.color : "var(--text-secondary)",
                    fontWeight: form.role === r.value ? 700 : 400,
                    fontSize: "0.88rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {r.icon} {r.label}
                  </div>
                  {form.role === r.value && <CheckCircle size={15} />}
                </button>
              ))}
            </div>
          </div>

          {canEditPassword ? (
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>
                {editTarget
                  ? "Nouveau mot de passe (laisser vide pour ne pas changer)"
                  : "Mot de passe *"}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required={!editTarget}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "2.8rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                marginBottom: "1.25rem",
                padding: "0.85rem 1rem",
                borderRadius: 12,
                background: "rgba(251,191,36,.1)",
                border: "1px solid rgba(251,191,36,.35)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                lineHeight: 1.45,
              }}
            >
              <strong style={{ color: "#fbbf24" }}>Sécurité</strong>
              <br />
              Vous ne pouvez pas modifier le mot de passe d&apos;un autre
              utilisateur. Seul le titulaire du compte peut le changer.
            </div>
          )}

          <div
            style={{
              padding: "1rem",
              borderRadius: 12,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                marginBottom: "0.6rem",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Aperçu
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <Avatar
                name={form.name}
                firstName={form.first_name}
                size={46}
              />
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                  }}
                >
                  {form.first_name || "Prénom"} {form.name || "Nom"}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {form.email || "email@exemple.com"}
                </div>
                {form.role && (
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: getRoleColor(form.role),
                      marginTop: "0.2rem",
                    }}
                  >
                    {form.role}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            style={{ ...btnPrimary, width: "100%", justifyContent: "center" }}
          >
            <Save size={18} />
            {editTarget ? "Enregistrer les modifications" : "Créer l'utilisateur"}
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
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function UserCard({
  user,
  roleConfig,
  isSelf,
  showModify,
  showDelete,
  onEdit,
  onDelete,
  onDetails,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="user-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        padding: "1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: `
          linear-gradient(
            145deg,
            rgba(255,255,255,.08),
            rgba(255,255,255,.02)
          ),
          var(--card-bg)
        `,
        backdropFilter: "blur(35px)",
        border: isSelf
          ? "1px solid color-mix(in srgb, var(--gradient-start) 50%, var(--glass-border))"
          : hover
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
          width: 200,
          height: 200,
          top: -100,
          right: -100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${roleConfig.color}, transparent 70%)`,
          opacity: hover ? 0.18 : 0.06,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {isSelf && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            padding: "0.25rem 0.65rem",
            borderRadius: 999,
            background:
              "color-mix(in srgb, var(--gradient-start) 15%, transparent)",
            border: "1px solid var(--gradient-start)",
            color: "var(--gradient-start)",
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            zIndex: 2,
          }}
        >
          VOUS
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar name={user.name} firstName={user.first_name} size={56} />
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
            {user.first_name} {user.name}
          </div>
          {user.email && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                marginTop: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Mail size={11} /> {user.email}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.55rem 0.85rem",
          borderRadius: 12,
          background: `${roleConfig.color}15`,
          border: `1px solid ${roleConfig.color}33`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ color: roleConfig.color }}>{roleConfig.icon}</span>
        <span
          style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: roleConfig.color,
          }}
        >
          {roleConfig.label}
        </span>
      </div>

      {(user.genre || user.middle_name) && (
        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          {user.genre && (
            <span
              style={{
                padding: "0.25rem 0.65rem",
                borderRadius: 999,
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
              }}
            >
              {user.genre === "M"
                ? "Masculin"
                : user.genre === "F"
                ? "Féminin"
                : user.genre}
            </span>
          )}
          {user.middle_name && (
            <span
              style={{
                padding: "0.25rem 0.65rem",
                borderRadius: 999,
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
              }}
            >
              {user.middle_name}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          paddingTop: "0.9rem",
          borderTop: "1px solid var(--glass-border)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {showModify ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <button type="button" onClick={onDetails} style={btnGhost}>
              <ExternalLink size={12} /> Détails
            </button>
            <button type="button" onClick={onEdit} style={btnGhost}>
              <Edit2 size={12} /> Modifier
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" onClick={onDetails} style={btnGhost}>
              <ExternalLink size={12} /> Détails
            </button>
          </div>
        )}

        {showDelete && (
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
        )}
      </div>

      <style>{`
.user-card .neon-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  opacity: 0;
  transition: opacity .4s ease, transform .45s;
  pointer-events: none;
  z-index: 2;
}
.user-card:hover .neon-corner { opacity: 1; }
.user-card .neon-corner.top-left {
  top: 0; left: 0;
  border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start);
  border-top-left-radius: 26px;
}
.user-card .neon-corner.top-right {
  top: 0; right: 0;
  border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end);
  border-top-right-radius: 26px;
}
.user-card .neon-corner.bottom-left {
  bottom: 0; left: 0;
  border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end);
  border-bottom-left-radius: 26px;
}
.user-card .neon-corner.bottom-right {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start);
  border-bottom-right-radius: 26px;
}
.user-card:hover .top-left { transform: translate(4px, 4px); }
.user-card:hover .top-right { transform: translate(-4px, 4px); }
.user-card:hover .bottom-left { transform: translate(4px, -4px); }
.user-card:hover .bottom-right { transform: translate(-4px, -4px); }
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
        <Users size={36} color="#fff" />
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
        Aucun utilisateur trouvé
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          marginBottom: "1.5rem",
        }}
      >
        Créez le premier utilisateur pour gérer les accès.
      </p>
      {onAdd && (
        <button type="button" onClick={onAdd} style={btnPrimary}>
          <Plus size={18} /> Créer un utilisateur
        </button>
      )}
    </div>
  );
}

function Avatar({ name, firstName, size = 40 }) {
  const initials =
    `${firstName?.[0] || ""}${name?.[0] || ""}`.toUpperCase() || "?";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        background:
          "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontWeight: 800,
        color: "#fff",
        fontFamily: "Syne, sans-serif",
        boxShadow: "0 4px 12px var(--glow-color)",
        border: "1.5px solid rgba(255,255,255,0.28)",
      }}
    >
      {initials}
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

const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.65rem",
  padding: "0.9rem 1.35rem",
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

const btnGhost = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "7px 12px",
  borderRadius: 999,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--gradient-start)",
  cursor: "pointer",
  fontSize: "0.75rem",
  fontWeight: 600,
};

export default UsersPage;
