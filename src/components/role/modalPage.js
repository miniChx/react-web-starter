/**
 * Created by cui on 16/11/10.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Modal, Button, Input, Row, Col } from 'mxa';
import RoleAuthentication from './authentication';

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
    };
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
      if (this.props.mode === 'detail') {
        return (
          <div>
            <a className={this.props.className} onClick={this.showModal}>{this.props.title}</a>
            <Modal title={this.props.title} visible={this.state.visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}
            >
              <Row type="flex" justify="space-start" align="middle">
                <Col>角色编号: </Col>
                <Col>{this.props.record.roleCode}</Col>
              </Row>
              <Row type="flex" justify="space-start" align="middle">
                <Col>角色名称: </Col>
                <Col>{this.props.record.roleValue}</Col>
              </Row>
            </Modal>
          </div>
        );
      }
      return (
        <div>
          <a className={this.props.className} onClick={this.showModal}>{this.props.title}</a>
          <Modal title={this.props.title} visible={this.state.visible}
                 onOk={this.handleOk} onCancel={this.handleCancel}
                 okText="保存"
          >
            <RoleAuthentication mode={this.props.mode}/>
          </Modal>
        </div>
      );
    } else if (this.props.mode === 'add'){
      return (
        <div>
          <Button className={this.props.className} onClick={this.showModal}>{this.props.title}</Button>
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
