/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Row, Col, Menu, Icon, BackTop, Affix } from 'mxa';
import { autobind } from 'core-decorators';
import { trimStart } from 'lodash/string';
import Anchor, { ArchorLink } from '../../../components/anchor';
import AnchorHref from './anchorHref';
import appStyle from '../../styles/views/app.less';
import SimpleMenu from '../../../components/simpleMenu';
import Compose from '../../utils/Compose';
import AsyncDecorator from '../../pageContainer/AsyncDecorator';
import InitDecorator from '../../pageContainer/InitDecorator';
import { searchMenu } from '../../service/CacheService';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    let list = [];
    this.tag = {};
    let defaultOpenKeys = [];
    if (this.props.dataSource && this.props.dataSource.menus) {
      this.props.dataSource.menus.forEach(s => {
        const tmp = this.transformToList(s);
        list = list.concat(tmp);
      });
      this.tag = this.getMenuInfo(this.props.dataSource.menus) || {};
      const { linkInfo, indexPath } = searchMenu(this.tag.menuCode, (id, item) => (item.menuCode === id), this.props.dataSource.menus);
      defaultOpenKeys = this.getOpenKeys(indexPath, this.props.dataSource.menus);
    }
    this.menuList = list || [];

    this.state = {
      main: null,
      left: null,
      right: null,
      tools: false,
      anchor: [],
      defaultSelectedKeys: this.tag.menuCode,
      defaultOpenKeys
    };
  }

  // 获取要展开的菜单key数组
  @autobind
  getOpenKeys(indexPath, menu) {
    indexPath.pop();
    const openKeys = [];
    let temp = menu;
    indexPath.every(index => {
      openKeys.push(temp[index] && temp[index].menuCode);
      temp = temp[index] && temp[index].subMenus;
      return temp;
    });
    return openKeys;
  }

  @autobind
  getMenuInfo(menu) {
    let tag = null;
    menu && menu.some(m => {
      if (m.isSelected === true) {
        tag = m;
        return true;
      } else if (m.subMenus) {
        tag = this.getMenuInfo(m.subMenus);
        if (tag) {
          return true;
        }
      }
      return false;
    });
    return tag;
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
  createMain(data, domainType, domainLink) {
    const TempPage = Compose(AsyncDecorator, InitDecorator)();
    return (<TempPage dataSource={data} domainType={domainType} domainLink={domainLink} />);
  }

  // TODO: refactor
  @autobind
  menuClick(domainLink, domainType) {
    if (this.props.renderBody) {
      // this.setState({ anchor: RightPage });
      this.setState({ main: this.props.renderBody(domainLink, domainType) });
    } else {
      this.props.exec(() => {
        return this.props.fetch(trimStart(domainLink, '/'), {}).then(data => {
          this.setState({
            main: this.createMain(data, domainType, domainLink),
          });
        }).catch(err => {
          this.setState({
            main: (<div>异常</div>)
          });
        });
      });
    }
  }

  componentDidMount() {
    // this.menuClick(this.props.domainLink, this.props.domainType);
  }

  componentWillMount() {
    setTimeout(() => this.setState({ anchor: this.searchAnchor() }), 100);
    this.menuClick(this.tag.domainLink, this.tag.domainType);
  }

  searchAnchor(children) {
    // TODO: 暂时使用document
    const ret = [];
    const anchorLink = document.querySelectorAll("span[class='anchorTag']");
    console.log('#######len', anchorLink.length);
    anchorLink.forEach(a => {
      ret.push({ href: a.children[0].attributes[0].nodeValue, title: a.innerText });
    });
    return ret;
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
    return (
      <div>
        <Row>
          <Col span={24}>{this.props.dataSource.name}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <SimpleMenu
              defaultOpenKeys={this.state.defaultOpenKeys}
              defaultSelectedKeys={[this.state.defaultOpenKeys, this.state.defaultSelectedKeys]}
              menu={this.props.dataSource.menus}
              menuClick={this.menuClick}
            />
          </Col>
          <Col span={18}>
            <div className={appStyle.layoutContainerBody} >
              {this.state.main}
              <Row className={appStyle.layoutContainerFooter} type="flex" justify="space-between" align="middle" >
                <Col span="3">{this.state.left && (<a><Icon type="left" />{this.state.left.menuValue}</a>)}</Col>
                <Col span="3">{this.state.right && (<a>{this.state.right.menuValue}<Icon type="right" /></a>)}</Col>
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
