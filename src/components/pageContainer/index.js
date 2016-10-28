/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';

import { autobind } from 'core-decorators';

import Compose from '../../common/utils/Compose';
import AsyncDecorator from './AsyncDecorator';
import PackDecorator from './PackDecorator';
import InitDecorator from './InitDecorator';

/* eslint-disable */
class PageContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let FinalPage = Compose(AsyncDecorator, PackDecorator, InitDecorator)(this.props);
    return (
      <div><FinalPage {...this.props}/></div>
    );
  }
}

export default PageContainer;
