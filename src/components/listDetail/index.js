/**
 * Created by baoyinghai on 10/25/16.
 */


import React from 'react';

export default class ListDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        detail
        <span>{JSON.stringify(this.props.query)}</span>
        <span>{JSON.stringify(this.props.state)}</span>
      </div>
    );
  }
}
