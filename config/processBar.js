/**
 * Created by vison on 12/28/16.
 */
var ProgressBar = require('progress');
var chalk = require('chalk');

var bar = new ProgressBar(chalk.cyan('  compiling') +' [:bar] :percent', {
  complete: chalk.cyan('='),
  incomplete: ' ',
  width: 60,
  total: 100
});

var FIRST = true;
module.exports = function(v, clearn) {
  if (FIRST) {
    FIRST = false;
    clearn();
  }
  bar.update(v);
};
