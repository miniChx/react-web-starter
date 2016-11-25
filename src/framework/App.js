import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import Animate from 'rc-animate';
import { Row, Col } from 'mxa';

import { autobind } from 'core-decorators';

import './styles/global/index.less';
import appStyle from './styles/views/app.less';

import Menu from '../components/menu';
import Header from '../components/header';
import { isInitDataFromServer } from './service/CacheService';
import { initDataFromServer } from './actions/global';
import { longRunExec } from './system/longRunOpt';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: true,
      enter: true
    };
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
  switchMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      enter: !this.state.enter
    });
  }

  @autobind
  _goBack() {
    this.props.actions.goBack();
  }

  render() {
    if (this.props.token && this.props.menu && this.props.menu.length > 0) {
      return (
        <div>
          <Header switchMenu={this.switchMenu} />
          <Row
            className={appStyle.appContent}
            type={this.state.menuIsOpen ? '' : 'flex'}
            justify={this.state.menuIsOpen ? '' : 'center'}
          >
            <Col span={this.state.menuIsOpen ? 4 : 0} >
              <Animate
                component=""
                showProp="show"
                transitionName="move-left"
              >
                <Menu />
              </Animate>
            </Col>
            <Col span={20}>{React.cloneElement(this.props.children, { goBack: this._goBack })}</Col>
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
  session: state.session,
  token: state.global.token,
  isInit: state.global.isInit,
  menu: state.menu
});

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators({ push, replace, goBack, initDataFromServer }, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
