/**
 * Created by baoyinghai on 11/4/16.
 */
import { push } from 'react-router-redux';

const actionTrigger = (record, keyName) => {
  const operation = record[keyName] || {};
  console.log('url:', operation.actionUrl);
  const requestParams = operation.requestParams || [];
  const param = {};
  requestParams.every(paramName => {
    param[paramName] = record[paramName];
    return true;
  });
  console.log('param:', param);
};

export default actionTrigger;
