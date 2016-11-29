/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { Button, Input, DatePicker } from 'mxa';

import RangeInput from './RangeInput';

const { RangePicker } = DatePicker;

export default class SearchInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large', 'default']),
    hideButton: PropTypes.bool,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'input',
    size: 'default',
    hideButton: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  @autobind
  _handleDateChange(dates, dateStrings) { // dates: [moment, moment], dateStrings: [string, string]
    console.log('_handleDateChange ===> ', dateStrings);
  }

  @autobind
  _handleRangeChange(left, right) {
    console.log('_handleRangeChange ===> left: ', left, ', right: ', right);
  }

  @autobind
  _handleInputChange(e) {
    const value = e.target.value;
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
    console.log('_handleInputChange ===> ', value);
  }

  @autobind
  _handleSearch() {
    this.props.onSearch && this.props.onSearch(this.state.value);
  }

  @autobind
  _renderInput() {
    if (this.props.type === 'date') {
      return (
        <RangePicker
          size={this.props.size}
          onChange={this._handleDateChange}
        />
      );
    } else if (this.props.type === 'range') {
      return (
        <RangeInput
          onChange={this._handleRangeChange}
        />
      );
    }

    return (
      <Input
        size={this.props.size}
        className="mx-search-input"
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this._handleInputChange}
        onPressEnter={this._handleSearch}
      />
    );
  }

  @autobind
  _renderSearchBtn() {
    if (this.props.hideButton) {
      return (<div />);
    }

    return (
      <Button icon="search" className="mx-search-btn" size={this.props.size} onClick={this.handleSearch} />
    );
  }

  render() {
    return (
      <div className="mx-search-input-wrapper">
        <span className="mx-search-input-title">{this.props.title}</span>
        {this._renderInput()}
        {this._renderSearchBtn()}
      </div>
    );
  }
}
