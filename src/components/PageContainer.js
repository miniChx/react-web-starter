/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { searchMenu } from '../service/CacheService';
import { constructPage } from '../renderTools';
import { dispatch } from '../service/DispatchService';
import { getInitData } from '../actions/pageContainer';
import { longRunExec } from '../system/longRunOpt';
import PageConfig from './PageConfig';

class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refStr = '';
    this.createRefs = this.createRefs.bind(this);
    this.createPage = this.createPage.bind(this);
    this.getUrlPath = this.getUrlPath.bind(this);
    this.initPageContainer = this.initPageContainer.bind(this);
    this.combineComp = this.combineComp.bind(this);
  }

  createRefs() {
    const ref = 'pageContainer_' + Math.random();
    this.refStr = ref;
    return ref;
  }

  combineComp(Comp) {
    return (<Comp ref={this.createRefs()} exec={longRunExec} />);
  }

  getUrlPath(url) {
    return url;
  }

  createPage(link, type) {
    const comp = type ? PageConfig[type] : PageConfig.default;
    return this.combineComp(comp);
  }

  initPageContainer() {
    const self = this;
    longRunExec(() => {
      return getInitData(this.getUrlPath(this.linkInfo.domainLink)).then((data) => {
        self.refs && self.refs[this.refStr] &&
        self.refs[this.refStr].initComponent &&
        self.refs[this.refStr].initComponent(data);
      });
    });

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
