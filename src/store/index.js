export const TOKEN_KEY = 'TOKEN';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setCredentials = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearCredentials = () => {
  localStorage.removeItem(TOKEN_KEY);
};
