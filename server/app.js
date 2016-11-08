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
// app.use(express.static('../build'));

app.post('/Advice/getMenus', function (req, res) {
  var menuJson = require('./json/menu.json');
  res.json(menuJson);
});

app.post('/AccountList/render', function (req, res) {
  var listJson = require('./json/list.json');
  res.json(listJson);
});

app.post('/AccountList/search', function (req, res) {
  var searchJson = require('./json/search.json');
  res.json(searchJson);
});

app.post('/AccountDetail/render', function (req, res) {
  var detailJson = require('./json/detail.json');
  res.json(detailJson);
});

app.post('/Process/start', function (req, res) {
  var detailJson = require('./json/startProcess.json');
  res.json(detailJson);
});

app.post('/Process/todo', function (req, res) {
  var detailJson = require('./json/toDoProcess.json');
  res.json(detailJson);
});

app.post('/Process/finished', function (req, res) {
  var detailJson = require('./json/finishedProcess.json');
  res.json(detailJson);
});

app.post('/Process/unfinished', function (req, res) {
  var detailJson = require('./json/unfinishedProcess.json');
  res.json(detailJson);
});

// app.post('/*', function (req, res) {
//   Redirect(req.url, req.body,  function (chunk) {
//     console.log('BODY: ' + JSON.stringify(chunk));
//     res.json(chunk);
//   });
// });

// var handler = function() {
  var server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
// };
// handler();
// module.exports = { run: handler };
