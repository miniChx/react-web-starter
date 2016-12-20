/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Icon, Col, Row, Form, Input, Modal } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import { createComp } from '../../framework/modules/detail/displayComp/compRefactHelper';
import { Info, ListDetail } from '../../framework/modules';
import appStyle from '../styles/views/app.less';
import { getSubMenu } from '../../framework/service/CacheService';
import { AnHref } from '../../framework/modules/info';
import RadioGroup from '../../framework/modules/detail/displayComp/analyser/RadioGroupAnalyser';

export default class Lt extends React.Component {

  // 设置需要自定义的请求
  filterMenu(selectMenuItem) {
    if (selectMenuItem.domainLink === 'ddd/rendByKey') {
      return true;
    }
    return false;
  }

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
    if (field.name === 'certificateType') {
      return createComp(RadioGroup, fieldCtrl, (e, helper) => {
        if (e.target.value === 'NATURAL_PERSON_SHAREHOLDER') {
          // helper.setFieldVisible('certificateNo', true);
          helper.setFieldRule('certificateNo', { isRequired: true });
        } else {
          // helper.setFieldVisible('certificateNo', false);
          helper.setFieldRule('certificateNo', { isRequired: false });
        }
      });
    }
    return false;
  }

  createRules(record, form) {
    // 通过form.getFieldsValue() 获取表单值, 在validator中调用该方法时,才会返回实时数据. 否则返回初始化数据.
    // return [{ required: true, message: '必填' }];
    return false;
  }

  @autobind
  renderMain(selectMenuItem, query, callback) {
    console.log('######', selectMenuItem.domainLink + ', ' + selectMenuItem.domainType);
    this.props.exec(() => {
      return this.props.fetch(trimStart('/AccountDetail/render', '/'), query || {}).then(data => {
        callback((
          <div>
            <h1>这是自定义的</h1>
            <ListDetail {...this.props} dataSource={data} beforeSubmit={this.beforeSubmit} renderAnalyser={this.renderAnalyser} createRules={this.createRules} />
          </div>
        ));
      });
    });
  }

  render() {
    return (
      <div>
        <Info {...this.props} />
      </div>
    );
  }
}
