/**
 * Created by baoyinghai on 10/20/16.
 */
import React from 'react';
import { Router } from 'react-router';
import { App, Home, NotFound, MenuManager, PageContainer, Login,
  Register, FindPwd
}
  from '../components';

import { getToken } from '../service/CacheService';

export const CONTAINER_PRE = 'page_container';

// 登录后不可见页面的控制.
const userIsInATeam = (nextState, replace, callback) => {
  if (getToken()) {
    replace('/');
  }
  callback();
};


const routeConfig = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/home', component: Home },
    { path: '/menu_manager', component: MenuManager },
    { path: '/login', component: Login, onEnter: userIsInATeam },
    { path: '/register', component: Register, onEnter: userIsInATeam },
    { path: '/findPwd', component: FindPwd, onEnter: userIsInATeam },
    { path: '/' + CONTAINER_PRE + '/**', component: PageContainer },
    { path: '*', component: NotFound },
  ]
};

/* eslint-disable */
export default class MxRouter extends React.Component {

  render() {
    return (
      <Router history={this.props.history} routes={routeConfig} />
    );
  }
}

