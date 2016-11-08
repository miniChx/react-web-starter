/**
 * Created by drew on 2016/5/24.
 */
var request = require('request');
var host = "http://192.168.64.68:9081/Api";
var pubHost = "http://192.168.64.68:9081/Pub";

describe('order test', function () {
    it('login', function (done) {
        var options = {
            uri: pubHost + "/Account/login",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "password": "22222222",
                "userName": "zhulifeng4"
            }
        };
        request(options, function (error, response, body) {
            console.log(JSON.stringify(body));
            done()
        });
    });

    it('logout', function (done) {
        var options = {
            uri: host + "/Account/logout",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJVc2VySWQtMSIsImlhdCI6MTQ3ODIzOTgwNywic3ViIjoiZHJldyIsImlzcyI6IlVzZXJJZC0xIn0.YGke96lkdIG0UDN88Gu_CK7EZ4VoNFNwzPtr4__T4vk"
            }
        };
        request(options, function (error, response, body) {
            console.log(JSON.stringify(body));
            done()
        });
    });

    it('add', function (done) {
        var options = {
            uri: host + "/Account/add",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJVc2VySWQtNSIsImlhdCI6MTQ3ODI0MDUyMCwic3ViIjoiZHJldzUiLCJpc3MiOiJVc2VySWQtNSJ9.4SCUijK2rFPO8hgVxDW794pu048XR0w33zkYN-v73oo"
            },
            json: {
                "email": "15251536915@qq.com",
                "mobileNo": "15251536915",
                "password": "22222222",
                "userName": "zhulifeng4"
            }
        };
        request(options, function (error, response, body) {
            console.log(JSON.stringify(body));
            done()
        });
    });

    it('getMenus', function (done) {
        console.log(host);
        var options = {
            uri: host + "/Advice/getMenus",
            method: 'POST',
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });

    it('add account', function (done) {
        var options = {
            uri: host + "/DemoDetail/add",
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
        var i = 31;
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
    });

    it('render Detail', function (done) {
        var options = {
            uri: host + "/DemoDetail/render",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  123456"
            },
            json: {
                "id": 3
            }
        };
        request(options, function (error, response, body) {
            console.log(JSON.stringify(body));
            done()
        });
    });

    it('findByEmail', function (done) {
        var options = {
            uri: host + "/DemoDetail/findByEmail",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "email": "email",
            }
        };
        request(options, function (error, response, body) {
            console.log(JSON.stringify(body));
            done()
        });
    });

    it('render List', function (done) {
        var options = {
            uri: host + "/DemoList/render",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });

    it('search', function (done) {
        var options = {
            uri: host + "/DemoList/search",
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            json: {
                "filterFieldCodes": ['ACCOUNT_STATUS_ACTIVE'],//, "ACCOUNT_AGE_BT_5_AND_10"
                "orderFields": [
                    {"orderField": "Status", "orderType": "Asc"},
                    {"orderField": "Age", "orderType": "Asc"}
                ],
                "pageIndex": 3,
                "itemsPerPage": 10
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });

    it('add role', function (done) {
        var options = {
            uri: host + "/Role/add",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJVc2VySWQtNSIsImlhdCI6MTQ3ODI0MDUyMCwic3ViIjoiZHJldzUiLCJpc3MiOiJVc2VySWQtNSJ9.4SCUijK2rFPO8hgVxDW794pu048XR0w33zkYN-v73oo"
            },
            json: {
                "roleCode": "www3",
                "roleValue": "111"
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });

    it('delete role', function (done) {
        var options = {
            uri: host + "/Role/delete",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJVc2VySWQtNSIsImlhdCI6MTQ3ODI0MDUyMCwic3ViIjoiZHJldzUiLCJpc3MiOiJVc2VySWQtNSJ9.4SCUijK2rFPO8hgVxDW794pu048XR0w33zkYN-v73oo"
            },
            json: {
                "roleCode": "www3",
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });

    it('relateRolesAndUsers', function (done) {
        var options = {
            uri: host + "/Role/relateRolesAndUsers",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJVc2VySWQtNSIsImlhdCI6MTQ3ODI0MDUyMCwic3ViIjoiZHJldzUiLCJpc3MiOiJVc2VySWQtNSJ9.4SCUijK2rFPO8hgVxDW794pu048XR0w33zkYN-v73oo"
            },
            json: {
                "userId": 1,
                "roleCodes": ["Role1", "Role2"]
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });

  it('findAll', function (done) {
        var options = {
            uri: host + "/Role/findAll",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Basic  eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJVc2VySWQtNSIsImlhdCI6MTQ3ODI0MDUyMCwic3ViIjoiZHJldzUiLCJpc3MiOiJVc2VySWQtNSJ9.4SCUijK2rFPO8hgVxDW794pu048XR0w33zkYN-v73oo"
            },
        };
        request(options, function (error, response, body) {
            console.log(body);
            done()
        });
    });



});
