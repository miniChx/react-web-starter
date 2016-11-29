import React from 'react';
import { trimStart } from 'lodash/string';
import { autobind } from 'core-decorators';
import { getPageData, getSubMenu } from '../service/CacheService';
import { dispatch } from '../service/DispatchService';
import exclusive from './exclusive';
import { setSubMenu } from '../actions/global';

const AsyncDecorator = Wrapper => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.dataSource || getPageData()
      };
    }

    componentDidMount() {
      if (this.state.data && this.state.data.menu) {
        dispatch(setSubMenu(this.state.data.menu));
      } else if (getSubMenu().length > 0) {
        dispatch(setSubMenu([]));
      }
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

