/**
 * Created by baoyinghai on 10/28/16.
 */


var http = require('http');

var qs = require('querystring');

var config = require('../config');

function getData(url, param, callback) {
  var post_data = param;//这是需要提交的数据

  var content = qs.stringify(post_data);

  var options = {
    hostname: config.host,
    port: config.port,
    path: url,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic  '
    }
  };

  var req = http.request(options, function (res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var chunk = '';
    res.on('data',function(str) {
      chunk += str;
    });
    res.on('end', function() {
      callback(chunk);
    })
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });


// write data to request body
  req.write(content);

  req.end();
}

module.exports = getData;

