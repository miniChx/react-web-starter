/**
 * Created by baoyinghai on 12/27/16.
 */

import React, { PropTypes } from 'react';
import { Input } from 'mxa';


export default class RangeInput extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    placeholder: PropTypes.string,
    connector: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large', 'default']),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'mx-search-range-input',
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

  _handleLeftChange = e => {
    const value = e.target.value;
    this.setState({ left: value }, () => {
      this.props.onChange && this.props.onChange(this.state.left, this.state.right);
    });
  }

  _handleRightChange = e => {
    const value = e.target.value;
    this.setState({ right: value }, () => {
      this.props.onChange && this.props.onChange(this.state.left, this.state.right);
    });
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <Input
          size={this.props.size}
          className="mx-search-input"
          placeholder={this.props.placeholder}
          value={this.state.left}
          onChange={this._handleLeftChange}
        />
        <span className={`${prefixCls}-connector`}>{this.props.connector}</span>
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
