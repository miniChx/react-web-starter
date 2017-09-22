/**
 * Created by vison on 11/10/16.
 */

const evil = fn => {
  const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
};

const executeJS = str => {
  const strSq = str.split(/({|})/);
  const jsStr = '(function(){' + strSq.slice(2, strSq.length - 2)[0] + 'return itemVar;})()';
  const result = evil(jsStr);
  return result;
};

export const createFunc = evil;

export default executeJS;
