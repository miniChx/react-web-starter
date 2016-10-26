/**
 * Created by baoyinghai on 10/26/16.
 */
const LocalStorage = require('local-storage');
/* eslint-disable */
import { ACTION_SESSION_LOGIN, ACTION_SESSION_LOGOUT } from '../actions/types';

const STORAGE_KEY_PROFILE = '@AS:profile';

const initialState = {
  ...LocalStorage.get(STORAGE_KEY_PROFILE)
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case ACTION_SESSION_LOGIN:
      LocalStorage.set(STORAGE_KEY_PROFILE, { token: action.payload });
      return {
        ...state,
        token: action.payload
      };
    case ACTION_SESSION_LOGOUT:
      LocalStorage.set(STORAGE_KEY_PROFILE, { token: '' });
      return {
        ...state,
        token: ''
      };
    default:
      return state;
  }
}
