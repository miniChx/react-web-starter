
import * as types from '../framework/constant/dictActions';

const initialState = {
  showLoading: false,
  isInit: false,
  token: '123123',
  query: {},
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state
      };
    case types.FETCH_START:
      return { ...state, showLoading: true };
    case types.FETCH_END:
      return { ...state, showLoading: false };
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
