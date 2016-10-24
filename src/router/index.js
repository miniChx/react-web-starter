/**
 * Created by baoyinghai on 10/20/16.
 */
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { connect } from 'react-redux';


class MxRouter extends React.Component {

  render() {
    return (
      <Router history={this.props.history} routes={this.props.routerConfig} />
    );
  }
}

const mapStateToProps = state => ({
  routerConfig: state.routerConfig,
});

export default connect(mapStateToProps)(MxRouter);
