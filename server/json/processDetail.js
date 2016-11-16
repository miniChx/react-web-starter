/**
 * Created by baoyinghai on 11/16/16.
 */
{
  detailResult: {
    userName: null,
      age: null,
      joinDate: null,
      teacherName: null,
      managerOpinion: null,
      id: null
  },
  fields: [
    {
      name: 'userName',
      index: 1,
      entityShortName: 'usr',
      type: 'String',
      length: '10',
      description: '姓名',
      groupId: 1,
      isVisible: true,
      isReadonly: false,
      isRequired: true,
      displayComponent: [
        Object
      ]
    },
    {
      name: 'age',
      index: 2,
      entityShortName: 'usr',
      type: 'Integer',
      length: '8',
      description: '年龄',
      groupId: 1,
      isVisible: true,
      isReadonly: false,
      isRequired: true,
      displayComponent: [
        Object
      ]
    },
    {
      name: 'joinDate',
      index: 3,
      entityShortName: 'usr',
      type: 'Date',
      length: '10',
      description: '入职日期',
      groupId: 1,
      isVisible: true,
      isReadonly: false,
      isRequired: true,
      displayComponent: [
        Object
      ]
    },
    {
      name: 'teacherName',
      index: 4,
      entityShortName: 'usr',
      type: 'String',
      length: '10',
      description: '实习老师',
      groupId: 1,
      isVisible: true,
      isReadonly: false,
      isRequired: true,
      displayComponent: [
        Object
      ]
    },
    {
      name: 'managerOpinion',
      index: 5,
      entityShortName: 'biz',
      type: 'String',
      length: '20',
      description: '经理意见',
      groupId: 1,
      isVisible: true,
      isReadonly: false,
      isRequired: false,
      displayComponent: [
        Object
      ]
    },
    {
      name: 'id',
      index: 6,
      entityShortName: 'biz',
      type: 'Long',
      length: '8',
      description: 'ID',
      groupId: 1,
      isVisible: true,
      isReadonly: true,
      isRequired: true,
      displayComponent: [
        Object
      ]
    }
  ],
    buttons: [
  {
    buttonDescription: '申请转正',
    displayPosition: 'Bottom',
    interactiveType: 'Page',
    messagePromptType: 'message',
    domainLink: '/processesDetail/userApply',
    domainType: 'Detail',
    actionName: null,
    buttonCode: 'processes_Detail_userApply_In_processes_Detail',
    roles: null
  },
  {
    buttonDescription: '通过申请',
    displayPosition: 'Bottom',
    interactiveType: 'Page',
    messagePromptType: 'message',
    domainLink: '/processesDetail/agreeApply',
    domainType: 'Detail',
    actionName: null,
    buttonCode: 'processes_Detail_agreeApply_In_processes_Detail',
    roles: null
  },
  {
    buttonDescription: '邮件提醒',
    displayPosition: 'Bottom',
    interactiveType: 'Page',
    messagePromptType: 'message',
    domainLink: '/processesDetail/sendEmail',
    domainType: 'Detail',
    actionName: null,
    buttonCode: 'processes_Detail_sendEmail_In_processes_Detail',
    roles: null
  },
  {
    buttonDescription: '处理信息',
    displayPosition: 'Bottom',
    interactiveType: 'Page',
    messagePromptType: 'message',
    domainLink: '/processesDetail/registUserInfo',
    domainType: 'Detail',
    actionName: null,
    buttonCode: 'processes_Detail_registUserInfo_In_processes_Detail',
    roles: null
  }
]
}
