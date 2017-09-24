import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Qs from 'qs';
// import LoadingBar from 'react-redux-loading-bar';
import LoadingBar from '../components/loading-bar';

import configureStore from './store/configureStore';
import analytics from './service/analytics';
import { executeInit } from './service/ServiceInitHelper';

import routes from './routes';
import { initApp, updateQuery } from './actions/global';
import appStyle from '../framework/styles/views/app.less';

const setup = () => {
  const store = configureStore({});
  store.dispatch(initApp());
  executeInit(store);
  const history = syncHistoryWithStore(browserHistory, store);
  history.listen(location => {
    analytics.track(location.pathname);
    if (location.query.p === undefined) {
      store.dispatch(updateQuery({}));
    } else {
      const query = atob(location.query.p);
      store.dispatch(updateQuery(Qs.parse(query)));
    }
  });

  const AppContainer = () => (
    <Provider store={store}>
      <div>
        <LoadingBar className={appStyle.appLoadBar} />
        <Router history={history} routes={routes} />
      </div>
    </Provider>
  );
  return AppContainer;
};

export default setup();
