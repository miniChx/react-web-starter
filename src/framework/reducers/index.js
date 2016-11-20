import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import global from './global';
import menu from './menu';
import bizReducers from '../../bundle/reducer';

export default combineReducers({
  routing: routerReducer,
  global,
  menu,
  ...bizReducers
});
