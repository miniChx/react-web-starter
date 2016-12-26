/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Row, Col, Menu, Icon, BackTop, Affix, Button } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import Anchor, { ArchorLink } from '../../../components/anchor';
import AnchorHref, { queryAnchor } from './anchorHref';
import appStyle from '../../styles/views/info.less';
import SideMenu from './sideMenu';
import Compose from '../../utils/Compose';
import AsyncDecorator from '../../pageContainer/AsyncDecorator';
import InitDecorator from '../../pageContainer/InitDecorator';
import {
  getMenuItemByKeyPaths,
  getMenuItemByFunc,
  getMenuItemAndPathByFunc,
  searchBeforeAndAfter,
} from '../../utils/MenuHelper';
import { showModal } from '../../pageContainer/ModalWrapper';
import { getValueByKey } from '../../utils/MapUtils';
import FixedButtonGroup from './fixedButtonGroup';
import { PAGE_TYPE_DETAIL } from '../../constant/dictActions';
import { BUTTON_POSITION, BUTTON_RELATEDATA } from '../../constant/dictCodes';
import { ExtendButton } from '../../../components';

// const IFrame = require('react-iframe');

// const ButtonGroup = Button.Group;

export default class Layout extends React.Component {

  static propTypes = {
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
    const buttons = (this.props.dataSource && this.props.dataSource.buttons) || [];
    const { prefixCls, query, inject } = this.props;
    const buttonClass = `${prefixCls}-button`;
    const globalBtns = buttons.map(item => (
      <ExtendButton
        type="button"
        inline={false}
        buttonProps={{ type: 'ghost' }}
        {...item}
        disabled={false}
        key={item.buttonDescription}
        query={query}
        className={buttonClass}
        inject={inject}
        relatedRows={BUTTON_RELATEDATA.NONE}
      />
    ));
    const tools = false;
    this.state = {
      main: null,
      left: null,
      right: null,
      tools,
      current: this.tag,
      anchor: [],
      selectedKeys: this.tag.menuCode,
      openKeys,
      // toolStyle: tools ? appStyle.layoutToolsOut : appStyle.layoutToolsIn
      toolStyle: appStyle.layoutToolsDefault,
      topButtons: [],
      globalBtns
    };
  }

  @autobind
  changeMenuSelect(menuCode, menu) {
    return getMenuItemAndPathByFunc(item => item.menuCode === menuCode, menu);
  }

  @autobind
  createTopButtons(data) {
    this.setState({ topButtons: [...this.state.globalBtns, ...data] });
  }

  @autobind
  clearTopButtons() {
    this.setState({ topButtons: [] });
  }

  @autobind
  createMain(data, domainType, domainLink, displayType) {
    const TempPage = Compose(AsyncDecorator, InitDecorator)();
    return (<TempPage {...this.props} displayType={displayType} createTopButtons={this.createTopButtons} dataSource={data} domainType={domainType} domainLink={domainLink} />);
  }

  @autobind
  menuClick(e) {
    const m = getMenuItemByKeyPaths(e.keyPath || [e.key], this.props.dataSource.menus);
    const domainLink = trimStart(m.domainLink, '/');
    const domainType = m.domainType;
    this.changeMenuProps(m.menuCode, () => this.updateMain(domainLink, domainType, m));
  }

  @autobind
  createReqParam(menuItem) {
    // TODO: some all
    let params = {};
    if (this.props && this.props.params) {
      params = { ...params, ...this.props.params };
    }
    params = { ...params, ...getValueByKey(this.props, {}, 'query') };
    const ret = {};
    menuItem.bindParameters && menuItem.bindParameters.forEach(item => {
      ret[item.name] = params[item.name];
    });
    return ret;
  }

  // TODO: refactor  不需要renderMain
  @autobind
  updateMain(domainLink, domainType, menuItem) {
    this.clearTopButtons();
    const menuCode = menuItem.menuCode;
    // 下部菜单
    const patch = searchBeforeAndAfter(menuCode, this.props.dataSource.menus);
    patch.current = menuItem;
    this.props.exec(() => {
      return this.props.fetch(trimStart(domainLink, '/'), this.createReqParam(menuItem)).then(data => {
        this.setState({
          main: this.createMain(data, domainType, domainLink, menuItem.displayType),
          ...patch
        }, this.updateAnchor);
      }).catch(err => {
        console.log('**  error  **', err);
        this.setState({
          main: (<div>没有数据...</div>),
          ...patch
        }, this.updateAnchor);
      });
    });
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

  @autobind
  switchTools() {
    this.setState({
      toolStyle: !this.state.tools ? appStyle.layoutToolsOut : appStyle.layoutToolsIn,
      tools: !this.state.tools
    });
  }

  @autobind
  popMask() {
    showModal({}, PAGE_TYPE_DETAIL, 'example/process', () => console.log('close pop mask!!!!'));
  }

  @autobind
  popMaskByXiaoGang() {
    // showComponent((<Approval />), {});
  }

  render() {
    return (
      <div>
        <Affix>
          <Row className={appStyle.layoutContainerHeader}>
            <Col span={4}>{this.props.dataSource.name}</Col>
            <Col span={4} offset={1} >{this.state.current.menuValue}</Col>
            <Col span={12} style={{ textAlign: 'right' }}>{this.state.topButtons}</Col>
          </Row>
        </Affix>
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
            <Anchor offsetTop={150} target={this.props.target}>
              {this.state.anchor && this.state.anchor.map(p => (<ArchorLink key={p.href} {...p} />))}
            </Anchor>
          </Col>
        </Row>
        <FixedButtonGroup>
          <Button type="ghost" onClick={this.popMask}>审批</Button>
          <Button type="ghost" onClick={this.popMaskByXiaoGang}>流程图</Button>
        </FixedButtonGroup>
      </div>
    );
  }
}

export const AnHref = AnchorHref;
