/**
 * Created by baoyinghai on 10/18/16.
 */
import { FETCH_END, FETCH_START } from '../actions/types';

const initialState = {
  showLoading: false
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case FETCH_END:
      return Object.assign({}, state, { showLoading: false });
    case FETCH_START:
      return Object.assign({}, state, { showLoading: true });
    default:
      return state;
  }
}
