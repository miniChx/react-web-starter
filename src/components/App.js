import React from 'react';
import { connect } from 'react-redux';

import Header from './layout/Header';
import Footer from './layout/Footer';

import '../styles/global/index.less';
import appStyle from '../styles/views/app.less';

import classNames from 'classnames';

import { longRunExec } from '../framework/system/longRunOpt';
import { testFetch } from '../actions/test/fetchTest';
import Menu from './menu/index';
import Title from './title';
import { Row, Col } from 'mxa';

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
   return (
      <div>
        <Title />
        <Row>
          <Col span={4} ><Menu /></Col>
          <Col span={20} >{this.props.children}</Col>
        </Row>

      </div>
    );
  }
}


// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  routing: state.routing,
});

export default connect(mapStateToProps)(App);
