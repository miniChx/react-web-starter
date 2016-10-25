/**
 * Created by baoyinghai on 10/24/16.
 */


import NotMatchType from './NotMatchType';
import ListView from './listView';
import { PAGE_TYPE_LIST } from '../actions/types';

export default {
  default: NotMatchType,
  [PAGE_TYPE_LIST]: ListView
}
