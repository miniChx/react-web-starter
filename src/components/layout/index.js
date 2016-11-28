/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Row, Col, Menu, Icon, BackTop, Affix } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import Anchor, { ArchorLink } from '../../components/anchor';
import AnchorHref from './anchorHref';
import appStyle from '../../framework/styles/views/app.less';
import SimpleMenu from '../simpleMenu';
import exclusive from '../../framework/pageContainer/exclusive';


export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.anchor = [];
    let list = [];
    this.props.menu.forEach(s => {
      const tmp = this.transformToList(s);
      list = list.concat(tmp);
    });
    this.menuList = list || [];
    this.state = {
      main: null,
      left: null,
      right: null,
      tools: false
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
    const handle = this.props.menuClick || this.mainAnalyser;
    if (domainLink && !exclusive.some(f => f(domainLink))) {
      const url = this.getUrlPath('/' + trimStart(domainLink, '/'));
      this.props.exec(() => this.props.fetch(url, {})
        .then(data => {
          this.setState({
            main: handle(domainLink, domainType, data)
          });
        }));
    } else {
      this.setState({
        main: handle(domainLink, domainType)
      });
    }

    this.setState(this.searchBeforeAndAfter(menuCode));
  }

  searchAnchor(children) {
    if (typeof children === 'object') {
      if (children instanceof Array) {
        children.some(c => this.searchAnchor(c));
      } else if (children && children.type && children.type.defaultProps && children.type.defaultProps.name === 'AnchorHref') {
        this.anchor.push({ title: children.props.title, href: children.props.href });
      } else if (children.props.children) {
        this.searchAnchor(children.props.children);
      }
    }
  }

  @autobind
  mainAnalyser(domainLink, domainType, data) {
    // TODO: json格式 解析模板
    return (
      <div>
        <h1>合作方客户管理</h1>
        <p>表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。这里我们封装了表单域</p>
        <h2>
          <AnHref title="以下内容自定义渲染" href="#components-anchor-demo-basic1" />
        </h2>
        <div className={appStyle.formBox}>
          {JSON.stringify(data)}
        </div>
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
    this.anchor = [];
    this.searchAnchor(this.state.main || this.props.children);
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
              {this.anchor.map(p => (<ArchorLink key={p.href} {...p} />))}
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
