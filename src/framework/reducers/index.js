import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import global from './global';
import menu from './menu';
import subMenu from './subMenu';
import bizReducers from '../../bundles/reducer';

export default combineReducers({
  routing: routerReducer,
  global,
  menu,
  subMenu,
  ...bizReducers,
  loadingBar: loadingBarReducer,
});
