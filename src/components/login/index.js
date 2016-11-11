/**
 * Created by baoyinghai on 10/26/16.
 */
/* eslint-disable */
import React from 'react';
import LoginForm from './loginForm'
import { routerShape, Link } from 'react-router';
import { Table, Icon, Select, Row, Col } from 'mxa';
import styles from '../../styles/views/login.less';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: routerShape
  };

  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={{span: 14}} sm={{span: 12}} md={{span: 10}} lg={{span: 8}} className={styles.loginContent_marginTop}>
            <LoginForm />
          </Col>
        </Row>
      </div>
    );
  }
}
