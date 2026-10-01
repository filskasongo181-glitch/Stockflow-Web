// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
// import { login } from "../api/api";
// import ThemeBackground from "../components/ThemeBackground";
// function Login({ setIsAuth }) {
//   const navigate   = useNavigate();
//   const [email,    setEmail]    = useState("");
//   const [password, setPassword] = useState("");
//   const [showPw,   setShowPw]   = useState(false);
//   const [error,    setError]    = useState("");
//   const [loading,  setLoading]  = useState(false);
//   const currentTheme = sessionStorage.getItem("theme") || "dark-galaxy";
//   const isLight      = currentTheme.startsWith("light");
//   const textColor    = isLight ? "#1e1b4b" : "#fff";


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await login(email, password);
//       sessionStorage.setItem("token", res.data.access_token);
//       sessionStorage.setItem("user", JSON.stringify(res.data.user));
//       setIsAuth(true);
//       navigate("/dashboard");
//     } catch {
//       setError("Email ou mot de passe incorrect.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const handleLogin = (e) => {
//   //   e.preventDefault();

//   //   setError("");

//   //   if (password === "12345") {
//   //     setIsAuth(true);
//   //     navigate("/dashboard");
//   //   } else {
//   //     setError("Code incorrect. Utilisez : 12345");
//   //   }
//   // };

//   return (
//     <div style={{
//       height: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       position: "relative",
//       overflow: "hidden",
//     }}>
//       {/* ===== FOND ANIMÉ ===== */}
//       <ThemeBackground theme={currentTheme} />
//       {/* ===== CARTE LOGIN ===== */}
//       <div style={{
//         position: "relative", zIndex: 2,
//         width: 390, marginTop: 60,
//         borderRadius: 25,
//         background: isLight
//           ? "rgba(255,255,255,0.75)"
//           : "rgba(255,255,255,0.07)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255,255,255,0.15)",
//         boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.2)",
//         animation: "slideUp 0.8s ease",
//       }}>
//         {/* Logo cercle */}
//         <div style={{
//           position: "absolute",
//           top: -70, left: "50%",
//           transform: "translateX(-50%)",
//           zIndex: 10,
//         }}>
//           <div style={{
//             position: "absolute", inset: -8, borderRadius: "50%",
//             boxShadow: "0 0 40px rgba(99,102,241,0.6), 0 0 70px rgba(168,85,247,0.4)",
//             animation: "pulseGlow 3s ease-in-out infinite",
//           }} />
//           <div style={{
//             width: 140, height: 140, borderRadius: "50%",
//              background: `
//                 linear-gradient(
//                   145deg,
//                   var(--gradient-start),
//                   var(--accent),
//                   var(--gradient-end),
//                   var(--surface2)
//                   )
//               `,
//             border: "2px solid rgba(255,255,255,0.2)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             position: "relative",
//           }}>

//             {/* Reflet */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 left: 20,
//                 width: 60,
//                 height: 25,
//                 borderRadius: "50%",
//                 background: "var(--glass-border)",
//                 transform: "rotate(-20deg)",
//               }}
//             />
//             <span style={{
//               fontFamily: "Syne, sans-serif",
//               fontWeight: 900, fontSize: "2.2rem",
//               background: "linear-gradient(135deg, #fff, #a5b4fc)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}>SF</span>
//           </div>
//         </div>
//         {/* Contenu */}
//         <div style={{ padding: "100px 35px 35px", textAlign: "center" }}>
//           <h2 style={{
//             color: textColor,
//             fontSize: "1.8rem",
//             fontFamily: "Syne, sans-serif",
//             fontWeight: 800,
//             marginBottom: "0.3rem",
//           }}>Connexion</h2>
//           <p style={{
//             color: isLight ? "rgba(30,27,75,0.55)" : "rgba(200,190,255,0.65)",
//             fontSize: "0.88rem",
//             marginBottom: "1.8rem",
//           }}>Accédez à votre espace de travail</p>
//           {/* Erreur */}
//           {error && (
//             <div style={{
//               background: "rgba(239,68,68,0.12)",
//               border: "1px solid rgba(239,68,68,0.35)",
//               color: "#f87171", borderRadius: 10,
//               padding: "0.6rem 1rem",
//               fontSize: "0.83rem",
//               marginBottom: "1rem",
//               textAlign: "left",
//             }}>⚠ {error}</div>
//           )}
//           <form onSubmit={handleLogin}>
//             {/* Email */}
//             <div style={{ marginBottom: "1rem", textAlign: "left" }}>
//               <label style={labelStyle(isLight)}>Email</label>
//               <div style={{ position: "relative" }}>
//                 <Mail
//                   size={16}
//                   color="rgba(99,102,241,0.6)"
//                   style={{
//                     position: "absolute", left: 14,
//                     top: "50%", transform: "translateY(-50%)",
//                   }}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Votre adresse email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   required
//                   style={inputStyle(isLight)}
//                 />
//               </div>
//             </div>
//             {/* Mot de passe */}
//             <div style={{ marginBottom: "1rem", textAlign: "left" }}>
//               <label style={labelStyle(isLight)}>Mot de passe</label>
//               <div style={{ position: "relative" }}>
//                 <Lock
//                   size={16}
//                   color="rgba(99,102,241,0.6)"
//                   style={{
//                     position: "absolute", left: 14,
//                     top: "50%", transform: "translateY(-50%)",
//                   }}
//                 />
//                 <input
//                   type={showPw ? "text" : "password"}
//                   placeholder="Votre mot de passe"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   required
//                   style={inputStyle(isLight)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPw(!showPw)}
//                   style={{
//                     position: "absolute", right: 14,
//                     top: "50%", transform: "translateY(-50%)",
//                     background: "none", border: "none",
//                     cursor: "pointer",
//                     display: "flex", alignItems: "center",
//                   }}
//                 >
//                   {showPw
//                     ? <EyeOff size={16} color="rgba(99,102,241,0.6)" />
//                     : <Eye    size={16} color="rgba(99,102,241,0.6)" />
//                   }
//                 </button>
//               </div>
//             </div>
//             {/* Options */}
//             <div style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "1.5rem",
//             }}>
//               <label style={{
//                 display: "flex", alignItems: "center",
//                 gap: "0.4rem",
//                 color: isLight ? "rgba(30,27,75,0.6)" : "rgba(200,190,255,0.65)",
//                 fontSize: "0.82rem", cursor: "pointer",
//               }}>
//                 <input type="checkbox" style={{ accentColor: "#6366f1" }} />
//                 Se souvenir de moi
//               </label>
//               <span style={{
//                 color: "#6366f1",
//                 fontSize: "0.82rem",
//                 cursor: "pointer",
//                 fontWeight: 600,
//               }}>
//                 Mot de passe oublié ?
//               </span>
//             </div>
//             {/* Bouton connexion */}
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%", padding: "0.9rem",
//                 borderRadius: 50, border: "none",
//                 background: "linear-gradient(90deg, #6366f1, #a855f7)",
//                 color: "#fff", fontWeight: 700, fontSize: "1rem",
//                 cursor: "pointer",
//                 boxShadow: "0 0 20px rgba(99,102,241,0.4)",
//                 display: "flex", alignItems: "center",
//                 justifyContent: "center", gap: "0.5rem",
//                 transition: "all 0.3s",
//               }}
//             >
//               <LogIn size={18} />
//               {loading ? "Connexion..." : "Se connecter"}
//             </button>
//           </form>
//           {/* Séparateur */}
//           <div style={{
//             display: "flex", alignItems: "center",
//             gap: "1rem", margin: "1.2rem 0",
//           }}>
//             <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.2)" }} />
//             <span style={{
//               color: isLight ? "rgba(30,27,75,0.4)" : "rgba(200,190,255,0.4)",
//               fontSize: "0.82rem",
//             }}>ou</span>
//             <div style={{ flex: 1, height: 1, background: "rgba(99,102,241,0.2)" }} />
//           </div>
//           <p style={{
//             color: isLight ? "rgba(30,27,75,0.6)" : "rgba(200,190,255,0.6)",
//             fontSize: "0.85rem",
//           }}>
//             Pas encore de compte ?{" "}
//             <span
//               onClick={() => navigate("/inscription")}
//               style={{ color: "#6366f1", cursor: "pointer", fontWeight: 600 }}
//             >
//               Créer un compte
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
// // ============================================================
// // STYLES DYNAMIQUES selon light/dark
// // ============================================================
// const inputStyle = (isLight) => ({
//   width: "100%",
//   padding: "13px 14px 13px 42px",
//   borderRadius: 12,
//   border: "1px solid rgba(99,102,241,0.35)",
//   background: isLight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.07)",
//   color: isLight ? "#1e1b4b" : "#fff",
//   fontSize: "0.9rem",
//   outline: "none",
//   backdropFilter: "blur(10px)",
//   transition: "all 0.3s",
// });
// const labelStyle = (isLight) => ({
//   color: isLight ? "rgba(30,27,75,0.8)" : "rgba(200,190,255,0.8)",
//   fontSize: "0.75rem",
//   display: "block",
//   marginBottom: "0.4rem",
//   fontWeight: 600,
// });
// export default Login;


/**
 * Login.jsx — même logique auth, styles alignés thèmes (dark + light colorés)
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { login } from "../api/api";
import ThemeBackground, { themeCssVars } from "../components/ThemeBackground";

function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentTheme = sessionStorage.getItem("theme") || "dark-galaxy";
  const isLight = currentTheme.startsWith("light");
  // Fonds light désormais saturés → texte clair partout pour le contraste
  // const onColorBg = true;
  const textColor = isLight ? "#0f172a" : "#f8fafc";
  const muted = isLight ? "rgba(15,23,42,0.65)" : "rgba(248,250,252,0.72)";
  const cardBg = isLight ? "rgba(255,255,255,0.78)" : "rgba(15,15,25,0.45)";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    const vars = themeCssVars(currentTheme);
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }, [currentTheme]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      sessionStorage.setItem("token", res.data.access_token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setIsAuth(true);
      navigate("/dashboard");
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        ...themeCssVars(currentTheme),
      }}
    >
      <ThemeBackground theme={currentTheme} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: 390,
          maxWidth: "calc(100% - 2rem)",
          marginTop: 60,
          borderRadius: 25,
          // background: "rgba(15, 15, 25, 0.45)",
          background: cardBg,
          backdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35), 0 0 40px var(--glow-color)",
          animation: "slideUp 0.8s ease",
        }}
      >
        {/* Logo cercle */}
        <div
          style={{
            position: "absolute",
            top: -70,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
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
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `linear-gradient(145deg, var(--gradient-start), var(--theme-accent, var(--accent, #6366f1)), var(--gradient-end))`,
              border: "2px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.2)",
            }}
          >
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
              }}
            >
              SF
            </span>
          </div>
        </div>

        <div style={{ padding: "100px 35px 35px", textAlign: "center" }}>
          <h2
            style={{
              color: textColor,
              fontSize: "1.8rem",
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              marginBottom: "0.3rem",
            }}
          >
            Connexion
          </h2>
          <p
            style={{
              color: muted,
              fontSize: "0.88rem",
              marginBottom: "1.8rem",
            }}
          >
            Accédez à votre espace de travail
          </p>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.35)",
                color: "#f87171",
                borderRadius: 10,
                padding: "0.6rem 1rem",
                fontSize: "0.83rem",
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1rem", textAlign: "left" }}>
              <label style={labelStyle}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  color="var(--theme-accent, #a5b4fc)"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.85,
                  }}
                />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1rem", textAlign: "left" }}>
              <label style={labelStyle}>Mot de passe</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="var(--theme-accent, #a5b4fc)"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.85,
                  }}
                />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPw ? (
                    <EyeOff size={16} color="var(--theme-accent, #a5b4fc)" />
                  ) : (
                    <Eye size={16} color="var(--theme-accent, #a5b4fc)" />
                  )}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: muted,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ accentColor: "var(--theme-accent, #6366f1)" }}
                />
                Se souvenir de moi
              </label>
              <span
                style={{
                  color: "var(--theme-accent, #a5b4fc)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Mot de passe oublié ?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
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
                cursor: loading ? "wait" : "pointer",
                boxShadow: "0 0 24px var(--glow-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "all 0.3s",
                opacity: loading ? 0.85 : 1,
              }}
            >
              <LogIn size={18} />
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1.2rem 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <span style={{ color: muted, fontSize: "0.82rem" }}>ou</span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.15)",
              }}
            />
          </div>

          <p style={{ color: muted, fontSize: "0.85rem" }}>
            Pas encore de compte ?{" "}
            <span
              onClick={() => navigate("/inscription")}
              style={{
                color: "var(--theme-accent, #a5b4fc)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Créer un compte
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

const inputStyle = {
  width: "100%",
  padding: "13px 14px 13px 42px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(0,0,0,0.22)",
  color: "#f8fafc",
  fontSize: "0.9rem",
  outline: "none",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s",
  boxSizing: "border-box",
};

const labelStyle = {
  color: "rgba(248,250,252,0.85)",
  fontSize: "0.75rem",
  display: "block",
  marginBottom: "0.4rem",
  fontWeight: 600,
};

export default Login;

