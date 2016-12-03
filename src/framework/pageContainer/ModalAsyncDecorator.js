import React from 'react';
import { trimStart } from 'lodash/string';
import { autobind } from 'core-decorators';
import { getPageData, getSubMenu } from '../service/CacheService';
import { dispatch } from '../service/DispatchService';
import exclusive from './exclusive';
import { setSubMenu } from '../actions/global';
import { longRunExec } from '../system/longRunOpt';
import { PFetch } from '../system/fetch';

const ModalAsyncDecorator = Wrapper => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.dataSource || []
      };
    }

    getUrlPath = url => url;

    @autobind
    fetchDataFromServer() {
      if (this.props.domainLink && !exclusive.some(f => f(this.props.domainLink))) {
        const url = this.getUrlPath(trimStart(this.props.domainLink, '/'));
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

    componentDidMount() {
      this.fetchDataFromServer();
    }


    @autobind
    freshData(data) {
      this.setState({ data });
    }

    render() {
      const { data } = this.state;
      if (data && ((data.length && data.length > 0) || (Object.keys(data).length > 0))) {
        return (
          <Wrapper
            {...this.props}
            dataSource={data}
            freshData={this.freshData}
          />
        );
      }
      return (<div>加载中</div>);
    }
  }

  return WrapperComponent;
};

export default ModalAsyncDecorator;

