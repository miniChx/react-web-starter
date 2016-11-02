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
  }

  static contextTypes = {
    router: routerShape
  };

  completeClick () {

  }

  render() {
    return (
      <div>
        <RegisterForm backClick={() => this.context.router.push({ pathname: '/login' })}/>
      </div>
    );
  }
}
