import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as urls from '../constants';
import AppMenu from './menu';
import style from './style.css';
import classNames from 'classnames';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _userInfo = () => {

  };
  _toHome = () => {
    this.props.match.history.replace(urls.HOME);
  };

  render() {
    const MainContent = this.props.content;
    const logoClass = classNames(style['topbar-btn'], style['topbar-logo'], style['topbar-left'] );
    const homeClass = classNames(style['topbar-btn'], style['topbar-home'], style['topbar-left'] );
    const userInfoClass = classNames(style['topbar-btn'], style['topbar-userinfo'], style['topbar-right'] );
    return (
      <div>
        <div className={style['header']}>
          <Link className={logoClass} to={urls.HOME}>
            <img style={{ width: 30, height: 30, marginTop: 10 }} src={require('../asset/topbar-logo.png')}/>
          </Link>
          <div className={homeClass}  onClick={this._toHome}>
            管理控制台
          </div>
          <div className={userInfoClass} onClick={this._userInfo} >
            7238*****@qq.com
          </div>
        </div>
        <div className={style['content']}>
          <AppMenu
            match={this.props.match}
          />
          <div className={style['container']}>
            <MainContent {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
 return {dispatch}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
