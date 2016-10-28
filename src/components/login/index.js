/**
 * Created by baoyinghai on 10/26/16.
 */
/* eslint-disable */
import React from 'react';
import LoginForm from './loginForm'
import { routerShape, Link } from 'react-router';
import { Button, Table, Icon, Select } from 'mxa';
import { dispatch } from '../../service/DispatchService';
import { login } from '../../actions/session';

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

  handleSubmit (values) {

  }

  render() {
    return (
      <div>
        <LoginForm submitCallback={this.handleSubmit.bind(this)}/>
        <Button><Link to="/register" >注册</Link></Button>
        <Button type="ghost" onClick={() => this.buttonClick()} > login </Button>
      </div>
    );
  }
}
