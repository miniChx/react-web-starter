/**
 * Created by vison on 12/21/16.  评论组件
 */

import React from 'react';
import Detail from '../../framework/modules/detail';

/* eslint-disable */
const data = {
  "detailResult": {},
  "columnNumber": 1,
  "fields": [
    {
      "name": "serialNo",
      "isMainEntityKey": false,
      "fieldCode": "ENTERPRISECUSBASICINFO_SERIALNO_IN_ENTERPRISECUSBASICINFO_DETAIL",
      "index": 1,
      "entityShortName": "lea",
      "type": "String",
      "length": 20,
      "description": "意见选择",
      "groupId": 1,
      "groupName": "流程审批",
      "isVisible": true,
      "isReadonly": false,
      "isRequired": true,
      "displayComponent": {
        "componentType": "RADIOGROUP",
        "dictionaryCategory": "SHAREHOLDER_TYPE",
        "dictionaryItems": [
          {
            "code": "AGREE",
            "value": "同意",
            "displaySequence": 1
          },
          {
            "code": "LAST",
            "value": "退回上一步",
            "displaySequence": 2
          },{
            "code": "ANY",
            "value": "退回到任意阶段",
            "displaySequence": 2
          }
        ]
      },
      "validateType": null,
      "opt": null,
      "modalInput": null,
      "initValueSource": {
        "bindParameter": {
          "name": "splat",
          "value": "AGREE"
        }
      }
    },
    {
      "name": "leaseeName",
      "isMainEntityKey": false,
      "fieldCode": "ENTERPRISECUSBASICINFO_LEASEENAME_IN_ENTERPRISECUSBASICINFO_DETAIL\n            ",
      "index": 2,
      "entityShortName": "lea",
      "type": "String",
      "length": 30,
      "description": "退回用户名称",
      "groupId": 1,
      "groupName": "流程审批",
      "isVisible": false,
      "isReadonly": false,
      "isRequired": true,
      "displayComponent": {
        "componentType": "SELECT",
        "dictionaryCategory": "SHAREHOLDER_TYPE",
        "dictionaryItems": [
          {
            "code": "AGREE",
            "value": "选项1",
            "displaySequence": 1
          },
          {
            "code": "LAST",
            "value": "选项2",
            "displaySequence": 2
          }
        ]
      },
      "validateType": null,
      "opt": null,
      "modalInput": null
    },
    {
      "name": "certificateType",
      "isMainEntityKey": false,
      "fieldCode": "ENTERPRISECUSBASICINFO_CERTIFICATETYPE_IN_ENTERPRISECUSBASICINFO_DETAIL\n            ",
      "index": 5,
      "entityShortName": "lea",
      "type": "String",
      "length": 40,
      "description": "指定提交方式",
      "groupId": 1,
      "groupName": "流程审批",
      "isVisible": false,
      "isReadonly": false,
      "isRequired": true,
      "displayComponent": {
        "componentType": "RADIOGROUP",
        "dictionaryCategory": "SHAREHOLDER_TYPE",
        "dictionaryItems": [
          {
            "code": "AGREE",
            "value": "顺序提交",
            "displaySequence": 1
          },
          {
            "code": "LAST",
            "value": "提交到当前阶段",
            "displaySequence": 2
          }
        ]
      },
      "initValueSource": {
        "bindParameter": {
          "name": "splat",
          "value": "AGREE"
        }
      },
      "validateType": null,
      "opt": null,
      "modalInput": null
    },
    {
      "name": "name",
      "isMainEntityKey": false,
      "fieldCode": "ENTERPRISECUSBASICINFO_NAME_IN_ENTERPRISECUSBASICINFO_DETAIL",
      "index": 4,
      "entityShortName": "per",
      "type": "String",
      "length": 50,
      "description": "指定上一步审批人",
      "groupId": 1,
      "groupName": "基本信息",
      "isVisible": false,
      "isReadonly": false,
      "isRequired": true,
      "displayComponent": {
        "componentType": "SELECT",
        "dictionaryCategory": "SHAREHOLDER_TYPE",
        "dictionaryItems": [
          {
            "code": "AGREE",
            "value": "选项1",
            "displaySequence": 1
          },
          {
            "code": "LAST",
            "value": "选项2",
            "displaySequence": 2
          }
        ]
      },
      "validateType": null,
      "opt": null,
      "modalInput": null
    },
    {
      "name": "certificateNo",
      "isMainEntityKey": false,
      "fieldCode": "ENTERPRISECUSBASICINFO_CERTIFICATENO_IN_ENTERPRISECUSBASICINFO_DETAIL\n            ",
      "index": 6,
      "entityShortName": "lea",
      "type": "String",
      "length": 30,
      "description": "意见详情",
      "groupId": 1,
      "groupName": "证件类型",
      "isVisible": true,
      "isReadonly": false,
      "isRequired": true,
      "displayComponent": {
        "componentType": "TEXTAREA",
        "dictionaryCategory": "",
        "dictionaryItems": []
      },
      "validateType": null,
      "opt": null,
      "modalInput": null
    }
  ],
  "buttons": [
    {
      "buttonDescription": "保存",
      "displayPosition": "TOP",
      "interactiveType": "ACTION",
      "messagePromptType": "MESSAGE",
      "domainLink": null,
      "domainType": "Detail",
      "actionName": "/Api/EnterpriseCusBasicInfoDetail/update",
      "buttonCode": "enterpriseCusBasicInfo_Detail_update_In_enterpriseCusBasicInfo_Detail\n            ",
      "transmitParameters": null,
      "bindParameterType": "ALL",
      "bindParameters": null
    },{
      "buttonDescription": "提交",
      "displayPosition": "TOP",
      "interactiveType": "ACTION",
      "messagePromptType": "MESSAGE",
      "domainLink": null,
      "domainType": "Detail",
      "actionName": "/Api/EnterpriseCusBasicInfoDetail/update",
      "buttonCode": "enterpriseCusBasicInfo_Detail_update_In_enterpriseCusBasicInfo_Detail\n            ",
      "transmitParameters": null,
      "bindParameterType": "ALL",
      "bindParameters": null
    },{
      "buttonDescription": "意见附件",
      "displayPosition": "TOP",
      "interactiveType": "ACTION",
      "messagePromptType": "MESSAGE",
      "domainLink": null,
      "domainType": "Detail",
      "actionName": "/Api/EnterpriseCusBasicInfoDetail/update",
      "buttonCode": "enterpriseCusBasicInfo_Detail_update_In_enterpriseCusBasicInfo_Detail\n            ",
      "transmitParameters": null,
      "bindParameterType": "ALL",
      "bindParameters": null
    },{
      "buttonDescription": "返回",
      "displayPosition": "TOP",
      "interactiveType": "ACTION",
      "messagePromptType": "MESSAGE",
      "domainLink": null,
      "domainType": "Detail",
      "actionName": "/Api/EnterpriseCusBasicInfoDetail/update",
      "buttonCode": "enterpriseCusBasicInfo_Detail_update_In_enterpriseCusBasicInfo_Detail\n            ",
      "transmitParameters": null,
      "bindParameterType": "ALL",
      "bindParameters": null
    }
  ]
}

export default class RemarkCommet extends React.Component {

  renderAnalyser(analyserName, field, fieldCtrl) {
    if (field.name === 'serialNo') {
      return createComp(RadioGroup, fieldCtrl, (e, helper) => {
        if (e.target.value === 'AGREE') {
          helper.setFieldVisible('name', false); // 指定上一步审批人
          helper.setFieldVisible('leaseeName', false); // 退回用户名称
          helper.setFieldVisible('certificateType', false);// 指定提交方式
          // helper.setFieldVisible('certificateNo', true);
        } else if (e.target.value === 'LAST') {
          helper.setFieldVisible('name', true); // 指定上一步审批人
          helper.setFieldVisible('leaseeName', false); // 退回用户名称
          helper.setFieldVisible('certificateType', false);// 指定提交方式
        } else if (e.target.value === 'ANY') {
          helper.setFieldVisible('name', false); // 指定上一步审批人
          helper.setFieldVisible('leaseeName', true); // 退回用户名称
          helper.setFieldVisible('certificateType', true);// 指定提交方式
        }
      });
    }
    return false;
  }

  render() {
    return (
      <Detail dataSource={data} renderAnalyser={this.renderAnalyser} />
    );
  }
}
