/**
 * Created by baoyinghai on 11/17/16.
 */

import React from 'react';
import { Form } from 'mxa';
import moment from 'moment';

import InputAnalyser from './analyser/InputAnalyser';
import DatePickerAnalyser from './analyser/DatePickerAnalyser';
import InputNumberAnalyser from './analyser/InputNumberAnalyser';
import SelectAnalyser from './analyser/SelectAnalyser';
import CascaderAnalyser from './analyser/CascaderAnalyser';
import CheckboxAnalyser from './analyser/CheckboxAnalyser';
import RadioAnalyser from './analyser/RadioAnalyser';
import { getValueByKey } from '../../../utils/MapUtils';
import createRules from '../formValidator';

const FormItem = Form.Item;

const FormItemMap = {
  InputAnalyser,
  DatePickerAnalyser,
  InputNumberAnalyser,
  SelectAnalyser,
  CascaderAnalyser,
  CheckboxAnalyser,
  RadioAnalyser,
  defaultAnalyser: InputAnalyser
};

const transFromtoDate = (data, compRender) => {
  if (compRender === FormItemMap.DatePickerAnalyser) {
    return data && moment(data);
  }
  return data;
};

// 表单项
const formAnalyser = (compRender, model, props) => (formItemLayout, record, getFieldDecorator, detailResult) => {
  return (
    <FormItem
      key={record.description}
      {...formItemLayout}
      label={record.description}
      hasFeedback={model === 'edit'}
    >
      {getFieldDecorator(record.name, {
        rules: (props.createRules && props.createRules(record, props.form)) || createRules(record, props.form),
        initialValue: transFromtoDate(detailResult && detailResult[record.name], compRender) })((compRender[model](record)))
      }
    </FormItem>
  );
};

// renderAnalyser

const chooseAnalyser = (record, props) => {
  const analyserName = getValueByKey(record, 'default', 'displayComponent', 'componentType');
  // console.log(analyserName);
  const ret = props.renderAnalyser && props.renderAnalyser(analyserName);
  return ret || FormItemMap[analyserName + 'Analyser'] || FormItemMap.defaultAnalyser;
};

const renderFuc = (formItemLayout, record, getFieldDecorator, detailResult, model, props) => {
  if (record.isVisible) {
    return formAnalyser(chooseAnalyser(record, props), model, props)(formItemLayout, record, getFieldDecorator, detailResult);
  }
  return null;
};

export default renderFuc;
