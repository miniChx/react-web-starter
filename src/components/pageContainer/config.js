/**
 * Created by baoyinghai on 10/24/16.
 */
import NotMatchType from '../notMatchType';
import ListView from '../listView';
import ListDetail from '../listDetail';
import Process from '../process';
import ProcessDetail from '../processDetail';

import {
  PAGE_TYPE_LIST,
  PAGE_TYPE_DETAIL,
  PAGE_TYPE_PROCESS,
  PAGE_TYPE_PROCESS_DETAIL
} from '../../constant/dictActions';

const defStr = 'default';
// console.log(NotMatchType);

export default {
  [defStr]: NotMatchType,
  [PAGE_TYPE_LIST]: ListView,
  [PAGE_TYPE_DETAIL]: ListDetail,
  [PAGE_TYPE_PROCESS]: Process,
  PAGE_TYPE_PROCESS_DETAIL: ProcessDetail
};
