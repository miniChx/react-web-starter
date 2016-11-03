import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import global from './global';
import menu from './menu';
import session from './session';

export default combineReducers({
  routing: routerReducer,
  global,
  menu,
  session
});
