import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const uploadResource = (data) =>
  API.post("/resources", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getResources = (params) =>
  API.get("/resources", { params });
