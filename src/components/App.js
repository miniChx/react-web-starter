import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classNames from 'classnames';
import styles from '../styles/views/hello.less';
import '../styles/core/common.less';
import { longRunExec } from '../system/longRunOpt';
import { testFetch } from '../actions/test/fetchTest';
import Menu from './menu/index';
import mxa from 'mxa';
import Title from './title';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {

  constructor(props) {
    super(props);
    this.testFetch = this.testFetch.bind(this);
  }

  testFetch() {
    longRunExec(() => {
      return this.props.dispatch(testFetch());
    });
  }


  render() {
    let welcomeStyle = styles.content;
    if (this.props.routing.locationBeforeTransitions.pathname === '/') welcomeStyle = styles.contentLegend;
    return (
      <div>
        <Title />
        <Menu />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  routing: state.routing,
});

export default connect(mapStateToProps)(App);
