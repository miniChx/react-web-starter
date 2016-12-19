/**
 * Created by baoyinghai on 10/27/16.
 */


export default {
  // getMenus: '/Advice/getMenus',
  getMenus: 'Api/getMenu',
  login: 'Pub/Account/login',
  logout: 'api/AccountDetail/logout',

  // role
  addRole: 'api/Role/add',
  deleteRole: 'api/Role/delete',
  findAllRole: 'api/Role/render',
  relateRolesAndUsers: 'api/RoleRela/relateRolesToUser',
  relateMenusToRole: 'api/RoleRela/relateMenusToRole',
  relateButtonsToRole: 'api/RoleRela/relateButtonsToRole',
  findButtonsByRoleCode: 'api/RoleRela/findButtonsByRoleCode',
  findMenusByRoleCode: 'api/RoleRela/findMenusByRoleCode',

  // Account
  addAccount: 'api/AccountDetail/add',
  updateAccount: 'api/AccountDetail/update',
  renderAccount: 'api/AccountList/render',
  searchAccount: 'api/AccountList/search',
  findAccountById: 'api/AccountDetail/findById',
  findAllRolesByUserId: 'api/RoleRela/findAllRolesByUserId',
  updatPassword: 'api/AccountDetail/updatePassword',

  // upload
  uploadFile: 'upload',
  downloadFile: 'download'
};
