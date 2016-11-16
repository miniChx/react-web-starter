/**
 * Created by cui on 16/11/15.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Tree } from 'mxa';

import { PFetch } from '../../../system/fetch';
import { longRunExec } from '../../../system/longRunOpt';

const TreeNode = Tree.TreeNode;

const gData =  [
  {
    "menuCode": "systemManagement",
    "menuValue": "系统管理",
    "isSelected": true,
    "subMenus": [
      {
        "menuCode": "orgManagement",
        "menuValue": "机构管理",
        "isSelected": true,
        "subMenus": [
          {
            "menuCode": "orgApplyManagement",
            "menuValue": "机构申请",
            "isSelected": true,
            "subMenus": []
          },
          {
            "menuCode": "orgApproveManagement",
            "menuValue": "机构审批",
            "isSelected": true,
            "subMenus": [
              {
                "menuCode": "orgApproveUndo",
                "menuValue": "未完成的工作",
                "isSelected": true,
                "subMenus": []
              },
              {
                "menuCode": "orgApproveDone",
                "menuValue": "已完成的工作",
                "isSelected": true,
                "subMenus": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "accountManagement",
        "menuValue": "用户管理",
        "isSelected": false,
        "subMenus": []
      },
      {
        "menuCode": "roleManagement",
        "menuValue": "角色管理",
        "isSelected": false,
        "subMenus": []
      }
    ]
  },
  {
    "menuCode": "demoManagement",
    "menuValue": "案例管理",
    "isSelected": false,
    "subMenus": []
  },
  {
    "menuCode": "processesManager",
    "menuValue": "流程管理",
    "isSelected": false,
    "subMenus": [
      {
        "menuCode": "toDo",
        "menuValue": "待办",
        "isSelected": false,
        "subMenus": []
      },
      {
        "menuCode": "unfinished",
        "menuValue": "未处理",
        "isSelected": false,
        "subMenus": []
      },
      {
        "menuCode": "finished",
        "menuValue": "已处理",
        "isSelected": false,
        "subMenus": []
      },
      {
        "menuCode": "start",
        "menuValue": "开始",
        "isSelected": false,
        "subMenus": []
      }
    ]
  }
];


export default class roleAuthentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: this.constructCheckedKeys(gData),
      autoExpandParent: true,
      checkedKeys: this.constructCheckedKeys(gData),
      selectedKeys: [],
    };
  }
  
  componentWillMount() {
    const  url = '/Advice/getMenus';
    const param = {};

    longRunExec(() => PFetch(url, param)
      .then(data => {
      }));
  }

  @autobind
  onExpand(expandedKeys) {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  @autobind
  onCheck(checkedKeys) {
    console.log(checkedKeys);
    this.setState({
      checkedKeys,
      selectedKeys: [],
    });
  }

  @autobind
  onSelect(selectedKeys, info) {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  @autobind
  constructCheckedKeys() {
    const checkedKeys = [];
    const loop = data => data.map((item) => {
      if (item.subMenus) {
        loop(item.subMenus);
      }
      if (item.isSelected) {
        checkedKeys.push(item.menuValue);
      }
    });
    loop(gData);
    return checkedKeys;
  }

  render() {
    const loop = data => data.map((item) => {
      if (item.subMenus) {
        return (
          <TreeNode key={item.menuValue} title={item.menuValue}>
            {loop(item.subMenus)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.menuValue} title={item.menuValue} />;
    });
    return (
      <Tree
        checkable={true}
        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
      >
        {loop(gData)}
      </Tree>
    );
  }

}
