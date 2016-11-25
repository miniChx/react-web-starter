import React from 'react';
import { trimStart } from 'lodash/string';
import { autobind } from 'core-decorators';
import { getPageData } from '../service/CacheService';
import exclusive from './exclusive';

const AsyncDecorator = Wrapper => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: getPageData()
      };
    }

    getUrlPath = url => url;

    @autobind
    freshData(data) {
      this.setState({ data });
      // return {
      //  setState: this.setState,
      //  state: this.state
      // };
    }

    render() {
      const { data } = this.state;
      return (
        <Wrapper
          {...this.props}
          dataSource={data}
          freshData={this.freshData}
        />
      );
    }
  }

  return WrapperComponent;
};

export default AsyncDecorator;

