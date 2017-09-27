/**
 * Created by vison on 10/20/16.
 */
import { MENU_SELECTED_KEYS, MENU_OPEN_KEYS } from '../framework/constant/dictActions';

const initialState = {
  selectedKeys: ['home'],
  openKeys: []
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case MENU_SELECTED_KEYS:
      return {...state, ...action.payload};
    case MENU_OPEN_KEYS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
