/**
 * Created by baoyinghai on 10/24/16.
 */
import NotMatchType from '../notMatchType';
import ListView from '../listView';
import ListDetail from '../listDetail';
import {
  StartProcess,
  ToDoProcess,
  UnfinishedProcess,
  FinishedProcess
} from '../process';

import {
  PAGE_TYPE_LIST,
  PAGE_TYPE_DETAIL,
  PAGE_TYPE_PROCESS_START,
  PAGE_TYPE_PROCESS_TODO,
  PAGE_TYPE_PROCESS_FINISHED,
  PAGE_TYPE_PROCESS_UNFINISHED
} from '../../actions/types';

const defStr = 'default';
// console.log(NotMatchType);

export default {
  [defStr]: NotMatchType,
  [PAGE_TYPE_LIST]: ListView,
  [PAGE_TYPE_DETAIL]: ListDetail,
  [PAGE_TYPE_PROCESS_START]: StartProcess,
  [PAGE_TYPE_PROCESS_TODO]: ToDoProcess,
  [PAGE_TYPE_PROCESS_FINISHED]: UnfinishedProcess,
  [PAGE_TYPE_PROCESS_UNFINISHED]: FinishedProcess,
};
