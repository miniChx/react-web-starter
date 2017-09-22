/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { Select } from 'antd';

const compRender = record => {
  return (
    <Select style={{ width: 120 }} disabled={record.isReadonly}>
      {record.displayComponent.items.map((i, index) =>
        (
          <Select.Option key={'select_' + index} value={i}>{i}</Select.Option>
        ))}
    </Select>
  );
};

export default compRender;
