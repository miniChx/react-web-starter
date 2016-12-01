/* eslint-disable no-console */

import React from 'react';

import Role from '../modules/role';
import AccountList from '../modules/user';
import BizConfig from '../../bundles/bizConfig';

const customMap = {
  '/Role/render': Role,
  '/AccountList/render': AccountList
};

const customWrapper = domainLink => {
  const finalDomainLink = domainLink[0] === '/' ? domainLink : '/' + domainLink;
  if (customMap[finalDomainLink]) {
    return customMap[finalDomainLink];
  }
  return BizConfig && BizConfig[finalDomainLink];
};

export default customWrapper;
