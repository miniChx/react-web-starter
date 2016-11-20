/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';
import { Menu } from 'mxa';
import { searchMenu } from '../../framework/service/CacheService';
import { getValueByKey } from '../../common/utils/MapUtils';
import { CONTAINER_PRE, CUSTOM_CONTAINER_PRE } from '../../routes';

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
      const openKeys = this.getOpenKeys(indexPath, this.props.menu);
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

    return searchMenu(path.substring(start, end));
  }

  // 获取要展开的菜单key数组
  @autobind
  getOpenKeys(indexPath, menu) {
    indexPath.pop();
    const openKeys = [];
    let temp = menu;
    indexPath.every(index => {
      openKeys.push(temp[index] && temp[index].menuCode);
      temp = temp[index] && temp[index].subMenus;
      return temp;
    });
    return openKeys;
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
      const openKeys = this.getOpenKeys(indexPath, this.props.menu);
      console.log('open keys', openKeys);
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
        defaultOpenKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        openKeys={this.state.openKeys}
        mode="inline"
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
