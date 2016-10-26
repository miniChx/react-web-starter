/**
 * Created by baoyinghai on 10/26/16.
 */


import React from 'react';
import { Button, Table, Icon, Select } from 'mxa';
import { dispatch } from '../../service/DispatchService';
import { login } from '../../actions/session';
import { routerShape, Link } from 'react-router';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  static contextTypes = {
    router: routerShape
  };

  buttonClick(e) {
    dispatch(login('hahahahah'));
    // 登陆之后的路由跳转
  }

  render() {
    return (
      <div>
        <Link to="/register" >注册</Link>
        <Link to="/findPwd" >找回密码</Link>
        <Button type="ghost" onClick={() => this.buttonClick()} > login </Button>
      </div>
    );
  }
}
