/**
 * Created by cui on 16/11/15.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Tree } from 'mxa';

import { longRunExec } from '../../system/longRunOpt';

const TreeNode = Tree.TreeNode;

export default class roleAuthentication extends React.Component {

  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      roleMenus: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      menuCodes: []
    };
  }

  componentDidMount() {
    longRunExec(() => {
      return this.props.actions.findMenusByRoleCode({
        roleCode: this.props.record.roleCode
      })
        .then(data => {
          this.setState({
            roleMenus: data.allMenus,
            expandedKeys: this.constructCheckedKeys(data.allMenus).checkedKeys,
            checkedKeys: this.constructCheckedKeys(data.allMenus).checkedKeys,
            menuCodes: this.constructCheckedKeys(data.allMenus).menuCodes,
          });
        })
    });
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
    const menuCodes = [];
    const loop = data => data.map((item) => {
      if (item.subMenus) {
        loop(item.subMenus);
      }
      if (item.isSelected) {
        checkedKeys.push(item.menuValue);
        menuCodes.push(item.menuCode);
      }
    });
    loop(this.state.roleMenus);
    return {
      checkedKeys,
      menuCodes
    };
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
        {loop(this.state.roleMenus)}
      </Tree>
    );
  }

}
