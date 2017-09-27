/**
 * Created by vison on 16/11/14.
 */
import { PFetch } from '../framework/system/fetch';
import links from '../framework/constant/links';


/* eslint-disable */
export const addAccountServer = (params) => {
  return PFetch(links.addAccount, params);
};

export const deleteAccountServer = (params) => {
  return PFetch(links.updateAccount, params);
};

export const findAccountById = (params) => {
  return PFetch(links.findAccountById, params).then(d => {
    return d;
  });
};

export const updateAccountServer = (params) => {
  return PFetch(links.updateAccount, params);
};

export const searchAccountServer = (params) => {
  return PFetch(links.searchAccount, params).then(d => {
    return d;
  });
};

export const findAllRolesByUserId = (params) => {
  return PFetch(links.findAllRolesByUserId, params).then(d => {
    return d;
  });
};

export const relateRolesAndUsers = (params) => {
  return PFetch(links.relateRolesAndUsers, params);
};

export const updatPasswordServer = (params) => {
  return PFetch(links.updatPassword, params);
};
