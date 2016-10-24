/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { searchMenu } from '../service/CacheService';
import { Row, Col, Button } from 'mxa';
import { constructPage } from '../renderTools';
import { PAGE_TYPE_LIST } from '../actions/types';
import NotMatchType from './NotMatchType';
import ListView from './listView';
import { dispatch } from '../service/DispatchService';
import { getInitData } from '../actions/pageContainer';
import { longRunExec } from '../system/longRunOpt';

// 自动生成ref

class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refStr = '';
    this.createRefs = this.createRefs.bind(this);
    this.linkInfo = searchMenu(this.props.params.splat);
    this.createPage = this.createPage.bind(this);
    this.getUrlPath = this.getUrlPath.bind(this);
    this.initPageContainer = this.initPageContainer.bind(this);
    console.log(this.linkInfo);
    this.page = this.createPage(this.linkInfo.domainLink, this.linkInfo.type);
  }

  createRefs() {
    const ref = 'pageContainer_' + Math.random();
    this.refStr = ref;
    return ref;
  }

  getUrlPath(url) {
    return url;
  }

  createPage(link, type) {
    switch(type) {
      case PAGE_TYPE_LIST:
        return (<ListView ref={this.createRefs()}/>);
        break;
      default:
        return (<NotMatchType pageType={type} />);
    }
  }

  componentWillReceiveProps(next) {
  }

  initPageContainer() {
    const self = this;
    longRunExec(() => {
      return getInitData(this.getUrlPath(this.linkInfo.domainLink)).then((data) => {
        console.log('XXXXXXX ref', this.refStr);
        self.refs && self.refs[this.refStr] &&
        self.refs[this.refStr].initComponent &&
        self.refs[this.refStr].initComponent(data);
      });
    });

  }

  componentDidMount() {
    this.initPageContainer();
    console.log(' fetch data and create page');
  }

  render() {

    this.linkInfo = searchMenu(this.props.params.splat);
    this.page = this.createPage(this.linkInfo.domainLink, this.linkInfo.type);
    this.initPageContainer();

    return (
      <div>{this.page}</div>
    );
  }
}

export default PageContainer;
