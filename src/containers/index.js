import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import MxRouter from '../router';
import { syncHistoryWithStore } from 'react-router-redux';

import { Loading } from '../components';

import 'mxa/dist/mxa.less';

import configureStore from '../store/configureStore';
import analytics from '../actions/analytics';

import { executeInit } from '../service/ServiceInitHelper';

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
  const AppContainer = setupWithRouteConfig(store, history);

  return AppContainer;
};

export default setup();
