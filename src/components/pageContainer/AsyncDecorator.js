import React from 'react';

import { getInitData } from '../../actions/pageContainer';
import { getValueByKey } from '../../common/utils/MapUtils';
import { longRunExec } from '../../system/longRunOpt';

const AsyncDecorator = ([Wrapper, splat, query, locationState]) => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      if (!this.isNoFetch()) {
        const url = this.getUrlPath('/' + splat);
        let param = locationState && locationState.param;
        if (!param) {
          param = query;
        }
        console.log(param);
        longRunExec(() => getInitData(url, param || {})
          .then(data => {
            this.setState({
              data,
            });
          }));
      }
    }

    getUrlPath = url => {
      return url;
    };

    isNoFetch = () => {
      return locationState && locationState.noFetch;
    };

    render() {
      const { data } = this.state;
      return (
        <Wrapper
          {...this.props}
          initData={data}
        />
      );
    }
  }

  return WrapperComponent;
};

export default AsyncDecorator;

