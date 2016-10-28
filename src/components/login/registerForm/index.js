/**
 * Created by geweimin on 16/10/26.
 */
/* eslint-disable */
import React from 'react';

import { Form, Input, Row, Col } from 'mxa';
let FormItem = Form.Item;
import validation from '../../../common/utils/validation';
import classNames from 'classnames';
function noop() {
  return false;
}
class registerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validatorState: '',
      dirty: false,
    }
  }

  userExists(e) {
    let value = e.target.value;
    let isMobile = validation.isMobile(value);
    if (!isMobile) {
      this.props.form.setFields({user: {errors: [{field: "user", message: "您输入的手机号错误，请重新输入！"}]}});
    } else {

    }
  }

  checkPass(rule, value, callback) {
    const form = this.props.form;

    if (form.getFieldValue('pass') && this.state.dirty) {
      form.validateFields(['rePass'], { force: true });
    }

    callback();
  }

  checkPass2(rule, value, callback) {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('pass')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    let config = this.props.config;
    if (!config) {
      config = {};
    }
    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 12}
    };
    return (
      <div>
        <Form horizontal style={{ maxWidth: 800 }}>
          <Row type="flex" align="middle">
            <Col span={12}>
              <FormItem label={config.userLabel ? config.userLabel : "手机号"} {...formItemLayout}>
                {getFieldDecorator('user', {
                  rules: [
                    {required: true, message: '请输入手机号'}
                  ]
                })(
                  <Input placeholder={config.userPlaceHolder ? config.userPlaceHolder : "请输入手机号"}
                         onBlur={this.userExists.bind(this)}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={12}>
              <FormItem label="密码" {...formItemLayout}>
                {getFieldDecorator('pass', {
                  rules: [
                    {required: true, whitespace: true, message: '请输入密码'},
                    {validator: this.checkPass.bind(this)},
                  ],
                })(
                  <Input type="password"
                         placeholder="请输入密码"
                         onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                         autoComplete="off" id="pass"
                         onChange={(e) => {
                      console.log('Your password is stolen in this way', e.target.value);
                    }}
                         onBlur={(e) => {
                      const value = e.target.value;
                      this.setState({ dirty: this.state.dirty || !!value });
                    }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={12}>
              <FormItem label="确认密码" {...formItemLayout}>
                {getFieldDecorator('rePass', {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请确认输入密码',
                  }, {
                    validator: this.checkPass2.bind(this),
                  }],
                })(
                  <Input type="password"
                         placeholder="请确认输入密码"
                         onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                         autoComplete="off" id="rePass"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

/* eslint-disable */
export default registerForm = Form.create({})(registerForm);
