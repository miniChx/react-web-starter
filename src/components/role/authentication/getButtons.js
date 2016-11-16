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
    "domainName": "Demo",
    "domainType": "List",
    "simpleButtons": [
      {
        "buttonDescription": "添加",
        "buttonCode": "Demo_Detail_add_In_Demo_List",
        "isSelected": true
      },
      {
        "buttonDescription": "删除",
        "buttonCode": "Demo_Detail_deleteById_In_Demo_List",
        "isSelected": false
      },
      {
        "buttonDescription": "详情",
        "buttonCode": "Demo_Detail_render_In_Demo_List",
        "isSelected": true
      },
      {
        "buttonDescription": "筛选",
        "buttonCode": "Demo_List_search_In_Demo_List",
        "isSelected": true
      }
    ]
  },
  {
    "domainName": "Demo",
    "domainType": "Detail",
    "simpleButtons": [
      {
        "buttonDescription": "保存",
        "buttonCode": "Demo_Detail_update_In_Demo_Detail",
        "isSelected": false
      }
    ]
  },
  {
    "domainName": "processes",
    "domainType": "List",
    "simpleButtons": []
  },
  {
    "domainName": "processes",
    "domainType": "Detail",
    "simpleButtons": [
      {
        "buttonDescription": "申请转正",
        "buttonCode": "processes_Detail_userApply_In_processes_Detail",
        "isSelected": true
      },
      {
        "buttonDescription": "通过申请",
        "buttonCode": "processes_Detail_agreeApply_In_processes_Detail",
        "isSelected": false
      },
      {
        "buttonDescription": "邮件提醒",
        "buttonCode": "processes_Detail_sendEmail_In_processes_Detail",
        "isSelected": false
      },
      {
        "buttonDescription": "处理信息",
        "buttonCode": "processes_Detail_registUserInfo_In_processes_Detail",
        "isSelected": false
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
      if (item.simpleButtons) {
        loop(item.simpleButtons);
      }
      if (item.isSelected) {
        checkedKeys.push(item.buttonDescription);
      }
    });
    loop(gData);
    return checkedKeys;
  }

  render() {
    const loop = data => data.map((item) => {
      if (item.simpleButtons) {
        if (item.buttonDescription === undefined) {
          return (
            <TreeNode
              key={item.domainName + '-' + item.domainType}
              title={item.domainName + '-' + item.domainType}>
              {loop(item.simpleButtons)}
            </TreeNode>
          );
        }
        return (
          <TreeNode key={item.buttonDescription} title={item.buttonDescription}>
            {loop(item.simpleButtons)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.buttonDescription} title={item.buttonDescription}/>;
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
