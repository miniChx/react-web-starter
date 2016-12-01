/**
 * Created by baoyinghai on 11/29/16.
 */
import React from 'react';


export default class StaticDisplay extends React.Component {
  render() {
    return (
      <span>{this.props.value}</span>
    );
  }
}

export const createComp = model => comp => {
  if (model === 'show') {
    return (
      <StaticDisplay />
    );
  }
  return comp;
};
