/**
 * Created by baoyinghai on 10/18/16.
 */
import { GFetch } from '../../network/fetch';


export const testFetch = () => (dispatch, getState) => {
  return GFetch('/hello', null).then((d) => console.log(d)).catch(err => console.log(err));
};