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
      collapsed: false,
      dealDialogVisible: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const MainContent = this.props.content;
    const logoClass = classNames(style.topbarbtn, style.topbarlogo, style.topbarleft );
    const homeClass = classNames(style.topbarbtn, style.topbarhome, style.topbarleft );
    const userInfoClass = classNames(style.topbarbtn, style.topbaruserinfo, style.topbarright );
    return (
      <div>
        <div className={style.header}>
          <Link className={logoClass} to={urls.HOME}>
            <img style={{ width: 30, height: 30, marginTop: 10 }} src={require('../asset/topbar-logo.png')}/>
          </Link>
          <Link className={homeClass} to={urls.HOME}>
            管理控制台
          </Link>
          <div className={userInfoClass}>
            7238*****@qq.com
          </div>
        </div>
        <div className={style.content}>
          <AppMenu
            match={this.props.match}
            selectedMenu={this.props.selectedMenu}
            mode={this.state.collapsed}
          />
          <MainContent {...this.props} />
        </div>
      </div>
    );
  }
  close() {
    this.setState({
      dealDialogVisible: false
    });
  }
  deal() {
    this.props.match.history.push('/app/order/takeout');
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
