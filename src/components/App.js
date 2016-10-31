/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import Animate from 'rc-animate';
import assign from 'object-assign';

// import Header from './layout/Header';
// import Footer from './layout/Footer';

import '../styles/global/index.less';
/* eslint-disable */
import appStyle from '../styles/views/app.less';
import classNames from 'classnames';

import Menu from './menu/index';
import Title from './title';
import { Row, Col } from 'mxa';
import { isInitDataFromServer } from '../service/CacheService';
import { initDataFromServer } from '../actions/initDataFromServer';
import { longRunExec } from '../system/longRunOpt';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {

  constructor(props) {
    super(props);
    this.switchMenu = this.switchMenu.bind(this);
    this.state = {
      menuIsOpen: true,
      enter: true
    }
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
    if (!isInitDataFromServer()) {
      longRunExec(() => {
        return this.props.dispatch(initDataFromServer());
      });

    }
  }

  switchMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      enter: !this.state.enter
    });
  }

  render() {
    const Div = (props) => {
      const { style, show } = props;
      const newStyle = assign({}, style, {
        display: show ? '' : 'none',
      });
      return <Menu {...props} style={newStyle} />;
    };
    if (this.props.isInit) {
    if (this.props.session.token) {
      return (
        <div>
          <Title switchMenu={this.switchMenu} />
          <Row className={appStyle.appContent}>
            <Col span={this.state.menuIsOpen ? 4 : 0} >
              <Animate
                component=""
                showProp="show"
                transitionName="move-left"
              >
                <Div show={this.state.enter}></Div>
              </Animate>
            </Col>
            <Col span={20} >{this.props.children}</Col>
          </Row>

        </div>
      );
    }
    return (
      <div>{this.props.children}</div>
    );
    } else {
      return (<div />);
    }
  }
}


// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => ({
  routing: state.routing,
  session: state.session,
  isInit: state.global.isInit
});

export default connect(mapStateToProps)(App);
