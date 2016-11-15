/**
 * Created by cui on 16/11/13.
 */
import React from 'react';

import Role from '../role';
import UserList from '../user';

export default class Custom extends React.Component {

  render() {
    if (this.props.domainLink === 'RoleManagement') {
      return (
        <div>
          <Role dataSource={this.props.dataSource} />
        </div>
      );
    } else if (this.props.domainLink === 'UserList/render') {
      return (
        <div>
          <UserList dataSource={this.props.dataSource} />
        </div>
      );
    }
    return null;
  }

}
