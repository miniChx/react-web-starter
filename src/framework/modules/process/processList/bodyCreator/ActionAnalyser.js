/**
 * Created by vison on 11/4/16.
 */
import { push } from 'react-router-redux';
import Qs from 'qs';
import { dispatch } from '../../../../service/DispatchService';
import { CONTAINER_PRE } from '../../../../routes';
import { PAGE_TYPE_PROCESS_DETAIL, PAGE_TYPE_PROCESS_IMG, PAGE_TYPE_PROCESS } from '../../../../constant/dictActions';
import { showModal } from '../../../../pageContainer/ModalWrapper';
import { PFetch } from '../../../../system/fetch';

const actionTrigger = (record, keyName, props) => {
  const operation = record[keyName] || {};
  console.log('url:', operation.actionUrl);
  const requestParams = operation.requestParams || [];
  const param = {};
  requestParams.every(paramName => {
    param[paramName] = record[paramName];
    return true;
  });
  console.log('param:', param);

  if (operation.actionUrl && operation.actionUrl.indexOf('diagram-viewer') >= 0) {
    dispatch(push({
      pathname: '/' + CONTAINER_PRE + '/imageView',
      query: { ...param, domainType: PAGE_TYPE_PROCESS_IMG, imgUrl: operation.actionUrl }
    }));
  } else if (operation.needPostBack) {
    props.exec(() => {
      return PFetch('/Api' + operation.actionUrl, param).then(() => {
        props.filterData();
      });
    });
  } else {
    dispatch(push({
      pathname: '/' + CONTAINER_PRE + '/Api' + operation.actionUrl,
      query: { ...param, domainType: PAGE_TYPE_PROCESS_DETAIL }
    }));
  }
};

export default actionTrigger;
