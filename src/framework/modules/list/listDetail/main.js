/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Form, Input, DatePicker, Col, Select, Tooltip, Icon, Cascader, Row, Button, Checkbox, Modal } from 'mxa';
import { autobind } from 'core-decorators';
import { goBack, replace } from 'react-router-redux';

import appStyle from '../../../styles/views/app.less';
import renderFuc from './displayAnalyser/index';
import styles from '../../../styles/views/listview.less';
import { PFetch } from '../../../system/fetch';
import { dispatch } from '../../../service/DispatchService';
import { CONTAINER_PRE } from '../../../routes';
import { getValueByKey } from '../../../utils/MapUtils';
import { AnHref } from '../../Info';

const FormItem = Form.Item;

class ListDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      passwordDirty: false,
      model: this.props.model
    };
  }

  @autobind
  handleSubmit(item) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { domainType, ...rest } = this.props.location.query;
        this.props.exec(() => {
          return PFetch((item.domainLink || item.actionName), { ...rest, ...values })
            .then(response => {
              console.log(response);
              if (item.messagePromptType === 'message') {
                Modal.info({
                  title: '提示',
                  content: (<div>您已成功{item.buttonDescription}！</div>),
                  onOk() {
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
                onOk() {},
              });
            });
        });
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
          buttons.map(item => (
            <Button
              className={styles.inlineButton}
              key={item.buttonDescription}
              onClick={() => this.handleSubmit(item)}
            >{item.buttonDescription}</Button>
          )).concat((
            <Button
              className={styles.inlineButton}
              key="editBtnLocal"
              onClick={this.handleChageState}
            >{this.state.model === 'show' ? '编辑' : '返回'}</Button>
          ))
        }
      </div>
    );
  }

  renderForm(data) {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };

    return (
      <div>
        <AnHref title="这是自己渲染的" href="#hahahaha1" />
        <div className={appStyle.formBox} >
          <Form horizontal={true} >
            <Row gutter={40} className={appStyle.cell}>
              {data.fields && data.fields.map(item => {
                return (
                  <Col span={12}>
                    {renderFuc(formItemLayout, item, getFieldDecorator, data.detailResult, this.state.model)}
                  </Col>
                );
              })}
            </Row>
          </Form>
        </div>
      </div>
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
        {this.renderForm(this.props.dataSource)}
        <Form horizontal={true} >
          <FormItem {...tailFormItemLayout}>
            {this._renderColumnAction()}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ListDetail);

