import React from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';

// import Header from './layout/Header';
// import Footer from './layout/Footer';

import '../styles/global/index.less';
/* eslint-disable */
import appStyle from '../styles/views/app.less';
import classNames from 'classnames';

import Menu from './menu/index';
import Title from './title';
import { Row, Col } from 'mxa';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: routerShape
  };

  componentWillReceiveProps(next){
    if (!next.session.token && this.props.session.token) {
      this.context.router.replace('/login');
    }
    if (next.session.token && !this.props.session.token) {
      this.context.router.push({ pathname: '/' });
    }
  }

  componentDidMount() {
    if (!this.props.session.token) {
      this.context.router.push({ pathname: '/login' });
    }
  }

  render() {
    if (this.props.session.token) {
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
    return (
      <div>{this.props.children}</div>
    );
  }
}


// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  routing: state.routing,
  session: state.session
});

export default connect(mapStateToProps)(App);
