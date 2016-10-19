
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import configureStore from '../store/configureStore';

// import { setLayout } from '../actions/device';
// import { initApp } from '../actions/global';

import { App, Home, Foo, SubPage, NoMatch, Loading } from '../components';

import { executeInit } from '../service/ServiceInitHelper';

// eslint-disable-next-line no-unused-vars
const setupWithComponents = (store, history) => () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="foo" component={Foo} />
          <Route path="page:index" component={SubPage} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    </Provider>
  );
};

const setupWithRouteConfig = (store, history) => () => {
  const routeConfig = {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
      { path: 'foo', component: Foo },
      { path: 'page:index', component: SubPage },
      { path: '*', component: NoMatch },
    ]
  };

  return (
    <Provider store={store}>
      <Router history={history} routes={routeConfig} />
    </Provider>
  );
};

const setup = () => {
  const store = configureStore({});
  const history = syncHistoryWithStore(browserHistory, store);

  // const AppContainer = setupWithComponents(store, history);
  const AppContainer = setupWithRouteConfig(store, history);

  return AppContainer;
};

export default setup();
