import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setCredentials: ['token', 'name'],
  clearStore: null,
  setCustomers: ['customers'],
});

const initialState = {
  token: '',
};

const setCredentials = (state = initialState, action) => {
  const { token, name } = action;
  return { ...state, token, name };
};

const clearStore = () => ({ ...initialState });

const setCustomers = (state = initialState, action) => {
  const { customers } = action;
  return { ...state, customers };
};

export default createReducer(initialState, {
  [Types.SET_CREDENTIALS]: setCredentials,
  [Types.SET_CUSTOMERS]: setCustomers,
  [Types.CLEAR_STORE]: clearStore,
});
