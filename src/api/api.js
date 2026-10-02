import axios from "axios";
import { data } from "react-router-dom";
// import { data } from "react-router-dom";

// const API_URL = "http://localhost:8001";
const API_URL = "https://stockflow-7q5a.onrender.com";


// Plus tard : "https://stockflow-api.railway.app"
const api = axios.create({

  baseURL: API_URL,

});

// Intercepteur — ajoute automatiquement le token à chaque requête
api.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("token");

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;

});

export const login = (email, password) =>

api.post("/auth/login", { email, password });

export const getCategories = () => api.get("/categories/");
export const getEntrepots  = () => api.get("/entrepots/");
// export const getItems      = () => api.get("/items/");
export const getItems = async () => {
  try {
    const response = await api.get("/items/");

    console.log("=================================");
    console.log("📦 ARTICLES REÇUS DE L'API");
    console.log("=================================");
    console.log("Status :", response.status);
    console.log("Données :", response.data);
    console.table(response.data);

    return response;
  } catch (error) {
    console.error("❌ Erreur getItems :", error);
    throw error;
  }
};
// export const getStocks     = () => api.get("/stocks/");
export const getStocks = async () => {
  try {
    const response = await api.get("/stocks/");

    console.log("=================================");
    console.log("📦 STOCKS REÇUS DE L'API");
    console.log("=================================");
    console.log("Status :", response.status);
    console.log("Données :", response.data);
    console.table(response.data);

    return response;
  } catch (error) {
    console.error("❌ Erreur getStocks :", error);
    throw error;
  }
};
// export const getMouvementsRecents = () => api.get("/mouvements/recents");
// export const getMouvementsRecents = async () => {
//   try {
//     const response = await api.get("/mouvements/recents");

//     console.log("=================================");
//     console.log("🔄 MOUVEMENTS RÉCENTS REÇUS");
//     console.log("=================================");
//     console.log("Status :", response.status);
//     console.log("Données :", response.data);
//     console.table(response.data);

//     return response;
//   } catch (error) {
//     console.error("❌ Erreur getMouvementsRecents :", error);
//     throw error;
//   }
// };

export const getMouvementsRecents = async () => {
  try {
    const response = await api.get("/mouvements/recents");

    console.log("=================================");
    console.log("🔄 MOUVEMENTS RÉCENTS REÇUS DE L'API");
    console.log("=================================");
    console.log("Données :", response.data);
    console.table(response.data);

    return response;
  } catch (error) {
    console.error("❌ Erreur getMouvementsRecents :", error);
    throw error;
  }
};

// export const getStockAjustments = () => api.get("/mouvements/ajustements/");
export const getUsers      = () => api.get("/users/");

// export const createItem = (data) => api.post("/items/", data);
// export const updateItem = (id, data) => api.put(`/items/${id}`, data);
// export const deleteItem = (id) => api.delete(`/items/${id}`);

export const createCategorie = (data) => api.post('/categories/', data);
export const updateCategorie = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategorie = (id) => api.delete(`/categories/${id}`);

// export const getMouvementsRecents  = () => api.get("/mouvements/recents");
export const createMouvementRecent = (data) => api.post("/mouvements/recents", data);
// export const getAjustements        = () => api.get("/mouvements/ajustements/");
// export const createAjustement      = (data) => api.post("/mouvements/ajustements/", data);


// export const getItems    = () => api.get("/items/");
export const createItem  = (data) => api.post("/items/", data);
export const updateItem  = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem  = (id) => api.delete(`/items/${id}`);


export const uploadItemImage = (
  syncId,
  picturePath,
  pictureData,
  pictureHash
) => {
  return api.post("/items/sync/push/picture", {
    sync_id: syncId,
    picture_path: picturePath,
    picture_data: pictureData,
    picture_hash: pictureHash,
  });
};



// export const getEntrepots    = () => api.get("/entrepots/");
export const createEntrepot  = (data) => api.post("/entrepots/", data);
export const updateEntrepot  = (id, data) => api.put(`/entrepots/${id}`, data);
export const deleteEntrepot  = (id) => api.delete(`/entrepots/${id}`);



export const createUser = (data) => api.post('/users/', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const updateProfile = (id, data) =>
  api.put(`/users/${id}`, data);

export const updatePassword = (userId, newPassword) =>
  api.put(`/users/${userId}/password`, {
    new_password: newPassword,
  });

export const changePassword = updatePassword;

export const patchUser = (id, data) =>
  api.put(`/users/${id}`, data);

export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getUnites = () => api.get("/unites/");

// ============================================================
// AJUSTEMENTS DE STOCK
// ============================================================

export const getAjustements = () =>
  api.get("/mouvements/ajustements/");

export const createAjustement = (data) =>
  api.post("/mouvements/ajustements/", data);

export const updateAjustement = (id, data) =>
  api.put(`/mouvements/ajustements/${id}`, data);

export const deleteAjustement = (id) =>
  api.delete(`/mouvements/ajustements/${id}`);

// export const getStockAjustments = getAjustements;
export const getStockAjustments = async () => {
  try {
    const response = await api.get("/mouvements/ajustements/");

    console.log("=================================");
    console.log("🛠️ AJUSTEMENTS REÇUS DE L'API");
    console.log("=================================");
    console.log("Status :", response.status);
    console.log("Données :", response.data);
    console.table(response.data);

    return response;

  } catch (error) {
    console.error("❌ Erreur getAjustements :", error);
    console.error("Response :", error.response?.data);
    console.error("Status :", error.response?.status);
    throw error;
  }

  
};

export const createStock = (data) =>
  api.post("/stocks/", data);

export const updateStock = (itemId, entrepotId, data) =>
  api.put(`/stocks/item/${itemId}/entrepot/${entrepotId}`, data);

export const getStocksByItem = (itemId) =>
  api.get(`/stocks/item/${itemId}`);

export const getStockExact = (itemId, entrepotId) =>
  api.get(`/stocks/item/${itemId}/entrepot/${entrepotId}`);

export const createLog = (data) =>
  api.post("/logs/", data);


export const getLogsByUser = (userId) =>
  api.get(`/logs/user/${userId}`);

export const deleteLog = (logId) =>
  api.delete(`/logs/${logId}`);


/* ============================================================
   À AJOUTER dans src/api/api.js  (exports obligatoires)
   Adapte "client" au nom de ton instance axios / fetch wrapper
   Exemples courants : api, http, axiosInstance, client
============================================================ */

// --- Audit logs (prefix API = /logs) ---
export const getAuditLogs = () => api.get("/logs");

// --- Mouvements archives (prefix API = /mouvements) ---
export const getMouvementsArchives = () => api.get("/mouvements/archived");

// (déjà présents normalement)
// export const getItems = () => api.get("/items");
// export const getEntrepots = () => api.get("/entrepots");
// export const getMouvementsRecents = () => api.get("/mouvements/recents");



export default api;
