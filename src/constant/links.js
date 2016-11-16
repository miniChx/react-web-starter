/**
 * Created by baoyinghai on 10/27/16.
 */


export default {
  // getMenus: '/Advice/getMenus',
  getMenus: '/Api/AccountDetail/getMenus',
  login: '/Pub/Account/login',
  logout: '/Api/Account/logout',
  addAccount: 'Api/Account/add',

  // role
  addRole: '/Api/Role/add',
  deleteRole: '/Api/Role/delete',
  findAllRole: '/Api/Role/render',
  relateRolesAndUsers: '/Api/RoleRela/relateRolesToUser',
  relateMenusToRole: '/Api/RoleRela/relateMenusToRole',
  relateButtonsToRole: '/Api/RoleRela/relateButtonsToRole',
  findButtonsByRoleCode: '/Api/RoleRela/findButtonsByRoleCode',
  findMenusByRoleCode: '/Api/RoleRela/findMenusByRoleCode',

};
