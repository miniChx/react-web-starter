/**
 * Created by baoyinghai on 10/26/16.
 */
/* eslint-disable */
import React from 'react';
import LoginForm from './loginForm'
import { routerShape, Link } from 'react-router';
import { Button, Table, Icon, Select, Row, Col } from 'mxa';
import { dispatch } from '../../service/DispatchService';
import { login } from '../../actions/global';
import styles from '../../styles/views/login.less';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: routerShape
  };


  handleSubmit (values) {
    dispatch(login('hahahahah'));
    // 登陆之后的路由跳转
  }

  render() {
    return (
      <div className={styles.loginContent_marginTop}>
        <Row type="flex" justify="center">
          <Col span={4}>
            <LoginForm submitCallback={this.handleSubmit} />
          </Col>
        </Row>
      </div>
    );
  }
}
