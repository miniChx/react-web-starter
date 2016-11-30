/**
 * Created by baoyinghai on 11/28/16.
 */
import React from 'react';
import { Menu } from 'mxa';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';
import { CONTAINER_PRE, CUSTOM_CONTAINER_PRE } from '../../framework/routes';

const SubMenu = Menu.SubMenu;


export default class SimpleMenu extends React.Component {

  @autobind
  renderMenuItem(item) {
    if (item && item.subMenus && item.subMenus.length > 0) {
      return (
        <SubMenu key={item.menuCode} title={<span>{item.menuValue}</span>} >
          {item.subMenus.map(subItem => this.renderMenuItem(subItem))}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={item.menuCode} >
        {item.menuValue}
      </Menu.Item>
    );
  }

  @autobind
  getDomainLink(paths) {
    let menu = this.props.menu;
    paths.reverse().every((p, index) => menu.some && menu.some(m => {
      if (m.menuCode === p) {
        menu = m.subMenus ? m.subMenus : m;
        return true;
      }
      return false;
    }));
    return menu;
  }

  @autobind
  handleClick(e) {
    const m = this.getDomainLink(e.keyPath || [e.key]);
    console.log(m);
    let domainLink = m.domainLink;
    if (domainLink[0] === '/') {
      domainLink = domainLink.substring(1, domainLink.length);
    }
    const domainType = m.domainType;
    this.props.menuClick && this.props.menuClick(domainLink, domainType, m.menuCode);
  }

  render() {
    return (
      <Menu
        defaultOpenKeys={this.props.defaultOpenKeys}
        defaultSelectedKeys={this.props.defaultSelectedKeys}
        onClick={this.handleClick}
        mode="inline"
        style={{ borderRight: '0px' }}
      >
        {this.props.menu && this.props.menu.map((item => this.renderMenuItem(item)))}
      </Menu>
    );
  }

}
