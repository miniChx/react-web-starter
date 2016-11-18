
import {
  App,
  Home,
  NotFound,
  PageContainer,
  CustomPageContainer,
  Login,
  Register,
  FindPwd,
} from './components';
import { getToken } from './service/CacheService';

export const CONTAINER_PRE = 'page_container';
export const CUSTOM_CONTAINER_PRE = 'custom_page_container';

// 登录后不可见页面的控制.
// const userIsInATeam = (nextState, replace, callback) => {
//  // if (getToken()) {
//  //   replace('/');
//  // }
//  callback();
// };

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/findPwd', component: FindPwd },
    { path: '/' + CONTAINER_PRE + '/**', component: PageContainer },
    { path: '*', component: NotFound },
  ],
};

export default routes;
