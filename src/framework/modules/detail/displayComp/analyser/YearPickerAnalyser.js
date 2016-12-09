/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Select } from 'mxa';
import { VIEW, EDIT } from '../../constant';

const compRender = record => {
  const range = [];
  for (let i = 1990; i < 3000; i++) {
    range.push(i);
  }
  return (
    <Select style={{ width: 120 }} disabled={record.isReadonly}>
      {
        range.map((i, index) =>
        (
          <Select.Option key={'select_' + i.code} value={i}>{i}</Select.Option>
        ))
      }
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
