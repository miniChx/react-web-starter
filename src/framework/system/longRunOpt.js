/**
 * Created by baoyinghai on 10/18/16.
 */
import co from 'co';
import { Modal } from 'mxa';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { dispatch } from '../service/DispatchService';
import { forceLogout } from '../actions/global';

/* eslint-disable */
export const longRunExec = (bizHandler, needLoding = true) => {

  const self = this;
  if (needLoding) {
    dispatch(showLoading());
  }
  co(function* () {
    yield bizHandler()
      .then((response) => {

      })
      .catch((errorData) => {
        if ('Network request failed' === errorData.message) {
          console.log('网络请求异常!');
        }
        console.log(errorData);
        Modal.error({
          title: '网络请求异常',
          content: errorData.message ? errorData.message : errorData.msgContent + '(' + errorData.ex + ')',
        });
        if (errorData.msgCode === 'SYSTEM_AUTH_HEADER_INVALID' || errorData.msgCode === 'SYSTEM_AUTH_HEADER_NOTMATCHED') {
          dispatch(forceLogout());
        }
      });
  }).catch((e) => {
    console.log(e);
    Modal.error({
      title: '系统异常',
      content: JSON.stringify(e)
    });
  }).then(() => {
    if (needLoding) {
      dispatch(hideLoading())
    }
  });
};

