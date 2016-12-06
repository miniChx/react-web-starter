import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';

import PageConfig from './config';
import customConfig from './customConfig';
import { longRunExec } from '../system/longRunOpt';
import { PFetch } from '../system/fetch';

const createPage = (domainType, domainLink) => {
  const page = PageConfig[domainType] ? PageConfig[domainType] : customConfig(domainLink);
  return page || PageConfig.default;
};

const InitDecorator = () => {
  class WrapperComponent extends React.Component {
    // static contextTypes = {
    //   router: routerShape
    // }

    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }

    @autobind
    _createRefs() {
      const ref = 'pageContainer_' + Math.random();
      this.refStr = ref;
      return ref;
    }

    render() {
      const Wrapper = createPage(this.props.domainType, this.props.domainLink);
      return (
        <Wrapper
          {...this.props}
          ref={this._createRefs}
          exec={longRunExec}
          fetch={PFetch}
        />
      );
    }
  }

  return WrapperComponent;
};

export default InitDecorator;

