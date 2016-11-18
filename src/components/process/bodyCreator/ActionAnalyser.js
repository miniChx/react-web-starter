/**
 * Created by baoyinghai on 11/4/16.
 */
import { push } from 'react-router-redux';
import { dispatch } from '../../../service/DispatchService';
import { CONTAINER_PRE } from '../../../routes';
import { PAGE_TYPE_PROCESS_DETAIL } from '../../../constant/dictActions';

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
  dispatch(push({
    pathname: '/' + CONTAINER_PRE + '/Api' + operation.actionUrl,
    query: { ...param, domainType: PAGE_TYPE_PROCESS_DETAIL }
  }));
};

export default actionTrigger;
