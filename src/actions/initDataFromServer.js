/**
 * Created by baoyinghai on 10/27/16.
 */
import { createAction } from 'redux-actions';
import { INIT_DATA_FROM_SERVER } from './types';
import { PFetch } from '../network/fetch';
import links from '../constant/links';

export const initDataFromServerDispatch = createAction(INIT_DATA_FROM_SERVER);

/* eslint-disable */
export const initDataFromServer = () => dispatch => {
  return PFetch(links.getMenus, {}).then((d) => {
    dispatch(initDataFromServerDispatch({menu: d.result}));
  });
};
