/* eslint-disable no-console */

import React from 'react';
import { ListView } from '../../framework/modules';

class EnterpriseCusBasicInfoList extends React.Component {
  render() {
    const inject = {
      buttons: [{
        key: '加入黑名单',
        action: value => {
          console.log('## Customized list button ## ', value);
        }
      }]
    };
    return (
      <div>
        <ListView inject={inject} {...this.props} />
      </div>
    );
  }
}

export default EnterpriseCusBasicInfoList;
