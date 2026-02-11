import axios from "axios";
import { auth } from "../firebase";
import { signInAnonymously, signOut } from "firebase/auth";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://203.0.113.10/";

const api = axios.create({
  baseURL: API_BASE_URL,    
});


api.interceptors.request.use(async (config) => { 
  if(config.url.startsWith("/client")){

    if(!auth.currentUser){
      await signInAnonymously(auth);
    }
    
    // Get fresh ID token (Firebase auto-refreshes expired tokens)
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const detail = error?.response?.data?.detail;
    const isAuthError = status === 401 || status === 403 || detail === "Login required";

    if (isAuthError) {
      try {
        await signOut(auth);
      } catch (signOutError) {
        console.error("Logout failed:", signOutError);
      }
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);


export const getLanding = async () => {
  const response = await api.get("/client/landing-page");
  return response.data;
};


export const getLocation = async (query) => {
  const response = await api.get("/client/business/locations/suggest", { params: { q : query } });
  return response.data;
};

export const getRelevantCategories = async (query) => {
  const response = await api.get("/client/business/categories/search", { params: { tag : query } });
  return response.data;
};

export const getCategoriesSuggestion = async (query) => {
  const response = await api.get("/client/business/categories/suggestions", { params: { category : query } });
  return response.data;
};

export const getNiches = async (category, item) => {
  const params = { category };
  if (item) params.item = item;
  const response = await api.get("/client/business/niches", { params });
  return response.data;
};

export const getAnnouncement = async () => {
  const response = await api.get("/client/announcement");
  return response.data;
};

export const CreatePreviewApi = async (payload) => {
  const response = await api.post("/client/business/report/preview", payload);
  return response.data;
};

export const submitContact = async (payload) => {
  const response = await api.post("/client/contact", payload);
  return response.data;
};


// Private Apis 
export const getDashboard = async () => {
  const response = await api.get("/client/dashboard");
  return response.data;
};

export { API_BASE_URL };
export default api;