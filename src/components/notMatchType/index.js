/**
 * Created by baoyinghai on 10/24/16.
 */
import React from 'react';

/* eslint-disable */
export default class ListView extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        {'domainType: [' + this.props.domainType + '], is not match!!'}
        <br />
        <span>if you see this page, you can check the param of func jump or json string of menu!</span>
      </div>
    );
  }
};
