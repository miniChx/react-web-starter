/**
 * Created by baoyinghai on 11/10/16.
 */
import executeJS from './JSExecutor';
import { dispatch } from '../../../service/DispatchService';

export const handleChange = e => {
  // dispatch(replace);
  if (e && e.indexOf('${') >= 0) {
    console.log('is a function');
    const itemVar = executeJS(e);
    console.log(itemVar);
  } else {
    console.log(e);
  }
};


export const handleInputChange = e => {
  // dispatch();
  console.log(e);
};
