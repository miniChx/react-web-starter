/**
 * Created by baoyinghai on 10/26/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RegisterForm from './RegisterForm';

class Register extends React.Component {
  render() {
    return (
      <div>
        <RegisterForm backClick={() => this.props.dispatch(push('/login'))} />
      </div>
    );
  }
}

export default connect()(Register);
