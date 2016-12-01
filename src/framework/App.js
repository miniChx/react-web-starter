import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Animate from 'rc-animate';
import { Row, Col } from 'mxa';

import { autobind } from 'core-decorators';

import './styles/global/index.less';
import appStyle from './styles/views/app.less';
import { Header, Footer } from '../components';
import { isInitDataFromServer } from './service/CacheService';
import { initDataFromServer } from './actions/global';
import { longRunExec } from './system/longRunOpt';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.token) {
      this.props.actions.push('/login');
    }
    if (this.props.token && !isInitDataFromServer()) {
      // if (!isInitDataFromServer()) {
      longRunExec(() => this.props.actions.initDataFromServer());
    }
  }

  @autobind
  _goBack() {
    this.props.actions.goBack();
  }

  @autobind
  _renderHeader() {
    if (this.props.location.query && this.props.location.query.s === '1') {
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
                  {React.cloneElement(this.props.children, { goBack: this._goBack })}
                </ReactCSSTransitionGroup>
              </Col>
            </Row>
          </div>
          <Footer />
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
  menu: state.menu,
  subMenu: state.subMenu
});

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators({ push, replace, goBack, initDataFromServer }, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
