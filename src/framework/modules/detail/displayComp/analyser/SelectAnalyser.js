/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { Select } from 'antd';
import { VIEW, EDIT } from '../../constant';

const compRender = record => {
  return (
    <Select disabled={record.isReadonly}>
      {record.displayComponent && record.displayComponent.dictionaryItems && record.displayComponent.dictionaryItems.map((i, index) =>
        (
          <Select.Option key={'select_' + i.code} value={i.code}>{i.value}</Select.Option>
        ))}
    </Select>
  );
};

class StaticDisplay extends React.Component {
  render() {
    let value = this.props.value;
    this.props.opts && this.props.opts.forEach(item => {
      if (item.code === this.props.value) {
        value = item.value;
      }
    });
    return (
      <span>{value}</span>
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
