/**
 * Created by vison on 12/15/16.
 */
var tag = document.getElementsByTagName('script');
console.log('run me!');
// alert(tag && tag.innerText);
var url = window.location.href;
// var reg = /^.*\?(\w*)$/;
// var inner = url.match(reg)[1];
var inner = url.split('?')[1];
tag[0].innerText = inner;
