/**
 * Created by geweimin on 16/11/8.
 */
import { createAction } from 'redux-actions';
import { INIT_DATA_FROM_SERVER } from './types';
import { PFetch } from '../system/fetch';
import { logout } from '../actions/session';
import links from '../constant/links';

export const initDataFromServerDispatch = createAction(INIT_DATA_FROM_SERVER);
/* eslint-disable */
export const logoutServer = () => dispatch => {
  return PFetch(links.logout, {}).then((d) => {
    dispatch(logout());
  });
};
