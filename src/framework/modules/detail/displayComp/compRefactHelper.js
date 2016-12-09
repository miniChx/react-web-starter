/**
 * Created by baoyinghai on 12/8/16.
 */
import React from 'react';

export const createComp = (compRender, fieldCtrl, onLocalChange) => {
  const onChange = e => {
    if (fieldCtrl) {
      if (onLocalChange) {
        const result = onLocalChange(e);
        fieldCtrl(result.type, result.fields);
      }
    }
  };

  return {
    ...compRender,
    edit: record => {
      return React.cloneElement(compRender.edit(record), { onChange: onChange });
    }
  };
};
