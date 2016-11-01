import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';
import Qs from 'qs';

import { longRunExec } from '../../system/longRunOpt';
import { CONTAINER_PRE } from '../../router';

import { getComponentByDomainType } from './config';

const InitDecorator = () => {
  class WrapperComponent extends React.Component {
    static contextTypes = {
      router: routerShape
    };

    @autobind
    _jump(domainLink, param, domainType, modal) {
      if (modal === 'Modal') {
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
      const Wrapper = getComponentByDomainType(this.props.domainType);

      return (
        <Wrapper
          {...this.props}
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

