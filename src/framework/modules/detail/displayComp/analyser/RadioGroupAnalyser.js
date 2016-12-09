/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Radio } from 'mxa';
import { VIEW, EDIT } from '../../constant';

const RadioGroup = Radio.Group;

const compRender = record => {
  return (
    <RadioGroup disabled={record.isReadonly}>
      {record.displayComponent && record.displayComponent.dictionaryItems && record.displayComponent.dictionaryItems.map((i, index) =>
        (
          <Radio key={'select_' + i.code} value={i.code}>{i.value}</Radio>
        ))}
    </RadioGroup>
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
