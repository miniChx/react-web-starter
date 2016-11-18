/**
 * Created by cui on 16/11/13.
 */
import React from 'react';

import Role from '../role';
import AccountList from '../user';

export default class Custom extends React.Component {

  render() {
    if (this.props.domainLink === 'Role/render') {
      return (
        <div>
          <Role dataSource={this.props.dataSource} />
        </div>
      );
    } else if (this.props.domainLink === 'AccountList/render') {
      return (
        <div>
          <AccountList dataSource={this.props.dataSource} />
        </div>
      );
    }
    return null;
  }

}
