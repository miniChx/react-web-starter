/**
 * Created by baoyinghai on 10/18/16.
 */
import { createAction } from 'redux-actions';
import { FETCH_START, FETCH_END } from './types';

export const fetchStart = createAction(FETCH_START);
export const fetchEnd = createAction(FETCH_END);
