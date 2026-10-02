/**
 * Archives mouvements — même identité que Mouvements / Journal d'audit
 * Regroupement par date · Visualiser · Détail / Détail All
 * Lecture seule
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Archive,
  Eye,
  ExternalLink,
  Calendar,
  X,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  Layers,
  Warehouse,
} from "lucide-react";
import ThemeBackground from "../components/ThemeBackground";
import Footer from "../components/Footer";
import * as api from "../api/api";

const {
  getMouvementsArchives,
  getItems,
  getEntrepots,
} = api;

const safeGet = (fn) =>
  typeof fn === "function"
    ? fn().catch(() => ({ data: [] }))
    : Promise.resolve({ data: [] });

function dateKey(row) {
  return (
    (row.date || row.created_at || row.update_at || "")
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

function designation(item) {
  if (!item) return "—";
  return [item.name, item.mark, item.modele].filter(Boolean).join(" · ") || "—";
}

function buildImageFileName(item) {
  const parts = [item?.name, item?.mark, item?.modele]
    .map((p) => (p || "").toString().trim())
    .filter(Boolean)
    .map((p) =>
      p
        .replace(/[^\w\u00C0-\u024F\-]+/gi, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
    );
  return parts.length ? parts.join("_") : null;
}

function getArticleImageSrc(item) {
  if (!item) return null;
  if (item.picture_path) {
    let p = String(item.picture_path)
      .split(/[/\\]/)
      .pop()
      .replace(/^\/+/, "");
    if (!p.startsWith("items/") && !p.startsWith("images/")) p = `items/${p}`;
    if (p.startsWith("images/")) return `/${p}`;
    return `/images/${p}`;
  }
  const base = buildImageFileName(item);
  return base ? `/images/items/${base}.jpg` : null;
}

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
          width: 42,
          height: 42,
          borderRadius: 12,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(145deg, color-mix(in srgb, ${color} 55%, #fff 5%), color-mix(in srgb, ${color} 25%, transparent))`,
          color: "#fff",
          zIndex: 1,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
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
  let nIn = 0;
  let nOut = 0;
  rows.forEach((r) => {
    if (String(r.type || "").toLowerCase().includes("entr")) nIn += 1;
    else nOut += 1;
  });

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
      }}
    >
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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
              boxShadow: hover ? "0 10px 28px var(--glow-color)" : "none",
            }}
          >
            <Archive size={22} />
          </div>
          <div>
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
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: 4,
              }}
            >
              {rows.length} mvt ·{" "}
              <span style={{ color: "#4ade80" }}>{nIn} entr.</span>
              {" · "}
              <span style={{ color: "#f87171" }}>{nOut} sort.</span>
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
    </div>
  );
}

function Thumb({ item, size = 48 }) {
  const src = getArticleImageSrc(item);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        overflow: "hidden",
        flexShrink: 0,
        background: "var(--glass-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <Package size={18} color="var(--gradient-start)" />
      )}
    </div>
  );
}

export default function ArchivesMouvements() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [items, setItems] = useState([]);
  const [entrepots, setEntrepots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [detailsDate, setDetailsDate] = useState(null);

  const charger = async () => {
    setLoading(true);
    try {
      const [a, i, e] = await Promise.all([
        safeGet(getMouvementsArchives),
        safeGet(getItems),
        safeGet(getEntrepots),
      ]);
      setRows((a.data || []).filter((x) => Number(x.deleted ?? 0) === 0));
      setItems(i.data || []);
      setEntrepots(e.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const itemMap = useMemo(() => {
    const m = {};
    (items || []).forEach((it) => {
      m[it.id] = it;
    });
    return m;
  }, [items]);

  const entrepotMap = useMemo(() => {
    const m = {};
    (entrepots || []).forEach((e) => {
      m[e.id] = e.reference || e.name || `#${e.id}`;
    });
    return m;
  }, [entrepots]);

  const enriched = useMemo(() => {
    return rows.map((r) => ({
      ...r,
      _item: itemMap[r.item_id],
      _entrepot: entrepotMap[r.entrepot_id] || "—",
    }));
  }, [rows, itemMap, entrepotMap]);

  const filtered = useMemo(() => {
    const q = searchText.toLowerCase().trim();
    if (!q) return enriched;
    return enriched.filter((r) => {
      const des = designation(r._item).toLowerCase();
      return (
        des.includes(q) ||
        String(r.type || "").toLowerCase().includes(q) ||
        String(r.nature || "").toLowerCase().includes(q) ||
        String(r._entrepot || "").toLowerCase().includes(q)
      );
    });
  }, [enriched, searchText]);

  const groupes = useMemo(() => groupByDate(filtered), [filtered]);

  const groupesFiltres = useMemo(() => {
    const q = searchDate.toLowerCase().trim();
    if (!q) return groupes;
    return groupes.filter(([date]) => {
      return (
        date.toLowerCase().includes(q) ||
        formatDateFr(date).toLowerCase().includes(q)
      );
    });
  }, [groupes, searchDate]);

  const detailsRows = useMemo(() => {
    if (!detailsDate) return [];
    return filtered.filter((r) => dateKey(r) === detailsDate);
  }, [filtered, detailsDate]);

  const totalIn = filtered.filter((r) =>
    String(r.type || "").toLowerCase().includes("entr")
  ).length;
  const totalOut = filtered.length - totalIn;

  const goDetailDate = (date) => {
    navigate(`/details/archives/${encodeURIComponent(date)}`);
  };

  const goDetailAll = () => {
    navigate("/details-carousel/archives/all");
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <ThemeBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.5rem 20px 2rem",
        }}
      >
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
            <Archive size={14} /> Archives
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
            Mouvements archivés
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
            }}
          >
            Historique consolidé — consultation uniquement
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: "1.25rem",
          }}
        >
          <div
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
              placeholder="Article, type, entrepôt…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--text)",
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
              }}
            />
          </div>
          <button
            type="button"
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
            label="Archivés"
            value={filtered.length}
            color="#8b5cf6"
            icon={<Archive size={18} />}
          />
          <InfoCard
            label="Entrées"
            value={totalIn}
            color="#22c55e"
            icon={<ArrowDownToLine size={18} />}
          />
          <InfoCard
            label="Sorties"
            value={totalOut}
            color="#ef4444"
            icon={<ArrowUpFromLine size={18} />}
          />
        </div>

        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Chargement…</p>
        ) : groupesFiltres.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            Aucune archive pour ces filtres.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {groupesFiltres.map(([date, list]) => (
              <DateCard
                key={date}
                date={date}
                dateLabel={formatDateFr(date)}
                rows={list}
                onVisualiser={() => setDetailsDate(date)}
                onDetails={() => goDetailDate(date)}
              />
            ))}
          </div>
        )}

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
                maxWidth: 520,
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
                    {detailsRows.length} mouvement
                    {detailsRows.length > 1 ? "s" : ""} archivé
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
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    padding: "0.7rem 0",
                    borderBottom: "1px solid var(--glass-border)",
                  }}
                >
                  <Thumb item={r._item} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: "var(--text)",
                      }}
                    >
                      {designation(r._item)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {r.type} · qty {r.qty} · {r._entrepot}
                      {r.nature ? ` · ${r.nature}` : ""}
                    </div>
                  </div>
                  <Warehouse size={14} color="var(--text-secondary)" />
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
}
`}</style>
      </div>
    </div>
  );
}
