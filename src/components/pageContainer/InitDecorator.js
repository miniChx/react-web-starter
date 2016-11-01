import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';
import Qs from 'qs';

import PageConfig from './config';
import { getValueByKey } from '../../common/utils/MapUtils';

import { longRunExec } from '../../system/longRunOpt';
import { CONTAINER_PRE } from '../../router';

const createPage = domainType => {
  // console.log(PageConfig);
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

    @autobind
    _jump(domainLink, param, domainType, modal) {
      if (modal === 'Page') {
        window.open('/' + CONTAINER_PRE + domainLink + '?' + Qs.stringify({ ...param.param, domainType }));
      } else {
        this.context.router.push({
          pathname: '/' + CONTAINER_PRE + domainLink, query: { ...param.param, domainType }
        });
      }
    }

    @autobind
    _goBack() {
      this.context.router.goBack();
    }

    render() {
      const Wrapper = createPage(this.props.domainType);

      return (
        <Wrapper
          {...this.props}
          ref={this._createRefs}
          exec={longRunExec}
          jump={this._jump}
          goBack={this._goBack}
        />
      );
    }
  }

  return WrapperComponent;
};

export default InitDecorator;

