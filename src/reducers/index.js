import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import count from './count';
import global from './global';

export default combineReducers({
  count,
  routing: routerReducer,
  global,
});
