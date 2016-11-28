// 设置不初始化数据的url过滤条件
export default [
  domainLink => domainLink.indexOf('example') === 0,
  domainLink => domainLink.indexOf('imageView') >= 0
];
