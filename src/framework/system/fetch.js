/**
 * Created by baoyinghai on 10/18/16.
 */
import Qs from 'qs';
import { trimStart } from 'lodash/string';
import MxFetch from '../utils/MxFetch';
import Config from '../../config';
import { getToken } from '../service/CacheService';


const getHeader = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic  ' + getToken()
});

/* eslint-disable */
const process = _promise => {
  return new Promise((resolve, reject) => {
    _promise.then((response) => response.text())
      .then((response) => {
        if (response === '') {
          resolve({});
        } else {
          const json = JSON.parse(response);
          console.log('返回结果: ', json);
          if (json.msgContent || json.errMsg || json.message || json.code === 'version upgrade') {
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
  // if (url.indexOf('http') < 0) {
  //   url = CbaseProcessUrl + url;
  // };
  return process(MxFetch.fetch(Config.Host + url, param, 6180));
};
/* eslint-disable */
export const PFetch = (url, param) => {
  const headers = getHeader();
  return rawFetch(trimStart(url, '/'), {
    method: 'POST',
    headers,
    body: JSON.stringify(param)
  });
};
/* eslint-disable */
export const GFetch = (url, param) => {
  const headers = getHeader();
  return rawFetch(url + (param ? '?' + Qs.stringify(param) : ''), {
    method: 'GET',
    headers,
  });
};

export default {
  PFetch,
  GFetch,
};


