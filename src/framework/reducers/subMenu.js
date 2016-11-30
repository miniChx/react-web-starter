/**
 * Created by baoyinghai on 11/29/16.
 */
import { SET_SUB_MENU, AUTH_LOGIN, AUTH_LOGOUT, AUTH_FORCE_LOGOUT } from '../constant/dictActions';

/* eslint-disable */
const initialState = [];

export default function update(state = initialState, action) {
  switch (action.type) {
    case SET_SUB_MENU:
      return [...action.payload];
    case AUTH_LOGIN:
    case AUTH_LOGOUT:
    case AUTH_FORCE_LOGOUT:
      return [];
    default:
      return state;
  }
}
