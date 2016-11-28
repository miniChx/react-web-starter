import React from 'react';
import { Input, Button, Modal, Icon } from 'mxa';
import classNames from 'classnames';

const InputGroup = Input.Group;

export default class modalInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false,
      modal2Visible: false
    };
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  renderModal() {
    return (
      <Icon type="bars" onClick={() => this.setModal2Visible(true)} />
    );
  }

  render() {
    // const parentProps = Object.assign({}, this.props, { children: null });
    return (
      <div style={{ marginBottom: 16 }} >
        <Input addonAfter={this.renderModal()} />
        <Modal
          maskClosable={false}
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          footer={[]}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
