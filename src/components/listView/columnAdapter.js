/**
 * Created by baoyinghai on 10/25/16.
 */

import { toLowerFirstCase } from '../../common/utils/StringUtils';


export const transColumn = (fields = []) => {
  return fields && fields.map((f) => {
      return {
        title: f.description,
        dataIndex: toLowerFirstCase(f.name),
        key: toLowerFirstCase(f.name),
      };
    }) || [];
};

export const transData = (data= []) => {
  return data && data.map((d) => {
      return { ...d };
    }) || [];
};

export const transButtons = (data = []) => {
  return data && data.map((d) => {
      return {
        text: d.buttonDescription,
        link: d.domainLink || d.actionName,
        key: d.domainLink || d.actionName
      }
    }) || [];
};

export const transFilter = (data = []) => {
  return data && data.map((d) => {
      return { ...d };
    }) || [];
}
