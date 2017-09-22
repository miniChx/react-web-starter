/**
 * Created by vison on 11/29/16.
 */
import React from 'react';

class StaticDisplay extends React.Component {
  render() {
    return (
      <span>{this.props.value}</span>
    );
  }
}

const staticDisplay = () => {
  return (<StaticDisplay />);
};

export default staticDisplay;
