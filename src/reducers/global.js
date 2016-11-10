/**
 * Created by baoyinghai on 10/18/16.
 */
import { FETCH_END, FETCH_START, INIT_DATA_FROM_SERVER } from '../constant/dictActions';

const initialState = {
  showLoading: false,
  isInit: false
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case FETCH_END:
      return { ...state, showLoading: false };
    case FETCH_START:
      return { ...state, showLoading: true };
    case INIT_DATA_FROM_SERVER:
      return { ...state, isInit: true };
    default:
      return state;
  }
}
