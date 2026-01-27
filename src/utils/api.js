import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://203.0.113.10/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers:{
    "X-Internal-API-Key": import.meta.env.VITE_API_KEY
  }
});

export const getLanding = async () => {
  const response = await api.get("landing-page");
  return response.data;
};


export const getLocation = async (query) => {
  const response = await api.get("place-lookup", { params: { query : query } });
  return response.data;
};

export const getRelevantCategories = async (query) => {
  const response = await api.get("relevant-categories", { params: { tag : query } });
  return response.data;
};

export const getAnnouncement = async () => {
  const response = await api.get("announcement");
  return response.data;
};

export const CreatePreviewApi = async (payload) => {
  const response = await api.post("report/preview", payload);
  return response.data;
};

export { API_BASE_URL };
export default api;