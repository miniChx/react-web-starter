/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Row, Col, Menu, Icon, BackTop, Affix } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import Anchor, { ArchorLink } from '../../components/anchor';
import AnchorHref from './anchorHref';
import appStyle from '../styles/views/app.less';
import SimpleMenu from '../../components/simpleMenu';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    let list = [];
    this.props.menu && this.props.menu.forEach(s => {
      const tmp = this.transformToList(s);
      list = list.concat(tmp);
    });
    this.menuList = list || [];
    this.state = {
      main: null,
      left: null,
      right: null,
      tools: false,
      anchor: []
    };
  }

  transformToList(a) {
    if (!a.subMenus) {
      return [{ menuValue: a.menuValue, menuCode: a.menuCode }];
    }
    // TODO: 默认的菜单root节点不应该渲染界面.
    let ret = [{ menuValue: a.menuValue, menuCode: a.menuCode }];
    // let ret = [];
    a.subMenus.forEach(s => {
      const sub = this.transformToList(s);
      ret = ret.concat(sub);
    });
    return ret;
  }

  getUrlPath = url => url;

  @autobind
  menuClick(domainLink, domainType, menuCode) {
    this.setState(this.searchBeforeAndAfter(menuCode));
  }

  componentWillMount() {
    this.setState({ anchor: this.searchAnchor() });
  }

  searchAnchor() {
    // TODO: 暂时使用document
    const ret = [];
    const anchorLink = document.querySelectorAll("span[class='anchorTag']");
    anchorLink.forEach(a => {
      ret.push({ href: a.children[0].attributes[0].nodeValue, title: a.innerText });
    });
    return ret;
  }

  @autobind
  mainAnalyser(domainLink, domainType, data) {
    // TODO: json格式 解析模板
    // const Page = this.createPage(domainType, domainLink);
    return (
      <div>
        {this.props.main}
      </div>
    );
  }

  @autobind
  toolsChange(e) {
    this.setState({ tools: !this.state.tools });
  }

  @autobind
  searchBeforeAndAfter(menuCode) {
    let left = {};
    let right = {};
    this.menuList.some((item, index) => {
      if (item.menuCode === menuCode) {
        if (index === 1) {
          left = null;
        } else {
          left = this.menuList[index - 1];
        }
        if (index === this.menuList - 2) {
          right = null;
        } else {
          right = this.menuList[index + 1];
        }
        return true;
      }
      return false;
    });
    return { left, right };
  }

  render() {
    if (!this.props.menu || this.props.menu.length === 0) {
      return this.props.children;
    }
    return (
      <div>
        <Row>
          <Col span={4}>
            <SimpleMenu menu={this.props.menu} menuClick={this.menuClick} />
          </Col>
          <Col span={18}>
            <div className={appStyle.layoutContainerBody} >
              {this.state.main || this.props.children}
              <Row className={appStyle.layoutContainerFooter} type="flex" justify="space-between" align="middle" >
                <Col span="3">{this.state.left && (<a><Icon type="left" />{this.state.left.menuValue}</a>)}</Col>
                <Col span="3">{this.state.right && (<a>{this.state.right.menuValue}<Icon type="right" /></a>)}</Col>
              </Row>
            </div>
          </Col>
          <Col span={2}>
            <Anchor>
              {this.state.anchor.map(p => (<ArchorLink key={p.href} {...p} />))}
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
