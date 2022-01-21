import jwtDecode from "jwt-decode";

import history from "./history";

const sessionKey = "session-token";
const STORAGE_KEY = "inBillo";

const fullKey = (key) => {
  return `${STORAGE_KEY}-${key}`;
};

export const localSave = (key, item) => {
  return localStorage.setItem(fullKey(key), JSON.stringify(item));
};

const save = (key, token) => {
  localSave(key, token);
};

export const saveToken = (token) => {
  return save(sessionKey, token);
};

export const decodeToken = () => {
  const jwtToken = getToken();
  return new jwtDecode(jwtToken);
};

export const getToken = () => {
  return localGet(sessionKey);
};

export const localGet = (key) => {
  return JSON.parse(localStorage.getItem(fullKey(key)));
};

export const redirect = (url, state = {}) => {
  window.location.href = url;
  history.push(url, state);
};
