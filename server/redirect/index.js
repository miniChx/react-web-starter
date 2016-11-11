/**
 * Created by baoyinghai on 10/28/16.
 */


var request = require('request');

var config = require('../config');

function getData(url, param, callback, headers) {
  console.log(headers);
  var options = {
    uri: "http://" + config.host + ":" + config.port + url,
    method: 'POST',
    headers,
    json: param
  };
  request(options, function (error, response, body) {
    console.log(body);
    callback(body);
  });
}

module.exports = getData;

