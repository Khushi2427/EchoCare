import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/profile`;

export const getProfile = () => {
  const token = localStorage.getItem("token");

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (data) => {
  const token = localStorage.getItem("token");

  return axios.put(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
