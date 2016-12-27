/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import { InputNumber, Input } from 'mxa';
import staticDisplay from './StaticDisplay';
import { VIEW, EDIT } from '../../constant';

const numeral = require('numeral');

class MyInputNumber extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  @autobind
  _onChange(e) {
    /* eslint-disable */
    if ((e && e.target) && isNaN && !isNaN(e.target.value)) {
      const { onChange } = this.props;
      this.setState({
        value: e.target.value
      });
      const res = numeral(numeral(e.target.value).format(this.props.format)).value();
      console.log(res);
      onChange && onChange(res);
    }
  }

  @autobind
  _onFocus(e) {
    if (this.state.value && this.state.value.length > 0) {
      this.setState({
        value: numeral(this.state.value).value()
      });
    }
  }

  @autobind
  _onBlur(e) {
    this.setState({
      value: numeral(this.state.value).format(this.props.format)
    });
  }

  render() {
    return (
      <Input value={this.state.value} addonAfter={this.props.addonAfter || ''} onFocus={this._onFocus} onBlur={this._onBlur} onChange={this._onChange} disabled={this.props.disabled} />
    );
  }
}

const compRender = record => {
  const format = record.formValidate && ecord.formValidate.opt && ecord.formValidate.opt.format;
  return (
    <MyInputNumber disabled={record.isReadonly} format={format || '0,0.0000'} addonAfter={record.addonAfter} />
  );
};

export default {
  [VIEW]: staticDisplay,
  [EDIT]: compRender
};
