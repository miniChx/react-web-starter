import React, { PropTypes } from 'react';
import { Input, Icon } from 'mxa';
import { autobind } from 'core-decorators';
import { showComponent } from '../mask';

export default class ModalInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    mapper: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // initial state
    // console.log('im test', this.props.defaultValue);
    this.state = {
      value: this.props.value,
    };
  }

  @autobind
  _callback(value) {
    const { mapper, onChange, resetValue } = this.props;
    let displayValue = value;
    if (mapper !== undefined && value) {
      displayValue = mapper !== undefined ? mapper(value) : value;
    }
    this.setState({ value: displayValue });
    // callback && callback(value);
    resetValue && resetValue(value);
    onChange && onChange(displayValue);
  }

  @autobind
  _showModal() {
    const { children, ...other } = this.props;
    other.callback = this._callback;
    showComponent(children, other);
  }

  render() {
    return (
      <div style={{ marginBottom: 16 }}>
        <Input
          addonAfter={<Icon type="bars" onClick={!this.props.isReadonly && this._showModal} />}
          // defaultValue={this.props.defaultValue}
          disabled={this.props.isReadonly || this.props.disabled}
          value={this.state.value}
        />
      </div>
    );
  }
}
