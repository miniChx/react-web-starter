/**
 * Created by baoyinghai on 10/24/16.
 */

import React from 'react';
import { Button } from 'mxa';
import { dispatch } from '../../service/DispatchService';
import { testFetch } from '../../actions/test/fetchTest';

export default class ListView extends React.Component {

  constructor(props){
    super(props);
    this.initComponent = this.initComponent.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      data: '数据加载中'
    }
  }

  submit() {
    this.props.exec(() => {
      return testFetch()();
    })
  }

  // 跳转到该界面后, 有的界面需要fetch数据, 此方法会被执行
  initComponent(data) {
    this.setState({
      data: JSON.stringify(data, null, 4)
    });
  }

  render() {
    return (
      <div>
        {this.state.data}
        <Button type="ghost" onClick={this.submit}> test </Button>
      </div>
    );
  }
};
