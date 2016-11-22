/**
 * Created by cui on 16/11/16.
 */
import { createAction } from 'redux-actions';
import { PFetch } from '../system/fetch';
import links from '../../constant/links';

export const addRole = p => PFetch(links.addRole, p);

export const deleteRole = p => PFetch(links.deleteRole, p);

export const findAllRole = p => PFetch(links.findAllRole, p);

export const relateRolesAndUsers = p => PFetch(links.relateRolesAndUsers, p);

export const relateMenusToRole = p => PFetch(links.relateMenusToRole, p);

export const relateButtonsToRole = p => PFetch(links.relateButtonsToRole, p);

export const findButtonsByRoleCode = p => PFetch(links.findButtonsByRoleCode, p);

export const findMenusByRoleCode = p => PFetch(links.findMenusByRoleCode, p);
