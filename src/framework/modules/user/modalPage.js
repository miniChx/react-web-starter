/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import {Modal, Form, Button, Input, Row, Col, message, Checkbox} from 'mxa';
import sha256 from 'sha256';

import styles from '../../styles/views/listview.less';
import {
  addAccountServer,
  findAccountById,
  updateAccountServer,
  relateRolesAndUsers,
  findAllRolesByUserId,
  updatPasswordServer
} from '../../actions/account';
import {longRunExec} from '../../system/longRunOpt';
import validation from '../../utils/validation';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const AddUserForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, title, userCode} = props;
    const {getFieldDecorator} = form;
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
            {getFieldDecorator('mobileNo', { initialValue: '' })(
              <Input />
            )}
          </FormItem>
          <FormItem label="用户名">
            {getFieldDecorator('userName', { initialValue: '' })(
              <div>
                <input style={{display: 'none'}} />
                <Input />
              </div>
            )}
          </FormItem>
          <FormItem label="用户密码">
            {getFieldDecorator('password', { initialValue: '' })(
              <div>
                <input style={{display: 'none'}} />
                <Input type="password" />
              </div>
            )}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email', { initialValue: '' })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

const EditUserForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, title, dataSource} = props;
    const {getFieldDecorator} = form;
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
            {getFieldDecorator('mobileNo', {initialValue: dataSource.mobileNo})(
              <Input />
            )}
          </FormItem>
          <FormItem label="用户名">
            {getFieldDecorator('userName', {initialValue: dataSource.userName})(<Input />)}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email', {initialValue: dataSource.email})(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

const SetRoleForm = Form.create()(
  (props) => {
    const {
      visible,
      onCancel,
      onCreate,
      form,
      title,
      roleList
    } = props;
    const {getFieldDecorator} = form;
    let plainOptions = [];
    let checkedList = [];
    if (roleList) {
      roleList.map((item, index) => {
        plainOptions.push({
          label: item.roleValue,
          value: item.roleCode
        });
        if (item.isSelected) {
          checkedList.push(item.roleCode);
        }
      })
    }
    return (
      <Modal
        visible={visible}
        title={title}
        okText="修改"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form horizontal={true}>
          <FormItem>
            {getFieldDecorator('roles', {initialValue: checkedList})(
              <CheckboxGroup options={plainOptions}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
const UpdatePassForm = Form.create()(
  (props) => {
    const {
      visible,
      onCancel,
      onCreate,
      form,
      title,
      dataSource
    } = props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="修改"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form horizontal={true}>
          <FormItem>
            {getFieldDecorator('repass', {initialValue: ''})(
              <div>
                <input style={{display: 'none'}} />
                <Input type="password" />
              </div>
            )}
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
    record: React.PropTypes.object
  };

  static defaultProps = {
    buttonTitle: 'button'
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      roleList: []
    }
  }

  @autobind
  showModal() {
    this.setState({
      visible: true,
    });
    if (this.props.mode === 'setRole') {
      longRunExec(() => {
        return findAllRolesByUserId({
          id: this.props.record.id
        }).then(d => {
          this.setState({
            roleList: d.roles
          });
        });
      });
    }
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
      if (this.props.mode === 'detail') {
        if (!values.mobileNo || !values.userName || !values.email) {
          message.error('信息不能为空');
        } else if (!validation.isMobile(values.mobileNo)) {
          message.error('请输入正确的手机号');
        } else if (!validation.isEmail(values.email)) {
          message.error('请输入正确的邮箱地址');
        } else {
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
                  status: this.props.record.status
                }
              );
            }).then(() => {
              this.setState({visible: false});
              message.success('修改成功');
              this.props.renderResult();
              form.resetFields();
            });
          });
        }
      } else if (this.props.mode === 'add') {
        if (!values.mobileNo || !values.userName || !values.password || !values.email) {
          message.error('信息不能为空');
        } else if (!validation.isMobile(values.mobileNo)) {
          message.error('请输入正确的手机号');
        } else if (!validation.isEmail(values.email)) {
          message.error('请输入正确的邮箱地址');
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
              this.setState({visible: false});
              message.success('添加成功');
              this.props.renderResult();
              form.resetFields();
            });
          });
        }
      } else if (this.props.mode === 'setRole') {
        longRunExec(() => {
          return relateRolesAndUsers({
            userId: this.props.record.id,
            roleCodes: values.roles
          }).then(() => {
            this.setState({visible: false});
            message.success('设置成功');
          });
        });
      } else if (this.props.mode === 'updatePass') {
        const pass = sha256(values.repass);
        longRunExec(() => {
          return updatPasswordServer({
            id: this.props.record.id,
            password: pass
          }).then(() => {
            this.setState({visible: false});
            message.success('修改成功');
          });
        });
      }
      // this.setState({ visible: false });
    });
  }

  @autobind
  handleCancel(e) {
    console.log(e);
    const form = this.form;
    form.resetFields();
    this.setState({
      visible: false,
    });
  }

  @autobind
  _saveFormRef(form) {
    this.form = form;
  }

  @autobind
  _onCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  render() {
    if (this.props.mode === 'detail') {
      return (
        <div>
          <a
            className={styles.inlineButton}
            onClick={this.props.record.status !== 'ACTIVE' ? null : this.showModal}
            disabled={this.props.record.status !== 'ACTIVE' ? true : false}>
            {this.props.title}
          </a>
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
    } else if (this.props.mode === 'add') {
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
    } else if (this.props.mode === 'setRole') {
      return (
        <div>
          <a
            onClick={this.props.record.status !== 'ACTIVE' ? null : this.showModal}
            disabled={this.props.record.status !== 'ACTIVE' ? true : false}
            className={styles.inlineButton}>{this.props.title}</a>
          <SetRoleForm
            ref={this._saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleOk}
            title={this.props.title}
            roleList={this.state.roleList}
          />
        </div>
      );
    } else if (this.props.mode === 'updatePass') {
      return (
        <div>
          <a
            onClick={this.props.record.status !== 'ACTIVE' ? null : this.showModal}
            disabled={this.props.record.status !== 'ACTIVE' ? true : false}
            className={styles.inlineButton}>{this.props.title}</a>
          <UpdatePassForm
            ref={this._saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleOk}
            title={this.props.title}
            dataSource={this.props.record}
          />
        </div>
      );
    }

    return null;
  }
}

export default connect()(ModalPage);
