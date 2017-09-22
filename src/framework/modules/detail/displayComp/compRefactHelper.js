/**
 * Created by vison on 12/8/16.
 */
import React from 'react';
import { EDIT } from '../constant';

export const createComp = (compRender, fieldCtrl, onLocalChange) => {
  const onChange = e => {
    if (fieldCtrl) {
      if (onLocalChange) {
        const setFieldHelper = () => {
          const fieldMap = {};
          const getFieldMap = () => {
            return fieldMap;
          };
          const setFieldVisible = (fieldName, value) => {
            if (!fieldMap[fieldName]) {
              fieldMap[fieldName] = {};
            }
            fieldMap[fieldName].isVisible = value;
          };
          const setFieldRule = (fieldName, rules) => {
            if (!fieldMap[fieldName]) {
              fieldMap[fieldName] = {};
            }
            const orgRules = fieldMap[fieldName].rules || {};
            fieldMap[fieldName].rules = Object.assign(orgRules, rules);
          };
          return {
            getFieldMap,
            setFieldVisible,
            setFieldRule
          };
        };
        const helper = setFieldHelper();
        onLocalChange(e, { setFieldVisible: helper.setFieldVisible, setFieldRule: helper.setFieldRule });
        // console.log(helper.getFieldMap());
        fieldCtrl(helper.getFieldMap());
      }
    }
  };

  return {
    ...compRender,
    [EDIT]: record => {
      return React.cloneElement(compRender[EDIT](record), { onChange: onChange });
    }
  };
};
