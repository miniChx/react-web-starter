/**
 * Created by baoyinghai on 11/28/16.
 */
import React from 'react';
import { Menu } from 'mxa';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import { CONTAINER_PRE, CUSTOM_CONTAINER_PRE } from '../../../routes';

const SubMenu = Menu.SubMenu;

export default class sideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: this.props.selectedKeys,
      openKeys: this.props.openKeys
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.selectedKeys,
      openKeys: nextProps.openKeys
    });
  }

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

  render() {
    return (
      <Menu
        onOpenChange={e => this.setState({ openKeys: e })}
        openKeys={this.state.openKeys}
        selectedKeys={this.state.selectedKeys}
        onClick={this.props.menuClick}
        mode="inline"
        style={{ borderRight: '0px' }}
      >
        {this.props.menu && this.props.menu.map((item => this.renderMenuItem(item)))}
      </Menu>
    );
  }

}
