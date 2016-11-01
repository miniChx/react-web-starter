import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';
import Qs from 'qs';

import { getValueByKey } from '../../common/utils/MapUtils';

import { longRunExec } from '../../system/longRunOpt';
import { CONTAINER_PRE } from '../../router';

const PackDecorator = ([Wrapper, splat, query, locationState]) => {
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
    _jump(pathname, param, domainType, modal) {
      if (modal === 'Page') {
        window.open('/' + CONTAINER_PRE + pathname + '?' + Qs.stringify({ ...param.param, domainType }));
      } else {
        this.context.router.push({
          pathname: '/' + CONTAINER_PRE + pathname, query: { ...param.param, domainType }
        });
      }
    }
    /* eslint-disable */
    @autobind
    _query() {
      return query;
    }

    /* eslint-disable */
    @autobind
    _locationState() {
      return locationState;
    }

    @autobind
    _goBack() {
      this.context.router.goBack();
    }

    render() {
      return (
        <Wrapper
          {...this.props}
          exec={longRunExec}
          jump={this._jump}
          query={this._query}
          locationState={this._locationState}
          goBack={this._goBack}
        />
      );
    }
  }

  return [WrapperComponent, splat, query, locationState];
};

export default PackDecorator;

