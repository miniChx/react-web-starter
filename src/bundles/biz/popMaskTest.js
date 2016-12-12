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

  renderAnalyser(analyserName, field, fieldCtrl) {
    if (field.name === 'serialNo') {
      return createComp(RadioGroup, fieldCtrl, (e, helper) => {
        if (e.target.value === 'AGREE') {
          helper.setFieldVisible('name', false); // 指定上一步审批人
          helper.setFieldVisible('leaseeName', false); // 退回用户名称
          helper.setFieldVisible('certificateType', false);// 指定提交方式
          // helper.setFieldVisible('certificateNo', true);
        } else if (e.target.value === 'LAST') {
          helper.setFieldVisible('name', true); // 指定上一步审批人
          helper.setFieldVisible('leaseeName', false); // 退回用户名称
          helper.setFieldVisible('certificateType', false);// 指定提交方式
        } else if (e.target.value === 'ANY') {
          helper.setFieldVisible('name', false); // 指定上一步审批人
          helper.setFieldVisible('leaseeName', true); // 退回用户名称
          helper.setFieldVisible('certificateType', true);// 指定提交方式
        }
      });
    }
    return false;
  }


  render() {
    return (
      <ListDetail {...this.props} renderAnalyser={this.renderAnalyser} />
    );
  }
}
