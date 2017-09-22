/**
 * Created by vison on 10/26/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'antd';

class FindPwd extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.props.dispatch(push('/login'));
  }

  render() {
    return (
      <div>
        <Button type="ghost" onClick={() => this.buttonClick()} > 跳回登录 </Button>
      </div>
    );
  }
}

export default connect()(FindPwd);
