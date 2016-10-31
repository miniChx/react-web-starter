import React from 'react';

import { getInitData } from '../../actions/pageContainer';
import { getValueByKey } from '../../common/utils/MapUtils';
import { longRunExec } from '../../system/longRunOpt';

const AsyncDecorator = Wrapper => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      if (this.getNeedFetch()) {
        const url = this.getUrlPath('/' + this.props.params.splat);
        let param = this.props.location && this.props.location.state && this.props.location.state.param;
        if (!param) {
          param = this.props.location && this.props.location.query;
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

    getNeedFetch = () => {
      return getValueByKey(this.props, true, 'location', 'state', 'needFetch');
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

