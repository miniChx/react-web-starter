import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div>Page1</div>
    );
  }
}

export default connect()(List);
