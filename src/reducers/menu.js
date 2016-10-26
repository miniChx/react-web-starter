/**
 * Created by baoyinghai on 10/20/16.
 */
import { RESET_MENU, PAGE_TYPE_LIST } from '../actions/types';

// TODO: 本地页面
/* eslint-disable */
const initialState = [
  {
    "displaySequence":1,
    "menuCode":"renderList",
    "domainType": PAGE_TYPE_LIST,
    "menuValue":"系统管理",
    "roleCodes":[
      "Role1",
      "Role2",
      "Role5"
    ],
    "subMenus":[
      {
        "displaySequence":1,
        "menuCode":"orgManagement",
        "menuValue":"机构管理",
        "roleCodes":[
          "Role1",
          "Role5"
        ],
        "subMenus":[
          {
            "displaySequence":1,
            "domainLink":"/org_apply_list",
            "menuCode":"orgApplyManagement",
            "menuValue":"机构申请",
            "roleCodes":[
              "Role1"
            ]
          },
          {
            "displaySequence":2,
            "menuCode":"orgApproveManagement",
            "menuValue":"机构审批",
            "roleCodes":[
              "Role1",
              "Role5"
            ],
            "subMenus":[
              {
                "displaySequence":1,
                "domainLink":"/org_approve_undo_list",
                "menuCode":"orgApproveUndo",
                "menuValue":"未完成的工作",
                "roleCodes":[
                  "Role1"
                ]
              }
            ]
          }
        ]
      },
      {
        "displaySequence":2,
        "domainLink":"/AccountList/render",
        "domainType": PAGE_TYPE_LIST,
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
    "domainLink":"/demo_list",
    "menuCode":"caseManagement",
    "menuValue":"案例管理",
    "domainType": PAGE_TYPE_LIST,
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
      return [...action.payload];
    default:
      return state;
  }
}
