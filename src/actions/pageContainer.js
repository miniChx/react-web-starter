/**
 * Created by baoyinghai on 10/24/16.
 */
import { PFetch } from '../network/fetch';


export const getInitData = (link, param) => (dispatch, getState) => {
  return PFetch(link, param).then((d) => console.log('success', d)).catch(err => console.log('err: ', err));
};
