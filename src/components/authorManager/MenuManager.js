/**
 * Created by baoyinghai on 10/20/16.
 */

import React from 'react';
import * as CacheService from '../../service/CacheService';
import { Row, Col, Button } from 'mxa';
import SetMenu from './SetMenu';


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
    this.state = {
      menu: CacheService.getMenu(),
      type: null,
      position: null
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
      <div key="last">
        <Button type="ghost"  size="small" onClick={() => this.setCreateState(type, position)} >
          创建节点
        </Button>
      </div>
    );
  }

  renderSubMenus(subMenus, index) {
    const subList = [];
    subMenus.forEach((item, index) => {
      subList.push(
        <div key={'sub_' + index}>
          <span>{'--' + item.menuValue}</span>
        </div>
      );
    });
    subList.push(this.renderAddBtn('sub', index));
    return subList;
  }

  renderMenu() {
    const list = [];
    this.state.menu.forEach((item, index) => {
      list.push(
        <div key={'root_'+ index}>
          <div>{item.menuValue}</div>
          {item.subMenus && this.renderSubMenus(item.subMenus, index)}
          {!item.subMenus && this.renderAddBtn('sub', index)}
        </div>
      );
    });
    list.push(this.renderAddBtn('root', 'last'));
    return list;
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
