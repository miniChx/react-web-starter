/**
 * Created by baoyinghai on 10/18/16.
 */
import Qs from 'qs';
import MxFetch from '../common/mxfetch/index';
import Config from '../config';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic  '
};

/* eslint-disable */
const process = (_promise) => {
  return new Promise((resolve, reject) => {
    _promise.then((response) => response.text())
      .then((response) => {
        if (response === '') {
          resolve({});
        } else {
          const json = JSON.parse(response);
          // TODO: 与后台沟通, 获得json格式
          if (json.msgContent || json.errMsg || json.code === 'version upgrade') {
            reject(json);
          } else {
            resolve(json);
          }
        }
      })
      .catch((errorData) => {
        reject(errorData);
      });
  });
};
const rawFetch = (url, param) => {
  /* eslint-disable no-console */
  console.log('=========> 数据请求 <=========');
  console.log('请求地址: ', url);
  console.log('请求参数: ', param);
  return process(MxFetch.fetch(Config.host + url, param, 6180));
};
/* eslint-disable */
export const PFetch = (url, param) => {
  const headers = { ...HEADERS };
  return rawFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(param)
  });
};
/* eslint-disable */
export const GFetch = (url, param) => {
  const headers = { ...HEADERS };
  return rawFetch(url + (param ? '?' + Qs.stringify(param) : ''), {
    method: 'GET',
    headers,
  });
};

export default {
  PFetch,
  GFetch,
};
