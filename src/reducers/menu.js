/**
 * Created by vison on 10/20/16.
 */
import { MENU_RESET, AUTH_FORCE_LOGOUT } from '../framework/constant/dictActions';

const initialState = [];

export default function update(state = initialState, action) {
  switch (action.type) {
    case MENU_RESET:
      return [...action.payload];
    case AUTH_FORCE_LOGOUT:
      return [];
    default:
      return state;
  }
}
