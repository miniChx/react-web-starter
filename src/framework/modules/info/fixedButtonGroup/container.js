import React from 'react';
import { Button, Icon } from 'mxa';

import appStyle from '../../../styles/views/info.less';

const ButtonGroup = Button.Group;

export default class TodoList extends React.Component {

  render() {
    return (
      <div className={[appStyle.layoutToolsDefault, this.props.tools ? appStyle.layoutToolsOut : appStyle.layoutToolsIn].join(' ')}>
        <ButtonGroup style={{ borderRadius: '6px' }}>
          <Button type="primary" onClick={this.props.switchTools}>{this.props.tools ? <Icon style={{ marginLeft: '-5px' }} type="caret-right" /> : <Icon style={{ marginLeft: '-5px' }} type="caret-left" />}</Button>
          {this.props.children}
        </ButtonGroup>
      </div>
    );
  }
}
