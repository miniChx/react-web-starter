/**
 * Created by baoyinghai on 10/25/16.
 */


export const toLowerFirstCase = (str) => {
  return str && str.replace(/(\w)/,function(v){return v.toLowerCase()});
};
