/**
 * Created by baoyinghai on 12/5/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import { Button, Icon } from 'mxa';

import Container from './container';
import appStyle from '../../../styles/views/info.less';

const ButtonGroup = Button.Group;

export default class FixedButtonGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tools: false
    };
  }
  @autobind
  switchTools() {
    this.setState({
      tools: !this.state.tools
    });
  }

  render() {
    return (
      <div className={[appStyle.layoutToolsDefault, this.state.tools ? appStyle.layoutToolsOut : appStyle.layoutToolsIn].join(' ')}>
        <ButtonGroup style={{ borderRadius: '6px' }}>
          <Button type="primary" onClick={this.switchTools}>{this.state.tools ? <Icon style={{ marginLeft: '-5px' }} type="caret-right" /> : <Icon style={{ marginLeft: '-5px' }} type="caret-left" />}</Button>
          {this.props.children}
        </ButtonGroup>
      </div>
    );
  }
}
