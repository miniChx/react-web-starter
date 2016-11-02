import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';

import PageConfig from './config';
import { longRunExec } from '../../system/longRunOpt';

const createPage = domainType => {
  console.log(PageConfig, domainType);
  const Page = domainType ? PageConfig[domainType] : PageConfig.default;
  return Page;
};

const InitDecorator = () => {
  class WrapperComponent extends React.Component {
    static contextTypes = {
      router: routerShape
    }

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
      const Wrapper = createPage(this.props.domainType);

      return (
        <Wrapper
          {...this.props}
          ref={this._createRefs}
          exec={longRunExec}
        />
      );
    }
  }

  return WrapperComponent;
};

export default InitDecorator;

