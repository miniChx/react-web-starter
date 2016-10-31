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

app.post('/*', function (req, res) {
  Redirect(req.url, req.body,  function (chunk) {
    console.log('BODY: ' + JSON.stringify(chunk));
    res.json(chunk);
  });
});

var handler = function() {
  var server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
};
handler();
// module.exports = { run: handler };
