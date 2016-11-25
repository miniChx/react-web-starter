import React from 'react';
import { Input, Button, Modal } from 'mxa';
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

  render() {
    const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'mx-search-btn': true,
      'mx-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'mx-search-input': true,
      'mx-search-input-focus': this.state.focus,
    });
    return (
      <div className="mx-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}
            onPressEnter={this.handleSearch}
          />
          <div className="mx-input-group-wrap">
            <Button icon="bars" className={btnCls} onClick={() => this.setModal2Visible(true)} />
            <Modal
              title="Vertically centered modal dialog"
              wrapClassName="vertical-center-modal"
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible(false)}
              onCancel={() => this.setModal2Visible(false)}
            >
              <p>some contents...</p>
              <p>some contents...</p>
              <p>some contents...</p>
            </Modal>
          </div>
        </InputGroup>
      </div>
    );
  }
}
