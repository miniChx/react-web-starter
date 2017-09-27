import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {

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
      <div>列表模版</div>
    );
  }
}

export default connect()(List);
