/**
 * Created by baoyinghai on 10/18/16.
 */

import co from 'co';
import { dispatch } from '../service/DispatchService';
import { fetchStart, fetchEnd } from '../actions/showLoading';

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

      });
    if (needLoding) {
      dispatch(fetchEnd());
    }
  }).catch((e) => {

  });
};

