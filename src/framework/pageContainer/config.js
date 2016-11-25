/**
 * Created by baoyinghai on 10/24/16.
 */
import NotMatchType from '../modules/exception/NotMatch';
import ListView from '../modules/list/listView';
import ListDetail from '../modules/list/listDetail';
import Process from '../modules/process/processList';
import ProcessDetail from '../modules/process/processDetail';
import ProcessImg from '../modules/process/processImg';

import {
  PAGE_TYPE_LIST,
  PAGE_TYPE_DETAIL,
  PAGE_TYPE_CUSTOM,
  PAGE_TYPE_PROCESS,
  PAGE_TYPE_PROCESS_DETAIL,
  PAGE_TYPE_PROCESS_IMG
} from '../constant/dictActions';

const defStr = 'default';
// console.log(NotMatchType);

export default {
  [defStr]: NotMatchType,
  [PAGE_TYPE_LIST]: ListView,
  [PAGE_TYPE_DETAIL]: ListDetail,
  [PAGE_TYPE_PROCESS]: Process,
  [PAGE_TYPE_PROCESS_DETAIL]: ProcessDetail,
  [PAGE_TYPE_PROCESS_IMG]: ProcessImg
};
