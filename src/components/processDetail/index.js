/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';

export default class ProcessDetail extends React.Component {
  render() {
    return (
      <div>
        <span>敬请期待!</span>
        <span>{this.props.dataSource && JSON.stringify(this.props.dataSource)}</span>
      </div>
    );
  }
}
