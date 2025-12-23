import axios from "axios";

const API = "http://localhost:5002/api/profile";

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
