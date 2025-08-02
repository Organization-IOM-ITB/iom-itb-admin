const ID_TOKEN_KEY = "dX0IY675gh1eFGPWn62z";
const USER_KEY = "hr6Ssk5YGKhYKltISaM7";
import Cookies from "js-cookie";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = (token:string) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const getUser = () => {
  return window.localStorage.getItem(USER_KEY);
};

export const saveUser = (data:string) => {
  window.localStorage.setItem(USER_KEY, data);
};

export const destroyUser = () => {
  window.localStorage.removeItem(USER_KEY);
  Cookies.remove("PSSID");
};

export const getSession = () => {
  return Cookies.get("PSSID");
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getUser,
  saveUser,
  destroyUser,
  getSession,
};
