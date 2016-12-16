/**
 * Created by baoyinghai on 10/24/16.
 */
import NotMatchType from '../modules/exception/NotMatch';
import ListView from '../modules/list';
import ListDetail from '../modules/detail';
import Process from '../modules/process/processList';
import ProcessDetail from '../modules/process/processDetail';
import ProcessImg from '../modules/process/processImg';
import Info from '../modules/info';

import {
  PAGE_TYPE_LIST,
  PAGE_TYPE_DETAIL,
  PAGE_TYPE_CUSTOM,
  PAGE_TYPE_PROCESS,
  PAGE_TYPE_PROCESS_DETAIL,
  PAGE_TYPE_PROCESS_IMG,
  PAGE_TYPE_INFO,
  PAGE_TYPE_SUMMARY
} from '../constant/dictActions';

export const templeteTypes = [PAGE_TYPE_LIST, PAGE_TYPE_DETAIL, PAGE_TYPE_INFO, PAGE_TYPE_SUMMARY];

const defStr = 'default';
// console.log(NotMatchType);

export default {
  [PAGE_TYPE_LIST]: ListView,
  [PAGE_TYPE_DETAIL]: ListDetail,
  [PAGE_TYPE_SUMMARY]: ListDetail,
  [PAGE_TYPE_PROCESS]: Process,
  [PAGE_TYPE_PROCESS_DETAIL]: ProcessDetail,
  [PAGE_TYPE_PROCESS_IMG]: ProcessImg,
  [PAGE_TYPE_INFO]: Info,
  [defStr]: NotMatchType,
};
