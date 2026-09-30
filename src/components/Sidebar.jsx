// SIDEBAR
import { NavLink } from "react-router-dom";
const links = [
  { to: "/dashboard",   label: "Dashboard",   icon: "📊" },
  { to: "/articles",    label: "Articles",    icon: "📦" },
  { to: "/categories",  label: "Catégories",  icon: "📂" },
  { to: "/entrepots",   label: "Entrepôts",   icon: "🏭" },
  { to: "/mouvements",  label: "Mouvements",  icon: "🔄" },
];
function Sidebar() {
  return (
    <aside
      style={{
        width: "230px",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border)",
        padding: "1rem 0.6rem",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            padding: "0.6rem 1rem",
            borderRadius: "10px",
            marginBottom: "2px",
            textDecoration: "none",
            color: isActive ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
            background: isActive ? "var(--sidebar-active)" : "transparent",
            fontSize: "0.875rem",
          })}
        >
          <span>{link.icon}</span> {link.label}
        </NavLink>
      ))}
    </aside>
  );
}
export default Sidebar;
