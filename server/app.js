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


app.post('/AccountList/render', function (req, res) {
  setTimeout(() =>
  res.json({
    "detailResult": null,
    "fields": [
      {
        "name": "Id",
        "index": 1,
        "entityShortName": "A",
        "type": "Long",
        "length": "8",
        "description": "编号",
        "groupId": 1,
        "isVisible": false,
        "isReadonly": true,
        "isRequired": false,
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
        "length": "40",
        "description": "邮箱",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "11",
        "description": "手机号",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "16",
        "description": "密码",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "30",
        "description": "真实姓名",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "30",
        "description": "部门",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "30",
        "description": "职位",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "20",
        "description": "座机号",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "100",
        "description": "地址",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "8",
        "description": "状态",
        "groupId": 1,
        "isVisible": true,
        "isReadonly": false,
        "isRequired": false,
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
        "length": "3",
        "description": "年龄",
        "groupId": 1,
        "isVisible": false,
        "isReadonly": true,
        "isRequired": true,
        "displayComponent": {
          "componentType": "Text",
          "items": null
        }
      }
    ],
    "buttons": [
      {
        "buttonDescription": "保存",
        "actionType": "DoAction",
        "domainLink": null,
        "actionName": "/Account/update",
        "roles": [
          "Role1",
          "Role2",
          "Role3"
        ]
      }
    ]
  })
  , 1000);
});

var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
