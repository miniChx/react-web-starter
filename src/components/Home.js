import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import homeStyle from '../styles/views/home.less';

export class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className={homeStyle.jump}>
          <a onClick={() => this.props.dispatch(push('/page_container/AccountList/render'))}>跳转到用户管理</a>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
