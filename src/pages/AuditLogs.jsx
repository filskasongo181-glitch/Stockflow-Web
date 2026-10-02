/**
 * Journal d'audit (logs) — même identité que Mouvements
 * Regroupement par date · Visualiser · Détail / Détail All
 * Lecture seule (pas d'ajout / modification / suppression)
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ScrollText,
  Eye,
  ExternalLink,
  Calendar,
  X,
  User,
  Activity,
  Layers,
} from "lucide-react";
import ThemeBackground from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const { getAuditLogs, getUsers } = api;

const safeGet = (fn) =>
  typeof fn === "function"
    ? fn().catch(() => ({ data: [] }))
    : Promise.resolve({ data: [] });

/* ========== DATES ========== */
function dateKey(row) {
  return (
    (row.created_at || row.date || row.update_at || "")
      .toString()
      .slice(0, 10) || "—"
  );
}

function formatDateFr(iso) {
  if (!iso || iso === "—") return "—";
  const s = String(iso).slice(0, 10);
  const parts = s.split("-");
  if (parts.length !== 3) return s;
  const [y, m, d] = parts;
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const mi = parseInt(m, 10) - 1;
  if (mi < 0 || mi > 11) return s;
  return `${parseInt(d, 10)} ${mois[mi]} ${y}`;
}

function groupByDate(rows) {
  const map = {};
  for (const r of rows) {
    const d = dateKey(r);
    if (!map[d]) map[d] = [];
    map[d].push(r);
  }
  return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

/* ========== STYLES ========== */
const btnGhost = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "0.55rem 0.95rem",
  borderRadius: 12,
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  color: "var(--gradient-start)",
  fontWeight: 700,
  fontSize: "0.8rem",
  cursor: "pointer",
};

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
          boxShadow: `0 6px 16px color-mix(in srgb, ${color} 40%, transparent)`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {icon}
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

function DateCard({ date, dateLabel, rows, onVisualiser, onDetails }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="mvt-date-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        padding: "1.25rem 1.3rem",
        background: `
          linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
          var(--card-bg)
        `,
        backdropFilter: "blur(35px)",
        border: hover
          ? "1px solid rgba(255,255,255,.25)"
          : "1px solid var(--glass-border)",
        boxShadow: hover
          ? "0 25px 60px rgba(0,0,0,.22), 0 0 35px var(--glow-color)"
          : "0 8px 25px rgba(0,0,0,.10)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
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
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hover
                ? "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"
                : "var(--glass-bg)",
              color: hover ? "#fff" : "var(--gradient-start)",
              border: "1px solid var(--glass-border)",
              flexShrink: 0,
              boxShadow: hover ? "0 10px 28px var(--glow-color)" : "none",
              transition: "all .35s",
            }}
          >
            <Calendar size={22} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "var(--text)",
              }}
            >
              {dateLabel || formatDateFr(date)}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                marginTop: 2,
              }}
            >
              {date}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: 4,
              }}
            >
              {rows.length} événement{rows.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={onVisualiser} style={btnGhost}>
            <Eye size={15} /> Visualiser
          </button>
          <button
            type="button"
            onClick={onDetails}
            style={{
              ...btnGhost,
              border: "1px solid transparent",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              boxShadow: "0 6px 18px var(--glow-color)",
            }}
          >
            <ExternalLink size={14} /> Détails
          </button>
        </div>
      </div>

      <style>{`
.mvt-date-card .neon-corner {
  position: absolute; width: 28px; height: 28px;
  opacity: 0; transition: opacity .4s ease, transform .45s;
  pointer-events: none; z-index: 2;
}
.mvt-date-card:hover .neon-corner { opacity: 1; }
.mvt-date-card .neon-corner.top-left {
  top: 0; left: 0;
  border-top: 2px solid var(--gradient-start);
  border-left: 2px solid var(--gradient-start);
  border-top-left-radius: 26px;
}
.mvt-date-card .neon-corner.top-right {
  top: 0; right: 0;
  border-top: 2px solid var(--gradient-end);
  border-right: 2px solid var(--gradient-end);
  border-top-right-radius: 26px;
}
.mvt-date-card .neon-corner.bottom-left {
  bottom: 0; left: 0;
  border-bottom: 2px solid var(--gradient-end);
  border-left: 2px solid var(--gradient-end);
  border-bottom-left-radius: 26px;
}
.mvt-date-card .neon-corner.bottom-right {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--gradient-start);
  border-right: 2px solid var(--gradient-start);
  border-bottom-right-radius: 26px;
}
.mvt-date-card:hover .top-left { transform: translate(4px, 4px); }
.mvt-date-card:hover .top-right { transform: translate(-4px, 4px); }
.mvt-date-card:hover .bottom-left { transform: translate(4px, -4px); }
.mvt-date-card:hover .bottom-right { transform: translate(-4px, -4px); }
`}</style>
    </div>
  );
}

export default function AuditLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [detailsDate, setDetailsDate] = useState(null);

  const charger = async () => {
    setLoading(true);
    try {
      const [l, u] = await Promise.all([
        safeGet(getAuditLogs),
        safeGet(getUsers),
      ]);
      setLogs((l.data || []).filter((x) => Number(x.deleted ?? 0) === 0));
      setUsers(u.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const userMap = useMemo(() => {
    const m = {};
    (users || []).forEach((u) => {
      m[u.id] = [u.first_name, u.name].filter(Boolean).join(" ") || u.email || `#${u.id}`;
    });
    return m;
  }, [users]);

  const filtered = useMemo(() => {
    const q = searchText.toLowerCase().trim();
    if (!q) return logs;
    return logs.filter((r) => {
      const user = (userMap[r.user_id] || "").toLowerCase();
      return (
        String(r.action || "").toLowerCase().includes(q) ||
        String(r.details || "").toLowerCase().includes(q) ||
        user.includes(q) ||
        String(r.user_id || "").includes(q)
      );
    });
  }, [logs, searchText, userMap]);

  const groupes = useMemo(() => groupByDate(filtered), [filtered]);

  const groupesFiltres = useMemo(() => {
    const q = searchDate.toLowerCase().trim();
    if (!q) return groupes;
    return groupes.filter(([date]) => {
      const iso = date.toLowerCase();
      const fr = formatDateFr(date).toLowerCase();
      return iso.includes(q) || fr.includes(q);
    });
  }, [groupes, searchDate]);

  const detailsRows = useMemo(() => {
    if (!detailsDate) return [];
    return filtered.filter((r) => dateKey(r) === detailsDate);
  }, [filtered, detailsDate]);

  const goDetailDate = (date) => {
    // clé date pour la page détails (à brancher demain)
    navigate(`/details/audit/${encodeURIComponent(date)}`);
  };

  const goDetailAll = () => {
    navigate("/details-carousel/audit/all");
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <ThemeBackground />
      <div
        className="mouvements-page"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.5rem 20px 2rem",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "0.4rem 0.85rem",
              borderRadius: 999,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--gradient-start)",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            <ScrollText size={14} /> Journal d&apos;audit
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 900,
              color: "var(--text)",
            }}
          >
            Journal d&apos;appel
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
            }}
          >
            Traçabilité des actions — regroupées par date (lecture seule)
          </p>
        </div>

        {/* ACTIONS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: "1.25rem",
            alignItems: "center",
          }}
        >
          <div
            className="search-bar"
            style={{
              flex: "1 1 220px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0.65rem 1rem",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
            }}
          >
            <Search size={16} color="var(--text-secondary)" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Action, détail, utilisateur…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--text)",
                fontSize: "0.9rem",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0.65rem 1rem",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              minWidth: 180,
            }}
          >
            <Calendar size={16} color="var(--text-secondary)" />
            <input
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Filtrer date…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--text)",
                fontSize: "0.9rem",
              }}
            />
          </div>
          <button
            type="button"
            className="btn-detail-all"
            onClick={goDetailAll}
            style={{
              ...btnGhost,
              border: "1px solid transparent",
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              color: "#fff",
              boxShadow: "0 8px 22px var(--glow-color)",
              padding: "0.75rem 1.1rem",
            }}
          >
            <Layers size={16} /> Détail all
          </button>
        </div>

        {/* KPI */}
        <div
          className="info-band"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 12,
            marginBottom: "1.25rem",
          }}
        >
          <InfoCard
            label="Événements"
            value={filtered.length}
            color="#6366f1"
            icon={<Activity size={18} />}
          />
          <InfoCard
            label="Jours"
            value={groupesFiltres.length}
            color="#22c55e"
            icon={<Calendar size={18} />}
          />
          <InfoCard
            label="Utilisateurs"
            value={new Set(filtered.map((r) => r.user_id)).size}
            color="#f59e0b"
            icon={<User size={18} />}
          />
        </div>

        {/* LISTE PAR DATE */}
        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Chargement…</p>
        ) : groupesFiltres.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            Aucun journal pour ces filtres.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {groupesFiltres.map(([date, rows]) => (
              <DateCard
                key={date}
                date={date}
                dateLabel={formatDateFr(date)}
                rows={rows}
                onVisualiser={() => setDetailsDate(date)}
                onDetails={() => goDetailDate(date)}
              />
            ))}
          </div>
        )}

        {/* FRAME VISUALISER */}
        {detailsDate && (
          <div
            onClick={() => setDetailsDate(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(0,0,0,.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 560,
                maxHeight: "88vh",
                overflow: "auto",
                borderRadius: 24,
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                padding: "1.2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text)",
                    }}
                  >
                    {formatDateFr(detailsDate)}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {detailsRows.length} événement
                    {detailsRows.length > 1 ? "s" : ""}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailsDate(null)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "var(--text)",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {detailsRows.map((r, i) => (
                <div
                  key={r.id || i}
                  style={{
                    padding: "0.75rem 0",
                    borderBottom: "1px solid var(--glass-border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <strong style={{ color: "var(--text)", fontSize: "0.9rem" }}>
                      {r.action || "—"}
                    </strong>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {(r.created_at || "").toString().slice(11, 19)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      marginTop: 4,
                    }}
                  >
                    {userMap[r.user_id] || `User #${r.user_id || "?"}`}
                  </div>
                  {r.details && (
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text)",
                        marginTop: 6,
                        lineHeight: 1.4,
                      }}
                    >
                      {r.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer />

        <style>{`
@media (max-width: 900px) {
  .info-band { grid-template-columns: 1fr 1fr !important; }
}
@media (max-width: 520px) {
  .info-band { grid-template-columns: 1fr !important; }
  .btn-detail-all { width: 100%; justify-content: center; }
}
`}</style>
      </div>
    </div>
  );
}
