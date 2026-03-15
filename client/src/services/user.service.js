import api from "../api/api";

export const getProfile = async () => {

  const res = await api.get("/profile");

  return res.data;
};

export const getHome = async () => {

  const res = await api.get("/home");

  return res.data;
};