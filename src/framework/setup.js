import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import 'mxa/dist/mxa.less';

import configureStore from './store/configureStore';
import analytics from './service/analytics';
import { executeInit } from './service/ServiceInitHelper';

import routes from './routes';
import Loading from '../components/loading';
import { initApp } from './actions/global';

const setup = () => {
  const store = configureStore({});
  store.dispatch(initApp());
  executeInit(store);
  const history = syncHistoryWithStore(browserHistory, store);
  history.listen(location => analytics.track(location.pathname));

  const AppContainer = () => (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
        <Loading />
      </div>
    </Provider>
  );
  return AppContainer;
};

export default setup();
