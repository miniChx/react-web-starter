import { createAction } from 'redux-actions';
import LocalStorage from 'local-storage';
import { replace } from 'react-router-redux';
import * as types from '../constant/dictActions';
import { PFetch } from '../system/fetch';
import links from '../constant/links';
// import { LoginServer } from './login';
import SessionStorage from '../utils/session-storage';


const STORAGE_KEY_PROFILE = '@AS:profile';

export const initDataFromServerDispatch = createAction(types.INIT_DATA_FROM_SERVER);

export const initDataFromServer = () => dispatch => PFetch(links.getMenus, {})
  .then(response => {
    dispatch(initDataFromServerDispatch({ menu: response.menus }));
  });

export const initApp = () => {
  const payload = SessionStorage.get(STORAGE_KEY_PROFILE) || LocalStorage.get(STORAGE_KEY_PROFILE) || {};
  return createAction(types.INIT_APP)(payload);
};

export const fetchStart = createAction(types.FETCH_START);
export const fetchEnd = createAction(types.FETCH_END);

export const updateQuery = createAction(types.UPDATE_QUERY);

const authLogin = createAction(types.AUTH_LOGIN);
const authLogout = createAction(types.AUTH_LOGOUT);
const forceLogoutAction = createAction(types.AUTH_FORCE_LOGOUT);

export const resetMenu = createAction(types.MENU_RESET);

// eslint-disable-next-line no-unused-vars
export const loginServer = (isRemember, params) => dispatch =>
  PFetch(links.login, params).then(d => {
    if (isRemember) {
      LocalStorage.set(STORAGE_KEY_PROFILE, { token: d.userToken });
    }
    SessionStorage.set(STORAGE_KEY_PROFILE, { token: d.userToken });
    dispatch(authLogin(d.userToken));
  }).then(() => {
    PFetch(links.getMenus, {}).then(menusData => {
      dispatch(initDataFromServerDispatch({ menu: menusData.menus }));
    });
  });

export const logout = () => dispatch =>
  PFetch(links.logout, {}).then(() => {
    LocalStorage.set(STORAGE_KEY_PROFILE, { token: '' });
    SessionStorage.set(STORAGE_KEY_PROFILE, { token: '' });
    dispatch(replace('/login'));
    dispatch(authLogout());
  });

export const forceLogout = () => dispatch => {
  LocalStorage.set(STORAGE_KEY_PROFILE, { token: '' });
  SessionStorage.set(STORAGE_KEY_PROFILE, { token: '' });
  dispatch(replace('/login'));
  dispatch(forceLogoutAction());
};
