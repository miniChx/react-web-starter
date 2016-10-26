/**
 * Created by baoyinghai on 10/20/16.
 */
import React from 'react';
import { Router } from 'react-router';
import { App, Home, NotFound, MenuManager, PageContainer, Login,
  Register, FindPwd
}
  from '../components';

const routeConfig = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/home', component: Home },
    { path: '/menu_manager', component: MenuManager },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/findPwd', component: FindPwd },
    { path: '/page_container/**', component: PageContainer },
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

