import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { updateMenuOpenKeys, updateMenuSelectedKeys, updateMenuCollapsed } from '../../actions/menu';
import * as urls from '../../constants/index';
import style from './style.css'

const SubMenu = Menu.SubMenu;

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  onCollapse =() => {
    this.props.dispatch(updateMenuCollapsed());
  };

  onOpenChange = openKeys => {
    this.props.dispatch(updateMenuOpenKeys({openKeys}));
  };

  onSelect = menuItem => {
    this.props.dispatch(updateMenuSelectedKeys({selectedKeys: menuItem.selectedKeys}));
  };

  getMenuClass = () => {
    let menuClass = style['menu'];
    if (this.props.collapsed) {
      menuClass = classNames(style['menu-collapsed'], 'ant-menu-inline-collapsed');
    }
    return menuClass;
  };

  render() {
    return (
      <div className={style['sider']}>
        <div
          className={this.props.collapsed ? style['collapse-close'] : style['collapse-open']}
          onClick={this.onCollapse}
        >
          <Icon
            type={this.props.collapsed ?'menu-unfold':'menu-fold'}
            style={{ fontSize: 16, color: '#fff', width: 10, height: 10, marginTop: 7 }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className={this.getMenuClass()}
          selectable={true}
          onOpenChange={this.onOpenChange}
          defaultSelectedKeys={['home']}
          openKeys={this.props.openKeys}
          selectedKeys={this.props.selectedKeys}
          onSelect={this.onSelect}
        >
          <Menu.Item key='home'>
            <Link to={urls.HOME}>
              <Icon type='pie-chart' /><span>首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to={urls.SAMPLE_LIST}>
              <Icon type="user" /><span>列表模版</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link to={urls.SAMPLE_DETAIL}>
              <Icon type='credit-card' /><span>详情模版</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedKeys: state.menu.selectedKeys,
    openKeys: state.menu.openKeys,
    collapsed: state.menu.collapsed
  };
};

const mapDispatchToProps = dispatch => {
  return {dispatch}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
