import { trimStart } from 'lodash/string';
import Qs from 'qs';
import Home from '../bundles/home';
import Login from './modules/login';
import Register from './modules/login/register';
import FindPwd from './modules/login/findPwd';
import PageContainer from './pageContainer';
import NotFound from './modules/exception/404';
import App from './App';
import exclusive from './pageContainer/exclusive';
import { PFetch } from './system/fetch';
import { longRunExec } from './system/longRunOpt';
import { savePageData, getPageData } from './service/CacheService';
// import { getToken } from './framework/service/CacheService';

export const CONTAINER_PRE = 'page_container';
export const CUSTOM_CONTAINER_PRE = 'custom_page_container';

const getUrlPath = url => url;

// 要初始化数据的页面
const getPageInitData = (nextState, replace, callback) => {
  const domainLink = nextState.params.splat;
  if (domainLink && !exclusive.some(f => f(domainLink))) {
    const url = getUrlPath(trimStart(domainLink, '/'));
    const params = { ...nextState.params };
    if (nextState.location) {
      const query = nextState.location.query && nextState.location.query.p && atob(nextState.location.query.p);
      Object.assign(params, Qs.parse(query));
    }
    longRunExec(() => PFetch(url, params)
      .then(data => {
        // TODO:如何保存此时的数据
        savePageData(data);
        callback();
      }));
  } else {
    savePageData([]);
    callback();
  }
};

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
      component: PageContainer,
      // getComponents(nextState, callback) {
      //   require.ensure([], require => {
      //     callback(null, require('./pageContainer/index').default);
      //   }, 'container');
      // },
      onEnter: getPageInitData
    },
    { path: '*', component: NotFound },
  ],
};

export default routes;
