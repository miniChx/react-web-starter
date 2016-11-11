
import React from 'react';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import Animate from 'rc-animate';
import { Row, Col } from 'mxa';

// import Header from './layout/Header';
// import Footer from './layout/Footer';

import { autobind } from 'core-decorators';

import '../styles/global/index.less';
import appStyle from '../styles/views/app.less';

import Menu from './menu/index';
import Title from './title';
import { isInitDataFromServer } from '../service/CacheService';
import { initDataFromServer } from '../actions/initDataFromServer';
import { longRunExec } from '../system/longRunOpt';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: true,
      enter: true
    };
  }

  componentWillReceiveProps(next) {
    if (!next.session.token && this.props.session.token) {
      this.props.dispatch(replace('/login'));
    }
    if (next.session.token && !this.props.session.token) {
      this.props.dispatch(push('/'));
    }
  }

  componentDidMount() {
    if (!this.props.session.token) {
      this.props.dispatch(push('/login'));
    }
    // if (this.props.session.token && !isInitDataFromServer()) {
    if (!isInitDataFromServer()) {
      longRunExec(() => this.props.dispatch(initDataFromServer()));
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
    this.props.dispatch(goBack());
  }

  render() {
    const MenuModule = props => {
      const { style, show } = props;
      const newStyle = { ...style, display: show ? '' : 'none' };
      return <Menu {...props} style={newStyle} />;
    };
    if (this.props.isInit) {
      if (this.props.session.token) {
        return (
          <div>
            <Title switchMenu={this.switchMenu} />
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
                  <MenuModule show={this.state.enter} />
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

    return (
      <div>{this.props.children}</div>
    );
  }
}

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  routing: state.routing,
  session: state.session,
  isInit: state.global.isInit,
  menu: state.menu
});

export default connect(mapStateToProps)(App);
