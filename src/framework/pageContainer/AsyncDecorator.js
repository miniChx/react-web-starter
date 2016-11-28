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
        data: this.props.dataSource || getPageData()
      };
    }

    @autobind
    freshData(data) {
      this.setState({ data });
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

