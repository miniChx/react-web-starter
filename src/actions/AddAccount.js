/**
 * Created by geweimin on 16/11/14.
 */
import { createAction } from 'redux-actions';
import { ADD_ACCOUNT } from './types';
import { PFetch } from '../system/fetch';
import { login, loginRemember } from '../actions/session';
import links from '../constant/links';

export const addAccountrDispatch = createAction(ADD_ACCOUNT);
/* eslint-disable */
export const addAccountServer = (params, callback) => dispatch => {
  return PFetch(links.addAccount, params).then((d) => {
    // TODO: 根据返回数据把数据存到redux中
    dispatch(addAccount(d));
  });
};
