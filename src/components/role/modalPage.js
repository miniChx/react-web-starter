/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Modal, Button, Input, Row, Col } from 'mxa';

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
            <Row type="flex" justify="space-start" align="middle">
              <Col>角色编号: </Col>
              <Col>
                <Input defaultValue={this.props.record.roleCode}/>
              </Col>
            </Row>
            <Row type="flex" justify="space-start" align="middle">
              <Col>角色名称: </Col>
              <Col>
                <Input defaultValue={this.props.record.roleValue}/>
              </Col>
            </Row>
            <Row type="flex" justify="space-start" align="middle">
              <Col>角色权限: </Col>
              <Col>
                灌灌灌灌灌
              </Col>
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
            <Row type="flex" justify="space-start" align="middle">
              <Col>角色编号: </Col>
              <Col>
                <Input />
              </Col>
            </Row>
            <Row type="flex" justify="space-start" align="middle">
              <Col>角色名称: </Col>
              <Col>
                <Input />
              </Col>
            </Row>
          </Modal>
        </div>
      );
    }

    return null;
  }
}
