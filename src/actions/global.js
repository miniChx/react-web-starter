
import { createAction } from 'redux-actions';
import * as types from '../constant/dictActions';
import { PFetch } from '../system/fetch';
import links from '../constant/links';

export const initDataFromServerDispatch = createAction(types.INIT_DATA_FROM_SERVER);

export const initDataFromServer = () => dispatch => PFetch(links.getMenus, {})
  .then(response => {
    dispatch(initDataFromServerDispatch({ menu: response.menus }));
  });


export const fetchStart = createAction(types.FETCH_START);
export const fetchEnd = createAction(types.FETCH_END);


export const login = createAction(types.AUTH_LOGIN);
export const logout = createAction(types.AUTH_LOGOUT);

export const resetMenu = createAction(types.MENU_RESET);
