/**
 * Created by baoyinghai on 10/25/16.
 */
import React from 'react';
import { Button } from 'mxa';

export default class ListDetail extends React.Component {

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.props.jump(
      '/AccountList/foo',
      { modal: 'i am modal ' },
      { domainType: 'foo', needFetch: false }
    );
  }

  render() {
    return (
      <div>
        detail
        <span>{JSON.stringify(this.props.query)}</span>
        <span>{JSON.stringify(this.props.state)}</span>

        <Button type="ghost" onClick={() => this.buttonClick()} >jump to foo</Button>
      </div>
    );
  }
}
