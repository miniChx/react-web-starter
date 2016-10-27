/**
 * Created by baoyinghai on 10/21/16.
 */
let _store = null;
/* eslint-disable */
export const init = store => {
  _store = store;
};

export const getToken = () => _store.getState().session.token;

export const getMenu = () => _store.getState().menu;

export const getPages = () => _store.getState().pages;

/* eslint-disable */
export const searchMenu = (id) => {
  const menu = _store.getState().menu;

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
    if (tag && item.domainLink === id || item.domainLink === '/' + id) {
      tag = item;
    }
  };
  menu.every((m, index) => {
    if(index !==0 ) {
      indexPath.pop();
    }
    indexPath.push(index);
    filter(m);
    return !tag;
  });
  !tag && indexPath.pop();

  return { linkInfo: tag, indexPath };
};
