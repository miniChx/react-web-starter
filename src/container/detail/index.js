import React from 'react';
import { connect } from 'react-redux';

class Detail extends React.Component {

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
      <div>详情模版</div>
    );
  }
}

export default connect()(Detail);
