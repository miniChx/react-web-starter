import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';
import Qs from 'qs';

import { getValueByKey } from '../../common/utils/MapUtils';

import { longRunExec } from '../../system/longRunOpt';
import { CONTAINER_PRE } from '../../router';

const PackDecorator = Wrapper => {
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
    _jump(pathname, param, domainType, modal) {
      if (modal === 'Page') {
        window.open('/' + CONTAINER_PRE + pathname + '?' + Qs.stringify({ ...param, domainType }));
      } else {
        this.context.router.push({
          pathname: '/' + CONTAINER_PRE + pathname, query: { ...param, domainType }, state: { param }
        });
      }
    }

    @autobind
    _query() {
      return getValueByKey(this.props, {}, 'location', 'query');
    }

    @autobind
    _locationState() {
      return getValueByKey(this.props, {}, 'location', 'state');
    }

    @autobind
    _goBack() {
      this.context.router.goBack();
    }

    render() {
      return (
        <Wrapper
          {...this.props}
          ref={this._createRefs}
          exec={longRunExec}
          jump={this._jump}
          query={this._query}
          locationState={this._locationState}
          goBack={this._goBack}
        />
      );
    }
  }

  return WrapperComponent;
};

export default PackDecorator;

