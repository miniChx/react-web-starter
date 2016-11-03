import React from 'react';

/* eslint-disable */
export default class UnfinishedProcess extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><span>{JSON.stringify(this.props.dataSource)}</span></div>
    );
  }
}
