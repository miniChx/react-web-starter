/**
 * Created by baoyinghai on 10/21/16.
 */
import { createAction } from 'redux-actions';
import { RESET_MENU, INIT_DATA_FROM_SERVER } from './types';
/* eslint-disable */
export const resetMenu = createAction(RESET_MENU);
export const initMenu = createAction(INIT_DATA_FROM_SERVER);


