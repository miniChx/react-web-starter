/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Checkbox } from 'mxa';
import { VIEW, EDIT } from '../../constant';

const CheckboxGroup = Checkbox.Group;

const compRender = record => {
  const options = [];
  record.displayComponent && record.displayComponent.dictionaryItems && record.displayComponent.dictionaryItems.forEach((i, index) => {
    options.push({ label: i.value, value: i.code });
  });
  console.log('#### checkbox group', options);
  return (
    <CheckboxGroup options={options} disabled={record.isReadonly} />
  );
};

class StaticDisplay extends React.Component {
  render() {
    const value = [];
    this.props.opts && this.props.opts.forEach(item => {
      if (item.code === this.props.value) {
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
