/* eslint-disable import/no-extraneous-dependencies, global-require */

const MockerServer = require('json-mock-tool');

const inject = {
  '/Api/CashFlowItemList/render': () => require('./test.json')
};

MockerServer.start({
  dsl: '../dsl',
  port: 3003,
}, inject);
