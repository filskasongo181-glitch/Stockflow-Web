// import { useState, useEffect } from "react";
// import {
//   Settings,
//   User,
//   Lock,
//   Bell,
//   Globe,
//   Palette,
//   Database,
//   Shield,
//   Save,
//   Eye,
//   EyeOff,
//   Check,
//   Moon,
//   Sun,
//   RefreshCw,
//   Trash2,
//   Download,
//   Upload,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Footer from "../components/Footer";
// import { THEME_NAMES } from "../components/ThemeBackground";

// /* ============================================================
//    LABELS THÈMES
//    ============================================================ */
// const THEME_LABELS = {
//   "dark-galaxy": "🌌 Galaxy Dark",
//   "light-galaxy": "🌌 Galaxy Light",
//   "dark-simple": "💙 Simple Dark",
//   "light-simple": "💙 Simple Light",
//   "dark-luxury": "✨ Luxury Dark",
//   "light-luxury": "✨ Luxury Light",
//   "dark-exotic": "🔥 Exotic Dark",
//   "light-exotic": "🔥 Exotic Light",
//   "dark-verdatre": "🌿 Verdâtre Dark",
//   "light-verdatre": "🌿 Verdâtre Light",
//   "dark-glamour": "💎 Glamour Dark",
//   "light-glamour": "💎 Glamour Light",
//   "dark-graphite": "🪨 Graphite Dark",
//   "light-graphite": "🪨 Graphite Light",
//   "dark-volcanic": "🌋 Volcanic Dark",
//   "light-volcanic": "🌋 Volcanic Light",
//   "dark-oceanic": "🌊 Oceanic Dark",
//   "light-oceanic": "🌊 Oceanic Light",
//   "dark-modern": "⚡ Modern Dark",
//   "light-modern": "⚡ Modern Light",
// };

// const LANGUES = [
//   { value: "fr", label: "🇫🇷 Français" },
//   { value: "en", label: "🇬🇧 English" },
//   { value: "es", label: "🇪🇸 Español" },
// ];

// const SECTIONS = [
//   { key: "profil", label: "Mon profil", icon: User },
//   { key: "securite", label: "Sécurité", icon: Lock },
//   { key: "apparence", label: "Apparence", icon: Palette },
//   { key: "notifications", label: "Notifications", icon: Bell },
//   { key: "langue", label: "Langue", icon: Globe },
//   { key: "synchronisation", label: "Synchronisation", icon: Database },
// ];

// /* ============================================================
//    PAGE
//    ============================================================ */
// function Parametres() {
//   const user = JSON.parse(sessionStorage.getItem("user") || "{}");
//   const [section, setSection] = useState("profil");
//   const [saved, setSaved] = useState("");
//   const [theme, setTheme] = useState(
//     sessionStorage.getItem("theme") || "dark-galaxy"
//   );

//   const [profil, setProfil] = useState({
//     name: user.name || "",
//     first_name: user.first_name || "",
//     middle_name: user.middle_name || "",
//     email: user.email || "",
//     genre: user.genre || "",
//     role: user.role || "",
//   });

//   const [passwords, setPasswords] = useState({
//     current: "",
//     nouveau: "",
//     confirm: "",
//   });
//   const [showPw, setShowPw] = useState({
//     current: false,
//     nouveau: false,
//     confirm: false,
//   });

//   const [notifs, setNotifs] = useState({
//     stock_critique: true,
//     stock_bas: true,
//     mouvements: false,
//     synchronisation: true,
//     email: false,
//   });

//   const [langue, setLangue] = useState(
//     sessionStorage.getItem("langue") || "fr"
//   );

//   const sectionIndex = SECTIONS.findIndex((s) => s.key === section);
//   const currentSection = SECTIONS[sectionIndex] || SECTIONS[0];

//   const goPrev = () => {
//     if (sectionIndex > 0) setSection(SECTIONS[sectionIndex - 1].key);
//   };
//   const goNext = () => {
//     if (sectionIndex < SECTIONS.length - 1)
//       setSection(SECTIONS[sectionIndex + 1].key);
//   };

//   const showSaved = (msg = "Enregistré avec succès !") => {
//     setSaved(msg);
//     setTimeout(() => setSaved(""), 3000);
//   };

//   const handleSaveProfil = (e) => {
//     e.preventDefault();
//     const updated = { ...user, ...profil };
//     sessionStorage.setItem("user", JSON.stringify(updated));
//     showSaved("Profil mis à jour !");
//   };

//   const handleSavePassword = (e) => {
//     e.preventDefault();
//     if (passwords.nouveau !== passwords.confirm) {
//       alert("Les nouveaux mots de passe ne correspondent pas.");
//       return;
//     }
//     if (passwords.nouveau.length < 6) {
//       alert("Le mot de passe doit contenir au moins 6 caractères.");
//       return;
//     }
//     setPasswords({ current: "", nouveau: "", confirm: "" });
//     showSaved("Mot de passe mis à jour !");
//   };

//   const changeTheme = (t) => {
//     setTheme(t);
//     sessionStorage.setItem("theme", t);
//     document.documentElement.setAttribute("data-theme", t);
//     showSaved(`Thème « ${THEME_LABELS[t] || t} » appliqué !`);
//   };

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <div style={{ 
//       width: "100%",
//       maxWidth: 1320,
//       margin: "0 auto",
//       padding: "0 20px 2rem",
//       boxSizing: "border-box", }}>

//       {/* =====================================================
//             HEADER PREMIUM — LOGO + TITRE CENTRÉS
//          ===================================================== */}
//       <div
//         style={{
//           display: "flex",
//           position: "relative",
//           zIndex: 1,
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           marginTop: "0.35rem",
//           marginBottom: "1.35rem",
//           gap: "0.75rem",
//         }}
//       >
//         {/* Icône principale */}
//         <div
//           style={{
//             width: 78,
//             height: 78,
//             borderRadius: 24,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background:
//                "linear-gradient(145deg, var(--gradient-start), var(--gradient-end))",
//             color: "#fff",
//             boxShadow: "0 15px 40px var(--glow-color)",
//             position: "relative",
//           }}
//         >
//           <Settings size={34} />
//         </div>
//         <div
//           style={{
//             position: "absolute",
//             top: -50,
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: 280,
//             height: 140,
//             background:
//               "radial-gradient(circle, var(--gradient-start), transparent 70%)",
//             opacity: 0.14,
//             filter: "blur(40px)",
//             pointerEvents: "none",
//           }}
//         />

//         <div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             padding: "0.45rem 1.1rem",
//             borderRadius: 999,
//             background: `
//               linear-gradient(
//                 135deg,
//                 color-mix(in srgb, var(--card-bg) 80%, var(--text) 6%),
//                 var(--glass-bg)
//               )
//             `,
//             border: "1px solid var(--glass-border)",
//             color: "var(--gradient-start)",
//             fontSize: "0.72rem",
//             fontWeight: 800,
//             letterSpacing: "0.12em",
//             marginBottom: "0.9rem",
//             backdropFilter: "blur(20px)",
//             boxShadow: "0 8px 25px rgba(0,0,0,.12)",
//           }}
//         >
//           <Settings size={12} /> PARAMÈTRES
//         </div>

//         <h1
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontSize: "clamp(1.7rem, 4vw, 2.2rem)",
//             fontWeight: 900,
//             color: "var(--text)",
//             lineHeight: 1.1,
//             letterSpacing: "-0.03em",
//             background:
//               "linear-gradient(135deg, var(--text), var(--gradient-start))",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             margin: 0,
//           }}
//         >
//           Paramètres
//         </h1>
//         <p
//           style={{
//             color: "var(--text-secondary)",
//             fontSize: "0.92rem",
//             marginTop: "0.45rem",
//             maxWidth: 480,
//             marginLeft: "auto",
//             marginRight: "auto",
//             lineHeight: 1.55,
//           }}
//         >
//           Configurez votre espace, votre sécurité et vos préférences.
//         </p>
//       </div>

//       {/* ===== TOAST ===== */}
//       {saved && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "1.5rem",
//             right: "1.5rem",
//             zIndex: 9999,
//             display: "flex",
//             alignItems: "center",
//             gap: "0.6rem",
//             padding: "0.8rem 1.3rem",
//             borderRadius: 14,
//             background: "rgba(74,222,128,0.14)",
//             border: "1px solid rgba(74,222,128,0.4)",
//             color: "#4ade80",
//             fontWeight: 600,
//             fontSize: "0.88rem",
//             boxShadow: "0 10px 35px rgba(0,0,0,0.28)",
//             animation: "fadeUp 0.3s ease",
//             backdropFilter: "blur(12px)",
//           }}
//         >
//           <Check size={18} /> {saved}
//         </div>
//       )}

//       {/* ===== NAV SECTIONS (prev / label / next) ===== */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "0.75rem",
//           marginBottom: "1.25rem",
//           padding: "0.55rem",
//           borderRadius: 20,
//           background: `
//             linear-gradient(
//               145deg,
//               color-mix(in srgb, var(--card-bg) 90%, var(--text) 4%),
//               var(--card-bg)
//             )
//           `,
//           border: "1px solid var(--glass-border)",
//           backdropFilter: "blur(30px)",
//           boxShadow: "0 10px 30px rgba(0,0,0,.12)",
//         }}
//       >
//         <NavArrow
//           direction="left"
//           disabled={sectionIndex <= 0}
//           onClick={goPrev}
//         />

//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 4,
//             minWidth: 0,
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "0.55rem",
//               color: "var(--gradient-start)",
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 800,
//               fontSize: "1.05rem",
//             }}
//           >
//             <currentSection.icon size={20} />
//             <span
//               style={{
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {currentSection.label}
//             </span>
//           </div>
//           <div
//             style={{
//               fontSize: "0.7rem",
//               color: "var(--text-secondary)",
//               fontWeight: 600,
//               letterSpacing: "0.06em",
//             }}
//           >
//             {sectionIndex + 1} / {SECTIONS.length}
//           </div>
//         </div>

//         <NavArrow
//           direction="right"
//           disabled={sectionIndex >= SECTIONS.length - 1}
//           onClick={goNext}
//         />
//       </div>

//       {/* ===== PILLS (desktop / tablette) ===== */}
//       <div
//         className="params-pills"
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "0.45rem",
//           justifyContent: "center",
//           marginBottom: "1.4rem",
//         }}
//       >
//         {SECTIONS.map((s) => {
//           const active = section === s.key;
//           const Icon = s.icon;
//           return (
//             <button
//               key={s.key}
//               type="button"
//               onClick={() => setSection(s.key)}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 6,
//                 padding: "0.45rem 0.85rem",
//                 borderRadius: 999,
//                 border: active
//                   ? "1px solid transparent"
//                   : "1px solid var(--glass-border)",
//                 background: active
//                   ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//                   : "var(--glass-bg)",
//                 color: active ? "#fff" : "var(--text-secondary)",
//                 fontSize: "0.78rem",
//                 fontWeight: active ? 700 : 500,
//                 cursor: "pointer",
//                 boxShadow: active ? "0 6px 20px var(--glow-color)" : "none",
//                 transition: "all .3s cubic-bezier(.16,1,.3,1)",
//               }}
//             >
//               <Icon size={13} />
//               {s.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* ===== CARTE CONTENU ===== */}
//       <div
//         style={{
//           position: "relative",
//           borderRadius: 26,
//           background: `
//             linear-gradient(
//               180deg,
//               color-mix(in srgb, var(--card-bg) 92%, var(--text) 3%),
//               var(--card-bg)
//             )
//           `,
//           backdropFilter: "blur(35px)",
//           border: "1px solid var(--glass-border)",
//           overflow: "hidden",
//           boxShadow: `
//             0 20px 50px rgba(0,0,0,.16),
//             inset 0 1px 0 color-mix(in srgb, var(--text) 6%, transparent)
//           `,
//           minHeight: 360,
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: -100,
//             right: -80,
//             width: 250,
//             height: 250,
//             background:
//               "radial-gradient(circle, var(--gradient-start), transparent 70%)",
//             opacity: 0.09,
//             filter: "blur(50px)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* PROFIL */}
//         {section === "profil" && (
//           <form onSubmit={handleSaveProfil}>
//             <SectionHeader
//               icon={<User size={20} />}
//               title="Mon profil"
//               sub="Informations personnelles"
//             />
//             <div style={{ padding: "1.5rem" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "1.2rem",
//                   marginBottom: "1.75rem",
//                   padding: "1rem",
//                   borderRadius: 16,
//                   background: "var(--glass-bg)",
//                   border: "1px solid var(--glass-border)",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 70,
//                     height: 70,
//                     borderRadius: "50%",
//                     background:
//                       "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "1.4rem",
//                     fontWeight: 900,
//                     color: "#fff",
//                     fontFamily: "Syne, sans-serif",
//                     boxShadow: "0 0 22px var(--glow-color)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   {(profil.first_name?.[0] || "") + (profil.name?.[0] || "")}
//                 </div>
//                 <div style={{ minWidth: 0 }}>
//                   <div
//                     style={{
//                       fontFamily: "Syne, sans-serif",
//                       fontWeight: 700,
//                       fontSize: "1rem",
//                       color: "var(--text)",
//                     }}
//                   >
//                     {profil.first_name} {profil.name}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.82rem",
//                       color: "var(--text-secondary)",
//                       marginTop: "0.2rem",
//                     }}
//                   >
//                     {profil.role || "Utilisateur"} · {profil.email || "—"}
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="params-form-grid"
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "1rem",
//                 }}
//               >
//                 <Field
//                   label="Nom *"
//                   value={profil.name}
//                   onChange={(v) => setProfil({ ...profil, name: v })}
//                 />
//                 <Field
//                   label="Prénom *"
//                   value={profil.first_name}
//                   onChange={(v) => setProfil({ ...profil, first_name: v })}
//                 />
//                 <Field
//                   label="Post-nom"
//                   value={profil.middle_name}
//                   onChange={(v) => setProfil({ ...profil, middle_name: v })}
//                 />
//                 <div>
//                   <label style={labelStyle}>Genre</label>
//                   <select
//                     value={profil.genre}
//                     onChange={(e) =>
//                       setProfil({ ...profil, genre: e.target.value })
//                     }
//                     style={{ ...inputStyle, cursor: "pointer" }}
//                   >
//                     <option value="">Choisir...</option>
//                     <option value="M">Masculin</option>
//                     <option value="F">Féminin</option>
//                     <option value="Autre">Autre</option>
//                   </select>
//                 </div>
//                 <div style={{ gridColumn: "1 / -1" }}>
//                   <Field
//                     label="Email"
//                     type="email"
//                     value={profil.email}
//                     onChange={(v) => setProfil({ ...profil, email: v })}
//                   />
//                 </div>
//               </div>
//               <SaveButton />
//             </div>
//           </form>
//         )}

//         {/* SÉCURITÉ */}
//         {section === "securite" && (
//           <form onSubmit={handleSavePassword}>
//             <SectionHeader
//               icon={<Lock size={20} />}
//               title="Sécurité"
//               sub="Gérez votre mot de passe"
//             />
//             <div style={{ padding: "1.5rem" }}>
//               <InfoBox icon={<Shield size={16} />} color="#60a5fa">
//                 Choisissez un mot de passe d&apos;au moins 8 caractères avec
//                 lettres, chiffres et symboles.
//               </InfoBox>

//               {[
//                 { key: "current", label: "Mot de passe actuel" },
//                 { key: "nouveau", label: "Nouveau mot de passe" },
//                 {
//                   key: "confirm",
//                   label: "Confirmer le nouveau mot de passe",
//                 },
//               ].map((f) => (
//                 <div
//                   key={f.key}
//                   style={{ marginBottom: "1rem", position: "relative" }}
//                 >
//                   <label style={labelStyle}>{f.label}</label>
//                   <div style={{ position: "relative" }}>
//                     <input
//                       type={showPw[f.key] ? "text" : "password"}
//                       value={passwords[f.key]}
//                       onChange={(e) =>
//                         setPasswords({
//                           ...passwords,
//                           [f.key]: e.target.value,
//                         })
//                       }
//                       placeholder="••••••••"
//                       style={{ ...inputStyle, paddingRight: "2.8rem" }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPw({
//                           ...showPw,
//                           [f.key]: !showPw[f.key],
//                         })
//                       }
//                       style={{
//                         position: "absolute",
//                         right: 12,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                         color: "var(--text-secondary)",
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                     >
//                       {showPw[f.key] ? (
//                         <EyeOff size={16} />
//                       ) : (
//                         <Eye size={16} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {passwords.nouveau && (
//                 <div style={{ marginBottom: "1.5rem" }}>
//                   <div
//                     style={{
//                       fontSize: "0.72rem",
//                       color: "var(--text-secondary)",
//                       marginBottom: "0.4rem",
//                       fontWeight: 600,
//                     }}
//                   >
//                     Force du mot de passe
//                   </div>
//                   <div
//                     style={{
//                       height: 6,
//                       borderRadius: 999,
//                       background: "var(--glass-bg)",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <div
//                       style={{
//                         height: "100%",
//                         borderRadius: 999,
//                         width:
//                           passwords.nouveau.length < 6
//                             ? "25%"
//                             : passwords.nouveau.length < 8
//                               ? "50%"
//                               : passwords.nouveau.length < 12
//                                 ? "75%"
//                                 : "100%",
//                         background:
//                           passwords.nouveau.length < 6
//                             ? "#f87171"
//                             : passwords.nouveau.length < 8
//                               ? "#fbbf24"
//                               : passwords.nouveau.length < 12
//                                 ? "#60a5fa"
//                                 : "#4ade80",
//                         transition: "all 0.3s",
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}
//               <SaveButton label="Changer le mot de passe" />
//             </div>
//           </form>
//         )}

//         {/* APPARENCE */}
//         {section === "apparence" && (
//           <div>
//             <SectionHeader
//               icon={<Palette size={20} />}
//               title="Apparence"
//               sub="Thème et affichage"
//             />
//             <div style={{ padding: "1.5rem" }}>
//               <div
//                 style={{
//                   padding: "1rem",
//                   borderRadius: 14,
//                   background: "var(--glass-bg)",
//                   border: "1px solid var(--glass-border)",
//                   marginBottom: "1.5rem",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{
//                       fontSize: "0.72rem",
//                       color: "var(--text-secondary)",
//                       fontWeight: 600,
//                       textTransform: "uppercase",
//                       marginBottom: "0.3rem",
//                     }}
//                   >
//                     Thème actif
//                   </div>
//                   <div
//                     style={{
//                       fontFamily: "Syne, sans-serif",
//                       fontWeight: 700,
//                       fontSize: "1rem",
//                       color: "var(--gradient-start)",
//                     }}
//                   >
//                     {THEME_LABELS[theme] || theme}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: 12,
//                     flexShrink: 0,
//                     background:
//                       "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//                     boxShadow: "0 4px 16px var(--glow-color)",
//                   }}
//                 />
//               </div>

//               <label style={{ ...labelStyle, marginBottom: "0.8rem" }}>
//                 Choisir un thème
//               </label>

//               <div
//                 style={{
//                   fontSize: "0.72rem",
//                   color: "var(--text-secondary)",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   marginBottom: "0.6rem",
//                   letterSpacing: "0.05em",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.4rem",
//                 }}
//               >
//                 <Moon size={12} /> Thèmes sombres
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
//                   gap: "0.6rem",
//                   marginBottom: "1.2rem",
//                 }}
//               >
//                 {(THEME_NAMES || Object.keys(THEME_LABELS))
//                   .filter((t) => t.startsWith("dark"))
//                   .map((t) => (
//                     <ThemeButton
//                       key={t}
//                       t={t}
//                       current={theme}
//                       onChange={changeTheme}
//                     />
//                   ))}
//               </div>

//               <div
//                 style={{
//                   fontSize: "0.72rem",
//                   color: "var(--text-secondary)",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   marginBottom: "0.6rem",
//                   letterSpacing: "0.05em",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.4rem",
//                 }}
//               >
//                 <Sun size={12} /> Thèmes clairs
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
//                   gap: "0.6rem",
//                 }}
//               >
//                 {(THEME_NAMES || Object.keys(THEME_LABELS))
//                   .filter((t) => t.startsWith("light"))
//                   .map((t) => (
//                     <ThemeButton
//                       key={t}
//                       t={t}
//                       current={theme}
//                       onChange={changeTheme}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* NOTIFICATIONS */}
//         {section === "notifications" && (
//           <div>
//             <SectionHeader
//               icon={<Bell size={20} />}
//               title="Notifications"
//               sub="Gérez vos alertes"
//             />
//             <div style={{ padding: "1.5rem" }}>
//               {[
//                 {
//                   key: "stock_critique",
//                   label: "Stock critique",
//                   sub: "Alerte quand un article est en rupture",
//                 },
//                 {
//                   key: "stock_bas",
//                   label: "Stock bas",
//                   sub: "Alerte quand le stock atteint le seuil minimal",
//                 },
//                 {
//                   key: "mouvements",
//                   label: "Nouveaux mouvements",
//                   sub: "Notification à chaque entrée ou sortie",
//                 },
//                 {
//                   key: "synchronisation",
//                   label: "Synchronisation",
//                   sub: "Résultat des synchronisations automatiques",
//                 },
//                 {
//                   key: "email",
//                   label: "Notifications par email",
//                   sub: "Recevoir les alertes par email",
//                 },
//               ].map((n) => (
//                 <ToggleRow
//                   key={n.key}
//                   label={n.label}
//                   sub={n.sub}
//                   value={notifs[n.key]}
//                   onChange={(v) => {
//                     setNotifs({ ...notifs, [n.key]: v });
//                     showSaved("Préférence enregistrée.");
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* LANGUE */}
//         {section === "langue" && (
//           <div>
//             <SectionHeader
//               icon={<Globe size={20} />}
//               title="Langue"
//               sub="Interface et région"
//             />
//             <div style={{ padding: "1.5rem" }}>
//               <label style={labelStyle}>Langue de l&apos;interface</label>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "0.5rem",
//                 }}
//               >
//                 {LANGUES.map((l) => (
//                   <button
//                     key={l.value}
//                     type="button"
//                     onClick={() => {
//                       setLangue(l.value);
//                       sessionStorage.setItem("langue", l.value);
//                       showSaved(`Langue changée : ${l.label}`);
//                     }}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       padding: "0.9rem 1rem",
//                       borderRadius: 14,
//                       border: `2px solid ${
//                         langue === l.value
//                           ? "var(--gradient-start)"
//                           : "var(--glass-border)"
//                       }`,
//                       background:
//                         langue === l.value ? "var(--glass-bg)" : "transparent",
//                       color:
//                         langue === l.value
//                           ? "var(--gradient-start)"
//                           : "var(--text)",
//                       cursor: "pointer",
//                       fontSize: "0.9rem",
//                       fontWeight: langue === l.value ? 600 : 400,
//                       transition: "all 0.2s",
//                     }}
//                   >
//                     {l.label}
//                     {langue === l.value && <Check size={16} />}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* SYNCHRONISATION */}
//         {section === "synchronisation" && (
//           <div>
//             <SectionHeader
//               icon={<Database size={20} />}
//               title="Synchronisation"
//               sub="Base de données et sauvegarde"
//             />
//             <div style={{ padding: "1.5rem" }}>
//               <div
//                 className="params-form-grid"
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "0.8rem",
//                   marginBottom: "1.5rem",
//                 }}
//               >
//                 {[
//                   {
//                     label: "Statut API",
//                     value: "Connectée",
//                     color: "#4ade80",
//                   },
//                   {
//                     label: "Dernière sync",
//                     value: "À vérifier",
//                     color: "var(--text-secondary)",
//                   },
//                   {
//                     label: "Mode",
//                     value: "Automatique",
//                     color: "#60a5fa",
//                   },
//                   {
//                     label: "Intervalle",
//                     value: "5 minutes",
//                     color: "var(--text)",
//                   },
//                 ].map((s, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       padding: "0.9rem 1rem",
//                       borderRadius: 14,
//                       background: "var(--glass-bg)",
//                       border: "1px solid var(--glass-border)",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "0.7rem",
//                         color: "var(--text-secondary)",
//                         fontWeight: 600,
//                         textTransform: "uppercase",
//                         marginBottom: "0.25rem",
//                       }}
//                     >
//                       {s.label}
//                     </div>
//                     <div
//                       style={{
//                         fontWeight: 700,
//                         fontSize: "0.9rem",
//                         color: s.color,
//                       }}
//                     >
//                       {s.value}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <label style={{ ...labelStyle, marginBottom: "0.8rem" }}>
//                 Actions
//               </label>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "0.6rem",
//                 }}
//               >
//                 <ActionButton
//                   icon={<RefreshCw size={16} />}
//                   label="Lancer une synchronisation"
//                   sub="Synchronise immédiatement les données"
//                   color="var(--gradient-start)"
//                   onClick={() => showSaved("Synchronisation lancée !")}
//                 />
//                 <ActionButton
//                   icon={<Download size={16} />}
//                   label="Exporter les données"
//                   sub="Télécharger une sauvegarde JSON"
//                   color="#60a5fa"
//                   onClick={() => showSaved("Export en cours...")}
//                 />
//                 <ActionButton
//                   icon={<Upload size={16} />}
//                   label="Importer des données"
//                   sub="Restaurer depuis une sauvegarde"
//                   color="#fbbf24"
//                   onClick={() => showSaved("Import démarré...")}
//                 />
//                 <ActionButton
//                   icon={<Trash2 size={16} />}
//                   label="Vider le cache local"
//                   sub="Une sync sera nécessaire ensuite"
//                   color="#f87171"
//                   danger
//                   onClick={() => {
//                     if (window.confirm("Vider le cache local ?"))
//                       showSaved("Cache vidé.");
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />

//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @media (max-width: 640px) {
//           .params-form-grid {
//             grid-template-columns: 1fr !important;
//           }
//           .params-pills {
//             display: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ============================================================
//    SOUS-COMPOSANTS
//    ============================================================ */
// function NavArrow({ direction, disabled, onClick }) {
//   const Icon = direction === "left" ? ChevronLeft : ChevronRight;
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       style={{
//         width: 44,
//         height: 44,
//         borderRadius: 14,
//         border: "1px solid var(--glass-border)",
//         background: disabled ? "transparent" : "var(--glass-bg)",
//         color: disabled ? "var(--text-secondary)" : "var(--gradient-start)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: disabled ? "not-allowed" : "pointer",
//         opacity: disabled ? 0.35 : 1,
//         flexShrink: 0,
//         transition: "all .25s",
//         boxShadow: disabled ? "none" : "0 4px 14px rgba(0,0,0,.1)",
//       }}
//     >
//       <Icon size={22} />
//     </button>
//   );
// }

// function SectionHeader({ icon, title, sub }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "0.8rem",
//         padding: "1.2rem 1.5rem",
//         borderBottom: "1px solid var(--glass-border)",
//         color: "var(--gradient-start)",
//       }}
//     >
//       {icon}
//       <div>
//         <div
//           style={{
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 800,
//             fontSize: "1rem",
//             color: "var(--text)",
//           }}
//         >
//           {title}
//         </div>
//         <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
//           {sub}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Field({ label, value, onChange, type = "text" }) {
//   return (
//     <div>
//       <label style={labelStyle}>{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         style={inputStyle}
//       />
//     </div>
//   );
// }

// function SaveButton({ label = "Enregistrer les modifications" }) {
//   return (
//     <button
//       type="submit"
//       style={{
//         marginTop: "1.5rem",
//         display: "flex",
//         alignItems: "center",
//         gap: "0.5rem",
//         padding: "0.75rem 1.5rem",
//         borderRadius: 12,
//         border: "none",
//         background:
//           "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
//         color: "#fff",
//         fontWeight: 700,
//         fontSize: "0.9rem",
//         cursor: "pointer",
//         boxShadow: "0 4px 20px var(--glow-color)",
//       }}
//     >
//       <Save size={16} /> {label}
//     </button>
//   );
// }

// function InfoBox({ icon, color, children }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "0.7rem",
//         padding: "0.8rem 1rem",
//         borderRadius: 12,
//         background: "rgba(96,165,250,0.08)",
//         border: "1px solid rgba(96,165,250,0.25)",
//         color,
//         fontSize: "0.82rem",
//         marginBottom: "1.5rem",
//         lineHeight: 1.5,
//       }}
//     >
//       <div style={{ flexShrink: 0, marginTop: "0.1rem" }}>{icon}</div>
//       <div>{children}</div>
//     </div>
//   );
// }

// function ToggleRow({ label, sub, value, onChange }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: "1rem",
//         padding: "1rem",
//         borderRadius: 14,
//         border: "1px solid var(--glass-border)",
//         background: "var(--glass-bg)",
//         marginBottom: "0.6rem",
//       }}
//     >
//       <div style={{ minWidth: 0 }}>
//         <div
//           style={{
//             fontWeight: 600,
//             fontSize: "0.9rem",
//             color: "var(--text)",
//           }}
//         >
//           {label}
//         </div>
//         <div
//           style={{
//             fontSize: "0.78rem",
//             color: "var(--text-secondary)",
//             marginTop: "0.15rem",
//           }}
//         >
//           {sub}
//         </div>
//       </div>
//       <button
//         type="button"
//         onClick={() => onChange(!value)}
//         style={{
//           width: 48,
//           height: 26,
//           borderRadius: 999,
//           border: "none",
//           background: value
//             ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
//             : "var(--glass-border)",
//           cursor: "pointer",
//           position: "relative",
//           transition: "all 0.3s",
//           flexShrink: 0,
//           boxShadow: value ? "0 0 10px var(--glow-color)" : "none",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 3,
//             left: value ? 24 : 3,
//             width: 20,
//             height: 20,
//             borderRadius: "50%",
//             background: "#fff",
//             transition: "left 0.3s",
//             boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
//           }}
//         />
//       </button>
//     </div>
//   );
// }

// function ThemeButton({ t, current, onChange }) {
//   const isActive = t === current;
//   return (
//     <button
//       type="button"
//       onClick={() => onChange(t)}
//       style={{
//         padding: "0.6rem 0.7rem",
//         borderRadius: 12,
//         border: "2px solid",
//         borderColor: isActive
//           ? "var(--gradient-start)"
//           : "var(--glass-border)",
//         background: isActive ? "var(--glass-bg)" : "transparent",
//         color: isActive ? "var(--gradient-start)" : "var(--text-secondary)",
//         cursor: "pointer",
//         fontSize: "0.78rem",
//         fontWeight: isActive ? 700 : 400,
//         transition: "all 0.2s",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: "0.3rem",
//         textAlign: "left",
//       }}
//     >
//       <span style={{ flex: 1 }}>{THEME_LABELS[t] || t}</span>
//       {isActive && <Check size={13} />}
//     </button>
//   );
// }

// function ActionButton({ icon, label, sub, color, onClick, danger }) {
//   const [hover, setHover] = useState(false);
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "0.8rem",
//         width: "100%",
//         padding: "0.9rem 1rem",
//         borderRadius: 14,
//         cursor: "pointer",
//         border: `1px solid ${
//           danger
//             ? hover
//               ? "#f87171"
//               : "rgba(248,113,113,0.3)"
//             : hover
//               ? "var(--gradient-start)"
//               : "var(--glass-border)"
//         }`,
//         background: hover
//           ? danger
//             ? "rgba(248,113,113,0.08)"
//             : "var(--glass-bg)"
//           : "transparent",
//         transition: "all 0.2s",
//         textAlign: "left",
//       }}
//     >
//       <div
//         style={{
//           width: 36,
//           height: 36,
//           borderRadius: 10,
//           flexShrink: 0,
//           background: "var(--glass-bg)",
//           border: "1px solid var(--glass-border)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color,
//         }}
//       >
//         {icon}
//       </div>
//       <div style={{ minWidth: 0 }}>
//         <div
//           style={{
//             fontWeight: 600,
//             fontSize: "0.88rem",
//             color: danger ? "#f87171" : "var(--text)",
//           }}
//         >
//           {label}
//         </div>
//         <div
//           style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
//         >
//           {sub}
//         </div>
//       </div>
//     </button>
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
//   transition: "border-color 0.2s",
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

// export default Parametres;










/**
 * Paramètres — 3 sections uniquement :
 *  1. Mon profil  (nom, prénom, post-nom, genre, email) — exige le mot de passe actuel
 *  2. Sécurité    (changement de mot de passe)
 *  3. Apparence   (thèmes)
 * Style unifié ThemeBackground + InfoCards / glow icons
 */

import { useState, useEffect, useMemo } from "react";
import {
  Settings,
  User,
  Lock,
  Palette,
  Save,
  Eye,
  EyeOff,
  Check,
  Moon,
  Sun,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ThemeBackground, {
  themeCssVars,
  THEME_NAMES,
} from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

/* ============================================================
   LABELS THÈMES
============================================================ */
const THEME_LABELS = {
  "dark-galaxy": "🌌 Galaxy Dark",
  "light-galaxy": "🌌 Galaxy Light",
  "dark-simple": "💙 Simple Dark",
  "light-simple": "💙 Simple Light",
  "dark-luxury": "✨ Luxury Dark",
  "light-luxury": "✨ Luxury Light",
  "dark-exotic": "🔥 Exotic Dark",
  "light-exotic": "🔥 Exotic Light",
  "dark-verdatre": "🌿 Verdâtre Dark",
  "light-verdatre": "🌿 Verdâtre Light",
  "dark-glamour": "💎 Glamour Dark",
  "light-glamour": "💎 Glamour Light",
  "dark-graphite": "🪨 Graphite Dark",
  "light-graphite": "🪨 Graphite Light",
  "dark-volcanic": "🌋 Volcanic Dark",
  "light-volcanic": "🌋 Volcanic Light",
  "dark-oceanic": "🌊 Oceanic Dark",
  "light-oceanic": "🌊 Oceanic Light",
  "dark-modern": "⚡ Modern Dark",
  "light-modern": "⚡ Modern Light",
};

const SECTIONS = [
  { key: "profil", label: "Mon profil", icon: User },
  { key: "securite", label: "Sécurité", icon: Lock },
  { key: "apparence", label: "Apparence", icon: Palette },
];

function readSessionUser() {
  try {
    return JSON.parse(
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("user")) ||
        "{}"
    );
  } catch {
    return {};
  }
}

/* ============================================================
   PAGE
============================================================ */
function Parametres() {
  const currentTheme =
    (typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("theme")) ||
    "dark-galaxy";

  const [user, setUser] = useState(() => readSessionUser());
  const [section, setSection] = useState("profil");
  const [saved, setSaved] = useState("");
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || "dark-galaxy"
  );

  const [profil, setProfil] = useState({
    name: user.name || "",
    first_name: user.first_name || "",
    middle_name: user.middle_name || "",
    email: user.email || "",
    genre: user.genre || "",
    role: user.role || "",
  });

  /** Mot de passe actuel exigé pour valider une modif de profil */
  const [profilPassword, setProfilPassword] = useState("");
  const [showProfilPw, setShowProfilPw] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    nouveau: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState({
    current: false,
    nouveau: false,
    confirm: false,
  });

  const sectionIndex = SECTIONS.findIndex((s) => s.key === section);
  const currentSection = SECTIONS[sectionIndex] || SECTIONS[0];

  const themeList = useMemo(() => {
    const keys =
      Array.isArray(THEME_NAMES) && THEME_NAMES.length
        ? THEME_NAMES
        : Object.keys(THEME_LABELS);
    return keys;
  }, []);

  const goPrev = () => {
    if (sectionIndex > 0) setSection(SECTIONS[sectionIndex - 1].key);
  };
  const goNext = () => {
    if (sectionIndex < SECTIONS.length - 1)
      setSection(SECTIONS[sectionIndex + 1].key);
  };

  const showSaved = (msg = "Enregistré avec succès !") => {
    setSaved(msg);
    setTimeout(() => setSaved(""), 3000);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ---------- PROFIL ---------- */
  const handleSaveProfil = async (e) => {
    e.preventDefault();
    if (!String(profil.name || "").trim() || !String(profil.first_name || "").trim()) {
      alert("Nom et prénom sont obligatoires.");
      return;
    }
    if (!String(profil.email || "").trim()) {
      alert("L'email est obligatoire.");
      return;
    }
    if (!String(profilPassword || "").trim()) {
      alert(
        "Pour confirmer la modification du profil, saisissez votre mot de passe actuel."
      );
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: String(profil.name).trim(),
        first_name: String(profil.first_name).trim(),
        middle_name: String(profil.middle_name || "").trim() || null,
        email: String(profil.email).trim(),
        genre: profil.genre || null,
        // confirmation identité
        current_password: profilPassword,
      };

      const updateFn = api.updateUser || api.updateProfile || api.patchUser;
      if (typeof updateFn === "function" && user?.id != null) {
        await updateFn(user.id, payload);
      }

      const updated = {
        ...user,
        name: payload.name,
        first_name: payload.first_name,
        middle_name: payload.middle_name,
        email: payload.email,
        genre: payload.genre,
      };
      sessionStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setProfilPassword("");
      showSaved("Profil mis à jour !");
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail || err?.message;
      alert(
        detail
          ? typeof detail === "string"
            ? detail
            : JSON.stringify(detail)
          : "Impossible de mettre à jour le profil. Vérifiez votre mot de passe."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ---------- MOT DE PASSE ---------- */
  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!passwords.current) {
      alert("Saisissez votre mot de passe actuel.");
      return;
    }
    if (passwords.nouveau !== passwords.confirm) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (passwords.nouveau.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        current_password: passwords.current,
        password: passwords.nouveau,
        new_password: passwords.nouveau,
      };

      const updateFn = api.updateUser || api.changePassword || api.updatePassword;
      if (typeof updateFn === "function" && user?.id != null) {
        // updateUser(id, body) ou changePassword(body)
        if (updateFn === api.changePassword || updateFn === api.updatePassword) {
          await updateFn(payload);
        } else {
          await updateFn(user.id, payload);
        }
      }

      setPasswords({ current: "", nouveau: "", confirm: "" });
      showSaved("Mot de passe mis à jour !");
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail || err?.message;
      alert(
        detail
          ? typeof detail === "string"
            ? detail
            : JSON.stringify(detail)
          : "Impossible de changer le mot de passe. Vérifiez le mot de passe actuel."
      );
    } finally {
      setSaving(false);
    }
  };

  const changeTheme = (t) => {
    setTheme(t);
    sessionStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
    // Notifie le reste de l'app (Navbar / ThemeBackground)
    window.dispatchEvent(new CustomEvent("theme-change", { detail: t }));
    showSaved(`Thème « ${THEME_LABELS[t] || t} » appliqué !`);
  };

  return (
    <div
      className="params-shell"
      style={{
        position: "relative",
        minHeight: "100%",
        width: "100%",
        ...(typeof themeCssVars === "function"
          ? themeCssVars(theme || currentTheme)
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
        <ThemeBackground theme={theme || currentTheme} />
      </div>

      <div
        className="params-page"
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
            <Settings size={30} />
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
            <Settings size={12} /> Paramètres
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
            Paramètres
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
              margin: 0,
              maxWidth: 480,
              lineHeight: 1.55,
            }}
          >
            Profil, sécurité et apparence de votre espace StockFlow.
          </p>
        </div>

        {/* Mini stats */}
        <div
          className="info-band"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.25rem",
          }}
        >
          <InfoCard
            label="COMPTE"
            value={profil.first_name || profil.name || "—"}
            color="var(--gradient-start)"
            icon={<User size={18} />}
          />
          <InfoCard
            label="RÔLE"
            value={profil.role || "—"}
            color="#fbbf24"
            icon={<Shield size={18} />}
          />
          <InfoCard
            label="THÈME"
            value={(THEME_LABELS[theme] || theme).replace(/^[^\s]+\s/, "")}
            color="#a855f7"
            icon={<Palette size={18} />}
          />
        </div>

        {/* TOAST */}
        {saved && (
          <div
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.8rem 1.3rem",
              borderRadius: 14,
              background: "rgba(74,222,128,0.14)",
              border: "1px solid rgba(74,222,128,0.4)",
              color: "#4ade80",
              fontWeight: 600,
              fontSize: "0.88rem",
              boxShadow: "0 10px 35px rgba(0,0,0,0.28)",
              animation: "fadeUp 0.3s ease",
              backdropFilter: "blur(12px)",
            }}
          >
            <Check size={18} /> {saved}
          </div>
        )}

        {/* NAV prev / label / next */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "1rem",
            padding: "0.55rem",
            borderRadius: 20,
            background: "var(--card-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(30px)",
            boxShadow: "0 10px 30px rgba(0,0,0,.12)",
          }}
        >
          <NavArrow
            direction="left"
            disabled={sectionIndex <= 0}
            onClick={goPrev}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                color: "var(--gradient-start)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
              }}
            >
              <currentSection.icon size={20} />
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentSection.label}
              </span>
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              {sectionIndex + 1} / {SECTIONS.length}
            </div>
          </div>
          <NavArrow
            direction="right"
            disabled={sectionIndex >= SECTIONS.length - 1}
            onClick={goNext}
          />
        </div>

        {/* PILLS */}
        <div
          className="params-pills"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
            justifyContent: "center",
            marginBottom: "1.4rem",
          }}
        >
          {SECTIONS.map((s) => {
            const active = section === s.key;
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setSection(s.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.45rem 0.85rem",
                  borderRadius: 999,
                  border: active
                    ? "1px solid transparent"
                    : "1px solid var(--glass-border)",
                  background: active
                    ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                    : "var(--glass-bg)",
                  color: active ? "#fff" : "var(--text-secondary)",
                  fontSize: "0.78rem",
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: active ? "0 6px 20px var(--glow-color)" : "none",
                  transition: "all .3s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <Icon size={13} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* CARTE CONTENU */}
        <div
          style={{
            position: "relative",
            borderRadius: 26,
            background: "var(--card-bg)",
            backdropFilter: "blur(35px)",
            border: "1px solid var(--glass-border)",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,.16)",
            minHeight: 360,
          }}
        >
          {/* PROFIL */}
          {section === "profil" && (
            <form onSubmit={handleSaveProfil}>
              <SectionHeader
                icon={<User size={20} />}
                title="Mon profil"
                sub="Informations personnelles"
              />
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                    marginBottom: "1.75rem",
                    padding: "1rem",
                    borderRadius: 16,
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#fff",
                      fontFamily: "Syne, sans-serif",
                      boxShadow: "0 0 22px var(--glow-color)",
                      flexShrink: 0,
                      border: "1.5px solid rgba(255,255,255,0.28)",
                    }}
                  >
                    {(profil.first_name?.[0] || "") + (profil.name?.[0] || "")}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--text)",
                      }}
                    >
                      {profil.first_name} {profil.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {profil.role || "Utilisateur"} · {profil.email || "—"}
                    </div>
                  </div>
                </div>

                <div
                  className="params-form-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <Field
                    label="Nom *"
                    value={profil.name}
                    onChange={(v) => setProfil({ ...profil, name: v })}
                  />
                  <Field
                    label="Prénom *"
                    value={profil.first_name}
                    onChange={(v) => setProfil({ ...profil, first_name: v })}
                  />
                  <Field
                    label="Post-nom"
                    value={profil.middle_name}
                    onChange={(v) => setProfil({ ...profil, middle_name: v })}
                  />
                  <div>
                    <label style={labelStyle}>Genre</label>
                    <select
                      value={profil.genre}
                      onChange={(e) =>
                        setProfil({ ...profil, genre: e.target.value })
                      }
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Choisir...</option>
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Field
                      label="Email *"
                      type="email"
                      value={profil.email}
                      onChange={(v) => setProfil({ ...profil, email: v })}
                    />
                  </div>
                </div>

                {/* Confirmation mot de passe */}
                <div
                  style={{
                    marginTop: "1.25rem",
                    padding: "1rem",
                    borderRadius: 14,
                    background: "rgba(251,191,36,.08)",
                    border: "1px solid rgba(251,191,36,.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#fbbf24",
                      fontWeight: 700,
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Shield size={14} />
                    Confirmation requise
                  </div>
                  <p
                    style={{
                      margin: "0 0 0.75rem",
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.45,
                    }}
                  >
                    Pour enregistrer les modifications du profil, saisissez
                    votre mot de passe actuel.
                  </p>
                  <label style={labelStyle}>Mot de passe actuel *</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showProfilPw ? "text" : "password"}
                      value={profilPassword}
                      onChange={(e) => setProfilPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ ...inputStyle, paddingRight: "2.8rem" }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowProfilPw(!showProfilPw)}
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
                      }}
                    >
                      {showProfilPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <SaveButton
                  disabled={saving}
                  label={saving ? "Enregistrement…" : "Enregistrer le profil"}
                />
              </div>
            </form>
          )}

          {/* SÉCURITÉ */}
          {section === "securite" && (
            <form onSubmit={handleSavePassword}>
              <SectionHeader
                icon={<Lock size={20} />}
                title="Sécurité"
                sub="Gérez votre mot de passe"
              />
              <div style={{ padding: "1.5rem" }}>
                <InfoBox icon={<Shield size={16} />} color="#60a5fa">
                  Choisissez un mot de passe d&apos;au moins 6 caractères. Le
                  hashage est géré côté serveur.
                </InfoBox>

                {[
                  { key: "current", label: "Mot de passe actuel *" },
                  { key: "nouveau", label: "Nouveau mot de passe *" },
                  {
                    key: "confirm",
                    label: "Confirmer le nouveau mot de passe *",
                  },
                ].map((f) => (
                  <div
                    key={f.key}
                    style={{ marginBottom: "1rem", position: "relative" }}
                  >
                    <label style={labelStyle}>{f.label}</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPw[f.key] ? "text" : "password"}
                        value={passwords[f.key]}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            [f.key]: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        style={{ ...inputStyle, paddingRight: "2.8rem" }}
                        autoComplete={
                          f.key === "current"
                            ? "current-password"
                            : "new-password"
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPw({
                            ...showPw,
                            [f.key]: !showPw[f.key],
                          })
                        }
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
                        }}
                      >
                        {showPw[f.key] ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                {passwords.nouveau && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.4rem",
                        fontWeight: 600,
                      }}
                    >
                      Force du mot de passe
                    </div>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 999,
                        background: "var(--glass-bg)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 999,
                          width:
                            passwords.nouveau.length < 6
                              ? "25%"
                              : passwords.nouveau.length < 8
                              ? "50%"
                              : passwords.nouveau.length < 12
                              ? "75%"
                              : "100%",
                          background:
                            passwords.nouveau.length < 6
                              ? "#f87171"
                              : passwords.nouveau.length < 8
                              ? "#fbbf24"
                              : passwords.nouveau.length < 12
                              ? "#60a5fa"
                              : "#4ade80",
                          transition: "all 0.3s",
                        }}
                      />
                    </div>
                  </div>
                )}

                <SaveButton
                  disabled={saving}
                  label={
                    saving ? "Enregistrement…" : "Changer le mot de passe"
                  }
                />
              </div>
            </form>
          )}

          {/* APPARENCE */}
          {section === "apparence" && (
            <div>
              <SectionHeader
                icon={<Palette size={20} />}
                title="Apparence"
                sub="Thème et affichage"
              />
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: 14,
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Thème actif
                    </div>
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--gradient-start)",
                      }}
                    >
                      {THEME_LABELS[theme] || theme}
                    </div>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      flexShrink: 0,
                      background:
                        "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      boxShadow: "0 4px 16px var(--glow-color)",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Moon size={12} /> Thèmes sombres
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "0.6rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  {themeList
                    .filter((t) => String(t).startsWith("dark"))
                    .map((t) => (
                      <ThemeButton
                        key={t}
                        t={t}
                        current={theme}
                        onChange={changeTheme}
                      />
                    ))}
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Sun size={12} /> Thèmes clairs
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "0.6rem",
                  }}
                >
                  {themeList
                    .filter((t) => String(t).startsWith("light"))
                    .map((t) => (
                      <ThemeButton
                        key={t}
                        t={t}
                        current={theme}
                        onChange={changeTheme}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />

        <style>{`
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 900px) {
  .info-band {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 640px) {
  .params-page { padding: 0 12px 1.5rem !important; }
  .params-form-grid {
    grid-template-columns: 1fr !important;
  }
  .params-pills {
    display: none !important;
  }
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
   SOUS-COMPOSANTS
============================================================ */

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
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 900,
            color: "var(--text)",
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

function NavArrow({ direction, disabled, onClick }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 44,
        height: 44,
        borderRadius: 14,
        border: "1px solid var(--glass-border)",
        background: disabled ? "transparent" : "var(--glass-bg)",
        color: disabled ? "var(--text-secondary)" : "var(--gradient-start)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        flexShrink: 0,
        transition: "all .25s",
        boxShadow: disabled ? "none" : "0 4px 14px rgba(0,0,0,.1)",
      }}
    >
      <Icon size={22} />
    </button>
  );
}

function SectionHeader({ icon, title, sub }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        padding: "1.2rem 1.5rem",
        borderBottom: "1px solid var(--glass-border)",
        color: "var(--gradient-start)",
      }}
    >
      {icon}
      <div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            color: "var(--text)",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

function SaveButton({ label = "Enregistrer les modifications", disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        marginTop: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        borderRadius: 12,
        border: "none",
        background:
          "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.9rem",
        cursor: disabled ? "wait" : "pointer",
        opacity: disabled ? 0.75 : 1,
        boxShadow: "0 4px 20px var(--glow-color)",
      }}
    >
      <Save size={16} /> {label}
    </button>
  );
}

function InfoBox({ icon, color, children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.7rem",
        padding: "0.8rem 1rem",
        borderRadius: 12,
        background: "rgba(96,165,250,0.08)",
        border: "1px solid rgba(96,165,250,0.25)",
        color,
        fontSize: "0.82rem",
        marginBottom: "1.5rem",
        lineHeight: 1.5,
      }}
    >
      <div style={{ flexShrink: 0, marginTop: "0.1rem" }}>{icon}</div>
      <div>{children}</div>
    </div>
  );
}

function ThemeButton({ t, current, onChange }) {
  const isActive = t === current;
  return (
    <button
      type="button"
      onClick={() => onChange(t)}
      style={{
        padding: "0.6rem 0.7rem",
        borderRadius: 12,
        border: "2px solid",
        borderColor: isActive
          ? "var(--gradient-start)"
          : "var(--glass-border)",
        background: isActive ? "var(--glass-bg)" : "transparent",
        color: isActive ? "var(--gradient-start)" : "var(--text-secondary)",
        cursor: "pointer",
        fontSize: "0.78rem",
        fontWeight: isActive ? 700 : 400,
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.3rem",
        textAlign: "left",
      }}
    >
      <span style={{ flex: 1 }}>{THEME_LABELS[t] || t}</span>
      {isActive && <Check size={13} />}
    </button>
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
  transition: "border-color 0.2s",
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

export default Parametres;
