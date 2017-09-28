import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { updateMenuOpenKeys, updateMenuSelectedKeys } from '../../actions/menu';
import * as urls from '../../constants/index';
import style from './style.css'

const SubMenu = Menu.SubMenu;

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onOpenChange = openKeys => {
    this.props.dispatch(updateMenuOpenKeys({openKeys}));
  };

  onSelect = menuItem => {
    this.props.dispatch(updateMenuSelectedKeys({selectedKeys: menuItem.selectedKeys}));
  };

  render() {
    return (
      <div className={style.menuwrapper}>
        <div className={style.menucollapse}>
          <Icon type='menu-fold' style={{ fontSize: 16, color: '#fff', width: 10, height: 10, marginTop: 7 }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className={style.menu}
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
            key="sample"
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
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedKeys: state.menu.selectedKeys,
    openKeys: state.menu.openKeys
  };
};

const mapDispatchToProps = dispatch => {
  return {dispatch}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
