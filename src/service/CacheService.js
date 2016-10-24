/**
 * Created by baoyinghai on 10/21/16.
 */
let _store = null;

export const init = (store) => {
  _store = store;
};


export const getMenu = () => _store.getState().menu;

export const getPages = () => _store.getState().pages;
