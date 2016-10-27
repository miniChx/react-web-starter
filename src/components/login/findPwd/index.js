/**
 * Created by baoyinghai on 10/26/16.
 */
import React from 'react';
import { Button } from 'mxa';
import { routerShape } from 'react-router';

export default class FindPwd extends React.Component {

  static contextTypes = {
    router: routerShape
  };

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }


  buttonClick() {
    this.context.router.push({ pathname: '/login' });
  }

  render() {
    return (
      <div>
        <Button type="ghost" onClick={() => this.buttonClick()} > 跳回登录 </Button>
      </div>
    );
  }
}
