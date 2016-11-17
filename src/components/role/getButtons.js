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
            expandedKeys: this.constructCheckedKeys(data.allDomainButtons).checkedKeys,
            checkedKeys: this.constructCheckedKeys(data.allDomainButtons).checkedKeys,
            buttonCodes: this.constructCheckedKeys(data.allDomainButtons).buttonCodes
          }, () => {
            this.props.callbackCodes('button', this.state.buttonCodes)
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
    this.setState({
      checkedKeys,
      buttonCodes: this.constructMenuCodes(checkedKeys),
      selectedKeys: [],
    }, () => {
      this.props.callbackCodes('button', this.state.buttonCodes)
    });
  }

  @autobind
  onSelect(selectedKeys, info) {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  @autobind
  constructCheckedKeys(allDomainButtons) {
    const checkedKeys = [];
    const buttonCodes = [];
    const loop = data => data.map((item) => {
      if (item.simpleButtons) {
        loop(item.simpleButtons);
      }
      if (item.isSelected) {
        checkedKeys.push(item.buttonDescription);
        buttonCodes.push(item.buttonCode);
      }
    });
    loop(allDomainButtons);
    return {
      checkedKeys,
      buttonCodes
    };
  }

  @autobind
  constructMenuCodes(checkedKeys) {
    const buttonCodes = [];
    const loop = data => data.map((item) => {
      if (item.simpleButtons) {
        loop(item.simpleButtons);
      }
      checkedKeys.map((menuValue) => {
        if (menuValue === item.buttonDescription) {
          buttonCodes.push(item.buttonCode);
        }
      })
    });
    loop(this.state.allDomainButtons);
    return buttonCodes;
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
