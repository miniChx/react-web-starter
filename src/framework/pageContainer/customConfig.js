/* eslint-disable no-console */

import React from 'react';

import Role from '../modules/role';
import AccountList from '../modules/user';
import BizConfig from '../../bundle/bizConfig';

const customMap = {
  'Role/render': Role,
  'AccountList/render': AccountList
};

const customWrapper = domainLink => {
  if (customMap[domainLink]) {
    return customMap[domainLink];
  }
  return BizConfig && BizConfig[domainLink];
};

export default customWrapper;
