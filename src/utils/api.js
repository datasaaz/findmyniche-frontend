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


export const getLocation = async () => {
  const response = await api.get("place-lookup");
  return response.data;
};

export { API_BASE_URL };
export default api;