/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Form, Input, DatePicker, Col, Select, Tooltip, Icon, Cascader, Row, Button, Checkbox, Modal } from 'mxa';
import { autobind } from 'core-decorators';
import { goBack, replace } from 'react-router-redux';

import appStyle from '../../styles/views/detail.less';
import renderFuc from './displayComp/index';
import styles from '../../styles/views/listview.less';
import { PFetch } from '../../system/fetch';
import { dispatch } from '../../service/DispatchService';
import { CONTAINER_PRE } from '../../routes';
import { getValueByKey } from '../../utils/MapUtils';
import { AnHref } from '../info';
import SwitchContainer from './switchContainer';

const FormItem = Form.Item;

class Detail extends React.Component {
  /* eslint-disable */
  static propTypes = {
    model: React.PropTypes.oneOf(['show', 'edit']).isRequired,
    createRules: React.PropTypes.func, // 自定义表单校验 // record
    beforeSubmit: React.PropTypes.func, // 表单提交之前 // values, callback(v)
    afterSubmit: React.PropTypes.func, // 表单提交之后  //  err
    dataSource: React.PropTypes.object.isRequired,
    renderAnalyser: React.PropTypes.func // 自定义渲染标单项 // componentName
  };

  constructor(props) {
    super(props);
    const data = this.dataFieldsAdapter(this.props.dataSource);
    this.state = {
      passwordDirty: false,
      fields: data
    };
  }

  // 过滤 分组
  dataFieldsAdapter(dataSource) {
    const fieldMap = {};
    dataSource.fields.forEach(f => {
      if (!fieldMap[f.groupId]) {
        fieldMap[f.groupId] = [];
      }
      fieldMap[f.groupId].push(f);
    });
    const ret = [];
    Object.keys(fieldMap).forEach(key => {
      ret.push(fieldMap[key]);
    });
    return ret;
  }

  @autobind
  createReqParam() {
    let params = {};
    if (this.props && this.props.params) {
      params = this.props.params;
    }
    return { ...params, ...getValueByKey(this.props, {}, 'location', 'query') };
  }

  @autobind
  realSubmit(item, values) {
    const rest = this.createReqParam();
    const self = this;
    const original = this.props.dataSource.detailResult || {};
    this.props.exec(() => {
      // TODO: 地址多一个斜杠
      return PFetch((item.domainLink || item.actionName), { ...original, ...rest, ...values })
        .then(response => {
          console.log(response);
          if (item.messagePromptType === 'message') {
            Modal.info({
              title: '提示',
              content: (<div>您已成功{item.buttonDescription}！</div>),
              onOk() {
                self.props.afterSubmit && self.props.afterSubmit(false);
                dispatch(goBack());
              },
            });
          }
        })
        .catch(errorData => {
          console.log(errorData);
          Modal.error({
            title: '提示',
            content: (<div>{item.buttonDescription}失败！</div>),
            onOk() {
              self.props.afterSubmit && self.props.afterSubmit(true);
            },
          });
        });
    });
  }

  @autobind
  handleSubmit(item) {
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // const { domainType, ...rest } = this.props.location.query;
        if (self.props.beforeSubmit) {
          self.props.beforeSubmit(values, (v = values) => {
            self.realSubmit(item,  v);
          })
        } else {
          self.realSubmit(item, values);
        }
      }
    });
  }

  @autobind
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }

  @autobind
  handleChageState(e) {
    this.props.changeState(e);
  }

  @autobind
  _renderColumnAction() {
    const buttons = this.props.dataSource.buttons || [];
    return (
      <div>
        {
          buttons.map(item => {
            return (
              <Button
                className={styles.inlineButton}
                key={item.buttonDescription}
                onClick={() => this.handleSubmit(item)}
              >
                {item.buttonDescription}
              </Button>);
            // TODO: 编辑按钮
          })
          //  .concat((
          //  <Button
          //    className={styles.inlineButton}
          //    key="editBtnLocal"
          //    onClick={this.handleChageState}
          //  >{this.props.model === 'show' ? '编辑' : '返回'}</Button>
          // ))
        }
      </div>
    );
  }

  renderForm(data, fields, i) {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const titleF = fields[0];

    return (
      <SwitchContainer key={titleF.groupName + i} bar={(<AnHref title={titleF.groupName} href={'#title' + titleF.groupId} />)} >
        <div className={appStyle.formBox} >
          <Row gutter={40} className={appStyle.cell}>
            {fields.map((item, index) => {
              return (
                <Col key={index} span={(24 / data.columnNumber) || 12}>
                  {renderFuc(formItemLayout, item, getFieldDecorator, data.detailResult, this.props.model, this.props)}
                </Col>
              );
            })}
          </Row>
        </div>
      </SwitchContainer>
    );
  }

  render() {
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 4,
      },
    };
    return (
      <div>
        <Form horizontal={true} >
          {this.state.fields.map((f, index) => {
            return this.renderForm(this.props.dataSource, f, index);
          })}
          <FormItem {...tailFormItemLayout}>
            {this._renderColumnAction()}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const detailCreator = () => {
  return Form.create()(Detail);
}

export default detailCreator;

