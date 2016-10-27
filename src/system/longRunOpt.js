/**
 * Created by baoyinghai on 10/18/16.
 */
import co from 'co';
import { Modal } from 'mxa';
import { dispatch } from '../service/DispatchService';
import { fetchStart, fetchEnd } from '../actions/showLoading';
/* eslint-disable */
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
  }).catch((e) => {
    console.log(e);
    Modal.error({
      title: '系统异常',
      content: JSON.stringify(e)
    });
  }).then(() => {
    if (needLoding) {
      dispatch(fetchEnd());
    }
  });
};

