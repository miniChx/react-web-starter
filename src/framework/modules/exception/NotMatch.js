/**
 * Created by baoyinghai on 10/24/16.
 */
import React from 'react';

/* eslint-disable */
export default class NotMatchType extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        {'domainType: [' + this.props.domainType + '] domainLink: [' + this.props.domainLink + '], is not match!!'}
        <span>if you see this page, you can check the param of func jump or json string of menu!</span>
      </div>
    );
  }
};
