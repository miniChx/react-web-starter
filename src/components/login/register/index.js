/**
 * Created by baoyinghai on 10/26/16.
 */
/* eslint-disable */
import React from 'react';
import { Button, Table, Icon, Select } from 'mxa';
import { routerShape } from 'react-router';
import RegisterForm from '../registerForm';
export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  static contextTypes = {
    router: routerShape
  };

  buttonClick(e) {
    // 登陆之后的路由跳转
    this.context.router.push({ pathname: '/login' });
  }

  completeClick () {

  }

  render() {
    return (
      <div>
        <RegisterForm />
        <Button type="primary" onClick={() => this.completeClick()} > 完成注册 </Button>
        <Button type="ghost" onClick={() => this.buttonClick()} > 跳回登录 </Button>
      </div>
    );
  }
}
