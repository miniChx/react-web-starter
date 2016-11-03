import React from 'react';
import { trimStart } from 'lodash/string';
import { getInitData } from '../../actions/pageContainer';
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
      if (this.props.domainLink) {
        const url = this.getUrlPath('/' + trimStart(this.props.domainLink, '/'));
        const params = { ...this.props.params };
        if (this.props.location) {
          Object.assign(params, this.props.location.query);
        }
        longRunExec(() => getInitData(url, params)
          .then(data => {
            this.setState({
              data,
            });
          }));
      }
    }

    getUrlPath = url => url;

    render() {
      const { data } = this.state;
      if (data) {
        return (
          <Wrapper
            {...this.props}
            dataSource={data}
          />
        );
      }
      return (<div />);
    }
  }

  return WrapperComponent;
};

export default AsyncDecorator;

