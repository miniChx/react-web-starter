/**
 * Created by baoyinghai on 11/17/16.
 */

import React from 'react';
import { Form } from 'mxa';

import InputAnalyser from './InputAnalyser';
import DatePickerAnalyser from './DatePickerAnalyser';
import NumberAnalyser from './NumberAnalyser';
import { getValueByKey } from '../../../common/utils/MapUtils';

const FormItem = Form.Item;

const FormItemMap = {
  InputAnalyser,
  DatePickerAnalyser,
  InputNumberAnalyser: NumberAnalyser,
  defaultAnalyser: InputAnalyser
};

// 表单校验
const createRules = record => {
  const ret = [];
  const isRequired = {};
  if (record.isRequired) {
    isRequired.required = true;
    // ret.push({ required: true, message: '请输入' + record.description });
  }
  if (record.type === 'Date') {
    ret.push({ type: 'object', message: '请输入对象', ...isRequired });
  } else if (record.type === 'Integer' || record.type === 'Long') {
    const len = parseInt(record.length, 10);
    ret.push({ type: 'number', max: Math.pow(10, len), mix: 0 - Math.pow(10, len), message: '整数格式错误', ...isRequired });
  } else {
    ret.push(isRequired);
  }
  return ret;
};

// 表单项
const formAnalyser = compRender => (formItemLayout, record, getFieldDecorator) => {
  return (
    <FormItem
      key={record.description}
      {...formItemLayout}
      label={record.description}
      hasFeedback={true}
    >
      {getFieldDecorator(record.name, {
        rules: createRules(record)
      })(
        compRender(record)
      )}
    </FormItem>
  );
};


const renderFuc = (formItemLayout, record, getFieldDecorator) => {
  if (record.isVisible) {
    const analyserName = getValueByKey(record, 'default', 'displayComponent', 'componentType') + 'Analyser';
    console.log(analyserName);
    return formAnalyser(FormItemMap[analyserName] || FormItemMap.defaultAnalyser)(formItemLayout, record, getFieldDecorator);
  }
  return null;
};

export default renderFuc;
