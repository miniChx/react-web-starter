/**
 * Created by baoyinghai on 10/26/16.
 */
/* eslint-disable */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './loginForm'
import { routerShape, Link } from 'react-router';
import { Button, Table, Icon, Select, Row, Col } from 'mxa';
import { login } from '../../actions/global';
import { longRunExec } from '../../system/longRunOpt';
import styles from '../../styles/views/login.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: routerShape
  };


  handleSubmit (values) {
    longRunExec(() => this.props.actions.login(values.user));
  }

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

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators({ login }, dispatch)
  }
})
export default connect(null, mapDispatchToProps)(Login);
