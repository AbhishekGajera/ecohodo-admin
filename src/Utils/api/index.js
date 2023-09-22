import api from "./axios";

// user auth
export const signin = (values) => api(`users/admin-signin`, "POST", values);

//change password
export const changePassword = (values) =>
  api(`users/update-password`, "POST", values);

// User List
export const getUserList = () => api(`users`, "GET");
export const getUserById = (id) => api(`users/${id}`, "GET");

// User detail
export const getMeteredElectricityListByUserId = (year, id) =>
  api(`meteredElectricity/${year}/${id}`, "GET");
export const updateMeteredElectricty = (id, values) =>
  api(`meteredElectricity/${id}`, "PATCH", values);
