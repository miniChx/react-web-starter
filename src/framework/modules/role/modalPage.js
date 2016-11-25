/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Modal, Button, Input, Row, Col, Form } from 'mxa';
import GetMenus from './getMenus';
import GetButtons from './getButtons';

const FormItem = Form.Item;

const AddRoleForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, title } = props;
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
          <FormItem label="角色编号" type="flex" justify="space-start" align="middle">
            {getFieldDecorator('roleCode')(
              <Input />
            )}
          </FormItem>
          <FormItem label="角色名称" type="flex" justify="space-start" align="middle">
            {getFieldDecorator('roleValue')(<Input />)}
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
    this.codes = [];
    this.state = {
      visible: false,
      codes: [],
      allMenus: [],
      allDomainButtons: []
    };
  }

  @autobind
  showModal() {
    if (this.props.mode === 'menu') {
      this.props.exec(() => {
        return this.props.actions.findMenusByRoleCode({
            roleCode: this.props.record.roleCode
          })
          .then(data => {
            this.setState({
              visible: true,
              allMenus: data.allMenus
            });
          })
      });
    } else if (this.props.mode === 'button') {
      longRunExec(() => {
        return this.props.actions.findButtonsByRoleCode({
            roleCode: this.props.record.roleCode
          })
          .then((data) => {
            this.setState({
              visible: true,
              allDomainButtons: data.allDomainButtons
            });
          });
      })
    } else if (this.props.mode === 'detail') {
      this.setState({
        visible: true,
      });
    }
  }

  @autobind
  handleOk() {
    this.setState({
      visible: false
    });
    if (this.props.mode === 'add') {
      const form = this.form;
      form.validateFields((err, values) => {
        longRunExec(() => {
          return this.props.actions.addRole({
              roleCode: values.roleCode,
              roleValue: values.roleValue
            })
            .then(() => {
              Modal.success({
                title: '添加成功'
              });
              this.props.refreshRole();
              form.resetFields();
            });
        });
      });
    } else if (this.props.mode === 'menu') {
      this.props.exec(() => {
        return this.props.actions.relateMenusToRole({
            roleCode: this.props.record.roleCode,
            menuCodes: this.codes
          })
          .then(() => {
            Modal.success({
              title: '关联成功'
            });
            this.props.refreshRole();
          });
      });
    } else if (this.props.mode === 'button') {
      this.props.exec(() => {
        return this.props.actions.relateButtonsToRole({
            roleCode: this.props.record.roleCode,
            buttonCodes: this.codes
          })
          .then(() => {
            Modal.success({
              title: '关联成功'
            });
            this.props.refreshRole();
          });
      });
    }
  }

  @autobind
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
    if (this.props.mode === 'add') {
      const form = this.form;
      form.resetFields();
    }
  }

  @autobind
  callbackCodes(type, codes) {
    this.codes = codes;
  }

  @autobind
  _saveFormRef(form) {
    this.form = form;
  }

  @autobind
  _renderModalPage() {
    if (this.props.record) {
      switch (this.props.mode) {
        case 'detail':
          return (
            <div>
              <a className={this.props.className} onClick={this.showModal}>{this.props.title}</a>
              <Modal title={this.props.title} visible={this.state.visible}
                     onOk={this.handleOk} onCancel={this.handleCancel}
              >
                <Row type="flex" justify="space-start" align="middle">
                  <Col>角色编号: </Col>
                  <Col>{this.props.record.roleCode}</Col>
                </Row>
                <Row type="flex" justify="space-start" align="middle">
                  <Col>角色名称: </Col>
                  <Col>{this.props.record.roleValue}</Col>
                </Row>
              </Modal>
            </div>
          );
        case 'menu':
          return (
            <div>
              <a className={this.props.className} onClick={this.showModal}>{this.props.title}</a>
              <Modal title={this.props.title} visible={this.state.visible}
                     onOk={this.handleOk} onCancel={this.handleCancel}
                     okText="关联菜单"
              >
                <GetMenus
                  actions={this.props.actions}
                  record={this.props.record}
                  allMenus={this.state.allMenus}
                  callbackCodes={this.callbackCodes}
                  {...this.props}
                />
              </Modal>
            </div>
          );
        case 'button':
          return (
            <div>
              <a className={this.props.className} onClick={this.showModal}>{this.props.title}</a>
              <Modal title={this.props.title} visible={this.state.visible}
                     onOk={this.handleOk} onCancel={this.handleCancel}
                     okText="关联按钮"
              >
                <GetButtons
                  actions={this.props.actions}
                  record={this.props.record}
                  allDomainButtons={this.state.allDomainButtons}
                  callbackCodes={this.callbackCodes}
                  {...this.props}
                />
              </Modal>
            </div>
          );
        default:
          return null;
      }
    } else if (this.props.mode === 'add'){
      return (
        <div>
          <Button className={this.props.className} onClick={this.showModal}>{this.props.title}</Button>
          <AddRoleForm
            ref={this._saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleOk}
            title={this.props.title}
          />
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        {this._renderModalPage()}
      </div>
    );
  }
}
