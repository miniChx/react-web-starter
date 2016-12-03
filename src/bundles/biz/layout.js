/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Icon, Col, Row, Form, Input, Modal } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import ModalInput from '../../components/modalInput';
import { Info, ListDetail } from '../../framework/modules';
import appStyle from '../../framework/styles/views/app.less';
// import Simple from '../../components/simpleMenu';
import { getSubMenu } from '../../framework/service/CacheService';
import { AnHref } from '../../framework/modules/info';
import InputItem from './InputItem';
// const FormItem = Form.Item;

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

  renderAnalyser(analyserName) {
    console.log(analyserName);
    return InputItem;
  }

  createRules(record) {
    return [{ required: true, message: '必填' }];
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
        <Info {...this.props} renderBody={this.renderMain} filterMenu={this.filterMenu} />
      </div>
    );
  }
}
