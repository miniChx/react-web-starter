/**
 * Created by baoyinghai on 10/20/16.
 */
import { MENU_RESET, INIT_DATA_FROM_SERVER } from '../constant/dictActions';

const initialState = [];

export default function update(state = initialState, action) {
  switch (action.type) {
    case MENU_RESET:
      return [...action.payload];
    case INIT_DATA_FROM_SERVER: {
      return [...action.payload.menu];
    }
    default:
      return state;
  }
}
