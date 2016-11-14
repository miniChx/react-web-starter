/**
 * Created by cui on 16/11/13.
 */
import React from 'react';

import Role from '../role';

export default class Custom extends React.Component {

  render() {
    if (this.props.domainLink === 'RoleManagement') {
      return (
        <div>
          <Role dataSource={this.props.dataSource} />
        </div>
      );
    }
    return null;
  }

}
