/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Form, Input, DatePicker, Col, Select, Tooltip, Icon, Cascader, Row, Button, Checkbox, Modal } from 'mxa';
import { autobind } from 'core-decorators';
import { goBack } from 'react-router-redux';

import renderFuc from './displayAnalyser/index';
import styles from '../../../styles/views/listview.less';
// import { ExtendButton } from '../../../../components';
import { PFetch } from '../../../system/fetch';
import { dispatch } from '../../../service/DispatchService';
import { BUTTON_MESSAGEPROMPTTYPE } from '../../../constant/dictCodes';

const FormItem = Form.Item;

class ProcessDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      passwordDirty: false
    };
  }

  @autobind
  handleSubmit(item) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { domainType, ...rest } = this.props.location.query;
        this.props.exec(() => {
          return PFetch('/Api' + (item.domainLink || item.actionName), { ...rest, ...values })
            .then(response => {
              console.log(response);
              if (item.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.MESSAGE) {
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
          ))
        }
      </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    return (
      <Form horizontal={true} >
        {this.props.dataSource.fields && this.props.dataSource.fields.map(item => {
          return renderFuc(formItemLayout, item, getFieldDecorator, this.props.dataSource.detailResult);
        })}
        <FormItem {...tailFormItemLayout}>
          {this._renderColumnAction()}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ProcessDetail);
