// // INSCRIPTION 
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Send, CheckCircle } from "lucide-react";
// const WHATSAPP_NUMBER = "243845524464"; // ← Remplace par ton numéro
// function Inscription() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     nom: "", prenom: "", genre: "",
//     email: "", role: "", password: "", confirm: "",
//   });
//   const [sent, setSent] = useState(false);
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirm) {
//       alert("Les mots de passe ne correspondent pas.");
//       return;
//     }
//     const message = `
// 🆕 *NOUVELLE DEMANDE — StockFlow*
// 👤 Nom : ${form.nom}
// 👤 Prénom : ${form.prenom}
// ⚧ Genre : ${form.genre}
// 📧 Email : ${form.email}
// 🎭 Rôle souhaité : ${form.role}
// 🔑 Mot de passe : ${form.password}
//     `.trim();
// window.open(
//       `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
//       "_blank"
//     );
//     setSent(true);
//   };
//   return (
//     <div style={{
//       minHeight: "100vh", display: "flex",
//       alignItems: "center", justifyContent: "center",
//       background: "linear-gradient(135deg, #050818 0%, #0d0628 40%, #1a0540 70%, #0a1628 100%)",
//       padding: "2rem", position: "relative", overflow: "hidden",
//     }}>
//       <div style={{
//         position: "absolute", inset: 0, pointerEvents: "none",
//         background: `
//           radial-gradient(circle at 20% 30%, rgba(99,102,241,0.1), transparent 35%),
//           radial-gradient(circle at 80% 70%, rgba(168,85,247,0.12), transparent 35%)
//         `,
//       }} />
//       <div style={{
//         position: "relative", width: "100%", maxWidth: 460, marginTop: 60,
//         borderRadius: 25,
//         background: "rgba(255,255,255,0.07)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255,255,255,0.12)",
//         boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.2)",
//         animation: "slideUp 0.8s ease",
//       }}>
//         {/* Logo */}
//         <div style={{
//           position: "absolute", top: -70, left: "50%",
//           transform: "translateX(-50%)",
//           width: 140, height: 140, borderRadius: "50%",
//           background: "linear-gradient(145deg, #6366f1, #a855f7)",
//           border: "2px solid rgba(255,255,255,0.15)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           zIndex: 10,
//         }}>
//           <div style={{
//             position: "absolute", inset: -8, borderRadius: "50%",
//             boxShadow: "0 0 40px rgba(99,102,241,0.6), 0 0 70px rgba(168,85,247,0.4)",
//             animation: "pulseGlow 3s ease-in-out infinite",
//           }} />
//           <span style={{
//             fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "2.2rem",
//             background: "linear-gradient(135deg, #fff, #a5b4fc)",
//             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//             position: "relative", zIndex: 1,
//           }}>SF</span>
//         </div>
//         <div style={{ padding: "100px 35px 35px", textAlign: "center" }}>
//           <h2 style={{
//             color: "#fff", fontSize: "1.6rem",
//             fontFamily: "Syne, sans-serif", fontWeight: 800,
//             textShadow: "0 0 20px rgba(99,102,241,0.5)",
//             marginBottom: "0.3rem",
//           }}>Demande d'inscription</h2>
//           <p style={{
//             color: "rgba(200,190,255,0.65)", fontSize: "0.85rem",
//             marginBottom: "1.8rem",
//           }}>
//             Votre demande sera envoyée à l'administrateur
//           </p>
//           {sent ? (
//             <div style={{
//               background: "rgba(74,222,128,0.1)",
//               border: "1px solid rgba(74,222,128,0.35)",
//               borderRadius: 12, padding: "1.5rem", color: "#4ade80",
//             }}>
//               <CheckCircle size={40} style={{ marginBottom: "0.5rem" }} />
//               <p style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
//                 Demande envoyée !
//               </p>
//               <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
//                 L'administrateur va traiter votre demande.
//               </p>
//               <button onClick={() => navigate("/login")} style={{
//                 marginTop: "1rem", padding: "0.7rem 1.5rem",
//                 borderRadius: 50, border: "none",
//                 background: "linear-gradient(90deg, #6366f1, #a855f7)",
//                 color: "#fff", fontWeight: 700, cursor: "pointer",
//               }}>Retour à la connexion</button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
//                 <Field label="Nom" name="nom" value={form.nom} onChange={handleChange} />
//                 <Field label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} />
//               </div>
//               <div style={{ margin: "1rem 0", textAlign: "left" }}>
//                 <label style={labelStyle}>Genre</label>
//                 <select name="genre" value={form.genre} onChange={handleChange} required style={selectStyle}>
//                   <option value="">Choisir...</option>
//                   <option>Masculin</option>
//                   <option>Féminin</option>
//                   <option>Autre</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: "1rem" }}>
//                 <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
//               </div>
//               <div style={{ marginBottom: "1rem", textAlign: "left" }}>
//                 <label style={labelStyle}>Rôle souhaité</label>
//                 <select name="role" value={form.role} onChange={handleChange} required style={selectStyle}>
//                   <option value="">Choisir un rôle...</option>
//                   <option>Gestionnaire</option>
//                   <option>Opérateur</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: "1rem" }}>
//                 <Field label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} />
//               </div>
//               <div style={{ marginBottom: "1.5rem" }}>
//                 <Field label="Confirmer le mot de passe" name="confirm" type="password" value={form.confirm} onChange={handleChange} />
//               </div>
//               <button type="submit" style={{
//                 width: "100%", padding: "0.9rem", borderRadius: 50, border: "none",
//                 background: "linear-gradient(90deg, #6366f1, #a855f7)",
//                 color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer",
//                 boxShadow: "0 0 20px rgba(99,102,241,0.4)",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
//               }}>
//                 <Send size={18} /> Envoyer la demande
//               </button>
//             </form>
//           )}
//           <p style={{ marginTop: "1.2rem", color: "rgba(200,190,255,0.6)", fontSize: "0.85rem" }}>
//             Déjà un compte ?{" "}
//             <span onClick={() => navigate("/login")}
//               style={{ color: "#818cf8", cursor: "pointer", fontWeight: 600 }}>
//               Se connecter
//             </span>
//           </p>
//         </div>
//       </div>
//       <style>{`
//         @keyframes pulseGlow {
//           0%, 100% { opacity: 0.6; transform: scale(1); }
//           50%       { opacity: 1;   transform: scale(1.1); }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(50px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }
// function Field({ label, name, type = "text", value, onChange }) {
//   return (
//     <div style={{ textAlign: "left" }}>
//       <label style={labelStyle}>{label}</label>
//       <input
//         type={type} name={name} value={value}
//         onChange={onChange} required
//         style={inputStyle}
//       />
//     </div>
//   );
// }
// const inputStyle = {
//   width: "100%", padding: "12px 14px", borderRadius: 12,
//   border: "1px solid rgba(99,102,241,0.35)",
//   background: "rgba(255,255,255,0.07)",
//   color: "#fff", fontSize: "0.88rem", outline: "none",
//   backdropFilter: "blur(10px)",
// };
// const selectStyle = {
//   ...inputStyle,
//   cursor: "pointer",
// };
// const labelStyle = {
//   color: "rgba(200,190,255,0.8)", fontSize: "0.75rem",
//   display: "block", marginBottom: "0.35rem",
//   fontWeight: 600, textAlign: "left",
// };
// export default Inscription;


/**
 * Inscription.jsx — demande via WhatsApp (logique inchangée)
 * Style aligné Accueil / Login + ThemeBackground
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle } from "lucide-react";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";

const WHATSAPP_NUMBER = "243845524464"; // ← ton numéro

function Inscription() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    genre: "",
    email: "",
    role: "",
    password: "",
    confirm: "",
  });
  const [sent, setSent] = useState(false);

  const currentTheme = sessionStorage.getItem("theme") || "dark-galaxy";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    const vars = themeCssVars(currentTheme);
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }, [currentTheme]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const message = `
🆕 *NOUVELLE DEMANDE — StockFlow*
👤 Nom : ${form.nom}
👤 Prénom : ${form.prenom}
⚧ Genre : ${form.genre}
📧 Email : ${form.email}
🎭 Rôle souhaité : ${form.role}
🔑 Mot de passe : ${form.password}
`.trim();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSent(true);
  };

  const muted = "rgba(248,250,252,0.72)";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        ...themeCssVars(currentTheme),
      }}
    >
      <ThemeBackground theme={currentTheme} />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 460,
          marginTop: 60,
          borderRadius: 25,
          background: "rgba(15, 15, 25, 0.45)",
          backdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35), 0 0 40px var(--glow-color)",
          animation: "slideUp 0.8s ease",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: -70,
            left: "50%",
            transform: "translateX(-50%)",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background:
              "linear-gradient(145deg, var(--gradient-start), var(--theme-accent, #6366f1), var(--gradient-end))",
            border: "2px solid rgba(255,255,255,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              boxShadow:
                "0 0 40px var(--glow-color), 0 0 70px var(--glow-color)",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 20,
              width: 60,
              height: 25,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.35)",
              transform: "rotate(-20deg)",
            }}
          />
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: "2.2rem",
              background: "linear-gradient(135deg, #fff, #e0e7ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              zIndex: 1,
            }}
          >
            SF
          </span>
        </div>

        <div style={{ padding: "100px 35px 35px", textAlign: "center" }}>
          <h2
            style={{
              color: "#f8fafc",
              fontSize: "1.6rem",
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              textShadow: "0 0 20px var(--glow-color)",
              marginBottom: "0.3rem",
            }}
          >
            Demande d&apos;inscription
          </h2>
          <p
            style={{
              color: muted,
              fontSize: "0.85rem",
              marginBottom: "1.8rem",
            }}
          >
            Votre demande sera envoyée à l&apos;administrateur
          </p>

          {sent ? (
            <div
              style={{
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.35)",
                borderRadius: 12,
                padding: "1.5rem",
                color: "#4ade80",
              }}
            >
              <CheckCircle size={40} style={{ marginBottom: "0.5rem" }} />
              <p style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
                Demande envoyée !
              </p>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                L&apos;administrateur va traiter votre demande.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  marginTop: "1rem",
                  padding: "0.7rem 1.5rem",
                  borderRadius: 50,
                  border: "none",
                  background:
                    "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 20px var(--glow-color)",
                }}
              >
                Retour à la connexion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <Field
                  label="Nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                />
                <Field
                  label="Prénom"
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                />
              </div>

              <div style={{ margin: "1rem 0", textAlign: "left" }}>
                <label style={labelStyle}>Genre</label>
                <select
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="">Choisir...</option>
                  <option>Masculin</option>
                  <option>Féminin</option>
                  <option>Autre</option>
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label style={labelStyle}>Rôle souhaité</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="">Choisir un rôle...</option>
                  <option>Gestionnaire</option>
                  <option>Opérateur</option>
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <Field
                  label="Mot de passe"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <Field
                  label="Confirmer le mot de passe"
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: 50,
                  border: "none",
                  background:
                    "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 0 24px var(--glow-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Send size={18} /> Envoyer la demande
              </button>
            </form>
          )}

          <p style={{ marginTop: "1.2rem", color: muted, fontSize: "0.85rem" }}>
            Déjà un compte ?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "var(--theme-accent, #a5b4fc)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Se connecter
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange }) {
  return (
    <div style={{ textAlign: "left" }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        style={inputStyle}
      />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(0,0,0,0.22)",
  color: "#f8fafc",
  fontSize: "0.88rem",
  outline: "none",
  backdropFilter: "blur(10px)",
  boxSizing: "border-box",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};

const labelStyle = {
  color: "rgba(248,250,252,0.85)",
  fontSize: "0.75rem",
  display: "block",
  marginBottom: "0.35rem",
  fontWeight: 600,
  textAlign: "left",
};

export default Inscription;
