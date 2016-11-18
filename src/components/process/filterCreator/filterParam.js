/**
 * Created by baoyinghai on 11/18/16.
 */


let _param = {};

export const clearParam = () => {
  _param = {};
};

export const getParam = () => _param;

export const updateKey = (key, value) => {
  _param[key] = value;
};
