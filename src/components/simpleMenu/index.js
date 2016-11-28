/**
 * Created by baoyinghai on 11/28/16.
 */
import React from 'react';
import { Menu } from 'mxa';
import { autobind } from 'core-decorators';

const SubMenu = Menu.SubMenu;

export default class SimpleMenu extends React.Component {

  static propTypes = {
    menuClick: React.PropTypes.func
  };

  @autobind
  subMenuClick(e) {
    console.log(e);
  }

  @autobind
  renderMenuItem(item) {
    if (item && item.subMenus && item.subMenus.length > 0) {
      return (
        <SubMenu key={item.menuCode} title={<span>{item.menuValue}</span>} onTitleClick={this.subMenuClick}>
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
  handleClick(e) {
    console.log(e);
    this.props.menuClick && this.props.menuClick(e);
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        mode="inline"
        style={{ borderRight: '0px' }}
      >
        {this.props.menu && this.props.menu.map((item => this.renderMenuItem(item)))}
      </Menu>
    );
  }

}
