// 设置不初始化数据的url过滤条件
export default [
  domainLink => domainLink === 'example/tab',
  domainLink => domainLink === 'example/modalInput',
  domainLink => domainLink === 'example/hello',
  domainLink => domainLink === 'example/tab',
  domainLink => domainLink.indexOf('imageView') >= 0
];
