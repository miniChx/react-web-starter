
import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { Input } from 'mxa';

export default class RangeInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    connector: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large', 'default']),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    size: 'default',
    connector: ' - ',
  };

  constructor(props) {
    super(props);
    this.state = {
      left: '',
      right: '',
    };
  }

  @autobind
  _handleLeftChange(e) {
    const value = e.target.value;
    this.setState({ left: value }, () => {
      this.props.onChange && this.props.onChange(this.state.left, this.state.right);
    });
  }

  @autobind
  _handleRightChange(e) {
    const value = e.target.value;
    this.setState({ right: value }, () => {
      this.props.onChange && this.props.onChange(this.state.left, this.state.right);
    });
  }

  render() {
    return (
      <div className="mx-search-range-input">
        <Input
          size={this.props.size}
          className="mx-search-input"
          placeholder={this.props.placeholder}
          value={this.state.left}
          onChange={this._handleLeftChange}
        />
        <span className="connector">{this.props.connector}</span>
        <Input
          size={this.props.size}
          className="mx-search-input"
          placeholder={this.props.placeholder}
          value={this.state.right}
          onChange={this._handleRightChange}
        />
      </div>
    );
  }
}
