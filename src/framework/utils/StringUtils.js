/**
 * Created by vison on 10/25/16.
 */

/* eslint-disable */
export const toLowerFirstCase = (str) => {
  return str && str.replace(/(\w)/,function(v){return v.toLowerCase()});
};
