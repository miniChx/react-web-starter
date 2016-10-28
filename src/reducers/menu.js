/**
 * Created by baoyinghai on 10/20/16.
 */
import { RESET_MENU, PAGE_TYPE_LIST, INIT_DATA_FROM_SERVER } from '../actions/types';

// TODO: 本地页面
/* eslint-disable */
const initialState = [];

export default function update(state = initialState, action) {
  switch (action.type) {
    case RESET_MENU:
      return [...action.payload];
    case INIT_DATA_FROM_SERVER: {
      return [...action.payload.menu]
    }
    default:
      return state;
  }
}
