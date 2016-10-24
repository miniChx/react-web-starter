import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import count from './count';
import global from './global';
import menu from './menu';
import pages from './pages';

export default combineReducers({
  count,
  routing: routerReducer,
  global,
  menu,
  pages
});
