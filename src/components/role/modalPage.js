/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Modal, Button } from 'mxa';

import styles from '../../styles/views/listview.less';

export default class ModalPage extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    record: React.PropTypes.object
  };

  static defaultProps = {
    buttonTitle: 'button'
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  @autobind
  showModal() {
    this.setState({
      visible: true,
    });
  }

  @autobind
  handleOk() {
    this.setState({
      visible: false,
    });
  }

  @autobind
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button className={styles.inlineButton} onClick={this.showModal}>{this.props.title}</Button>
        <Modal title={this.props.title} visible={this.state.visible}
               onOk={this.handleOk} onCancel={this.handleCancel}
               okText="保存"
        >
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  }
}
