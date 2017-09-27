import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import * as urls from '../../constants';
import storage from '../../utils/storage';
import style from './style.css'

const SubMenu = Menu.SubMenu;

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      openKeys: storage.get('openKeys') || [],
      current: '',
    };
  }

  handleClick = e => {
    this.setState({ current: e.key });
  }

  onOpenChange = openKeys => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    console.log(nextOpenKeys);
    this.setState({ openKeys: nextOpenKeys }, () => {
      storage.set('openKeys', nextOpenKeys);
    });
  }

  getAncestorKeys = key => {
    const map = {
      mall: ['classify', 'center'],
      takeout: ['classify', 'center'],
      group: ['classify', 'center'],
      ebooking: ['order'],
      takeoutorder: ['order'],
      takeout_commodity: ['commodity'],
      normal_commodity: ['commodity'],
      classify: ['center'],
      add_shop: ['shops'],
      search_shop: ['shops']
    };
    return map[key] || [];
  }

  render() {
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={['home']}
        mode="inline"
        className={style.menu}
      >
        <Menu.Item key='home'>
          <Link to={urls.HOME}>
            <Icon type='pie-chart' /><span>首页</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Option 2</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={<span><Icon type="user" /><span>User</span></span>}
        >
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><Icon type="team" /><span>Team</span></span>}
        >
          <Menu.Item key='6'>
            <Link to={urls.SAMPLE_LIST}>列表模版</Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link to={urls.SAMPLE_DETAIL}>详情模版</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <Icon type="file" />
          <span>File</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
