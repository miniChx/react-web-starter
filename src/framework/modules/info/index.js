/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Row, Col, Menu, Icon, BackTop, Affix } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import Anchor, { ArchorLink } from '../../../components/anchor';
import AnchorHref, { queryAnchor } from './anchorHref';
import appStyle from '../../styles/views/app.less';
import SideMenu from './sideMenu';
import Compose from '../../utils/Compose';
import AsyncDecorator from '../../pageContainer/AsyncDecorator';
import InitDecorator from '../../pageContainer/InitDecorator';
import { getMenuItemByKeyPaths, getMenuItemByFunc, getMenuItemAndPathByFunc, searchBeforeAndAfter } from '../../utils/MenuHelper';

export default class Layout extends React.Component {

  static propTypes = {
    renderBody: React.PropTypes.func,
    dataSource: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.tag = {};
    let openKeys = [];
    if (this.props.dataSource && this.props.dataSource.menus) {
      this.tag = getMenuItemByFunc(m => m.isSelected === true, this.props.dataSource.menus) || {};
      openKeys = this.changeMenuSelect(this.tag.menuCode, this.props.dataSource.menus).openKeys;
    }
    this.state = {
      main: null,
      left: null,
      right: null,
      tools: false,
      anchor: [],
      selectedKeys: this.tag.menuCode,
      openKeys
    };
  }

  @autobind
  changeMenuSelect(menuCode, menu) {
    return getMenuItemAndPathByFunc(item => item.menuCode === menuCode, menu);
  }

  @autobind
  createMain(data, domainType, domainLink) {
    const TempPage = Compose(AsyncDecorator, InitDecorator)();
    return (<TempPage dataSource={data} domainType={domainType} domainLink={domainLink} />);
  }

  @autobind
  menuClick(e) {
    const m = getMenuItemByKeyPaths(e.keyPath || [e.key], this.props.dataSource.menus);
    const domainLink = trimStart(m.domainLink, '/');
    const domainType = m.domainType;
    this.changeMenuProps(m.menuCode, () => this.updateMain(domainLink, domainType, m));
  }

  createReqParam(menuItem, query) {
    // TODO: some all
    return query;
  }

  // TODO: refactor
  @autobind
  updateMain(domainLink, domainType, menuItem) {
    const menuCode = menuItem.menuCode;
    const patch = searchBeforeAndAfter(menuCode, this.props.dataSource.menus);
    if (this.props.renderBody) {
      // this.setState({ anchor: RightPage });
      this.setState({ main: this.props.renderBody(menuItem, this.props.location.query), ...patch }, this.updateAnchor);
    } else {
      this.props.exec(() => {
        return this.props.fetch(trimStart(domainLink, '/'), this.createReqParam(menuItem, this.props.location.query)).then(data => {
          this.setState({
            main: this.createMain(data, domainType, domainLink),
            ...patch
          }, this.updateAnchor);
        }).catch(err => {
          this.setState({
            main: (<div>没有数据...</div>),
            ...patch
          }, this.updateAnchor);
        });
      });
    }
  }

  @autobind
  updateAnchor() {
    setTimeout(() => this.setState({ anchor: this.searchAnchor() }), 100);
  }

  componentWillMount() {
    this.updateMain(this.tag.domainLink, this.tag.domainType, this.tag);
  }

  searchAnchor(children) {
    return queryAnchor();
  }

  @autobind
  toolsChange(e) {
    this.setState({ tools: !this.state.tools });
  }

  @autobind
  changeMenuProps(menuCode, cb) {
    this.setState({
      selectedKeys: menuCode,
      openKeys: this.changeMenuSelect(menuCode, this.props.dataSource.menus).openKeys
    }, cb && cb);
  }

  @autobind
  switchMenuItem(menuItem) {
    const domainLink = trimStart(menuItem.domainLink, '/');
    const domainType = menuItem.domainType;
    this.changeMenuProps(menuItem.menuCode, () => this.updateMain(domainLink, domainType, menuItem));
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>{this.props.dataSource.name}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <SideMenu
              openKeys={this.state.openKeys}
              selectedKeys={[...this.state.openKeys, this.state.selectedKeys]}
              menu={this.props.dataSource.menus}
              menuClick={this.menuClick}
            />
          </Col>
          <Col span={18}>
            <div className={appStyle.layoutContainerBody} >
              <div className={appStyle.layoutContainerBodyInner}>
                {this.state.main}
              </div>
              <Row className={appStyle.layoutContainerFooter} type="flex" justify="space-between" align="middle" >
                <Col span="12" className={appStyle.leftMenu}>{this.state.left && (<a onClick={() => this.switchMenuItem(this.state.left)}><Icon type="left" />{this.state.left.menuValue}</a>)}</Col>
                <Col span="12" className={appStyle.rightMenu}>{this.state.right && (<a onClick={() => this.switchMenuItem(this.state.right)}>{this.state.right.menuValue}<Icon type="right" /></a>)}</Col>
              </Row>
            </div>
          </Col>
          <Col span={2}>
            <Anchor>
              {this.state.anchor && this.state.anchor.map(p => (<ArchorLink key={p.href} {...p} />))}
            </Anchor>
          </Col>
        </Row>
        <BackTop />
        <div className={appStyle.layoutTools} onClick={this.toolsChange}>
          {
            this.state.tools && (<div className={appStyle.layoutToolItems}>
              <Icon type="close-circle" />
              <Icon type="credit-card" />
              <Icon type="frown-o" />
              <Icon type="bars" />
              <Icon type="book" />
            </div>)
          }
          <Icon type={!this.state.tools ? 'caret-left' : 'caret-right'} />
        </div>
      </div>
    );
  }
}

export const AnHref = AnchorHref;
