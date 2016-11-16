/**
 * Created by drew on 2016/5/24.
 */
var request = require('request');

describe('order test', function () {
    it('404', function (done) {
        var options = {
            uri: "http://192.168.64.101:9081/Advice/testRedis",
            method: 'POST'
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    })

    it('add account', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/account/add",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "email": "email",
                "mobileNo": "mobileNo",
                "password": "password",
                "realName": "realName",
                "department": "department",
                "jobTitle": "jobTitle",
                "telephoneNo": "telephoneNo",
                "address": "address",
                "age": 1,
                "status": "ACTIVE"
            }
        };
        for (var i = 20; i < 25; i++) {
            options.json = {
                "email": "email" + i,
                "mobileNo": "mobileNo" + i,
                "password": "password" + i,
                "realName": "realName" + i,
                "department": "department" + i,
                "jobTitle": "jobTitle" + i,
                "telephoneNo": "telephoneNo" + i,
                "address": "address",
                "age": i + 3,
                "status": "ACTIVE"
            }
            request(options, function (error, response, body) {
                done()
            });
        }

    })

    it('render Detail', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/AccountDetail/render",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    })

    it('findById', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/AccountDetail/findById",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "id": 3,
            }
        };
        request(options, function (error, response, body) {
            console.log(JSON.stringify(body));
            done()
        });
    })

    it('render List', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/AccountList/render",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    })

    it('search', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/AccountList/search",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                //Eq,NotEq,In,Between,Gt,Lt,Ge,le,like
                "pageIndex": 1,
                "itemsPerPage": 10,
               "filterFieldCodes": ['ACCOUNT_STATUS_ACTIVE'],//, "ACCOUNT_AGE_BT_5_AND_10"
                "orderFields": [
                    {"orderField": "Status", "orderType": "Asc"},
                    {"orderField": "Age", "orderType": "Asc"}
                ]
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    })
    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
    it('add', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/Order/add",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "orderNo": "3333333",
                "bizCategory": "线下其他",
                "bizItem": "房产交易",
                "bizOrientation": "收",
                "amount": 300000
            }
        };
        request(options, function (error, response, body) {
            done()
        });
    })

    it('update', function (done) {
        var options = {
            uri: "http://192.168.64.215:9081/Order/update",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "id": 4,
                "orderNo": "444",
                "bizCategory": "线下其他",
                "bizItem": "房产交易",
                "bizOrientation": "收",
                "amount": 400000
            }
        };
        request(options, function (error, response, body) {
            done()
        });
    })

  it('ProcessesDetail render', function (done) {
    var options = {
      uri: host + "/ProcessesDetail/render",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Authorization": "Basic  " + tokens
      },
      json: {
        "id": 1
      }
    };
    request(options, function (error, response, body) {
      console.log(body);
      done()
    });
  });

})
