/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { Spin } from 'mxa';
import Compose from '../utils/Compose';
import AsyncDecorator from './AsyncDecorator';
import InitDecorator from './InitDecorator';
import { getMenu } from '../service/CacheService';
import { getMenuItemAndPathByFunc } from '../utils/MenuHelper';

// import PureRenderMixin from 'react-addons-pure-render-mixin';
// const PureRenderMixin = React.addons.PureRenderMixin;

class PageContainer extends React.PureComponent {
  render() {
    if (this.props.query === undefined) {
      return (
        <div className="loading-mask">
          <Spin size="large" />
        </div>
      );
    }

    const domainLink = this.props.params.splat;
    const { linkInfo } = getMenuItemAndPathByFunc(item => (item.domainLink === domainLink || item.domainLink === '/' + domainLink), getMenu());
    const domainType = linkInfo ? linkInfo.domainType : this.props.query.domainType;
    const FinalPage = Compose(AsyncDecorator, InitDecorator)();
    return (
      <FinalPage key="key_page_container" {...this.props} domainType={domainType} domainLink={domainLink} />
    );
  }
}

export default PageContainer;
