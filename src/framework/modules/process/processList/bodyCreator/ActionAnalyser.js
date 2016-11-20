/**
 * Created by baoyinghai on 11/4/16.
 */
import { push } from 'react-router-redux';
import { dispatch } from '../../../../service/DispatchService';
import { CONTAINER_PRE } from '../../../../../routes';
import { PAGE_TYPE_PROCESS_DETAIL, PAGE_TYPE_PROCESS_IMG } from '../../../../../constant/dictActions';
import { showModal } from '../../../../pageContainer/ModalWrapper';

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

  if (operation.actionUrl && operation.actionUrl.indexOf('diagram-viewer') >= 0) {
    showModal({ imgUrl: operation.actionUrl, ...param }, PAGE_TYPE_PROCESS_IMG, 'imageView');
    // window.open('/' + operation.actionUrl);
    //  dispatch(push({
    //    pathname: '/' + CONTAINER_PRE + '/imageView',
    //    query: { ...param, domainType: PAGE_TYPE_PROCESS_IMG, imgUrl: operation.actionUrl }
    //  }));
  } else {
    dispatch(push({
      pathname: '/' + CONTAINER_PRE + '/Api' + operation.actionUrl,
      query: { ...param, domainType: PAGE_TYPE_PROCESS_DETAIL }
    }));
  }
};

export default actionTrigger;
