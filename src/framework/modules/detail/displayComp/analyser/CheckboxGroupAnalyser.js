/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { Checkbox } from 'antd';
import { autobind } from 'core-decorators';
import { VIEW, EDIT } from '../../constant';

const CheckboxGroup = Checkbox.Group;

class MyCheckboxGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: (this.props.value && this.props.value.split(',')) || [],
    };
  }

  @autobind
  _onChange(value) {
    const { onChange } = this.props;
    const v = value && value.join && value.join(',');
    onChange && onChange(v);
    this.setState({
      value: value
    });
  }

  render() {
    return (<CheckboxGroup options={this.props.options} value={this.state.value} onChange={this._onChange} disabled={this.props.disabled} />);
  }
}

const compRender = record => {
  const options = [];
  record.displayComponent && record.displayComponent.dictionaryItems && record.displayComponent.dictionaryItems.forEach((i, index) => {
    options.push({ label: i.value, value: i.code });
  });
  // console.log('#### checkbox group', options);

  return (
    <MyCheckboxGroup options={options} disabled={record.isReadonly} />
  );
};

/* eslint-disable */
class StaticDisplay extends React.Component {
  render() {
    const value = [];
    this.props.opts && this.props.opts.forEach(item => {
      if (this.props.value && this.props.value.indexOf(item.code) >=0) {
        value.push(item.value);
      }
    });
    return (
      <span>{value.join(', ')}</span>
    );
  }
}

export default {
  [VIEW]: record => {
    const opts = record.displayComponent && record.displayComponent.dictionaryItems && record.displayComponent.dictionaryItems;
    return (
      <StaticDisplay opts={opts} />
    );
  },
  [EDIT]: compRender
};
