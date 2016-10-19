/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/views/hello.less';

class Loading extends React.Component {

  render() {
    if (this.props.showLoading) {
      return (
        <div className={styles.mask}>
          <span style={{color: 'red', position: 'absolute', marginTop:170 }}>加载中...</span>
        </div>
      );
    }
    return null;
  }
}

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  showLoading: state.global.showLoading,
});

export default connect(mapStateToProps)(Loading);
