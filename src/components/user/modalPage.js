/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Modal, Form, Button, Input, Row, Col } from 'mxa';

import styles from '../../styles/views/listview.less';

const FormItem = Form.Item;

const AddUserForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, title, userCode } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="添加"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form horizontal={true}>
          <FormItem label="手机号">
            {getFieldDecorator('userCode', { initialValue: userCode })(
              <Input />
            )}
          </FormItem>
          <FormItem label="用户名称">
            {getFieldDecorator('userValue')(<Input />)}
          </FormItem>
          <FormItem label="用户密码">
            {getFieldDecorator('userPass')(<Input />)}
          </FormItem>
          <FormItem label="用户邮件">
            {getFieldDecorator('userEmail')(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

const EditUserForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, title, dataSource } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="修改"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form horizontal={true}>
          <FormItem label="手机号">
            {getFieldDecorator('userCode', { initialValue: dataSource.userCode })(
              <Input />
            )}
          </FormItem>
          <FormItem label="用户名称">
            {getFieldDecorator('userValue', { initialValue: dataSource.userValue })(<Input />)}
          </FormItem>
          <FormItem label="用户密码">
            {getFieldDecorator('userPass', { initialValue: dataSource.userPass })(<Input />)}
          </FormItem>
          <FormItem label="用户邮件">
            {getFieldDecorator('userEmail', { initialValue: dataSource.userEmail })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default class ModalPage extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    mode: React.PropTypes.string,
    record: React.PropTypes.object,
  };

  static defaultProps = {
    buttonTitle: 'button'
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  @autobind
  showModal() {
    this.setState({
      visible: true,
    });
  }

  @autobind
  handleOk() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      // form.resetFields();
      if (this.props.record) {
        //TODO: 实现修改用户的操作 => 联调接口
      } else {
        //TODO: 实现添加用户的操作 => 联调接口
        longRunExec(() => {
          return this.props.dispatch(AddUserServer(
            values.remember,
            { userName: values.user, password: sha256(values.pass) }
          ));
        });
      }
      // this.setState({ visible: false });
    });
  }

  @autobind
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  @autobind
  _saveFormRef(form) {
    this.form = form;
  }

  render() {
    if (this.props.record) {
      return (
        <div>
          <a className={styles.inlineButton} onClick={this.showModal}>{this.props.title}</a>
          <EditUserForm
            ref={this._saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleOk}
            title={this.props.title}
            dataSource={this.props.record}
          />
        </div>
      );
    } else if (this.props.mode === 'add'){
      return (
        <div>
          <Button className={styles.inlineButton} onClick={this.showModal}>{this.props.title}</Button>
          <AddUserForm
            ref={this._saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleOk}
            title={this.props.title}
            userCode={this.props.userCode}
          />
        </div>
      );
    }

    return null;
  }
}
