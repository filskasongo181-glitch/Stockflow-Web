/**
 * Navbar — structure conservée, couleurs 100% variables de thème
 * (cohérent ThemeBackground : galaxy, oceanic, luxury, etc.)
 */
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Warehouse,
  Package,
  ArrowLeftRight,
  Users,
  Settings,
  BarChart3,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { to: "/categories", label: "Catégories", icon: <Tags size={16} /> },
  { to: "/entrepots", label: "Entrepôts", icon: <Warehouse size={16} /> },
  { to: "/articles", label: "Articles", icon: <Package size={16} /> },
  { to: "/mouvements", label: "Mouvements", icon: <ArrowLeftRight size={16} /> },
  { to: "/users", label: "Users", icon: <Users size={16} /> },
  { to: "/statistiques", label: "Stats", icon: <BarChart3 size={16} /> },
  { to: "/parametres", label: "Paramètres", icon: <Settings size={16} /> },
];

function Navbar({ setIsAuth }) {
  const [open, setOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        // Toujours visible tout en haut
        if (currentScrollY <= 20) {
          setNavbarHidden(false);
        }
        // Scroll vers le bas
        else if (delta > 4) {
          setNavbarHidden(true);
        }
        // Scroll vers le haut
        else if (delta < -4) {
          setNavbarHidden(false);
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let user = { first_name: "", name: "", role: "" };
  try {
    user = JSON.parse(sessionStorage.getItem("user") || "{}") || user;
  } catch (_) {}
  const initiales = (
    `${(user.first_name || "S")[0] || "S"}${(user.name || "F")[0] || "F"}`
  ).toUpperCase();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    if (typeof setIsAuth === "function") setIsAuth(false);
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`sf-navbar ${navbarHidden ? "sf-navbar--hidden" : ""}`}
        style={{
          position: "sticky",
          top: 12,
          zIndex: 1000,
          margin: "12px 16px 0",
          padding: "0.65rem 1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          borderRadius: 22,
          background: "var(--card-bg, rgba(15,15,25,0.55))",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid var(--glass-border, rgba(255,255,255,0.14))",
          boxShadow: `
            0 12px 40px rgba(0,0,0,0.18),
            0 0 28px var(--glow-color, transparent),
            inset 0 1px 0 var(--glass-border, rgba(255,255,255,0.12))
          `,
          overflow: "hidden",
          transform: navbarHidden
            ? "translateY(calc(-100% - 24px))"
            : "translateY(0)",

          opacity: navbarHidden ? 0 : 1,

          transition:
            "transform .45s cubic-bezier(.16,1,.3,1), opacity .3s ease",

          pointerEvents: navbarHidden ? "none" : "auto",
        }}
      >
        <div className="navbar-shine" />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            position: "relative",
            zIndex: 1,
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          <div className="sf-orb sf-orb--nav" style={{ width: 42, height: 42, flexShrink: 0 }}>
            <div className="sf-orb-glow" />
            <div className="sf-orb-core" >
              <div className="sf-orb-shine" />
              <span className="sf-orb-text">SF</span>
            </div>
          </div>
          <div className="navbar-brand-text">
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "1.25rem",
                background:
                  "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              StockFlow
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
              }}
            >
              SMART INVENTORY
            </div>
          </div>
        </div>

        <div className="navbar-divider" />

        {/* Liens desktop */}
        <div
          className="nav-links-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            position: "relative",
            zIndex: 1,
            flex: 1,
            justifyContent: "center",
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.55rem 0.85rem",
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                border: isActive
                  ? "1px solid var(--glass-border)"
                  : "1px solid transparent",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? "var(--gradient-start)"
                  : "var(--text-secondary)",
                background: isActive
                  ? "color-mix(in srgb, var(--gradient-start) 12%, transparent)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 8px 24px rgba(0,0,0,.12), inset 0 1px 0 var(--glass-border)"
                  : "none",
                transition: "all .3s cubic-bezier(.16,1,.3,1)",
                whiteSpace: "nowrap",
              })}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Droite */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            position: "relative",
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          <div
            className="sf-orb sf-orb--avatar"
            title={`${user.first_name || ""} ${user.name || ""}`.trim() || "Profil"}
            style={{ width: 38, height: 38, flexShrink: 0, cursor: "pointer" }}
          >
            <div className="sf-orb-glow" />
            <div className="sf-orb-core">
              <div className="sf-orb-shine" />
              <span className="sf-orb-text" style={{ fontSize: "0.72rem" }}>{initiales}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hamburger-btn"
            style={{
              display: "none",
              background: "var(--glass-bg, var(--card-bg))",
              border: "1px solid var(--glass-border)",
              borderRadius: 8,
              padding: "0.4rem",
              cursor: "pointer",
              color: "var(--text)",
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Overlay + drawer mobile */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "min(280px, 88vw)",
          height: "100vh",
          zIndex: 1002,
          background: "var(--card-bg)",
          backdropFilter: "blur(30px)",
          borderRight: "1px solid var(--glass-border)",
          boxShadow: "8px 0 40px rgba(0,0,0,0.25)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 900,
              fontSize: "1.2rem",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            StockFlow
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              background: "var(--glass-bg, var(--card-bg))",
              border: "1px solid var(--glass-border)",
              borderRadius: 8,
              padding: "0.4rem",
              cursor: "pointer",
              color: "var(--text)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            padding: "0.8rem",
            borderRadius: 12,
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            marginBottom: "1.5rem",
          }}
        >
          <div className="sf-orb sf-orb--avatar" style={{ width: 42, height: 42, flexShrink: 0 }}>
            <div className="sf-orb-glow" />
            <div className="sf-orb-core">
              <div className="sf-orb-shine" />
              <span className="sf-orb-text" style={{ fontSize: "0.8rem" }}>{initiales}</span>
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: "0.88rem",
                color: "var(--text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.first_name} {user.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {user.role || "Utilisateur"}
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            overflowY: "auto",
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.7rem 0.9rem",
                borderRadius: 10,
                textDecoration: "none",
                color: isActive ? "var(--gradient-start)" : "var(--text)",
                background: isActive
                  ? "color-mix(in srgb, var(--gradient-start) 12%, transparent)"
                  : "transparent",
                fontWeight: isActive ? 600 : 400,
                fontSize: "0.88rem",
                transition: "all 0.2s",
              })}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                {link.icon}
                {link.label}
              </div>
              <ChevronRight size={14} style={{ opacity: 0.4 }} />
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0.7rem",
            borderRadius: 10,
            border: "none",
            background: "rgba(239,68,68,0.1)",
            color: "#f87171",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.88rem",
            marginTop: "1rem",
          }}
        >
          ⏻ Déconnexion
        </button>
      </div>

      <style>{`
        .navbar-divider {
          width: 1px;
          height: 32px;
          margin: 0 18px;
          background: linear-gradient(transparent, var(--glass-border), transparent);
          flex-shrink: 0;
        }
        .navbar-shine {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .navbar-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -35%;
          width: 28%;
          height: 100%;
          background: linear-gradient(
            110deg,
            transparent,
            color-mix(in srgb, var(--gradient-start) 35%, transparent),
            transparent
          );
          transform: skewX(-25deg);
          animation: navbarShine 8s linear infinite;
        }
        .nav-links-desktop a {
          position: relative;
        }
        .nav-links-desktop a.active::after,
        .nav-links-desktop a[aria-current="page"]::after {
          content: "";
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 35%;
          height: 3px;
          border-radius: 10px;
          background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
          box-shadow: 0 0 12px var(--gradient-start);
        }
        .nav-links-desktop a:hover {
          background: color-mix(in srgb, var(--gradient-start) 8%, transparent) !important;
          color: var(--gradient-start) !important;
          transform: translateY(-2px);
        }
        .nav-links-desktop::-webkit-scrollbar { display: none; }

        @media (max-width: 1100px) {
          .nav-links-desktop span { display: none; }
          .nav-links-desktop a { padding: 0.55rem 0.65rem !important; }
        }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .navbar-divider { display: none; }
          .sf-navbar { margin: 8px 10px 0 !important; }
        }

        /* ===== SF ORB (même identité Accueil / Login) ===== */
        .sf-orb {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sf-orb-glow {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--glow-color), transparent 70%);
          animation: sfOrbPulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .sf-orb-core {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            var(--gradient-start),
            var(--theme-accent, var(--gradient-end)),
            var(--gradient-end)
          );
          border: 1.5px solid rgba(255,255,255,0.28);
          box-shadow:
            0 6px 18px var(--glow-color),
            inset 0 1px 2px rgba(255,255,255,0.35),
            inset 0 -6px 12px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .sf-orb-shine {
          position: absolute;
          top: 12%;
          left: 16%;
          width: 42%;
          height: 28%;
          border-radius: 50%;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.65),
            rgba(255,255,255,0.05)
          );
          transform: rotate(-18deg);
          pointer-events: none;
          animation: sfOrbShine 8s ease-in-out infinite;
        }
        .sf-orb-text {
          position: relative;
          z-index: 1;
          font-family: Syne, sans-serif;
          font-weight: 900;
          font-size: 0.9rem;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.25);
          letter-spacing: -0.02em;
        }
        @keyframes sfOrbPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes sfOrbShine {
          0%, 100% { opacity: 0.75; transform: rotate(-18deg) translateX(0); }
          50% { opacity: 1; transform: rotate(-18deg) translateX(3px); }
        }

        @keyframes navbarShine {
          0% { left: -35%; }
          100% { left: 140%; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
