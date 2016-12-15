var express = require('express');
var bodyParder = require('body-parser');

var Redirect = require('./redirect');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
  next();
}
app.use(bodyParder.json());
app.use(allowCrossDomain);
app.use(express.static('./static'));

function getUrlPath(url) {
  // return url;
  return '/blc' + url;
}

app.post(getUrlPath('/AccountList/render'), function (req, res) {
 var mockData = require('./json/accountList.json');
 res.json(mockData);
})

app.post(getUrlPath('/AccountDetail/render'), function (req, res) {
 var mockData = require('./json/accountDetail.json');
 res.json(mockData);
})

app.post(getUrlPath('/ddd/rendByKey'), function (req, res) {
  var mockData = require('./json/accountDetail.json');
  res.json(mockData);
})


app.post('/api/EnterpriseCusBasicInfoList/render', function (req, res) {
  var mockData = require('./json/enterpriseCusBasicInfoList.json');
  res.json(mockData);
})


app.post(getUrlPath('/Api/AccountDetail/getMenus'), function (req, res) {
  var mockData = require('./json/getMenus.json');
  setTimeout(() => {
    res.json(mockData);
  }, 1000);
});

app.post(getUrlPath('/Pub/Account/login'), function (req, res) {
  var mockData = require('./json/login.json');
  res.json(mockData);
});


const CustomerTypeData = [{
 "code":"ENTERPRISE",
 "value":"企业客户",
 "displaySequence":1
}, {
 "code":"NATURAL_PERSON",
 "value":"自然人客户",
 "displaySequence":2
}, {
 "code":"PARTNER",
 "value":"合作方客户",
 "displaySequence":3
}];

app.post(getUrlPath('/DemoList/render'), function (req, res) {
 var mockData = require('./json/demoList.json');
 // const pageResult = {
 //   pageIndex: 1,
 //   itemsPerPage: 10,
 //   totalPages: 6,
 //   totalItems: 56,
 // };
 // const contentList = [];
 //
 // for (let i = 0; i < 10; i++) {
 //   contentList.push({
 //     basicCustomerId: i,
 //     customerName: "userName" + i + pageResult.pageIndex,
 //     customerSize: "13355558888" + i,
 //     customerType: CustomerTypeData[i % 3].code,
 //     registerDate: Date.now(),
 //   });
 // }
 // pageResult.contentList = contentList;
 // mockData.pageResult = pageResult;
 res.json(mockData);
})
app.post(getUrlPath('/DemoList/search'), function (req, res) {
  var mockData = require('./json/demoListSearch.json');
  // mockData.pageResult.pageIndex = req.body.pageIndex;
  // mockData.pageResult.itemsPerPage = req.body.itemsPerPage;
  //
  // const pageResult = {
  //   pageIndex: req.body.pageIndex,
  //   itemsPerPage: req.body.itemsPerPage,
  //   totalPages: 6,
  //   totalItems: 56,
  // };
  // const contentList = [];
  // const contentLength = pageResult.pageIndex !== pageResult.totalPages ?
  //   pageResult.itemsPerPage :
  //   pageResult.totalItems - pageResult.itemsPerPage * (pageResult.totalPages - 1);
  // for (let i = 0; i < contentLength; i++) {
  //   contentList.push({
  //     basicCustomerId: i,
  //     customerName: "userName" + i + pageResult.pageIndex,
  //     customerSize: "13355558888" + i,
  //     customerType: CustomerTypeData[i % 3].code,
  //     registerDate: Date.now(),
  //   });
  // }
  // pageResult.contentList = contentList;
  // mockData.pageResult = pageResult;

  res.json(mockData);
})

app.post(getUrlPath('/Role/render'), function (req, res) {
  var mockData = require('./json/role.json');
  res.json(mockData);
})

app.post(getUrlPath('/Process/todo'), function (req, res) {
  var mockData = require('./json/processTodo.json');
  res.json(mockData);
})


 app.post(getUrlPath('/example/layout'), function (req, res) {
  var mockData = require('./json/exampleLayout.json');
  res.json(mockData);
 })

app.post(getUrlPath('/example/process'), function (req, res) {
  var mockData = require('./json/process.json');
  res.json(mockData);
})

app.post(getUrlPath('/Api/CreditEvaluationListApply/render'), function (req, res) {
  var mockData = require('./json/demoList.json');
  res.json(mockData);
})

app.post(getUrlPath('/Api/CreditEvaluationListReview/render'), function (req, res) {
  var mockData = require('./json/demoList.json');
  res.json(mockData);
})




//app.post('/*', function (req, res) {
//  console.log('#########', req.url);
//  if (req.url.indexOf('getMenus') >= 0) {
//    var mockData = require('./json/getMenus.json');
//    res.json(mockData);
//    return ;
//  }
//  let header = req.headers || {};
//  Redirect(req.url, req.body,  function (chunk) {
//    res.json(chunk);
//  }, {
//    'Accept': header.accept,
//    'Content-Type': header['content-type'],
//    'Authorization': header['authorization'],
//    'TenantIdentifier': 'lease'
//  });
//});

//app.post(getUrlPath('/Pub/Account/login'), function (req, res) {
//  var mockData = require('./json/login.json');
//  res.json(mockData);
//});

app.post('/upload', function(req, res) {
    console.log(req.body);
  });

// var handler = function() {
  var server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
// };
// handler();
// module.exports = { run: handler };
