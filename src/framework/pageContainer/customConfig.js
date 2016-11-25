/* eslint-disable no-console */

import React from 'react';

import Role from './role';
import AccountList from './user';
import BizConfig from '../../bundle/bizConfig';

const customMap = {
  'Role/render': Role,
  'AccountList/render': AccountList
}

//
//class CustomWrapper extends React.Component {
//  render() {
//    if (this.props.domainLink === 'Role/render') {
//      return (
//        <Role {...this.props} />
//      );
//    } else if (this.props.domainLink === 'AccountList/render') {
//      return (
//        <AccountList {...this.props} />
//      );
//    }
//    const Page = BizConfig[this.props.domainLink] || ;
//    return (
//      <Page {...this.props} />
//    );
//  }
//}

const customWrapper = domainLink => {
  if (customMap[domainLink]) {
    return customMap[domainLink];
  }
  return BizConfig[domainLink];
};

export default customWrapper;
