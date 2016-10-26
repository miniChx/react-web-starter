import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import count from './count';
import global from './global';
import menu from './menu';
import session from './session';

export default combineReducers({
  count,
  routing: routerReducer,
  global,
  menu,
  session
});
