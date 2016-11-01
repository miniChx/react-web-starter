/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';

import { autobind } from 'core-decorators';

import Compose from '../../common/utils/Compose';
import AsyncDecorator from './AsyncDecorator';
import PackDecorator from './PackDecorator';
import InitDecorator from './InitDecorator';
import { getValueByKey } from '../../common/utils/MapUtils';

const getSplat = props => {
  return getValueByKey(props, '', 'params', 'splat');
};

const getQuery = props => {
  return getValueByKey(props, null, 'location', 'query');
};

const getBody = props => {
  return getValueByKey(props, null, 'location', 'state');
};

/* eslint-disable */
class PageContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const splat = getSplat(this.props);
    const query = getQuery(this.props);
    const locationState = getBody(this.props);
    let FinalPage = Compose(AsyncDecorator, PackDecorator, InitDecorator)([splat, query, locationState]);
    return (
      <div><FinalPage {...this.props}/></div>
    );
  }
}

export default PageContainer;
