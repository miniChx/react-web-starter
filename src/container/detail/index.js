import React from 'react';
import { connect } from 'react-redux';

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>Page2</div>
    );
  }
}

export default connect()(Detail);
