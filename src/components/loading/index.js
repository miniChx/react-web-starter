/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/views/cps.less';
import { Spin } from 'mxa';

class Loading extends React.Component {

  render() {
    if (this.props.showLoading) {
      return (
        <div className={styles.mask}>
          <Spin size="large" />
        </div>
      );
    }
    return <div /> ;
  }
}

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  showLoading: state.global.showLoading,
});

export default connect(mapStateToProps)(Loading);
