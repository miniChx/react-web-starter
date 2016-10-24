/**
 * Created by baoyinghai on 10/24/16.
 */

import React from 'react';

export default class ListView extends React.Component {

  constructor(props){
    super(props);
    this.initComponent = this.initComponent.bind(this);
    this.state = {
      data: '数据加载中'
    }
  }

  initComponent(data) {
    this.setState({
      data: JSON.stringify(data, null, 4)
    });
  }

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    );
  }
};
