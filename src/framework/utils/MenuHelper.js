/**
 * Created by vison on 12/1/16.
 */

/* eslint-disable */
export const getOpenKeys = (indexPath = [], menu) => {
  indexPath.pop();
  const openKeys = [];
  let temp = menu;
  indexPath.every(index => {
    openKeys.push(temp[index] && temp[index].menuCode);
    temp = temp[index] && temp[index].subMenus;
    return temp;
  });
  return openKeys;
};

// 获得某个菜单项第一个
export const getMenuItemByFunc = (func, menu) => {
  let tag = null;
  menu && menu.some(m => {
    if (func(m)) {
      tag = m;
      return true;
    } else if (m.subMenus) {
      tag = getMenuItemByFunc(func, m.subMenus);
      if (tag) {
        return true;
      }
    }
    return false;
  });
  return tag;
};

/* eslint-disable */
export const getMenuItemAndPathByFunc = (func , menu) => {
  // 获得选中菜单项和他的openkeys/keypath
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
    if (!tag && func(item)) {
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

  const openKeys = getOpenKeys(indexPath, menu);

  return { linkInfo: tag, openKeys };
};

// 根据keypaths获得菜单项
export const getMenuItemByKeyPaths = (paths, menuRoot) => {
  let menu = menuRoot;
  paths.reverse().every((p, index) => menu.some && menu.some(m => {
    if (m.menuCode === p) {
      menu = m.subMenus ? m.subMenus : m;
      return true;
    }
    return false;
  }));
  return menu;
};

const transformToList = a => {
  if (!a.subMenus) {
    return [a];
  }
  // TODO: 默认的菜单root节点不应该渲染界面.
  let ret = [a];
  // let ret = [];
  a.subMenus.forEach(s => {
    const sub = transformToList(s);
    ret = ret.concat(sub);
  });
  return ret;
};

// 找前一个菜单和后一个菜单
export const searchBeforeAndAfter = (menuCode, menu) => {
  let list = [];
  menu.forEach(s => {
    const tmp = transformToList(s);
    list = list.concat(tmp);
  });

  let left = {};
  let right = {};
  list.some((item, index) => {
    if (item.menuCode === menuCode) {
      if (index === 1) {
        left = null;
      } else {
        left = list[index - 1];
      }
      if (index === list - 2) {
        right = null;
      } else {
        right = list[index + 1];
      }
      return true;
    }
    return false;
  });
  return { left, right };

};

