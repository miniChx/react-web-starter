/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';

import { searchMenu } from '../../service/CacheService';
// import { dispatch } from '../../service/DispatchService';
import { getInitData } from '../../actions/pageContainer';
import { longRunExec } from '../../system/longRunOpt';
import PageConfig from './config';
import { CONTAINER_PRE } from '../../router';


import Compose from '../../common/utils/Compose';
import AsyncDecorator from './AsyncDecorator';
import PackDecorator from './PackDecorator';

import { getValueByKey } from '../../common/utils/MapUtils';
/* eslint-disable */
class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    // this.refStr = '';
  }

  static contextTypes = {
    router: routerShape
  }

  @autobind
  getSplat() {
    return getValueByKey(this.props, '', 'params', 'splat');
  }

  @autobind
  getDomainType(){
    return getValueByKey(this.props, null, 'location', 'state', 'domainType');
  }

  @autobind
  getNeedFetch() {
    return getValueByKey(this.props, true, 'location', 'state', 'needFetch');
  }

  @autobind
  getUrlPath(url) {
    return url;
  }

  @autobind
  createPage(link, type) {
    const comp = type ? PageConfig[type] : PageConfig.default;
    return Compose(PackDecorator)(comp);
  }

  render() {
    const { linkInfo } = searchMenu(this.getSplat());
    if (linkInfo) {
      this.page = this.createPage(this.getSplat(), linkInfo.domainType);
    } else {
      if(this.getDomainType()) {
        this.page = this.createPage(this.getSplat(), this.getDomainType());
      } else {
        this.page = this.createPage('', 'default');
      }
    }

    if (this.getNeedFetch()) {
      const FinalPage = Compose(AsyncDecorator)(this.page);
      return (
        <div><FinalPage url={this.getUrlPath('/' + this.props.params.splat)} /></div>
      );
    }

    return (
      <div>{this.page}</div>
    );
  }
}

export default PageContainer;
