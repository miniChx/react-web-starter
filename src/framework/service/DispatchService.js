/**
 * Created by baoyinghai on 10/18/16.
 */

let _store = null;

/* eslint-disable */
export const init = (store) => {
  _store = store;
};

/* eslint-disable */
export const dispatch = (... args) => {
  _store.dispatch(... args);
};

