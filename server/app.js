var express = require('express');
var bodyParder = require('body-parser');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
  next();
}

app.use(allowCrossDomain);
app.use(bodyParder());

app.get('/hello', function (req, res) {
  setTimeout(() =>  res.send({data: [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'},
    {name: 'E'},
    {name: 'F'},
    {name: 'G'}
  ],
    token: '123123'
  }), 1000);

});



app.post('/Advice/getMenus', function (req, res) {
  res.json({result: [
    {
      "displaySequence":1,
      "menuCode":"renderList",
      "domainType": 'List',
      "menuValue":"系统管理",
      "roleCodes":[
        "Role1",
        "Role2",
        "Role5"
      ],
      "subMenus":[
        {
          "displaySequence":1,
          "menuCode":"orgManagement",
          "menuValue":"机构管理",
          "roleCodes":[
            "Role1",
            "Role5"
          ],
          "subMenus":[
            {
              "displaySequence":1,
              "domainLink":"/org_apply_list",
              "menuCode":"orgApplyManagement",
              "menuValue":"机构申请",
              "roleCodes":[
                "Role1"
              ]
            },
            {
              "displaySequence":2,
              "menuCode":"orgApproveManagement",
              "menuValue":"机构审批",
              "roleCodes":[
                "Role1",
                "Role5"
              ],
              "subMenus":[
                {
                  "displaySequence":1,
                  "domainLink":"/org_approve_undo_list",
                  "menuCode":"orgApproveUndo",
                  "menuValue":"未完成的工作",
                  "roleCodes":[
                    "Role1"
                  ]
                }
              ]
            }
          ]
        },
        {
          "displaySequence":2,
          "domainLink":"/AccountList/render",
          "domainType": 'List',
          "menuCode":"accountManagement",
          "menuValue":"用户管理",
          "roleCodes":[
            "Role1",
            "Role2"
          ]
        }
      ]
    },
    {
      "displaySequence":2,
      "domainLink":"/demo_list",
      "menuCode":"caseManagement",
      "menuValue":"案例管理",
      "domainType": 'List',
      "roleCodes":[
        "Role1",
        "Role3",
        "Role4"
      ]
    }
  ]});
});


app.post('/AccountList/render', function (req, res) {
  setTimeout(() =>
  res.json({
    "pageResult": {
      "pageIndex": 1,
      "itemsPerPage": 10,
      "totalPages": 2,
      "contentList": [
        {
          "id": 1,
          "email": "lfzhu@amarsoft.com",
          "mobileNo": "13811111111",
          "password": "123456",
          "realName": "德鲁大叔",
          "department": "研发部",
          "jobTitle": "攻城狮",
          "telephoneNo": "111",
          "address": "无锡",
          "status": "ACTIVE",
          "age": 1
        },
        {
          "id": 3,
          "email": "qliu@amarsoft.com",
          "mobileNo": "13833333333",
          "password": "12345678",
          "realName": "白小飞",
          "department": "经理办公室",
          "jobTitle": "技术总监",
          "telephoneNo": "333",
          "address": "江西",
          "status": "ACTIVE",
          "age": 3
        },
        {
          "id": 4,
          "email": "email1",
          "mobileNo": "111",
          "password": "111",
          "realName": "111",
          "department": "部门1",
          "jobTitle": "job1",
          "telephoneNo": "444",
          "address": "山东",
          "status": "ACTIVE",
          "age": 4
        },
        {
          "id": 7,
          "email": "email13",
          "mobileNo": "mobileNo13",
          "password": "password13",
          "realName": "realName13",
          "department": "department13",
          "jobTitle": "jobTitle13",
          "telephoneNo": "777",
          "address": "address",
          "status": "ACTIVE",
          "age": 7
        },
        {
          "id": 9,
          "email": "email4",
          "mobileNo": "mobileNo4",
          "password": "password4",
          "realName": "realName4",
          "department": "department4",
          "jobTitle": "jobTitle4",
          "telephoneNo": "999",
          "address": "address",
          "status": "ACTIVE",
          "age": 9
        },
        {
          "id": 10,
          "email": "email9",
          "mobileNo": "mobileNo9",
          "password": "password9",
          "realName": "realName9",
          "department": "department9",
          "jobTitle": "jobTitle9",
          "telephoneNo": "111",
          "address": "address",
          "status": "ACTIVE",
          "age": 10
        },
        {
          "id": 11,
          "email": "email10",
          "mobileNo": "mobileNo10",
          "password": "password10",
          "realName": "realName10",
          "department": "department10",
          "jobTitle": "jobTitle10",
          "telephoneNo": "222",
          "address": "address",
          "status": "ACTIVE",
          "age": 11
        },
        {
          "id": 12,
          "email": "email16",
          "mobileNo": "mobileNo16",
          "password": "password16",
          "realName": "realName16",
          "department": "department16",
          "jobTitle": "jobTitle16",
          "telephoneNo": "333",
          "address": "address",
          "status": "ACTIVE",
          "age": 12
        },
        {
          "id": 13,
          "email": "email17",
          "mobileNo": "mobileNo17",
          "password": "password17",
          "realName": "realName17",
          "department": "department17",
          "jobTitle": "jobTitle17",
          "telephoneNo": "444",
          "address": "address",
          "status": "ACTIVE",
          "age": 13
        },
        {
          "id": 14,
          "email": "email11",
          "mobileNo": "mobileNo11",
          "password": "password11",
          "realName": "realName11",
          "department": "department11",
          "jobTitle": "jobTitle11",
          "telephoneNo": "555",
          "address": "address",
          "status": "ACTIVE",
          "age": 14
        }
      ],
      "totalItems": 20
    },
    "itemsPerPage": 10,
    "fields": [
      {
        "name": "Id",
        "index": 1,
        "entityShortName": "A",
        "type": "Long",
        "description": "编号",
        "groupId": 1,
        "isVisible": false,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "Email",
        "index": 2,
        "entityShortName": "A",
        "type": "String",
        "description": "邮箱",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "MobileNo",
        "index": 3,
        "entityShortName": "A",
        "type": "String",
        "description": "手机号",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "Password",
        "index": 4,
        "entityShortName": "A",
        "type": "String",
        "description": "密码",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "RealName",
        "index": 5,
        "entityShortName": "A",
        "type": "String",
        "description": "真实姓名",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "Department",
        "index": 6,
        "entityShortName": "A",
        "type": "String",
        "description": "部门",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "JobTitle",
        "index": 7,
        "entityShortName": "A",
        "type": "String",
        "description": "职位",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "TelephoneNo",
        "index": 8,
        "entityShortName": "A",
        "type": "String",
        "description": "座机号",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "Address",
        "index": 9,
        "entityShortName": "A",
        "type": "String",
        "description": "地址",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "Status",
        "index": 10,
        "entityShortName": "A",
        "type": "String",
        "description": "状态",
        "groupId": 1,
        "isVisible": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      },
      {
        "name": "Age",
        "index": 11,
        "entityShortName": "A",
        "type": "Integer",
        "description": "年龄",
        "groupId": 1,
        "isVisible": false,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      }
    ],
    "buttons": [
      {
        "buttonDescription": "添加",
        "actionType": "DoAction",
        "domainLink": null,
        "actionName": "/AccountDetail/render",
        "roles": [
          "Role1",
          "Role2",
          "Role3"
        ]
      },
      {
        "buttonDescription": "删除",
        "actionType": "DoAction",
        "domainLink": null,
        "actionName": "/AccountDetail/deleteById",
        "roles": [
          "Role1",
          "Role2",
          "Role3"
        ]
      },
      {
        "buttonDescription": "详情",
        "actionType": "DoAction",
        "domainLink": "/AccountDetail/findById",
        "actionName": null,
        "roles": [
          "Role1",
          "Role2",
          "Role3"
        ]
      },
      {
        "buttonDescription": "筛选",
        "actionType": "DoAction",
        "domainLink": "/AccountList/search",
        "actionName": null,
        "roles": [
          "Role1",
          "Role2",
          "Role3"
        ]
      }
    ],
    "filterItems": [
      {
        "fieldName": "Status",
        "displayName": "状态",
        "displaySeq": 1,
        "options": [
          {
            "displayName": "全部",
            "displayCode": "ACCOUNT_STATUS_ALL",
            "displaySeq": 1,
            "isSelected": false
          },
          {
            "displayName": "有效用户",
            "displayCode": "ACCOUNT_STATUS_ACTIVE",
            "displaySeq": 2,
            "isSelected": true
          },
          {
            "displayName": "已删除用户",
            "displayCode": "ACCOUNT_STATUS_DELETED",
            "displaySeq": 3,
            "isSelected": false
          }
        ]
      },
      {
        "fieldName": "Age",
        "displayName": "年龄",
        "displaySeq": 1,
        "options": [
          {
            "displayName": "全部",
            "displayCode": "ACCOUNT_AGE_ALL",
            "displaySeq": 1,
            "isSelected": true
          },
          {
            "displayName": "小于5岁",
            "displayCode": "ACCOUNT_AGE_LT_5",
            "displaySeq": 2,
            "isSelected": false
          },
          {
            "displayName": "5-10岁",
            "displayCode": "ACCOUNT_AGE_BT_5_AND_10",
            "displaySeq": 3,
            "isSelected": false
          },
          {
            "displayName": "大于10岁",
            "displayCode": "ACCOUNT_AGE_GT_10",
            "displaySeq": 4,
            "isSelected": false
          }
        ]
      }
    ],
    "orderItems": [
      {
        "fieldName": "Status",
        "displayName": "状态",
        "displaySeq": 1,
        "isSelected": true,
        "isAsc": true
      },
      {
        "fieldName": "Age",
        "displayName": "年龄",
        "displaySeq": 2,
        "isSelected": false,
        "isAsc": false
      }
    ]
  })
  , 1000);
});

var handler = function() {
  var server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
};

module.exports = { run: handler };
