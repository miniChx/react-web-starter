/**
 * Created by baoyinghai on 10/18/16.
 */

import co from 'co';
import { dispatch } from '../service/DispatchService';
import { fetchStart, fetchEnd } from '../actions/showLoading';
import { Modal, Button } from 'mxa';


export const longRunExec = (bizHandler, needLoding = true) => {

  const self = this;
  if (needLoding) {
    dispatch(fetchStart());
  }
  co(function* () {
    yield bizHandler()
      .then((response) => {

      })
      .catch((errorData) => {
        if ('Network request failed' === errorData.message)
          console.log('网络请求异常!');
        Modal.error({
          title: '网络请求异常',
          content: errorData.message,
        });
      });
    if (needLoding) {
      dispatch(fetchEnd());
    }
  }).catch((e) => {
    console.log('err', e);
  });
};

