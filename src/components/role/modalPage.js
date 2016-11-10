/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Modal, Button, Input, Row } from 'mxa';

import styles from '../../styles/views/listview.less';

export default class ModalPage extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    mode: React.PropTypes.string,
    record: React.PropTypes.object,
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
    if (this.props.record) {
      return (
        <div>
          <Button className={styles.inlineButton} onClick={this.showModal}>{this.props.title}</Button>
          <Modal title={this.props.title} visible={this.state.visible}
                 onOk={this.handleOk} onCancel={this.handleCancel}
                 okText="保存"
          >
            <Row type="flex" justify="space-start">
              <p>{'角色编号: '}</p>
              <Input defaultValue={this.props.record.roleCode}/>
            </Row>
            <Row type="flex" justify="space-start">
              <p>{'角色名称: '}</p>
              <Input defaultValue={this.props.record.roleValue}/>
            </Row>
          </Modal>
        </div>
      );
    } else if (this.props.mode === 'add'){
      return (
        <div>
          <Button className={styles.inlineButton} onClick={this.showModal}>{this.props.title}</Button>
          <Modal title={this.props.title} visible={this.state.visible}
                 onOk={this.handleOk} onCancel={this.handleCancel}
                 okText="增加"
          >
            <Row type="flex" justify="space-start">
              <p>{'角色编号: '}</p>
              <Input />
            </Row>
            <Row type="flex" justify="space-start">
              <p>{'角色名称: '}</p>
              <Input />
            </Row>
          </Modal>
        </div>
      );
    }

    return null;
  }
}
