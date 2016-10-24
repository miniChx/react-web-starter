/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/views/hello.less';
import { Spin } from 'mxa';

class Loading extends React.Component {

  render() {
    if (this.props.showLoading) {
      return (
        <div className={styles.mask}>
          <Spin tip="Loading..."/>
        </div>
      );
    }
    return <div />
  }
}

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  showLoading: state.global.showLoading,
});

export default connect(mapStateToProps)(Loading);
