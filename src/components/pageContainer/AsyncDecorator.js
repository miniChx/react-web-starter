import React from 'react';
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
        const url = this.getUrlPath('/' + this.props.domainLink);
        longRunExec(() => getInitData(url, this.props.params || {})
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
      return (
        <Wrapper
          {...this.props}
          dataSource={data}
        />
      );
    }
  }

  return WrapperComponent;
};

export default AsyncDecorator;

