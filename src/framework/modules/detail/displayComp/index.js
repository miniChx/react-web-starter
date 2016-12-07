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
import { getValueByKey } from '../../../utils/MapUtils';
import createRules from '../formValidator';

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
  defaultAnalyser: InputAnalyser
};

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

const transFromtoDate = (data, compRender) => {
  if (compRender === FormItemMap.DATEPICKER || compRender === FormItemMap.TIMEPICKER) {
    return data && moment(new Date(data));
  }
  return data;
};

// 表单项  hasFeedback={model === 'edit'}
const formAnalyser = (compRender, model, props) => (formItemLayout, record, getFieldDecorator, detailResult) => {
  return (
    <FormItem
      key={record.description}
      {...formItemLayout}
      label={record.description}
    >
      {getFieldDecorator(record.name, {
        rules: (props.createRules && props.createRules(record, props.form)) || createRules(record, props.form),
        initialValue: transFromtoDate(detailResult && detailResult[record.name], compRender) })((compRender[model](record)))
      }
    </FormItem>
  );
};

const chooseAnalyser = (record, props) => {
  const analyserName = getValueByKey(record, 'default', 'displayComponent', 'componentType');
  // console.log(analyserName);
  const ret = props.renderAnalyser && props.renderAnalyser(analyserName, record);
  return ret || FormItemMap[analyserName] || FormItemMap.defaultAnalyser;
};

const renderFuc = (formItemLayout, record, getFieldDecorator, detailResult, model, props) => {
  if (record.isVisible) {
    return formAnalyser(chooseAnalyser(record, props), model, props)(formItemLayout, record, getFieldDecorator, detailResult);
  }
  return null;
};

export default renderFuc;
