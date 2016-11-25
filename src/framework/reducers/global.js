
import * as types from '../constant/dictActions';

const initialState = {
  showLoading: false,
  isInit: false,
  token: '',
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state,
        token: action.payload.token
      };
    case types.FETCH_START:
      return { ...state, showLoading: true };
    case types.FETCH_END:
      return { ...state, showLoading: false };
    case types.INIT_DATA_FROM_SERVER:
      return { ...state, isInit: true };
    case types.AUTH_LOGIN:
      return {
        ...state,
        token: action.payload
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        token: ''
      };
    case types.AUTH_FORCE_LOGOUT:
      return {
        ...state,
        token: ''
      };
    default:
      return state;
  }
}
