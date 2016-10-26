/**
 * Created by baoyinghai on 10/24/16.
 */


import { NotMatchType, ListView, ListDetail } from '../../components';
import { PAGE_TYPE_LIST, PAGE_TYPE_DETAIL } from '../../actions/types';

export default {
  default: NotMatchType,
  [PAGE_TYPE_LIST]: ListView,
  [PAGE_TYPE_DETAIL]: ListDetail
}
