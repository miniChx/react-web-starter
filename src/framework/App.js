import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import Animate from 'rc-animate';
import { Row, Col } from 'mxa';

import { autobind } from 'core-decorators';

import './styles/global/index.less';
import appStyle from './styles/views/app.less';

import Header from '../components/header';
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

  render() {
    if (this.props.token && this.props.menu && this.props.menu.length > 0) {
      return (
        <div>
          <Header />
          <div className={appStyle.appBody}>
            <Row
              className={appStyle.appContent}
              type={'flex'}
              justify={'center'}
            >
              <Col span={24}>{React.cloneElement(this.props.children, { goBack: this._goBack })}</Col>
            </Row>
          </div>
          <div className={appStyle.appFooter} >
            <Row type="flex" align="top" justify="center">
              <Col span={5} offset={1}>
                <div>
                  <h2>GitHub</h2>
                </div>
                <div>仓库</div>
                <div>dva - 应用框架</div>
                <div>dva-clidva-cli -脚手架</div>
                <div>ant-toolant-tool - 开发工具</div>
              </Col>
              <Col span={5} offset={1}>
                <div>
                  <h2>相关站点</h2>
                  <div>Ant Design Mobile - 移动版</div>
                  <div>G2G2 - 数据可视化</div>
                  <div>AntVAntV - 数据可视化规范</div>
                  <div>Ant Motion - 设计动效</div>
                  <div>AntD Library - Axure 部件库</div>
                  <div>Ant UX - 页面逻辑素材</div>
                </div>
              </Col>
              <Col span={5} offset={1}>
                <div>
                  <h2>社区</h2>
                </div>
                <div>更新记录</div>
                <div>反馈和建议</div>
                <div>讨论</div>
                <div>报告 Bug</div>
              </Col>
              <Col span={5} offset={1}>
                <div>
                  <h2>资管部出品</h2>
                </div>
                <div>Powered by Mxa</div>
              </Col>
            </Row>
          </div>
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
