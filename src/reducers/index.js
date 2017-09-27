import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import { loadingBarReducer } from '../components/loading-bar/index';

import global from './global';
import menu from './menu';

export default combineReducers({
  routing: routerReducer,
  global,
  menu,
  loadingBar: loadingBarReducer,
});
