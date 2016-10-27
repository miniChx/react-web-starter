/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import { Menu } from 'mxa';

import { searchMenu } from '../../service/CacheService';

import { getValueByKey } from '../../common/utils/MapUtils';

const SubMenu = Menu.SubMenu;

/* eslint-disable */
class MenuCreator extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.subMenuClick = this.subMenuClick.bind(this);
    this.getMenuInfo = this.getMenuInfo.bind(this);
    this.getOpenKeys = this.getOpenKeys.bind(this);
    const { linkInfo, indexPath } = this.getMenuInfo(this.props.routing);
    if (linkInfo) {
      const openKeys = this.getOpenKeys(indexPath, this.props.menu)
      return {
        current: linkInfo.menuCode,
        openKeys
      };
    }

    this.state = {
      current: '',
      openKeys: []
    }
  }

  // 根据路由变化, 获得路由信息
  getMenuInfo(routing) {
    const path = getValueByKey(routing, null, 'locationBeforeTransitions', 'pathname');
    const start = '/page_container/'.length;
    const end = path.length;

    return searchMenu(path.substring(start, end));
  }

  // 获取要展开的菜单key数组
  getOpenKeys(indexPath, menu) {
    indexPath.pop();
    const openKeys = [];
    let temp = menu;
    indexPath.every((index) => {
      openKeys.push(temp[index] && temp[index].menuCode);
      temp = temp[index] && temp[index].subMenus;
      return temp;
    });
    return openKeys;
  }

  // 控制选中的菜单项
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  // 控制菜单的展开和闭合
  subMenuClick(e) {
    console.log('click', e);
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



  componentWillReceiveProps(next){
    const { linkInfo, indexPath } = this.getMenuInfo(next.routing);
    if (linkInfo) {
      if(linkInfo.menuCode !== this.state.current) {
        const openKeys = this.getOpenKeys(indexPath, this.props.menu)
        this.setState({
          current: linkInfo.menuCode,
          openKeys
        });
      } else {
        console.log('receive props', 'current is same');
      }
    }
  }

  renderMenuItem(item) {
    if (item && item.subMenus && item.subMenus.length > 0) {
      return (
        <SubMenu key={item.menuCode} title={<span>{item.menuValue}</span>} onTitleClick={this.subMenuClick}>
          {item.subMenus.map((subItem) => {
            return this.renderMenuItem(subItem);
          })}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.menuCode} >
        <Link to={'/page_container' + item.domainLink}>
          {item.menuValue}
        </Link>
      </Menu.Item>
    );
  }

  render() {
    return (
      <Menu onClick={this.handleClick}
            defaultOpenKeys={this.state.openKeys}
            selectedKeys={[this.state.current]}
            ref="mainMenu"
            openKeys={this.state.openKeys}
            mode="inline"
      >
        {this.props.menu && this.props.menu.map((item => this.renderMenuItem(item)))}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
  routing: state.routing
});

export default connect(mapStateToProps)(MenuCreator);


