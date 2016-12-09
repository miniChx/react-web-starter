/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import RadioGroup from '../../framework/modules/detail/displayComp/analyser/RadioGroupAnalyser';

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
    EDIT: record => {
      /* eslint-disable */
      return React.cloneElement(compRender.EDIT(record), { onChange: onChange });
    }
  };
};
