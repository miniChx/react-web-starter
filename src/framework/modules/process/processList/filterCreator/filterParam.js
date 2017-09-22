/**
 * Created by vison on 11/18/16.
 */


let _param = {};

export const clearParam = () => {
  console.log('clear filter param');
  _param = {};
};

export const getParam = () => _param;

export const updateKey = (key, value) => {
  _param[key] = value;
  console.log('过滤参数:', _param);
};
