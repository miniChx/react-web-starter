/**
 * Created by vison on 12/30/16.
 */
const _windowHandler = {};
window._windowHandler = _windowHandler;

const originalOnunload = window.onunload;

window.onunload = () => {
  window.___windowCallback && window.___windowCallback();
  originalOnunload && originalOnunload();
};

const pushWindowHandler = (key, value) => {
  _windowHandler[key] = value;
};

const getWindowHandler = key => {
  return _windowHandler[key] || {};
};

export const jumpToNewTab = (url, props) => {
  // TODO: 同一个按钮 参数一样的  map 优化
  const winKey = props.buttonCode + url;
  const { openerHandle } = getWindowHandler(winKey);
  if (openerHandle) {
    openerHandle.___windowCallback = null; // 主动关闭时  不要调用回调
    openerHandle.close();
  }
  const newOpenHandle = window.open(url);
  newOpenHandle.___windowCallback = props.onRefresh;
  pushWindowHandler(winKey, { openerHandle: newOpenHandle });
};
