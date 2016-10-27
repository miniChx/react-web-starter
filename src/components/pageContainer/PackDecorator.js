import React from 'react';

import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';


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
      // initial state
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
    _jump(pathname, query, state) {
      this.context.router.push({
        pathname: '/' + CONTAINER_PRE + pathname, query, state
      });
    }

    @autobind
    _query() {
      return getValueByKey(this.props, {}, 'location', 'query');
    }

    @autobind
    _state() {
      return getValueByKey(this.props, {}, 'location', 'state');
    }

    render() {
      return (
        <Wrapper
          {...this.props}
          ref={this._createRefs}
          exec={longRunExec}
          jump={this._jump}
          query={this._query}
          state={this._state}
        />
      );
    }
  }

  return WrapperComponent;
};

export default PackDecorator;

