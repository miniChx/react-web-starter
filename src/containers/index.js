import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import 'mxa/dist/mxa.less';

import MxRouter from '../router';

import { Loading } from '../components';

import configureStore from '../store/configureStore';
import analytics from '../actions/analytics';

import { executeInit } from '../service/ServiceInitHelper';
/* eslint-disable */
const setupWithRouteConfig = (store, history) => () => {
  return (
    <Provider store={store}>
      <div>
        <MxRouter history={history} />
        <Loading />
      </div>
    </Provider>
  );
};

const setup = () => {
  const store = configureStore({});
  executeInit(store);
  const history = syncHistoryWithStore(browserHistory, store);
  history.listen(location => analytics.track(location.pathname));

  const AppContainer = setupWithRouteConfig(store, history);
  return AppContainer;
};

export default setup();
