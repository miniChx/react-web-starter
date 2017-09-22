/**
 * Created by vison on 12/10/16.
 */

import React from 'react';
import moment from 'moment';
import { Icon, Col, Row, Form, Input, Modal } from 'antd';
import { createComp } from '../../framework/modules/detail/displayComp/compRefactHelper';
import { ListDetail } from '../../framework/modules';
import RadioGroup from '../../framework/modules/detail/displayComp/analyser/RadioGroupAnalyser';


export default class Lt extends React.Component {

  renderAnalyser(analyserName, field, fieldCtrl) {
    if (field.name === 'certificateType') {
      return createComp(RadioGroup, fieldCtrl, (e, helper) => {
        if (e.target.value === 'NATURAL_PERSON_SHAREHOLDER') {
          helper.setFieldRule('certificateNo', { isRequired: true });
          helper.setFieldVisible('expirationDate', false);
        } else {
          helper.setFieldRule('certificateNo', { isRequired: false });
          helper.setFieldVisible('expirationDate', true);
        }
      });
    }
    return false;
  }


  render() {
    const inject = {
      formValidate: {
        registrationDate: {
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
        }
      }
    };

    return (
      <div>
        <h1>自定义</h1>
        <ListDetail inject={inject} {...this.props} renderAnalyser={this.renderAnalyser} />
      </div>
    );
  }
}
