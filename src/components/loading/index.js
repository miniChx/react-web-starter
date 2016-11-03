/**
 * Created by baoyinghai on 10/18/16.
 */
import React from 'react';

import { connect } from 'react-redux';
import { Spin } from 'mxa';

/* eslint-disable */
class Loading extends React.Component {

  constructor(prop){
    super(prop);
  }

  render() {
    if (this.props.showLoading) {
      return (
        <div className="loading-mask">
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
