import { createAction } from 'redux-actions';
import * as types from '../framework/constant/dictActions';

export const updateMenuOpenKeys = createAction(types.MENU_OPEN_KEYS);
export const updateMenuSelectedKeys = createAction(types.MENU_SELECTED_KEYS);
