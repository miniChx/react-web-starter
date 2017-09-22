import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';

import { Row, Col, BackTop } from 'antd';

import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import './styles/global/index.less';
import '../bundles/styles/global/index.less';
import appStyle from '../bundles/styles/views/app.less';
import { Header, Footer } from '../components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.token) {
      this.props.actions.push('/login');
    }
  }

  @autobind
  _goBack() {
    this.props.actions.goBack();
  }

  @autobind
  _renderHeader() {
    if (this.props.query && this.props.query.s === '1') {
      return (<div />);
    }
    return (
      <Header />
    );
  }

  render() {
    if (this.props.token && this.props.menu && this.props.menu.length > 0) {
      return (
        <div>
          {this._renderHeader()}
          <div className={appStyle.appBody}>
            <Row
              className={appStyle.appContent}
              type={'flex'}
              justify={'center'}
            >
              <Col span={24}>
                <ReactCSSTransitionGroup
                  component="div"
                  transitionName="app-transition"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {React.cloneElement(this.props.children, { query: this.props.query, goBack: this._goBack })}
                </ReactCSSTransitionGroup>
              </Col>
            </Row>
          </div>
          <Footer />
          <BackTop />
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
  session: state.session,
  token: state.global.token,
  isInit: state.global.isInit,
  query: state.global.query,
  menu: state.menu,
  subMenu: state.subMenu
});

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators({ push, replace, goBack }, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
