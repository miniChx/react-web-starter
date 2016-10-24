
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'mxa/dist/mxa.less';

import configureStore from '../store/configureStore';
import analytics from '../actions/analytics';

// import { setLayout } from '../actions/device';
// import { initApp } from '../actions/global';

import { App, Home, Foo, SubPage, DemoWrapper, NotFound } from '../components';
import { ListDemo1, ListDemo2, Tree } from '../components/demos';

// eslint-disable-next-line no-unused-vars, arrow-body-style
const setupWithComponents = (store, history) => () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="foo" component={Foo} />
          <Route path="page:index" component={SubPage} />
          <Route path="demo" component={DemoWrapper}>
            <IndexRoute component={ListDemo2} />
            <Route path="tree" component={Tree} />
            <Route path="list">
              <IndexRoute component={ListDemo1} />
              <Route path="1" component={ListDemo1} />
              <Route path="2" component={ListDemo2} />
            </Route>
          </Route>
          <Route path="*" component={NotFound} />
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
      {
        path: 'demo',
        component: DemoWrapper,
        indexRoute: { component: ListDemo1 },
        childRoutes: [
          {
            path: 'list',
            indexRoute: { component: ListDemo1 },
            childRoutes: [
              { path: '1', component: ListDemo1 },
              { path: '2', component: ListDemo2 },
            ]
          },
          { path: 'tree', component: Tree },
        ]
      },
      { path: '*', component: NotFound },
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

  history.listen(location => analytics.track(location.pathname));

  // const AppContainer = setupWithComponents(store, history);
  const AppContainer = setupWithRouteConfig(store, history);

  return AppContainer;
};

export default setup();
