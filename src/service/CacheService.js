/**
 * Created by baoyinghai on 10/21/16.
 */
let _store = null;

export const init = (store) => {
  _store = store;
};


export const getMenu = () => _store.getState().menu;

export const getPages = () => _store.getState().pages;

export const searchMenu = (id) => {
  const menu = _store.getState().menu;

  let tag = null;

  const filter = (item) => {
    if (item.subMenus) {
      item.subMenus.forEach((i) => filter(i));
    }
    if (item.domainLink === id || item.domainLink === '/' + id) {
      tag = item;
    }
  };
  menu.forEach((m) => {
    filter(m);
  });

  return tag;

};
