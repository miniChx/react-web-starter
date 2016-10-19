/**
 * Created by baoyinghai on 10/18/16.
 */

let _store = null;

export const init = (store) => {
  _store = store;
};

export const dispatch = (... args) => {
  _store.dispatch(... args);
}

