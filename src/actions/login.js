/**
 * Created by geweimin on 16/11/8.
 */
import { createAction } from 'redux-actions';
import { INIT_DATA_FROM_SERVER } from './types';
import { PFetch } from '../system/fetch';
import { login, loginRemember } from '../actions/session';
import links from '../constant/links';

export const initDataFromServerDispatch = createAction(INIT_DATA_FROM_SERVER);
/* eslint-disable */
export const loginServer = (isRemember, params) => dispatch => {
  return PFetch(links.login, params).then((d) => {
    if (!isRemember)
      dispatch(login(d.userToken));
    else
      dispatch(loginRemember(d.userToken));
  }).then((token) => {
    PFetch(links.getMenus, {}).then((d) => {
      dispatch(initDataFromServerDispatch({menu: d.menus}));
    });
  });
};
