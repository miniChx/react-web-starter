/**
 * Created by baoyinghai on 10/24/16.
 */
import React from 'react';

export default class ListView extends React.Component {

  render() {
    return (
      <div>
        {'domainType: [' + this.props.pageType + '], is not match!!'}
        <span>if you see this page, you can check the param of func jump or json string of menu!</span>
      </div>
    );
  }
};
