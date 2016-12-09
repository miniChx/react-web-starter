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
import TimePickerAnalyser from './analyser/TimePickerAnalyser';
import SwitchAnalyser from './analyser/SwitchAnalyser';
import CheckboxGroupAnalyser from './analyser/CheckboxGroupAnalyser';
import RadioGroupAnalyser from './analyser/RadioGroupAnalyser';
import ModalInputAnalyser from './analyser/ModalInputAnalyser';
import TextAreaAnalyser from './analyser/TextAreaAnalyser';
import { getValueByKey } from '../../../utils/MapUtils';
import createRules from '../formValidator';
import { VIEW, EDIT } from '../constant';

const FormItem = Form.Item;

const FormItemMap = {
  INPUT: InputAnalyser,
  DATEPICKER: DatePickerAnalyser,
  INPUTNUMBER: InputNumberAnalyser,
  SELECT: SelectAnalyser,
  CASCADER: CascaderAnalyser,
  CHECKBOX: CheckboxAnalyser,
  RADIO: RadioAnalyser,
  TIMEPICKER: TimePickerAnalyser,
  SWITCH: SwitchAnalyser,
  CHECKBOXGROUP: CheckboxGroupAnalyser,
  RADIOGROUP: RadioGroupAnalyser,
  MODALINPUT: ModalInputAnalyser,
  TEXTAREA: TextAreaAnalyser,
  defaultAnalyser: InputAnalyser
};

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}


const getBindParameter = (props, initValueSource) => {
  let params = {};
  if (props && props.params) {
    params = props.params;
  }
  const cache = { ...params, ...getValueByKey(props, {}, 'query') };
  return initValueSource && initValueSource.bindParameter && cache[initValueSource.bindParameter.name];
};

const transFromtoDate = (data, compRender) => {
  if (compRender === FormItemMap.DATEPICKER || compRender === FormItemMap.TIMEPICKER) {
    return data && moment(new Date(data));
  }
  return data;
};

// 表单项
// hasFeedback={model === 'edit'}
const formAnalyser = (compRender, model, props) => (formItemLayout, record, getFieldDecorator, detailResult) => {
  let initData = null;
  if (model === VIEW) {
    initData = getBindParameter(props, record.initValueSource);
  } else {
    initData = detailResult && detailResult[record.name];
  }
  return (
    <FormItem
      key={record.description}
      {...formItemLayout}
      label={record.description}
    >
      {getFieldDecorator(record.name, {
        rules: (props.createRules && props.createRules(record, props.form)) || createRules(record, props.form),
        initialValue: transFromtoDate(initData, compRender) })((compRender[model](record)))
      }
    </FormItem>
  );
};

const chooseAnalyser = (record, props, changeDataSourceVisable) => {
  const analyserName = getValueByKey(record, 'default', 'displayComponent', 'componentType');
  // console.log(analyserName);
  const ret = props.renderAnalyser && props.renderAnalyser(analyserName, record, changeDataSourceVisable);
  return ret || FormItemMap[analyserName] || FormItemMap.defaultAnalyser;
};

const renderFuc = (formItemLayout, record, getFieldDecorator, detailResult, props, changeDataSourceVisable) => {
  if (record.isVisible) {
    return formAnalyser(chooseAnalyser(record, props, changeDataSourceVisable), props.model, props)(formItemLayout, record, getFieldDecorator, detailResult);
  }
  return null;
};

export default renderFuc;
