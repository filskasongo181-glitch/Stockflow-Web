// /**
//  * MessageBox — notifications pro StockFlow (web)
//  * Types: success | error | warning | info | confirm
//  *
//  * Usage:
//  *   import { useMessageBox, MessageHost } from "../components/MessageBox";
//  *   const msg = useMessageBox();
//  *   msg.success("Catégorie créée", "La catégorie « Papeterie » a été enregistrée.");
//  *   const ok = await msg.confirm("Supprimer ?", "Cette action est irréversible.");
//  */

// import {
//   createContext,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
//   useEffect,
// } from "react";
// import {
//   CheckCircle2,
//   XCircle,
//   AlertTriangle,
//   Info,
//   X,
// } from "lucide-react";

// const Ctx = createContext(null);

// const TONES = {
//   success: {
//     icon: CheckCircle2,
//     accent: "#4ade80",
//     bg: "rgba(74,222,128,0.12)",
//     border: "rgba(74,222,128,0.4)",
//   },
//   error: {
//     icon: XCircle,
//     accent: "#f87171",
//     bg: "rgba(248,113,113,0.12)",
//     border: "rgba(248,113,113,0.4)",
//   },
//   warning: {
//     icon: AlertTriangle,
//     accent: "#fbbf24",
//     bg: "rgba(251,191,36,0.12)",
//     border: "rgba(251,191,36,0.4)",
//   },
//   info: {
//     icon: Info,
//     accent: "#60a5fa",
//     bg: "rgba(96,165,250,0.12)",
//     border: "rgba(96,165,250,0.4)",
//   },
// };

// export function MessageProvider({ children }) {
//   const [toasts, setToasts] = useState([]);
//   const [confirmState, setConfirmState] = useState(null);

//   const push = useCallback((type, title, detail = "", duration = 4200) => {
//     const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
//     setToasts((t) => [...t, { id, type, title, detail }]);
//     if (duration > 0) {
//       setTimeout(() => {
//         setToasts((t) => t.filter((x) => x.id !== id));
//       }, duration);
//     }
//     return id;
//   }, []);

//   const dismiss = useCallback((id) => {
//     setToasts((t) => t.filter((x) => x.id !== id));
//   }, []);

//   const success = useCallback((title, detail) => push("success", title, detail), [push]);
//   const error = useCallback((title, detail) => push("error", title, detail, 6000), [push]);
//   const warning = useCallback((title, detail) => push("warning", title, detail), [push]);
//   const info = useCallback((title, detail) => push("info", title, detail), [push]);

//   const confirm = useCallback((title, detail = "") => {
//     return new Promise((resolve) => {
//       setConfirmState({
//         title,
//         detail,
//         resolve: (v) => {
//           setConfirmState(null);
//           resolve(v);
//         },
//       });
//     });
//   }, []);

//   const api = useMemo(
//     () => ({ success, error, warning, info, confirm, dismiss }),
//     [success, error, warning, info, confirm, dismiss]
//   );

//   return (
//     <Ctx.Provider value={api}>
//       {children}
//       <MessageHost toasts={toasts} onDismiss={dismiss} confirmState={confirmState} />
//     </Ctx.Provider>
//   );
// }

// export function useMessageBox() {
//   const ctx = useContext(Ctx);
//   if (!ctx) {
//     // fallback si Provider absent
//     return {
//       success: (t, d) => window.alert(`${t}\n${d || ""}`),
//       error: (t, d) => window.alert(`${t}\n${d || ""}`),
//       warning: (t, d) => window.alert(`${t}\n${d || ""}`),
//       info: (t, d) => window.alert(`${t}\n${d || ""}`),
//       confirm: async (t, d) => window.confirm(`${t}\n${d || ""}`),
//       dismiss: () => {},
//     };
//   }
//   return ctx;
// }

// function MessageHost({ toasts, onDismiss, confirmState }) {
//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: 16,
//           right: 16,
//           zIndex: 9999,
//           display: "flex",
//           flexDirection: "column",
//           gap: 10,
//           maxWidth: "min(420px, calc(100vw - 24px))",
//           pointerEvents: "none",
//         }}
//       >
//         {toasts.map((t) => {
//           const tone = TONES[t.type] || TONES.info;
//           const Icon = tone.icon;
//           return (
//             <div
//               key={t.id}
//               style={{
//                 pointerEvents: "auto",
//                 display: "flex",
//                 gap: 12,
//                 alignItems: "flex-start",
//                 padding: "14px 16px",
//                 borderRadius: 16,
//                 background: "var(--glass-bg, rgba(20,24,40,0.92))",
//                 border: `1px solid ${tone.border}`,
//                 boxShadow: `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${tone.bg}`,
//                 backdropFilter: "blur(16px)",
//                 animation: "msgSlideIn 0.28s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 10,
//                   display: "grid",
//                   placeItems: "center",
//                   background: tone.bg,
//                   flexShrink: 0,
//                 }}
//               >
//                 <Icon size={20} color={tone.accent} />
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontWeight: 800, color: "var(--text, #fff)", fontSize: "0.95rem" }}>
//                   {t.title}
//                 </div>
//                 {t.detail ? (
//                   <div
//                     style={{
//                       marginTop: 4,
//                       fontSize: "0.85rem",
//                       color: "var(--text-secondary, #aab)",
//                       lineHeight: 1.4,
//                     }}
//                   >
//                     {t.detail}
//                   </div>
//                 ) : null}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => onDismiss(t.id)}
//                 style={{
//                   border: "none",
//                   background: "transparent",
//                   color: "var(--text-secondary, #888)",
//                   cursor: "pointer",
//                   padding: 4,
//                 }}
//                 aria-label="Fermer"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {confirmState && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 10000,
//             background: "rgba(0,0,0,0.55)",
//             backdropFilter: "blur(6px)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 16,
//           }}
//           onClick={() => confirmState.resolve(false)}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "min(420px, 100%)",
//               borderRadius: 20,
//               padding: "1.35rem 1.4rem",
//               background: "var(--glass-bg, #1a1f2e)",
//               border: "1px solid var(--glass-border, rgba(255,255,255,0.12))",
//               boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
//             }}
//           >
//             <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
//               <AlertTriangle size={22} color="#fbbf24" />
//               <h3 style={{ margin: 0, color: "var(--text, #fff)", fontSize: "1.1rem" }}>
//                 {confirmState.title}
//               </h3>
//             </div>
//             {confirmState.detail ? (
//               <p style={{ margin: "0 0 1.2rem", color: "var(--text-secondary, #aab)", lineHeight: 1.45 }}>
//                 {confirmState.detail}
//               </p>
//             ) : (
//               <div style={{ height: 12 }} />
//             )}
//             <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//               <button
//                 type="button"
//                 onClick={() => confirmState.resolve(false)}
//                 style={btnGhost}
//               >
//                 Annuler
//               </button>
//               <button
//                 type="button"
//                 onClick={() => confirmState.resolve(true)}
//                 style={btnDanger}
//               >
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
// @keyframes msgSlideIn {
//   from { opacity: 0; transform: translateX(18px); }
//   to { opacity: 1; transform: translateX(0); }
// }
// `}</style>
//     </>
//   );
// }

// const btnGhost = {
//   padding: "0.55rem 1rem",
//   borderRadius: 12,
//   border: "1px solid var(--glass-border, rgba(255,255,255,0.15))",
//   background: "transparent",
//   color: "var(--text, #fff)",
//   fontWeight: 600,
//   cursor: "pointer",
// };

// const btnDanger = {
//   padding: "0.55rem 1rem",
//   borderRadius: 12,
//   border: "none",
//   background: "linear-gradient(135deg, #f87171, #ef4444)",
//   color: "#fff",
//   fontWeight: 700,
//   cursor: "pointer",
// };

// export default MessageProvider;




/**
 * MessageBox — notifications pro StockFlow (web)
 * Types: success | error | warning | info | confirm
 *
 * Usage:
 *   import { useMessageBox, MessageHost } from "../components/MessageBox";
 *   const msg = useMessageBox();
 *   msg.success("Catégorie créée", "La catégorie « Papeterie » a été enregistrée.");
 *   const ok = await msg.confirm("Supprimer ?", "Cette action est irréversible.");
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const Ctx = createContext(null);

const TONES = {
  success: {
    icon: CheckCircle2,
    accent: "#4ade80",
    bg: "rgba(74,222,128,0.12)",
    border: "rgba(74,222,128,0.4)",
  },
  error: {
    icon: XCircle,
    accent: "#f87171",
    bg: "rgba(248,113,113,0.12)",
    border: "rgba(248,113,113,0.4)",
  },
  warning: {
    icon: AlertTriangle,
    accent: "#fbbf24",
    bg: "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.4)",
  },
  info: {
    icon: Info,
    accent: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.4)",
  },
};

export function MessageProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);

  const push = useCallback((type, title, detail = "", duration = 4200) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setToasts((t) => [...t, { id, type, title, detail }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const success = useCallback((title, detail) => push("success", title, detail), [push]);
  const error = useCallback((title, detail) => push("error", title, detail, 6000), [push]);
  const warning = useCallback((title, detail) => push("warning", title, detail), [push]);
  const info = useCallback((title, detail) => push("info", title, detail), [push]);

  const confirm = useCallback((title, detail = "") => {
    return new Promise((resolve) => {
      setConfirmState({
        title,
        detail,
        resolve: (v) => {
          setConfirmState(null);
          resolve(v);
        },
      });
    });
  }, []);

  const api = useMemo(
    () => ({ success, error, warning, info, confirm, dismiss }),
    [success, error, warning, info, confirm, dismiss]
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      <MessageHost toasts={toasts} onDismiss={dismiss} confirmState={confirmState} />
    </Ctx.Provider>
  );
}

export function useMessageBox() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // fallback si Provider absent
    return {
      success: (t, d) => window.alert(`${t}\n${d || ""}`),
      error: (t, d) => window.alert(`${t}\n${d || ""}`),
      warning: (t, d) => window.alert(`${t}\n${d || ""}`),
      info: (t, d) => window.alert(`${t}\n${d || ""}`),
      confirm: async (t, d) => window.confirm(`${t}\n${d || ""}`),
      dismiss: () => {},
    };
  }
  return ctx;
}

function MessageHost({ toasts, onDismiss, confirmState }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: "min(420px, calc(100vw - 24px))",
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => {
          const tone = TONES[t.type] || TONES.info;
          const Icon = tone.icon;
          return (
            <div
              key={t.id}
              style={{
                pointerEvents: "auto",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "14px 16px",
                borderRadius: 16,
                background: "var(--glass-bg, rgba(20,24,40,0.92))",
                border: `1px solid ${tone.border}`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${tone.bg}`,
                backdropFilter: "blur(16px)",
                animation: "msgSlideIn 0.28s ease-out",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: tone.bg,
                  flexShrink: 0,
                }}
              >
                <Icon size={20} color={tone.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, color: "var(--text, #fff)", fontSize: "0.95rem" }}>
                  {t.title}
                </div>
                {t.detail ? (
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: "0.85rem",
                      color: "var(--text-secondary, #aab)",
                      lineHeight: 1.4,
                    }}
                  >
                    {t.detail}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onDismiss(t.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--text-secondary, #888)",
                  cursor: "pointer",
                  padding: 4,
                }}
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {confirmState && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => confirmState.resolve(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(420px, 100%)",
              borderRadius: 20,
              padding: "1.35rem 1.4rem",
              background: "var(--glass-bg, #1a1f2e)",
              border: "1px solid var(--glass-border, rgba(255,255,255,0.12))",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <AlertTriangle size={22} color="#fbbf24" />
              <h3 style={{ margin: 0, color: "var(--text, #fff)", fontSize: "1.1rem" }}>
                {confirmState.title}
              </h3>
            </div>
            {confirmState.detail ? (
              <p style={{ margin: "0 0 1.2rem", color: "var(--text-secondary, #aab)", lineHeight: 1.45 }}>
                {confirmState.detail}
              </p>
            ) : (
              <div style={{ height: 12 }} />
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => confirmState.resolve(false)}
                style={btnGhost}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => confirmState.resolve(true)}
                style={btnDanger}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
@keyframes msgSlideIn {
  from { opacity: 0; transform: translateX(18px); }
  to { opacity: 1; transform: translateX(0); }
}
`}</style>
    </>
  );
}

const btnGhost = {
  padding: "0.55rem 1rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border, rgba(255,255,255,0.15))",
  background: "transparent",
  color: "var(--text, #fff)",
  fontWeight: 600,
  cursor: "pointer",
};

const btnDanger = {
  padding: "0.55rem 1rem",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg, #f87171, #ef4444)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

export default MessageProvider;
