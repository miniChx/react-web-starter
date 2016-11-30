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


/* eslint-disable */
export const searchMenu = (id , func = (id, item) => (item.domainLink === id || item.domainLink === '/' + id), menu = _store.getState().menu) => {
   let tag = null;
  const indexPath = [];

  const filter = (item) => {
    if (item.subMenus) {
      item.subMenus.every((i, index) => {
        if(index !==0 ) {
          indexPath.pop();
        }
        indexPath.push(index);
        filter(i);
        return !tag;
      });
      !tag && indexPath.pop();
    }
    if (!tag && func(id, item)) {
      tag = item;
    }
  };
  menu.every((m, index) => {
    if(index !== 0 ) {
      indexPath.pop();
    }
    indexPath.push(index);
    filter(m);
    return !tag;
  });
  !tag && indexPath.pop();

  return { linkInfo: tag, indexPath };
};

export const getRouting = () => {
  return _store.getState().routing || {};
}

const _cach = {};

export const savePageData = (data) => {
  _cach.data = data;
};

export const getPageData = () => _cach.data;
