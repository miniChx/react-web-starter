
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Demo extends React.Component {
  render() {
    return (
      <div>
        <div>Demo List</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Demo;
