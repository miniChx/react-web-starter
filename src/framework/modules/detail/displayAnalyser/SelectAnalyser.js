/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Select } from 'mxa';

const compRender = (record, model) => {
  return (
    <Select style={{ width: 120 }} disabled={record.isReadonly || model === 'show'}>
      {record.displayComponent.items.map((i, index) =>
        (
          <Select.Option key={'select_' + index} value={i}>{i}</Select.Option>
        ))}
    </Select>
  );
};

export default compRender;
