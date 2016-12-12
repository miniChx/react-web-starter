/**
 * bind your biz module on domainLink
 */

import example from './biz';

export default {
  '/example/tab': example.tab,
  '/example/modalInput': example.modalInput,
  '/example/hello': example.hello,
  '/example/layout': example.layout,
  '/Process/todo': example.list,
  '/Api/EnterpriseCusBasicInfoList/render': example.EnterpriseCusBasicInfoList,
  '/Api/EnterpriseHistoryDetail/render': example.historyDetail,
  '/AccountDetail/render': example.historyDetail,
};
