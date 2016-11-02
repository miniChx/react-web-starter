/**
 * Created by baoyinghai on 10/25/16.
 */

import { toLowerFirstCase } from '../../common/utils/StringUtils';

/* eslint-disable */
export const transColumn = (fields = []) => {
  return fields && fields.map((f) => {
      return {
        title: f.description,
        dataIndex: toLowerFirstCase(f.name),
        key: toLowerFirstCase(f.name),
        sorter: (a, b) => a[toLowerFirstCase(f.name)].length - b[toLowerFirstCase(f.name)].length,
      };
    });
};
/* eslint-disable */
export const transData = (data= []) => {
  return data && data.map((d) => {
      return { ...d };
    });
};
/* eslint-disable */
export const transButtons = (data = []) => {
  return data && data.map((d) => {
      return {
        text: d.buttonDescription,
        link: d.interactiveType === 'Action'? d.actionName : d.domainLink,
        mode: d.interactiveType,
        domainType: d.domainType,
        key: d.buttonDescription,
      }
    });
};
/* eslint-disable */
export const transFilter = (data = []) => {
  return data && data.map((d) => {
      return { ...d };
    });
}
