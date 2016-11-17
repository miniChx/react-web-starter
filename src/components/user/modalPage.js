/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Modal, Form, Button, Input, Row, Col, message } from 'mxa';
import sha256 from 'sha256';

import styles from '../../styles/views/listview.less';
import { addAccountServer, findAccountById, updateAccountServer } from '../../actions/account';
import { longRunExec } from '../../system/longRunOpt';

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
            {getFieldDecorator('mobileNo')(
              <Input />
            )}
          </FormItem>
          <FormItem label="用户名">
            {getFieldDecorator('userName')(<Input />)}
          </FormItem>
          <FormItem label="用户密码">
            {getFieldDecorator('password')(<Input />)}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email')(<Input />)}
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
            {getFieldDecorator('mobileNo', { initialValue: dataSource.mobileNo })(
              <Input />
            )}
          </FormItem>
          <FormItem label="用户名">
            {getFieldDecorator('userName', { initialValue: dataSource.userName })(<Input />)}
          </FormItem>
          <FormItem label="用户密码">
            {getFieldDecorator('password')(<Input placeholder='********' />)}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email', { initialValue: dataSource.email })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export class ModalPage extends React.Component {

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
        longRunExec(() => {
          return findAccountById({
            id: this.props.record.id
          }).then((data) => {
            return updateAccountServer(
              {
                id: this.props.record.id,
                userName: values.userName,
                mobileNo: values.mobileNo,
                email: values.email,
                password: values.password === '' ? data.password : sha256(values.password),
                status: this.props.record.status
              }
            );
          }).then(() => {
            this.setState({ visible: false });
            message.success('修改成功');
            this.props.renderResult();
          });
        });
      } else {
        longRunExec(() => {
          return addAccountServer(
            {
              userName: values.userName,
              password: sha256(values.password),
              mobileNo: values.mobileNo,
              email: values.email
            }
          ).then(() => {
            this.setState({ visible: false });
            message.success('添加成功');
            this.props.renderResult();
          });
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

export default connect()(ModalPage);
