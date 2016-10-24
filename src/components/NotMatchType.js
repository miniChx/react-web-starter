/**
 * Created by baoyinghai on 10/24/16.
 */
import React from 'react';

export default class ListView extends React.Component {

  render() {
    return (
      <div>{'type: [' + this.props.pageType + '], is not match!!'}</div>
    );
  }
};
