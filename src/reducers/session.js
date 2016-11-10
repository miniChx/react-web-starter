/**
 * Created by baoyinghai on 10/26/16.
 */
const LocalStorage = require('local-storage');
/* eslint-disable */
import { AUTH_LOGIN, AUTH_LOGOUT } from '../constant/dictActions';

const STORAGE_KEY_PROFILE = '@AS:profile';

const initialState = {
  ...LocalStorage.get(STORAGE_KEY_PROFILE)
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      LocalStorage.set(STORAGE_KEY_PROFILE, { token: action.payload });
      return {
        ...state,
        token: action.payload
      };
    case AUTH_LOGOUT:
      LocalStorage.set(STORAGE_KEY_PROFILE, { token: '' });
      return {
        ...state,
        token: ''
      };
    default:
      return state;
  }
}
