
import React from 'react';
import { Row, Col, Menu, Icon } from 'mxa';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


// eslint-disable-next-line react/prefer-stateless-function
class DemoWrapper extends React.Component {

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      current: '1',
      openKeys: [],
    };
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
    this.setState({ openKeys: this.getKeyPath(latestOpenKey) });
  };

  getKeyPath = key => {
    const map = {
      sub1: ['sub1'],
      sub2: ['sub2'],
      sub3: ['sub2', 'sub3'],
      sub4: ['sub4'],
    };
    return map[key] || [];
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  // eslint-disable-next-line arrow-body-style
  _renderNav = () => {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ width: 240 }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        <SubMenu key="sub1" title={<span><Icon type="bars" /><span>List</span></span>}>
          <MenuItem key="1">Option 1</MenuItem>
          <MenuItem key="2">Option 2</MenuItem>
          <MenuItem key="3">Option 3</MenuItem>
          <MenuItem key="4">Option 4</MenuItem>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <MenuItem key="5">Option 5</MenuItem>
          <MenuItem key="6">Option 6</MenuItem>
          <SubMenu key="sub3" title="Submenu">
            <MenuItem key="7">Option 7</MenuItem>
            <MenuItem key="8">Option 8</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <MenuItem key="9">Option 9</MenuItem>
          <MenuItem key="10">Option 10</MenuItem>
          <MenuItem key="11">Option 11</MenuItem>
          <MenuItem key="12">Option 12</MenuItem>
        </SubMenu>
      </Menu>
    );
  };

  render() {
    return (
      <Row>
        <Col sm={7} xs={24}>
          {this._renderNav()}
        </Col>
        <Col sm={17} xs={0} style={{ display: 'block' }}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default DemoWrapper;
