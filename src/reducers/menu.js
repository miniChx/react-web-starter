/**
 * Created by baoyinghai on 10/20/16.
 */
import { RESET_MENU } from '../actions/types';

const initialState = [
  {
    "displaySequence":0,
    "domainLink":"home",
    "menuCode":"home",
    "menuValue":"首页",
    "roleCodes":[
      "Role1",
      "Role3",
      "Role4"
    ]
  },
  {
    "displaySequence":1,
    "menuCode":"systemManagement",
    "menuValue":"权限管理",
    "roleCodes":[
      "Role1",
      "Role2",
      "Role5"
    ],
    "subMenus":[
      {
        "displaySequence":1,
        "domainLink":"menu_manager",
        "menuCode":"orgApplyManagement",
        "menuValue":"菜单管理",
        "roleCodes":[
          "Role1"
        ]
      },
      {
        "displaySequence":2,
        "domainLink":"user_manager",
        "menuCode":"accountManagement",
        "menuValue":"用户管理",
        "roleCodes":[
          "Role1",
          "Role2"
        ]
      }
    ]
  },
  {
    "displaySequence":2,
    "domainLink":"module_factory",
    "menuCode":"caseManagement",
    "menuValue":"模块工厂",
    "roleCodes":[
      "Role1",
      "Role3",
      "Role4"
    ]
  }
];

export default function update(state = initialState, action) {
  switch (action.type) {
    case RESET_MENU:
      return [ ...action.payload];
    default:
      return state;
  }
}
