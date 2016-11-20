/**
 * Created by baoyinghai on 10/26/16.
 */

import { createAction } from 'redux-actions';
import { ACTION_SESSION_LOGIN, ACTION_SESSION_LOGOUT, ACTION_SESSION_LOGIN_REMEMBER } from './types';

export const login = createAction(ACTION_SESSION_LOGIN);
export const loginRemember = createAction(ACTION_SESSION_LOGIN_REMEMBER);
export const logout = createAction(ACTION_SESSION_LOGOUT);
