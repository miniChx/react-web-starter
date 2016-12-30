/**
 * Created by baoyinghai on 10/21/16.
 */
let _store = null;
/* eslint-disable */
export const init = store => {
  _store = store;
};

export const isInitDataFromServer = () => _store.getState().global.isInit;

export const getToken = () => _store.getState().global.token;

export const getMenu = () => _store.getState().menu;
export const getSubMenu = () => _store.getState().subMenu;

export const getRouting = () => {
  return _store.getState().routing || {};
}

const _cach = {};

export const savePageData = data => {
  _cach.data = data;
};

export const getPageData = () => _cach.data;
