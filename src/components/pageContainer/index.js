/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Compose from '../../common/utils/Compose';
import AsyncDecorator from './AsyncDecorator';
import InitDecorator from './InitDecorator';

import { searchMenu } from '../../service/CacheService';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const domainLink = this.props.params.splat;
    const { linkInfo } = searchMenu(domainLink);
    const domainType = linkInfo ? linkInfo.domainType : this.props.location.query.domainType;

    // if (domainType === 'Custom') {
    //   return (
    //     null
    //   );
    // }
    const FinalPage = Compose(AsyncDecorator, InitDecorator)();
    return (
      <FinalPage {...this.props} domainType={domainType} domainLink={domainLink} />
    );
  }
}

export default PageContainer;
