/**
 * auditLog.js — traçabilité StockFlow (web)
 *
 * Enregistre : user_id, action, details, horodatage (côté serveur).
 *
 * Prérequis api.js :
 *   export const createLog = (payload) => client.post("/logs/", payload);
 *   // payload: { action, details, user_id? }
 */

import * as api from "../api/api";

function currentUserId() {
  try {
    const raw =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user") ||
      localStorage.getItem("currentUser");
    if (!raw) return null;
    const u = typeof raw === "string" ? JSON.parse(raw) : raw;
    return u?.id ?? u?.user_id ?? null;
  } catch {
    return null;
  }
}

/**
 * @param {string} action  ex: "CREATE_CATEGORY", "UPDATE_ITEM", "DELETE_ENTREPOT"
 * @param {string} details texte lisible
 * @param {object} [extra]
 */
export async function logAction(action, details, extra = {}) {
  const payload = {
    action: String(action || "ACTION").slice(0, 255),
    details: details != null ? String(details) : "",
    user_id: extra.user_id ?? currentUserId() ?? undefined,
    deleted: 0,
    sync_id: 0,
    server_id: 0,
  };

  try {
    const fn = api.createLog || api.postLog || api.createAuditLog;
    if (typeof fn === "function") {
      await fn(payload);
      return true;
    }
    // fallback générique si client axios exposé
    if (api.default?.post) {
      await api.default.post("/logs/", payload);
      return true;
    }
    console.warn("[audit] createLog non trouvé dans api.js — log non envoyé", payload);
    return false;
  } catch (e) {
    // Ne bloque jamais l'UX métier
    console.warn("[audit] échec envoi log", e?.message || e);
    return false;
  }
}

/** Raccourcis sémantiques */
export const audit = {
  create: (entity, name) =>
    logAction(`CREATE_${entity}`, `${entity} créé(e) : ${name}`),
  update: (entity, name) =>
    logAction(`UPDATE_${entity}`, `${entity} modifié(e) : ${name}`),
  remove: (entity, name) =>
    logAction(`DELETE_${entity}`, `${entity} supprimé(e) : ${name}`),
  login: (email) => logAction("LOGIN", `Connexion : ${email}`),
  mouvement: (txt) => logAction("MOUVEMENT", txt),
};

export default logAction;
