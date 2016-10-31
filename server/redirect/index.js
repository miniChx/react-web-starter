/**
 * Created by baoyinghai on 10/28/16.
 */


var request = require('request');

var config = require('../config');

function getData(url, param, callback) {

  var options = {
    uri: "http://" + config.host + ":" + config.port + url,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic  '
    },
    json: param
  };
  request(options, function (error, response, body) {
    callback(body);
  });
}

module.exports = getData;

