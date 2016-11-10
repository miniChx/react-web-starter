
import { createAction } from 'redux-actions';
import LocalStorage from 'local-storage';
import * as types from '../constant/dictActions';
import { PFetch } from '../system/fetch';
import links from '../constant/links';

const STORAGE_KEY_PROFILE = '@AS:profile';

export const initDataFromServerDispatch = createAction(types.INIT_DATA_FROM_SERVER);

export const initDataFromServer = () => dispatch => PFetch(links.getMenus, {})
  .then(response => {
    dispatch(initDataFromServerDispatch({ menu: response.menus }));
  });

export const initApp = () => {
  const payload = LocalStorage.get(STORAGE_KEY_PROFILE);
  return createAction(types.INIT_APP)(payload);
};

export const fetchStart = createAction(types.FETCH_START);
export const fetchEnd = createAction(types.FETCH_END);

const authLogin = createAction(types.AUTH_LOGIN);
const authLogout = createAction(types.AUTH_LOGOUT);

export const resetMenu = createAction(types.MENU_RESET);


export const login = phone => dispatch => {
  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    setTimeout(() => {
      resolve({
        token: phone + '_ti',
      });
      // reject({
      //   message: 'token 获取失败'
      // });
    }, 1000);
  })
    .then(response => {
      LocalStorage.set(STORAGE_KEY_PROFILE, { token: response.token });
      dispatch(authLogin(response.token));
    });
};

export const logout = () => {
  LocalStorage.set(STORAGE_KEY_PROFILE, { token: '' });
  return authLogout();
};
