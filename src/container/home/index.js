import React from 'react';
import { connect } from 'react-redux';
import style from './style.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className={style.title}>首页</div>
    );
  }
}

export default connect()(Home);
