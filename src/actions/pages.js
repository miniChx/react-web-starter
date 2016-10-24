/**
 * Created by baoyinghai on 10/21/16.
 */
import { createAction } from 'redux-actions';
import { ADD_PAGE, UPDATE_PAGE } from './types';

export const addPage = createAction(ADD_PAGE);
export const updatePage = createAction(UPDATE_PAGE);

