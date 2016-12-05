/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { Button, Input, DatePicker, Select } from 'mxa';
import RangeInput from './RangeInput';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class SearchInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    code: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    extra: PropTypes.any,
    operatorType: PropTypes.oneOf(['LIKE', 'BETWEEN', 'EQ']),
    size: PropTypes.oneOf(['small', 'large', 'default']),
    hideButton: PropTypes.bool,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'Input',
    size: 'default',
    hideButton: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldName: this.props.code,
      value: '',
      minValue: '',
      maxValue: '',
    };
  }

  @autobind
  _handleSearch() {
    this.props.onSearch && this.props.onSearch({
      ...this.state
    });
  }

  @autobind
  _handleDateChange(dates, dateStrings) { // dates: [moment, moment], dateStrings: [string, string]
    console.log('_handleDateChange ===> ', dateStrings);
    this.props.onChange && this.props.onChange({
      ...this.state,
      minValue: dateStrings[0],
      maxValue: dateStrings[1],
    });
  }

  @autobind
  _handleRangeChange(left, right) {
    console.log('_handleRangeChange ===> left: ', left, ', right: ', right);
    this.props.onChange && this.props.onChange({
      ...this.state,
      minValue: left,
      maxValue: right,
    });
  }

  @autobind
  _handleSelectChange(value) {
    console.log('_handleSelectChange ===> ', value);
    this.props.onChange && this.props.onChange({
      ...this.state,
      value,
    });
  }

  @autobind
  _handleInputChange(e) {
    const value = e.target.value;
    this.setState({ value });
    this.props.onChange && this.props.onChange({
      ...this.state,
      value,
    });
    console.log('_handleInputChange ===> ', value);
  }

  @autobind
  _renderInput() {
    if (this.props.type === 'DatePicker') {
      return (
        <RangePicker
          size={this.props.size}
          onChange={this._handleDateChange}
        />
      );
    } else if (this.props.type === 'Input' && this.props.operatorType === 'BETWEEN') {
      return (
        <RangeInput
          onChange={this._handleRangeChange}
        />
      );
    } else if (this.props.type === 'SELECT') {
      return (
        <Select
          showSearch="true"
          style={{ minWidth: 150 }}
          // placeholder="Select a person"
          optionFilterProp="children"
          onChange={this._handleSelectChange}
        >
          {
            this.props.extra.map((item, index) => (
              <Option key={index} value={item.code}>{item.value}</Option>
            ))
          }
        </Select>
      );
    }

    return (
      <Input
        size={this.props.size}
        className="mx-search-input"
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this._handleInputChange}
        // onPressEnter={this._handleSearch}
      />
    );
  }

  @autobind
  _renderSearchBtn() {
    if (this.props.hideButton) {
      return (<div />);
    }

    return (
      <Button icon="search" className="mx-search-btn" size={this.props.size} onClick={this._handleSearch} />
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
