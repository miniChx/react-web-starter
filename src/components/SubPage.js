
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class SubPage extends React.Component {
  render() {
    return (
      <div>
        <span>I am page subPage!</span>
        <span>{this.props.desc}</span>
      </div>
    );
  }
}

export default SubPage;
