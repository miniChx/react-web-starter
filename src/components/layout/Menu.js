/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';
import { Menu } from 'mxa';
import { getValueByKey } from '../../framework/utils/MapUtils';
import { CONTAINER_PRE, CUSTOM_CONTAINER_PRE } from '../../framework/routes';
import { getOpenKeys, getMenuItemAndPathByFunc } from '../../framework/utils/MenuHelper';

const SubMenu = Menu.SubMenu;

class MenuCreator extends React.Component {

  constructor(props) {
    super(props);
    let state = {
      current: '',
      openKeys: []
    };
    const { linkInfo, indexPath } = this.getMenuInfo(this.props.routing);
    if (linkInfo) {
      const openKeys = getOpenKeys(indexPath, this.props.menu);
      state = {
        current: linkInfo.menuCode,
        openKeys
      };
    }
    this.state = state;
  }

  // 根据路由变化, 获得路由信息
  @autobind
  getMenuInfo(routing) {
    const path = getValueByKey(routing, null, 'locationBeforeTransitions', 'pathname');
    const start = ('/' + CONTAINER_PRE + '/').length;
    const end = path.length;
    const id = path.substring(start, end);
    return getMenuItemAndPathByFunc(item => (item.domainLink === id || item.domainLink === '/' + id), this.props.menu);
  }

  // 控制选中的菜单项
  @autobind
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  // 控制菜单的展开和闭合
  @autobind
  subMenuClick(e) {
    const index = this.state.openKeys.lastIndexOf(e.key);
    if (index === -1) {
      this.setState({
        openKeys: [...this.state.openKeys, e.key]
      });
    } else {
      this.setState({
        openKeys: this.state.openKeys.slice(0, index)
      });
    }
  }

  componentWillReceiveProps(next) {
    const { linkInfo, indexPath } = this.getMenuInfo(next.routing);
    if (linkInfo) {
      const openKeys = getOpenKeys(indexPath, this.props.menu);
      this.setState({
        current: linkInfo.menuCode,
        openKeys
      });
    }
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
        <Link to={'/' + CONTAINER_PRE + item.domainLink}>
          {item.menuValue}
        </Link>
      </Menu.Item>
    );
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{ borderBottom: '0px' }}
      >
        {this.props.menu && this.props.menu.map((item => this.renderMenuItem(item)))}
      </Menu>
    );
  }
}

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  menu: state.menu,
  routing: state.routing
});

export default connect(mapStateToProps)(MenuCreator);
