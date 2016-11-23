import Home from './modules/home';
import Login from './modules/login';
import Register from './modules/login/register';
import FindPwd from './modules/login/findPwd';
// import PageContainer from './framework/pageContainer';
import NotFound from './modules/exception/404';
import App from './App';

// import { getToken } from './framework/service/CacheService';

export const CONTAINER_PRE = 'page_container';
export const CUSTOM_CONTAINER_PRE = 'custom_page_container';

// 登录后不可见页面的控制.
// const userIsInATeam = (nextState, replace, callback) => {
//  // if (getToken()) {
//  //   replace('/');
//  // }
//  callback();
// };

/* eslint-disable global-require */
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    // { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/findPwd', component: FindPwd },
    // { path: '/' + CONTAINER_PRE + '/**', component: PageContainer },
    {
      path: '/' + CONTAINER_PRE + '/**',
      getComponents(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./pageContainer/index').default);
        }, 'container');
      }
    },
    { path: '*', component: NotFound },
  ],
};

export default routes;
