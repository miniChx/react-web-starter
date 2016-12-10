/**
 * Created by baoyinghai on 12/10/16.
 */

import React from 'react';
import moment from 'moment';
import { Icon, Col, Row, Form, Input, Modal } from 'mxa';
import { createComp } from '../../framework/modules/detail/displayComp/compRefactHelper';
import { ListDetail } from '../../framework/modules';
import RadioGroup from '../../framework/modules/detail/displayComp/analyser/RadioGroupAnalyser';


export default class Lt extends React.Component {

  beforeSubmit(values, callback) {
    Modal.info({
      title: '提示',
      content: (<div>{'提交之前, 数据为' + JSON.stringify(values) + '！'}</div>),
      onOk() {
        callback(values); // callback() 效果等于 callback(values)
      }
    });
  }

  renderAnalyser(analyserName, field, fieldCtrl) {
    // if (field.name === 'certificateType') {
    //   return createComp(RadioGroup, fieldCtrl, (e, helper) => {
    //     if (e.target.value === 'NATURAL_PERSON_SHAREHOLDER') {
    //       // helper.setFieldVisible('certificateNo', true);
    //       helper.setFieldRule('certificateNo', { isRequired: true });
    //     } else {
    //       // helper.setFieldVisible('certificateNo', false);
    //       helper.setFieldRule('certificateNo', { isRequired: false });
    //     }
    //   });
    // }
    return false;
  }

  createRules(field, form) {
    if (field.name === 'startDate') {
      field.formValidate = {
        validateType: 'CONTEXTCHECK',
        opt: {
          message: '起始日期必须在结束日期之前',
          validatorFunc: (record, value) => {
            if (record.endDate && record.endDate.isAfter(value)) {
              return true;
            }
            return false;
          }
        }
      };
    } else if (field.name === 'registrationDate') {
      field.formValidate = {
        validateType: 'CONTEXTCHECK',
        opt: {
          message: '企业登记日期必须在今天之前之前',
          validatorFunc: (record, value) => {
            if (moment(value).isBefore(new Date())) {
              return true;
            }
            return false;
          }
        }
      };
    }
    // 通过form.getFieldsValue() 获取表单值, 在validator中调用该方法时,才会返回实时数据. 否则返回初始化数据.
    // return [{ required: true, message: '必填' }];
    return false;
  }

  render() {
    return (
      <div>
        <h1>title</h1>
        <ListDetail {...this.props} beforeSubmit={this.beforeSubmit} renderAnalyser={this.renderAnalyser} createRules={this.createRules} />
      </div>
    );
  }
}
