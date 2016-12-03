/**
 * Created by baoyinghai on 12/1/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import Collapse, { Panel } from './collapse';


export default class SwitchContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  render() {
    return (
      <Collapse defaultActiveKey={['1']} >
        <Panel header={this.props.bar} key="1">{this.props.children}</Panel>
      </Collapse>
    );
  }
}
