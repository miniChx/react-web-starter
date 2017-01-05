/**
 * Created by baoyinghai on 12/27/16.
 */

import React, { PropTypes } from 'react';
import { Button, Input, DatePicker, Select, Row, Col } from 'mxa';
import zhCN from 'mxa/lib/date-picker/locale/zh_CN';
import RangeInput from './RangeInput';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class SearchInput extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    // placeholder: PropTypes.string,
    code: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    extra: PropTypes.any,
    operatorType: PropTypes.oneOf(['LIKE', 'BETWEEN', 'EQ']),
    size: PropTypes.oneOf(['small', 'large', 'default']),
    hideButton: PropTypes.bool,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    requestFilterFields: PropTypes.array,
  };

  static defaultProps = {
    prefixCls: 'mx-search-input',
    placeholder: '',
    type: 'INPUT',
    size: 'default',
    hideButton: true,
    requestFilterFields: []
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldName: this.props.code,
      value: this._getDefaultInputValue(this.props.code),
      minValue: '',
      maxValue: '',
    };
  }

  _transformDataType = data => {
    // if (this.props.dataType === 'Integer' || this.props.dataType === 'Long' || this.props.dataType === 'Double' || this.props.dataType === 'BigDecimal') {
    //  if (!isNaN(data)) {
    //    return Number(data);
    //  }
    // }
    // if (this.props.dataType === 'String') {
    //   return data;
    // }
    return data;
  }

  _handleSearch = () => {
    this.props.onSearch && this.props.onSearch([{
      fieldName: this.state.fieldName,
      value: this.state.value,
      minValue: this.state.minValue,
      maxValue: this.state.maxValue,
    }]);
  }

  _handleDateChange = (dates, dateStrings) => { // dates: [moment, moment], dateStrings: [string, string]
    console.log('_handleDateChange ===> ', dates, dateStrings);
    this.props.onChange && this.props.onChange({
      fieldName: this.state.fieldName,
      value: dates,
    });
  }

  _handleRangeChange = (left, right) => {
    // console.log('_handleRangeChange ===> left: ', left, ', right: ', right);
    this.props.onChange && this.props.onChange({
      fieldName: this.state.fieldName,
      value: [left, right] //  Issue #25
    });
  }

  _handleSelectChange = value => {
    // console.log('_handleSelectChange ===> ', value);
    this.props.onChange && this.props.onChange({
      fieldName: this.state.fieldName,
      value: value, //  Issue #25
    });
  }

  _handleInputChange = e => {
    const value = this._transformDataType(e.target.value);
    this.setState({ value });
    this.props.onChange && this.props.onChange({
      fieldName: this.state.fieldName,
      value: value, //  Issue #25
    });
  }

  _getPlaceHolder = () => {
    return '请输入' + this.props.title;
  }

  _getDefaultInputValue = fieldName => {
    let tag;
    this.props.requestFilterFields && this.props.requestFilterFields.forEach(i => {
      if (i.fieldName === fieldName) {
        tag = i;
      }
    });
    return tag && tag.value;
  }

  _renderInput = () => {
    const { prefixCls } = this.props;
    if (this.props.type === 'DATEPICKER') {
      return (
        <RangePicker
          size={this.props.size}
          locale={zhCN}
          onChange={this._handleDateChange}
          className={prefixCls}
          placeholder={this._getPlaceHolder()}
        />
      );
    } else if (this.props.type === 'INPUT' && this.props.operatorType === 'BETWEEN') {
      return (
        <RangeInput
          placeholder={this._getPlaceHolder()}
          className={prefixCls}
          onChange={this._handleRangeChange}
        />
      );
    } else if (this.props.type === 'SELECT') {
      return (
        <Select
          showSearch={true}
          style={{ minWidth: 150 }}
          className={prefixCls}
          // placeholder="Select a person"
          optionFilterProp="children"
          onChange={this._handleSelectChange}
          placeholder={this._getPlaceHolder()}
        >
          {
            this.props.extra.map(item => (
              <Option key={item.code} value={item.code}>{item.value}</Option>
            ))
          }
        </Select>
      );
    }

    return (
      <Input
        size={this.props.size}
        className={prefixCls}
        // placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this._handleInputChange}
        placeholder={this._getPlaceHolder()}
        disabled={this.props.disabled}
        // onPressEnter={this._handleSearch}
      />
    );
  }

  _renderSearchBtn = () => {
    if (this.props.hideButton) {
      return (<div />);
    }

    return (
      <Button
        icon="search"
        className={`${this.props.prefixCls}-btn`}
        size={this.props.size}
        onClick={this._handleSearch}
        disabled={this.props.disabled}
      />
    );
  }

  render() {
    const { prefixCls } = this.props;
    if (this.props.isSummary) {
      return (
        <div className={`${prefixCls}-wrapper`}>
          {this._renderInput()}
          {this._renderSearchBtn()}
        </div>
      );
    }
    return (
      <Row className={`${prefixCls}-wrapper`}>
        <Col span="5" className="search-input-col search-input-col-label">
          <span className={`${prefixCls}-title`}>{this.props.title}</span>
        </Col>
        <Col span="16" offset="1" className="search-input-col">
          {this._renderInput()}
        </Col>
      </Row>
    );
  }
}
