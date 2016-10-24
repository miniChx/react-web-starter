/**
 * Created by baoyinghai on 10/20/16.
 */

import React from 'react';
import * as CacheService from '../../service/CacheService';
import { Row, Col, Button, Tree } from 'mxa';
import SetMenu from './SetMenu';
const TreeNode = Tree.TreeNode;


//{
//  "displaySequence":0,
//  "domainLink":"home",
//  "menuCode":"home",
//  "menuValue":"首页",
//  "roleCodes":[
//  "Role1",
//  "Role3",
//  "Role4"
//]
//},

class MenuManager extends React.Component {

  constructor(props) {
    super(props);
    this.clearState = this.clearState.bind(this);

    this.keys = ['0-0-0', '0-0-1'];

    this.state = {
      menu: CacheService.getMenu(),
      type: null,
      position: null,
      defaultExpandedKeys: this.keys,
      defaultSelectedKeys: this.keys,
      defaultCheckedKeys: this.keys,
    }
  }

  clearState() {
    this.setState({ type: null, position: null });
  }

  setCreateState(type, position) {
    this.setState({type, position});
  }


  renderAddBtn(type, position) {
    return (
      <TreeNode
        title={ <Button type="ghost"  size="small" onClick={() => this.setCreateState(type, position)} >创建节点</Button> }
        key={'last_' + type + '_' + position}
      />
    );
  }

  renderSubMenus(subMenus, index) {
    const subList = [];
    subMenus.forEach((item, index) => {
      subList.push(
        <TreeNode title={item.menuValue} key={'sub_' + index} />
      );
    });
    return subList;
  }

  renderNode(item, index) {
    return (
      <TreeNode title={item.menuValue} key={item.menuCode}>
        {item.subMenus && item.subMenus.map((i, j) => {
          return this.renderNode( i, j)
        })}
      </TreeNode>
    );
  }


  renderMenu() {
    const list = [];
    this.state.menu.forEach((item, index) => {
      list.push(this.renderNode(item, index));
      //list.push(
      //  <TreeNode title={item.menuValue} key={'root_'+ index}>
      //    {item.subMenus && this.renderSubMenus(item.subMenus, index)}
      //  </TreeNode>
      //);
    });
    return (
      <Tree className="myCls" showLine defaultExpandAll={true}
            onSelect={this.onSelect} onCheck={this.onCheck}
      >
        {list}
      </Tree>
    );
  }

  renderLinkMenu() {
    if (this.state.type || this.state.position) {
      return (
        <SetMenu type={this.state.type} position={this.state.position} clear={this.clearState}/>
      );
    }
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span="8">
            <div>{this.renderMenu()}</div>
          </Col>
          <Col span="16">
            <div>{this.renderLinkMenu()}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuManager;
