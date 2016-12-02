/**
 * Created by baoyinghai on 12/1/16.
 */

import React from 'react';
import { autobind } from 'core-decorators';
import { Icon } from 'mxa';
import styles from '../../styles/views/listview.less';

export default class SwitchContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  @autobind
  switchContainer() {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.switchContainer} className={styles.switchContainer}>
          <span><Icon className={styles.iconFont} type={this.state.isVisible ? 'minus-square-o' : 'plus-square-o'} />{this.props.bar}</span>
        </div>
        <div className={styles.switchContainerBody}>
          {this.state.isVisible && this.props.children}
        </div>
      </div>
    );
  }
}
