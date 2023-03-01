const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function authRemoveData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(EXPIRES_KEY);
}

export function getAccesToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefrestTokent() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
  setTokens,
  getAccesToken,
  getRefrestTokent,
  getTokenExpiresDate,
  getUserId,
  authRemoveData,
};
export default localStorageService;
