/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';

import { routerShape } from 'react-router';

import { searchMenu } from '../../service/CacheService';
// import { dispatch } from '../../service/DispatchService';
import { getInitData } from '../../actions/pageContainer';
import { longRunExec } from '../../system/longRunOpt';
import PageConfig from './config';
import { CONTAINER_PRE } from '../../router';

import { getValueByKey } from '../../common/utils/MapUtils';
/* eslint-disable */
class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refStr = '';
    this.createRefs = this.createRefs.bind(this);
    this.createPage = this.createPage.bind(this);
    this.getUrlPath = this.getUrlPath.bind(this);
    this.initPageContainer = this.initPageContainer.bind(this);
    this.combineComp = this.combineComp.bind(this);
    this.jump = this.jump.bind(this);
    this.getSplat = this.getSplat.bind(this);
    this.getDomainType = this.getDomainType.bind(this);
    this.getNeedFetch = this.getNeedFetch.bind(this);
    this.getUrlQuery = this.getUrlQuery.bind(this);
    this.getUrlState = this.getUrlState.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static contextTypes = {
    router: routerShape
  }

  createRefs() {
    const ref = 'pageContainer_' + Math.random();
    this.refStr = ref;
    return ref;
  }

  jump(pathname, query, state) {
    this.context.router.push({
      pathname: '/' + CONTAINER_PRE + pathname, query, state
    });
  }

  goBack() {
    this.context.router.goBack();
  }

  getSplat() {
    return getValueByKey(this.props, '', 'params', 'splat');
  }

  getDomainType(){
    return getValueByKey(this.props, null, 'location', 'state', 'domainType');
  }

  getNeedFetch() {
    return getValueByKey(this.props, true, 'location', 'state', 'needFetch');
  }

  getUrlQuery() {
    return getValueByKey(this.props, {}, 'location', 'query');
  }

  getUrlState() {
    return getValueByKey(this.props, {}, 'location', 'state');
  }

  combineComp(Comp) {
    return (<Comp ref={this.createRefs()}
                  exec={longRunExec}
                  jump={this.jump}
                  goBack={this.goBack}
                  query={this.getUrlQuery()}
                  state={this.getUrlState()}
    />);
  }

  getUrlPath(url) {
    return url;
  }

  createPage(link, type) {
    console.log(PageConfig);
    const comp = type ? PageConfig[type] : PageConfig.default;
    return this.combineComp(comp);
  }

  initPageContainer() {
    const self = this;
    longRunExec(() => {
      return getInitData(this.getUrlPath('/' + this.props.params.splat), {}).then((data) => {
        self.refs && self.refs[this.refStr] &&
        self.refs[this.refStr].initComponent &&
        self.refs[this.refStr].initComponent(data);
      });
    });

  }

  render() {
    if (this.getDomainType()) {
      this.page = this.createPage(this.getSplat(), this.getDomainType());
    } else {
      const { linkInfo } = searchMenu(this.getSplat());
      if (linkInfo) {
        this.page = this.createPage(this.getSplat(), linkInfo.domainType);
      } else {
        this.page = this.createPage('', 'default');
      }
    }
    this.getNeedFetch() && this.initPageContainer();
    return (
      <div>{this.page}</div>
    );
  }
}

export default PageContainer;
