/**
 * Created by baoyinghai on 12/14/16.
 */

export default {
  apply: [
    {
      menuCode: 'QueryToDo',
      menuValue: '待处理的申请',
      domainLink: null,
    },
    {
      menuCode: 'QueryUnderReview',
      menuValue: '审核中的申请',
      domainLink: null,
    },
    {
      menuCode: 'QueryPassed',
      menuValue: '审批通过的申请',
      domainLink: null,
    },
    {
      menuCode: 'QueryReturned',
      menuValue: '被退回的申请',
      domainLink: null,
    },
    {
      menuCode: 'QueryRejected',
      menuValue: '被否决的申请',
      domainLink: null,
    },
  ],
  review: [
    {
      menuCode: 'QueryToDo',
      menuValue: '待处理的申请',
      domainLink: null,
    },
    {
      menuCode: 'QueryFinished',
      menuValue: '审核中的申请',
      domainLink: null,
    }
  ]
};
