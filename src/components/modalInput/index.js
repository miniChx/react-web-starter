import React, { PropTypes } from 'react';
import { Input, Icon } from 'mxa';
import { autobind } from 'core-decorators';
import { showComponent } from './MaskLayer';

export default class ModalInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    mapper: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  static defaultProps = {
    defaultValue: '',
  }

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      value: this.props.defaultValue,
    };
  }

  @autobind
  _callback(value) {
    const { mapper, onChange } = this.props;
    let displayValue = value;
    if (mapper !== undefined && value) {
      displayValue = mapper !== undefined ? mapper(value) : value;
    }
    this.setState({ value: displayValue });
    // callback && callback(value);
    onChange && onChange(value);
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
          addonAfter={<Icon type="bars" onClick={this._showModal} />}
          // defaultValue={this.props.defaultValue}
          disabled={true}
          value={this.state.value}
        />
      </div>
    );
  }
}
