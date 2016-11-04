/**
 * Created by geweimin on 16/10/25.
 */
import React from 'react';
import { Form, Button, Input, Row, Col, Checkbox } from 'mxa';
import { Link } from 'react-router';

const FormItem = Form.Item;

// 使用范例 config是可选属性
// <LoginForm submitCallback={handleSubmit} config={{"userPlaceHolder": "用户名或手机号", "passPlaceHolder": "请输入密码", "passLabel": "密码", "userLabel": "用户名", "noNeedRememberLogin": false, "isRemember": true}}/>

function noop() {
  return false;
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.config && this.props.config.isRemember) {
      this.props.form.setFieldsValue({
        remember: this.props.config.isRemember
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      // 模拟登录信息出错的错误提示
      if (values.user === '1234') {
        this.props.form.setFields({ user: { errors: [{ field: 'user', message: '用户名不存在' }] } });
        return;
      } else if (values.user === '12345' && values.pass === '11111') {
        this.props.form.setFields({ pass: { errors: [{ field: 'pass', message: '密码不正确' }] } });
        return;
      }

      // 网络请求
      if (this.props.submitCallback) {
        this.props.submitCallback(values);
        // 处理网络请求错误信息
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = this.props.config ? this.props.config : {};
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        <Form horizontal={true}>

          <FormItem label={config.userLabel ? config.userLabel : '手机号'} {...formItemLayout}>
            {getFieldDecorator('user', {
              rules: [
                { required: true, message: '请输入用户名' }
              ]
            })(
              <Input placeholder={config.userPlaceHolder ? config.userPlaceHolder : '手机号'} />
            )}
          </FormItem>

          <FormItem label={config.passLabel ? config.passLabel : '密码'} {...formItemLayout}>
            {getFieldDecorator('pass', {
              rules: [
                { required: true, message: '请输入密码' }
              ]
            })(
              <Input
                type="password" placeholder={config.passPlaceHolder ? config.passPlaceHolder : '密码'}
                autoComplete="off" onContextMenu={noop}
                onPaste={noop} onCopy={noop} onCut={noop}
                id="pass"
              />
            )}
          </FormItem>
          <Row type="flex" align="middle">
            <Col span={7} offset={7}>
              <FormItem>
                {!config.noNeedRememberLogin && getFieldDecorator('remember')(
                  <Checkbox defaultChecked={config.isRemember}>记住登录</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            </Col>
            <Col offset={1}>
              <Button><Link to="/register" >注册</Link></Button>
            </Col>
          </Row>
          <Row>
            <Col span={7} offset={17}>
              <Link to="/findPwd">找回密码</Link>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }


}

export default Form.create()(LoginForm);

