import React from 'react';
import assign from 'lodash/assign';

import { getInitData } from '../../actions/pageContainer';
import styles from '../../styles/views/cps.less';

const AsyncDecorator = Wrapper => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      // initial state
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      const { url } = this.props;

      getInitData(url, {})
        .then(data => {
          this.setState({
            data,
          });
        });
    }

    render() {
      const { data } = this.state;
      if (data) {
        return (
          <Wrapper
            {...this.props}
            data={data}
          />
        );
      }

      return (
        <div className={styles.paddingWraper} >
          <span>数据加载中...</span>
        </div>
      );
    }
  }

  return WrapperComponent;
};

export default AsyncDecorator;

