/**
 * Created by baoyinghai on 10/18/16.
 */

import React from 'react';
import { connect } from 'react-redux';
var { Link } = require('react-router');

import { Menu, Icon } from 'mxa';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      current: 'mail',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
      >
        {this.props.menu && this.props.menu.map((item => {
          if (item && item.subMenus && item.subMenus.length > 0 ) {
            return (
              <SubMenu key={item.menuCode} title={<span>{item.menuValue}</span>} >
                {item && item.subMenus && item.subMenus.length > 0 && item.subMenus.map((subItem) => {
                  return (
                    <Menu.Item key={item.menuCode + ':' + subItem.menuCode}>
                      <Link to={'/' + subItem.domainLink}>
                      {subItem.menuValue}
                      </Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={item.menuCode}><Link to={'/' + item.domainLink}>{item.menuValue}</Link></Menu.Item>
          );
        }))}
      </Menu>
    );
  }
}

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(mapStateToProps)(MenuCreator);


