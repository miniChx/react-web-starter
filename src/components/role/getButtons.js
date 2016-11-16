/**
 * Created by cui on 16/11/15.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Tree } from 'mxa';

import { PFetch } from '../../system/fetch';
import { longRunExec } from '../../system/longRunOpt';

const TreeNode = Tree.TreeNode;

export default class roleAuthentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allDomainButtons: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
    };
  }

  componentWillMount() {
    longRunExec(() => {
      return this.props.actions.findButtonsByRoleCode({
          roleCode: this.props.record.roleCode
        })
        .then((data) => {
          this.setState({
            allDomainButtons: data.allDomainButtons,
            expandedKeys: this.constructCheckedKeys(data.allDomainButtons),
            checkedKeys: this.constructCheckedKeys(data.allDomainButtons),
          })
        });
    })
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
    loop(this.state.allDomainButtons);
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
        {loop(this.state.allDomainButtons)}
      </Tree>
    );
  }

}
