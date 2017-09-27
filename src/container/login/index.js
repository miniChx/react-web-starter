/**
 * Created by vison on 10/26/16.
 */
/* eslint-disable */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { routerShape, Link } from 'react-router';
import { Button, Table, Icon, Select, Row, Col } from 'antd';
import { longRunExec } from '../../framework/system/longRunOpt';
import styles from '../../framework/styles/views/login.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: routerShape
  };

  render() {
    return (
      <div class={styles.container}>
        <h1>Login</h1>
      </div>
    );
  }
}

export default connect()(Login);
