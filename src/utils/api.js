import axios from "axios";
import { auth } from "../firebase";
import { signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://203.0.113.10/";

const api = axios.create({
  baseURL: API_BASE_URL,    
});

const PUBLIC_CLIENT_PATHS = [
  "/client/landing-page",
  "/client/business/locations/suggest",
  "/client/business/categories/search",
  "/client/business/categories/suggestions",
  "/client/business/niches",
  "/client/announcement",
  "/client/business/report/preview",
  "/client/contact",
];

const waitForAuthReady = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

const isPublicClientPath = (url = "") =>
  PUBLIC_CLIENT_PATHS.some((path) => url.startsWith(path));

api.interceptors.request.use(async (config) => { 
  if(config.url.startsWith("/client")){
    if (isPublicClientPath(config.url)) {
      if(!auth.currentUser){
        await signInAnonymously(auth);
      }
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    const user = auth.currentUser ?? (await waitForAuthReady());
    if (!user) {
      return Promise.reject(new Error("Login required"));
    }

    const token = await user.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
})

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error?.response?.status;
//     const detail = error?.response?.data?.detail;
//     const isAuthError = status === 401 || status === 403 || detail === "Login required";

//     if (isAuthError) {
//       try {
//         await signOut(auth);
//       } catch (signOutError) {
//         console.error("Logout failed:", signOutError);
//       }
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   }
// );


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

export const getReportList = async () => {
  const response = await api.get("/client/business/reports/history");
  return response.data;
};

export const CreateFullReportApi = async (payload) => {
  const response = await api.post("/client/business/report/full", payload);
  return response.data;
};

export { API_BASE_URL };
export default api;