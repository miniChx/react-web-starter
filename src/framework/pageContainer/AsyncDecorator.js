import React from 'react';
import { trimStart } from 'lodash/string';
import { autobind } from 'core-decorators';

import { PFetch } from '../system/fetch';
import { longRunExec } from '../system/longRunOpt';

const AsyncDecorator = Wrapper => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      if (this.props.domainLink && this.props.domainLink !== 'imageView' && this.props.domainLink !== 'test/hello') {
        const url = this.getUrlPath('/' + trimStart(this.props.domainLink, '/'));
        const params = { ...this.props.params };
        if (this.props.location) {
          Object.assign(params, this.props.location.query);
        }
        longRunExec(() => PFetch(url, params)
          .then(data => {
            this.setState({
              data,
            });
          }));
      } else {
        setTimeout(() => this.setState({
          data: []
        }));
      }
    }

    getUrlPath = url => url;

    @autobind
    freshData(data) {
      this.setState({
        data
      });
    }

    render() {
      const { data } = this.state;
      if (data) {
        return (
          <Wrapper
            {...this.props}
            dataSource={data}
            freshData={this.freshData}
          />
        );
      }
      return (<div />);
    }
  }

  return WrapperComponent;
};

export default AsyncDecorator;

