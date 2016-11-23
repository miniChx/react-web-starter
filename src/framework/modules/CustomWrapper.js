/* eslint-disable no-console */

import React from 'react';

import Role from './role';
import AccountList from './user';

class CustomWrapper extends React.Component {
  render() {
    if (this.props.domainLink === 'Role/render') {
      return (
        <Role {...this.props} dataSource={this.props.dataSource} />
      );
    } else if (this.props.domainLink === 'AccountList/render') {
      return (
        <AccountList {...this.props} dataSource={this.props.dataSource} />
      );
    }
    return null;
  }
}

export default CustomWrapper;
